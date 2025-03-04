import Mock from "mockjs";

// 从请求体中解析参数
function params2obj(body) {
  if (!body) return {}; // 如果 body 为 null 或 undefined，返回空对象
  try {
    return JSON.parse(body); // 尝试解析 JSON
  } catch (e) {
    console.error("JSON parsing error:", e);
    return {}; // 解析失败时也返回空对象
  }
}

let List = [];
const count = 200;
// 模拟200条用户数据
for (let i = 0; i < count; i++) {
  List.push(
    Mock.mock({
      id: Mock.Random.guid(),
      name: Mock.Random.cname(),
      addr: Mock.mock("@county(true)"),
      "age|18-60": 1,
      birth: Mock.Random.date(),
      sex: Mock.Random.integer(0, 1),
    })
  );
}

export default {
  /*
  获取列表
  要带参数 name, page, pageSize ; name可以不填写，page, pageSize有默认值
  @param {Object} data - 请求数据
  @return ({ code: number, count: number, data: [] }); 
  */

  getUserData: (config) => {
    // 从请求体中获取参数
    const { name, page = 1, pageSize = 20 } = params2obj(config.body);

    const mockList = List.filter((item) => {
      if (name && item.name.indexOf(name) === -1) return false;
      return true;
    });

    // 分页
    const pageList = mockList.filter(
      (item, index) => index < pageSize * page && index >= pageSize * (page - 1)
    );

    return {
      code: 200,
      data: {
        list: pageList,
        count: mockList.length, // 数据总条数
      },
    };
  },

  // 删除用户数据
  /*  @param id
      @return {*} 
       */
  deleteUser: (config) => {
    const { id } = params2obj(config.body);
    if (!id) return { code: -999, message: "参数不正确" };

    List = List.filter((item) => item.id !== id);
    return { code: 200, message: "删除成功" };
  },

  /* 
  增加用户
  @param {Object} data - 请求数据
  @return {{code:number, message: string}}
  */
  addUser: (config) => {
    const { name, addr, age, birth, sex } = params2obj(config.body);
    if (!name || !addr || !age || !birth || sex === undefined || sex === null) {
      return { code: -999, message: "参数不正确" };
    }

    List.unshift({
      id: Mock.Random.guid(),
      name: name,
      age: age,
      sex: sex,
      birth: birth,
      addr: addr,
    });
    return { code: 200, message: "添加成功" };
  },

  /* 
  修改用户
  @param {Object} data - 请求数据
  @return {{code:number, message: string}}
  */
  editUser: (config) => {
    const { id, name, addr, age, birth, sex } = params2obj(config.body);

    if (
      !id ||
      !name ||
      !addr ||
      !age ||
      !birth ||
      sex === undefined ||
      sex === null
    ) {
      return { code: -999, message: "参数不正确" };
    }
    let userFound = false;
    List.some((item) => {
      if (item.id === id) {
        userFound = true;
        item.name = name;
        item.addr = addr;
        item.age = age;
        item.birth = birth;
        item.sex = sex;
        return true;
      }
      return false;
    });
    if (!userFound) return { code: 201, message: "该id不存在" };
    return { code: 200, message: "修改成功" };
  },
};

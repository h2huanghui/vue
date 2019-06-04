import router from "../../router";
import request from "../../utils/request";

const state = {
  step: {
    /* 付款账号信息 */
    payAccount: "123456",
    /* 收款账号信息 */
    receiveAccount: {
      type: "alipay",
      number: ""
    }
  }
};

const actions = {
  /* action内部执行异步操作 */
  async submitStepForm({ commit }, { payload }) {
    await request({
      url: "api/form",
      method: "POST",
      data: payload
    });
    /* 提交 */
    commit("saveStepFormData", { payload });
    router.push("/form/step-form/result");
  }
};

const mutations = {
  /* 除了state之外，还可以传入额外的参数，即mutation的载荷 */
  /* 更改state里面step值 {payload}解构的值,如果解构失败，值就是undefined*/
  saveStepFormData(state, { payload }) {
    /* 用新对象替换老对象 */
    state.step = {
      ...state.step, //取出已有的信息
      ...payload //进行合并
    };
  }
};

export default {
  namespaced: true, //命名空间的方式
  state,
  actions,
  mutations
};

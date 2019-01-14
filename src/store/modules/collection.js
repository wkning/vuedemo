//添加购物车栏
const state = {
  collects:[],
};
const getters = {
  renderCollects(state){ //承载变化的collects
    return state.collects;
  }
};
const mutations = {
  pushCollects(state,items){ //如何变化collects,插入items
    state.collects.push(items)
    console.log('我执行了')
  }
};
const actions = {
  invokePushItems(context,item){ //触发mutations里面的pushCollects ,传入数据形参item 对应到items
    context.commit('pushCollects',item);
  }
};
export default {
  namespaced:true,
  state,
  getters,
  mutations,
  actions
}

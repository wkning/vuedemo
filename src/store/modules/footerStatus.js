//底部状态栏
const state = {
  showFooter:true,
  changeableNum:1,
  showLeft:false
};
const getters = {
  isShow(state){
    return state.showFooter
  },
  getChangeableNum(state){
    return state.changeableNum
  },
  leftShow(state){
    return state.showLeft
  }
};
const mutations = {
  show(state){
    state.showFooter =true
  },
  hide(state){
    state.showFooter = false
  },
  changeTap(state,num){
    state.changeableNum =num
  },
  showL(state){
    state.showLeft =true
  },
  hideL(state){
    state.showLeft = false
  },
};
const actions = {
  showFooter(context){
    context.commit('show')
  },
  hideFooter(context){
    context.commit('hide')
  },
  getNewNum(context,item){
    context.commit('changeTap',item)
  }
};
export default {
  namespaced:true,
  state,
  getters,
  mutations,
  actions
}

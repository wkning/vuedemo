//登录模块
const state = {
  token:null,
  userList :[{user:{username:'xixi',password:'123456',token:'xixi123456'}}],
  user:{username:'未登录',password:'',token:''}
};

const getters = {
  isToken(){
    return state.token
  },
  isUser(){
    return state.userList
  },
  nowUser(){
    return state.user
  }
};

const mutations = {
  setToken(state,val){
    console.log(val);
    state.user = val;
    state.token=val.token;
    //用户信息存在localStorage防止刷新后登录态丢失 localStorage不能存储对象或者数组转为json字符串
    window.localStorage.setItem("user",JSON.stringify(val))
  },
  removeUser(state){
    state.user = {username:'未登录',password:'',token:''};
    state.token=null;
    window.localStorage.removeItem("user")
  }
};

const actions = {
  addToken(context,val){
    context.commit('setToken',val)
  },
  signOut(context){
    context.commit('removeUser')
  }
};

export default {
  namespaced:true,
  state,
  getters,
  mutations,
  actions
}

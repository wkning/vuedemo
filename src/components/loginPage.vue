<template>
  <transition name="fade">
    <div class="login">
      <div class="loginContent">
        <div @click="closeLogin" class="close">返回</div>
        <div class="loginItem">
          <div class="loginText">账号</div>
          <div class="loginInp"><input type="text" placeholder="请输入用户名" v-model="user.username"></div>
        </div>
        <div class="loginItem">
          <div class="loginText">密码</div>
          <div class="loginInp"><input type="password" placeholder="请输入密码" v-model="user.password"></div>
        </div>
        <div class="loginBtn" @click="login(user)">登录</div>
      </div>
    </div>
  </transition>
</template>

<script>
  import {mapActions} from 'vuex'
    export default {
      name: "loginPage",
      data(){
        return {
          user:{
            username:null,
            password:null
          }
        }
      },
      methods:{
        ...mapActions('login',['addToken']),
        login:function (val) {
          //模拟后台存在的用户数据
          const userList = this.$store.getters["login/isUser"];
          //在后台存在的用户判断用户密码是否正确
          userList.forEach(item=>{
            if(item.user.username==this.user.username&&item.user.password==this.user.password){
              console.log(item.user);
              this.addToken(item.user);
              //显示底部导航栏
              this.$store.commit('footerStatus/show');
              let redirect = decodeURIComponent(this.$route.query.redirect || '/home');
              this.$router.push({
                path: redirect
              });
              return
            }else {
              console.log('账号或者密码错误')
            }
          })
          //addToken(val)
        },
        closeLogin:function () {
          console.log(213)
          //显示底部导航栏
          this.$store.commit('footerStatus/show');
          this.$store.commit('footerStatus/changeTap',1);
          this.$router.push({
            path: '/home'
          });
        }
      }
    }
</script>

<style scoped>
  .login{
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    justify-content: center;
  }
  .close{
    height: 40px; line-height: 40px;  text-align: right; width: 93%; margin: 0 auto;
  }
  .loginContent{
    width: 80vw; height: 50vh; box-shadow: 1px 5px 20px 0px rgba(0, 0, 0, 0.1); margin-top: 10vh
  }
  .loginItem{
    display: flex; align-items: center; height: 40px; width: 90%; margin: 10px auto; border-radius: 20px; box-shadow: 1px 5px 20px 0px rgba(0, 0, 0, 0.1);
  }
  .loginText{
    flex: 3; text-align: center;
  }
  .loginInp{
    flex: 9
  }
  .loginBtn{
    width: 100px; height: 30px; line-height: 30px; border-radius: 15px; text-align: center; margin: 0 auto; background-color: #FF6D92;color: white;
  }
  .fade-enter-active, .fade-leave-active {
    transition: all .5s ease;
    transform: translateX(0vw);
  }
  .fade-enter, .fade-leave-to {
    opacity: 0;
    transform: translateX(100vw);
  }

</style>

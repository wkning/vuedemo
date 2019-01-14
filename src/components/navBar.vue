<template>
    <div class="navBar">
      <div class="navBarL" @click="showLeft">侧边菜单</div>
      <div class="navBarR">
        <div>{{nowUser.username}}</div>
        <div @click="loginOut" v-if="nowUser.token">LoginOut</div>
        <div @click="loginIn" v-if="!nowUser.token">LoginIn</div>
      </div>
    </div>
</template>

<script>
  import {mapGetters,mapActions} from 'vuex'
  export default {
      name: "navBar",
      data(){
        return {

        }
      },
      computed:{
        ...mapGetters('login',['nowUser'])
      },
      methods:{
        ...mapActions('login',['signOut']),
        loginOut:function () {
          this.signOut()
        },
        loginIn:function () {
          console.log(this.$router.history.current.fullPath);
          this.$store.commit('footerStatus/hide');
          this.$router.push({
            path:'/login',
            query:{
              redirect:this.$router.history.current.fullPath
            }
          })
        },
        showLeft:function () {
          this.$store.commit('footerStatus/showL')
        }
      }
  }
</script>

<style scoped>
  .navBar{height: 40px; background-color: white; display: flex; align-items: center;justify-content: space-between; padding: 0 10px; font-size: 12px}
  .navBarR{height: 40px;display: flex; flex-direction: column; justify-content: space-around;}
</style>

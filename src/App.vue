<template>
  <div id="app">
    <transition name="fade1">
      <div class="navBar" v-if="isShow">
        <navBar></navBar>
      </div>
    </transition>
    <div class="container">
      <router-view/>
    </div>
    <transition name="fade">
      <div class="footer" v-if="isShow">
        <footerBar></footerBar>
      </div>
    </transition>
    <transition name="fade2">
      <div class="leftBarBg" v-if="leftShow">
      </div>
    </transition>
    <transition name="fade3">
      <div class="leftBar" @click="hideLeft" v-if="leftShow">

      </div>
    </transition>
  </div>
</template>

<script>

import footerBar from './components/footerBar';
import {mapGetters} from 'vuex';
import navBar from './components/navBar';
export default {
  name: 'App',
  components:{navBar, footerBar},
  data(){
    return {

    }
  },
  created(){
    //console.log(this.$store.getters.isShow);
      if(window.localStorage.getItem('nav')){
          this.$store.commit('footerStatus/changeTap',window.localStorage.getItem('nav'));
      }else {
          this.$store.commit('footerStatus/changeTap',1);
      }

    // this.$store.dispatch('getNewNum',10);
    // console.log(this.$store.getters.getChangeableNum)
      window.localStorage.getItem('nav')
  },
  computed:{
    ...mapGetters('footerStatus',['isShow','leftShow'])
  },
  methods:{
    hideLeft:function () {
      this.$store.commit('footerStatus/hideL')
    }
  },
  watch:{
    $route(to,from){
      console.log(to)
      console.log(from)
    }
  }
}
</script>

<style>
  #app {

  }
  .fade3-enter-active, .fade3-leave-active {
    transition: all .5s ease;
    transform: translateX(0);
  }
  .fade3-enter, .fade3-leave-to {
    opacity: 0;
    transform: translateX(-60vw);
  }
  .fade2-enter-active, .fade2-leave-active {
    transition: all .5s ease;
  }
  .fade2-enter, .fade2-leave-to {
    opacity: 0;
  }
  .fade1-enter-active, .fade1-leave-active {
    transition: all .5s ease;
    transform: translateY(0px);
  }
  .fade1-enter, .fade1-leave-to {
    opacity: 0;
    transform: translateY(-64px);
  }
  .fade-enter-active, .fade-leave-active {
    transition: all .5s ease;
    transform: translateY(0px);
  }
  .fade-enter, .fade-leave-to {
    opacity: 0;
    transform: translateY(64px);
  }
  .container{padding: 40px 0 64px 0}
  .navBar{position: fixed; top: 0; left: 0; right: 0; height: 40px; border-bottom: 1px solid #ccc;}
  .footer{position: fixed; bottom: 0; left: 0; right: 0; height: 64px; border-top: 1px solid #ccc;}
  .leftBarBg{position: fixed; top: 0; bottom: 0; left: 0; right: 0; background-color: rgba(0,0,0,0.5)}
  .leftBar{height: 100vh; width: 60vw; background-color: white;position: fixed;left: 0; top:0}
</style>

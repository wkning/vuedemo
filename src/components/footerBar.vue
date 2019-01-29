<template>
    <div class="footerBar">
      <div @click="showHome" :class="nowTab=='/home'?'active':''">首页{{nowTab}}</div>
      <div @click="showList" :class="nowTab=='/list'?'active':''">列表</div>
      <div @click="showPurchase" :class="nowTab=='/purcharse'?'active':''">购物车</div>
        <div @click="showCartogram" :class="nowTab=='/cartogram'?'active':''">统计图</div>
    </div>
</template>

<script>
  import {mapState,mapGetters,mapActions} from 'vuex';
  export default {
    name: "footerBar",
    data(){
      return {

      }
    },
    methods:{
      showHome:function () {
        this.$store.dispatch('footerStatus/getNewNum','/home');
        this.$router.push({path:'/home'})
      },
      showList:function () {
        this.$store.dispatch('footerStatus/getNewNum','/list');
        this.$router.push({path:'/list'})
      },
      showPurchase:function () {
        this.$store.dispatch('footerStatus/getNewNum','/purcharse');
        this.$router.push({path:'/purcharse'})
      },
      showCartogram:function () {
          this.$store.dispatch('footerStatus/getNewNum','/cartogram');
          this.$router.push({path:'/cartogram'})
      }
    },
    computed:{
      //第一种获取vuex state值
      ...mapState({
        nowTab:state=>state.footerStatus.changeableNum
      }),
      //第二种获取state的值通过getters
      // ...mapGetters('footerStatus',{
      //   nowTab:'getChangeableNum'
      // })
      //...mapGetters('footerStatus',['getChangeableNum'])
    }

  }
</script>

<style scoped>
  .footerBar{height: 64px; display: flex; align-items: center; justify-content: space-around; font-size: 14px; background-color: white}
  .active{color: red}
</style>

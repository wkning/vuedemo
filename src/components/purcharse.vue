<template>
  <transition name="fade">
    <div class="purcharse">
      现在选择的是{{nowTab}}
      现在有{{dataList.length}}条数据
    </div>
  </transition>
</template>

<script>
  import {mapState,mapGetters,mapActions} from 'vuex';
    export default {
      name: "purcharse",
      data(){
        return  {

        }
      },
      created(){
        // console.log(123);
        // console.log(this.$store.getters['collection/renderCollects'])
      },
      computed:{
        ...mapState({
          nowTab:state=>state.footerStatus.changeableNum,
          dataList:state=>state.collection.collects
        })
      }
    }
</script>

<style scoped>
  .fade-enter-active, .fade-leave-active {
    transition: all .5s ease;
    transform: translateX(0vw);
  }
  .fade-enter, .fade-leave-to {
    opacity: 0;
    transform: translateX(-100vw);
  }
  .purcharse{background-color: #f7f7f7; height: 100vh; width: 100vw; }
</style>

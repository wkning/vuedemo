<template>
  <transition name="fade">
    <div class="list">
      <div v-for="item in purchaseList">
        <div class="item" @click="addItem(item,$event)">
          <div class="itemContent" @mouseenter="test1" @mouseleave="test2"></div>
        </div>
      </div>
    </div>
  </transition>

</template>

<script>
  import {mapActions} from 'vuex';
    export default {
      name: "list",
      data(){
        return {
          purchaseList:[]
        }
      },
      created(){

      },
      mounted(){
        this.$http.get('/cgi-bin/api/freesamples/SamplesPhase/').then(res=>{
          const arr = res.data.runing.concat(res.data.done,res.data.prepare);
          this.purchaseList = arr;
          console.log(arr)
        })
      },
      methods:{
        addItem:function (val,el) {
          console.log(val);
          console.log(el.target);
          this.invokePushItems(val);
        },
        test1() {
            console.log(1)
        },
        test2(){
            console.log(2)
        },
        ...mapActions('collection',['invokePushItems'])
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
    transform: translateX(100vw);
  }
  .item{width: 100%; height: 200px; background-color: aliceblue; margin-bottom: 10px; display: flex; align-items: center;justify-content: center}
  .itemContent{width: 300px; height: 150px; background-color: #7e8c8d}
</style>

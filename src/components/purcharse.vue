<template>
  <transition name="fade">
    <div class="purcharse">
      <div>现在选择的是{{nowTab}}现在有{{dataList.length}}条数据</div>
      <div class="containerBg">
        <div class="activeItem" ref="moveBlock"></div>
        <div class="activeBtn" @click="beginMove">开始旋转</div>
      </div>
    </div>
  </transition>
</template>

<script>
  import {mapState,mapGetters,mapActions} from 'vuex';
    export default {
      name: "purcharse",
      data(){
        return  {
            leftBlock:0,
            topBlock:0,
            inter:null
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
      },
      methods:{
          beginMove:function () {
              var moveBlock = this.$refs.moveBlock;

              //第一个转折点left增加 left = 80vw 时候开始增加top 每次加20vw
              // 当top增加到140vw时候 开始减少 left80vw每次减20
              // 当left减到0时候开始减少 top 每次减少20
              //当top减少到0时候 回归最初状态 开始增加left
              // setInterval(val=>{},500)
              var leftBlock = 0,topBlock=0,count=1;
              this.inter = setInterval(val=>{
                  if(topBlock==0&&leftBlock<80){
                      leftBlock+=20;
                      moveBlock.style.left =leftBlock+'vw'
                  }else if(leftBlock==80&&topBlock<140){
                      topBlock+=20;
                      moveBlock.style.top =topBlock+'vw'
                  }else if(leftBlock>0&&leftBlock<=80&&topBlock==140){
                      leftBlock-=20;
                      moveBlock.style.left =leftBlock+'vw'
                  }else if(leftBlock==0&&topBlock<=140){
                      topBlock-=20;
                      moveBlock.style.top =topBlock+'vw'
                  }else {
                      clearInterval(this.inter)
                  }
              },10);
              const num = 1000+Math.floor(Math.random()*200);
              setTimeout(()=>{
                  clearInterval(this.inter)
              },num)
          }
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
  .purcharse{background-color: #f7f7f7; width: 100vw; }
  .containerBg{position: relative; width: 100vw; height: 160vw; background-color: palegoldenrod;}
  .activeItem{position: absolute; height: 20vw; width: 20vw; background-color: royalblue; top: 0; }
  .activeBtn{position: absolute; left: 50%; top:50%; width: 140px; height: 40px; margin-left: -50px; margin-top: -20px; background-color: white; line-height: 40px; color: red;  text-align: center}
</style>

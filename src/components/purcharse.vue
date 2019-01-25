<template>
  <transition name="fade">
    <div class="purcharse">
      <div>现在选择的是{{nowTab}}现在有{{dataList.length}}条数据</div>
      <div class="containerBg">
        <div class="luckyBg">
          <div class="item">
            <div class="choose">1</div>
            <div class="choose">2</div>
            <div class="choose">3</div>
            <div class="choose">4</div>
            <div class="choose">5</div>
          </div>
          <div class="item1">
            <div class="choose">22</div>
            <div class="choose">6</div>
          </div>
          <div class="item1">
            <div class="choose">21</div>
            <div class="choose">7</div>
          </div>
          <div class="item1">
            <div class="choose">20</div>
            <div class="choose">8</div>
          </div>
          <div class="item1">
            <div class="choose">19</div>
            <div class="choose">9</div>
          </div>
          <div class="item1">
            <div class="choose">18</div>
            <div class="choose">10</div>
          </div>
          <div class="item1">
            <div class="choose">17</div>
            <div class="choose">11</div>
          </div>

          <div class="item">
            <div class="choose">16</div>
            <div class="choose">15</div>
            <div class="choose">14</div>
            <div class="choose">13</div>
            <div class="choose">12</div>
          </div>
        </div>
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
            leftBlocks:0,
            topBlocks:0,
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
              var that = this;
              //获取滑动快节点
              var moveBlock = this.$refs.moveBlock;
              var leftBlock = this.leftBlocks,topBlock=this.topBlocks,count=1,speed=550;
              var num1 =Math.floor(Math.random()*20);
              function move(num){
                  setTimeout(()=>{
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
                      }
                      that.leftBlocks= leftBlock;
                      that.topBlocks= topBlock;
                      if(count<200+num1){
                          count++;
                          if(count<10){
                              speed-=50;
                              move(speed)
                          }else if(count>180+num1){
                              speed+=25;
                              move(speed)
                          }else {
                              speed=10;
                              move(speed)
                          }
                      }else {
                          that.luckyItem(parseInt(that.$refs.moveBlock.style.top),parseInt(that.$refs.moveBlock.style.left))
                      }
                  },num);
              }
              move(speed)
          },
          luckyItem(top,left){
              const arr = [
                  {left:0,top:0},{left:20,top:0},{left:40,top:0},{left:60,top:0},{left:80,top:0},
                  {left:80,top:20},{left:80,top:40},{left:80,top:60},{left:80,top:80},{left:80,top:100},{left:80,top:120},
                  {left:80,top:140},{left:60,top:140},{left:40,top:140},{left:20,top:140},{left:0,top:140},
                  {left:0,top:120},{left:0,top:100},{left:0,top:80},{left:0,top:60},{left:0,top:40},{left:0,top:20}
                  ];
              arr.forEach((item,index)=>{
                  if(item.top==top&&item.left==left){
                      console.log(item);
                      setTimeout(()=>{
                          this.$toast(index+1);
                      },1000);

                      return;
                  }
              })
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
  .containerBg{position: relative; width: 100vw; height: 160vw;}
  .luckyBg{position: absolute; top: 0; left: 0; right: 0; bottom: 0;}
  .item{height: 20vw; width: 100vw; display: flex;}
  .item1{height: 20vw; width: 100vw; display: flex;justify-content: space-between}
  .choose{height: 20vw; width: 20vw; border: 1px solid #ccc; box-sizing: border-box; display: flex; align-items: center;justify-content: center}
  .activeItem{position: absolute; height: 20vw; width: 20vw; background-color: royalblue; top: 0; opacity: 0.5 }
  .activeBtn{position: absolute; left: 50%; top:50%; width: 140px; height: 40px; margin-left: -70px; margin-top: -20px; line-height: 40px; color: red;  text-align: center}
</style>

<template>
  <transition name="fade">
    <div class="home">
      <div class="clock" v-progress="param" @click="test">
        <!--<canvas  v-circle width="310" height="310">-->

        <!--</canvas >-->
      </div>
    </div>
  </transition>
</template>

<script>
    export default {
        name: "home",
        data(){
            return {
                param:{height:10,color:'cyan',width:100}
            }
        },
        methods:{
            test(){
                console.log(123);
                this.param.width=this.param.width+10
                this.param= {height:10,color:'cyan',width:this.param.width}
            }
        },
        directives:{
          circle:function (el) {
            setInterval(function () {
              const ctx=el.getContext("2d");
              ctx.clearRect(0, 0, 300, 300);
              //console.log(ctx);
              //修改坐标原点
              ctx.save();
              ctx.translate(155, 155);
              //画圆盘
              ctx.beginPath();
              ctx.lineWidth = 2;
              ctx.arc(0,0,150,0,2*Math.PI);
              ctx.stroke();
              //画表盘
              for(let i=1; i<=60; i++){
                ctx.save();
                ctx.rotate((Math.PI / 180)*i*6);
                ctx.beginPath();
                ctx.strokeStyle = i % 5 ? "blue" : "red";
                if(i%5==0){
                  ctx.save();
                  ctx.moveTo(0, -140);
                  ctx.lineTo(0, -150);
                  ctx.translate(0, -130);
                  ctx.rotate(-(Math.PI / 180)*i*6);
                  ctx.textAlign='center';
                  ctx.fillText(i/5, 0, 0,10);
                  ctx.restore();
                }else {
                  ctx.moveTo(0, -145);
                  ctx.lineTo(0, -150);
                }
                ctx.closePath();
                ctx.stroke();
                ctx.restore();
              }
              const date = new Date();
              var hours = date.getHours();
              var minutes = date.getMinutes();
              var second = date.getSeconds();
              if(date.getHours()>12){
                hours-=12;
              }
              //画时针
              var hoursAngle = (Math.PI / 180)*30*hours + (Math.PI / 6)*(minutes/60);
              ctx.save();
              ctx.rotate(hoursAngle);
              ctx.beginPath();
              ctx.fillStyle = "red";
              ctx.moveTo(0, 0);
              ctx.lineTo(-6, -30);
              ctx.lineTo(0, -100);
              ctx.lineTo(6, -30);
              ctx.closePath();
              ctx.fill();
              ctx.restore();

              //画分针
              var minutesAngle = (Math.PI / 180)*minutes*6 + (Math.PI / 30)*(second/60);
              ctx.save();
              ctx.rotate(minutesAngle);
              ctx.beginPath();
              ctx.fillStyle = "yellow";
              ctx.moveTo(0, 0);
              ctx.lineTo(-4, -40);
              ctx.lineTo(0, -120);
              ctx.lineTo(4, -40);
              ctx.closePath();
              ctx.fill();
              ctx.restore();
              //画秒针
              ctx.save();
              ctx.rotate((Math.PI / 180)*second*6);
              ctx.beginPath();
              ctx.fillStyle = "black";
              ctx.moveTo(0, 0);
              ctx.lineTo(-5, -45);
              ctx.lineTo(0, -135);
              ctx.lineTo(5, -45);
              ctx.closePath();
              ctx.fill();
              ctx.restore();

              //画中心
              ctx.beginPath();
              ctx.fillStyle = "blue";
              ctx.arc(0,0,10,0,2*Math.PI);
              ctx.fill();
              ctx.restore();
            },1000);
          }
        }
    }
</script>

<style scoped>
  .home{ background-color: #f7f7f7; display: flex; align-items: center; justify-content: center; padding-top: 20px}
  .clock{width: 310px; height: 310px}
  .fade-enter-active, .fade-leave-active {
    transition: all .5s ease;
    transform: translateX(0vw);
  }
  .fade-enter, .fade-leave-to {
    opacity: 0;
    transform: translateX(-100vw);
  }
</style>

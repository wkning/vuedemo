<template>
  <transition name="fade">
    <div class="home">
      <div class="clock">
        <canvas  v-circle width="620" height="620" style="width: 310px; height: 310px ">

        </canvas >
      </div>
      <div class="clock1">
        <canvas  v-circle1 width="620" height="620" style="width: 310px; height: 310px ">

        </canvas >
      </div>
      <hr>
      <div class="line" v-progress="param"></div>
      <hr>
      <div class="circle" v-progress="param1">
        <div class="circleTitle">
          {{param1.count+'%'}}
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
    export default {
        name: "home",
        data(){
            return {
                param:{height:10,color:'cyan',width:100,type:'line'},
                param1:{type:'circle',count:80}
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
              ctx.clearRect(0, 0, 600, 600);
              //console.log(ctx);
              //修改坐标原点
              ctx.save();
              ctx.translate(310, 310);
              //画圆盘
              ctx.beginPath();
              ctx.lineWidth = 4;
              ctx.arc(0,0,300,0,2*Math.PI);
              ctx.stroke();
              //画表盘
              for(let i=1; i<=60; i++){
                ctx.save();
                ctx.rotate((Math.PI / 180)*i*6);
                ctx.beginPath();
                ctx.strokeStyle = i % 5 ? "blue" : "red";
                if(i%5==0){
                  ctx.save();
                  ctx.moveTo(0, -280);
                  ctx.lineTo(0, -300);
                  ctx.translate(0, -240);
                  ctx.rotate(-(Math.PI / 180)*i*6);
                  ctx.textAlign='center';
                  ctx.font = "40px 雅黑";
                  ctx.fillText(i/5, 0, 0);
                  ctx.restore();
                }else {
                  ctx.moveTo(0, -290);
                  ctx.lineTo(0, -300);
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
              ctx.lineTo(-12, -60);
              ctx.lineTo(0, -200);
              ctx.lineTo(12, -60);
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
              ctx.lineTo(-8, -80);
              ctx.lineTo(0, -240);
              ctx.lineTo(8, -80);
              ctx.closePath();
              ctx.fill();
              ctx.restore();
              //画秒针
              ctx.save();
              ctx.rotate((Math.PI / 180)*second*6);
              ctx.beginPath();
              ctx.fillStyle = "black";
              ctx.moveTo(0, 0);
              ctx.lineTo(-10, -90);
              ctx.lineTo(0, -270);
              ctx.lineTo(10, -90);
              ctx.closePath();
              ctx.fill();
              ctx.restore();

              //画中心
              ctx.beginPath();
              ctx.fillStyle = "blue";
              ctx.arc(0,0,20,0,2*Math.PI);
              ctx.fill();
              ctx.restore();
            },1000);
          },
          circle1:function (el) {
                setInterval(function () {
                    const ctx=el.getContext("2d");
                    ctx.clearRect(0, 0, 600, 600);
                    //console.log(ctx);
                    //修改坐标原点
                    ctx.save();
                    ctx.translate(310, 310);
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
                    ctx.lineTo(-12, -60);
                    ctx.lineTo(0, -200);
                    ctx.lineTo(12, -60);
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
                    ctx.lineTo(-8, -80);
                    ctx.lineTo(0, -240);
                    ctx.lineTo(8, -80);
                    ctx.closePath();
                    ctx.fill();
                    ctx.restore();
                    //画秒针
                    ctx.save();
                    ctx.rotate((Math.PI / 180)*second*6);
                    ctx.beginPath();
                    ctx.fillStyle = "black";
                    ctx.moveTo(0, 0);
                    ctx.lineTo(-10, -90);
                    ctx.lineTo(0, -270);
                    ctx.lineTo(10, -90);
                    ctx.closePath();
                    ctx.fill();
                    ctx.restore();

                    //画中心
                    ctx.beginPath();
                    ctx.fillStyle = "blue";
                    ctx.arc(0,0,20,0,2*Math.PI);
                    ctx.fill();
                    ctx.restore();
                },1000);
            }
        }
    }
</script>

<style scoped>
  .home{ background-color: #f7f7f7; padding-top: 20px}
  .clock{width: 310px; height: 310px; display: flex; align-items: center;justify-content: center}
  .clock1{width: 310px; height: 310px; display: flex; align-items: center;justify-content: center; background: url(../assets/timg.jpg) no-repeat; background-size:100% 100%;  }
  .fade-enter-active, .fade-leave-active {
    transition: all .5s ease;
    transform: translateX(0vw);
  }
  .line{width: 100%; height: 50px; margin: 0 auto; display: flex; align-items: center;justify-content: center;}
  .circle{width: 200px; height: 200px; margin: 0 auto;position: relative;}
  .circleTitle{position: absolute; top:50%; left: 50%; width: 40px; height: 40px; text-align: center; line-height: 40px;
    margin-left: -20px; margin-top: -20px; font-size: 20px}
  .fade-enter, .fade-leave-to {
    opacity: 0;
    transform: translateX(-100vw);
  }
</style>

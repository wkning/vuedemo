<template>
    <div class="cartogram">
        <div class="item">
            <div class="itemTitle">扇形统计图</div>
            <div class="itemContent">
                <canvas ref="circle" width="1000" height="500" style="width: 100vw; height: 50vw"></canvas>
            </div>
        </div>
        <div class="item">
            <div class="itemTitle">折线统计图</div>
            <div class="itemContent">
                <canvas v-brokenLine="val" width="1000" height="500" style="width: 100vw; height: 50vw"></canvas>
            </div>
        </div>
        <div class="item">
            <div class="itemTitle">柱状统计图</div>
            <div class="itemContent">
                <canvas v-histogram="[10,20,80,99,5,10,15,86]" width="1000" height="700" style="width: 100vw; height: 70vw"></canvas>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "index",
        data(){
            return {
                val:[98,76,56,65,75,10]
            }
        },
        created(){

        },
        mounted(){
            const list = [40,70,90,99,20];
            var sum = eval(list.join("+"));
            const circle = this.$refs.circle;
            const circleCtx = circle.getContext("2d");
            circleCtx.translate(500,250);
            circleCtx.rotate(1.5*Math.PI);
            list.forEach((item,index)=> {
                var front=0,after=0;
                if(index<1){
                    front=0;
                }else {
                    front= this.countPrecent(list,index-1)/sum;
                }
                after = this.countPrecent(list,index)/sum;
                circleCtx.fillStyle=this.randomColor();
                circleCtx.beginPath();
                circleCtx.moveTo(0,0);
                circleCtx.arc(0,0,150,front*2*Math.PI,after*2*Math.PI,false);
                circleCtx.closePath();
                circleCtx.fill();
                circleCtx.save();
                circleCtx.rotate(after*Math.PI+front*Math.PI);
                circleCtx.moveTo(100,0);
                circleCtx.lineTo(180,0);
                circleCtx.font = "20px '微软雅黑'";
                //start|end|center|left|right
                circleCtx.textAlign = 'left';
                const num =(item/sum).toFixed(3)*100+'%';
                circleCtx.strokeText(num,160,-5);
                circleCtx.stroke();
                circleCtx.restore()
            });
        },
        methods:{
            randomColor:function () {
                return "rgb("+Math.floor(Math.random()*255)+","+Math.floor(Math.random()*255)+","+Math.floor(Math.random()*255)+")"
            },
            countPrecent:function (arr,num) {
                var countSum = 0;
                for (let i =0; i<=num; i++){
                    countSum+= arr[i]
                }
               return countSum
            }
        },
        directives:{
            brokenLine:function (el,val) {
                const getCount = Math.max.apply(Math, val.value).toString().length;
                var maxNum = 1 ;
                for(let i=0 ; i<getCount; i++){
                    maxNum =maxNum*10
                }
                console.log(el);
                const brokenCtx = el.getContext("2d");
                brokenCtx.translate(0,460);
                brokenCtx.moveTo(80,-40);
                brokenCtx.lineTo(900,-40);
                brokenCtx.moveTo(80,-40);
                brokenCtx.lineTo(80,-460);
                brokenCtx.stroke();
                for(let i =0 ; i<=10; i++){
                    brokenCtx.font = "20px '微软雅黑'";
                    //start|end|center|left|right
                    brokenCtx.textAlign = 'end';
                    brokenCtx.strokeText(maxNum/10*i,75,-40*(i+1));
                    brokenCtx.moveTo(80,-40*(i+1));
                    brokenCtx.lineTo(90,-40*(i+1));
                    brokenCtx.stroke();
                }
                for(let i =0 ; i<=val.value.length; i++){
                    brokenCtx.font = "20px '微软雅黑'";
                    //start|end|center|left|right
                    brokenCtx.textAlign = 'center';
                    brokenCtx.strokeText(i+1,(i+1)*(900/val.value.length)-20,-15);
                    brokenCtx.moveTo((i+1)*(900/val.value.length)-20,-40);
                    brokenCtx.lineTo((i+1)*(900/val.value.length)-20,-50);
                    brokenCtx.stroke();
                }

                val.value.forEach((item,index)=>{
                    var begin={},end={};
                    if(index==0){
                        begin.x = 80;
                        begin.y = -40;
                    }else {
                        begin.x = index*(900/val.value.length)-20;
                        begin.y = -400*(val.value[index-1])/maxNum-40;
                    }
                    end.x = (index+1)*(900/val.value.length)-20;
                    end.y = -400*(item)/maxNum-40;
                    brokenCtx.beginPath();
                    brokenCtx.lineWidth='2';
                    brokenCtx.moveTo(begin.x,begin.y);
                    brokenCtx.lineTo(end.x,end.y);
                    brokenCtx.stroke();
                    //三条线的起点分别是 坐标原点 前面一个线的终点
                    //三个终点的Y轴位置 -40*(item/maxNum) 三个终点的X轴的位置 (index+1)*(900/val.value.length)
                });
                for (let i = 0; i<=10; i++){
                    brokenCtx.beginPath();
                    brokenCtx.lineWidth='1';
                    brokenCtx.setLineDash([25,5]);
                    brokenCtx.moveTo(100,-40*(i+1));
                    brokenCtx.lineTo(900,-40*(i+1));
                    brokenCtx.stroke();
                }

            },
            histogram:function (el,val) {
                //console.log(el);
                //console.log(val.value);
                const maxNum = Math.pow(10,Math.max.apply(Math,val.value).toString().length);
                console.log(maxNum);
                const histogramCtx = el.getContext("2d");

                // histogramCtx.moveTo(50,650);
                // histogramCtx.lineTo(950,650);
                // histogramCtx.stroke();

                histogramCtx.moveTo(50,50);
                histogramCtx.lineTo(50,650);
                histogramCtx.stroke();

                histogramCtx.moveTo(50,650);
                histogramCtx.lineTo(950,650);
                histogramCtx.stroke();
                for(let i =0 ; i<=10; i++){
                    histogramCtx.font = "20px '微软雅黑'";
                    histogramCtx.textAlign = 'end';
                    histogramCtx.strokeText(maxNum/10*i,30,650-i*60);
                    histogramCtx.moveTo(50,650-i*60);
                    histogramCtx.lineTo(70,650-i*60);
                    histogramCtx.stroke();
                }
                histogramCtx.translate(50,650);
                val.value.forEach((item,index)=>{
                    histogramCtx.fillStyle="rgb("+Math.floor(Math.random()*255)+","+Math.floor(Math.random()*255)+","+Math.floor(Math.random()*255)+")";
                    histogramCtx.beginPath();
                    histogramCtx.fillRect(450/val.value.length+900/val.value.length*index,-600*(item/maxNum),450/val.value.length,600*(item/maxNum));
                    histogramCtx.closePath();
                    histogramCtx.font = "20px '微软雅黑'";
                    histogramCtx.textAlign = 'center';
                    histogramCtx.strokeText(item,450/val.value.length+900/val.value.length*index+225/val.value.length,-600*(item/maxNum)-10);
                    histogramCtx.strokeText(index+1,450/val.value.length+900/val.value.length*index+225/val.value.length,30);
                })
            }
        }
    }
</script>

<style scoped>
    .cartogram{background-color: #f7f7f7}
    .item{margin-bottom: 10px; background-color: white;}
    .itemTitle{width: 100vw; height: 30px;line-height: 30px}
    .itemContent{width: 100vw}
</style>
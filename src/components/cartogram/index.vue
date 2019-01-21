<template>
    <div class="cartogram">
        <div class="item">
            <div class="itemTitle"></div>
            <div class="itemContent">
                <canvas ref="circle" width="800" height="400" style="width: 100vw; height: 50vw"></canvas>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "index",
        data(){
            return {

            }
        },
        created(){

        },
        mounted(){
            const list = [10,20,30,40,60,70,100,20,30];
            var sum = eval(list.join("+"));
            const circle = this.$refs.circle;
            const circleCtx = circle.getContext("2d");
            circleCtx.translate(400,200);
            list.forEach((item,index)=> {
                var front=0,after=0;
                if(index<1){
                    front=0;
                }else {
                    front= this.countPrecent(list,index-1)/sum
                }
                after = this.countPrecent(list,index)/sum;
                circleCtx.fillStyle=this.randomColor();
                circleCtx.beginPath();
                circleCtx.moveTo(0,0);
                circleCtx.arc(0,0,150,front*2*Math.PI,after*2*Math.PI,false);
                circleCtx.closePath();
                circleCtx.fill();
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

        }
    }
</script>

<style scoped>
    .cartogram{background-color: #f7f7f7}
    .item{margin-bottom: 10px; background-color: white;}
    .itemTitle{width: 100vw}
    .itemContent{width: 100vw}
</style>
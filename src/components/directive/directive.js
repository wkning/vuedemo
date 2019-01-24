import Vue from 'vue';

// const progress = Vue.directive('progress',{
//     //只调用一次，指令第一次绑定到元素时调用。在这里可以进行一次性的初始化设置。
//     bind:function (el,binding,vnode) {
//         console.log(binding)
//     },
//     //被绑定元素插入父节点时调用 (仅保证父节点存在，但不一定已被插入文档中)。
//     inserted:function () {
//         console.log('inserted')
//     },
//     //所在组件的 VNode 更新时调用，但是可能发生在其子 VNode 更新之前。指令的值可能发生了改变，也可能没有。但是你可以通过比较更新前后的值来忽略不必要的模板更新 (详细的钩子函数参数见下)。
//     update:function () {
//         console.log('update')
//     },
//     //指令所在组件的 VNode 及其子 VNode 全部更新后调用。
//     componentUpdated:function () {
//         console.log('componentUpdated')
//     },
//     //只调用一次，指令与元素解绑时调用。
//     unbind:function () {
//         console.log('unbind')
//     }
// });
var canClick = true;
//在vue中创建一个全局指令 el 是节点 binding这个是绑定值
const progress = Vue.directive('progress', function (el, binding) {
    console.log(binding.value);
    //这是圆形进度条
    if(binding.value.type==2){

       if(el.childNodes.length==1) {
           canClick =false;
           const circleProgressBar = document.createElement('canvas');
           circleProgressBar.width =200;
           circleProgressBar.height =200;
           const ctx=circleProgressBar.getContext("2d");
           ctx.save();
           ctx.translate(100, 100);
           el.appendChild(circleProgressBar);
           ctx.beginPath();
           ctx.lineWidth = 6;
           ctx.strokeStyle="#ccc";
           ctx.arc(0,0,50,0,2*Math.PI);
           ctx.stroke();
           var count = 0;
           const setInter= setInterval(function () {
               if(count<=binding.value.count){
                   count++;
                   ctx.beginPath();
                   ctx.lineWidth = 6;
                   ctx.strokeStyle="cyan";
                   ctx.arc(0,0,50,3/2*Math.PI,3/2*Math.PI+2*Math.PI*(count/100));
                   ctx.stroke();
               }else {
                   canClick =true;
                   ctx.restore();
                   clearInterval(setInter)
               }
           },30);
       }else {
            if(canClick){
                canClick = false;
                console.log(el.childNodes[1]);
                const ctx=el.childNodes[1].getContext("2d");
                ctx.clearRect(0, 0, 200, 200);
                ctx.save();
                ctx.translate(100, 100);
                ctx.beginPath();
                ctx.lineWidth = 6;
                ctx.strokeStyle="#ccc";
                ctx.arc(0,0,50,0,2*Math.PI);
                ctx.stroke();

                var count = 0;
                const setInter= setInterval(function () {
                    if(count<=binding.value.count){
                        count++;
                        ctx.beginPath();
                        ctx.lineWidth = 6;
                        ctx.strokeStyle="cyan";
                        ctx.arc(0,0,50,3/2*Math.PI,3/2*Math.PI+2*Math.PI*(count/100));
                        ctx.stroke();
                    }else {
                        canClick =true;
                        ctx.restore();
                        clearInterval(setInter)
                    }
                },30);
            }

       }
        console.log(el)
    }else {
        //这是进度条 现在那边传的参数是这个对吧 el 就是<div class="line" v-progress="param"></div>这个节点 这个和他一样
        //param:{height:10,color:'cyan',width:100,type:1}
        //这后面还要我说？
        const progressBar = document.createElement('div'); //创建一个div 这下面就等于刚我给你写的 只是换成动态的通过param传值来 注意一点当已经添加完一个区动态修改时候不能再创建节点就会出现两个所以要加判断 这个是判断 你修改进度不加这个判断会出现两个

        if(el.childNodes.length==0){ //是列出el的所有子节点在一个数组里 数组里没东西不就没子节点 有就直接改宽度就行 这个只是把指令领出来写就是
            progressBar.style.backgroundColor=binding.value.color;
            progressBar.style.width='0';
            progressBar.style.height=binding.value.height+'px';
            progressBar.style.borderRadius=binding.value.height/2+'px';
            el.appendChild(progressBar);
            progressBar.style.transition='width 1s ease';
            setTimeout(function () {
                progressBar.style.width=binding.value.width+'px';
            },0);
        }else {
            setTimeout(function () {
                el.childNodes[0].style.width=binding.value.width+'px';
            },0);
        }

    }
});

export default progress
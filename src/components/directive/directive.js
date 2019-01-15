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
const progress = Vue.directive('progress', function (el, binding) {
    console.log(binding.value);
    if(binding.value.type=='circle'){

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
        const progressBar = document.createElement('div');
        if(el.childNodes.length==0){
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
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

const progress = Vue.directive('progress', function (el, binding) {
    console.log(binding.value);
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
    console.log(el)
});

export default progress
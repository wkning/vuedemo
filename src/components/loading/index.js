import LoadingComponent from './loading.vue'

let Loading = {};

Loading.install = (Vue) => {
    Vue.component('loading', LoadingComponent)
}

export default Loading;
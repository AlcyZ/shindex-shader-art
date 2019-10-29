import Vue from 'vue';
import BootstrapVue from 'bootstrap-vue';
import VueRouter from 'vue-router';
import router from './router';
import App from './App';

import 'codemirror/lib/codemirror.css';
import 'codemirror/mode/clike/clike';
import './styles/main.scss';

Vue.use(BootstrapVue);
Vue.use(VueRouter);

new Vue({
    el: '#app',
    render: h => h(App),
    router
});

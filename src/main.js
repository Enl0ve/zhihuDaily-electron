import Vue from 'vue';
import App from './App.vue';
import './css/style.css';

// import router from './router';
// import store from './store';

Vue.config.productionTip = false;

new Vue({
  render: h => h(App),
}).$mount('#app');

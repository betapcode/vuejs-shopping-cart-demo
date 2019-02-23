import Vue from 'vue'
// khai báo sử dụng vue router
import VueRouter from 'vue-router'
// Khai báo sử dụng store
import store from './store/index'
// khai báo sử dụng thư viện format số
import Accounting from 'accounting-js'
import App from './App.vue'
// Khai báo 2 componet là product và cart
import Products from './components/Products.vue'
import Cart from './components/Cart.vue'

Vue.use(VueRouter);
// Định nghĩa router
const routes = [
    { path: '/', component: Products },
    { path: '/cart', component: Cart }
]
// Đăng ký routes
const router = new VueRouter({
    routes,
    mode: 'history'
});

Vue.filter('currency', function(val){
    return Accounting.formatMoney(val, { precision: 0, format: "%v" });
})

// Thêm router và store vừa khai báo ở trên để sử dụng trong toàn app
new Vue({
  el: '#app',
  render: h => h(App),
  router,
  store
})

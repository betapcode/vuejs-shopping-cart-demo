<template>
  <div class="cart">
    <h1 class="title">Giỏ hàng của bạn</h1>
    <p v-show="!products.length">
      <i>Chưa có sản phẩm nào!</i>
      <router-link to="/">Go shopping</router-link>
    </p>
    <table class="table is-striped" v-show="products.length">
      <thead>
        <tr>
          <td>Tên SP</td>
          <td>Giá</td>
          <td>Số lượng</td>
          <td>Xóa</td>
        </tr>
      </thead>
      <tbody>
        <tr v-for="p in products" :key="p['.key']">
            <td>{{ p.name }}</td>
            <td>${{ p.price | currency }}</td>
            <td>{{ p.quantity }}</td>
            <td>
                <button 
                    class="button is-danger"
                    @click="delItem(p)"
                > x </button>
            </td>
        </tr>
        <tr>
            <td><b>Total:</b></td>
            <td></td>
            <td><b>${{ total | currency }} vnđ</b></td>
        </tr>
      </tbody>
    </table>

    <p>
        <button v-show="products.length" class='button is-primary' @click='checkout'>Checkout</button>
    </p>

  </div>
</template>

<script>
    import { mapGetters } from 'vuex'
    import Accounting from 'accounting-js'
    export default {
        computed: {
            ...mapGetters({
                products: 'cartProducts'
            }),
            total () {
                return this.products.reduce((total, p) => {
                    return total + p.price * p.quantity
                }, 0)
            }
        },
        methods: {
            checkout(){
                alert('Thanh toán: $' + Accounting.formatMoney(this.total, { precision: 0, format: "%v" }));
            },
            delItem(item){
                this.$store.dispatch('delItem', item);
            }

        }
    }
</script>
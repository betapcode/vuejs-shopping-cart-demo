<template>
  <div>
    <h1 class="title">Danh sách sản phẩm</h1>
      <p>{{length}} sản phẩm</p>
      <table class="table is-striped">
        <thead>
          <tr>
            <th>Tên SP</th>
            <th>Mô Tả</th>
            <th>Giá Tiền</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="product in products" track-by="id" :key="product['.key']">
            <td>{{product.name}}</td>
            <td>{{product.description}}</td>
            <td>${{product.price | currency }} vnđ</td>
            <td><button @click='addToCart(product)' class='button is-info'>Add to cart</button></td>
          </tr>
        </tbody>
    </table>
  </div>
</template>

<script>
    import { mapGetters, mapActions } from 'vuex'
    export default {
        name: 'app',
        computed: mapGetters({
            products: 'allProducts',
            length: 'getNumberOfProducts'
        }),
        methods: mapActions([
            'addToCart'
        ])
    }
</script>
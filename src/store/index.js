import Vue from 'vue'
import Vuex from 'vuex'
import * as types from './mutation-types'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

// mutations
const mutations = {
    [types.ADD_TO_CART] (state, { id }) {
        const record = state.added.find(p => p.id === id)
        if (!record) {
            state.added.push({
                id,
                quantity: 1
            })
        } else {
            record.quantity++
        }
    },
    [types.REMOVE_TO_CART] (state, { item }) {
        const record = state.added.find(p => p.id === item.id);
        const i = state.added.indexOf(record);
        state.added.splice(i, 1) // remove it from array
    }
}

// initial state
const state = {
    added: [],
    all: [
        {
            id: '1000',
            name: 'Samsung Galaxy Note 9',
            description: 'siêu phẩm Samsung Galaxy Note 9 còn sở hữu dung lượng pin khủng lên tới 4.000 mAh',
            price: 22990000
        },
        {
            id: '2000',
            name: 'iPhone X 64GB',
            description: 'iPhone X là cụm từ được rất nhiều người mong chờ muốn biết và tìm kiếm trên Google bởi đây là chiếc điện thoại mà Apple kỉ niệm 10 năm iPhone đầu tiên được bán ra.',
            price: 24990000
        },
        {
            id: '3000',
            name: 'Xiaomi Mi 8',
            description: 'Xiaomi Mi 8 sẽ là cái tên được nhắc đến nhiều trong gia đình Xiaomi khi mang trong mình đầy đủ những gì gọi là cao cấp đến từ vẻ đẹp bên ngoài cũng như phần cứng mạnh mẽ bên trong ',
            price: 10990000
        }
    ]
}

// getters
const getters = {
    allProducts: state => state.all,
    getNumberOfProducts: state => (state.all) ? state.all.length : 0,
    cartProducts: state => {
        return state.added.map(({ id, quantity }) => {
            const product = state.all.find(p => p.id === id)
            return {
                id: product.id,
                name: product.name,
                price: product.price,
                quantity
            }
        })
    }
}

  // actions
  const actions = {
    addToCart({ commit }, product){
      commit(types.ADD_TO_CART, {
        id: product.id
      })
    },
    delItem({ commit }, product){
        commit(types.REMOVE_TO_CART, {
            item: product
          })
    }
  }

// khai báo store cho toàn bộ ứng dụng
export default new Vuex.Store({
    state,
    strict: debug,
    getters,
    actions,
    mutations
  })
<template>
  <li class="cart__item product" >
    <div class="product__pic">
      <img :src="item.product.image" width="120" height="120" :alt="item.product.title">
    </div>
    <h3 class="product__title">
      {{ item.product.title }}
    </h3>

    <span class="product__code">
                Артикул: {{ item.product.id }}
              </span>

    <AmountChange class="product__counter form__counter" :amount.sync="amount"/>

    <b class="product__price">
      {{ item.amount * item.product.price | numberFormat }} ₽
    </b>

    <button class="product__del button-del" type="button" aria-label="Удалить товар из корзины" @click.prevent="deleteProduct()">
      <svg width="20" height="20" fill="currentColor">
        <use xlink:href="#icon-close"></use>
      </svg>
    </button>
  </li>
</template>

<script>
import numberFormat from '@/helpers/numberFormat';
import {mapActions} from 'vuex';
import AmountChange from '@/components/AmountChange';


export default {
  name: 'CartItem',
  props: ['item'],
  components: {AmountChange},
  filters: {numberFormat},
  computed: {
    amount: {
      get(){
        return this.item.amount
      },
      set(value){
        this.$store.dispatch('updateCartProductAmount', {productId: this.item.productId, amount: value})
      }
    }
  },
  methods: {
    deleteProduct(){
      this.$store.dispatch('deleteCartProduct', {productId: this.item.productId})
    }
  }
};
</script>

<style scoped>

</style>

<template>
  <li class="catalog__item">
    <router-link class="catalog__pic" :to="{name: 'product', params: {id: product.id}}">
      <img :src="product.image" :alt="product.title">
    </router-link>

    <h3 class="catalog__title">
      <router-link :to="{name: 'product', params: {id: product.id}}">
        {{ product.title }}
      </router-link>
    </h3>

    <span class="catalog__price">
              {{ product.price | numberFormat }} ₽
    </span>

    <Palitra class="colors colors--black" :colors="product.colors" :current-color-id.sync="currentColorId"/>
  </li>
</template>

<script>

import numberFormat from '@/helpers/numberFormat';
import Palitra from '@/components/Palitra';

export default {
  components: { Palitra },
  data() {
    return {
      currentColorId: 0
    };
  },
  filters: {
    numberFormat
  },
  name: 'ProductItem',
  props: ['product'],
  // methods: {
  //   productFistColor() {
  //     let productColor = this.product.colors[0]
  //     return typeof productColor !== 'undefined' ? productColor.id : 0
  //   },
  // }
};
</script>

<style>

</style>

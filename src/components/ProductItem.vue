<template>
  <li class="catalog__item">
    <a class="catalog__pic" href="#" @click.prevent="gotoPage('product', {id: product.id})">
      <img :src="product.img" :alt="product.title">
    </a>

    <h3 class="catalog__title">
      <a href="#">
        {{ product.title }}
      </a>
    </h3>

    <span class="catalog__price">
              {{ product.price | numberFormat }} ₽
    </span>

    <Palitra :colors="product.colors" :current-color-id="product.colors ? product.colors[0] : []"/>
  </li>
</template>

<script>

import gotoPage from '@/helpers/gotoPage';
import numberFormat from '@/helpers/numberFormat';
import Palitra from '@/components/Palitra';

export default {
  components: { Palitra },
  data() {
    return {
      color: '#73B6EA'
    };
  },
  filters: {
    numberFormat
  },
  name: 'ProductItem',
  props: ['product'],
  methods: {
    gotoPage
  }
};
</script>

<style>

</style>

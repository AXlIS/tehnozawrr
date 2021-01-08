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
              {{ product.price | numberFormat}} ₽
    </span>

    <ul class="colors colors--black">
      <li class="colors__item" v-for="item in product.colors" :key="item.id">
        <label class="colors__label">
          <input class="colors__radio sr-only" type="radio" :value="item.code">
          <span class="colors__value" v-bind:style="{backgroundColor: item.code}" >
                  </span>
        </label>
      </li>
    </ul>
  </li>
</template>

<script>

import gotoPage from '@/helpers/gotoPage';
import numberFormat from '@/helpers/numberFormat';

export default {
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

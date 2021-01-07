<template>
  <ul class="catalog__list">
    <ProductItem :product="product" v-for="product in products" :key="product.id"/>
  </ul>
</template>

<script>
import ProductItem from '@/components/ProductItem';

export default {
  name: 'ProductList',
  components: { ProductItem },
  props: ['products'],
};
</script>

<style scoped>

</style>

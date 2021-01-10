<template>
  <main class="content container">
    <div class="content__top content__top--catalog">
      <h1 class="content__title">
        Каталог
      </h1>
      <span class="content__info">
        152 товара
      </span>
    </div>

    <div class="content__catalog">
      <ProductFilter :price-from.sync="filterPriceFrom" :price-to.sync="filterPriceTo"
                     :category-id.sync="filterCategoryId" :color-id.sync="filterColorId"/>
      <section class="catalog">
        <ProductList :products="products"/>
        <BasePagination v-model="page" :count="countProducts" :per-page="productPerPage"/>
      </section>
    </div>
  </main>
</template>

<script>
import products from '@/data/products';
import ProductList from '@/components/ProductList';
import BasePagination from '@/components/BasePagination';
import ProductFilter from '@/components/ProductFilter';

export default {
  name: 'MainPage',
  components: {
    ProductList,
    BasePagination,
    ProductFilter
  },
  data() {
    return {
      filterPriceFrom: 0,
      filterPriceTo: 0,
      filterCategoryId: 0,
      filterColorId: 0,
      page: 1,
      productPerPage: 6,
    };
  },
  computed: {
    filteredProducts() {
      let filteredProducts = products;

      if (this.filterPriceFrom > 0) {
        filteredProducts = filteredProducts.filter(product => product.price > this.filterPriceFrom);
      }
      if (this.filterPriceTo > 0) {
        filteredProducts = filteredProducts.filter(product => product.price < this.filterPriceTo);
      }
      if (this.filterCategoryId) {
        filteredProducts = filteredProducts.filter(product => product.categoryId === this.filterCategoryId);
      }
      if (this.filterColorId) {
          filteredProducts = filteredProducts.filter(products => products.colors.find(color => color.id === this.filterColorId))
        }
      return filteredProducts;
    },
    products() {
      const offset = (this.page - 1) * (this.productPerPage);
      return this.filteredProducts.slice(offset, offset + this.productPerPage);
    },
    countProducts() {
      return this.filteredProducts.length;
    },
  }
};
</script>

<style lang="less">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>


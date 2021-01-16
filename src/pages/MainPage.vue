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
                     :category-id.sync="filterCategoryId" :color-id.sync="filterColorId" :page.sync="page"/>
      <section class="catalog">
        <h2  v-if="productsLoading" style="text-align: center; font-family: 'PressStart'; margin: 100px">Загрузка товаров...</h2>
        <h2  v-if="productsLoading === false && products.length < 1 && productsLoadingFailed === false"
             style="text-align: center; font-family: 'PressStart'; margin: 100px">
              Таких товаров у нас нет..(
        </h2>
        <div v-if="productsLoadingFailed" style="text-align: center">
          <h2   style="text-align: center; font-family: 'PressStart'; margin: 100px">Что то пошло не так..</h2>
          <button class="error-button" @click.prevent="loadProducts" style="width: 50%">
            Попробовать еще раз
          </button>
        </div>

        <ProductList :products="products" v-show="productsLoading === false"/>
      </section>
    </div>
    <BasePagination v-model="page" :count="countProducts" :per-page="productPerPage"/>
  </main>
</template>

<script>
import ProductList from '@/components/ProductList';
import BasePagination from '@/components/BasePagination';
import ProductFilter from '@/components/ProductFilter';
import axios from 'axios';
import { API_BASE_URL } from '@/config';

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

      productsData: null,

      productsLoading: false,
      productsLoadingFailed: false
    };
  },
  computed: {
    products() {
      return this.productsData
        ? this.productsData.items.map(product => {
          return {
            ...product,
            image: product.image.file.url,
            colors: product.colors.filter(color => color.code !== '#fafafa')
          };
        })
        : [];
    },
    countProducts() {
      return this.productsData ? this.productsData.pagination.total : 0;
    },
  },
  methods: {
    loadProducts() {
      this.productsLoading = true;
      // this.productsData = null;
      this.productsLoadingFailed = false;
      clearTimeout(this.loadProductsTimer);
      this.loadProductsTimer = setTimeout(() => {
        axios
          .get(`${API_BASE_URL}/api/products`, {
            params: {
              page: this.page,
              limit: this.productPerPage,
              categoryId: this.filterCategoryId,
              minPrice: this.filterPriceFrom,
              maxPrice: this.filterPriceTo,
              colorId: this.filterColorId
            }
          })
          .then(response => this.productsData = response.data)
          .catch(() => this.productsLoadingFailed = true)
          .then(() => this.productsLoading = false)
      }, 0);

    }
  },
  created() {
    this.loadProducts();
  },
  watch: {
    page() {
      this.loadProducts();
    },
    filterPriceFrom() {
      this.loadProducts();
    },
    filterPriceTo() {
      this.loadProducts();
    },
    filterCategoryId() {
      this.loadProducts();
    },
    filterColorId() {
      this.loadProducts();
    }
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
.error-button{
  background-color: #9eff00;
  border: 1px solid #9eff00;
  font-family: "PressStart";
  color: #222;
  font-size: 13px;
  height: 20%;
  transition: .2s;
}

.error-button:hover{
  background-color: transparent;
}

.error-button:active{
  border: 1px solid black;
  outline: none;
}
</style>


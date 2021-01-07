<template>
  <component :is="currentPageComponent" :page-params="currentPageParams"
             @gotoPage="(pageName, pageParams) => gotoPage(pageName, pageParams)"/>
</template>

<script>
import MainPage from '@/pages/MainPage';
import ProductPage from '@/pages/ProductPage';
import NotFoundPage from '@/pages/NotFoundPage';
import eventBus from '@/eventBus';

const routes = {
  main: 'MainPage',
  product: 'ProductPage'
};

export default {
  data() {
    return {
      currentPage: 'main',
      currentPageParams: {},
    };
  },
  methods: {
    gotoPage(pageName, pageParams) {
      this.currentPage = pageName;
      this.currentPageParams = pageParams || {};
    }
  },
  components: {
    MainPage,
    ProductPage,
    NotFoundPage
  },
  computed: {
    currentPageComponent() {
      return routes[this.currentPage] || 'NotFoundPage';
    }
  },
  created() {
    eventBus.$on('gotoPage', (pageName, pageParams) => {
      this.gotoPage(pageName, pageParams);
    });
  }
};

</script>

<style lang="less">

</style>

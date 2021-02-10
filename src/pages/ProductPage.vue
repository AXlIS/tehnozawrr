<template>
  <main class="content container"
        style="text-align: center;
    font-family: PressStart;
    font-size: 2em;
    margin-top: 100px;
    margin-bottom: 300px;" v-if="productLoading">
    Загрузка товара...
  </main>
  <main class="content container" v-else-if="productLoadingFailed === true" style="text-align: center; height: 500px">
    <h2 style="text-align: center; font-family: 'PressStart'; margin: 100px">Такого товара у нас нет..(</h2>
    <button class="error-button" @click.prevent="loadProduct" style="width: 300px; height: 40px">
      Попробовать еще раз
    </button>
  </main>
  <main class="content container" v-else>
    <div class="content__top">
      <ul class="breadcrumbs">
        <li class="breadcrumbs__item">
          <router-link class="breadcrumbs__link" :to="{name: 'main'}">
            Каталог
          </router-link>
        </li>
        <li class="breadcrumbs__item">
          <router-link class="breadcrumbs__link" :to="{name: 'main'}">
            {{ category.title }}
          </router-link>
        </li>
        <li class="breadcrumbs__item">
          <a class="breadcrumbs__link">
            {{ product.title }}
          </a>
        </li>
      </ul>
    </div>

    <section class="item">
      <div class="item__pics pics" style="margin-top: 50px">
        <div class="pics__wrapper">
          <img width="450" height="583" :src="product.image" :alt="product.title">
        </div>
      </div>
      <div class="item__info">
        <span class="item__code">Артикул: {{ product.id }}</span>
        <h2 class="item__title">
          {{ product.title }}
        </h2>
        <div class="item__form">
          <form class="form" action="#" method="POST" @submit.prevent="addToCart">
            <b class="item__price">
              {{ product.price | numberFormat }} ₽
            </b>

            <fieldset class="form__block" v-if="product.colors.length > 0">
              <legend class="form__legend">Цвет:</legend>
              <Palitra :colors="product.colors" :current-color-id.sync="currentColor"/>
            </fieldset>
            <fieldset class="form__block">
              <legend class="form__legend">Объемб в ГБ:</legend>
              <ul class="sizes sizes--primery">
                <li class="sizes__item">
                  <label class="sizes__label">
                    <input class="sizes__radio sr-only" type="radio" name="sizes-item" value="32">
                    <span class="sizes__value">
                      32gb
                    </span>
                  </label>
                </li>
                <li class="sizes__item">
                  <label class="sizes__label">
                    <input class="sizes__radio sr-only" type="radio" name="sizes-item" value="64">
                    <span class="sizes__value">
                      64gb
                    </span>
                  </label>
                </li>
                <li class="sizes__item">
                  <label class="sizes__label">
                    <input class="sizes__radio sr-only" type="radio" name="sizes-item" value="128"
                           checked="">
                    <span class="sizes__value">
                      128gb
                    </span>
                  </label>
                </li>
              </ul>
            </fieldset>

            <div class="item__row">

              <AmountChange class="form__counter" :amount.sync="productAmount"/>

              <button class="button button--primery" type="submit" :disabled="productAddSending">
                В корзину
              </button>
            </div>

            <div class="added" v-show="productAdded">Товар добавлен в корзину</div>
            <div class="sending" v-show="productAddSending">Добавляем Ваш товар...</div>
          </form>
        </div>
      </div>

      <div class="item__desc">
        <ul class="tabs">
          <li class="tabs__item">
            <a class="tabs__link tabs__link--current">
              Описание
            </a>
          </li>
          <li class="tabs__item">
            <a class="tabs__link" href="#">
              Характеристики
            </a>
          </li>
          <li class="tabs__item">
            <a class="tabs__link" href="#">
              Гарантия
            </a>
          </li>
          <li class="tabs__item">
            <a class="tabs__link" href="#">
              Оплата и доставка
            </a>
          </li>
        </ul>

        <div class="item__content">
          <p>
            Навигация GPS, ГЛОНАСС, BEIDOU Galileo и QZSS<br>
            Синхронизация со смартфоном<br>
            Связь по Bluetooth Smart, ANT+ и Wi-Fi<br>
            Поддержка сторонних приложений<br>
          </p>

          <a href="#">
            Все характеристики
          </a>

          <h3>Что это?</h3>

          <p>
            Wahoo ELEMNT BOLT GPS – это велокомпьютер, который позволяет оптимизировать свои велотренировки,
            сделав их максимально эффективными. Wahoo ELEMNT BOLT GPS синхронизируется с датчиками по ANT+,
            объединяя полученную с них информацию. Данные отображаются на дисплее, а также сохраняются на
            смартфоне. При этом на мобильное устройство можно установить как фирменное приложение, так и
            различные приложения сторонних разработчиков. Велокомпьютер точно отслеживает местоположение,
            принимая сигнал с целого комплекса спутников. Эта информация позволяет смотреть уже преодоленные
            маршруты и планировать новые велопрогулки.
          </p>

          <h3>Дизайн</h3>

          <p>
            Велокомпьютер Wahoo ELEMNT BOLT очень компактный. Размеры устройства составляют всего 74,6 x 47,3 x
            22,1 мм. что не превышает габариты смартфона. Корпус гаджета выполнен из черного пластика.
            На обращенной к пользователю стороне расположен дисплей диагональю 56 мм. На дисплей выводятся
            координаты и скорость, а также полученная со смартфона и синхронизированных датчиков информация:
            интенсивность, скорость вращения педалей, пульс и т.д. (датчики не входят в комплект поставки).
            Корпус велокомпьютера имеет степень защиты от влаги IPX7. Это означает, что устройство не боится
            пыли, а также выдерживает кратковременное (до 30 минут) погружение в воду на глубину не более
            1 метра.
          </p>
        </div>
      </div>
    </section>
  </main>
</template>

<script>

import numberFormat from '@/helpers/numberFormat';
import Palitra from '@/components/Palitra';
import axios from 'axios';
import { API_BASE_URL } from '@/config';
import AmountChange from '@/components/AmountChange';
import { mapActions } from 'vuex';

export default {
  name: 'ProductPage',
  components: {
    Palitra,
    AmountChange
  },
  data() {
    return {
      productAmount: 1,
      currentColor: 0,

      productData: null,
      productLoading: false,
      productLoadingFailed: false,

      productAdded: false,
      productAddSending: false
    };
  },
  filters: {
    numberFormat
  },
  computed: {
    product() {
      return this.productData
        ? {
          ...this.productData,
          image: this.productData.image.file.url
        }
        : [];
    },
    category() {
      return this.productData.category;
    },
  },
  methods: {
    ...mapActions(['addProductToCart']),

    addToCart() {
      this.productAdded = false;
      this.productAddSending = true;

      this.addProductToCart({
        productId: this.product.id,
        amount: this.productAmount
      })
        .then(() => {
          this.productAdded = true;
          this.productAddSending = false;
        });
    },
    loadProduct() {
      this.productLoading = true;
      this.productLoadingFailed = false;
      axios
        .get(`${API_BASE_URL}/api/products/${this.$route.params.id}`)
        .then(response => this.productData = response.data)
        .catch(() => this.productLoadingFailed = true)
        .then(() => this.productLoading = false);
    },
  },
  watch: {
    '$route.params.id': {
      handler() {
        this.loadProduct();
      },
      immediate: true
    }
  },
};
</script>

<style lang="scss">
.error-button {
  background-color: #9eff00;
  border: 1px solid #9eff00;
  font-family: "PressStart";
  color: #222;
  font-size: 13px;
  height: 20%;
  transition: .2s;
}

.error-button:hover {
  background-color: transparent;
}

.error-button:active {
  border: 1px solid black;
  outline: none;
}

.added {
  margin-top: 20px;
  font-family: "PressStart";
  color: #9eff00;
}

.sending {
  margin-top: 20px;
  font-family: "PressStart";
  color: coral;
}
</style>

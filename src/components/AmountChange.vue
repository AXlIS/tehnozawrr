<template>
  <div>
    <button type="button" aria-label="Убрать один товар" @click.prevent="changeAmountValue(-1)">
      <svg width="10" height="10" fill="currentColor">
        <use xlink:href="#icon-minus"></use>
      </svg>
    </button>

    <input type="text" v-model.number="amount" name="count">

    <button type="button" aria-label="Добавить один товар" @click.prevent="changeAmountValue(1)">
      <svg width="10" height="10" fill="currentColor">
        <use xlink:href="#icon-plus"></use>
      </svg>
    </button>
  </div>
</template>

<script>
export default {
  name: 'AmountChange',
  props: ['amount'],
  methods: {
    changeAmountValue(count){
      if (this.amount + count > 0){
        this.$emit('update:amount', this.amount + count);
      }
    }
  }
};

</script>

<style scoped>

</style>

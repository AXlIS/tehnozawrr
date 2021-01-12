<template>
  <ul class="colors">
    <li class="colors__item" v-for="color in colors" :key="color.id">
      <label class="colors__label">
        <input class="colors__radio sr-only" type="radio" :value="color.id" v-model="computedColor">
        <span class="colors__value" :style="{backgroundColor: color.code}"></span>
      </label>
    </li>
  </ul>
</template>

<script>
export default {
  name: 'Palitra',
  props: ['colors', 'currentColorId'],
  // data(){
  //   return {
  //     colorId: this.currentColorId ? this.currentColorId.id : 0,
  //   }
  // },
  // methods: {
  //   save(value){
  //     this.$emit('update:currentColorId', value)
  //   }
  // },
  computed: {
    computedColor: {
      get(){
        return this.currentColorId
      },
      set(value){
        this.$emit('update:currentColorId', value)
      }
    }
  }
};
</script>

<style scoped>

</style>

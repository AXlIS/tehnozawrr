<template>
  <BaseFormField :title="title" :error="error">
    <input class="form__input" type="text" v-model="dataValue"
           :placeholder="placeholder">
  </BaseFormField>
</template>

<script>
import FormFieldMixin from '../mixins/FormFieldMixin';

export default {
  mixins: [FormFieldMixin]
};
</script>

<style scoped>

</style>

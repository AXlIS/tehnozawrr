import BaseFormField from '../components/BaseFormField';

export default {
  name: 'BaseFormText',
  props: ['title', 'error', 'placeholder', 'value'],
  computed: {
    dataValue: {
      get() {
        return this.value;
        
      },
      set(value) {
        this.$emit('input', value);
      }
    }
  },
  components: { BaseFormField }
};

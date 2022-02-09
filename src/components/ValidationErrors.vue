<template>
  <ul class="error-messages">
    <li v-for="(error, i) in errorMessages" :key="i">{{ error }}</li>
  </ul>
</template>

<script>
export default {
  name: "AppValidationErrors",
  props: {
    validationErrors: {
      type: Object,
      required: true,
    },
  },
  computed: {
    errorMessages() {
      return Object.keys(this.validationErrors).map((el) => {
        const messages = this.validationErrors[el].join(",");
        return `${el} ${messages}`;
      });
    },
  },
};
</script>

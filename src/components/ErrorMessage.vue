<template>
  <div>{{ massage }}</div>
</template>
<script>
export default {
  name: "AppErrorMassage",

  props: {
    massage: {
      type: String,
      requared: false,
      default: "Something went wrong :(",
    },
  },
};
</script>

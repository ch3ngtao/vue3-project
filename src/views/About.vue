<template>
  <div class="about">
    <h1>This is an about page</h1>
  </div>
</template>

<script>
import { ref } from "vue";
export default {
  setup() {
    const a = ref(0);
    return {
      a
    };
  }
};
</script>

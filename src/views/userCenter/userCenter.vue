<template>
  <div>
    <div class="user-center">
      <slideMenu />
    </div>
  </div>
</template>

<script lang="ts">
import slideMenu from "@/components/userCenterMenu/userCenterMenu.vue";
// import components from "vue-class-component";

export default {
  components: {
    slideMenu
  }
}
</script>

<style lang="scss" scoped>
.user-center {
  margin-top: 30px;
}
</style>
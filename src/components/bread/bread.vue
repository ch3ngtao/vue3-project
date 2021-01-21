<template>
  <div>
    <a-breadcrumb :routes="routes">
      <template #itemRender="{ route, paths, routes }">
        <span v-if="routes.indexOf(route) === routes.length - 1">
          {{ route.meta.title }}
        </span>
        <router-link v-else :to="`${basePath}/${paths}`">
          {{ route.meta.title }}
        </router-link>
      </template>
    </a-breadcrumb>
  </div>
</template>

<script>
import { reactive, toRefs } from "vue";
import { useRoute } from "vue-router";
export default {
  setup() {
    const routesObj = reactive({
      routes: [
        {
          path: "/home",
          meta: {
            title: "首页"
          }
        }
      ]
    });
    const route = useRoute();
    console.log(route.matched);
    routesObj.routes = routesObj.routes.concat(route.matched);
    console.log(routesObj.routes, "routes");
    return {
      ...toRefs(routesObj),
      route
    };
  }
};
</script>

<style lang="scss"></style>

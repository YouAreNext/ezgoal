<template>
  <component :is="layout">
    <router-view />
  </component>
</template>

<script>
import { computed, defineComponent } from "vue";
import { useRoute } from "vue-router";
import { useQuery, useResult } from "@vue/apollo-composable";

import ME_QUERY from "@/graphql/me.graphql";

const defaultLayout = "default";

export default defineComponent({
  setup() {
    const { result } = useQuery(ME_QUERY);
    const me = useResult(result, null, data => data.me);

    const route = useRoute();

    const layout = computed(() => {
      return (route.meta.layout || defaultLayout) + "-layout";
    });

    return { layout };
  }
});
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>

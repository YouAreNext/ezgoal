<template>
  <svg
    :class="className"
    xmlns="http://www.w3.org/2000/svg"
    v-if="iconPath != ''"
  >
    <title v-if="title">{{ title }}</title>
    <use :xlink:href="iconPath" xmlns:xlink="http://www.w3.org/1999/xlink" />
  </svg>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted, ref } from "vue";

export default defineComponent({
  props: {
    name: {
      type: String,
      required: true
    },

    title: {
      type: String,
      default: null
    }
  },

  setup(props) {
    const iconPath = ref("");

    onMounted(async () => {
      const icon = await import(`@/assets/icons/svg/${props.name}.svg`);
      iconPath.value = icon?.default?.url;
    });

    const className = computed(() => {
      return "svg-icon svg-icon--" + props.name;
    });

    return { iconPath, className };
  }
});
</script>

<style>
.svg-icon {
  width: 1em;
  height: 1em;
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
}
</style>

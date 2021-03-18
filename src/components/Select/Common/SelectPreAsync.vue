<template>
  <el-select
    v-model="selected"
    class="filter-item"
    placeholder="Please select"
    @change="update"
  >
    <el-option
      v-for="item in options"
      :key="item.title"
      :label="item.title"
      :value="item.title"
    />
  </el-select>
</template>

<script lang="ts">
import { defineComponent, PropType, ref } from "vue";

export default defineComponent({
  props: {
    getOptions: {
      type: Function as PropType<() => []>,
      default: () => []
    },
    value: {
      type: String
    }
  },
  setup(props, ctx) {
    const options = props.getOptions();
    const selected = ref<string>(props?.value ? props.value : "");
    const update = (e: any): void => {
      ctx.emit("update:value", e);
    };

    return {
      options: ref(options),
      update,
      selected
    };
  }
});
</script>

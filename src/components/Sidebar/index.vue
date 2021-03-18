<template>
  <div :class="{ 'has-logo': showLogo }">
    <logo />
    <el-scrollbar wrap-class="scrollbar-wrapper">
      <el-menu
        :default-active="activeMenu"
        :collapse="isCollapse"
        :unique-opened="false"
        :collapse-transition="false"
        mode="vertical"
      >
        <el-menu-item>
          <svg-icon name="bug"></svg-icon>
          <router-link to="/">
            <span>Main page</span>
          </router-link>
        </el-menu-item>
      </el-menu>
    </el-scrollbar>
  </div>
</template>

<script lang="ts">
// TODO: REFACTOR VUE3
import Logo from "./Logo.vue";
import SvgIcon from "@/components/SvgIcon.vue";
import { defineComponent } from "vue";

export default defineComponent({
  components: {
    Logo,
    SvgIcon
  },
  computed: {
    activeMenu() {
      const route = this.$route;
      const { meta, path } = route;
      // if set path, the sidebar will highlight the path you set
      if (meta.activeMenu) {
        return meta.activeMenu;
      }
      return path;
    }
  }
});
</script>

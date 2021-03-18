<template>
  <div :class="classObj" class="app-wrapper">
    <div
      v-if="device === 'mobile' && sidebar.opened"
      class="drawer-bg"
      @click="handleClickOutside"
    />
    <sidebar class="sidebar-container" />
    <div class="main-container">
      <div>
        <navbar />
        <tags-view />
      </div>
      <section class="app-main">
        <transition name="fade-transform" mode="out-in">
          <slot />
        </transition>
      </section>

      <!-- <app-main /> -->
    </div>
  </div>
</template>

<script lang="ts">
import Sidebar from "@/components/Sidebar/index.vue";
import Navbar from "@/components/Navbar.vue";

import { defineComponent } from "vue";

export default defineComponent({
  components: {
    Sidebar,
    Navbar
  }
});
</script>

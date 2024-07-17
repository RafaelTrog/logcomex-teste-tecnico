<template>
  <div class="relative inline-block text-left" ref="dropdown">
    <div @click="toggleMenu">
      <slot name="trigger"></slot>
    </div>

    <div v-if="isOpen"
      @click="toggleMenu"
      class="origin-top-left absolute right-0 -mt-2 w-44 rounded-xl shadow-xs bg-white ring-black ring-opacity-5 focus:outline-none z-50 overflow-hidden"
      role="menu" aria-orientation="vertical" aria-labelledby="menu-button" tabindex="-1">
      <div class="py-1" role="none">
        <slot name="options"></slot>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue';

export default {
  setup() {
    const isOpen = ref(false);
    const dropdown = ref(null);

    const toggleMenu = () => {
      isOpen.value = !isOpen.value;
    };

    const closeMenu = (event) => {
      if (dropdown.value && !dropdown.value.contains(event.target)) {
        isOpen.value = false;
      }
    };

    onMounted(() => {
      document.addEventListener('click', closeMenu);
    });

    onBeforeUnmount(() => {
      document.removeEventListener('click', closeMenu);
    });

    return {
      isOpen,
      dropdown,
      toggleMenu,
    };
  },
};
</script>

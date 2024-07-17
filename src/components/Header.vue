<template>
  <div class="header flex justify-between items-center md:px-2">
    <h1 class="title text-3xl font-bold text-darkGray">todo</h1>
    <button @click="$emit('show-modal')">
      <PlusIcon width="32" height="32" />
    </button>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import PlusIcon from './icons/PlusIcon.vue';

export default defineComponent({
  components: {
    PlusIcon
  },
  emits: ['show-modal']
});
</script>

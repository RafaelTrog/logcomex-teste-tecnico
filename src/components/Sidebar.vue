// Sidebar.vue
<template>
  <div class="sidebar lg:w-48 flex flex-col justify-between lg:h-full w-full">
    <div class="tags-container flex flex-wrap gap-4 lg:flex-col justify-between">
      <Tag v-for="tag in tags" :key="tag" :type="tag as TagType" @click="toggleTag(tag)" />
      <div :class="['hide-done-tasks hidden gap-2 items-center ml-3 mt-5 lg:flex', { 'opacity-40': !hideDoneTasks }]">
        <input type="checkbox" id="hideDoneTasks" :checked="hideDoneTasks" @change="toggleHideDoneTasks" />
        <label for="hideDoneTasks" class="font-bold cursor-pointer">Hide Done Tasks</label>
      </div>
    </div>
    <img class="illustration hidden lg:block" src="../assets/img/oldMan.svg" alt="Old Man" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import type { PropType } from 'vue'
import Tag from './Tag.vue';
import type { TagType } from './Tag.vue'

export default defineComponent({
  components: {
    Tag
  },
  props: {
    tags: {
      type: Array as PropType<string[]>,
      required: true
    },
    hideDoneTasks: {
      type: Boolean,
      required: true
    }
  },
  emits: ['toggle-tag', 'update:hideDoneTasks'],
  methods: {
    toggleTag(tag: string) {
      this.$emit('toggle-tag', tag);
    },
    toggleHideDoneTasks(event: Event) {
      const target = event.target as HTMLInputElement;
      this.$emit('update:hideDoneTasks', target.checked);
    }
  }
});
</script>
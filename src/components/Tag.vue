<template>
  <button :class="['group', { '!bg-[#f0f0f0]': selected }]" type="button" @click="toggleSelected">
    <div
      :class="['w-8 h-8 rounded-full group-hover:border group-hover:border-white', { 'border border-white': selected }, tagClass]">
    </div>
    <span>
      {{ type }}
    </span>
  </button>
</template>

<script lang="ts">
import { computed, defineComponent, PropType, ref } from 'vue';
import { tagsConfig } from './utils/tagsConfig';

export type TagType = "work" | "study" | "entertainment" | "family"

export default defineComponent({
  props: {
    type: {
      type: String as PropType<TagType>,
      required: true
    },
    selected: {
      type: Boolean
    }
  },
  setup(props) {
    const selected = ref(props.selected || false);

    const toggleSelected = () => {
      selected.value = !selected.value
    }

    const tagClass = computed(() => tagsConfig[props.type])

    return { tagClass, selected, toggleSelected }
  }
})
</script>
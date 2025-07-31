<template>
  <div v-if="modelValue" class="!z-50 fixed inset-0 flex items-center justify-center bg-black bg-opacity-60"
    @click="closeModal">
    <form class="bg-white py-12 px-6 md:py-10 md:px-16 rounded-2xl shadow-lg w-[90%] max-w-[800px] flex flex-col gap-6"
      @submit.prevent="submit" @click.stop>
      <div class="w-full flex items-center justify-between">
        <button type="button" class="p-0 hover:underline hover:bg-white active:bg-white" @click="closeModal">
          Cancel
        </button>
        <button type="submit" class="bg-darkGray text-white px-14 hover:bg-lightGray active:bg-darkGray">
          {{ task ? "Edit" : "Add" }}
        </button>
      </div>
      <div class="flex flex-col gap-8">
        <div class="flex flex-col gap-4">
          <div class="flex gap-2 items-baseline">
            <label class="font-bold text-xl text-darkGray">Title</label>
            <span v-if="errors.title" class="text-errorRed text-xs">{{ errors.title }}</span>
          </div>
          <input name="title" v-model="title" class="ml-3 outline-none" placeholder="add a title ..." />
        </div>
        <div class="flex flex-col gap-4">
          <div class="flex gap-2 items-baseline">
            <label class="font-bold text-xl text-darkGray">Description</label>
            <span v-if="errors.description" class="text-errorRed text-xs">{{ errors.description }}</span>
          </div>
          <textarea name="description" v-model="description" rows="4" class="ml-3 outline-none"
            placeholder="add a description ..."></textarea>
        </div>
      </div>
      <div class="flex flex-col gap-4">
        <span class="font-bold text-xl">Tags</span>
        <div class="flex flex-col md:flex-row md:items-center gap-x-12 gap-y-2 -ml-2 flex-wrap overflow-y-auto">
          <Tag v-for="tag in ['work', 'study', 'entertainment', 'family']" :key="tag" :type="tag as TagType"
            :selected="($props.task ? $props.task.tags : reactiveTags).includes(tag as string)"
            @click="toggleTag(tag as TagType)" />
        </div>
      </div>
    </form>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive } from 'vue';
import type { PropType } from 'vue';
import { useTasksStore } from '../store/tasks';
import type { TaskType } from '../store/tasks';
import { useForm, useField } from 'vee-validate';
import { toTypedSchema } from '@vee-validate/zod';
import * as zod from 'zod';
import Tag from './Tag.vue'
import type { TagType } from './Tag.vue'

export default defineComponent({
  props: {
    modelValue: {
      type: Boolean,
      required: true
    },
    task: {
      type: Object as PropType<TaskType>,
      default: null
    }
  },
  components: {
    Tag
  },
  emits: ['update:modelValue'],
  setup(props, { emit }) {
    const tasksStore = useTasksStore()

    const titleAlreadyExists = (title: string) => {
      if (!props.task) {
        return tasksStore.tasks.some(task => task.title === title);
      } else {
        return tasksStore.tasks.some(task => task !== props.task && task.title === title);
      }
    };

    const descriptionAlreadyExists = (description: string) => {
      if (!props.task) {
        return tasksStore.tasks.some(task => task.description === description);
      } else {
        return tasksStore.tasks.some(task => task !== props.task && task.description === description);
      }
    };

    const validationSchema = toTypedSchema(
      zod.object({
        title: zod
          .string()
          .min(1, { message: 'Task title is required' })
          .refine((value) => !titleAlreadyExists(value), { message: "Task title already exists" })
          .default(props.task ? props.task.title : '')
        ,
        description: zod
          .string()
          .min(1, { message: 'Task description is required' })
          .refine((value) => !descriptionAlreadyExists(value), { message: 'Task description already exists' })
          .default(props.task ? props.task.description : ''),
        tags: zod
          .array(zod.string())
          .default(props.task ? props.task.tags : [])
      })
    )

    const { handleSubmit, errors, resetForm } = useForm({
      validationSchema,
    })

    const { value: title } = useField('title');
    const { value: description } = useField('description');
    const { value: tags, setValue: setTags } = useField('tags');
    const reactiveTags = reactive(tags.value as TagType[] || [])

    const closeModal = () => {
      emit('update:modelValue', false)
      resetForm()
    }

    const submit = handleSubmit((values) => {
      if (props.task) {
        tasksStore.editItem(props.task, {
          title: values.title,
          description: values.description,
          tags: values.tags,
          done: props.task.done
        })
      } else {
        tasksStore.addItem({
          title: values.title,
          description: values.description,
          done: false,
          tags: values.tags
        })
      }
      closeModal()
    })

    const addTag = (tag: string) => {
      const currentTags = tags.value as string[]
      const updatedTags = [...currentTags as string[], tag]
      setTags(updatedTags)
    }

    const removeTag = (tag: string) => {
      const currentTags = tags.value as string[]
      const updatedTags = currentTags.filter(t => t !== tag)
      setTags(updatedTags)
    }

    const toggleTag = (tag: TagType) => {
      const index = props.task ? props.task.tags.indexOf(tag) : reactiveTags.indexOf(tag)
      if (index === -1) {
        addTag(tag)
      } else {
        removeTag(tag)
      }
    }

    return { submit, closeModal, toggleTag, title, description, errors, reactiveTags }
  }
})
</script>
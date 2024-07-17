import { describe, it, expect, beforeEach } from 'vitest'

import { mount, VueWrapper } from '@vue/test-utils'
import TaskModal from '../TaskModal.vue'
import { createPinia, setActivePinia } from 'pinia'
import { testTask } from './utils'
import TaskCard from '../TaskCard.vue'

describe('TaskModal', () => {
  let wrapper: VueWrapper<any>;

  beforeEach(() => {
    const pinia = createPinia()
    setActivePinia(pinia)

    wrapper = mount(TaskModal, {
      props: {
        modelValue: true
      }
    })
  })

  it('renders properly', () => {
    expect(wrapper.exists()).toBe(true)
  })

  it('renders input field for title', () => {
    const titleInput = wrapper.find('input[name="title"]')
    expect(titleInput.exists()).toBe(true)
  })

  it('renders textarea for description', () => {
    const descriptionTextarea = wrapper.find('textarea[name="description"]')
    expect(descriptionTextarea.exists()).toBe(true)
  })

  it('initializes with correct initial values', () => {
    const titleInput = wrapper.find<HTMLInputElement>('input[name="title"]')
    expect(titleInput.element.value).toBe('')

    const descriptionTextarea = wrapper.find<HTMLTextAreaElement>('textarea[name="description"]')
    expect(descriptionTextarea.element.value).toBe('')
  })
})
import { describe, it, expect, beforeEach } from 'vitest'

import { mount } from '@vue/test-utils'
import TaskList from '../TaskList.vue'
import { testTask } from './utils'
import { createPinia, setActivePinia } from 'pinia'
import { useTasksStore } from '@/store/tasks'

describe('TaskList', () => {
  
  beforeEach(() => {
    const pinia = createPinia()
    setActivePinia(pinia)
  })

  it('renders properly', () => {
    const wrapper = mount(TaskList, {
      props: {
        tasks: [
          testTask
        ]
      }
    })
    expect(wrapper.exists()).toBe(true)
  })
})

import { describe, it, expect, beforeEach } from 'vitest'

import { mount } from '@vue/test-utils'
import DropdownMenu from '../DropdownMenu.vue'
import TaskCard from '../TaskCard.vue'
import { createPinia, setActivePinia } from 'pinia'
import { testTask } from './utils'

describe('DropdownMenu', async() => {

  beforeEach(() => {
    const pinia = createPinia()
    setActivePinia(pinia)
  })

  it('renders properly', () => {
    const wrapper = mount(DropdownMenu)
    expect(wrapper.exists()).toBe(true)
  })

  it('renders options properly', async () => {
    const cardWrapper = mount(TaskCard, {
      props: {
        task: testTask
      }
    })

    expect(cardWrapper.exists()).toBe(true)
    expect(cardWrapper.text()).toContain(testTask.title)
    expect(cardWrapper.text()).toContain(testTask.description)

    await cardWrapper.find('button').trigger('click');
    expect(cardWrapper.text()).toContain('Edit...')
    expect(cardWrapper.text()).toContain('Delete...')

  })
})
import { describe, it, expect, beforeEach } from 'vitest'

import { mount, VueWrapper } from '@vue/test-utils'
import Sidebar from '../Sidebar.vue'
import type { TagType } from '../Tag.vue';

describe('Sidebar', () => {
  let wrapper: VueWrapper<any>;

  beforeEach(() => {
    wrapper = mount(Sidebar, {
      props: {
        tags: ['work', 'study', 'entertainment', 'family'],
        hideDoneTasks: false
      }
    })
  })

  it('renders tag buttons', () => {
    const tagButtons = wrapper.findAll('button')
    expect(tagButtons.length).toBe(4)

    wrapper.props().tags.forEach((tag: TagType, index: number) => {
      expect(tagButtons[index].text()).toBe(tag)
    })
  })

  it('renders done checkbox with its label', () => {
    const checkbox = wrapper.find<HTMLInputElement>('input[type="checkbox"]')
    const label = wrapper.find('label')

    expect(checkbox.exists()).toBe(true)
    expect(checkbox.element.checked).toBe(false)
    expect(label.exists()).toBe(true)
    expect(label.text()).toBe('Hide Done Tasks')
  })

})
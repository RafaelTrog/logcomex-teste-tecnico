import { describe, it, expect, beforeEach } from 'vitest'

import { mount } from '@vue/test-utils'
import Header from '../Header.vue'

describe('Header', () => {
  
  let wrapper;

  beforeEach(() => {
    wrapper = mount(Header);
  });

  it('renders todo title and add task button', () => {
    expect(wrapper.text()).toContain('todo');

    const button = wrapper.find('button');
    expect(button.exists()).toBe(true);
  });
})

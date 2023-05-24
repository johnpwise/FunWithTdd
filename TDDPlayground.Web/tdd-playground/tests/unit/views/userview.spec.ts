import { expect } from 'chai'
import { shallowMount } from '@vue/test-utils'
import UserView from '@/views/UserView.vue'

describe('UserView.vue', () => {
    it('should render', () => {
        const wrapper = shallowMount(UserView)
        expect(wrapper.exists()).to.be.true
    });
});
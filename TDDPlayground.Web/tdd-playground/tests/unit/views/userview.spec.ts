import { expect } from 'chai'
import { shallowMount } from '@vue/test-utils'
import UserView from '@/views/UserView.vue'

describe('UserView.vue', () => {
    it('should render', () => {
        const wrapper = shallowMount(UserView)
        expect(wrapper.exists()).to.be.true
    });

    it('should contain a component named "User"', () => {
        // Arrange
        const wrapper = shallowMount(UserView)

        // Act
        const userComponent = wrapper.findComponent({ name: 'User' })

        // Assert
        expect(userComponent.exists()).to.be.true
    });
});
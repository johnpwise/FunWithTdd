import { expect } from 'chai'
import { shallowMount } from '@vue/test-utils'
import { use } from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';

import axios from 'axios'
import User from '@/components/user/User.vue'

use(sinonChai);

describe('User Component', () => {
    it('should render', () => {
        const wrapper = shallowMount(User)
        expect(wrapper.exists()).to.be.true
    });

    it('should render props.pageTitle when passed', () => {
        // Arrange
        const pageTitle = 'User';
        const wrapper = shallowMount(User, {
            propsData: { pageTitle }
        });

        // Act & Assert
        expect(wrapper.text()).to.include(pageTitle);
    });

    it('should call the "loadUserDetails" method when the "Load User Details" button is clicked', () => {
        // Arrange
        const wrapper = shallowMount(User);
        const button = wrapper.find('button');
        const spy = sinon.spy(wrapper.vm, 'loadUserDetails');

        // Act
        button.trigger('click');

        // Assert
        expect(spy.called).to.be.true;
    });

    it('should call the Random User Generator API when the "loadUserDetails" method is called', async () => {
        // Arrange
        let axiosGetStub = sinon.stub(axios, 'get');

        // Setup your stub to return a resolved promise
        axiosGetStub.returns(Promise.resolve({ data: { /* ... mock data ... */ } }));

        const wrapper = shallowMount(User);

        // Act
        await wrapper.vm.loadUserDetails();

        // Assert: Check that the stub was called with the correct URL
        expect(axiosGetStub).to.have.been.calledWith('https://randomuser.me/api/');

        // Clean up: restore the original function
        axiosGetStub.restore();
    });
});
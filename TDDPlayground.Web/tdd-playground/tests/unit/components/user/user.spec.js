import { expect } from 'chai'
import { shallowMount } from '@vue/test-utils'
import { use } from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';

import axios from 'axios'
import User from '@/components/user/User.vue'

const mockUserData = require('../../../e2e/fixtures/user.json');

use(sinonChai);

describe('User Component', () => {
    let wrapper = null;

    beforeEach(() => {
        sinon.restore();
        wrapper = shallowMount(User);
    });

    it('should render', () => {
        expect(wrapper.exists()).to.be.true
    });

    it('should render props.pageTitle when passed', () => {
        // Arrange
        const pageTitle = 'User';
        wrapper = shallowMount(User, {
            propsData: { pageTitle }
        });

        // Act & Assert
        expect(wrapper.text()).to.include(pageTitle);
    });

    it('should call the "loadUserDetails" method when the "Load User Details" button is clicked', () => {
        // Arrange
        const button = wrapper.find('button');
        const spy = sinon.spy(wrapper.vm, 'loadUserDetails');

        // Act
        button.trigger('click');

        // Assert
        expect(spy.called).to.be.true;
    });

    it('should call the Random User Generator API when the "loadUserDetails" method is called', async () => {
        // Arrange
        const axiosGetStub = setupAxiosStub();

        // Act
        await wrapper.vm.loadUserDetails();

        // Assert: Check that the stub was called with the correct URL
        expect(axiosGetStub).to.have.been.calledWith('https://randomuser.me/api/');

        // Clean up: restore the original function
        axiosGetStub.restore();
    });

    it('should display the users date of birth in the correct format (DD/MM/YYYY)', async () => {
        // Arrange
        const expected = '01/01/1970';
        const axiosGetStub = setupAxiosStub();

        // Act
        await wrapper.vm.loadUserDetails();
        await axiosGetStub.returnValues[0];

        // Assert
        expect(wrapper.find('tbody tr:nth-child(2) td:nth-child(2)').text()).to.equal(expected);
    });

    describe('Format Date of Birth Method', () => {
        it('should return a date in the correct format (DD/MM/YYYY) when passed data from the API', async () => {
            // Arrange
            const expected = '01/01/1970';
            const date = '1970-01-01T17:49:01.393Z';

            // Act
            const result = await wrapper.vm.formatDateOfBirth(date);

            // Assert
            expect(result).to.equal(expected);
        });
    });
});

function setupAxiosStub() {
    let axiosGetStub = sinon.stub(axios, 'get');
    axiosGetStub.returns(Promise.resolve({data: getMockUser() }));
    return axiosGetStub;
}

function getMockUser() {
    return mockUserData
};
import { expect } from 'chai'
import { shallowMount } from '@vue/test-utils'
import { use } from 'chai'
import sinon from 'sinon'
import sinonChai from 'sinon-chai'

import DogsView from '@/views/DogsView.vue'

import axios from 'axios'

use(sinonChai);
describe('DogsView.vue', () => {
    it('renders', () => {
        const wrapper = shallowMount(DogsView)

        // Assert 'Dogs View' is displayed on screen
        expect(wrapper.text()).to.include('Dogs View')
    })

    it("should contain a method called 'getDoggieData'", () => {
        // Arrange
        const wrapper = shallowMount(DogsView)

        // Assert
        expect(wrapper.vm.getDoggieData).to.be.a('function')
    })

    it("should call external API 'https://dog.ceo/api/breeds/image/random'", async () => {
        // Arrange
        const wrapper = shallowMount(DogsView)
        const axiosGetStub = setupAxiosStub();

        // Act
        await wrapper.vm.getDoggieData();

        // Assert: Check that the stub was called with the correct URL
        expect(axiosGetStub).to.have.been.calledWith('https://dog.ceo/api/breeds/image/random');

        // Clean up: restore the original function
        axiosGetStub.restore();
    })
})

function setupAxiosStub() {
    let axiosGetStub = sinon.stub(axios, 'get');
    axiosGetStub.returns(Promise.resolve({ data: { "message": "https://images.dog.ceo/breeds/mastiff-english/2.jpg", "status": "success" } }));
    return axiosGetStub;
}
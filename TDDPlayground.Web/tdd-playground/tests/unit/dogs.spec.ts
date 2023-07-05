import { VueWrapper, shallowMount } from '@vue/test-utils';
import { expect } from 'chai';
import { use } from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';

import DogsView from '@/views/DogsView.vue';

import axios from 'axios';

use(sinonChai);

describe('DogsView.vue', () => {
    let wrapper: VueWrapper<any, any>;
    let axiosGetStub: any;

    beforeEach(() => {
        wrapper = shallowMount(DogsView);

        // Stub axios.get
        axiosGetStub = setupAxiosGetStub();
    });

    it('renders the component', () => {
        // Assert
        expect(wrapper).to.exist;
    });

    it("should contain a method called 'getDoggieData'", () => {
        // Assert
        expect(wrapper.vm.getDoggieData).to.be.a('function');
    });

    describe("when 'getDoggieData' is called", () => {
        it("should call external API 'dog.ceo/api/breeds/image/random'", async () => {
            // Arrange
            const expectedUrl = 'https://dog.ceo/api/breeds/image/random';

            // Act
            await wrapper.vm.getDoggieData();

            // Assert
            expect(axiosGetStub).to.have.been.calledWith(expectedUrl);
        });

        context("when the API call is successful", () => {
            it("should set the 'dogImage' data property with the image URL returned from the API", async () => {
                // Arrange
                const expectedUrl = 'https://images.dog.ceo/breeds/mastiff-english/2.jpg';

                // Act
                await wrapper.vm.getDoggieData();

                // Assert
                expect(wrapper.vm.dogImage).to.equal(expectedUrl);
            });
        });
    });

    afterEach(() => {
        // Clean up: restore the original function
        axiosGetStub.restore();
    });
});

function setupAxiosGetStub() {
    let axiosGetStub = sinon.stub(axios, 'get');
    axiosGetStub.returns(Promise.resolve({ data: { "message": "https://images.dog.ceo/breeds/mastiff-english/2.jpg", "status": "success" } }));
    return axiosGetStub;
}
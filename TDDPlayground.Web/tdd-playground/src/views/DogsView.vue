<template>
    <div><h1>Dogs View</h1></div>
    <div class="row">
        <div class="col-md-12">
            <div class="card">
                <div class="card-header">Doggie Data</div>
                <div class="card-body">
                    <div class="row">
                        <div class="col-md-3">
                            <label for="dogImage">Image</label>
                        </div>
                        <div class="col-md-9">
                            <img :src="dogImage" alt="dog" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import axios from 'axios';

export default defineComponent({
    name: 'DogsView',
    data() {
        return {
            dogImage: '',
        };
    },
    methods: {
        getDoggieData() : void {
            axios.get('https://dog.ceo/api/breeds/image/random')
                .then((response) => {
                    this.dogImage = response.data.message;
                })
            }
        }
    });
</script>
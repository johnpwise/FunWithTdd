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

export default defineComponent({
    name: 'DogsView',
    methods: {
        getDoggieData() {
            // fetch('https://dog.ceo/api/breeds/image/random')
            //     .then((response) => response.json())
            //     .then((data) => {
            //         // this.dogImage = data.message;
            //         console.log(data);
            //     });
        },
    },
});

</script>
<template>
    <div class="container">
        <div class="row">
            <div class="col-md-12">
                <h3>{{ pageTitle }}</h3>
            </div>
        </div>

        <div class="row">
            <div class="col-md-3">
                <button class="btn btn-primary" @click="loadUserDetails">Load User Details</button>
            </div>
            <div class="col-md-9">&nbsp;</div>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import axios from 'axios';

export default defineComponent({
    name: 'User',
    methods: {
        loadUserDetails() {
            // use axios to call an aPI with GET
            axios.get('https://www.example.com/api/endpoint')
                .then((response) => {
                    console.log(response.data);
                })
                .catch((error) => {
                    console.log(error);
                });
        }
    },
    props: {
        pageTitle: String
    }
});
</script>
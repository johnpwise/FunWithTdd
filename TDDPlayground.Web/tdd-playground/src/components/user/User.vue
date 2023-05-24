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
            <div class="col-md-9">
                <div class="card">
                    <div class="card-header">
                        User Profile
                    </div>
                    <div class="card-body">
                        <div class="row">
                            <div class="col-md-2">
                                <span>{{ formLables.fullName }}</span>
                            </div>
                            <div class="col-md-10">
                                <span>{{ user.name.title }} {{ user.name.first }} {{ user.name.last }}</span>
                            </div>
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
    name: 'User',
    data() {
        return {
            user: {
                name: {
                    title: '',
                    first: '',
                    last: ''
                }
            },
            formLables: {
                fullName: 'Full Name:'
            }
        }
    },
    methods: {
        loadUserDetails() {
            // use axios to call an aPI with GET
            axios.get('https://randomuser.me/api/')
                .then((response) => {
                    // console.log(response);
                    this.user = response.data.results[0];
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
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
                            <div class="col-md-12">
                                <table>
                                    <tbody>
                                        <tr>
                                            <td>
                                                <span>{{ formLabels.fullName }}</span>
                                            </td>
                                            <td>
                                                <span>{{ user.name.title }} {{ user.name.first }} {{ user.name.last
                                                }}</span>
                                            </td>
                                            <td rowspan="2">
                                                <img :src="user.picture.large" :alt="user.name.first" />
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <span>{{ formLabels.dob }}</span>
                                            </td>
                                            <td>
                                                <span>{{ formatDateOfBirth(user.dob.date) }}</span>
                                            </td>
                                            <td>&nbsp;</td>
                                        </tr>
                                    </tbody>
                                </table>
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
                },
                picture: {
                    medium: '',
                    large: '',
                },
                dob: {
                    date: '',
                    age: 0
                }
            },
            formLabels: {
                fullName: 'Full Name:',
                dob: 'Date of Birth:'
            }
        }
    },
    methods: {
        loadUserDetails() {
            // use axios to call an API with GET
            axios.get('https://randomuser.me/api/')
                .then((response) => {
                    this.user = response.data.results[0];
                })
                .catch((error) => {
                    console.log(error);
                });
        },
        formatDateOfBirth(dateOfBirth: string): string {
            // if the dateOfBirth string is '' then return '00/00/0000'
            if (dateOfBirth === '') {
                return '';
            }

            const dateString = dateOfBirth.split('T');
            const parts = dateString[0].split('-');
            const year = parts[0];
            const month = parts[1];
            const day = parts[2];

            return `${day}/${month}/${year}`;
        }

    },
    props: {
        pageTitle: String
    }
});
</script>
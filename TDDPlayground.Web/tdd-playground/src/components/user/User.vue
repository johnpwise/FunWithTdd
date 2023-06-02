<template>
    <div class="container">
        <div class="row">
            <div class="col-md-12">
                <h3>{{ pageTitle }}</h3>
            </div>
        </div>

        <div class="row">
            <div class="col-md-3">
                <button class="btn btn-primary" @click="loadUserDetails" :disabled="isDisabled">
                    <font-awesome-icon icon="spinner" spin v-if="isDisabled" />
                    <span v-else>Load User Details</span>
                </button>
            </div>
            <div class="col-md-9">
                <div class="card">
                    <div class="card-header">
                        User Profile
                    </div>
                    <div class="card-body">
                        <div class="row">
                            <div class="col-md-12">
                                <table class="table">
                                    <tbody>
                                        <tr>
                                            <td>
                                                <span>{{ formLabels.fullName }}</span>
                                            </td>
                                            <td>
                                                <span>{{ user.name.title }} {{ user.name.first }} {{ user.name.last
                                                }}</span>
                                            </td>
                                            <td rowspan="3">
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
                                        <tr>
                                            <td>
                                                <span>{{ formLabels.email }}</span>
                                            </td>
                                            <td>
                                                <span>{{ user.email }}</span>
                                            </td>
                                            <td>&nbsp;</td>
                                        </tr>
                                        <tr>
                                            <td colspan="3">{{ formLabels.loginDetails }}</td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <span>{{ formLabels.username }}</span>
                                            </td>
                                            <td>
                                                <span>{{ formLabels.password }}</span>
                                            </td>
                                            <td>
                                                <span>{{ formLabels.uuid }}</span>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <span>{{ user.login.username }}</span>
                                            </td>
                                            <td>
                                                <span>{{ user.login.password }}</span>
                                            </td>
                                            <td>
                                                <span>{{ user.login.uuid }}</span>
                                            </td>
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
            isDisabled: false,
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
                },
                login: {
                    uuid: '',
                    username: '',
                    password: ''
                },
                email: '',
            },
            formLabels: {
                fullName: 'Full Name:',
                dob: 'Date of Birth:',
                loginDetails: 'Login Details',
                username: 'Username:',
                password: 'Password:',
                uuid: 'UUID:',
                email: 'Email:'
            }
        }
    },
    methods: {
        loadUserDetails() {
            this.isDisabled = true;

            axios.get('https://localhost:7298/api/userprofile/getrandomuserprofile')
                .then((response) => {
                    this.user = response.data.results[0];
                })
                .catch((error) => {
                    // handle error
                })
                .finally(() => {
                    this.isDisabled = false;
                });
        },
        formatDateOfBirth(dateOfBirth: string): string {
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
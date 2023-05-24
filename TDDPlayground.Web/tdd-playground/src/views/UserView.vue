<template>
    <div>
        <User :pageTitle="pageTitle" />
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

// Components
import User from '@/components/user/User.vue';

export default defineComponent({
    name: 'UserView',
    data() {
        return {
            pageTitle: 'User Page'
        }
    },
    components: {
        User
    }
});
</script>
<template>
  <b-modal hide-footer id="UserListModal" :title="'Участники'" header-bg-variant="primary"
           header-text-variant="white" @hidden="onHidden" >
    <div v-for="(user,index) in getUsers" :key="index">
      <b-img class="align-self-center mr-2 mb-3" rounded="circle" :src="user.img" alt="Right image" width="40"
             height="40">
      </b-img>
      {{ user.name }}
    </div>
  </b-modal>
</template>

<script>
import {mapGetters} from "vuex";

export default {
  name: "User",
  computed: {
    ...mapGetters('user', ['getUsers'])
  },
  methods: {
    onHidden() {

    },
  }
}
</script>

<style scoped>

</style>

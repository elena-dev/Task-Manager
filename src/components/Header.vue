<template>
  <div id="Header" class="container-fluid mt-3">
    <div class="mainbox">
      <div class="title withoutline">
        <i class="fas fa-tasks"></i> Vue Task Manager
        <div class="right ">
          <button class="btn btn-success ml-3" @click="$bvModal.show('CreateTaskModal')"><i
              class="fas fa-plus mr-2"></i>
            Создать тикет
          </button>

          <button class="btn btn-success ml-3" @click="$bvModal.show('UserListModal')">
            <i class="fas fa-users mr-2"></i>
            Участники
          </button>

        </div>
      </div>
    </div>


  </div>
</template>
<script>

export default {
  name: 'Header',
}
</script>
<style scoped>

</style>

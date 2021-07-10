<template>
  <div class="taskList" :class="''">
    <div class="mainbox bottomredborder">
      <div class="title" :class="{'withoutline' : taskList && taskList.length>0}">
        <i class="fas" :class=" 'fa-folder'"></i> Задачи
      </div>
      <div class="content" v-if="!taskList || !taskList.length>0">There is no task
        <strong>{{ stateName }}</strong></div>
    </div>
    <template v-if="taskList">
      <div class="mainbox"  v-for="task in taskList" :key="task.id">
        <div class="title">
          <span class="clickable" :class=" task.level" @click="editTask(task)">
            {{ task.name }}
          </span>

          <div class="right">
            <span>
            {{ moment(task.date).format('ll') }}
          </span>
            <span class="badge badge-dark mr-1 clickable" @click="editTask(task)"><i class="fas fa-edit"></i></span>
            <span class="badge badge-primary" :class="task.level">{{ task.levelText }}</span>
          </div>
        </div>
        <div class="content">
          {{ task.description }}
        </div>

        <div v-if="task.user" class="d-flex justify-content-end mb-3">
          <div class="d-flex justify-content-center align-content-center">
            <span class="align-self-center mr-2 mb-3">{{ task.user.name }}</span>
            <b-img class="align-self-center mr-2 mb-3" rounded="circle" :src="task.user.img" alt="Right image" width="40"
                   height="40"></b-img>
          </div>
        </div>
      </div>
    </template>
  </div>
</template>
<script>
import {mapGetters, mapMutations} from 'vuex'
import moment from 'moment';

export default {
  name: "TaskList",
  props: {
    state: {type: String, default: "0"},
    taskList: {type: Array, default: null}
  },
  data() {
    return {
      moment
    }
  },
  mounted() {
    this.stateName = this.getStateNameById(this.state)
  },
  created() {
  },
  methods: {
    ...mapMutations('task', ['setSelectedTaskId', 'setSelectedTask']),
    async editTask(task) {
      await this.setSelectedTask(task)
      await this.$bvModal.show('UpdateTaskModal')
    },
  },
  computed: {
    ...mapGetters('all', ['getStateNameById', 'getMaxSubtaskLength', 'getDefinedValues']),

  },

}
</script>

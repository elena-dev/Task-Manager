<template>
  <div id="app">
    <Header/>
    <FilterBlock @update-search="filterTask"
                 :search=search
                 :user="filteredUser"
                 @reset="reset"
    >
    </FilterBlock>

    <div class="alert alert-danger mx-3 mt-3" v-if="getError">{{ getError }}</div>
    <div class="alert alert-success mx-3 my-3" v-if="getIsSuccess">{{ getIsSuccess }}</div>
    <div id="TaskLists" v-if="getTasks">
      <!-- <TaskList state="1" ></TaskList> -->
      <!--      <TaskList state="1" :taskList="filteredTasks"></TaskList>-->
      <TaskList state="1" :taskList="filteredTasks"></TaskList>
    </div>
    <div class="mx-3" v-else>
      <div class="mainbox mt-3">
        <div class="title"><i class="fas fa-flag"></i> It's time to start now!</div>
        <div class="content">
          Сейчас нет задач! Вы можете начать с создания нового!        </div>
      </div>
    </div>
    <CreateTaskModal/>
    <UsersModal/>
    <!-- <UpdateTaskModal id="" name="" state="" description="" levelId="" @task="taskFromChild($event)" /> -->
    <UpdateTaskModal :task="getSelectedTask"/>
  </div>
</template>

<script>
import Header from '@/components/Header.vue'
import FilterBlock from '@/components/Filter.vue'
import TaskList from '@/components/TaskList.vue'
import CreateTaskModal from '@/components/Modals/CreateTask.vue'
import UsersModal from '@/components/Modals/Users.vue'
import UpdateTaskModal from '@/components/Modals/UpdateTask.vue'
import {mapGetters} from 'vuex'

export default {
  name: 'App',
  data() {
    return {
      search: '',
      filteredUser: ''
    }
  },
  components: {
    Header, TaskList, CreateTaskModal, UpdateTaskModal, FilterBlock, UsersModal
  },
  beforeCreate() {
    this.$store.commit("all/init")
  },
  computed: {
    ...mapGetters('task', ['getTaskListByState', 'getTasks', 'getSelectedTask']),
    ...mapGetters('messages', ['getError', 'getIsSuccess', 'getMaxSubtaskLength']),

    filteredTasks() {
      let filtered = this.getTasks;
      if (this.search.length > 0) {
        filtered = this.getTasks.filter(item => item.name.toLowerCase().indexOf(this.search.toLowerCase()) > -1);
      }
      if (this.filteredUser !== '') {
        filtered = filtered.filter((item) => {
          return (item.user.name === this.filteredUser&& item.name.toLowerCase().match(this.search.toLowerCase()) )
        })
      }
      return filtered
    }
  },
  methods: {
    filterTask(data) {
      console.log(data,'hghjg')
      let {search, name} = data
      this.search = search
      this.filteredUser = name
    },
    reset(){
      this.search = ''
      this.filteredUser = ''
    }
  }
}
</script>

<style>
#app {
  max-width: 1600px;
  margin: 0 auto;
}

#TaskLists {
  display: flex;
  justify-content: center;
  align-items: stretch;
  flex-direction: row;
}

#TaskLists .taskList {
  flex: 1;
  margin: 15px;
}

#TaskLists .taskList.important {
  flex: 1 !important;
}

@media screen and (max-width: 1199px) {
  #TaskLists .taskList.important {
    flex: 2 !important;
  }
}

@media screen and (max-width: 1023px) {
  #TaskLists .taskList.important {
    flex: 1 !important;
  }
}

@media screen and (max-width: 767px) {
  #TaskLists {
    flex-direction: column;
  }

  .mainbox > .title > .right {
    display: block;
    clear: both;
    flex: none;
  }

  #Header .mainbox > .title {
    display: block;
    text-align: center;
  }

  #Header .mainbox > .title > .right .btn {
    margin-top: 10px;
  }

  .noMobile {
    display: none;
  }
}
</style>

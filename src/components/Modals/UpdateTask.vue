<template>
  <div v-if="task">
    <b-modal hide-footer id="UpdateTaskModal" :title="'Updating: ' + task.name" header-bg-variant="primary"
             header-text-variant="white" @hidden="onHidden" @shown="init">
      <div class="alert alert-danger my-3" v-if="getError">{{ getError }}</div>
      <div class="d-flex justify-content-between mr-5">
        <div class="">
          <label class="col-md-4 mb-2">Назначить:</label>
          <b-form-select v-model="selectedUser" class="mb-3">
            <b-form-select-option v-for="(user,index) in getUsers" :key="index" :value="user">{{user.name}}</b-form-select-option>
          </b-form-select>
        </div>

        <div class="">
          <label class="col-md-4 mb-2">Дата:</label>
          <d-p v-model="model.date"
               :format="'dd/MM/yyyy'"
               :disabled-dates="disabledDates"
               class="col-md-4">
          </d-p>
        </div>

      </div>
      <div class="row mb-3">
        <label for="task" class="col-md-12 col-form-label">Название задачи:</label>
        <div class="col-md-12"><input type="text" class="form-control"  v-model="nameTask"/></div>
      </div>

      <div class="row mb-4">
        <label class="col-md-12 mb-2">Статус:</label>
        <div class="col-md-6 flex-wrap" v-for="level in getLevelsReversed" :key="level.id">
          <button class="btn btn-block mt-2"
                  :class="[{selected : selectedLevel == level.id}, 'btn-'+level.name, {'btn-disabled' : selectedLevel != null && selectedLevel != level.id}]"
                  @click="selectLevel(level.id)">{{ level.text }}
          </button>
        </div>
      </div>

      <div class="row">
        <label for="task" class="col-md-8 col-sm-12">Описание:</label>
        <small class="col-md-4 col-sm-12 text-right" v-if="description"
               :class="$v.description.$params.maxLength.max >= description.length ? 'text-success' : 'text-danger'">{{
            description.length
          }}
          / {{ $v.description.$params.maxLength.max }}</small>
        <div class="col-md-12"><textarea v-model="description" class="form-control" rows="3"
                                         placeholder="Введите здесь название задачи..."></textarea></div>
      </div>


      <div class="row mt-4">
        <div class="col-md-8">
          <button class="btn btn-success btn-block" :disabled="$v.$invalid" @click="save">
            <template v-if="$v.$invalid">Контролируйте форму перед обновлением</template>
            <template v-else>Обновить задачу</template>
          </button>
        </div>
        <div class="col-md-4">
          <button class="btn btn-danger btn-block" @click="delTask()">Удалить задачу</button>
        </div>
      </div>

    </b-modal>
  </div>
</template>
<script>
import {mapGetters, mapActions} from 'vuex'
import {required, maxLength, integer} from "vuelidate/lib/validators"
import _find from 'lodash/find'
import moment from 'moment';
import vuejsDatepicker from 'vuejs-datepicker';


export default {
  name: 'UpdateTask',
  data() {
    return {
      moment,
      model: {
        date: ''
      },
      nameTask:null,
      selectedUser: null,
      disabledDates: {
        to: new Date(Date.now())
      },
      selectedLevel: null,
      getLevelsReversed: null,
      disabledTime: null,

      selectedState: null,
      getStatesReversed: null,

      description: null
    }
  },
  components: {'d-p': vuejsDatepicker},

  props: {
    task: {type: Object, default: null}
  },
  validations: {
    selectedState: {required, integer},
    selectedLevel: {required, integer},
    description: {maxLength: maxLength(100)},
  },
  computed: {
    ...mapGetters('all', ['getLevels', 'getDefinedValues', 'getStates']),
    ...mapGetters('messages', ['getError']),
    ...mapGetters('user', ['getUsers']),
  },
  methods: {
    ...mapActions('task', ['updateTask', 'deleteTask']),
    ...mapActions('messages', ['setError', 'setIsSuccess']),
    onHidden() {

    },
    customFormatter(date) {
      return moment(date).format('MMMM Do YYYY, h:mm:ss a');
    },
    init() {
      this.selectedState = this.task.state
      this.nameTask = this.task.name
      this.selectedLevel = this.task.levelId
      this.description = this.task.description
      this.model.date = this.task.date
      this.selectedUser = this.task.user
    },
    save() {
      if (this.selectedState === this.task.state && this.selectedLevel === this.task.levelId && this.description === this.task.description && this.model.date === this.task.date
          && this.task.user === this.selectedUser&&this.task.name === this.nameTask) {
        this.setError({error: 'You did not make any changes to the task information.'})
      } else {
        this.updateTask({
          id: this.task.id,
          state: this.selectedState,
          date: this.model.date,
          levelId: this.selectedLevel,
          description: this.description,
          name: this.nameTask,
          user: this.selectedUser
        }).then(() => {
          this.$bvModal.hide('UpdateTaskModal')
          this.reset()
        })
      }
    },
    reset() {
      this.id = null,
          this.name = null,
          this.levelId = null,
          this.selectedLevel = null
          this.selectedState = null
          this.description = null
          this.selectedUser = null
    },
    selectLevel(id) {
      this.selectedLevel = id
    },
    selectState(id) {
      let success = null
      if (id == 0) // before the task is closed, we should check its subtasks.
      {
        let found = _find(this.task.subTasks, {'state': 1})
        if (!found) { // if there is at least one open subtask for the task, so we can not close it
          success = true
        }
      } else {
        success = true
      }
      if (success) {
        this.selectedState = id
        // getIsSuccess
      } else {
        this.setError({error: 'You can not close this task before all subtasks are closed.'})
      }
    },
    delTask() {
      let payload = {id: this.task.id}
      this.deleteTask(payload)
          .then(() => {
            this.$bvModal.hide('UpdateTaskModal')
            this.reset()
          })
    }
  },
  created() {
    this.getLevelsReversed = this.getLevels.reverse()
    this.getStatesReversed = this.getStates.reverse()
  },
  watch: {
    task() {
      this.init()
    }
  }
}
</script>

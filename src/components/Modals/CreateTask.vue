<template>
  <div>
    <b-modal hide-footer id="CreateTaskModal" title="Создать задачу" header-bg-variant="primary"
             header-text-variant="white">
      <div class="d-flex justify-content-end mr-5">
        <d-p v-model="model.date"
             :format="'dd/MM/yyyy'"
             :disabled-dates="disabledDates"
             class="col-md-4">
        </d-p>
      </div>
      <div class="row mb-3">
        <label for="task" class="col-md-12 col-form-label">Название задачи:</label>
        <div class="col-md-12">
          <input type="text" name="name" id="name" class="form-control" v-model="name"
                 :maxlength="this.$v.name.$params.maxLength.max"
                 placeholder="Введите здесь название задачи..."/></div>
      </div>

      <div class="row mb-4">
        <label class="col-md-12 mb-2">Cтатус:</label>
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
      </div>

      <button class="btn btn-success btn-block mt-4" :disabled="$v.$invalid" @click="save">
        <template v-if="$v.$invalid">Пожалуйста, проверьте форму перед отправкой</template>
        <template v-else>Создать задачу</template>
      </button>

    </b-modal>
  </div>
</template>
<script>
import {mapActions, mapGetters} from 'vuex'
import {required, maxLength, integer} from "vuelidate/lib/validators"
import guid from '@/mixins/guid'
import vuejsDatepicker from "vuejs-datepicker";

export default {
  name: 'Modals',
  data() {
    return {
      model: {
        date: ''
      },
      disabledDates: {
        to: new Date(Date.now())
      },
      selectedLevel: null,
      parentId: "null",
      name: null,
      description: null,
      getLevelsReversed: null
    }
  },
  mixins: [guid],
  computed: {
    ...mapGetters('all', ['getLevels', 'getDefinedValues', 'getMaxSubtaskLength']),
  },
  components: {'d-p': vuejsDatepicker},

  validations: {
    name: {required, maxLength: maxLength(25)},
    selectedLevel: {required, integer},
    description: {maxLength: maxLength(100)},
  },
  methods: {
    ...mapActions('task', ['addTask']),
    selectLevel(id) {
      this.selectedLevel = id
    },
    save() {
      if (!this.$v.$invalid) {
        let data = {
          id: this.guidGenerator(),
          name: this.name,
          date: this.model.date,
          levelId: this.selectedLevel,
          description: this.description,
          state: 1,
        }
        this.addTask(data)
            .then(this.$bvModal.hide('CreateTaskModal'))
            .then(this.reset())
      }
    },
    reset() {
      this.parentId = null, this.id = null, this.name = null, this.levelId = null, this.selectedLevel = null, this.description = null
    }
  },
  created() {
    this.getLevelsReversed = this.getLevels.reverse()
  }
}
</script>
<style scoped>
#CreateTaskModal label {
  font-weight: bold;
}

#CreateTaskModal .btn-disabled {
  opacity: 0.2;
}
</style>

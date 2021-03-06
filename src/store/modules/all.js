import _ from 'lodash'
const state  = {
    definedValues: {
        maxTaskDescription: 100,
        maxSubtaskLength: 4,
    },
    states: [{id:0, name:"Closed"}, {id:1, name:"Open"},],
    levels: [
        {id:0, text:"К выполнению", name:"lightGray"},
        {id:1, text:"В процессе", name:"lightBlue"},
        {id:2, text:"Тестирование",  name:"deepblue"},
        {id:3, text:"Готово",  name:"green"},
    ]
}

const getters = {
    getStateNameById: (state) => (payload) => {
        let foundState = state.states.find(x => x.id == payload)
        //this.state.all.levels
        if(foundState){
            return foundState.name
        }
        return null
    },
    getLevels(state){
        return state.levels
    },
    getLevel(state,payload){
        return state.levels.find(x => x.id === payload)
    },


    getDefinedValues(state){
        return state.definedValues
    },
    getMaxSubtaskLength(state){
        return state.definedValues.maxSubtaskLength
    },
    getStates(state){
        return state.states
    }
}

const mutations = {
    init(){
        this.state.task.taskList = JSON.parse(localStorage.getItem('taskList'))
    },
    updateStorage(){
        this.state.task.taskList = _.orderBy(this.state.task.taskList, ['levelId', 'time'], ['desc', 'asc'])
        localStorage.setItem("taskList", JSON.stringify(this.state.task.taskList))
    },

}

const actions = {
}

export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions
}

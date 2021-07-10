const state = {
  users: [{
    id:0,
    name: "Admin",
    img:"https://picsum.photos/125/125/?image=49"
  },{
    id:1,
    name: "Test",
    img:"https://picsum.photos/125/125/?image=52"

  }, {
    id:2,
    name: "Ivan Ivanovich",
    img:"https://picsum.photos/125/125/?image=51"

  },
  ]
}
const getters = {
  getUsers(state) {
    return state.users
  },
}
export default {
  namespaced: true,
  state,
  getters,
}


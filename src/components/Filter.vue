<template>
  <div class="inpt ">
    <b-form-input size="sm" style="width: 50%" placeholder="Поиск" v-model="searching"
                  @input="$emit('update-search', {search:searching, name:''})">
    </b-form-input>
    <div class="ml-3 d-flex " >
      <b-img @click="$emit('update-search',{search:searching, name:'Admin'})" class=" mr-2 " rounded="circle" src="https://picsum.photos/125/125/?image=49"
             alt="Right image" width="40"
             height="40">
      </b-img>

      <div class="" @click="$emit('update-search',{search:'', name:''} )">
        <button class="btn btn-deepblue ml-2 align-self-center" >Сбросить
          фильтр
        </button>
      </div>
    </div>
  </div>
</template>

<script>


export default {
  name: "Filter",
  props: ['search', 'user',],
  data() {
    return {
      searching:this.search
    }
  },

}

</script>

<style scoped>
.inpt {
  width: 50%;
  padding: 10px 15px;
  display: flex;
  justify-content: flex-start;
}

</style>

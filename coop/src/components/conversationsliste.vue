<template>
  <div class="container">
    <div>
      <h1>Liste des conversations <a class="btn-floating btn-large waves-effect waves-light red" @click="creationSujet" title="Créer une conversation"><i class="material-icons">add</i></a></h1>
    </div>

    <div>
      <ul class="collection">
        <li v-for="conversation in conversations" class="collection-item">
          <b> {{ conversation.label }} </b> {{ conversation.topic }}
          <a href="!#" class="secondary-content"><i class="material-icons right" @click="supprConv( conversation._id )">delete</i>
          <router-link :to="{ name : 'conversationmodifier', params : { id:conversation._id}}"><i class="material-icons right">create</i></router-link></a>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import conversationmodifier from '@/components/conversationmodifier'
export default {
  name: 'conversationsliste',
  components :{conversationmodifier},
  data () {
    return {
      conversations :[]
    }
	},
	methods:{
    chargement() {
      window.axios.get('channels').then((response) => {
        this.conversations = response.data;
      }).catch(function(err){
        console.log(err)
      })
    },
    creationSujet(){
      this.$router.push({path: '/sujetcreation'});
    },
    supprConv(conversation_id){
       window.axios.delete('channels/'+conversation_id).then((response) =>{
          this.chargement();
       })
    }
  },
  mounted() {
    this.chargement();
 }
}
</script>

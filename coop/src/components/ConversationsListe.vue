<template>
  <div>
    <nav-bar/>
    <div>
      <p>Liste des conversations</p>
      <button  @click="creationSujet">Créer une conversation</button>
    </div>

    <div>
      <h2>Liste des conversations</h2>
      <ul>
        <li v-for="conversation in conversations">
          <b> {{ conversation.label }} </b> {{ conversation.topic }}
          <button @click="supprConv( conversation._id )"> Supprimer</button>
          <router-link :to="{ name : 'ConversationModifier', params : { id:conversation._id}}">Modifier</router-link>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import NavBar from '@/components/NavBar'
import ConversationModifier from '@/components/ConversationModifier'

export default {
  name: 'ConversationsListe',
  components :{NavBar,ConversationModifier},
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
      this.$router.push({path: '/SujetCreation'});
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

<style scoped>
</style>

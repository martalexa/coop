<template>
  <div>
    <nav-bar/>
    <div>
      <p>Liste des conversations</p>
      <button  @click="creationSujet">Créer une conversation</button>
    </div>

  <div>
    <h2>Liste des conversations</h2>
    <ul id="example-1">
      <li v-for="conversation in conversations">
        {{ conversation.label }} {{ conversation.topic }}
      </li>
    </ul>
  </div>
    </div>

</template>

<script>
import NavBar from '@/components/NavBar'

export default {
  name: 'ConversationsListe',
  components :{NavBar},
  data () {
    return {
    conversations :[]
    }
	},
	methods:{
    creationSujet(){
      this.$router.push({path: '/SujetCreation'});
    }
  },
  mounted() {
     window.axios.get('channels').then((response) => {
       this.conversations = response.data;
     }).catch(function(err){
       console.log(err)
     })
 }

}
</script>

<style scoped>
</style>

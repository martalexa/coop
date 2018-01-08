<template>
  <div>
    <nav-bar/>
    <div>
      <p>Liste des conversations</p>
      <button @click="creationSujet">Créer une conversation</button>
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
    }
	},
	methods:{
    creationSujet(){
      this.$router.push({path: '/SujetCreation'});

    }

  }
}
</script>


<style scoped>
</style>

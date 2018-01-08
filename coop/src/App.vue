<template>
  <div id="app">
   <router-view></router-view>
  </div>
</template>

<script>
import MembresCreation from './components/MembresCreation.vue'
import Connexion from './components/Connexion.vue'

export default {
  name: 'app',
  components : {MembresCreation, Connexion},
  mounted(){
  	if( !this.$store.state.member ){  //Si connecté 
		this.$router.push({path: '/connexion'});
	}
  }
}
</script>

<style>

</style>

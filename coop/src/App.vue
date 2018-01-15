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

  	if( !this.$store.state.member ){  //Si pas connecté
		  this.$router.push({path: '/connexion'});
	   } else {
     window.axios.defaults.params.token = this.$store.state.token;
     this.$router.push({path: '/conversationsListe'});
     }
     window.bus.$on('logout',() =>{

      window.axios.delete('members/signout'),
      this.$store.commit('setMember', false);
      this.$store.commit('setToken', false);
      this.$router.push({path: '/connexion'});

    })
  }
}
</script>

<style>

</style>

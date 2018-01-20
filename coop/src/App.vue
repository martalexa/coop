<template>
    <section>
      <nav id="app" class="nav-wrapper">
          <ul class="right hide-on-med-and-down">
              <li v-if="islog" @click="logout"><router-link to="/Connexion">logout</router-link></li>
              <li v-else><router-link to="/Connexion">log</router-link></li>
          </ul>
      </nav>
        <router-view></router-view>
    </section>
</template>

<script>
import MembresCreation from './components/MembresCreation.vue'
import Connexion from './components/Connexion.vue'

export default {
  name: 'app',
  components : {MembresCreation, Connexion},
  computed: {
    islog () {
      return this.$store.state.member
    }
  },
  methods:{
    logout(){
      // On fait un emit car c'est une fonction qu'on aura besoin un peu partout
      // window.bus instancier dans main
      window.bus.$emit('logout')
    }
  },
  mounted(){

  	if( !this.$store.state.member ){  //Si pas connecté
		  this.$router.push({path: '/connexion'});
		  this.connect = false
	   } else {
     window.axios.defaults.params.token = this.$store.state.token;
     this.$router.push({path: '/conversationsListe'});
     this.connect = true
     }
     window.bus.$on('logout',() => {

      window.axios.delete('members/signout'),
      this.$store.commit('setMember', false);
      this.$store.commit('setToken', false);
      this.$router.push({path: '/connexion'});
      this.connect = false
    })
  }
}
</script>
<style src="./assets/css/css.css"></style>

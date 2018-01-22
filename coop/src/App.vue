<template>
    <section>
      <nav id="app" class="nav-wrapper">
          <ul class="right hide-on-med-and-down">
            <li v-if="islog"><router-link to="/conversationsliste">Conversations</router-link></li>
            <li v-if="islog"><router-link to="/membres">Membres</router-link></li>
            <li v-if="islog" @click="logout"><router-link to="/connexion">Logout</router-link></li>
            <li v-else><router-link to="/connexion">log</router-link></li>
          </ul>
      </nav>
        <router-view></router-view>
    </section>
</template>

<script>
import conversationsliste from './components/conversationsliste.vue'
import membres from './components/membres.vue'
import membrescreation from './components/membrescreation.vue'
import connexion from './components/connexion.vue'

export default {
  name: 'app',
  components : {conversationsliste, membres, membrescreation, connexion},
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
    // this.$router.push({path: '/conversationsliste'});                    // cette ligne sert a allé sur conversationsliste quand actualise la page
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
<style src="./assets/css/css.css">
</style>

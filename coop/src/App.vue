<template>
    <div>
    <header>
        <nav class="nav-extended">
            <div class="nav-wrapper red lighten-1">
                <router-link v-if="islog" to="/conversationsliste" class="brand-logo">Co'op</router-link>
                <router-link v-else to="/connexion" class="brand-logo">Co'op</router-link>
                <a href="#" data-activates="mobile-demo" class="button-collapse"><i class="material-icons">menu</i></a>
                <ul class="right hide-on-med-and-down">
                    <li v-if="islog"><router-link to="/conversationsliste">Conversations</router-link></li>
                    <li v-if="islog"><router-link to="/membres">Membres</router-link></li>
                    <li v-if="islog" @click="logout"><router-link to="/connexion">Logout</router-link></li>
                    <li v-else><router-link to="/connexion">Se connecter</router-link></li>
                </ul>
                <ul class="side-nav" id="mobile-demo">
                    <li v-if="islog"><router-link to="/conversationsliste">Conversations</router-link></li>
                    <li v-if="islog"><router-link to="/membres">Membres</router-link></li>
                    <li v-if="islog" @click="logout"><router-link to="/connexion">Logout</router-link></li>
                    <li v-else><router-link to="/connexion">Se connecter</router-link></li>
                </ul>
            </div>
            <div class="nav-content">
                <ul class="tabs tabs-transparent">
                    <li class="tab">Bonjour {{fullname}}</li>
                </ul>
            </div>
        </nav>
    </header>
    <router-view></router-view>
    </div>
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
      return this.$store.state.member;
    },
      fullname () {
        return this.$store.state.member.fullname
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

        $( document ).ready(function() {
            $(".button-collapse").sideNav();  // menu burger responsive
        })
  	if( !this.$store.state.member ){  //Si pas connecté
		  this.$router.push({path: '/connexion'});
		  this.connect = false
	   } else {
     window.axios.defaults.params.token = this.$store.state.token;
     // Si commente cette ligne, a chaque fois qu'on actualise, redirige sur conversationsliste
     this.$router.push({path: '/conversationsliste'});
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

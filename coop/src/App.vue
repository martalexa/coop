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
                    <li v-if="islog" @click="logout"><router-link to="/connexion">Se déconnecter</router-link></li>
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
                <ul class="tabs tabs-transparent valign-wrapper">

                    <li v-if="islog" class="tab">
                      <img :src="image(email)" alt="gravatar" class="circle profil"/>
                      Bonjour {{fullname}}
                        <a class="right" v-show="boolReload" @click="load">reload</a>

                    </li>

                    <li v-else class="tab">
                      Bienvenue
                    </li>
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
      },

      boolReload () {
          return this.$route.name === "posts" ? true : false
      },
      email () {
        return this.$store.state.member.email

      }
  },
  methods:{
    logout(){
      window.bus.$emit('logout')
    },
      load(){
        window.bus.$emit('loadPost')
      },
    image (email) {
        return this.avatarDefault(email);
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

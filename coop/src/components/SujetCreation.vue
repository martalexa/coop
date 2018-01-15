<template>
<div>
  <nav-bar/>
	<form @submit="creerSujet">
    <h1>Nouvelle conversation</h1>
		<div>
			<input type="text" v-model="label" placeholder="label"/>
		</div>

		<div>
			<input type="text" v-model="topic" placeholder="topic"/>
		</div>

		<div>
			<input type="submit"/>
      <router-link to="/ConversationsListe">Retour</router-link>
		</div>

	</form>
</div>
</template>

<script>
  import NavBar from '@/components/NavBar'

  export default {
    name: 'SujetCreation',
    components :{NavBar},
    data () {
      return {
    		label :  '',
        topic : ''
      }
  	},
  	methods:{
  		creerSujet(){
        window.axios.post('channels',{
            label : this.label,
            topic : this.topic,

          params: {
            token : this.$store.state.token
          }

        }).then((response) => {

          alert('Le sujet a été créé');
          this.$router.push({path: '/ConversationsListe'});

        }).catch ((error) => {
          alert(error.response.data.error);
        })
  		}
    }
  }
</script>


<style scoped>
</style>

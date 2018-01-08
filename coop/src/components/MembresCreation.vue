<template>
	<form @submit="creerMembre">
		<div>
			<input type="text" v-model="fullname" placeholder="fullname"/>
		</div>

		<div>
			<input type="email" v-model="email" placeholder="email"/>
		</div>

		<div>
			<input type="password" v-model="password" placeholder="password"/>
		</div>
		<div>
			<input type="submit" />
			<router-link  to="/connexion">Vous connecter</router-link>
		</div>
	</form>

</template>

<script>
import ConversationsListe from '@/components/ConversationsListe'

export default {
  name: 'MembresCreation',
  data () {
    return {
		fullname :  '',
		password : '',
		email : '' ,
    }
	},
	methods:{
		creerMembre(){
			window.axios.post('members',{
				fullname : this.fullname,
				email : this.email,
				password : this.password,

			}).then((response) => {

				alert('Votre compte à été créé');
				this.$router.push({path: '/Connexion'});

			}).catch ((error) => {
				console.log(error.response.data.join(""));
			})
		}
  	}
}

</script>


<style scoped>
</style>

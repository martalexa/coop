<template>
	<form @submit="seConnecter">

		<div>
			<input type="email" v-model="email" placeholder="email"/>
		</div>

		<div>
			<input type="password" v-model="password" placeholder="password"/>
		</div>
		<div>
			<input type="submit" />
			<router-link to="/MembresCreation">Créer un compte</router-link>
		</div>
	</form>

</template>


<script>
export default {
  name: 'Connexion',
  data () {
    return {
		password : '',
		email : ''
    }
  },
	methods:{

		seConnecter(){
				window.axios.post('members/signin',{
					email : this.email,
					password : this.password,

				}).then((response) => {
					this.$store.commit('setMember', response.data.member);
					this.$store.commit('setToken', response.data.token);

					alert('Vous êtes connecté');
					this.$router.push({path: '/conversationsListe'});;

				}).catch ((error) => {
					console.log(error.response.data.error.join(""));
				})
			}
  	}
}

</script>


<style scoped>
</style>

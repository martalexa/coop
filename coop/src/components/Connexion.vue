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
		password : 'aa',
		email : 'aa@aa.aa'
    }
  },
	methods:{

		seConnecter(){
				window.axios.post('members/signin',{
					email : this.email,
					password : this.password,

				}).then((response) => {
					this.$store.commit('setMember', response.data);
					this.$store.commit('setToken', response.data.token);

					window.axios.defaults.params.token = response.data.token;

					console.log(window.axios.defaults.params);

					alert('Vous êtes connecté');
					this.$router.push({path: '/conversationsListe'});

				}).catch ((error) => {
					alert(error.response.data.error);
				})
			}
  	}
}

</script>


<style scoped>
</style>

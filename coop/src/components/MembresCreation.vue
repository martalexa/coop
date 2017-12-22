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
			
				alert(reponse.data.fullname);
			
			}).catch ((error) => {
				alert(error.response.data.error.join(""));
			})
		}
  	}
}

</script>


<style scoped>
</style>

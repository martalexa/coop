<template>
	<div class="container">
		<h1>Create account</h1>
		<form @submit="creerMembre" class="col s6 offset-s3 m6 offset-m6 l3 offset-l6">
			<div class="input-field">
				<input type="text" v-model="fullname" placeholder="fullname" id="fullname" class="validate"/>
				<label for="fullname">fullname</label>
			</div>

			<div class="input-field">
				<input type="email" v-model="email" placeholder="email" id="email" class="validate" data-error="wrong" data-success="right"/>
				<label for="email">Email</label>
			</div>

			<div class="input-field">
				<input type="password" v-model="password" placeholder="password" id="password"/>
				<label for="password">Password</label>
			</div>

			<button type="submit" class="btn waves-effect waves-light">Submit</button>
			<router-link  to="/connexion"><button type="button" class="btn waves-effect waves-light">Vous connecter</button></router-link>
		</form>
	</div>
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
					alert(error.response.data.error);
				})
			}
	  }
	}
</script>

<style scoped>
</style>

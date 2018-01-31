<template>
	<div class="container">
		<h1>Creation d'un compte</h1>
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

			<div class="input-field">
				<input type="password" v-model="passwordconfirm" placeholder="same password" id="passwordconfirm"/>
				<label for="passwordconfirm">Same password</label>
			</div>

			<button v-if="issame" type="submit" class="btn waves-effect waves-light">Créer</button>
			<button v-else type="submit" class="btn waves-effect waves-light disabled">Créer</button>
			<router-link to="/connexion"><button type="button" class="btn waves-effect waves-light">Vous connecter</button></router-link>
		</form>
	</div>
</template>

<script>
	import conversationsliste from '@/components/conversationsliste'

	export default {
	  name: 'membrescreation',
	  data () {
	    return {
				fullname :  '',
				password : '',
				passwordconfirm : '',
				email : '' ,
	    }
		},
		computed: {
	    issame () { 	// Peut envoyer le formulaire quand les mdp sont les mêmes
				if (this.password === this.passwordconfirm){
					if(this.passwordconfirm.length !== 0){
						return true;
					}
				}else{
					return false;
				}
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
					this.$router.push({path: '/connexion'});

				}).catch ((error) => {
					alert(error.response.data.error);
				})
			}
	  }
	}
</script>

<style scoped>
.messMdp{
	color: grey;
	font-style : italic;
}
</style>

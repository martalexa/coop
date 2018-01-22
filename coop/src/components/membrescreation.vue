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

			<div class="input-field">
				<input type="password" v-model="passwordconfirm" placeholder="same password" id="passwordconfirm"/>
				<label for="password">Same password</label>
			</div>

			<button  v-if="issame" type="submit" class="btn waves-effect waves-light">Submit</button>
			<span v-else type="submit">Les mots de passe ne sont pas identiques</span>
			<router-link  to="/connexion"><button type="button" class="btn waves-effect waves-light">Vous connecter</button></router-link>
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
	    issame () {
				if (this.password === this.passwordconfirm){				// Quand les mdp sont les mêmes
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
</style>

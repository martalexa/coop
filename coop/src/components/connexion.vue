<template>
	<div class="container">
		<h1>Se connecter</h1>
		<form @submit="log" class="col l3 m6 s6 offset-l6 offset-m6 offset-s3">

			<div class="input-field">
				<input type="email" v-model="email" placeholder="email" class="validate" data-error="wrong" data-success="right"/>
				<label for="email">email</label>
			</div>

			<div class="input-field">
				<input  type="password" v-model="password" placeholder="password"/>
				<label for="password">password</label>
			</div>

			<input type="submit" value="se connecter" class="btn waves-effect waves-light"/>

			<router-link to="/membrescreation"><button type="button" class="btn waves-effect waves-light">Créer un compte</button></router-link>
		</form>
	</div>
</template>


<script>
export default {

  name: 'connexion',

  data () {
    return {
			password : '',
			email : ''
    }
  },

	methods: {
		log () {
				window.axios.post('members/signin',{
				
					email : this.email,
					password : this.password,

				}).then((response) => {

					this.$store.commit('setMember', response.data);
					this.$store.commit('setToken', response.data.token);

					window.axios.defaults.params.token = response.data.token;

					//console.log(window.axios.defaults.params);
					alert('Vous êtes connecté');
					this.$router.push({path: '/conversationsliste'});

				}).catch ((error) => {
					alert(error.response.data.error);
				})
			}
		}

	}
</script>

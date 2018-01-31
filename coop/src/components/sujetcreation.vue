<template>
  <div class="container">
    <h1>Nouvelle conversation</h1>
  	<form @submit="creerSujet" class="col s6 offset-s3 m6 offset-m6 l3 offset-l6">
  		<div class="input-field">
  			<input type="text" v-model="label" id="label"/>
        <label for="label">Sujet</label>
  		</div>

  		<div class="input-field">
  			<input type="text" v-model="topic" id="topic"/>
        <label for="topic">Description</label>
  		</div>

  		<div>
        <button type="submit" class="btn waves-effect waves-light">Ajouter</button>
        <router-link to="/ConversationsListe"><button type="button" class="btn waves-effect waves-light">Retour</button></router-link>
  		</div>

  	</form>
  </div>
</template>

<script>
  export default {

    name: 'sujetcreation',

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
          this.$router.push({path: '/conversationsliste'});

        }).catch ((error) => {
          alert(error.response.data.error);
        })
  		}
    }
  }
</script>

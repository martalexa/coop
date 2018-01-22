<template>
<div>
  <nav-bar/>
	<form @submit="modifierSujet">
    <h1>Modifier la conversation</h1>
		<div>
			<input type="text" v-model="label" placeholder="label"/>
		</div>

		<div>
			<input type="text" v-model="topic" placeholder="topic"/>
		</div>

		<div>
			<input type="submit"></input>
      <router-link to="/conversationsliste">Retour</router-link>
		</div>

	</form>
</div>
</template>

<script>
  export default {
    name: 'conversationmodifier',
    data () {
      return {
    		label :  '',
        topic : ''
      }
  	},
    mounted() {

      window.axios.get('channels/'+this.$route.params.id).then((response) => {

        this.label=response.data.label;
        this.topic=response.data.topic;

      }).catch ((error) => {

        alert(error.response.data.error);

      })

    },
  	methods:{
  		modifierSujet(){
        window.axios.put('channels/'+this.$route.params.id,{
					label : this.label,
					topic : this.topic,
				}).then((response) => {

            alert('La conversation a bien été modifiée');
            this.$router.push({path: '/conversationsliste'});

        }).catch ((error) => {
          console.log(this.$route.params);
          alert(error.response.data.error);
        })
  		}

    }
  }
</script>


<style scoped>
</style>

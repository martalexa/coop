<template>
  <button @click="seDeconnecter">Se deconnecter</button>
</template>

<script>
export default {
  name: 'ConversationsListe',
  data () {
    return {
    }
	},
	methods:{
		  seDeconnecter(){
        window.axios.post('members/signout?token="$this.store"',{}).then((response) => {

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

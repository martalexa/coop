<template>
  <div>
    <p>Vous êtes connecté</p>
    <button @click="seDeconnecter">out</button>
  </div>
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
      window.axios.delete('members/signout').then((response) => {

        this.$store.commit('setMember', false);
        this.$store.commit('setToken', false);

        alert('Vous êtes déconnecté');
        this.$router.push({path: '/Connexion'});

      }).catch ((error) => {
        alert(error.response.data.error.join(""));

      })

    }
  }
}
</script>


<style scoped>
</style>

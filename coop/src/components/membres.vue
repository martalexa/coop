<template>
  <div class="container">
    <div>
      <h1>Liste des membres</h1>
    </div>

    <div>
      <ul class="collection">
        <li v-for="membre in membres" class="collection-item">
          <b> {{ membre.fullname }} </b> - {{ membre.email }}
          <a href="!#" class="secondary-content"><i class="material-icons right" @click="supprMembres( membre._id )">delete</i></a>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: 'membres',
  data () {
    return {
      membres :[]
    }
	},
	methods:{
    chargement() {
      window.axios.get('members').then((response) => {
        this.membres = response.data;
        console.log(this.$route.params.id);
      }).catch(function(err){
        console.log(err);
      })

    },
    supprMembres(membre_id){
     window.axios.delete('members/'+ membre_id ).then((response) =>{
        this.chargement();
     })
    }
  },
  mounted() {
    this.chargement();
 }
}
</script>

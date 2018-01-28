<template>
  <div class="container">
    <div>
      <h1>Liste des membres</h1>
    </div>

    <div>
      <ul class="collection">
        <li v-for="membre in membres" class="collection-item">
          <b> {{ membre.fullname }} </b> - {{ membre.email }}
          <a href="!#" class="secondary-content"><i class="material-icons right" @click="supprMembres( membre._id , this)">delete</i></a>
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

        this.membres = response.data
        return response.data[0]._id;
      }).catch(function(err){
        console.log(err);
      })

    },
    supprMembres(membre_id, idthis){
      window.axios.delete('members/'+ membre_id ).then((response) =>{
          console.log(this);
          console.log(membre_id);
          this.chargement();
        })
      }
  },
  mounted() {
    this.chargement();
 }
}
</script>

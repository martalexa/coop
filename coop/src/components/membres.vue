<template>
  <div class="container">
    <div>
      <h1>Liste des membres</h1>
    </div>

    <div>
      <ul class="collection">
        <li  v-for="membre in membres"  class="collection-item">
          <img :src="image(membre.email)" alt="gravatar" class="circle"/>

          <span v-if="myid == membre._id" class="moi membre"> <b> Moi </b> {{ membre.email }}</span>
          <span v-else class="membre"><b>{{ membre.fullname }}</b> {{ membre.email }}</span>
          <div>
            <a v-if="myid !== membre._id" href="#" class="secondary-content right">
              <i class="material-icons right delete" @click="supprMembres(membre._id)">delete</i>
            </a>
          </div>
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
  computed: {
    myid () {
      return this.$store.state.member._id;
    }
  },
	methods:{
    chargement() {
      window.axios.get('members').then((response) => {

        this.membres = response.data

      }).catch(function(err){
        console.log(err);
      })

    },
    supprMembres(membre_id){
      window.axios.delete('members/'+ membre_id ).then((response) =>{
          console.log(membre_id);
          this.chargement();
        })
      },
    image(email) {
        return this.avatarDefault(email);
    }
  },

  mounted() {
    this.chargement();
 }
}
</script>

<style scoped>
  .delete{
    color:#ef4450;
  }
  .moi{
    color: grey;
  }
  b{
    font-size:12pt;
  }
  .circle {
    width : 50px;
  }
  .membre{
    border:0px;
    margin-left: 25px;
  }
  li{
  	display: -ms-flexbox;
  	display: -webkit-flex;
  	display: flex;

  	-ms-flex-align: center;
  	-webkit-align-items: center;
  	-webkit-box-align: center;
  	align-items: center;
  }
  li>div{
    width:100%;
    display: flex;
    justify-content: right;
  }

</style>

<template>
  <div class="container">
    <div>
      <h1>Liste des conversations <a class="btn-floating btn-large waves-effect waves-light red" @click="creationSujet" title="Créer une conversation"><i class="material-icons">add</i></a></h1>
    </div>

    <div>
      <ul class="collection">
        <div v-for="conversation in conversations">

          <router-link :to="{ name : 'posts', params : { id : conversation._id} }" class="conversation">
            <li class="collection-item conv">
              <b>{{ conversation.label }}</b>
              <span class="detail">{{ conversation.topic }}</span>
              <a class="secondary-content">
                <router-link to="/conversationsliste"><i class="material-icons right delete" @click="supprConv( conversation._id )">delete</i></router-link>
                <router-link :to="{ name : 'conversationmodifier', params : { id:conversation._id}}"><i class="material-icons right create">create</i></router-link>
              </a>
            </li>
          </router-link>

        </div>
      </ul>

    </div>
  </div>
</template>

<script>
import conversationmodifier from '@/components/conversationmodifier'
export default {
  name: 'conversationsliste',
  components :{conversationmodifier},
  data () {
    return {
      conversations :[]
    }
	},
	methods:{
    chargement() {
      window.axios.get('channels').then((response) => {
        this.conversations = response.data;
      }).catch(function(err){
        console.log(err)
      })
    },
    creationSujet(){
      this.$router.push({path: '/sujetcreation'});
    },
    supprConv(conversation_id){
       window.axios.delete('channels/'+conversation_id).then((response) =>{
          this.chargement();
       })
    }
  },
  mounted() {
    this.chargement();
 }
}
</script>

<style scoped>
  .conversation{
    color: black;
    font-size:12pt;
  }
  .detail{
    color: grey;
  }
  .collection-item:hover{
    background-color:#ef9a9a;
  }
  li{
    border:1px solid #e0e0e0;
  }
  .delete{
    color:#ef4450;
  }
  .create{
    color:#26a69a;
  }
  .conv{
    height:43px;
  }
  </style>

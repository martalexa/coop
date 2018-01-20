<template>
  <div>
    <button @click="seDeconnecter">Se deconnecter</button>
    <hr/>
  </div>
</template>

<script>
export default {
  name: 'NavBar',
  data () {
    return {
      
    }
	},
	methods:{
    seDeconnecter(){
        // On fait un emit car c'est une fonction qu'on aura besoin un peu partout
        // window.bus instancier dans main
        window.bus.$emit('logout');
    }
  }
}
</script>


<style scoped>
</style>

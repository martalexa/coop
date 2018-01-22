<template>
    <div id="container">
        <div class="row">
            <ul class="collection">
                <li class="collection-item avatar" v-for="post in posts">
                    <img src="https://1.bp.blogspot.com/-iQmayUWj2xE/Vjd6eV-c4YI/AAAAAAAAPA0/RMUUNnPslsk/s1600/slack.png" alt="logo" class="circle">
                    <span class="title"></span>
                    <p>
                       {{post.message}}
                    </p>
                </li>
            </ul>
        </div>
        <div class="mypost">
            <form action="#">
                <div class="row valign-wrapper">
                    <div class="input-field col s10">
                        <textarea id="textarea1" class="materialize-textarea" v-model="message"></textarea>
                        <label for="textarea1">Textarea</label>
                    </div>
                    <div class="col s2">
                        <a class="waves-effect waves-light btn" @click="createPost"><i class="material-icons left">send</i>send</a>
                    </div>
                </div>
            </form>
        </div>
    </div>
</template>

<script>
    export default {
        name: "posts",
        data () {
            return {
                message: '',
                posts : []
            }
        },
        methods: {
            // todo: Rajouter la methode qui récupere les membre qui sont associé au message 
            loadPost () {
                window.axios.get('channels/' + this.$route.params.id + '/posts').then((response) => {
                    this.posts = response.data;
                }).catch(function(err){
                    console.log(err)
                })
            },
            createPost () {
                window.axios.post('channels/' + this.$route.params.id + '/posts',{
                    message: this.message,
                    params : {
                        token : this.$store.state.token
                    }
                }).then((response) => {

                    this.loadPost()

                }).catch ((error) => {
                    alert(error.response.data.error);
                })
            }
        },
        mounted () {
            this.loadPost()
        }
    }
</script>

<style scoped>

    .mypost{
        position: fixed;
        bottom: 0;
        width: 100%;
        background-color: lightblue;
    }
    .collection{
        overflow-y: scroll;
    }
</style>
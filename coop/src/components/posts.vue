<template>
    <div>
        <div ref="chat" class="row chat">
            <ul class="collection">
                <li class="collection-item avatar" v-for="post in display">

                    <img :src="image(post.member.email)" alt="logo" class="circle"/>

                    <span class="title">{{post.member.fullname}}
                        <a href="#" class="secondary-content" v-if="userID === post.member._id">
                            <i class="material-icons right" @click="deletePost(post.post._id)">delete</i>
                            <i class="material-icons right" @click="findEdit($event)">create</i></a></span><p :contenteditable="theUser(post.member._id, userID)" @keydown.enter="blur($event)" @blur="changePost(post.post._id,post.post.message,myEvent,$event)" @click="helpEnter($event)">
                       {{post.post.message}}
                    </p>
                </li>
            </ul>
        </div>
        <div class="row mypost valign-wrapper">
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
                edit: '',
                userID:this.$store.state.member._id,
                editable:false,
                posts : [],
                members : [],
                display : [],
                myEvent : {}
            }
        },
        mounted () {

          window.setTimeout(() => {
            let chat = document.querySelector('.chat');
          this.$refs.chat.scrollTop = this.$refs.chat.scrollHeight
        },1000);

          let help = "Cliquez sur le message pour le modifier";
           window.setTimeout(Materialize.toast(help, 4000),2000);
        },
        methods: {
            // todo: Rajouter la methode qui récupere les membre qui sont associé au message
            loadPost () {

                window.axios.get('channels/' + this.$route.params.id + '/posts').then((response) => {

                    this.posts = response.data;
                    window.axios.get('members').then((response) => {
                        this.members = response.data;
                        this.display = []

                        this.posts.forEach((post) => {
                            this.members.forEach((membre) => {
                                if(post.member_id === membre._id){
                                    this.display.push({'post' : post, 'member' : membre});
                                }
                            })
                        })
                    }).catch(function(err){
                        console.log(err);
                    });
                }).catch(function(err){
                    console.log(err);
                });

            },
            createPost () {
                window.axios.post('channels/' + this.$route.params.id + '/posts',{
                    message: this.message,
                    params : {
                        token : this.$store.state.token
                    }
                }).then((response) => {
                    this.loadPost();
                    this.message = '';
                }).catch ((error) => {
                    alert(error.response.data.error);
                })
            },
            deletePost($postID){
                window.axios.delete('channels/'+this.$route.params.id+'/posts/'+$postID).then((response) => {
                    this.loadPost();
                })
            },
            changePost($postID,message,e,trueEvent){

                if(e.keyCode === 13){
                    e.preventDefault();
                    window.axios.put('channels/'+this.$route.params.id+'/posts/'+$postID,{
                        message : e.target.textContent
                    }).then((response) => {
                    }).catch ((error) => {
                        console.log(this.$route.params);
                        alert(error.response.data.error);
                    })
                } else {
                    trueEvent.target.textContent = message;
                }
            },
            blur(e){
                this.myEvent = e;
                e.target.blur();
            },
            findEdit(e){
                let target = e.target;

                while(target.parentNode.nodeName !== 'LI'){
                    target = target.parentNode;
                }

                let edit = target.nextSibling;
                edit.focus();
            },
            theUser (author,user) {
                if(author === user){
                    return true
                } else {
                    return false
                }
            },
            image (email) {
                return this.avatarDefault(email);
            },
            helpEnter (e) {
              let bool = e.target.contentEditable
              if(bool === 'true') {
                let help2 = "Appuyer sur entré pour sauvegarder la modification";
                let ID = window.setTimeout(Materialize.toast(help2,4000),2500);
              } else {
                let f = "Impossible de modifier les messages qui ne sont pas les vôtres";
                window.setTimeout(Materialize.toast(f,4000),2500);
              }

            }
        },
        created(){
            this.loadPost();}
        // },
        // beforeUpdate(){
        //     this.scrollBottom();
        // }
    }
</script>

<style scoped>

    .mypost{
        width: 100%;
        background-color: lightblue;
        min-height: 20vh;
    }
    .mypost form{
        width: 100%;
    }
    .mypost textarea {
        margin:0;
        padding: 0;
    }
    div .input-field{
        margin: 0;
    }
    ul.collection{
        margin: 0;
    }
    .row{
        margin-bottom: 0;
    }

    .chat {
        height: 70vh;
        overflow-y: scroll;
    }
</style>

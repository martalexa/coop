<template>
    <div>
        <div ref="chat" class="row chat">
            <ul class="collection">
                <li class="collection-item avatar" v-for="post in display">

                    <img src="https://www.gravatar.com/avatar/cc3040ff7d996bba598fa55105982e64?d=https://1.bp.blogspot.com/-iQmayUWj2xE/Vjd6eV-c4YI/AAAAAAAAPA0/RMUUNnPslsk/s1600/slack.png" alt="logo" class="circle"/>

                    <span class="title">{{post.member.fullname}}
                        <a href="!#" class="secondary-content">
                            <i class="material-icons right" @click="deletePost(post.post._id)">delete</i>
                            <i class="material-icons right" @click="findEdit($event)">create</i></a></span><p ref="edit" contenteditable="true" @keydown.enter.prevent="changePost(post.post._id,$event)">
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
                posts : [],
                members : [],
                display : [],
                test : []
            }
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
                                    this.display.push({'post' : post, 'member' : membre})
                                }
                            })
                        })
                    }).catch(function(err){
                        console.log(err)
                    });
                }).catch(function(err){
                    console.log(err)
                });


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
            },
            scrollBottom () {
                this.$nextTick(function(){
                    this.$refs.chat.scrollTop = this.$refs.chat.scrollHeight
                })
            },
            deletePost($postID){
                window.axios.delete('channels/'+this.$route.params.id+'/posts/'+$postID).then((response) => {
                    this.loadPost();
                })
            },
            changePost($postID,e){
                this.edit.blur();
                window.axios.put('channels/'+this.$route.params.id+'/posts/'+$postID,{
                    message : this.e.target.textContent
                }).then((response) => {
                    console.log(this.edit)
                }).catch ((error) => {
                    console.log(this.$route.params);
                    alert(error.response.data.error);
                })
            },
            findEdit(e){

                let target = e.target
                while(target.parentNode.nodeName !== 'LI'){
                    console.log(target)
                    target = target.parentNode
                }
                let edit = target.nextSibling
                edit.focus()
            }
        },
        created(){
            this.loadPost()
        },
        beforeUpdate(){
            this.scrollBottom()
        }
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

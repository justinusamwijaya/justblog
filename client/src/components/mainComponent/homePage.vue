<template>
    <b-row style="margin-top:10rem;">
        <div v-if="newPostMode" id="changeBG" @click.self="newPostMode = !newPostMode">
            <div id="addNewBlog">
                <form method="post" @submit.prevent="addNewBlog">
                    <h3>Title</h3>
                    <input type="text" v-model="title">
                    <vue-editor :editorToolbar="customToolbar" v-model="content"/>
                    <button>Publish</button>
                </form>
            </div>
        </div>
        <b-col cols=12><button @click="newPostMode = !newPostMode">add a blog</button></b-col>
        <blog v-for="blog in allBlogs" :key="blog._id" :title="blog.title" :timeCreated="blog.createdAt" :content="blog.content" :blogId="blog._id"/>
    </b-row>
</template>
<script>
import { VueEditor } from 'vue2-editor'
import blog from '../subComponent/blog.vue'
import axios from 'axios'
import { mapActions, mapState } from 'vuex'
export default {
  name: 'homepage',
  components: { VueEditor, blog },
  data () {
    return {
      content: '',
      customToolbar: [
        [{ 'font': [] }],
        ['bold', 'italic', 'underline'],
        [{ 'list': 'ordered'}, { 'list': 'bullet' }],
        [{'align': ''}, {'align': 'center'}, {'align': 'right'}, {'align': 'justify'}],
        [{ 'indent': '-1'}, { 'indent': '+1' }],
        [{ 'color': [] }, { 'background': [] }]
      ],
      newPostMode: false,
      title: ''
    }
  },
  created () {
    this.getAllBlogs()
  },
  methods: {
    ...mapActions([
      'getAllBlogs'
    ]),
    addNewBlog: function () {
      let { title, content } = this
      let newBlog = {
        title,
        content
      }
      axios.post('http://localhost:3000/blogs', newBlog, { headers: { authorization: 'bearer ' + localStorage.getItem('token') } })
        .then(response => {
          console.log(response)
          this.getAllBlogs()
          this.newPostMode = !this.newPostMode
        })
        .catch(errors => {
          console.log(errors.response)
        })
    }
  },
  computed: {
    ...mapState([
      'allBlogs'
    ])
  }

}
</script>
<style lang="scss" scoped>
$primaryColor: rgb(1, 228, 133);
h3{
    margin: 2rem;
}
button{
    background:none;
    font-size:2rem;
    border:0;
    cursor: pointer;
    color:rgba(0,0,0,.5);
    &:hover{
        color:$primaryColor;
        transition:all .3s;
    }
}
#changeBG{
    background-color:rgba(0,0,0,.7);
    z-index:5888;
    position:fixed;
    width:100%;
    height:100%;
    display:flex;
    justify-content: center;
    align-items:center;
    top:0;
    #addNewBlog{
        width: 60%;
        background-color:rgba(255,255,255,.9);
        max-height: 70rem;
        overflow:scroll;
        form{
            input{
                background:none;
                padding: 1rem;
                width: 80%;
                margin-bottom: 2rem;
                border: 1px solid rgba(0,0,0,.2);
                border-radius: 1rem;
                text-align:center;
                font-size: 2rem;
                &:active, &:focus{
                    outline:none;
                }
            }
            button{
                margin-top: 1rem;
            }
        }
    }
}
.row{
    margin-left:0 !important;
    margin-right:0 !important;
}
</style>

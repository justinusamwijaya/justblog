<template>
    <b-col class="blogWrapper" cols=12>
        <b-col class="card blog" cols=12 md=8 offset-md=2>
            <h2>{{title}}</h2>
            <p>{{createdAt}}</p>
            <div class="content" v-html="content">

            </div>
            <router-link tag="button" :to="{ path:'/blog/'+blogId }">See Blog</router-link>
        </b-col>
    </b-col>
</template>
<script>
export default {
  name: 'blog',
  props: ['title', 'content', 'timeCreated', 'blogId'],
  data () {
    return {
      createdAt: ''
    }
  },
  created () {
    let date = new Date(this.timeCreated)
    this.createdAt = `${date.getDate()}/${date.getMonth()}/${date.getFullYear()}, ${date.getHours()}:${date.getMinutes()}`
  }
}
</script>
<style lang="scss">
button{
    background:none;
    border:1px solid rgba(0,0,0,.1);
    border-radius: 1rem;
    padding: 1rem;
    margin-top: 5rem;
    font-size: 1.5rem;
    cursor: pointer;
    &:active, &:focus {
        outline:none;
    }
}
.ql-align-center{
    text-align:center !important;
}
.ql-align-right{
    text-align:right !important;
}
.ql-align-left{
    text-align:left !important;
}
.blogWrapper{
    margin-top: 2rem;
    margin-bottom:2rem;
    .blog{
        p{
            border-bottom: 1px solid rgba(0,0,0,.2);
        }
        padding: 5rem 5rem 3rem 5rem;
        min-height:10rem;
        border-radius:1rem;
        max-height:100rem;
        .content{
            padding-top:3rem;
            text-align:left;
            padding-right: 4rem;
            padding-left: 4rem;
            p{
                font-size: 1.2rem;
                border:0;
            }
        }
    }
}
</style>

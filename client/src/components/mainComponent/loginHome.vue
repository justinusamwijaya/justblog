<template>
    <div class="homePage">
        <b-row id="brand">
            <b-col cols=12>
                Blogthis
                <h3>just your normal blog site</h3>
            </b-col>
        </b-row>
        <b-row>
            <b-col id="loginformWrapper" cols=12>
                <div id="loginform">
                    <form v-if="loginMode" @submit.prevent="login()" method="post">
                        username or email
                        <input v-model="username" type="text">
                        password
                        <input v-model="password" type="password">
                        <button type="submit">login</button>
                    </form>
                    <form v-else @submit.prevent="signup()" method="post">
                        username
                        <input v-model="username" type="text">
                        email
                        <input v-model="email" type="email">
                        password
                        <input v-model="password" type="password">
                        <button type="submit">Signup</button>
                    </form>
                    <button @click="loginMode = !loginMode">{{loginMode ? 'no account? signup now!' : 'already have an account? login now!'}}</button>
                </div>
            </b-col>
        </b-row>
    </div>
</template>
<script>
import axios from 'axios'
import { mapState, mapActions } from 'vuex'
export default {
  name: 'formSection',
  data () {
    return {
      loginMode: true,
      username: '',
      email: '',
      password: ''
    }
  },
  methods: {
    ...mapActions([
      'loginStore'
    ]),
    signup: function () {
      let { username, email, password } = this
      let newUser = {
        username,
        email,
        password
      }
      axios.post('http://localhost:3000/signup', newUser)
        .then(response => {
          this.password = ''
          this.loginMode = !this.loginMode
        })
        .catch(errors => {
          console.log(errors.response)
        })
    },
    login: function () {
      let { username, password } = this
      let userLogin = {
        user: username,
        password
      }
      axios.post('http://localhost:3000/login', userLogin)
        .then(response => {
          console.log(response)
          localStorage.setItem('token', response.data.token)
          localStorage.setItem('id', response.data.id)
          localStorage.setItem('username', response.data.username)
          this.loginStore()
        })
        .catch(errors => {
          console.log(errors.response)
        })
    }
  },
  computed: {
    ...mapState([
      'loggedIn'
    ])
  }

}
</script>
<style lang="scss" scoped>
$primaryColor: rgb(1, 228, 133);
.homePage {
    z-index: 9999;
    background-color:$primaryColor;
    height:100%;
    width:100%;
    position:fixed;
    #brand{
        height: 20rem;
        font-size: 10rem;
        color:white;
        display:flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
    }
    #loginformWrapper{
        display:flex;
        justify-content: center;
        align-items: center;
        #loginform{
            width: 35%;
            min-height: 30rem;
            border-radius: 5rem;
            background-color:white;
            padding: 5rem;
            font-size: 2rem;
            input{
                margin: 1rem 0 1rem 0;
                width: 100%;
                padding: 1rem;
                border-radius: 1rem;
                border: 1px solid rgba(0,0,0,.3);
                &:active, &:focus{
                    outline:none;
                    border: 1px solid rgba(0,0,0,.7);
                    transition:all .3s;
                }
            }
            button{
                margin: 1rem 0 2rem 0;
                border:0;
                background:none;
                cursor: pointer;
                &:active,&:focus{
                    outline:none;
                }
                &:hover{
                    color:$primaryColor;
                    transition: all .3s;
                }
            }
        }
    }
}
</style>

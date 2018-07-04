<template>
    <nav>
        <router-link :to="{path:'/'}" tag='a'>Blogthis</router-link>
        <div class="rightSide">
            <a @click="logout()">Logout</a>
        </div>
    </nav>
</template>
<script>
import { mapActions } from 'vuex'
export default{
  methods: {
    ...mapActions([
      'logoutStore'
    ]),
    logout: function () {
      localStorage.removeItem('token')
      localStorage.removeItem('id')
      localStorage.removeItem('username')
      this.logoutStore()
    }
  }
}
</script>
<style lang="scss" scoped>
$primaryColor: rgb(1, 228, 133);
nav{
    z-index:5000;
    position:fixed;
    top:0;
    width:100%;
    background-color:$primaryColor;
    height:6rem;
    display:flex;
    justify-content: center;
    align-items: center;
    a{
        color:white;
        font-size: 4rem;
        cursor: pointer;
        &:hover{
            text-decoration: none;
        }
        &:active, &:focus {
            outline: none;
        }
    }
    .rightSide{
        position:fixed;
        right:0;
        width: 25%;
        text-align:center;
        a{
            font-size: 2rem;
            color:white;
            &:hover{
                color:white;
            }
        }
    }
}
</style>

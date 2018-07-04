<template>
  <div>
    <login v-if="!loggedIn"/>
    <homepage v-else/>
  </div>
</template>

<script>
import login from './loginHome.vue'
import homepage from './homePage.vue'
import { mapState } from 'vuex'
export default {
  name: 'Home',
  components: { login, homepage },
  data () {
    return {

    }
  },
  created () {
  },
  computed: {
    ...mapState([
      'loggedIn'
    ])
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">

</style>

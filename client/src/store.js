import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    loggedIn: !!localStorage.getItem('token'),
    allBlogs: []
  },
  mutations: {
    changeAllBlogDatas (state, allBlogsFromId) {
      state.allBlogs = allBlogsFromId
    },
    changetoLoggedIn (state) {
      state.loggedIn = true
    },
    changetoLoggedOut (state) {
      state.loggedIn = false
    }
  },
  actions: {
    getAllBlogs ({commit}) {
      axios.get('http://localhost:3000/blogs/', { headers: { authorization: 'bearer ' + localStorage.getItem('token') } })
        .then(response => {
          commit('changeAllBlogDatas', response.data.result)
        })
        .catch(errors => {
          console.log(errors.response)
        })
    },
    loginStore ({commit}) {
      commit('changetoLoggedIn')
    },
    logoutStore ({commit}) {
      commit('changetoLoggedOut')
    }
  }
})

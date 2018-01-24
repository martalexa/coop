import Vue from 'vue'
import Router from 'vue-router'
import posts from '@/components/posts' // @ cherche à partir de src
import connexion from '@/components/connexion' // @ cherche à partir de src
import membrescreation from '@/components/membrescreation' // @ cherche à partir de src
import membres from '@/components/membres' // @ cherche à partir de src
import conversationsliste from '@/components/conversationsliste' // @ cherche à partir de src
import sujetcreation from '@/components/sujetcreation' // @ cherche à partir de src
import conversationmodifier from '@/components/conversationmodifier' // @ cherche à partir de src


// charge le router dans vue
Vue.use(Router);

// initialisation du router
export default new Router({
  routes: [
    {
      path: '/',
      component: connexion
    },
    {
      path: '/connexion',
      component: connexion
    },
    {
      path: '/membrescreation',
      component: membrescreation
    },
    {
      path: '/conversationsliste',
      component: conversationsliste
    },
    {
      path: '/sujetcreation',
      component: sujetcreation
    },
    {
      path: '/membres',
      component: membres
    },
    {
      name: 'conversationmodifier',
      path: '/conversationmodifier/:id',
      component: conversationmodifier
    },
      {
        path: '*',
        redirect: '/'
      },
      {
          name: 'posts',
          path: '/api/channel/id/posts',
          component: posts
      }
  ]
})

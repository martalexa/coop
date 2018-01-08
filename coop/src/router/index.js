import Vue from 'vue'
import Router from 'vue-router'
import Connexion from '@/components/Connexion' // @ cherche à partir de src
import membresCreation from '@/components/MembresCreation' // @ cherche à partir de src
import ConversationsListe from '@/components/ConversationsListe' // @ cherche à partir de src
import NavBar from '@/components/NavBar' // @ cherche à partir de src
import SujetCreation from '@/components/SujetCreation' // @ cherche à partir de src

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/connexion',
      component: Connexion
    },
    {
      path: '/membresCreation',
      component: membresCreation
    },
    {
      path: '/conversationsListe',
      component: ConversationsListe
    },
    {
      path: '/navBar',
      component: NavBar
    },
    {
      path: '/SujetCreation',
      component: SujetCreation
    }
  ]
})

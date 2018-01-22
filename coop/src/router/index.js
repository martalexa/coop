import Vue from 'vue'
import Router from 'vue-router'
import Connexion from '@/components/Connexion' // @ cherche à partir de src
import membrescreation from '@/components/MembresCreation' // @ cherche à partir de src
import ConversationsListe from '@/components/ConversationsListe' // @ cherche à partir de src
import SujetCreation from '@/components/SujetCreation' // @ cherche à partir de src
import ConversationModifier from '@/components/ConversationModifier' // @ cherche à partir de src

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/connexion',
      component: Connexion
    },
    {
      path: '/membrescreation',
      component: membrescreation
    },
    {
      path: '/conversationsListe',
      component: ConversationsListe
    },
    {
      path: '/SujetCreation',
      component: SujetCreation
    },
    {
      name: 'ConversationModifier',
      path: '/ConversationModifier/:id',
      component: ConversationModifier
    }
  ]
})

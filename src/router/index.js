import Vue from 'vue'
import Router from 'vue-router'

import HelloWorld from "../components/HelloWorld";
import Contact from "../components/Contact";
import About from "../components/About";

Vue.use(Router)

export default new Router({
  routes: [
    {
      name: 'HelloWorld',
      title: 'Home',
      path: '/',
      component: HelloWorld,
    },
    {
      name: 'Contact',
      title: 'Contact',
      path: '/contact',
      component: Contact,
    },
    {
      name: 'About',
      title: 'About',
      path: '/about',
      component: About,
    }
  ]
})

var app = new Vue({
  el: '#app',
  data: {
    message: 'Hi Vue!',
  }
})

var app2 = new Vue({
  el: '#app-2',
  data: {
    message: 'load' + new Date()
  }
})

var app3 = new Vue({
  el: '#app-3',
  data: {
    seen: true
  }
})

var app4 = new Vue({
  el: '#app-4',
  data: {
    todos: [
      { text: 'learn js'},
      { text: 'learn vue'},
      { text: 'do something'},
    ]
  }
})

var app5 = new Vue({
  el: '#app-5',
  data: {
    message: 'hi vue.js',
  },
  methods: {
    reverseMessage: function() {
      this.message = this.message.split('').reverse().join('')
    }
  }
})

var app6 = new Vue({
  el: '#app-6',
  data: {
    message: 'hi vue input'
  }
})

Vue.component('todo-item', {
  props: ['todo'],
  template: '<li>{{ todo.text }}</li>'
})

var app7 = new Vue({
  el: '#app-7',
  data: {
    groceryList: [
      {id: 0, text: 'a'},
      {id: 1, text: 'b'},
      {id: 2, text: 'c'}
    ]
  }
})

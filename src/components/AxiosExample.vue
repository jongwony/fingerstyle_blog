<template>
  <div>
    <ul>
      <li v-for="user in users" :key="user.id" v-bind="user">{{ user.name }} {{ user.email }} {{ user.address.street }}</li>
    </ul>
  </div>
</template>

<script>
  export default {
    name: "AxiosExample",
    props: {
      id: Number,
      name: String,
      username: String,
      email: String,
      address: {
        street: String,
        suite: String,
        city: String,
        zipcode: String,
      },
      geo: {
        lat: String,
        lng: String,
      },
      phone: String,
      website: String,
      company: {
        name: String,
        catchPhrase: String,
        bs: String,
      }
    },
    data: function () {
      return {
        users: []
      }
    },
    created: function () {
      let vm = this
      this.$http
        .get('https://jsonplaceholder.typicode.com/users')
        .then(function (response) {
          vm.users = response.data
        })
    }
  }
</script>

<style scoped>

</style>

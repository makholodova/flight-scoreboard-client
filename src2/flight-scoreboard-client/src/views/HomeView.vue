<script setup>
import TheWelcome from '../components/TheWelcome.vue'
//import axios from 'axios'

/*axios
  .get('https://localhost:7294/City')
  .then(response => (props.cities = response.data));*/

/*let obj = {name: "aaaaa"};
axios.post('https://localhost:7294/City', obj) ////не работает
  .then(function (response) {
    console.log(response);
  })
  .catch(function (error) {
    console.log(error);
  });*/

function abc() {
  alert("sf");
}

</script>

<template>
  <main>
<!--    <button @click="abc">Emit event</button>-->
    <TheWelcome />
  </main>
</template>

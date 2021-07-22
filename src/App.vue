<template>
  <div class="full-screen">
    <date-picker />
  </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import DatePicker from './components/date-picker.vue'

@Options({
  components: {
    DatePicker,
  },
})
export default class App extends Vue {}
</script>
<style>

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

.full-screen {
  width: 100%; 
  height: 100vh; 
  overflow: hidden;

  display: flex;
  align-items: center;
  justify-content: center;
}
</style>

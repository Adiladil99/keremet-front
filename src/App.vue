<template>
  <div>
    <Header />
    <router-view class="main"/>
    <Footer />
  </div>
</template>

<script>
import Header from './components/layouts/Header.vue';
import Footer from './components/layouts/Footer.vue';
export default {
  components: { Header, Footer }
}
</script>

<style lang="scss">
#app {
  width: 100vw;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: stretch;
}

html,body,p {
  overflow-x: hidden;
  margin: 0 ;
  padding: 0 ;
}


::-webkit-scrollbar {
  width: 5px;
  height: 2px;
}

/* Track */
::-webkit-scrollbar-track {
  background: #f1f1f1;
}

/* Handle */
::-webkit-scrollbar-thumb {
  background: #CB0E16;
}

/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
  background: #d60712;
}
</style>

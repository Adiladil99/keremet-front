<template>
    <div class="mapBackground animated fadeIn" @click="$store.state.openGpsModal = false" v-scroll>
        <div class="map animated fadeInLogin" @click.stop>
            <div class="close" @click="$store.state.openGpsModal = false">
                <img src="@/assets/icons/close.png"/>
            </div>
            <Map />
        </div>
    </div>
</template>
<script>
import Map from '@/components/MapSelect/Map.vue'
export default {
  components: { Map },
    
}
</script>
<style lang="scss" scoped>
.mapBackground {
    color: black;
    position: fixed;
    z-index: 999;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
}

.map {
    overflow-y: auto;
    overflow-x: auto;
    position: relative;
    width: 1200px;
    height: fit-content;
    background: #FCFCFD;
    box-shadow: 0px 64px 64px -48px rgba(15, 15, 15, 0.08);
    border-radius: 16px;
    padding: 52px 76px;
    box-sizing: border-box;
}



.close {
    cursor: pointer;
    position: absolute;
    display: flex;
    justify-content: center;
    align-items: center;
    right: -4%;
    top: -8%;
    width: 32px;
    height: 32px;
    background: #FCFCFD;
    z-index: 2;
    box-shadow: 0px 8px 16px -8px rgba(15, 15, 15, 0.1);
    border-radius: 32px;
    transform: matrix(1, 0, 0, -1, 0, 0);
}

.animated {
  animation-duration: 1s;
  animation-fill-mode: both;
}
.fadeIn {
  animation-name: fadeIn;
}
.fadeInLogin {
  animation-name: fadeInLogin;
}
@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
@keyframes fadeInLogin {
  from {
    opacity: 0;
    top: -10%;
  }
  to {
    opacity: 1;
    top: 0%;
  }
}
</style>
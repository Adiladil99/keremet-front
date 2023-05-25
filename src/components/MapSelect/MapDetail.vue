<template>
  <div style="margin-bottom: 40px;">


    <GoogleMap @click="selectObject" api-key="YOUR_API_KEY" style="width: 100%; height: 500px" :center="mapCenter" :zoom="mapZoom">
      <Marker v-for="marker in coord" :key="marker" :options="{ position: marker.position }" />
      <Polyline v-if="polylineOptions.path.length" :options="polylineOptions" />

      <CustomMarker v-if="coord" :options="{ position: coord[0], anchorPoint: 'BOTTOM_CENTER' }">
        <div style="text-align: center">
          <div style="font-size: 1.125rem">Адрес отправки</div>
          <img  class="gpsStyle" src="@/assets/icons/gpsMapper.png"/>
        </div>
      </CustomMarker>

      <CustomMarker v-if="coord" :options="{ position: coord[1], anchorPoint: 'BOTTOM_CENTER' }">
        <div style="text-align: center">
          <div style="font-size: 1.125rem">Адрес доставки</div>
          <img  class="gpsStyle" src="@/assets/icons/gpsMapper.png"/>
        </div>
      </CustomMarker>

    </GoogleMap>
<!-- 

    <div class="address-selection">
      <label>Адрес 1:</label>
      <input v-model="address1" />
      <label>Адрес 2:</label>
      <input v-model="address2" />
      <button @click="calculateDistance">Рассчитать дистанцию</button>
    </div>
    <div class="distance" v-if="distance">
      Дистанция: {{ distance }} км
    </div> -->
  </div>
</template>

<script>
import { GoogleMap, Marker, Polyline, CustomMarker } from 'vue3-google-map';

export default {
  components: {
    GoogleMap,
    Marker,
    Polyline,
    CustomMarker
  },
  data() {
    return {
      mapCenter: { lat: 43.23522194271009, lng: 76.90987432448406 },
      mapZoom: 15,
      address1: '',
      address2: '',
      markers: [],
      distBool: false,
      polylineOptions: {
        path: [],
        strokeColor: '#0000FF',
        strokeOpacity: 0.8,
        strokeWeight: 5,
      },
      distance: null,
      geocoder: null,
    };
  },
  props: ["coord"],
  mounted() {
    this.geocoder = new google.maps.Geocoder();
    this.directionsService = new google.maps.DirectionsService();
    navigator.geolocation.getCurrentPosition((position) => {
      const { latitude, longitude } = position.coords;
      this.userLocation = { lat: latitude, lng: longitude };
    });
      this.calculateDistance() 
  },
  methods: {
    calculateDistance() {
      if (!this.coord || this.coord.length < 2) return;

      const directionsService = new google.maps.DirectionsService();

      const request = {
        origin: this.coord[0],
        destination: this.coord[1],
        travelMode: google.maps.TravelMode.DRIVING,
      };

      directionsService.route(request, (result, status) => {
        if (status === google.maps.DirectionsStatus.OK) {
          const route = result.routes[0];
          const path = route.overview_path.map((point) => ({
            lat: point.lat(),
            lng: point.lng(),
          }));
          this.polylineOptions.path = path;
        }
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.address-selection {
  margin-top: 20px;
}
.distance {
  margin-top: 20px;
}


.gpsStyle {
  margin-top: 8px;
  width: 40px;
}
</style>

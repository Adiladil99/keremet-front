<template>
  <div style="margin-bottom: 40px;">


    <GoogleMap @click="selectObject" api-key="YOUR_API_KEY" style="width: 100%; height: 500px" :center="mapCenter" :zoom="mapZoom">
      <Marker v-for="marker in markers" :key="marker.id" :options="{ position: marker.position }" />
      <Polyline v-if="distBool" :options="polylineOptions" />

      <CustomMarker v-if="markers.length" :options="{ position: markers[0].coordinates, anchorPoint: 'BOTTOM_CENTER' }">
        <div style="text-align: center">
          <div style="font-size: 1.125rem">Адрес отправки</div>
          <img  class="gpsStyle" src="@/assets/icons/gpsMapper.png"/>
        </div>
      </CustomMarker>

      <CustomMarker v-if="markers.length === 2" :options="{ position: markers[1].coordinates, anchorPoint: 'BOTTOM_CENTER' }">
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
  
  mounted() {
    this.geocoder = new google.maps.Geocoder();
    this.directionsService = new google.maps.DirectionsService();
    setInterval(() => {
      navigator.geolocation.getCurrentPosition((position) => {
      const { latitude, longitude } = position.coords;
      this.userLocation = { lat: latitude, lng: longitude };
      console.log('this.userLocation', this.userLocation);
    });
    }, 5000);
    
  },
  methods: {
    selectObject(event) {
      const geocoder = new google.maps.Geocoder();
      const latLng = {
        lat: event.latLng.lat(),
        lng: event.latLng.lng(),
      };

      geocoder.geocode({ location: latLng }, (results, status) => {
        console.log('res', results);
        if (status === 'OK') {
          if (results[0]) {
            const address = results[0].formatted_address;

            const clickedObject = {
              address: address,
              coordinates: latLng,
            };
            if (this.markers.length < 1) {
              this.address1 = clickedObject.address
              this.markers.push(clickedObject);
              this.updatePath();
              this.$emit("selectedAddress1", clickedObject)
            }
            else if (this.markers.length < 2) {
              this.address2 = clickedObject.address
              this.markers.push(clickedObject);
              this.updatePath();
              this.calculateDistance()
              this.$emit("selectedAddress2", clickedObject)
            }
          } else {
            console.log('Адрес не найден');
          }
        } else {
          console.log('Ошибка геокодирования: ' + status);
        }
      });
    },
    updatePath() {
      this.polylineOptions.path = this.markers.map((marker) => marker.coordinates);
    },
    calculateDistance() {
      if (!this.address1 || !this.address2) return;

      const request = {
        origin: this.address1,
        destination: this.address2,
        travelMode: google.maps.TravelMode.DRIVING, // Указываем режим перемещения (автомобильная дорога)
      };

      this.directionsService.route(request, (result, status) => {
        if (status === google.maps.DirectionsStatus.OK) {
          const route = result.routes[0];
          const distance = route.legs[0].distance.text;
          this.distance = distance;
          this.$emit("distance", this.distance)
          const path = route.overview_path.map((point) => ({
            lat: point.lat(),
            lng: point.lng(),
          }));
          this.polylineOptions.path = path;
      this.distBool =true
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

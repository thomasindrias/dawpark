<template>
  <div class="container">
    <div v-if="!lazyLoad" class="logo"><div class="spinner"></div></div>
    <div v-if="mobile && lazyLoad" class="container">
      <MglMap
        :accessToken="accessToken"
        :mapStyle.sync="mapStyle"
        :center.sync="mapCenter"
        :zoom="8"
        :attributionControl="false"
      >
        <MglGeocoderControl
          :accessToken="accessToken"
          :input.sync="mapInput"
          @result="handleSearch"
          class="search"
          position="top-left"
          placeholder="Sök plats"
          language="sv"
          country="se"
          :autocomplete="false"
        />
        <MglGeolocateControl position="bottom-left" />
        <MglMarker :v-if="parkings" v-for="parking in parkings" :key="parking.parking_id"
        :coordinates="parking.wgs84.coordinates">
          <font-awesome-icon slot="marker" :icon="['fas', 'map-marker']" class="icon"/>
        </MglMarker>
      </MglMap>
    </div>
    <div v-else-if="!mobile && lazyLoad" class="container">
      <MglMap
        :accessToken="accessToken"
        :mapStyle.sync="mapStyle"
        :center.sync="mapCenter"
        :zoom="8"
        :attributionControl="false"
      >
        <MglGeocoderControl
          :accessToken="accessToken"
          :input.sync="mapInput"
          @result="handleSearch"
          class="search"
          position="top-left"
          placeholder="Sök plats"
          language="sv"
          country="se"
          :autocomplete="false"
        />
        <MglNavigationControl position="top-right" />
        <MglGeolocateControl position="top-right" />
        <MglScaleControl position="bottom-right"/>
        <MglMarker :v-if="parkings" v-for="parking in parkings" :key="parking.parking_id"
        :coordinates="parking.wgs84.coordinates">
          <font-awesome-icon slot="marker" :icon="['fas', 'map-marker']" class="icon"/>
        </MglMarker>
      </MglMap>
    </div>
  </div>
</template>

<script>
import {
  MglMap,
  MglNavigationControl,
  MglGeolocateControl,
  MglScaleControl,
  MglMarker,
} from 'vue-mapbox';

import axios from 'axios';

import MglGeocoderControl from './GeocoderControl';

export default {
  name: 'MapBox',
  components: {
    MglMap,
    MglNavigationControl,
    MglGeolocateControl,
    MglScaleControl,
    MglMarker,
    MglGeocoderControl,
  },
  props: {
    accessToken: String,
    mapStyle: String,
    mobile: {
      type: Boolean,
      default: false,
    },
    mapInput: {
      type: String,
      default: '',
    },
    parkings: {},
  },
  data() {
    return {
      lazyLoad: false,
      mapCenter: [],
    };
  },
  created() {
    this.getIPLocation();
  },
  methods: {
    handleSearch(event) {
      this.$emit('result', event.result);
    },
    getIPLocation() {
      // Had to redirect twice because of cors.
      // Will probably remove the redirect when it's production ready.
      axios
        .get('https://cors-anywhere.herokuapp.com/http://api.ipify.org/?format=text')
        .then((ipResponse) => axios.get(`https://cors-anywhere.herokuapp.com/https://geo.ipify.org/api/v1?apiKey=at_OwmMrq7nP5Mlyfamr64BosnLxfACT&ipAddress=${ipResponse.data}`))
        .then((geoResponse) => {
          this.mapCenter = [geoResponse.data.location.lng, geoResponse.data.location.lat];
          this.lazyLoad = true;
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
};
</script>

<style lang="scss" scoped>
  .container {
    background-color: #ECE1CB;
    height: 100%;
    width: auto;
  }

  .logo {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    font-size: 4em;
  }

  .icon {
    color: $green;
    font-size: 28px;
    -webkit-filter: drop-shadow(1px 1px 1px rgba(0,0,0,0.2));
    filter: drop-shadow(1px 1px 1px rgba(0,0,0,0.2));
  }

  // Loading animation inspired from https://tobiasahlin.com/spinkit/
  .spinner {
  width: 60px;
  height: 60px;
  background-color: #4DB546;

  margin: 100px auto;
  -webkit-animation: sk-rotateplane 1.2s infinite ease-in-out;
  animation: sk-rotateplane 1.2s infinite ease-in-out;
}

@-webkit-keyframes sk-rotateplane {
  0% { -webkit-transform: perspective(120px) }
  50% { -webkit-transform: perspective(120px) rotateY(180deg) }
  100% { -webkit-transform: perspective(120px) rotateY(180deg)  rotateX(180deg) }
}

@keyframes sk-rotateplane {
  0% {
    transform: perspective(120px) rotateX(0deg) rotateY(0deg);
    -webkit-transform: perspective(120px) rotateX(0deg) rotateY(0deg)
  } 50% {
    transform: perspective(120px) rotateX(-180.1deg) rotateY(0deg);
    -webkit-transform: perspective(120px) rotateX(-180.1deg) rotateY(0deg)
  } 100% {
    transform: perspective(120px) rotateX(-180deg) rotateY(-179.9deg);
    -webkit-transform: perspective(120px) rotateX(-180deg) rotateY(-179.9deg);
  }
}
</style>

<template>
  <div class="container">
    <div v-if="!lazyLoad" class="logo"><div class="spinner"></div></div>
    <MglMap
      v-if="lazyLoad"
      :accessToken="accessToken"
      :mapStyle.sync="mapStyle"
      :center.sync="mapCenter"
      :zoom="8"
      :attributionControl="false"
    >
      <MglNavigationControl position="top-right" />
      <MglGeolocateControl position="top-right" />
      <MglScaleControl position="bottom-right"/>
    </MglMap>
  </div>
</template>

<script>
import {
  MglMap,
  MglNavigationControl,
  MglGeolocateControl,
  MglScaleControl,
} from 'vue-mapbox';

import axios from 'axios';

export default {
  name: 'MapBox',
  components: {
    MglMap,
    MglNavigationControl,
    MglGeolocateControl,
    MglScaleControl,
  },
  props: {
    accessToken: String,
    mapStyle: String,
    mapInput: String,
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

<style lang="scss">
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

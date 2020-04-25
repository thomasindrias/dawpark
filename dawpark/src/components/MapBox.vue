<template>
  <div class="container">
    <div v-if="!lazyLoad" class="logo"><div class="spinner"></div></div>
    <div v-if="mobile && lazyLoad" class="container">
      <MglMap
        :accessToken="accessToken"
        :mapStyle.sync="mapStyle"
        :center.sync="initCenter"
        :zoom="zoom"
        :attributionControl="false"
      >
        <MglGeocoderControl
          :accessToken="accessToken"
          :input.sync="mapInput"
          @result="handleSearch($event, 1)"
          class="search"
          position="top-left"
          placeholder="Sök plats"
          language="sv"
          country="se"
          :autocomplete="false"
        />
        <MglGeolocateControl
          position="bottom-left"
          @geolocate="handleSearch($event, 2)"
        />
        <MglMarker
          :v-if="parkings.data"
          v-for="parking in parkings.data"
          :key="parking.parking_id"
          :coordinates="parking.wgs84.coordinates"
        >
          <font-awesome-icon slot="marker" :icon="['fas', 'map-marker']" class="icon"/>
        </MglMarker>
        <MglGeojsonLayer
          :sourceId="geoJsonSource.data.id"
          :source="geoJsonSource"
          layerId="somethingSomething"
          :layer="geoJsonLayer"
        />
      </MglMap>
    </div>
    <div v-else-if="!mobile && lazyLoad" class="container">
      <MglMap
        :accessToken="accessToken"
        :mapStyle.sync="mapStyle"
        :center.sync="initCenter"
        :zoom="zoom"
        :attributionControl="false"
      >
        <MglGeocoderControl
          :accessToken="accessToken"
          :input.sync="mapInput"
          @result="handleSearch($event, 1)"
          class="search"
          position="top-left"
          placeholder="Sök plats"
          language="sv"
          country="se"
          :autocomplete="false"
        />
        <MglNavigationControl position="top-right" />
        <MglGeolocateControl
          :positionOptions="{enableHighAccuracy: true, timeout: 6000}"
          @geolocate="handleSearch($event, 2)"
          position="top-right" />
        <MglScaleControl position="bottom-right"/>
        <MglMarker
          :v-if="parkings.data"
          v-for="parking in parkings.data"
          :key="parking.parking_id"
          :coordinates="parking.wgs84.coordinates"
        >
          <font-awesome-icon slot="marker" :icon="['fas', 'map-marker']" class="icon"/>
        </MglMarker>
        <MglGeojsonLayer
          :sourceId="geoJsonSource.data.id"
          :source="geoJsonSource"
          layerId="somethingSomething"
          :layer="geoJsonLayer"
        />
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
  MglGeojsonLayer,
} from 'vue-mapbox';

import parse from 'wellknown';
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
    MglGeojsonLayer,
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
    proximity: {
      type: String,
      required: true,
    },
    parkings: {},
  },
  watch: {
    proximity() {
      // Update layers range if proximity is changed
      this.updateLayers();
    },
  },
  data() {
    return {
      lazyLoad: false,
      initCenter: [16.176372, 58.590318],
      zoom: 8,
      zoomRatio: 1,
      mapCenter: [],
      geoJsonSource: {
        type: 'geojson',
        data: {
          id: 'thisIsMySource',
          type: 'FeatureCollection',
          features: [
            {
              type: 'Feature',
              geometry: {
                type: 'Point',
                coordinates: [16.176372, 58.590318],
              },
              properties: {
                id: 'value0',
              },
            },
          ],
        },
      },
      geoJsonLayer: {
        type: 'circle',
        paint: {
          'circle-radius': {
            stops: [
              [0, 0],
              [20, 0],
            ],
            base: 2,
          },
          'circle-opacity': 0,
        },
      },
    };
  },
  mounted() {
    this.lazyLoad = true;
  },
  methods: {
    handleSearch(event, type) {
      console.log('triggered');
      if (type === 1) { // From search
        this.mapCenter = event.result.center;

        this.$emit('result', {
          coordinate: parse.stringify(event.result.geometry),
          location: (event.result.text_sv) ? event.result.text_sv : 'ingen platsnamn',
        });
      } else if (type === 2) { // From current position
        this.mapCenter = [event.mapboxEvent.coords.longitude, event.mapboxEvent.coords.latitude];

        this.$emit('result', {
          coordinate: `POINT (${event.mapboxEvent.coords.longitude} ${event.mapboxEvent.coords.latitude})`,
          location: 'din position',
        });
      }

      this.updateLayers();
    },

    metersToPixelsAtMaxZoom(meters, latitude) {
      return ((meters / 0.075) / Math.cos((latitude * Math.PI) / 180));
    },

    updateLayers() {
      this.geoJsonSource.data.features[0].geometry.coordinates = this.mapCenter;

      this.geoJsonLayer.paint = {
        'circle-radius': {
          stops: [
            [0, 0],
            [20, this.metersToPixelsAtMaxZoom(this.proximity, this.mapCenter[1])],
          ],
          base: 2,
        },
        'circle-color': '#292934',
        'circle-opacity': 0.1,
      };
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

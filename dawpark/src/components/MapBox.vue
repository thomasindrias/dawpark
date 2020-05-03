<template>
  <div class="container">
    <div v-if="!lazyLoad" class="logo"><div class="spinner"></div></div>
    <div v-if="mobile && lazyLoad" class="container">
      <MglMap
        class="map"
        :accessToken="accessToken"
        :mapStyle.sync="mapStyle"
        :center.sync="initCenter"
        :zoom="zoom"
        :attributionControl="false"
        @click="handleSearch($event, 3)"
        @load="onMapLoaded"
      >
        <MglGeocoderControl
          :accessToken="accessToken"
          :input.sync="mapInput"
          @result="handleSearch($event, 1)"
          class="search"
          position="top-left"
          placeholder="Sök plats"
          language="sv"
          countries="se"
          :autocomplete="false"
        />
        <MglGeolocateControl
          position="bottom-left"
          :positionOptions="{enableHighAccuracy: true, timeout: 6000}"
          @geolocate="handleSearch($event, 2)"
        />
        <MglMarker
          :v-if="parkings.data"
          v-for="(parking, index) in parkings.data"
          :key="parking.parking_id"
          :ref="parking.parking_id"
          :coordinates="parking.wgs84.coordinates"
          @click="markerHandler($event, parking)"
        >
        <div class="icon" slot="marker" >
          <div :id="parking.parking_id">
          <font-awesome-icon
            :icon="['fas', 'map-marker']"
          />
          <span>{{++index}}</span>
          </div>
        </div>
        </MglMarker>
        <MglMarker
          v-if="mapCenter.length !== 0 && (type === 1 || type === 3)"
          :coordinates="mapCenter"
          anchor="bottom"
        >
          <div class="map-pin" slot="marker">
            <svg  xmlns="http://www.w3.org/2000/svg" viewBox="0 0 288 512">
            <!-- eslint-disable-next-line -->
            <path d="M144 320a175.77 175.77 0 0 0 32-3.06v156.69l-22 33a12 12 0 0 1-20 0l-22-33V316.94a175.77 175.77 0 0 0 32 3.06z" class="fa-secondary"/>
            <!-- eslint-disable-next-line -->
            <path d="M144 0a144 144 0 1 0 144 144A144 144 0 0 0 144 0zm0 76a68.07 68.07 0 0 0-68 68 12 12 0 0 1-24 0 92.11 92.11 0 0 1 92-92 12 12 0 0 1 0 24z" class="fa-primary"/>
          </svg>
          </div>
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
        class="map"
        id="map"
        :accessToken="accessToken"
        :mapStyle.sync="mapStyle"
        :center.sync="initCenter"
        :zoom="zoom"
        :attributionControl="false"
        @click="handleSearch($event, 3)"
        @load="onMapLoaded"
      >
        <MglGeocoderControl
          :accessToken="accessToken"
          :input.sync="mapInput"
          @result="handleSearch($event, 1)"
          class="search"
          position="top-left"
          placeholder="Sök plats"
          language="sv"
          countries="se"
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
          v-for="(parking, index) in parkings.data"
          :key="parking.parking_id"
          :ref="parking.parking_id"
          :coordinates="parking.wgs84.coordinates"
          @click="markerHandler($event, parking)"
        >
        <div class="icon" slot="marker" >
          <div :id="parking.parking_id">
          <font-awesome-icon
            :icon="['fas', 'map-marker']"
          />
          <span>{{++index}}</span>
          </div>
        </div>
        </MglMarker>
        <MglMarker
          v-if="mapCenter.length !== 0 && (type === 1 || type === 3)"
          :coordinates="mapCenter"
          anchor="bottom"
        >
          <div class="map-pin" slot="marker">
            <svg  xmlns="http://www.w3.org/2000/svg" viewBox="0 0 288 512">
            <!-- eslint-disable-next-line -->
            <path d="M144 320a175.77 175.77 0 0 0 32-3.06v156.69l-22 33a12 12 0 0 1-20 0l-22-33V316.94a175.77 175.77 0 0 0 32 3.06z" class="fa-secondary"/>
            <!-- eslint-disable-next-line -->
            <path d="M144 0a144 144 0 1 0 144 144A144 144 0 0 0 144 0zm0 76a68.07 68.07 0 0 0-68 68 12 12 0 0 1-24 0 92.11 92.11 0 0 1 92-92 12 12 0 0 1 0 24z" class="fa-primary"/>
          </svg>
          </div>
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
      type: 0,
      geoJsonSource: {
        type: 'geojson',
        data: {
          id: 'radius',
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
  created() {
    this.map = null;
  },
  methods: {
    onMapLoaded(event) {
      this.map = event.map;

      // A bug with Vue-mapbox, have to resize map to force repaint.
      // this.map.resize();
    },
    handleSearch(event, type) {
      // Side-page or mobile-page comes up so resize map.
      this.map.resize();

      // Remember what type of search it is
      this.type = type;

      // console.log('triggered');
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
      } else if (type === 3) { // From pinned position
        // Dont fire this event when clicking markers
        if (event.mapboxEvent.originalEvent.target.parentElement.id !== '') return;

        this.mapCenter = [event.mapboxEvent.lngLat.lng, event.mapboxEvent.lngLat.lat];
        event.map.flyTo({
          center: this.mapCenter,
          zoom: 10,
        });

        this.$emit('result', {
          coordinate: `POINT (${event.mapboxEvent.lngLat.lng} ${event.mapboxEvent.lngLat.lat})`,
          location: 'markerad position',
        });
      }

      // Update GEOJSON layers
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
        'circle-color': '#1da1f2',
        'circle-opacity': 0.3,
      };
    },
    markerHandler(event, parking) {
      // TODO open detail page on sidepage
      this.$emit('selected', parking);
    },
    goToMarker(id) {
      this.map.flyTo({
        center: this.$refs[id][0].coordinates,
        zoom: 15,
      });
    },
    resetToCenter() {
      this.map.flyTo({
        center: this.mapCenter,
        zoom: 10,
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

  .map {
    z-index: 1;
  }

  .icon {
    z-index: 999;
    color: $green;
    font-size: 28px;
    -webkit-filter: drop-shadow(4px 4px 3px rgba(0,0,0,0.6));
    filter: drop-shadow(1px 1px 2px rgba(0,0,0,0.4));
  }

  .icon div {
    position: relative;
  }

  .icon span {
    position: absolute;
    color: $white;
    font-size: 18px;
    font-weight: bold;
    left: 26%;
    top: 1px;
  }

  .map-pin svg {
    -webkit-filter: drop-shadow(2px 16px 8px rgba(0,0,0,0.8));
    filter: drop-shadow(2px 16px 8px rgba(0,0,0,0.8));
    width: 14px;
  }

  .map-pin .fa-primary {
    fill: #c93a3a;
  }

  .map-pin .fa-secondary {
    fill: $black;
    opacity:.4;
  }

  // Testing
  .card {
    width: 100px;
    height: 50px;
    background-color: $white;
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

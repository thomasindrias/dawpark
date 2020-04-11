<template>
  <MglMap
      :accessToken="accessToken"
      :mapStyle.sync="mapStyle"
      :attributionControl="false"
    >

      <MglNavigationControl position="top-right" />
      <MglGeolocateControl position="top-right" />
      <MglScaleControl position="bottom-right"/>
    </MglMap>
</template>

<script>
import {
  MglMap,
  MglNavigationControl,
  MglGeolocateControl,
  MglScaleControl,
} from 'vue-mapbox';

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
    defaultInput: {
      type: String,
      default: 'Stockholm',
    },
  },
};
</script>

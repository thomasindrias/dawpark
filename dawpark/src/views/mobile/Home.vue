<template>
  <map-box :accessToken="accessToken" :mapStyle="mapStyle"></map-box>
</template>

<script>
import MapBox from '@/components/MapBox.vue';

export default {
  components: {
    MapBox,
  },
  data() {
    return {
      accessToken: process.env.VUE_APP_MB_ACCESS_TOKEN,
      mapStyle: process.env.VUE_APP_MB_STYLE,
    };
  },
};
</script>

<style></style>

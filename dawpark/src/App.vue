<template>
  <div id="app">
    <div
      class="mobile-view"
      v-if="this.$store.state.windowSize === 'xs' || this.$store.state.windowSize === 'sm'"
    >
      <router-view name="mobile" />
    </div>
    <div
      class="desktop-view"
      v-else
    >
      <router-view name="desktop" />
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import WebFont from 'webfontloader';

export default Vue.extend({
  name: 'app',
  data() {
    return {
      sidebarOpen: false,
    };
  },
  watch: {
    $route() {
      if (
        this.$store.state.windowSize === 'xs'
        || this.$store.state.windowSize === 'sm'
        || this.$store.state.windowSize === 'md'
      ) {
        this.sidebarOpen = false;
      } else {
        this.sidebarOpen = true;
      }
    },
  },
  beforeRouteUpdate() {
    if (
      this.$store.state.windowSize === 'xs'
      || this.$store.state.windowSize === 'sm'
      || this.$store.state.windowSize === 'md'
    ) {
      this.sidebarOpen = false;
    } else {
      this.sidebarOpen = true;
    }
  },
  methods: {
    onResize() {
      if (window.innerWidth <= 600) {
        this.$store.dispatch('SET_WINDOW_SIZE', 'xs');
      } else if (window.innerWidth > 600 && window.innerWidth <= 800) {
        this.$store.dispatch('SET_WINDOW_SIZE', 'sm');
      } else if (window.innerWidth > 800 && window.innerWidth <= 1200) {
        this.$store.dispatch('SET_WINDOW_SIZE', 'md');
      } else if (window.innerWidth > 1200 && window.innerWidth <= 1800) {
        this.$store.dispatch('SET_WINDOW_SIZE', 'lg');
      } else if (window.innerWidth > 1800) {
        this.$store.dispatch('SET_WINDOW_SIZE', 'xl');
      }
    },
  },
  created() {
    WebFont.load({
      google: {
        families: ['Open+Sans:400,500,600,700'],
      },
    });
    this.onResize();
    window.addEventListener('resize', this.onResize);
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.onResize);
  },
});
</script>

<style lang="scss">
body,
html {
  height: 100%;
  width: 100%;
  display: flex;
}

@media screen and (max-height: 450px) {
  body,
  html {
    height: inherit;
  }
}

#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  background-color: $app-background-color;
  display: flex;
}

.app-layout {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row;
}

.column {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
}

.mobile-view,
.desktop-view {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
}

</style>

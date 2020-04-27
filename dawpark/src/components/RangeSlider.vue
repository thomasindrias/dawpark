<template>
  <div>
    <div class="columns is-mobile is-vcentered">
      <div class="column">
        <input class="slider is-small is-circle"
          step="1000"
          :min="range[0]" :max="range[1]"
          :value="proximity"
          type="range"
          @input.prevent="updateProximity"
          >
      </div>
      <div class="column v-centered is-4"><span>{{(proximity/1000)}} km</span></div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    range: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      proximity: 5000, // 5 km
    };
  },
  methods: {
    updateProximity(event) {
      // console.log(event.target.value);
      this.proximity = event.target.value;
      this.$emit('input', this.proximity);
    },
  },
};
</script>

<style lang="scss" scoped>
@import "bulma";
@import "~bulma-slider";

span {
  font-weight: bold;
  color: $black;
}

</style>

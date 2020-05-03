<template>
  <div class="park">
    <div class="image">
      <img class="image" src="https://circontrol.com/wp-content/uploads/2019/02/180125-Circontrol-BAIXA-80-1080x675.jpg" alt="https://www.google.com/url?sa=i&url=https%3A%2F%2Fvectorified.com%2Fimage-not-available-icon&psig=AOvVaw2wegJoY6LDsAGMkoQNnyAJ&ust=1587319978399000&source=images&cd=vfe&ved=0CAIQjRxqFwoTCLDZ9u3J8ugCFQAAAAAdAAAAABAI">
    </div>
    <div class="titleBox">
      <h1 class="address">{{parkingInfo.index + '. ' + parkingInfo.address}}</h1>
      <p class="postnumber">{{(parkingInfo.postnr) ? parkingInfo.postnr : "Ingen information"}}</p>
      <h1 class="price">{{parkingInfo.price}}</h1>
    </div>
    <hr>
    <div class="info row">
      <div class="column">
        <div class="inline">
          <font-awesome-icon :icon="['fas', 'clock']" class="icon"/>
          <span>24 h</span>
        </div>
      </div>
      <div class="column">
        <div class="inline">
          <svg class="icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 496 512">
          <!-- eslint-disable max-len -->
            <path d="M248 8C111.03 8 0 119.03 0 256s111.03 248 248 248 248-111.03 248-248S384.97 8 248 8zm0 432c-101.46 0-184-82.54-184-184 0-30.83 7.71-59.86 21.17-85.41l286.39 221.35C338.86 421.69 295.58 440 248 440zm-9.77-232H280c8.82 0 16 7.18 16 16s-7.18 16-16 16h-.37l-41.4-32zm172.6 133.41l-76.42-59.06C350.07 267.74 360 247.1 360 224c0-44.18-35.82-80-80-80h-96c-6.91 0-12.67 4.43-14.9 10.57l-44.66-34.51C157.14 90.31 200.42 72 248 72c101.46 0 184 82.54 184 184 0 30.83-7.71 59.86-21.17 85.41zM168 352c0 8.84 7.16 16 16 16h32c8.84 0 16-7.16 16-16v-19.48l-64-49.46V352z"/>
          </svg>
          <span>Tors</span>
        </div>
      </div>
      <div class="column">
        <div v-show="false" class="inline">
          <font-awesome-icon :icon="['fas', 'clock']" class="icon"/>
          <span>placeholder</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  props: {
    parkingInfo: {},
  },
};
</script>

<style lang="scss" scoped>
hr {
  border: 1px solid #D9D9D9;
  opacity: 50%;
  margin: 10px 0px;
}

h1, p {
  font-weight: bold;
}

h1 {
  margin: 1px 0px;
  font-size: 30px;
}

p {
  font-size: 13px;
}

.row {
  display:flex;
  flex-wrap: wrap;
}

.column {
  justify-content: space-between;
  flex-grow: 1;
  flex-shrink: 1;
  flex-basis: 1;
  // ------
  width: 20px;
}

.inline {
  display: inline-block;
}

.icon {
  margin-right: 4px;
}

.park {
  margin: 20px 10px;
  height: 100%;
  width: 100%;
  flex: 1 1 auto;
}

.image {
  max-height: 160px;
  border-radius: 10px;
}

.image img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    overflow: hidden;
}

.titleBox {
  margin-top: 17px;
}

.address {
  color: $black
}

.postnumber {
  color: $gray
}

.price {
  color: $green
}

.info {
  color: $gray;
  height: 14px;
  font-size: 12px;
}

.info svg {
  width: 12px;
  height: 12px;
  fill: $gray;
}

.info svg, span {
  vertical-align: middle;
}

</style>

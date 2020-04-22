<template>
 <div class="dropdown" :class="{'is-active': open}">
  <div class="dropdown-trigger">
    <button @click="open = !open"
    class="button" aria-haspopup="true" aria-controls="dropdown-menu">
      <span>{{selected}}</span>
      <span class="icon is-small">
        <i class="fas fa-angle-down" aria-hidden="true"></i>
      </span>
    </button>
  </div>
  <div class="dropdown-menu" id="dropdown-menu" role="menu">
    <div class="dropdown-content">
      <a
        class="dropdown-item"
        v-for="(option, i) of options"
        :key="i"
        @click="selected=option; open=false; $emit('input', option)"
      >
        {{ option }}
      </a>
    </div>
  </div>
</div>
</template>

<script>
export default {
  props: {
    options: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      selected: this.options.length > 0 ? this.options[0] : null,
      open: false,
    };
  },
  mounted() {
    this.$emit('input', this.selected);
  },
};
</script>

<style lang="scss" scoped>
@import "../../node_modules/bulma/bulma.sass";

</style>

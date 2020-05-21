<template>
<div class="tags">
  <div
    class="tag is-medium filter"
    v-for="(filter, index) in filters" :key="filter.type"
    :class="{'filter-is-active': filter.status}"
    @click="filterHandler(index)"
    >
    <span>{{ filter.name }}</span>
  </div>
</div>
</template>

<script>
export default {
  data() {
    return {
      filters: [
        {
          type: 'toilet',
          name: 'Toalett',
          status: false,
        },
        {
          type: 'shower',
          name: 'Dusch',
          status: false,
        },
        {
          type: 'firstAidEquipment',
          name: 'Förbandslåda',
          status: false,
        },
        {
          type: 'refuseBin',
          name: 'Avfall',
          status: false,
        },
      ],
    };
  },
  methods: {
    filterHandler(index) {
      this.filters[index].status = !this.filters[index].status;
      this.$emit('input', this.filters);
    },
  },
};
</script>

<style lang="scss" scoped>
@import "~bulma/bulma";

.filter-is-active {
  border-color: $gray;
  border-width: 2px;
  border-style: solid;
}

.filter-is-active span {
  color:  $tag-color  !important;
}

.filter span {
  color: $gray;
}

.filter:hover {
  cursor: pointer;
  background-color: hsl(0, 0%, 90%);
}

</style>

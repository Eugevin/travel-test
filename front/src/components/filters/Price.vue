<template>
  <div class="price-filter filter">
    <div class="filter__heading">Цена</div>
    <div class="filter__body">
      <vue-slider
        @change="sliderHandler"
        v-model="value"
        :process="true"
        :min="0"
        :max="$props.maxPrice"
      ></vue-slider>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import VueSlider from "vue-slider-component";
import "vue-slider-component/theme/antd.css";

export default defineComponent({
  components: {
    VueSlider,
  },
  data() {
    return {
      value: [0, this.$props.maxPrice],
    };
  },
  props: {
    maxPrice: Number,
  },
  methods: {
    sliderHandler() {
      this.$store.dispatch("setPriceFilter", this.value);
    },
  },
});
</script>

<style lang="scss" scoped></style>

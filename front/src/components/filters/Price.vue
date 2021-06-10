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

<style lang="scss">
.price-filter {
  .filter__body {
    .vue-slider {
      .vue-slider-process {
        background-color: #ff4641;
        opacity: 0.7;
      }

      &:hover .vue-slider-process {
        opacity: 1;
      }

      .vue-slider-dot-handle {
        border: 3px solid #ff4641;
        opacity: 0.7;

        &:hover {
          opacity: 1;
        }
      }

      .vue-slider-dot-handle-focus {
        opacity: 1;
        box-shadow: 0 0 0 5px rgb(255 70 65 / 20%);
      }
    }
  }
}
</style>

<template>
  <div class="stars-filter filter">
    <div class="filter__heading">Звезды</div>
    <div class="filter__body">
      <label class="filter__item">
        <input @change="starHandler" v-model="stars[0]" type="checkbox" />
        <div></div>
        <span>Без звезд</span>
      </label>
      <label class="filter__item">
        <input @change="starHandler" v-model="stars[1]" type="checkbox" />
        <div></div>
        <span>1 звезда</span>
      </label>
      <label class="filter__item">
        <input @change="starHandler" v-model="stars[2]" type="checkbox" />
        <div></div>
        <span>2 звезды</span>
      </label>
      <label class="filter__item">
        <input @change="starHandler" v-model="stars[3]" type="checkbox" />
        <div></div>
        <span>3 звезды</span>
      </label>
      <label class="filter__item">
        <input @change="starHandler" v-model="stars[4]" type="checkbox" />
        <div></div>
        <span>4 звезды</span>
      </label>
      <label class="filter__item">
        <input @change="starHandler" v-model="stars[5]" type="checkbox" />
        <div></div>
        <span>5 звезд</span>
      </label>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  data() {
    return {
      stars: {
        0: false,
        1: false,
        2: false,
        3: false,
        4: false,
        5: false,
      },
    };
  },

  methods: {
    starHandler() {
      this.$store.dispatch("setStarsFilter", this.stars);
    },
  },
});
</script>

<style lang="scss">
.stars-filter {
}
</style>

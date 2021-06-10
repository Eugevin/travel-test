<template>
  <div class="cities-filter filter">
    <div class="filter__heading">Поиск по странам и городам</div>
    <div class="filter__body">
      <input
        @change="changeHandler"
        v-model="value"
        type="text"
      />
      <ul class="cities-filter__list">
        <li v-for="country in countries" :key="country">
          <a @click.prevent="countryHandler" href="#">{{ country }}</a>
        </li>
      </ul>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  computed: {
    countries() {
      return this.$store.state.countries;
    }
  },

  data() {
    return {
      value: ""
    };
  },

  methods: {
    countryHandler(e: any) {
      this.value = e.target.textContent;

      this.changeHandler();
    },

    // inputHandler() {}, @input="inputHandler"

    changeHandler() {
      this.$store.dispatch("setCountryFilter", this.value);
    }
  }
});
</script>

<style lang="scss" scoped>
.cities-filter {
  .filter__body {
    position: relative;

    input[type="text"] {
      width: 100%;
      outline: none;
      padding: 15px;
      border: 1.6px solid #d5cdbe;
      border-radius: 2px;
      font-size: 15px;
      line-height: 12px;
      color: #837f78;

      &:focus {
        + .cities-filter__list {
          opacity: 1;
          visibility: visible;
        }
      }
    }

    .cities-filter__list {
      position: absolute;
      z-index: 99;
      width: calc(100% - 42px);
      background: #ffffff;
      box-shadow: 0 10px 30px rgba(31, 21, 1, 0.1);
      border-radius: 2px;

      opacity: 0;
      visibility: hidden;
      transition: var(--fast-transition);

      li {
        a {
          font-size: 15px;
          line-height: 20px;
          text-decoration: none;
          color: #000000;
          display: block;
          padding: 12.5px 30px;
        }
      }
    }
  }
}
</style>

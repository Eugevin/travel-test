<template>
  <main>
    <div class="app__filters">
      <slot :key="filtersVisible">
        <Cities />
        <Stars />
        <Type />
        <Price :max-price="maxPrice" />
        <div class="app__reset">
          <a @click.prevent="resetHandler" href="#">Сбросить все фильтры</a>
        </div>
      </slot>
    </div>
    <div class="app__hotels">
      <div class="container">
        <Hotel
          v-for="(hotel, index) in hotels.slice(0, count)"
          :hotel="hotel"
          :key="index"
        />
        <div class="app__hotels-empty">Записей не найдено</div>
        <div class="app__hotels-more">
          <a
            v-if="$store.state.hotels.length >= count"
            @click.prevent="count += 6"
            href="#"
            >Показать еще отели</a
          >
        </div>
      </div>
    </div>
  </main>
</template>

<script lang="ts">
import { defineComponent } from "vue";

import Hotel from "@/components/Hotel.vue";

import Stars from "@/components/filters/Stars.vue";
import Cities from "@/components/filters/Countries.vue";
import Price from "@/components/filters/Price.vue";
import Type from "@/components/filters/Type.vue";

export default defineComponent({
  components: { Type, Price, Cities, Stars, Hotel },

  data() {
    return {
      count: 6,
      filtersVisible: 0
    };
  },

  methods: {
    resetHandler() {
      this.$store.dispatch("allReset");

      this.forceRerender();
    },
    forceRerender() {
      this.filtersVisible += 1;
    }
  },

  computed: {
    hotels() {
      return this.$store.state.filtered;
    },
    maxPrice() {
      return this.$store.state.maxPrice;
    }
  },

  mounted() {
    const request = fetch("http://localhost:3000/data");

    request
      .then(response => response.json())
      .then(({ hotels }) => {
        this.$store.dispatch("setAll", hotels);

        this.forceRerender();
      });
  }
});
</script>

<style lang="scss">
:root {
  --fast-transition: 0.3s ease;
}

*,
*::before,
*::after {
  margin: 0;
  padding: 0;
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  box-sizing: border-box;
}

#app {
  margin: 20px 0;
  font-family: "Arial", sans-serif;

  .container {
    padding: 0 20px;
    max-width: 940px;
    margin: 0 auto;
  }

  .app__hotels {
    flex-basis: 940px;
  }

  .app__hotels-empty {
    width: 829.359px;
    display: block;
  }

  .hotel + .app__hotels-empty {
    display: none;
  }

  a {
    text-decoration: none;
  }

  ul {
    list-style: none;
  }

  main {
    display: flex;
    justify-content: center;
  }

  .app__hotels-more {
    display: flex;
    justify-content: center;

    a {
      padding: 19px;
      font-size: 15px;
      line-height: 17px;
      color: #000000;
      text-align: center;
      display: inline-block;
      margin: 0 auto;
      border: 2px solid #f0eade;
      border-radius: 2px;
      transition: var(--fast-transition);

      &:hover {
        background: #f0eade;
      }
    }
  }

  .app__reset {
    margin-top: 10px;
    display: flex;
    justify-content: center;

    a {
      position: relative;
      padding-left: 28px;
      font-size: 15px;
      line-height: 28px;
      color: #0e0e0e;

      &::before {
        content: "";
        position: absolute;
        top: 50%;
        left: 0;
        transform: translateY(-50%);
        height: 20px;
        width: 20px;
        background: url("./assets/round.svg") no-repeat center / contain;
      }
    }
  }

  .app__filters {
    flex-basis: 300px;
  }

  .filter {
    border: 1px solid #f3efea;
    border-radius: 2px;
    margin-bottom: 20px;

    .filter__heading {
      cursor: pointer;
      padding: 24px 21px;
      font-size: 15px;
      line-height: 17px;
      color: #000000;
      position: relative;
      border-bottom: 1px solid #f3efea;

      &::after {
        content: "";
        position: absolute;
        top: 50%;
        right: 21px;
        transform: translateY(-50%) rotate(135deg);
        height: 5px;
        width: 5px;
        border: 1px solid #000000;
        border-bottom: none;
        border-left: none;
      }
    }

    .filter__body {
      padding: 30px 21px;

      label {
        display: flex;
        align-items: center;
        margin-bottom: 21px;

        input {
          display: none;

          &:checked + div {
            border: 2px solid #ff4641;
            background: #ff4641;
          }
        }

        div {
          position: relative;
          height: 20px;
          width: 20px;
          border: 2px solid #d5cdbe;
          border-radius: 2px;
          transition: var(--fast-transition);

          &::before {
            content: "";
            position: absolute;
            top: 0;
            left: 0;
            height: 100%;
            width: 100%;
            background: url("./assets/arrow.svg") no-repeat center / 16px;
          }
        }

        span {
          margin-left: 8px;
          font-size: 15px;
          line-height: 28px;
          color: #000000;
        }
      }
    }
  }
}
</style>

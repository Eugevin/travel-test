import { createStore } from "vuex";

export default createStore({
  state: {
    hotels: [],
    filtered: [],
    filters: {
      country: [],
      stars: [],
      type: [],
      price: [],
    },
    countries: [],
    types: [],
    maxPrice: [],
  },
  mutations: {
    // SETTERS

    setHotels(state, value) {
      state.hotels = value;
    },

    setCountries(state, value) {
      state.countries = value;
    },

    setTypes(state, value) {
      state.types = value;
    },

    // FILTERS

    setFiltered(state, value) {
      if (value === "reset") {
        state.filtered = state.hotels.slice();

        return;
      }

      if (value === "event") {
        state.filtered = state.hotels.slice();

        const country: any = state.filters.country;

        if (String(country) !== "") {
          state.filtered = state.filtered.filter(
            (el: { country: string }) => el.country === country
          );
        }

        const stars: any = new Set(state.filters.stars);

        if (stars.size > 0) {
          state.filtered = state.filtered.filter((el: { stars: number }) => {
            console.log(stars, el.stars);

            return stars.has(String(el.stars));
          });
        }

        const type: any = new Set(state.filters.type);

        if (type.size > 0) {
          state.filtered = state.filtered.filter((el: { type: string }) =>
            type.has(String(el.type))
          );
        }

        const price: any = state.filters.price;

        if (price.length > 0) {
          state.filtered = state.filtered.filter(
            (el: { min_price: number }) => {
              if (el.min_price > price[0] && el.min_price < price[1]) {
                return true;
              }
            }
          );
        }

        return;
      }

      state.filtered = value;
    },

    setCountry(state, value) {
      state.filters.country = value;
    },

    setStars(state, value) {
      state.filters.stars = value;
    },

    setType(state, value) {
      state.filters.type = value;
    },

    setPrice(state, value) {
      state.filters.price = value;
    },

    // MAX-PRICE

    setMaxPrice(state, value) {
      state.maxPrice = value;
    },

    // RESET

    reset(state) {
      state.filters.country = [];
      state.filters.price = [];
      state.filters.stars = [];
      state.filters.type = [];
    },
  },
  actions: {
    // SETTERS

    setAll(context, array) {
      // HOTELS STATE HOLDER

      const ratedArr = array.sort(
        (a: { stars: number }, b: { stars: number }) => b.stars - a.stars
      );

      context.commit("setHotels", ratedArr);
      context.commit("setFiltered", ratedArr);

      // MAX-PRICE STATE HOLDER

      const sortedArr = array.sort(
        (a: { min_price: number }, b: { min_price: number }) =>
          b.min_price - a.min_price
      );

      context.commit("setMaxPrice", sortedArr[0].min_price);

      // CITIES STATE HOLDER

      context.commit("setCountries", setter(array, "country"));

      // TYPES STATE HOLDER

      context.commit("setTypes", setter(array, "type"));

      function setter(array: [], value: string) {
        const set = new Set();

        array.forEach((el: any) => set.add(el[value]));

        return set;
      }
    },

    setCountryFilter(context, country) {
      context.commit("setCountry", country);
      context.commit("setFiltered", "event");
    },

    setStarsFilter(context, stars) {
      let falseStars = -1;

      for (const key in stars) {
        stars[key] === false ? falseStars++ : null;
      }

      if (falseStars === 5) {
        context.commit("setStars", []);
        context.commit("setFiltered", "event");

        return;
      }

      const validStars = [];

      for (const key in stars) {
        stars[key] === true ? validStars.push(key) : null;
      }

      context.commit("setStars", validStars);
      context.commit("setFiltered", "event");
    },

    setTypeFilter(context, type) {
      context.commit("setType", type);
      context.commit("setFiltered", "event");
    },

    setPriceFilter(context, price) {
      context.commit("setPrice", price);
      context.commit("setFiltered", "event");
    },

    allReset(context) {
      context.commit("reset");
      context.commit("setFiltered", "reset");
    },
  },
});

<template>
  <div class="filter-type filter">
    <div class="filter__heading">Тип</div>
    <div class="filter__body">
      <ul class="filter-type__list">
        <li v-for="type in types" :key="type">
          <a @click.prevent="typeHandler" href="#">{{ type }}</a>
        </li>
      </ul>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  computed: {
    types() {
      return this.$store.state.types;
    },
  },

  methods: {
    typeHandler(e: any) {
      const eTarget = e.target;

      if (!eTarget.classList.contains("_active")) {
        eTarget.classList.add("_active");
      } else {
        eTarget.classList.remove("_active");
      }

      const activeTypes: any = [];
      const activeEls = document.querySelectorAll(
        ".filter-type__list li a._active "
      ); // Знаю, что нужно было через v-model. Спешил :c

      activeEls.forEach((el) => activeTypes.push(el.textContent));

      this.$store.dispatch("setTypeFilter", activeTypes);
    },
  },
});
</script>

<style lang="scss" scoped>
.filter-type {
  .filter-type__list {
    display: flex;
    margin: 0 -4px;

    li {
      a {
        margin: 0 4px;
        font-size: 15px;
        line-height: 12px;
        color: #000000;
        background: #f9f7f2;
        border-radius: 50px;
        padding: 14px 15px;
        transition: var(--fast-transition);

        &._active {
          background: #fde283;
        }
      }
    }
  }
}
</style>

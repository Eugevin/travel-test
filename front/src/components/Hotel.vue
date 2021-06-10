<template>
  <div class="hotel">
    <div class="hotel__image">
      <img src="../assets/hotel.jpg" alt="hotel image" />
    </div>
    <div class="hotel__description">
      <div class="hotel__address">{{ $props.hotel.address }}</div>
      <div class="hotel__name">{{ $props.hotel.name }}</div>
      <div class="row">
        <div class="hotel__stars">
          <div :style="{ width: `${$props.hotel.stars * 15.6}px` }">
            <img src="../assets/stars.svg" alt="hotel stars" />
          </div>
          <span>
            {{ $props.hotel.stars }}
            {{ $props.hotel.stars === 5 ? "звезд" : "звезды" }}
          </span>
        </div>
        <div class="hotel__type">{{ $props.hotel.type }}</div>
      </div>
      <div class="hotel__text">{{ $props.hotel.description.slice(0, 97) }}</div>
    </div>
    <div class="hotel__adds">
      <div v-if="$props.hotel.last_review !== ''" class="hotel__review">
        <div class="hotel__review-heading">
          <div>
            <div>
              <img src="../assets/stars.svg" alt="star" />
            </div>
            <span>{{ $props.hotel.rating }}</span>
          </div>
          <div>
            {{ $props.hotel.rating > 3 ? "Хорошо" : "Плохо" }}
          </div>
          <div>
            {{ $props.hotel.reviews_amount }}
          </div>
        </div>
        <div class="hotel__review-body">
          {{ $props.hotel.last_review.slice(0, 100) }}
        </div>
      </div>
      <div v-else class="hotel__review hotel__review_nope">
        <div class="hotel__review-body">
          <img src="../assets/nope-star.svg" alt="nope star" />
          <span>Нет оценок.</span>
        </div>
      </div>
      <div class="hotel__order">
        <span class="hotel__min-price"
          >от
          {{
            Math.round($props.hotel.min_price).toLocaleString() +
            " " +
            $props.hotel.currency
          }}
        </span>
        <a @click.prevent class="hotel__button" href="#">Забронировать</a>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  props: {
    hotel: {},
  },
});
</script>

<style scoped lang="scss">
.hotel {
  display: flex;
  padding-bottom: 29px;
  margin: 0 -12px 29px;
  border-bottom: 1px solid #f3efea;

  > div {
    padding: 0 12px;
  }

  .row {
    display: flex;
    margin-top: 20px;
  }

  .hotel__description {
    .hotel__address {
      font-size: 13px;
      line-height: 17px;
      color: #515151;
    }

    .hotel__name {
      margin-top: 6px;
      font-size: 21px;
      line-height: 24px;
      color: #000000;
    }

    .hotel__stars {
      display: flex;

      > div {
        overflow: hidden;
      }

      > span {
        white-space: nowrap;
        margin: 0 8px;
        font-size: 13px;
        line-height: 17px;
        color: #212121;
      }
    }

    .hotel__type {
      font-size: 13px;
      line-height: 17px;
      color: #515151;
      padding: 0 8px;
      border: 1px solid #d4d4d4;
      border-radius: 2px;
    }

    .hotel__text {
      margin-top: 16px;
      font-size: 14px;
      line-height: 20px;
      color: #000000;

      &::after {
        content: "...";
      }
    }
  }

  .hotel__adds {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: flex-end;

    .hotel__review {
      width: 240px;
      padding: 25px 20px;
      background: #f9f7f2;

      .hotel__review-heading {
        margin: 0 -8px 18px;
        display: flex;
        align-items: center;

        > div {
          font-size: 14px;
          line-height: 17px;
          color: #000000;

          position: relative;
          display: flex;
          padding: 0 8px;

          > div {
            overflow: hidden;
            width: 15.6px;
          }

          > span {
            font-size: inherit;
            line-height: inherit;
            color: inherit;
          }

          &::before {
            content: "";
            position: absolute;
            right: 0;
            top: 50%;
            transform: translateY(-50%);
            height: 2px;
            width: 2px;
            background: #b7b2a8;
          }

          &:last-child::before {
            content: none;
          }
        }
      }

      .hotel__review-body {
        display: inline;
        font-size: 13px;
        line-height: 17px;
        color: #515151;

        &::before,
        &::after {
          content: '"';
        }
      }

      img {
        margin-right: 8px;
      }

      span {
        font-size: 14px;
        line-height: 17px;
        color: #959595;
      }

      &.hotel__review_nope {
        .hotel__review-body {
          display: flex;
          align-items: center;

          &::before,
          &::after {
            content: none;
          }
        }
      }
    }

    .hotel__order {
      .hotel__min-price {
        margin-right: 11px;
        font-size: 17px;
        line-height: 17px;
        color: #000000;
      }

      .hotel__button {
        display: inline-block;
        padding: 10px;
        font-size: 14px;
        line-height: 17px;
        color: #ffffff;
        background: #ff4641;
        border-radius: 2px;
      }
    }
  }
}
</style>

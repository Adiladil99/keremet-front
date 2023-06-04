<template>
  <SelectGpsModal v-if="$store.state.openGpsModal == true" />
  <div class="home">
    <div class="home__block1 container">
      <swiper
        :breakpoints="swiper.breakpoint1"
        :pagination="paginationNew"
        :modules="modules"
      >
        <swiper-slide
          class="home__block1__bannerBack"
          v-for="item in main__banner"
          :key="item"
        >
          <div
            class="home__block1__banner"
            :style="{
              backgroundImage:
                'url(' +
                require('@/assets/images/' + item.banner + '.jpg') +
                ')',
            }"
          >
            <div class="home__block1__banner-text">
              <p
                class="home__block1__banner-p1"
                data-aos="fade-right"
                data-aos-delay="650"
                data-aos-duration="800"
              >
                {{ item.title }}
              </p>
              <p
                class="home__block1__banner-p2"
                data-aos="fade-right"
                data-aos-delay="700"
                data-aos-duration="800"
              >
                {{ item.desc }}
              </p>
            </div>
          </div>
        </swiper-slide>
      </swiper>
      <FormBannerMoving
        class="formBanner"
        data-aos="zoom-in"
        data-aos-delay="650"
        data-aos-duration="800"
      />
    </div>
  </div>
</template>
<script>
import { Swiper, SwiperSlide } from "swiper/vue";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import SwiperCore, { A11y, Autoplay } from "swiper";
import { Navigation, Pagination } from "swiper";
import "swiper/swiper.min.css";
SwiperCore.use([Navigation, Pagination, A11y, Autoplay]);

import AOS from "aos";
import "aos/dist/aos.css";
import FormBanner from "@/components/FormBanner.vue";
import BetterCard from "@/components/BetterCard.vue";

import better from "@/data/better.json";
import faq from "@/data/faq.json";
import reviews from "@/data/reviews.json";
import ReviewsCard from "@/components/ReviewsCard.vue";
import SelectGpsModal from "@/components/MapSelect/SelectGpsModal.vue";
import FormBannerMoving from "@/components/FormBannerMoving.vue";

export default {
  components: {
    Swiper,
    SwiperSlide,
    FormBanner,
    BetterCard,
    ReviewsCard,
    SelectGpsModal,
    FormBannerMoving
},
  data() {
    return {
      openFaqValue: 1,
      reviews: reviews.reviews,
      better: better.better,
      faq: faq.faq,
      swiper: {
        breakpoint1: {
          320: {
            slidesPerView: 1,
          },
          991: {
            slidesPerView: 1,
          },
        },
        breakpoint2: {
          320: {
            slidesPerView: 2,
            spaceBetween: 30,
          },
          991: {
            slidesPerView: 4,
            spaceBetween: 30,
          },
        },
        breakpoint3: {
          320: {
            slidesPerView: 1,
          },
          991: {
            slidesPerView: 3,
            spaceBetween: 24,
          },
        },
      },
      main__banner: [
        {
          title: "Почему мувинг — это не просто переезд",
          desc: "Мувинг отличается от переезда тем, что одновременно это слово ещё означает комплекс услуг и действий, которые нужно произвести, чтобы переехать.",
          banner: "moving1",
        },
        {
          title: "Попробуйте мувинг — вам понравится",
          desc: "Если у вас планируется переезд, то все заботы и его организацию лучше доверить настоящим муверам-профессионалам, которые всё сделают в формате «под ключ».",
          banner: "moving2",
        },
        {
          title: "Что входит в переезд под ключ",
          desc: "15 видов упаковочных материалов для всех видов вещей, мебели и техники.",
          banner: "moving3",
        },
      ],
    };
  },
  methods: {
    openFaq(value) {
      this.openFaqValue = value;
    },
  },
  setup() {
    return {
      paginationNew: {
        clickable: true,
        type: "bullets",
        horizontalClass: "bullets-content",
        bulletClass: "bulletsA",
        bulletActiveClass: "bulletsA-active",
        dynamicBullets: true,
      },
      modules: [Pagination, Navigation],
    };
  },
  mounted() {
    AOS.init();
  },
};
</script>
<style lang="scss" scoped>
.allTitles {
  font-weight: 700;
  font-size: 32px;
}
.home {
  &__block1 {
      margin-bottom: 40px;
    position: relative;
    margin-top: 16px;
    @media screen and (max-width: 768px) {
      margin-top: 96px;
    }
    &__banner {
      background-repeat: no-repeat;
      margin: auto;
      width: 100%;
      background-size: cover;
      height: 720px;
      border-radius: 16px;
      position: relative;
      @media screen and (max-width: 768px) {
        height: 820px;
      }
      &-text {
        position: absolute;
        top: 60%;
        @media screen and (max-width: 768px) {
          top: 1%;
        }
      }
      &-p1 {
        margin-left: 80px;
        font-weight: 700;
        font-size: 48px;
        color: #000;
        @media screen and (max-width: 768px) {
          margin-left: 30px;
        }
      }
      &-p2 {
        margin-left: 80px;
        font-weight: 400;
        font-size: 24px;
        color: #000;
        @media screen and (max-width: 768px) {
          margin-left: 30px;
        }
      }
    }
    .formBanner {
      z-index: 2;
      position: absolute;
      right: 30px;
      top: 24px;
      @media screen and (max-width: 768px) {
        right: 2%;
        top: 17%;
      }
    }
  }
  &__block2 {
    padding: 240px 0 120px 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
    @media screen and (max-width: 768px) {
      padding: 60px 0 60px 0;
      flex-direction: column;
    }
    &__left {
      width: 42%;
      @media screen and (max-width: 768px) {
        width: 100%;
      }
      &-p1 {
        font-weight: 700;
        font-size: 32px;
      }
      &-p2 {
        margin-top: 32px;
        color: #72777a;
        font-weight: 400;
        font-size: 16px;
      }
    }
    &__right {
      @media screen and (max-width: 768px) {
        margin-top: 20px;
        width: 100%;
        img {
          width: 100%;
          height: 100%;
        }
      }
    }
  }
  &__block3Back {
    background: #fcfcfd;
    padding: 80px 0;
    @media screen and (max-width: 768px) {
      padding: 40px 0;
    }
  }
  &__block3 {
    &-swiper {
      margin-top: 80px;
    }
  }
  &__block4 {
    padding: 80px 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    @media screen and (max-width: 768px) {
      padding: 40px 0;
    }
    &__contents {
      width: 42.5%;
      margin-top: 100px;
      display: flex;
      flex-direction: column;
      gap: 16px;
      @media screen and (max-width: 768px) {
        margin-top: 40px;
        width: 95%;
      }
      &__box {
        &__block1 {
          display: flex;
          justify-content: space-between;
          font-weight: 500;
          font-size: 16px;
          &-text {
            width: 90%;
          }
        }
        &__block2 {
          margin-top: 16px;
          color: #72777a;
          font-weight: 400;
          font-size: 14px;
          width: 88.5%;
          margin-right: auto;
          margin-left: auto;
        }
        &__block3 {
          margin: 16px 0;
          height: 1px;
          background: #f2f4f5;
          width: 100%;
        }
      }
    }
  }
  &__block5Back {
    background: #fcfcfd;
    padding: 80px 0;
    @media screen and (max-width: 768px) {
      padding: 40px 0;
    }
  }
  &__block5 {
    &-swiper {
      margin-top: 80px;
      @media screen and (max-width: 768px) {
        margin-top: 40px;
      }
    }
  }
  &__block6 {
    padding: 80px 0 110px 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
    @media screen and (max-width: 768px) {
      padding: 40px 0;
      flex-direction: column;
    }
    &__left {
      width: 40.06%;
      height: 500px;
      @media screen and (max-width: 768px) {
        width: 100%;
        height: 300px;
      }
      iframe {
        border-radius: 32px;
        width: 100%;
        height: 100%;
      }
    }
    &__right {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      width: 50.06%;
      @media screen and (max-width: 768px) {
        margin-top: 16px;
        width: 100%;
      }
      &-p1 {
        margin-bottom: 40px;
        font-weight: 700;
        font-size: 32px;
      }
      &-p2 {
        font-weight: 400;
        font-size: 20px;
      }
      &-p3 {
        margin-top: 16px;
        font-weight: 400;
        font-size: 20px;
      }
      &-p4 {
        margin-top: 50px;
        display: flex;
        gap: 16px;
      }
    }
  }
}
</style>
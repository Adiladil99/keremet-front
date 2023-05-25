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
                require('@/assets/images/' + item.banner + '.png') +
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
      <FormBanner
        class="formBanner"
        data-aos="zoom-in"
        data-aos-delay="650"
        data-aos-duration="800"
      />
    </div>

    <div class="home__block2 container" id="about">
      <div class="home__block2__left">
        <p
          class="home__block2__left-p1"
          data-aos="fade-down"
          data-aos-delay="650"
          data-aos-duration="800"
        >
          О нас
        </p>
        <p
          class="home__block2__left-p2"
          data-aos="fade-down"
          data-aos-delay="650"
          data-aos-duration="800"
        >
          Мы - Keremet Logistics, транспортно-экспедиционная компания, которая
          перевезет Ваши документы и посылки в кратчайшие сроки по принципу
          «от-двери-до-двери». <Br /> <Br /> Мы поможем Вам развивать бизнес или
          просто отправить письмо близкому человеку по доступным ценам. <Br />
          <Br />
          Мы ценим Ваше время!
        </p>
      </div>
      <div
        class="home__block2__right"
        data-aos="zoom-in"
        data-aos-delay="650"
        data-aos-duration="800"
      >
        <img src="@/assets/images/block2.png" />
      </div>
    </div>

    <div class="home__block3Back">
      <div class="home__block3 container">
        <p
          class="allTitles"
          data-aos="fade-down"
          data-aos-delay="650"
          data-aos-duration="800"
        >
          {{ $t("ourPremush") }}
        </p>
        <swiper
          class="home__block3-swiper"
          :breakpoints="swiper.breakpoint2"
          :lazy="true"
          :loop="false"
          :autoplay="{
            delay: 2800,
            disableOnInteraction: false,
          }"
        >
          <swiper-slide
            class="home__block1__bannerBack"
            v-for="item in better"
            :key="item"
          >
            <BetterCard
              :better="item"
              data-aos="zoom-in"
              data-aos-delay="650"
              data-aos-duration="800"
            />
          </swiper-slide>
        </swiper>
      </div>
    </div>

    <div class="home__block4 container" id="faq">
      <p
        class="allTitles"
        data-aos="fade-down"
        data-aos-delay="650"
        data-aos-duration="800"
      >
        {{ $t("faqQues") }}
      </p>
      <div class="home__block4__contents">
        <div
          class="home__block4__contents__box"
          v-for="(item, idx) in faq"
          :key="idx"
          data-aos="fade-down"
          data-aos-delay="650"
          data-aos-duration="800"
        >
          <div class="home__block4__contents__box__block1">
            <p
              style="color: #72777a; transition: all 0.5s ease"
              :style="
                openFaqValue - 2 == idx ? 'color: red;' : 'color: #72777A'
              "
            >
              0{{ ++idx }}
            </p>
            <p class="home__block4__contents__box__block1-text">
              {{ item.title }}
            </p>
            <img
              src="@/assets/icons/select.svg"
              @click="openFaq(idx)"
              style="transition: all 0.5s ease; cursor: pointer"
              :style="
                openFaqValue - 1 == idx ? 'rotate: 180deg' : 'rotate: 0deg'
              "
            />
          </div>
          <p
            class="home__block4__contents__box__block2"
            v-if="openFaqValue == ++idx"
          >
            {{ item.desc }}
          </p>
          <div
            class="home__block4__contents__box__block3"
            v-if="faq.length >= idx"
          ></div>
        </div>
      </div>
    </div>

    <div class="home__block5Back" id="reviews">
      <div class="home__block5 container">
        <p
          class="allTitles"
          style="text-align: center"
          data-aos="fade-down"
          data-aos-delay="650"
          data-aos-duration="800"
        >
          {{ $t("reviewCompany") }}
        </p>
        <swiper
          style="padding: 12px"
          class="home__block5-swiper"
          :breakpoints="swiper.breakpoint3"
          :lazy="true"
          :loop="false"
          :autoplay="{
            delay: 2800,
            disableOnInteraction: false,
          }"
        >
          <swiper-slide
            class="home__block1__bannerBack"
            v-for="item in reviews"
            :key="item"
          >
            <ReviewsCard
              :reviews="item"
              data-aos="zoom-in"
              data-aos-delay="650"
              data-aos-duration="800"
            />
          </swiper-slide>
        </swiper>
      </div>
    </div>

    <div class="home__block6 container" id="contacts">
      <div
        class="home__block6__left"
        data-aos="zoom-in"
        data-aos-delay="650"
        data-aos-duration="800"
      >
        <iframe
          src="https://yandex.ru/map-widget/v1/?um=constructor%3Aeeb9bd9372ab12d86b14d86fa0964edbe2dd72df16bfa55150b0932b762df597&amp;source=constructor"
          width="1105"
          height="572"
          frameborder="0"
        ></iframe>
      </div>
      <div class="home__block6__right">
        <p
          class="home__block6__right-p1"
          data-aos="fade-down"
          data-aos-delay="550"
          data-aos-duration="800"
        >
          {{ $t("ourContacts") }}
        </p>
        <p
          class="home__block6__right-p2"
          data-aos="fade-down"
          data-aos-delay="600"
          data-aos-duration="800"
        >
          +7(705)777-46-00
        </p>
        <p
          class="home__block6__right-p3"
          data-aos="fade-down"
          data-aos-delay="650"
          data-aos-duration="800"
        >
          info@keremet.kz
        </p>
        <div
          class="home__block6__right-p4"
          data-aos="fade-down"
          data-aos-delay="700"
        >
          <img src="@/assets/icons/facebook1.png" />
          <img src="@/assets/icons/instagram1.png" />
          <img src="@/assets/icons/telegram1.png" />
        </div>
      </div>
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

export default {
  components: {
    Swiper,
    SwiperSlide,
    FormBanner,
    BetterCard,
    ReviewsCard,
    SelectGpsModal,
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
          title: "Text1",
          desc: "desc1",
          banner: "banner1",
        },
        {
          title: "Text2",
          desc: "desc2",
          banner: "banner1",
        },
        {
          title: "Text3",
          desc: "desc3",
          banner: "banner1",
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
        color: #ffffff;
        @media screen and (max-width: 768px) {
          margin-left: 30px;
        }
      }
      &-p2 {
        margin-left: 80px;
        font-weight: 400;
        font-size: 24px;
        color: #ffffff;
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
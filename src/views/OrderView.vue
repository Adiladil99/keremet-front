<template>
  <div class="order">
    <div class="bread">
      <div class="bread__content container">
        <img src="@/assets/icons/back.svg" @click="$router.back" />
        <p>{{ $t("offerParcel") }}</p>
      </div>
    </div>
    <div class="container">
      <div class="order__content">
        <p class="order__content-text1">{{ $t("typeParcel") }}</p>
        <div class="order__content__buttons">
          <button
            @click="valueOrder = 1"
            :class="{ activeValue: valueOrder == 1 }"
          >
            {{ $t("document") }}
          </button>
          <button
            @click="valueOrder = 2"
            :class="{ activeValue: valueOrder == 2 }"
          >
            {{ $t("parcel") }}
          </button>
        </div>

        <div class="order__content__notice" v-if="valueOrder == 2">
          <p class="order__content__notice-title">{{ $t("danger") }}</p>
          <div class="order__content__notice-list">
            <li>{{ $t("dangerDesc1") }}</li>
            <li>{{ $t("dangerDesc2") }}</li>
            <li>{{ $t("dangerDesc3") }}</li>
            <li>{{ $t("dangerDesc4") }}</li>
          </div>
        </div>

        <p class="order__content-text2">{{ $t("weightParcel") }}</p>
        <div class="order__content__inputs">
          <div class="order__content__kg">
            <p class="order__content__kg-p1">{{ $t("weightKg") }}</p>
            <div class="order__content__kg-input">
              <img src="@/assets/icons/kg.svg" />
              <input type="number" v-model="weight" />
            </div>
          </div>

          <div class="order__content__kg" v-if="valueOrder == 2">
            <p class="order__content__kg-p1">{{ $t("weightKg2") }}</p>
            <div class="order__content__kg-input">
              <img src="@/assets/icons/kg2.svg" />
              <input type="number" v-model="length" />
            </div>
          </div>

          <div class="order__content__kg" v-if="valueOrder == 2">
            <p class="order__content__kg-p1">{{ $t("weightKg3") }}</p>
            <div class="order__content__kg-input">
              <img src="@/assets/icons/kg2.svg" />
              <input type="number" v-model="width" />
            </div>
          </div>

          <div class="order__content__kg" v-if="valueOrder == 2">
            <p class="order__content__kg-p1">{{ $t("weightKg4") }}</p>
            <div class="order__content__kg-input">
              <img src="@/assets/icons/kg2.svg" />
              <input type="number" v-model="height" />
            </div>
          </div>
        </div>

        <p class="order__content-text3" style="color: black">
          {{ $t("allDataParcel") }}
          <!-- <button @click="mapBoolean = !mapBoolean" class="selectmap">{{ !mapBoolean ? $t('selectInMap') : $t('hideMap') }}</button> -->
        </p>

        <Map
          @selectedAddress1="selectedAddress1"
          @distance="getDistance"
          @selectedAddress2="selectedAddress2"
        />
        <!-- {{ address1 }} <br />
                {{ address2 }} -->
        <div class="dateAboutParcel">
          <div class="dateAboutParcel__box">
            <p class="dateAboutParcel__box-title">{{ $t("form1") }}</p>
            <input
              class="dateAboutParcel__box-input"
              :placeholder="$t('formDesc1')"
              v-model="address1.city"
            />
          </div>
          <div class="dateAboutParcel__box">
            <p class="dateAboutParcel__box-title">{{ $t("form2") }}</p>
            <input
              class="dateAboutParcel__box-input"
              :placeholder="$t('formDesc2')"
              v-model="address2.city"
            />
          </div>
          <div class="dateAboutParcel__box">
            <p class="dateAboutParcel__box-title">{{ $t("form3") }}</p>
            <input
              class="dateAboutParcel__box-input"
              :placeholder="$t('formDesc3')"
              v-model="address1.street"
            />
          </div>
          <div class="dateAboutParcel__box">
            <p class="dateAboutParcel__box-title">{{ $t("form4") }}</p>
            <input
              class="dateAboutParcel__box-input"
              :placeholder="$t('formDesc4')"
              v-model="address2.street"
            />
          </div>
          <div class="dateAboutParcel__box">
            <p class="dateAboutParcel__box-title">{{ $t("form5") }}</p>
            <input
              class="dateAboutParcel__box-input"
              :placeholder="$t('formDesc5')"
              v-model="address1.postindex"
            />
          </div>
          <div class="dateAboutParcel__box">
            <p class="dateAboutParcel__box-title">{{ $t("form6") }}</p>
            <input
              class="dateAboutParcel__box-input"
              :placeholder="$t('formDesc6')"
              v-model="address2.postindex"
            />
          </div>
          <div class="dateAboutParcel__box">
            <p class="dateAboutParcel__box-title">{{ $t("form7") }}</p>
            <input
              type="date"
              class="dateAboutParcel__box-input"
              :placeholder="$t('formDesc7')"
              v-model="send_date"
            />
          </div>
        </div>

        <p class="order__content-text4" style="color: black">
          {{ $t("allDataParcel2") }}
        </p>

        <div class="dateAboutParcel dateAboutParcel2">
          <div class="dateAboutParcel__box">
            <p class="dateAboutParcel__box-title">{{ $t("form8") }}</p>
            <input
              class="dateAboutParcel__box-input"
              :placeholder="$t('formDesc8')"
              type="text"
              v-model="sender_name"
            />
          </div>
          <div class="dateAboutParcel__box">
            <p class="dateAboutParcel__box-title">{{ $t("form9") }}</p>
            <input
              class="dateAboutParcel__box-input"
              :placeholder="$t('formDesc9')"
              type="text"
              v-model="sender_phone"
            />
          </div>
          <div class="dateAboutParcel__box">
            <p class="dateAboutParcel__box-title">{{ $t("form10") }}</p>
            <input
              class="dateAboutParcel__box-input"
              :placeholder="$t('formDesc10')"
              type="text"
              v-model="recipient_name"
            />
          </div>
          <div class="dateAboutParcel__box">
            <p class="dateAboutParcel__box-title">{{ $t("form11") }}</p>
            <input
              class="dateAboutParcel__box-input"
              :placeholder="$t('formDesc9')"
              type="text"
              v-model="recipient_phone"
            />
          </div>
          <div class="dateAboutParcel__boxTextarea">
            <p class="dateAboutParcel__box-title">{{ $t("form12") }}</p>
            <textarea
              :placeholder="$t('formDesc11')"
              v-model="comments"
            ></textarea>
          </div>
        </div>

        <p class="order__content-text5">{{ $t("politic") }}.</p>
        <p class="order__content-text6">
          {{ $t("forPayment") }}: {{ amount }} ₸
        </p>
        <div class="order__content__buttons2">
          <button class="order__content__buttons2-b1">{{ $t("close") }}</button>
          <button class="order__content__buttons2-b2" @click="buyPayment">
            {{ $t("buyPayment") }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Map from "@/components/MapSelect/Map.vue";
import { mapGetters } from "vuex";

export default {
  data() {
    return {
      valueOrder: 1,
      openParcelValue: 0,
      openYourValue: 0,
      distance: "",
      prevData: false,
      mapBoolean: false,
      address1: false,
      address2: false,
      length: null,
      width: null,
      height: null,
      weight: null,
      send_date: null,
      sender_name: "",
      recipient_name: "",
      sender_phone: "",
      recipient_phone: "",
      comments: "",
    };
  },
  computed: {
    ...mapGetters(["l"]),
    amount() {
      return parseInt(this.distance.split(" ")[0].replace(",", ".")) *
            this.weight *
            1.5 > 2000
        ? parseInt(this.distance.split(" ")[0].replace(",", ".")) *
            this.weight *
            1.5
        : parseInt(this.distance.split(" ")[0].replace(",", ".")) *
            this.weight *
            1.5 > 13000
        ? 12990
        : 2990;
    },
  },
  created() {
    if (this.$route.query.order_data) {
      this.prevData = JSON.parse(this.$route.query.order_data);
      this.weight = this.prevData.weight;
      this.valueOrder = this.prevData.type;
    }
  },
  methods: {
    selectedAddress1(value) {
      if (!value.address.includes("+")) {
        var parts = value.address.split(",");
        var address = parts[0].trim();
        var cityAndPostindex = parts[1].trim().split(" ");
        var city = cityAndPostindex[0];
        var postindex = cityAndPostindex[1];
        var country = parts[2].trim();
        this.address1 = {
          street: address,
          city: city,
          postindex: postindex,
          country: country,
          coordinates: value.coordinates,
        };
      } else {
        var parts = value.address.split(" ");
        var address = parts[0].trim();
        var city = parts[1].trim();
        var postindex = null;
        var country = parts[2].trim();
        this.address1 = {
          street: address,
          city: city,
          postindex: postindex,
          country: country,
          coordinates: value.coordinates,
        };
      }
    },
    selectedAddress2(value) {
      if (!value.address.includes("+")) {
        var parts = value.address.split(",");
        var address = parts[0].trim();
        var cityAndPostindex = parts[1].trim().split(" ");
        var city = cityAndPostindex[0];
        var postindex = cityAndPostindex[1];
        var country = parts[2].trim();
        this.address2 = {
          street: address,
          city: city,
          postindex: postindex,
          country: country,
          coordinates: value.coordinates,
        };
      } else {
        var parts = value.address.split(" ");
        var address = parts[0].trim();
        var city = parts[1].trim();
        var postindex = null;
        var country = parts[2].trim();
        this.address2 = {
          street: address,
          city: city,
          postindex: postindex,
          country: country,
          coordinates: value.coordinates,
        };
      }
    },
    getDistance(value) {
      this.distance = value;
    },
    buyPayment() {
      if (this.address1 === false || this.address2 === false) {
        this.$toaster.warning("Проверьте заполненность всех полей!");
      } else {
        let allDatas = {
          type: this.valueOrder === 1 ? "Документ" : "Посылка",
          door_to_door: false,
          weight: this.weight,
          length: this.length,
          width: this.width,
          height: this.height,
          sender_city: this.address1.city,
          recipient_city: this.address2.city,
          sender_address: this.address1.street,
          recipient_address: this.address2.street,
          sender_postcode: this.address1.postindex,
          recipient_postcode: this.address2.postindex,
          send_date: this.send_date,
          sender_name: this.sender_name,
          recipient_name: this.recipient_name,
          sender_phone: this.sender_phone,
          recipient_phone: this.recipient_phone,
          price: parseInt(this.amount),
          comments: this.comments,
          map_data: JSON.stringify([
            this.address1.coordinates,
            this.address2.coordinates,
          ]),
        };
        localStorage.setItem("order", JSON.stringify(allDatas));
        this.$router.push("/payment");
      }
    },
  },
  components: { Map },
};
</script>
<style lang="scss" scoped>
.dateAboutParcel2 {
  margin-top: 24px;
}
.dateAboutParcel {
  margin-bottom: 48px;
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  row-gap: 24px;
  &__box {
    width: 48.5%;
    box-sizing: border-box;
    @media screen and (max-width: 768px) {
      width: 100%;
    }
    &-title {
      color: #979c9e;
      font-weight: 500;
      font-size: 14px;
    }
    &-input {
      margin-top: 8px;
      box-sizing: border-box;
    }
  }
  &__boxTextarea {
    width: 100%;
    textarea {
      margin-top: 8px;
      outline: none;
      resize: none;
      width: 100%;
      height: 130px;
      padding: 16px;
      box-sizing: border-box;
      background: #ffffff;
      border: 1px solid #e3e5e6;
      border-radius: 8px;
    }
  }
}
.activeValue {
  background: #23262f;
  color: white;
}

.bread {
  display: flex;
  justify-content: center;
  align-items: center;
  background: linear-gradient(
      0deg,
      rgba(47, 47, 47, 0.72),
      rgba(47, 47, 47, 0.72)
    ),
    url("@/assets/images/banner1.png");
  background-repeat: no-repeat;
  background-size: cover;
  background-position-y: 80%;
  height: 200px;
  @media screen and (max-width: 768px) {
    margin-top: 80px;
  }
  &__content {
    display: flex;
    align-items: center;
    gap: 20px;
    font-weight: 700;
    font-size: 32px;
    color: #ffffff;
    img {
      cursor: pointer;
    }
  }
}
.order {
  &__content {
    margin: 80px 0 280px 0;
    &-text1 {
      font-weight: 700;
      font-size: 24px;
    }
    &__buttons {
      margin: 24px 0 48px 0;
      display: flex;
      gap: 16px;
      button {
        cursor: pointer;
        transition: all 0.5s ease;
        width: 17.76%;
        @media screen and (max-width: 768px) {
          width: 44%;
        }
      }
    }
    &__notice {
      margin-bottom: 48px;
      width: 48.5%;
      padding: 40px;
      box-sizing: border-box;
      background: #ffe5e5;
      border: 1px solid #dee2e6;
      border-radius: 8px;
      @media screen and (max-width: 768px) {
        width: 100%;
      }
      &-title {
        margin-bottom: 8px;
        font-weight: 700;
        font-size: 18px;
      }
      &-list {
        display: flex;
        flex-direction: column;
        gap: 5px;
        font-weight: 400;
        font-size: 14px;
      }
    }
    &__inputs {
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
    }
    &__kg {
      width: 48.5%;
      margin-top: 24px;
      @media screen and (max-width: 768px) {
        width: 100%;
      }
      &-p1 {
        color: #979c9e;
        font-weight: 500;
        font-size: 14px;
      }
      &-input {
        margin-top: 8px;
        padding-left: 16px;
        background: #ffffff;
        border: 1px solid #e3e5e6;
        border-radius: 8px;
        display: flex;
        input {
          border: none;
        }
      }
    }
    &-text2 {
      font-weight: 700;
      font-size: 24px;
    }
    &-text3 {
      display: flex;
      align-items: center;
      cursor: pointer;
      margin: 48px 0;
      color: #979c9e;
      font-weight: 700;
      font-size: 24px;
      @media screen and (max-width: 992px) {
        flex-direction: column;
        align-items: flex-start;
        row-gap: 20px;
      }
    }
    &-text4 {
      cursor: pointer;
      color: #979c9e;
      font-weight: 700;
      font-size: 24px;
    }
    &-text5 {
      margin: 48px 0;
      font-weight: 400;
      font-size: 16px;
    }
    &-text6 {
      font-weight: 700;
      font-size: 24px;
    }
    &__buttons2 {
      margin-top: 48px;
      display: flex;
      gap: 16px;
      &-b1 {
        height: 48px;
        cursor: pointer;
        transition: all 0.5s ease;
        width: 17.76%;
        font-weight: 700;
        font-size: 14px;
        @media screen and (max-width: 768px) {
          width: 44%;
        }
      }
      &-b2 {
        height: 48px;
        cursor: pointer;
        transition: all 0.5s ease;
        width: 17.76%;
        background: #cb0e16;
        color: white;
        font-weight: 700;
        font-size: 14px;
        @media screen and (max-width: 768px) {
          width: 44%;
        }
      }
    }
  }
}
.selectmap {
  margin-left: 30px;
  padding: 10px 20px;
  font-size: 14px;
  &:hover {
    cursor: pointer;
    background: #23262f;
    color: white;
  }
  @media screen and (max-width: 992px) {
    margin-left: 0;
  }
}
</style>
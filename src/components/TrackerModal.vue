<template>
  <div
    class="trackerBack animated fadeIn"
    @click="$store.state.openTrackerModal = false"
  >
    <div class="tracker animated fadeInLogin" v-scroll @click.stop>
      <img
        class="tracker-close"
        src="@/assets/icons/close.png"
        @click="$store.state.openTrackerModal = false"
      />
      <p class="tracker-p1">
        {{ $t("history6") }}:{{ order.orderId.track_number }}
      </p>
      <p class="tracker-p1" v-if="!driver">
        {{ $t("price") }}: {{ order.price }} ₸
      </p>
      <p class="tracker-p1" v-if="sms">Code: {{ sms }}</p>
      <p class="tracker-line"></p>
      <p class="tracker-p2">{{ $t("status") }}</p>
      <div class="tracker__gps">
        <div class="tracker__gps-line"></div>
        <div class="tracker__gps__content">
          <div class="tracker__gps__content__box">
            <div
              class="tracker__gps__content__box-square"
              :class="{
                acitveTracker: order.status === 'Ожидает подтверждений',
              }"
            ></div>
            <p class="tracker__gps__content__box-p1">Ожидает подтверждений</p>
            <p class="tracker__gps__content__box-p2">13:00</p>
          </div>
          <div
            class="tracker__gps__content__box"
            :class="{ acitveTracker: order.status === 'Заказ подтвержден' }"
          >
            <div class="tracker__gps__content__box-square"></div>
            <p class="tracker__gps__content__box-p1">Заказ подтвержден</p>
          </div>
          <div
            class="tracker__gps__content__box"
            :class="{
              acitveTracker: order.status === 'Заказ передан водителю',
            }"
          >
            <div class="tracker__gps__content__box-square"></div>
            <p class="tracker__gps__content__box-p1">Заказ передан водителю</p>
          </div>
          <div
            class="tracker__gps__content__box"
            :class="{ acitveTracker: order.status === 'Исполнено' }"
          >
            <div class="tracker__gps__content__box-square"></div>
            <p class="tracker__gps__content__box-p1">Исполнено</p>
          </div>
        </div>
      </div>
      <p class="tracker-line"></p>
      <p class="tracker-p3">{{ $t("dataDeliveryPrim") }}: {{ updatedDate }}</p>
      <button class="slej" @click="openMap = true">
        Отслеживание на карте
      </button>
      <!-- <div class="tracker-map">
                <iframe src="https://yandex.ru/map-widget/v1/?um=constructor%3A64bb9d9607c45f4521508b4352a0f4b060e31a120d53e62111d4e692b04dd2be&amp;source=constructor" width="500" height="400" frameborder="0"></iframe>
            </div> -->
      <button
        class="tracker-button"
        v-if="
          order.status !== 'Заказ передан водителю' &&
          order.status !== 'Исполнено' &&
          !driver
        "
      >
        {{ $t("closeOrder") }}
      </button>
    </div>
  </div>
  <ModalComponent :isOpen="openMap" @click="openMap = false">
    <div class="openmap">
      <h3>Отслеживание на карте</h3>
      <MapDetail
        v-if="order.driverId.geoloc != false"
        :coord="JSON.parse(order.orderId.map_data)"
        :false_id="order.status === 'Заказ передан водителю'"
        :geoloc="JSON.parse(order.driverId.geoloc)"
        :driver_id="order.driverId.id"
      />
    </div>
  </ModalComponent>
</template>
<script>
import MapDetail from "@/components/MapSelect/MapDetail.vue";
import ModalComponent from "./ModalComponent.vue";

export default {
  props: ["order", "sms", "driver"],
  components: { ModalComponent, MapDetail },
  data: () => ({
    openMap: false,
  }),
  computed: {
    updatedDate() {
      let originalDate = new Date(this.order.updatedAt);

      // Добавление 3 дней
      let modifiedDate = new Date(
        originalDate.getTime() + 3 * 24 * 60 * 60 * 1000
      );

      // Форматирование в строку "YYYY-MM-DD"
      let formattedDate = modifiedDate.toISOString().split("T")[0];

      return formattedDate; // Выводит "2023-05-29"
    },
  },
};
</script>
<style lang="scss" scoped>
.animated {
  animation-duration: 1s;
  animation-fill-mode: both;
}

.openmap {
  padding: 20px 30px;
  background: white;
  border-radius: 20px;
  height: 80vh;
  width: 80vw;
}
.fadeIn {
  animation-name: fadeIn;
}
.fadeInLogin {
  animation-name: fadeInLogin;
}
@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
@keyframes fadeInLogin {
  from {
    opacity: 0;
    right: -20%;
  }
  to {
    opacity: 1;
    right: 0%;
  }
}

.slej {
  margin: 0 auto;
  width: 100%;
  border: 1px solid #cb0e16;
  background: white;
  color: #252525;
  &:hover {
    cursor: pointer;
    color: white;
    background: #cb0e16;
  }
}
.acitveTracker {
  .tracker__gps__content__box-square {
    border: 6px solid #f6f6f6bb !important;
    background: #2a61f7f4 !important;
  }
  .tracker__gps__content__box-p1 {
    color: black !important;
    font-weight: 500 !important;
  }
}
.trackerBack {
  color: black;
  position: fixed;
  z-index: 999;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: end;
  align-items: center;
}

.tracker {
  overflow-y: auto;
  position: relative;
  width: 352px;
  height: 100%;
  padding: 48px 32px 24px 32px;
  background: #ffffff;
  box-sizing: border-box;
  border: 1px solid #f8f8f8;
  box-shadow: -64px 0px 64px -48px rgba(15, 15, 15, 0.08);
  &-close {
    cursor: pointer;
    position: absolute;
    top: 2%;
    right: 4%;
  }
  &__gps {
    margin-bottom: 36px;
    display: flex;
    &-line {
      width: 1px;
      margin: 15px 0;
      position: relative;
      border-right: 1px dashed blue;
      left: 4%;
      z-index: 1;
    }
    &__content {
      display: flex;
      flex-direction: column;
      gap: 32px;
      &__box {
        display: flex;
        gap: 16px;
        align-items: center;
        &-square {
          z-index: 21;
          width: 12px;
          height: 12px;
          border-radius: 50%;
          border: 6px solid #f6f6f6c4;
          background: #fffffff4;
        }
        &-p1 {
          color: #777e90;
          font-weight: 400;
          font-size: 12px;
        }
        &-p2 {
          color: #777e90;
          font-weight: 500;
          font-size: 12px;
        }
      }
    }
  }
  &-p1 {
    font-weight: 700;
    font-size: 18px;
    margin-bottom: 32px;
  }
  &-line {
    width: 100%;
    height: 1px;
    background: #e6e8ec;
  }
  &-p2 {
    margin: 32px 0;
    font-weight: 700;
    font-size: 18px;
  }
  &-p3 {
    margin: 32px 0 16px 0;
    font-weight: 400;
    font-size: 12px;
    color: #72777a;
    text-align: center;
  }
  &-map {
    height: 180px;
    iframe {
      width: 100%;
      height: 100%;
      border-radius: 8px;
    }
  }
  &-button {
    font-weight: 700;
    font-size: 14px;
    padding: 0 24px;
    height: 46px;
    margin-right: auto;
    margin-left: auto;
    margin-top: 32px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
}
</style>
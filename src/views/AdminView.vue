<template>
  <div class="fixx">
  <TrackerModal v-if="$store.state.openTrackerModal == true && currentOrder" :order="currentOrder" :sms="false" :driver="true" />
  <div class="profile container">
    <div class="profile__left">
      <div class="profile__left__box" @click="$router.push('/admin/data')">
        <img src="@/assets/icons/profileIcon.svg" />
        <p>{{ $t("profile") }}</p>
      </div>
      <div class="profile__left__box" @click="$router.push('/admin/tracker')">
        <img src="@/assets/icons/history.svg" />
        <p>{{ $t("leaveRess") }}</p>
      </div>
      <div class="profile__left__box" @click="leaveAccount">
        <img src="@/assets/icons/leave.svg" />
        <p style="color: red">{{ $t("leave") }}</p>
      </div>
    </div>
    <div class="profile__right">
      <div class="date" v-if="$route.path == '/admin/data'">
        <p class="date-title">{{ $t("profileInfo") }}</p>
        <div class="date__inputs" v-if="getUser">
          <div class="date__inputs__box">
            <p class="date__inputs__box-title">{{ $t("fio") }}</p>
            <input
              type="text"
              :placeholder="getUser.fio"
              v-model="getUser.fio"
            />
          </div>
          <div class="date__inputs__box">
            <p class="date__inputs__box-title">E-mail</p>
            <input
              type="email"
              disabled
              :placeholder="getUser.email"
              v-model="getUser.email"
            />
          </div>
          <div class="date__inputs__box">
            <p class="date__inputs__box-title">{{ $t("phone") }}</p>
            <input
              type="text"
              :placeholder="getUser.phone"
              v-model="getUser.phone"
            />
          </div>
          <div class="date__inputs__box">
            <p class="date__inputs__box-title">{{ $t("password") }}</p>
            <input
              type="password"
              placeholder="*********"
            />
          </div>
        </div>
        <div class="date-line"></div>
      </div>

      <div class="history" v-if="$route.path == '/admin/tracker'">
        <p class="date-title">{{ $t("leaveRess") }}</p>
        <div class="history__top">            
            <div class="history-search">
                <button @click="reload">Обновить данные</button>
            </div>
        </div>
        <!-- <div class="history__filters">
          <button>Новые (3)</button>
          <button>В процессе (10)</button>
          <button>Ожидает оплату (10)</button>
          <button>Готовы к доставке (20)</button>
          <button>В пути (20)</button>
          <button>Доставлено (20)</button>
        </div> -->
        <table class="table">
          <tr class="table__tr">
            <th class="table__tr__th">
              <p>{{ $t("history1") }}</p>
              <!-- <div class="table__tr__th__select">
                <img
                  src="@/assets/icons/selectLittle.svg"
                  style="rotate: 180deg"
                />
                <img src="@/assets/icons/selectLittle.svg" />
              </div> -->
            </th>
            <th class="table__tr__th">
              <p>{{ $t("history2") }}</p>
              <!-- <div class="table__tr__th__select">
                <img
                  src="@/assets/icons/selectLittle.svg"
                  style="rotate: 180deg"
                />
                <img src="@/assets/icons/selectLittle.svg" />
              </div> -->
            </th>
            <th class="table__tr__th">
              <p>{{ $t("history3") }}</p>
              <!-- <div class="table__tr__th__select">
                <img
                  src="@/assets/icons/selectLittle.svg"
                  style="rotate: 180deg"
                />
                <img src="@/assets/icons/selectLittle.svg" />
              </div> -->
            </th>
            <th class="table__tr__th">
              <p>{{ $t("history4") }}</p>
              <!-- <div class="table__tr__th__select">
                <img
                  src="@/assets/icons/selectLittle.svg"
                  style="rotate: 180deg"
                />
                <img src="@/assets/icons/selectLittle.svg" />
              </div> -->
            </th>
            <th class="table__tr__th">
              <p>{{ $t("history5") }}</p>
              <!-- <div class="table__tr__th__select">
                <img
                  src="@/assets/icons/selectLittle.svg"
                  style="rotate: 180deg"
                />
                <img src="@/assets/icons/selectLittle.svg" />
              </div> -->
            </th>
            <th class="table__tr__th">
              <p>{{ $t("history6") }}</p>
              <!-- <div class="table__tr__th__select">
                <img
                  src="@/assets/icons/selectLittle.svg"
                  style="rotate: 180deg"
                />
                <img src="@/assets/icons/selectLittle.svg" />
              </div> -->
            </th>
            <th class="table__tr__th">
              <p @click="checkOrder">Действие</p>
              <!-- <div class="table__tr__th__select">
                <img
                  src="@/assets/icons/selectLittle.svg"
                  style="rotate: 180deg"
                />
                <img src="@/assets/icons/selectLittle.svg" />
              </div> -->
            </th>
          </tr>
          <tr class="table__content" v-for="(item, index) in filterOrders" :key="item">
            <td>{{ item.id }}</td>

            <td class="table__content__status">
              <div class="table__content__status__box">
                <div
                  class="table__content__status__box-in"
                  :class="getClassForStatus(item.status)"
                ></div>
              </div>
              <p>{{ item.status}}</p>
            </td>

            <td>{{ item.orderId.sender_city + ', ' + item.orderId.sender_address}}</td>

            <td>{{ item.orderId.recipient_city + ', ' + item.orderId.recipient_address}}</td>

            <td>{{ item.createdAt.slice(0, 10) }}</td>

            <td
              @click="currentOrder = item,$store.state.openTrackerModal = true"
              style="cursor: pointer"
            >
              {{ item.orderId.track_number }}
            </td>
            <td style="display: flex;
            flex-direction: column; align-items: stretch; gap: 5px;">
              <button class="sacsa" @click="sendGeo(item.id)" style="padding: 10px 20px; width: 80%;" v-if="item.status === 'Заказ подтвержден'">Принять</button>
              <input class="sacs1a" type="text" v-model="codesms[index]" placeholder="Введите код" v-if="item.status === 'Заказ передан водителю'" />
              <button class="sacsa" @click="sendCheck(item.id, item.orderId.code_sms, index)" style="padding: 10px 20px; width: 80%;" v-if="item.status === 'Заказ передан водителю'">Выполнить</button>
            </td>
          </tr>
        </table>
      </div>
    </div>
  </div>
</div>
</template>
<script>
import AOS from "aos";
import "aos/dist/aos.css";

import TrackerModal from "@/components/TrackerModal.vue";
import orders from "@/data/orders.json";
import { mapActions, mapGetters } from "vuex";
export default {
  data() {
    return {
        orders: orders.orders,
      currentOrder: false,
      isGeo: false,
      userLocation: false,
      account: false,
      intervalId: false,
      codesms: [],
        getOrders: false,
        payment_status: '',
        status: '',
        slist: ['Ожидает оплаты', 'Оплачено', 'Отменено'],
        plist: ['Ожидает подтверждений', 'Заказ подтвержден', 'Заказ отправлен', 'В пункте распределения', 'Заказ прибыл в место назначение', 'Доставлено'],
      
    };
  },
  computed: {
      ...mapGetters(["getUser"]),
      filterOrders() {
        if (this.status !== '' && this.payment_status !== '') {
            return this.getOrders.filter(item => item.status === this.status && item.payment_status === this.payment_status)            
        } else if (this.status === '' && this.payment_status === '') {
            return this.getOrders
        } else if (this.status !== '') {
            return this.getOrders.filter(item => item.status === this.status)  
        } else if (this.payment_status !== '') {
            return this.getOrders.filter(item => item.payment_status === this.payment_status)  
        }
    }
  },
  methods: {
    ...mapActions(["logoutUser", "requestUser"]),
    leaveAccount() {
      this.logoutUser();
      this.$toaster.error("Вы вышли с аккаунта.");
      this.$router.push("/");
    },
    reload() {
      location.reload()
    },
    sendCheck(idd, sms, index) {
      if(sms === this.codesms[index]) {
        this.$axios
          .post("auth-driver/updateOrder", {
            id: idd,
            status: 'Исполнено'
          })
          .then((res) => {
            this.isGeo = true;
            this.requestUser()
            this.$toaster.success('Заказ успешно передан')
          })
          .catch((err) => {
            console.log(err);
          });
      } else {
        this.$toaster.warning('Неправильный код')
      }
        
    },
    async sendGeo(value) {
      this.$axios
        .post("auth-driver/updateOrder", {
          id: value,
          status: 'Заказ передан водителю'
        })
        .then((res) => {
          this.isGeo = true;
          this.requestUser()
        })
        .catch((err) => {
          console.log(err);
        }); 
    },
    updateLocation() {      
      navigator.geolocation.getCurrentPosition((position) => {
        const { latitude, longitude } = position.coords;
        this.userLocation = { lat: latitude, lng: longitude };
      });
      this.intervalId = setInterval(() => {
        this.$axios
          .post("auth-driver/updateloc", {
            geoloc: JSON.stringify(this.userLocation),
            user_id: this.getUser.id
          })
          .then((res) => {
            this.isGeo = true;
          })
          .catch((err) => {
            console.log(err);
          });
      }, 10000)
    },
    getClassForStatus(status) {
        switch (status) {
        case 'Ожидает подтверждений':
          return "yellow";
        case 'Заказ подтвержден':
          return "orange";
        case 'Заказ отправлен':
          return "blue";
        case 'В пункте распределения':
          return "red";
        case 'Заказ прибыл в место назначение':
          return "purple";
        case 'Доставлено':
          return "green";
      }
    },
  },
  async mounted() {
    AOS.init();
  },
  components: { TrackerModal },
  watch: {
    async getUser() {
      if (this.getUser !== {}) {
        await this.$axios
        .post("orders/drivers", {
          drid: this.getUser.id
        })
        .then((res) => {
          this.getOrders = res.data.data;
        })
        .catch((err) => {
          console.log(err);
        });
        this.getOrders.forEach(item => {
          this.codesms.push("")
        })
        
        if (this.getOrders.some(res => res.status === 'Заказ передан водителю')) {
          this.updateLocation()
        } else {
          clearInterval(this.intervalId)
        }
        console.log('getUser');
      }
    }
  }
};
</script>
<style lang="scss" scoped>
.fixx {  
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;overflow-y: auto;
  height: 100vh;
  background: white;
}
.table {
  margin-top: 48px;
  width: 100%;
  display: flex;
  flex-direction: column;
  @media screen and (max-width: 768px) {
    width: max-content;
    overflow-x: auto;
  }
  &__tr {
    padding-bottom: 10px;
    border-bottom: 2px solid #e8eaf2;
    display: flex;
    justify-content: space-between;
    &__th {
      display: flex;
      gap: 8px;
      font-weight: 500;
      font-size: 12px;
      color: #72777a;
      align-items: center;
      &__select {
        width: fit-content !important;
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 3px;
        img {
          width: auto !important;
        }
      }
      p {
        width: fit-content !important;
      }
    }
    :nth-child(1) {
      width: 5%;
    }
    :nth-child(2) {
      width: 15%;
    }
    :nth-child(3) {
      width: 12%;
    }
    :nth-child(4) {
      width: 17%;
    }
    :nth-child(5) {
      width: 17%;
    }
    :nth-child(6) {
      width: 10%;
    }
    :nth-child(7) {
      width: 20%;
    }
  }
  &__content {
    margin-top: 16px;
    font-weight: 500;
    font-size: 12px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 8px 0;
    border-bottom: 1px solid #e8eaf2;
    &__status {
      display: flex;
      align-items: center;
      gap: 8px;
      &__box {
        height: 24px;
        width: 24px !important;
        background: #f0f4fd;
        border-radius: 8px;
        display: flex;
        justify-content: center;
        align-items: center;
        &-in {
          width: 50% !important;
          height: 50%;
          border-radius: 50%;
          background: #2a60f7;
        }
      }
      p {
        width: fit-content !important;
      }
    }
    :nth-child(1) {
      width: 5%;
    }
    :nth-child(2) {
      width: 15%;
    }
    :nth-child(3) {
      width: 12%;
    }
    :nth-child(4) {
      width: 17%;
    }
    :nth-child(5) {
      width: 17%;
    }
    :nth-child(6) {
      width: 10%;
    }
    :nth-child(7) {
      width: 20%;
    }
  }
}
.history {
    &__top {
        display: flex;
        width: 100%;
        justify-content: space-between;
        align-items: stretch;
        &-filters {
            display: flex;
            align-items: center;
            gap: 20px;
            select {
                
            height: 100%;
            padding: 0 10px;
            }
        }
        @media screen and (max-width: 992px) {
            flex-direction: column;
                    width: 100%;
                    row-gap: 20px;
            &-filters {
                flex-direction: column;
                align-items: flex-start;
                select {
                    padding: 20px;
                    width:80vw;
                } 
            }
        }
    }
  &-search {
    height: 40px;
    width: 28.23%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    background: #ffffff;
    border-radius: 8px;
    @media screen and (max-width: 768px) {
      width: 80%;
    }
    input {
      height: auto;
      border: none;
    }
    img {
      height: 32px;
      width: 32px;
      margin-right: 4px;
    }
    button {
      padding: 5px 15px;
      &:hover {
        cursor: pointer;
        background: green;
        color: white;
      }
    }
  }
  &__filters {
    margin-top: 24px;
    display: flex;
    gap: 16px;
    @media screen and (max-width: 768px) {
      overflow-x: auto;
      &::-webkit-scrollbar {
        width: 0;
        height: 0;
      }
    }
    button {
      cursor: pointer;
      padding: 0 16px;
      font-weight: 600;
      font-size: 14px;
      transition: all 0.5s ease;
      &:hover {
        background: #fff0f1;
        border: 2px solid transparent;
        color: #cb0e16;
      }
      @media screen and (max-width: 768px) {
        width: max-content;
        min-width: max-content;
      }
    }
  }
}
.profile {
  background: white;
  margin-top: 32px;
  margin-bottom: 270px;
  margin-right: auto;
  margin-left: auto;
  display: flex;
  justify-content: space-between;
  @media screen and (max-width: 768px) {
    flex-direction: column;
    margin-top: 96px;
  }
  &__left {
    height: fit-content;
    box-shadow: 10px 10px 80px rgba(63, 39, 102, 0.1);
    border-radius: 24px;
    padding: 48px 24px;
    box-sizing: border-box;
    width: 16.41%;
    display: flex;
    flex-direction: column;
    gap: 40px;
    @media screen and (max-width: 768px) {
      width: 100%;
    }
    &__box {
      cursor: pointer;
      display: flex;
      align-items: center;
      gap: 19px;
      font-weight: 600;
      font-size: 14px;
      img {
        width: 20px;
      }
    }
  }
  &__right {
    width: 76.5%;
    box-shadow: 10px 10px 80px rgba(63, 39, 102, 0.1);
    border-radius: 24px;
    padding: 48px 24px;
    @media screen and (max-width: 768px) {
      width: 100%;
    }
  }
}
.date {
  &-line {
    background: #e6e8ec;
    height: 1px;
    width: 100%;
    margin: 32px 0;
  }
  &-title {
    margin-bottom: 40px;
    font-weight: 700;
    font-size: 24px;
  }
  &-button {
    background: #cb0e16;
    color: white;
    height: 48px;
    padding: 0 24px;
    font-weight: 700;
    font-size: 16px;
  }
  &__inputs {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    row-gap: 32px;
    &__box {
      &-title {
        margin-bottom: 12px;
        color: #979c9e;
        font-weight: 500;
        font-size: 14px;
      }
      width: 48%;
      @media screen and (max-width: 768px) {
        width: 90%;
      }
      input {
        box-sizing: border-box;
      }
    }
  }
}
.sacsa {
  &:hover {
    cursor: pointer;
    background: green;
    color: white;
  }
}
.sacs1a {
  width: 60% !important;
  height: 30px !important;
}
</style>
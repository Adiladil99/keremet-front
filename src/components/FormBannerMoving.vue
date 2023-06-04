<template>
    <div class="formBanner">
        Своя машина:
        <div class="formBanner__buttons">
            <input style="width: 24px; height: 24px;" type="checkbox" v-model="car_bool" />
        </div>
        <p v-if="!car_bool">Тип машины:</p>
        <div class="formBanner__buttons" v-if="!car_bool">
            <button class="formBanner__buttons-b1" @click="typeform = 1" :class="{activeValue: typeform == 1}">Фура</button>
            <button class="formBanner__buttons-b1" @click="typeform = 2" :class="{activeValue: typeform == 2}">Грузовик</button>
            <button class="formBanner__buttons-b1" @click="typeform = 3" :class="{activeValue: typeform == 3}">Минивэн</button>
        </div>
        Способ оплаты:
        <div class="formBanner__buttons">
            <button class="formBanner__buttons-b1" @click="valueForm = 1" :class="{activeValue: valueForm == 1}">После работы</button>
            <button class="formBanner__buttons-b1" @click="valueForm = 2" :class="{activeValue: valueForm == 2}">С банковской картой</button>
        </div>
        Количество работников:
        <div class="formBanner__buttons">
            <input type="number" v-model="count_employee" />
        </div>
        Адрес:
        <div class="formBanner__buttons">
            <input type="text" v-model="address" />
        </div>
        Время начало:
        <div class="formBanner__buttons">
            <input type="date" v-model="date_start" />
        </div>
        Длительность:
        <div class="formBanner__buttons">
            <input type="number" v-model="hours" />
        </div>
        Тотал: {{ total }}
        <button class="formBanner__send" @click="sendOrder">{{ $t('offirming') }}</button>
    </div>
</template>
<script>
export default {
    data() {
        return {
            typeform: 1,
            valueForm: 1,
            car_bool: false,
            count_employee: 1,
            address: "",
            hours: 2,
            date_start: null,
            city1: '',
            city2: '',
            totalPrice: null,
            weight: null,
            cities: ["Алматы", "Астана", "Шымкент", "Актобе", "Тараз", "Семей"]
        }
    },
    computed: {
        total() {
            let car = this.car_bool ? 0 : 5000
            return (this.count_employee * this.hours * 2500) + car
        }
    },
    methods: {
        sendOrder() {
           this.$axios.post("moving", {
            type: this.typeform === 1 ? 'Фура' : this.typeform === 2 ? 'Грузовик' : this.typeform === 3 ? 'Минивэн' : 'Нет',
            type_payment: this.valueForm === 1 ? 'После работы' : 'С банковской картой',
            car_bool: this.car_bool,
            count_employee: this.count_employee,
            total: this.total,
            address: this.address,
            date_start: this.date_start,
            hours: this.hours
           },{
          headers: {
              Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
      })
           .then(res => {
            this.$toaster.success('Ваша заявка успешно отправлено')
           })
           .catch(err => {
            this.$toaster.warning('Повторите попытку')
           })
        }
    },
    inject: ['address1'],
}
</script>
<style lang="scss" scoped>

.formBanner {
    padding: 40px;
    box-sizing: border-box;
    width: 502px;
    background: #FFFFFF;
    border: 1px solid #FCFCFD;
    box-shadow: 0px 40px 64px -32px rgba(15, 15, 15, 0.1);
    backdrop-filter: blur(16px);
    border-radius: 24px;
    display: flex;
    flex-direction: column;
    @media screen and (max-width: 768px) {
        width: 95%;
    }
    &__buttons {
        margin-bottom: 13px;
        margin-top: 6px;
        display: flex;
        gap: 16px;
        &-b1 {
            cursor: pointer;
            border: 2px solid #E6E8EC;
            background: transparent;
            border-radius: 90px;
            height: 40px;
            box-sizing: border-box;
            font-weight: 700;
            font-size: 12px;
            padding: 0 10px;
            transition: all 0.5s ease; 
            @media screen and (max-width: 768px) {
                padding: 0 38px;
            }
        }
    }
    &__after {
        margin-bottom: 34px;
        display: flex;
        flex-direction: column;
        gap: 12px;
        &-city {
            display: flex;
            align-items: center;
            gap: 15px;
            font-weight: 700;
            font-size: 18px;
            img {
                width: 20px;
            }
            &-gps {
                cursor: pointer;
                height: 23px;
                width: 23px;
               border: 1px solid white;
               border-radius: 50%;
               display: flex;
               justify-content: center;
               align-items: center;
               box-shadow: 0px 0px 6px -2px rgba(34, 60, 80, 0.2);
               animation: gpsFrame 2s infinite;
               transition: all 0.5s ease;
               &:hover {
                box-shadow: 0px 0px 3px 3px rgba(255, 0, 0, 0.2);
               }
            }
            @keyframes gpsFrame {
                0% {}
                50% {box-shadow: 0px 0px 6px 3px rgba(255, 0, 0, 0.2);}
                100% {}
            }
        }
        &-line {
            height: 1px;
            background: #F2F4F5;
            width: 100%;
        }
        &-cities {
            text-decoration: underline;
            color: #979C9E;
            display: flex;
            gap: 8px;
            font-weight: 500;
            font-size: 14px;
        }
        &__parametrs {
            font-weight: 700;
            font-size: 16px;
            margin-top: 16px;
            display: flex;
            justify-content: space-between;
            &-line {
                width: 1px;
                opacity: 0.5;
                background: #979C9E;
            }
        }
    }
    &__date {
        display: flex;
        justify-content: space-between;
        &__between {
            display: flex;
            flex-direction: column;
            gap: 8px;
            &-p1 {
                font-weight: 500;
                font-size: 16px;
                color: #979C9E;
            }
            &-p2 {
                color: #23262F;
                font-weight: 700;
                font-size: 16px;
            }
        }
    }
    &__send {
        cursor: pointer;
        margin-top: 32px;
        margin-right: auto;
        margin-left: auto;
        width: 76.93%;
        height: 56px;
        background: #CB0E16;
        color: white;
        border: none;
        outline: none;
        border-radius: 90px;
        font-weight: 700;
        font-size: 16px;
    }
}

.activeValue {
    background: #23262F;
    color: white;
}
</style>
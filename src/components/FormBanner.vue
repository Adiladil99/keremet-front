<template>
    <div class="formBanner">
        <div class="formBanner__buttons">
            <button class="formBanner__buttons-b1" @click="valueForm = 1" :class="{activeValue: valueForm == 1}">{{ $t('document') }}</button>
            <button class="formBanner__buttons-b1" @click="valueForm = 2" :class="{activeValue: valueForm == 2}">{{ $t('parcel') }}</button>
        </div>
        <div class="formBanner__after">
            <div class="formBanner__after-city">
                <img src="@/assets/icons/gps.svg"/>
                <p>Выберите место отправки</p>
                <div class="formBanner__after-city-gps" @click="$store.state.openGpsModal = true">
                    <img src="@/assets/icons/gpsMapper.png"/>
                </div>
            </div>
            <div class="formBanner__after-line"></div>
            <div class="formBanner__after-cities">
                <p>Алматы</p>
                <p>Нур-Султан(Астана)</p>
                <p>Шымкент</p>
            </div>
        </div>
        <div class="formBanner__after">
            <div class="formBanner__after-city">
                <img src="@/assets/icons/gpsFrom.svg"/>
                <p>Выберите место получения</p>
                <div class="formBanner__after-city-gps">
                    <img src="@/assets/icons/gpsMapper.png"/>
                </div>
            </div>
            <div class="formBanner__after-line"></div>
            <div class="formBanner__after-cities">
                <p>Алматы</p>
                <p>Нур-Султан(Астана)</p>
                <p>Шымкент</p>
            </div>
        </div>

        <div class="formBanner__after">
            <div class="formBanner__after-city">
                <img src="@/assets/icons/weight.svg"/>
                <p>2 <span style="opacity: 0.6; font-size: 14px;">({{ $t('weight') }})</span></p>
            </div>
            <div class="formBanner__after-line"></div>
            <div class="formBanner__after__parametrs" v-if="valueForm == 2">
                <div style="display: flex; gap: 17px;">
                    <img src="@/assets/icons/height.svg"/>
                    <p>Высота <span style="opacity: 0.6; font-size: 14px;">(см)</span></p>
                </div>
                <div class="formBanner__after__parametrs-line"></div>
                <p>Длина <span style="opacity: 0.6; font-size: 14px;">(см)</span></p>
                <div class="formBanner__after__parametrs-line"></div>
                <p>Ширина <span style="opacity: 0.6; font-size: 14px;">(см)</span></p>
            </div>
            <div class="formBanner__after-line" v-if="valueForm == 2"></div>
        </div>

        <div class="formBanner__date">
            <div class="formBanner__date__between">
                <p class="formBanner__date__between-p1">{{ $t('priceDelivery') }}</p>
                <p class="formBanner__date__between-p2">2500 Тенге</p>
            </div>
            <div class="formBanner__date__between">
                <p class="formBanner__date__between-p1">{{ $t('dateDelivery') }}</p>
                <p class="formBanner__date__between-p2">31.12.2021</p>
            </div>
        </div>

        <button class="formBanner__send" @click="sendOrder">{{ $t('offirming') }}</button>
    </div>
</template>
<script>
export default {
    data() {
        return {
            valueForm: 1,
        }
    },
    methods: {
        sendOrder() {
           this.$router.push({ name: 'OrderView', query: { order_data: JSON.stringify({lon: 4, lang: 5}) }});
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
        margin-bottom: 53px;
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
            padding: 0 74px;
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
                font-size: 24px;
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
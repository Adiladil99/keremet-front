<template>

    <PaySendedModal v-if="$store.state.openSendedModal == true"/>
    
    <div class="bread">
        <div  class="bread__content container">
            <img src="@/assets/icons/back.svg" @click="$router.back"/>
            <p>{{ $t('payment') }}</p>
        </div>
    </div>
    <div class="payment container">
        <div class="payment-back" @click="$router.back">
            <img src="@/assets/icons/back.svg" />
            <p>{{ $t('back') }}</p>
        </div>
        <div class="payment__contentBack">
            <p class="payment-title">{{ $t('wayPayment') }}</p>
            <div class="payment__banks">
                <div class="payment__banks__box"  @click="sendOrder('С банковской картой')">
                    <img src="@/assets/icons/bank1.png"/>
                    <div class="payment__banks__box__text" >
                        <p class="payment__banks__box__text-p1">{{ $t('payCard') }}</p>
                        <p class="payment__banks__box__text-p2">С банковской картой</p>
                    </div>
                </div>
                <div class="payment__banks__box" @click="sendOrder('При отправке')">
                    <img src="@/assets/icons/bank2.png"/>
                    <div class="payment__banks__box__text">
                        <p class="payment__banks__box__text-p1">При отправке</p>
                    </div>
                </div>
                <div class="payment__banks__box" @click="sendOrder('При получений')">
                    <img src="@/assets/icons/bank3.png"/>
                    <div class="payment__banks__box__text">
                        <p class="payment__banks__box__text-p1">При получений</p>
                    </div>
                </div>
            </div>
            <p class="payment-sum">{{ $t('forPayment') }}: 2500</p>
            <button class="payment-button">{{ $t('close') }}</button>
        </div>
    </div>
</template>
<script>
import PaySendedModal from '@/components/PaySendedModal.vue';

export default {
    components: { PaySendedModal },
    methods: {
        sendOrder(value) {
            let order_data = JSON.parse(localStorage.getItem("order"))
            order_data.type_payment = value
            this.$axios.post("orders", order_data, {
          headers: {
              Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
      })
                .then(res => {
                    this.$store.state.openSendedModal = true
                    console.log(res);
                })
                .catch(err => {
                    console.log(err);
                })
            console.log(order_data);
        }
    }
}
</script>
<style lang="scss" scoped>
.bread {
    display: flex;
    justify-content: center;
    align-items: center;
    background: linear-gradient(0deg, rgba(47, 47, 47, 0.72), rgba(47, 47, 47, 0.72)), url('@/assets/images/banner1.png');
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
        color: #FFFFFF;
        img {
        cursor: pointer;
        }
    }
}
.payment {
    padding: 60px 0 120px 0;
    &-back {
        cursor: pointer;
        margin-bottom: 48px;
        height: 40px;
        display: flex;
        align-items: center;
        gap: 16px;
        font-weight: 700;
        font-size: 14px;
        border: 2px solid #E6E8EC;
        border-radius: 90px;
        width: fit-content;
        padding: 0 16px;
        img {
            filter: brightness(0) saturate(100%);
            width: 6%;
        }
    }
    &-title {
        font-weight: 700;
        font-size: 24px;
    }
    &__banks {
        margin: 48px 0;
        display: flex;
        flex-direction: column;
        gap: 16px;
        width: 100%;
        &__box {
            padding: 0 32px;
            border: 1px solid #E6E8EC;
            border-radius: 24px;
            height: 80px;
            display: flex;
            align-items: center;
            gap: 16px;
            &__text {
                display: flex;
                flex-direction: column;
                gap: 4px;
                &-p1 {    
                    font-weight: 500;
                    font-size: 16px;
                }
                &-p2 {
                    font-weight: 400;
                    font-size: 12px;
                }
            }
        }
    }
    &-sum {
        font-weight: 700;
        font-size: 24px;
    }
    &-button {
        margin-top: 64px;
        margin-right: auto;
        margin-left: auto;
        height: 48px;
        width: 55%;
        font-weight: 700;
        font-size: 14px;
    }
    &__contentBack {
        width: 31.72%;
        margin: auto;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        @media screen and (max-width: 768px) {
            width: 100%;
        }
}
}
</style>
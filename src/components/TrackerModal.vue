<template>
    <div class="trackerBack animated fadeIn" @click="$store.state.openTrackerModal = false">
        <div class="tracker animated fadeInLogin" v-scroll @click.stop>
            <img  class="tracker-close" src="@/assets/icons/close.png"  @click="$store.state.openTrackerModal = false"/>
            <p class="tracker-p1">{{ $t('numberOrder') }}:NHJ78652365</p>
            <p class="tracker-line"></p>
            <p class="tracker-p2">{{ $t('status') }}</p>
            <div class="tracker__gps">
                <div class="tracker__gps-line"></div>
                <div class="tracker__gps__content">
                    <div class="tracker__gps__content__box" :class="{acitveTracker: true}">
                        <div class="tracker__gps__content__box-square"></div>
                        <p class="tracker__gps__content__box-p1">Заказ подтвержден</p>
                        <p class="tracker__gps__content__box-p2">13:00</p>
                    </div>
                    <div class="tracker__gps__content__box">
                        <div class="tracker__gps__content__box-square"></div>
                        <p class="tracker__gps__content__box-p1">Заказ отправлен</p>
                    </div>
                    <div class="tracker__gps__content__box">
                        <div class="tracker__gps__content__box-square"></div>
                        <p class="tracker__gps__content__box-p1">В пункте распределения</p>
                    </div>
                    <div class="tracker__gps__content__box">
                        <div class="tracker__gps__content__box-square"></div>
                        <p class="tracker__gps__content__box-p1">Заказ прибыл в место назначение</p>
                    </div>
                </div>
            </div>
            <p class="tracker-line"></p>
            <p class="tracker-p3">{{ $t('dataDeliveryPrim') }}: 31:12:2021</p>
            <div class="tracker-map">
                <iframe src="https://yandex.ru/map-widget/v1/?um=constructor%3A64bb9d9607c45f4521508b4352a0f4b060e31a120d53e62111d4e692b04dd2be&amp;source=constructor" width="500" height="400" frameborder="0"></iframe>
            </div>
            <button class="tracker-button">{{ $t('closeOrder') }}</button>
        </div>
    </div>
</template>
<script>
export default {
    
}
</script>
<style lang="scss" scoped>
.animated {
  animation-duration: 1s;
  animation-fill-mode: both;
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
    background: #FFFFFF;
    box-sizing: border-box;
    border: 1px solid #F8F8F8;
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
                    color: #777E90;
                    font-weight: 400;
                    font-size: 12px;
                }
                &-p2 {
                    color: #777E90;
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
        background: #E6E8EC;
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
        color: #72777A;
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
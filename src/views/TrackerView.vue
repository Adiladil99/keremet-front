<template>
    <div class="bread">
        <div  class="bread__content container">
            <img src="@/assets/icons/back.svg" @click="$router.back"/>
            <p>{{ $t('tracker') }}</p>
        </div>
    </div>
    <div class="container">
        <div class="tracker">
            <div class="tracker-search">
                <input placeholder="NHJ78652365"/>
                <img src="@/assets/icons/search.svg"/>
            </div>
            <p class="tracker-text1">{{$t('parcel')}} № NHJ78652365</p>
            <div class="tracker__info">
                <div class="tracker__info__left">
                    <p class="tracker__info__left-p1">{{ $t('dataParcelInfo') }}</p>
                    <div class="tracker__info__left__wrap">
                        <div class="tracker__info__left__wrap__box">
                            <p class="tracker__info__left__wrap__box-p1">Номер заказа</p>
                            <p class="tracker__info__left__wrap__box-p2">1231313</p>
                        </div>
                        <div class="tracker__info__left__wrap__box">
                            <p class="tracker__info__left__wrap__box-p1">Адрес доставки</p>
                            <p class="tracker__info__left__wrap__box-p2">
                                Казахстан, г. Кызылорда, 
                                Абая 21
                            </p>
                        </div>
                        <div class="tracker__info__left__wrap__box">
                            <p class="tracker__info__left__wrap__box-p1">Дата отправки</p>
                            <p class="tracker__info__left__wrap__box-p2">18.11.2021</p>
                        </div>
                        <div class="tracker__info__left__wrap__box">
                            <p class="tracker__info__left__wrap__box-p1">Тип доставки</p>
                            <p class="tracker__info__left__wrap__box-p2">От двери до двери</p>
                        </div>
                    </div>
                </div>
                <div class="tracker__info__right">
                    <p class="tracker__info__left-p1">{{ $t('status') }}</p>
                    <div class="tracker__info__right__radio">
                        <div class="tracker__info__right__radio__box">
                            <input type="radio"/>
                            <div class="tracker__info__right__radio__box__text">
                                <p class="tracker__info__right__radio__box__text-p1">Заказ подтвержден</p>
                                <p class="tracker__info__right__radio__box__text-p2">15 нояб. 2021 </p>
                            </div>
                        </div>
                        <div class="tracker__info__right__radio__box">
                            <input type="radio"/>
                            <div class="tracker__info__right__radio__box__text">
                                <p class="tracker__info__right__radio__box__text-p1">Заказ отправлен</p>
                                <p class="tracker__info__right__radio__box__text-p2">18 нояб. 2021 </p>
                            </div>
                        </div>
                        <div class="tracker__info__right__radio__box">
                            <input type="radio"/>
                            <div class="tracker__info__right__radio__box__text">
                                <p class="tracker__info__right__radio__box__text-p1">В пункте распределения</p>
                                <p class="tracker__info__right__radio__box__text-p2">21 нояб. 2021 </p>
                            </div>
                        </div>
                        <div class="tracker__info__right__radio__box">
                            <input type="radio"/>
                            <div class="tracker__info__right__radio__box__text">
                                <p class="tracker__info__right__radio__box__text-p1">Заказ прибыл в место назначения</p>
                                <p class="tracker__info__right__radio__box__text-p2">31 нояб. 2021  </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    
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

.tracker {
    padding: 60px 0 160px 0;
    width: 57.5%;
    margin: auto;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    @media screen and (max-width: 768px) {
        width: 100%;
    }
    &-search {
        height: 40px;
        width: 37.23%;
        display: flex;
        justify-content: space-between;
        background: #FFFFFF;
        border: 1px solid #E3E5E6;
        border-radius: 8px;
        @media screen and (max-width: 768px) {
            width: 50%;
        }
        input {
            height: auto;
            border: none;
        }
        img {
            margin-right: 4px;
        }
    }
    &-text1 {
        margin-top: 48px;
        margin-bottom: 32px;
        font-weight: 700;
        font-size: 24px;
    }
    &__info {
        width: 100%;
        display: flex;
        justify-content: space-between;
        @media screen and (max-width: 768px) {
            flex-direction: column;
            gap: 16px;
        }
        &__left {
            padding: 40px;
            height: fit-content;
            box-sizing: border-box;
            box-shadow: 10px 10px 80px rgba(63, 39, 102, 0.1);
            background: #FFFFFF;
            border-radius: 16px;
            width: 51.36%;
            @media screen and (max-width: 768px) {
                width: 100%;
            }
            &-p1 {
                margin-bottom: 32px;
                font-weight: 700;
                font-size: 16px;
            }
            &__wrap {
                display: flex;
                flex-wrap: wrap;
                justify-content: space-between;
                row-gap: 32px;
                &__box {
                    width: 46%;
                    display: flex;
                    flex-direction: column;
                    gap: 4px;
                    &-p1 {
                        font-weight: 400;
                        font-size: 14px;
                        color: #72777A;
                    }
                    &-p2 {
                        
                        font-weight: 500;
                        font-size: 14px;
                    }
                }
            }
        }
        &__right {
            padding: 40px;
            box-sizing: border-box;
            width: 44.29%;
            box-shadow: 10px 10px 80px rgba(63, 39, 102, 0.1);
            background: #FFFFFF;
            border-radius: 16px;
            @media screen and (max-width: 768px) {
                width: 100%;
            }
            &__radio {
                display: flex;
                flex-direction: column;
                gap: 64px;
                &__box {
                    display: flex;
                    align-items: center;
                    gap: 16px;
                    input {
                        width: 32px;
                        height: 32px;
                    }
                    &__text {
                        display: flex;
                        flex-direction: column;
                        gap: 4px;
                        &-p1 {
                            font-weight: 500;
                            font-size: 14px;
                        }
                        &-p2 {
                            color: #72777A;
                            font-weight: 400;
                            font-size: 14px;
                        }
                    }
                }
            }
        }
    }
}
</style>
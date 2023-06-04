<template>
    <LoginModal v-if="$store.state.openLoginModal == true"/>
    <RegisterModal v-if="$store.state.openRegisterModal == true"/>

    <div class="desctop">
        <div class="header container">
            <div class="header__top">
                <div class="header__top__left">
                    <router-link to="#about"><p>{{ $t('aboutUs') }}</p></router-link>
                    <router-link to="#faq"><p>{{ $t('faq') }}</p></router-link>
                    <router-link to="#contacts"><p>{{ $t('contacts') }}</p></router-link>
                </div>
                <div class="header__top__right">
                    <select v-model="getLang" @change="getLang1($event.target.value)">
                        <option v-for="item in languages" :key="item" :value="item.value">{{ item.title }}</option>
                    </select>
                    <div class="header__top__right-img">
                        <img src="@/assets/icons/phone.svg"/>
                    </div>
                    <a href="tel:+77057774600">+7 (705) 777-46-00 </a>
                </div>
            </div>
            <div class="header__bot">
                <div class="header__bot__left">
                    <router-link to="/" style="width: 28.7%;;"><img src="@/assets/logo1.png" class="header__bot__left-logo"/></router-link>
                    <div class="header__bot__left-input">
                        <input type="search" :placeholder="$t('trackCode')" v-model="searchTracker"/>
                        <img src="@/assets/icons/search.svg" @click="trackerCheck(searchTracker)"/>
                    </div>
                </div>

                <div class="header__bot__right">
                    <button class="header__bot__right-button1" @click="$router.push('/moving')">Мувинговая услуга</button>
                    <button class="header__bot__right-button1" @click="$router.push('/order')">{{ $t('offerForm') }}</button>
                    <img v-if="getType === false" src="@/assets/icons/profile.svg" @click="$store.state.openLoginModal = true" style="cursor: pointer;"/>
                    <button v-else-if="getType === 'driver'" class="header__bot__right-button2" @click="$router.push('/admin/data')" style="cursor: pointer;">
                        {{ getUser.fio }}
                        <img src="@/assets/icons/profileActive.svg"/>
                    </button>
                    <button v-else-if="getType === 'user'" class="header__bot__right-button2" @click="$router.push('/profile/data')" style="cursor: pointer;">
                        {{ getUser.fio }}
                        <img src="@/assets/icons/profileActive.svg"/>
                    </button>
                    
                </div>
            </div>
        </div>
    </div>

    <div class="mobile" style="position: relative;">
        <div class="headerBackMobile">
            <div class="headerMobile container">
                <div :class="{ 'burger-active': isBurgerActive }" class="header__burger" @click="openMenu">
                    <div>
                        <span></span>
                        <span></span>
                        <span></span>
                        <span></span>
                    </div>
                </div>
                <router-link to="/">
                    <img src="@/assets/logo1.png" alt=""/>
                </router-link>
                <select v-model="getLang" @change="getLang1($event.target.value)">
                    <option v-for="item in languages" :key="item" :value="item.value">{{ item.title }}</option>
                </select>
            </div>
        </div>
        <div class="headerMobileMenu" :class="{ 'headerMobileMenuActive': isBurgerActive }" v-click-outside="closeHead">
            <img src="@/assets/icons/close.png" class="headerMobileMenu__close" @click="isBurgerActive = false"/>
            <div class="headerMobileMenu__content container">
                <div class="headerMobileMenu__content__menu">
                    
                    <img v-if="getType === false" src="@/assets/icons/profile.svg" @click="$store.state.openLoginModal = true" style="cursor: pointer; max-width: 24px;"/>
                    <button v-else-if="getType === 'driver'" class="header__bot__right-button2" @click="$router.push('/admin/data')" style="cursor: pointer;">
                        {{ getUser.fio }}
                        <img src="@/assets/icons/profileActive.svg"/>
                    </button>
                    <button v-else-if="getType === 'user'" class="header__bot__right-button2" @click="$router.push('/profile/data')" style="cursor: pointer;">
                        {{ getUser.fio }}
                        <img src="@/assets/icons/profileActive.svg"/>
                    </button>
                    <router-link to="#about" @click="isBurgerActive = false"><p>{{ $t('aboutUs') }}</p></router-link>
                    <div class="headerMobileMenu__content__menu-line"></div>
                    <router-link to="#faq" @click="isBurgerActive = false"><p>{{ $t('faq') }}</p></router-link>
                    <div class="headerMobileMenu__content__menu-line"></div>
                    <router-link to="#contacts" @click="isBurgerActive = false"><p>{{ $t('contacts') }}</p></router-link>
                    <div class="headerMobileMenu__content__menu-line"></div>
                    <div class="header__bot__left-input">
                        <input type="search" :placeholder="$t('trackCode')" v-model="searchTracker"/>
                        <img src="@/assets/icons/search.svg" @click="trackerCheck(searchTracker), isBurgerActive = false"/>
                    </div>
                    <div class="headerMobileMenu__content__menu-line"></div>
                    
                    <button class="header__bot__right-button1" @click="$router.push('/order'), isBurgerActive = false">{{ $t('offerForm') }}</button>
                    <button class="header__bot__right-button1" @click="$router.push('/moving')">Мувинговая услуга</button>
                    <!-- <button class="header__bot__right-button2" @click="isBurgerActive = false">{{ $t('offerCouries') }}</button> -->
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import { mapActions, mapGetters, mapMutations } from 'vuex';
import LoginModal from '../LoginModal.vue';
import RegisterModal from '../RegisterModal.vue';

export default {
    components: { LoginModal, RegisterModal },
    data() {
        return {
            isBurgerActive: false,
            searchTracker: "",
            languages: [
                { id: 1, value: "ru", title: "RU"},
                { id: 1, value: "kz", title: "KZ"},
                { id: 1, value: "en", title: "EN"},
            ],
            userType: null
        }
    },
    computed: {
        ...mapGetters(['getLang',"getAuth", "getUser", "getType"])
    },
    created() {
        this.requestUser()
    },
    methods: {
        ...mapMutations(["UPDATE_LANG"]),
        ...mapActions(["requestUser"]),
         getLang1(option) {
            // this.$i18n.locale = option.value;
             this.UPDATE_LANG(option);
            
            // axios.defaults.params = {
            //     lang: this.$store.state.lang,
            //  };
            
            this.$forceUpdate();
            location.reload();
        },

        trackerCheck(value) {
            if (value) {
                this.$router.push('/tracker/' + value)
            }
        },

        closeHead() {
            if (this.isBurgerActive) {
                this.isBurgerActive = false
            }
        },
        
        openMenu() {
            this.isBurgerActive = true;
        },
    },
    mounted() {
        this.userType = localStorage.getItem('login')
    }
}
</script>
<style lang="scss" scoped>
.profileIcon {
    @media screen and (max-width: 768px) {
        width: 50px;
        height: 50px;
        display: flex;
        justify-content: center;
        align-items: center;
        margin: auto;
    }
}
.headerMobileMenu {
    width: 100%;
    background: #FFFFFF;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);;
    position: fixed;
    top: -280px;
    transition: all 1s ease;
    z-index: 5;
    &__close {
        position: absolute;
        top: 5%;
        right: 3%;
        transition: all 0.5s ease;
        &:hover {
            rotate: 90deg;
        }
    }
    &__content {
        width: 90%;
        padding: 32px 0 24px 0;
        display: flex;
        flex-direction: column;
        gap: 7px;
        p {
            font-size: 15px;
            color: black;
            font-weight: 400;
        }
        &__menu {
            display: flex;
            flex-direction: column;
            gap: 7px;
            &-line {
                width: 100%;
                height: 1px;
                background: #00000026;
            }
        }
    }
}
.headerMobileMenuActive {
    top: 80px;
}
.headerBackMobile {
    padding: 27px 0;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    z-index: 999;
    background: white;
    box-shadow: 0px 8px 11px -3px rgba(34, 60, 80, 0.2);
}
.headerMobile {
    width: 90%;
    display: flex;
    justify-content: space-between;
    &__left {
        width: 30px;
        height: 28px;
    }
    a {
        width: 52.93%;
        img {
            width: 100%;
            height: 100%;
        }
    }
    select {
        cursor: pointer;
        outline: none;
        font-size: 18px;
        background: transparent;
        appearance: none;;
        border: none;
        height: max-content;
        color: black;
        option {
            background: #445260;
            border: none;
            font-size: 12px;
            width: fit-content;
            color: white;
        }
        option:checked {
            display: none;
        }
    }

}



.header {
    &__top {
        font-weight: 500;
        font-size: 12px;
        padding: 16px 0;
        display: flex;
        justify-content: space-between;
        &__left {
            display: flex;
            gap: 24px;
        }
        &__right {
            display: flex;
            align-items: center;
            gap: 8px ;
            &-img {
                background: #F2F4F5;
                border-radius: 50%;
                height: 24px;
                width: 24px;
                display: flex;
                align-items: center;
                justify-content: center;
            }
            select {
                background: #FFFFFF;
                outline: none;
                height: 24px;
                padding: 0 5px;
                border: 1px solid #E3E5E6;
                border-radius: 8px;
            }
        }
    }
    &__bot {
        padding: 24px 0;
        display: flex;
        justify-content: space-between;
        &__left {
            width: 59.97%;
            display: flex;
            align-items: center;
            justify-content: space-between;
            &-input {
                width: 54.93%;
                height: 40px;
                background: #FFFFFF;
                border: 1px solid #E3E5E6;
                border-radius: 8px;
                display: flex;
                align-items: center;
                @media screen and (max-width: 768px) {
                    width: 100%;
                }
                input {
                    width: 100%;
                    background: none;
                    border: none;
                    outline: none;
                }
                img {
                    cursor: pointer;
                    margin-right: 4px;
                }
            }
            &-logo {
                width: 100%;
            }
        }
        &__right {
            width: 31.33%;
            display: flex;
            align-items: center;
            justify-content: flex-end;
            gap: 20px;
            &-button1 {
                cursor: pointer;
                border-radius: 90px;
                color: white;
                background: #23262F;
                padding: 0 16px;
                font-weight: 700;
                font-size: 14px;
            }
            &-button2 {
                cursor: pointer;
                font-weight: 700;
                font-size: 14px;
                border-radius: 90px;
                color: black;
                background: white;
                padding: 0 16px;
                display: flex;
                align-items: center;
                gap: 10px;
                border: 1px solid #E3E5E6;
                border-radius: 90px;
                img {
                    height: 90%;
                }
            }
        }
    }
}


.header__burger {
    display: block;
    width: 30px;
    height: 18px;
    margin-top: 5px;
    position: relative;
    cursor: pointer;
    z-index: 9;

    & span {
      transition: all .3s ease 0s;
      top: calc(50% - 1px);
      left: 0;
      position: absolute;
      width: 100%;
      height: 2px;
      background-color: black;

      &:nth-child(1) {
        top: 0px;
      }

      &:nth-child(2) {
        top: 6px;
      }

      &:nth-child(3) {
        top: 12px;
      }
      &:nth-child(4) {
        top: 18px;
      }
    }
  }
  .burger-active {
    span {
      transform: scale(1);

      &:nth-child(1) {
        top: -2px;
      }
      &:nth-child(2) {
        top: 5px;
      }
      &:nth-child(3) {
        top: 13px;
      }
      &:nth-child(4) {
        top: 20px;
      }
    }
  }
</style>
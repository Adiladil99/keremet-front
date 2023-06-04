<template>
    <div class="footerBackground">
        <div class="footer container ">
            <div  class="footer__top">
                <router-link class="footer__top-logo" to="/"><img src="@/assets/logo2.png"/></router-link>
                <div class="footer__top-social">
                    <img src="@/assets/icons/facebook.png"/>
                    <img src="@/assets/icons/instagram.png"/>
                    <img src="@/assets/icons/telegram.png"/>
                </div>
            </div>
            <div  class="footer__bot">
                <p class="footer__bot__left">Copyright <span style="font-weight: 500; color: white">© {{ $t('privacyAll') }}</span></p>
                <div class="desctop">
                    <div class="footer__bot__right">
                        <router-link to="#about"><p>{{ $t('aboutUs') }}</p></router-link>
                        <p>|</p>
                        <router-link to="#reviews"><p>{{ $t('reviews') }}</p></router-link>
                        <p>|</p>
                        <router-link to="#faq"><p>{{ $t('faq') }}</p></router-link>
                        <p>|</p>
                        <router-link to="#contacts"><p>{{ $t('contacts') }}</p></router-link>
                        <p v-if="getType !== 'user'">|</p>
                        <div v-if="getType !== 'user'" @click="$router.push('/driver')" style="cursor: pointer;"><p>{{ $t('driverr') }}</p></div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <LoginAdminModal  v-if="$store.state.openLoginAdminModal == true" />
</template>
<script>
import { mapGetters } from 'vuex'
import LoginAdminModal from '../LoginAdminModal.vue'
export default {
  components: { LoginAdminModal },
computed: {
    ...mapGetters(["getType"])
}
}
</script>
<style lang="scss" scoped>
.footerBackground {
    padding: 60px 0 70px 0;
    background: #23262F;
}
a {
    color: white;
}
.footer {
    color: white;
    &__top {
        display: flex;
        justify-content: space-between;
        align-items: center;
        &-logo {
            width: 20%;
            @media screen and (max-width: 768px) {
                width: 65%;
            }
            img {
                width: 100%;
            }
        }
        &-social {
            display: flex;
            align-items: center;
            gap: 12px;
        }
    }
    &__bot {
        margin-top: 32px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        &__left {
            font-size: 12px;
            font-weight: 300;
            color: rgb(219, 219, 219);
        }
        &__right {
            font-weight: 300;
            font-size: 14px;
            display: flex;
            gap: 10px;
            opacity: 0.8;
        }
    }
}
</style>
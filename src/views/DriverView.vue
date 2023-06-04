<template>
 <div class="loginBack animated fadeIn">
     <div class="login animated fadeInLogin" v-scroll @click.stop>
         <p class="login-p1">Вход в кабинет </p>
         <p class="login-p2">
             Введите логин и пароль для входа 
             в личный кабинет
         </p>
         
         <div class="login-input1">
             <input placeholder="Введите E-mail" type="email" v-model="v$.email.$model"/>
             <template
                 v-for="(error, index) of v$.email.$errors"
                 :key="index"
             >
                 <p class="errorValid">{{ error.$message }}</p>
             </template>
         </div>
         <div class="login-input2">
             <input
                 placeholder="Введите пароль"
                 type="password"
                 v-model="v$.password.$model"
             />
             <template
                 v-for="(error, index) of v$.password.$errors"
                 :key="index"
             >
                 <p class="errorValid">{{ error.$message }}</p>
             </template>
         </div>
         <button class="login-p3" @click="loginAccount">Войти</button>
     </div>
 </div>
</template>
<script>
import useVuelidate from "@vuelidate/core";
import { required, minLength, helpers, email } from "@vuelidate/validators";

import user from '@/data/user.json'
import { mapActions } from 'vuex';

export default {
 data() {
     return {
     user: user.user,
     v$: useVuelidate(),
     email: "",
     password: "",
     isShowError: false,
     }
 },
 validations() {
     return {
     email: {
         required: helpers.withMessage(("Обязательное поле"), required),
         email: helpers.withMessage(("Некорректный email"), email),
     },
     password: {
         required: helpers.withMessage(("Обязательное поле"), required),
         minLength: helpers.withMessage(
         ("Пароль должен содержать 8 символов"),
         minLength(8)
         ),
     },
     };
 },
 methods: {
     ...mapActions(["checkAuth", "requestUser", "logoutUser"]),
     
     reserForm() {
         this.email = "",
         this.password = "",
         this.v$.$reset()
     },

     loginAccount() {
         this.v$.$validate();
         if (!this.v$.$invalid) {
             this.$axios.post("auth-driver/login", {
                 email: this.email,
                 password: this.password
             })
             .then(res => {
                 localStorage.setItem("access_token", res.data.accessToken)
                 localStorage.setItem("typee", 'driver')
                 this.$toaster.success('Вы успешно авторизовались');
                 this.$store.state.openLoginAdminModal = false,
                 this.$store.state.user_type = 'driver',
                 this.requestUser()
                 this.$router.push('/admin/data')
                 this.reserForm()
             })
             .catch(err => {
                 this.$toaster.warning('Произошло ошибка! Повторите попытку позже!');
                 this.logoutUser()
             })
         }
         else {
             this.$toaster.error('Заполните обязательные поля!')
         }
     }
 }
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
 top: -10%;
}
to {
 opacity: 1;
 top: 0%;
}
}

.errorValid {
 position: absolute;
 bottom: -30%;
 left: 2%;
 text-align: start;
 font-size: 12px;
 margin-left: 12px;
 color: red;
}


.loginBack {
 color: black;
 position: fixed;
 background: white;
 z-index: 999;
 top: 0;
 left: 0;
 right: 0;
 bottom: 0;
 background-color: rgba(0, 0, 0, 1);
 display: flex;
 justify-content: center;
 align-items: center;
}
.login {
 position: relative;
 width: 544px;
 background: #FCFCFD;
 box-shadow: 0px 64px 64px -48px rgba(15, 15, 15, 0.08);
 border-radius: 16px;
 padding: 72px 96px;
 box-sizing: border-box;
 display: flex;
 flex-direction: column;
 align-items: center;
 justify-content: center;
 &-p1 {
     font-weight: 700;
     font-size: 32px;
 }
 &-p2 {
     margin: 12px 0 32px 0;
     color: #72777A;
     font-weight: 400;
     font-size: 16px;
     text-align: center;
     width: 80%;
 }
 &-p3 {
     cursor: pointer;
     margin: 32px 0;
     width: 95%;
     color: white;
     height: 48px;
     background: #CB0E16;
     border-radius: 48px;
     outline: none;
     border: none;
     font-weight: 500;
     font-size: 16px;
 }
 &-p4 {
     color: #353945;
     font-weight: 400;
     font-size: 14px;
 }
 &-input1 {
     width: 100%;
     display: flex;
     justify-content: center;
     position: relative;
     margin-top: 16px;
 }
 &-input2 {
     width: 100%;
     display: flex;
     justify-content: center;
     position: relative;
     margin-top: 16px;
 }
 input {
     width: 85%;
     outline: red !important;
 }
 &-close {
     cursor: pointer;
     position: absolute;
     display: flex;
     justify-content: center;
     align-items: center;
     right: -3%;
     top: -3%;
     width: 32px;
     height: 32px;
     background: #FCFCFD;
     box-shadow: 0px 8px 16px -8px rgba(15, 15, 15, 0.1);
     border-radius: 32px;
     transform: matrix(1, 0, 0, -1, 0, 0);
 }
}
</style>
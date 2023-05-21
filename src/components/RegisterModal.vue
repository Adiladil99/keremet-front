<template>
    <div class="loginBack animated fadeIn" @click="$store.state.openRegisterModal = false">
        <div class="login animated fadeInLogin" v-scroll @click.stop>
            <p class="login-p1">Зарегистрироватся</p>
            <p class="login-p2">
                Заполните данные необходимые для регистрации
            </p>
            <div class="login-input1">
                <input type="text" placeholder="Ваше ФИО" v-model="v$.name.$model" @keyup="onlyText()" />
                <template v-for="(error, index) of v$.name.$errors" :key="index">
                    <p class="errorValid">{{ error.$message }}</p>
                </template>
            </div>
            <div class="login-input1">
                <input placeholder="Введите E-mail" type="email" v-model="v$.email.$model" />
                <template v-for="(error, index) of v$.email.$errors" :key="index">
                    <p class="errorValid">{{ error.$message }}</p>
                </template>
            </div>

            <div class="login-input1">
                <input placeholder="Номер телефона" v-model="v$.phone.$model" v-imask="phoneMask" @input="isNumber"
                    @accept="onAccept" @complete="onComplete" />
                <template v-for="(error, index) of v$.phone.$errors" :key="index">
                    <p class="errorValid">{{ error.$message }}</p>
                </template>
            </div>

            <div class="login-input2">
                <input placeholder="Введите пароль" type="password" v-model="v$.password.$model" />
                <template v-for="(error, index) of v$.password.$errors" :key="index">
                    <p class="errorValid">{{ error.$message }}</p>
                </template>
            </div>

            <div class="login-input2">
                <input placeholder="Введите пароль" type="password" v-model="v$.passwordConfirm.$model" />
                <template v-for="(error, index) of v$.passwordConfirm.$errors" :key="index">
                    <p class="errorValid">{{ error.$message }}</p>
                </template>
            </div>

            <button class="login-p3" @click="loginAccount">Войти</button>
            <p class="login-p4">Уже зарегистрированы? <span style="color: red; cursor: pointer;"
                    @click="$store.state.openLoginModal = true, $store.state.openRegisterModal = false">Войти</span></p>

            <div class="login-close">
                <img src="@/assets/icons/close.png" @click="$store.state.openRegisterModal = false" />
            </div>
        </div>
    </div>
</template>
<script>
import useVuelidate from "@vuelidate/core";
import { required, minLength, helpers, email, sameAs } from "@vuelidate/validators";

import { IMaskDirective } from "vue-imask";
import { ref } from 'vue';
import { mapActions } from "vuex";

export default {
    directives: {
        imask: IMaskDirective,
    },
    data() {
        return {
            v$: useVuelidate(),
            email: "",
            password: "",
            passwordConfirm: "",
            phone: "",
            name: "",
            isShowError: false,
            phoneMask: {
                mask: "+{7} ({000}) 000-00-00",
                lazy: true,
            },
            operators: [
                700, 701, 702, 703, 704, 705, 706, 707, 708, 709, 747, 750, 751, 760,
                761, 762, 763, 764, 771, 775, 776, 777, 778,
            ],
        }
    },
    validations() {
        return {
            name: {
                required: helpers.withMessage(("Обязательное поле"), required),
                minLength: helpers.withMessage(
                    ("Слишком короткое имя"),
                    minLength(3)
                ),
            },
            email: {
                required: helpers.withMessage(("Обязательное поле"), required),
                email: helpers.withMessage(("Некорректный email"), email),
            },
            phone: {
                required: helpers.withMessage(("Обязательное поле"), required),
                minLength: helpers.withMessage(("Введите номер формата +7(777)777 77 77"), minLength(18)
                ),
            },
            password: {
                required: helpers.withMessage(("Обязательное поле"), required),
                minLength: helpers.withMessage(
                    ("Пароль должен содержать 8 символов"),
                    minLength(8)
                ),
            },
            passwordConfirm: {
                required: helpers.withMessage((""), required),
                sameAs: helpers.withMessage(
                    ("Пароли не совпадают"),
                    sameAs(this.password)
                ),
            },
        };
    },
    methods: {
        ...mapActions(["requestUser", "logoutUser"]),
        reserForm() {
            this.name = "",
                this.email = "",
                this.phone = "",
                this.password = "",
                this.passwordConfirm = "",
                this.v$.$reset()
        },
        isNumber(e) {
            let regex = /[0-9]/;
            if (!regex.test(e.key)) {
                e.returnValue = false;
                if (e.preventDefault) e.preventDefault();
            }
            if (e.target.value.slice(4, 7).length === 3) {
                if (this.operators.includes(parseInt(e.target.value.slice(4, 7)))) {
                    console.log("true", true);
                } else {
                    e.target.value = " ";
                    this.$toaster.error("Такого мобильного оператора не существует!");
                }
            }
        },
        onAccept(e) {
            const maskRef = e.detail;
            this.value = maskRef.value;
        },
        onComplete(e) {
            const maskRef = e.detail; // что бы в дальнейшем сохранить
            console.log("complete", maskRef.unmaskedValue);
        },

        onlyText() {
            this.name = this.name.replace(/[^а-яА-ЯёЁәӘіІңҢғҒүҮұҰқҚөӨһҺa-zA-Z\-\s.]/gi, "");
            this.name = this.name.replace(/\.{2,}|\s{2,}|\-{2,}/g, function (match) {
                return match.substr(0, 1);
            });
        },

        loginAccount() {
            this.v$.$validate();
            if (!this.v$.$invalid) {
                this.$axios.post("auth/register", {
                    fio: this.name,
                    email: this.email,
                    phone: this.phone,
                    password: this.password
                })
                .then(res => {
                    localStorage.setItem("access_token", res.data.accessToken)
                    this.$toaster.success('Вы успешно зарегистрировались!')
                    this.requestUser()
                    this.$store.state.openRegisterModal = false
                    this.$router.push('/profile/data')
                    this.reserForm()
                })
                .catch(err => {
                    this.$toaster.success('Произошло ошибка! Повторите попытку позже!');
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
    z-index: 999;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.5);
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
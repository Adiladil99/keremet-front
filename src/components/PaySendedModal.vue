<template>
    <div class="sendBack" @click="$store.state.openSendedModal = false">
        <div class="send" v-scroll @click.stop>
            <div class="send__galoshka">
                <img src="@/assets/icons/galoshka.svg"/>
            </div>
            <p class="send-p1">{{ $t('paySended') }}</p>
            <p class="send-p2">{{ $t('paySendedDesc') }}</p>
            <button class="send-button" @click="$router.push('/profile/tracker')">{{ $t('checkStatus') }}</button>
        </div>
    </div>
</template>
<script>
export default {
    
}
</script>
<style lang="scss" scoped>
.sendBack {
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
.send {
    padding: 72px 40px;
    width: 775px;
    box-sizing: border-box;
    background: #FCFCFD;
    box-shadow: 0px 64px 64px -48px rgba(15, 15, 15, 0.08);
    border-radius: 16px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    &__galoshka {
        background: #4CD471;
        border-radius: 50%;
        height: 85px;
        width: 85px;
        display: flex;
        align-items: center;
        justify-content: center;
        animation: pulse 6.5s infinite;
        box-shadow: 0px 0px 4px 11px rgba(57, 255, 0, 0.2);
    }
    @keyframes pulse {
    0% {
        transform: scale(1);
    }
    50% {
        box-shadow: 0px 0px 1px 16px rgba(57, 255, 0, 0.2);
        transform: scale(1.2);
    }
    75% {
        box-shadow: 0px 0px 7px 12px rgba(57, 255, 0, 0.2);
        transform: scale(1.15);
    }
    100% {
        transform: scale(1);
    }
    }

    &-p1 {
        margin-top: 50px;
        font-weight: 700;
        font-size: 24px;
    }
    &-p2 {
        width: 75%;
        text-align: center;
        margin: 24px 0 32px 0;
        font-weight: 400;
        font-size: 18px;
    }
    &-button {
        cursor: pointer;
        background: #CB0E16;
        font-weight: 700;
        font-size: 14px;
        color: white;
        padding: 0 24px;
        height: 48px;
    }
}
</style>
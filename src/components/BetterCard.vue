<template>
    <div class="better">
        <img  class="better-img" :src="require('@/assets/images/better/' + better.image + '.png')"/>
        <p class="better-p1">{{ better.title }}</p>
        <p class="better-p2">{{ better.desc }}</p>
    </div>
</template>
<script>
export default {
    props: ['better']
}
</script>
<style lang="scss" scoped>
.better {
    width: 100%;
    &-img {
        border-radius: 8px;
        width: 100%;
        height: 100%;
    }
    &-p1 {
        margin: 21px 0 16px 0;
        font-weight: 700;
        font-size: 16px;
    }
    &-p2 {
        color: #72777A;
        font-weight: 400;
        font-size: 14px;
    }
}
</style>
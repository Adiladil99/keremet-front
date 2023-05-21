<template>
    <div class="reviewsBack">
        <div class="reviews">
            <div class="reviews__user">
                <img :src="require('@/assets/images/reviews/' + reviews.image + '.png')"/>
                <div  class="reviews__user__text">
                    <p class="reviews__user__text-p1">{{ reviews.user }}</p>
                    <p class="reviews__user__text-p2">{{ reviews.type }}</p>
                </div>
            </div>
            <p class="reviews-title">{{ reviews.title }}</p>
            <p class="reviews-desc">{{ reviews.desc }}</p>
        </div>
    </div>
</template>
<script>
export default {
    props: ['reviews']
}
</script>
<style lang="scss" scoped>

.reviewsBack {
    width: 100%;
    background: #FFFFFF;
    border: 1px solid #E3E5E6;
    border-radius: 24px;
}
.reviews {
    padding: 40px;
    &__user {
        display: flex;
        align-items: center;
        gap: 16px;
        &__text {
            display: flex;
            flex-direction: column;
            gap: 8px;
            &-p1 {
                font-weight: 600;
                font-size: 16px;
            }
            &-p2 {
                font-weight: 400;
                font-size: 14px;
                color: #72777A;
            }
        }
    }
    &-title {
        margin-top: 32px;
        font-weight: 600;
        font-size: 16px;
    }
    &-desc {
        margin-top: 8px;
        color: #72777A;
        font-weight: 400;
        font-size: 14px;
    }
}
</style>
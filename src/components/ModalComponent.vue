<template>
  <div class="modal-wrapper" v-if="isOpen">
    <div class="modal-overlay" @click="closeModal"></div>
    <div class="modal">
      <img class="close-modal" :src="require('@/assets/images/x.png')" @click="closeModal" alt="user-plus" />
      <div class="modal-content" @click.stop="">
        <slot />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
    };
  },
  props: ["isOpen"],
    methods: {
        closeModal() {
            this.$emit('close')
        },
    },
  watch: {
    isOpen() {
      this.isOpen === false ? this.trues = true : null
      this.isOpen ? document.documentElement.style.overflowY = 'hidden' : document.documentElement.style.overflowY = 'auto'
    }
  }
};
</script>

<style lang="scss" scoped>
.modal-wrapper {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999;
}

.modal-overlay {
  position: absolute;
  top: 0;
  z-index: -1;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
}

.modal {
  // max-width: 606px;
  max-width: fit-content;
  max-height: 85vh;
  border-radius: 20px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.5);
  animation: modal-appear 0.5s;
  position: relative;
  @media screen and (max-width: 768px) {
    padding: 37px 20px;
    height: auto; 
  }
  &-content {
  //  width: 370px;
    width: fit-content;
   height: 100%;
   display: flex;
   flex-direction: column;
   align-items: stretch;
  @media screen and (max-width: 768px) {
    width: 100%;
  }
   &-row {
    margin-top: 20px;
    display: flex;
    align-items: center;
    gap: 20px;
   }
   &-col {
    margin-top: 18px;
    display: flex;
    flex-direction: column;
    gap: 10px;
    
    input, textarea {
      padding: 12px 15px;
      border: 1px solid #E0E0E0;
      border-radius: 160px;
      outline: none;
      font-family: 'Inter', sans-serif;
      font-style: normal;
      font-weight: 400;
      font-size: 14px;
      line-height: 17px;
    }
    textarea {
      border-radius: 20px;
      padding: 18px 20px;
      resize: none;
    }
   }
   @media screen and (max-width: 768px) {
    width: 100%;
   }
  }
  &-desc {
    font-family: "Roboto Flex", sans-serif;
    font-size: 20px;
    text-align: center;
    padding: 20px 0 26px 0;
  }
  &-input {
    width: calc(100% - 15px);
    padding: 20px 0 20px 15px;
    border: 1px solid #e0e0e0;
    outline: none;
    border-radius: 290px;
    font-size: 16px;
    margin-bottom: 35px;
  }
  &__buttons {
    margin-top: 18px;
    display: flex;
    align-items: center;
    gap: 15px;
    button {
     border: 1px solid #011826;
     filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));
     border-radius: 100px;
     padding: 12px 30px;
     font-family: 'Roboto Flex', sans-serif;
     font-style: normal;
     font-weight: 700;
     font-size: 14px;
     line-height: 23px;
     background: #011826;
     color: white;
     text-transform: uppercase;
     &:first-child {
      border: 1px solid #011826;
      color: #011826;
      background: #FFFFFF;
     }
     &:hover {
      cursor: pointer;
      transform: scale(1.03);
     }
     @media screen and (max-width: 768px) {
      font-size: 14px;
      margin-bottom: 20px;
     }
    }
  }
}

.close-modal {
  position: absolute;
  top: 15px;
  right: 15px;
  &:hover {
    cursor: pointer;
    transform: scale(1.1);
  }
}

@keyframes modal-appear {
  from {
    opacity: 0;
    transform: translateY(-50px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>

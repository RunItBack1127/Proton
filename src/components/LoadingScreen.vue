<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
    name: 'LoadingScreen'
});
</script>

<template>
    <!-- Adapted from SpinKit | Simple CSS Spinners -->
    <!-- https://tobiasahlin.com/spinkit/ -->
    <div class="spinner">
        <div class="bounce1"></div>
        <div class="bounce2"></div>
        <div class="bounce3"></div>
    </div>
</template>

<style lang="scss" scoped>
.spinner {
    --animation-duration: 0.5s;
    --bounce-delay: -0.25s;

    div {
        border-radius: 100%;
        display: inline-block;
        -webkit-animation: sk-bouncedelay var(--animation-duration) infinite ease-in-out both;
        animation: sk-bouncedelay var(--animation-duration) infinite ease-in-out both;
        width: 18px;
        height: 18px;
        background-color: #000;
    }

    div:not(:last-child) {
        margin-right: 10px;
    }

    .bounce1 {
        -webkit-animation-delay: var(--bounce-delay);
        animation-delay: var(--bounce-delay);
    }
    
    .bounce2 {
        -webkit-animation-delay: calc(var(--bounce-delay) / 2);
        animation-delay: calc(var(--bounce-delay) / 2);
    }
}

@-webkit-keyframes sk-bouncedelay {
  0%, 80%, 100% { -webkit-transform: scale(0) }
  40% { -webkit-transform: scale(1.0) }
}

@keyframes sk-bouncedelay {
  0%, 80%, 100% { 
    -webkit-transform: scale(0);
    transform: scale(0);
  } 40% { 
    -webkit-transform: scale(1.0);
    transform: scale(1.0);
  }
}
</style>
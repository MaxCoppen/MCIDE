<template>

<button class="btn" @click="buttonClicked()">
    <i class="ico abs-center" :data-feather="icon" :style="{height: height, 'stroke-width': stroke}"></i>
</button>

</template>

<script>

export default {
    props: {
        icon: String,
        stroke: String,
        height: String
    },
    methods: {
        buttonClicked() {
            this.$emit('onclick')
        }
    }
}

</script>

<style scoped>

button {
    background-color: #404040;
    color: #7F7F7F;

    box-shadow: none !important; 
    outline: 0 !important;

    border-radius: 0;

    width: 30px; 
    height: 100%;
    position: relative;
    transition: all 0.2s;
}

button:hover {
    background-color: #535353;
    color: #D9D9D9;
    transition: all 0.2s;
}

button:active {
    background-color: #262626;
    color: #7F7F7F;
    transition: all 0.2s;
}

.ico {
    height: 18px;
    width: auto;

    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
}

</style>
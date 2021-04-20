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
    background-color: var(--background-dark);
    color: var(--text-dark);

    box-shadow: none !important; 
    outline: 0 !important;

    border-radius: 0;

    width: 30px; 
    height: 100%;
    position: relative;
    transition: all 0.2s;
}

button:hover {
    background-color: var(--background-light);
    color: var(--text-dark);
    transition: all 0.2s;
}

button:active {
    background-color: var(--background-darker);
    color: var(--text-light);
    transition: all 0.2s;
}

.ico {
    height: 18px;
    width: auto;

    position: absolute;
    top: 48%;
    left: 50%;
    transform: translate(-50%, -50%);
}

</style>
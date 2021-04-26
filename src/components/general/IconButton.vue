<template>

<button class="btn ico-button" @click="buttonClicked()">
    <i class="ico" :data-feather="icon" :style="{ height: size ? size : '66%', 'stroke-width': stroke }"></i>
</button>

</template>

<script>

export default {
    name: 'IconButton',
    props: {
        icon: String,
        stroke: { type: String, default: '2px' },
        size: String
    },
    methods: {
        buttonClicked() {
            this.$emit('onclick')
        }
    }
}

</script>

<style scoped>

.ico-button {
    background-color: var(--background-dark);
    color: var(--text-dark);

    box-shadow: none !important; 
    outline: 0 !important;

    border-radius: 0;

    width: 100%; 
    height: 100%;
    position: relative;
}

.ico-button:hover {
    background-color: var(--background-light);
    color: var(--text-dark);
}

.ico-button:active {
    background-color: var(--background-darker);
    color: var(--text-light);
}

.ico {
    width: auto;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
}

</style>
<template>

<div class="footer">
    <div class="d-flex align-items-start flex-row h-100">

        

    </div>
</div>

</template>

<script>
import { defineComponent } from 'vue';

export default defineComponent({
    name: 'app-footer'
})

</script>

<style scoped>

.footer {
    user-select: none;
    -webkit-user-select: none;

    background-color: var(--background-light);
    overflow: hidden;

    z-index: 3;

    position: fixed;
    left: 0;
    bottom: 0;

    width: 100%;
    height: 20px;
}

.dir-info {
    width: calc(100vw / 4) !important;
    min-width: 150px;
    max-width: 350px;
}

.ico {
    color: var(--text-dark);
    height: 12px;
    width: 12px;
    margin: 4px 3px 0px 3px;
}

.txt {
    color: var(--text-dark);
    font-weight: 600;
    font-size: 12px;
    white-space: nowrap;

    padding-right: 5px;
    margin-top: 0.5px;

    width: auto;
}

</style>
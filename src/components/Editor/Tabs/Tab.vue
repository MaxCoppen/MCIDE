<template>
    <button class="tab d-flex justify-content-start flex-row">
        <img class="type-ico" src="../../../assets/icons/file-icons/js.svg">
        <p>{{filedata.name}}.{{filedata.type}}</p>
    </button>
</template>

<script>
export default {
    props: {
        filedata: Object
    }
}
</script>

<style scoped>

.tab {
    background-color: var(--background);
    color: var(--text-dark);

    box-shadow: none !important; 
    outline: 0 !important;
    border: none;

    padding: 0;
    padding-left: 10px;
    padding-right: 10px;

    width: fit-content;
    height: 100%;

    transition: all 0.2s;
}

.tab:hover {
    background-color: var(--background-dark);
}

.tab:active {
    background-color: var(--background-light);
}

.type-ico {
    margin: auto;
    margin-left: 5px;
    margin-right: 5px;

    width: auto;
    height: 14px;
}

p {
    margin: auto;
    margin-right: 5px;
}

</style>
<script>

export default {}

</script>

<template>

<div class="footer">
    <div class="d-flex align-items-start flex-row h-100">

        <!-- Directory Information -->
        <div class="dir-info d-flex justify-content-start h-100">

            <p class="txt"> Files </p>

            <p class="txt"> Total Length </p>

        </div>

        <!-- File Information -->
        <div class="d-flex justify-content-start h-100">

            <p class="txt"> File Length </p>

            <p class="txt"> Relative Filepath </p>

        </div>

        <!-- Code Information -->
        <div class="d-flex justify-content-end flex-grow-1 h-100">

            <p class="txt"> Language </p>

            <p class="txt"> Version </p>

        </div>

    </div>
</div>

</template>

<style scoped>

.footer {
    user-select: none;
    -webkit-user-select: none;

    background-color: #404040;
    overflow: hidden;

    width: 100%;
    height: 20px;
}

.dir-info {
    width: calc(100vw / 4) !important;
    min-width: 150px;
    max-width: 350px;
    margin-right: 6px;
}

.txt {
    color: #7F7F7F;
    font-weight: 600;
    font-size: 12px;

    padding-left: 5px;
    padding-right: 5px;

    width: auto;
    transition: all 0.2s;
}

.txt:hover {
    color: #D9D9D9;
    transition: all 0.2s;
}

</style>
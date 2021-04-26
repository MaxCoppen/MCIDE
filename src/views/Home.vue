<template>
    
<!--<img class="big-logo" src="../assets/logo.png">

<button class="btn btn-dark abs-btn-left" @click="setPath('/editor')">Open File</button>
<button class="btn btn-dark abs-btn-right">Open Project</button>-->

<div class="home-view d-flex justify-content-center align-items-center">
    <div class="info-container align-self-center d-flex align-items-center glass-panel" style="width: 20rem;">
        <!--<img class="big-logo" src="../assets/logo.png">-->
        <div class="info-buttons d-flex flex-column justify-content-evenly">
            <button class="btn btn-dark d-flex justify-content-between" @click="setPath('/project/env')">
                <div class="d-flex flex-row justify-content-start"><span class="key-display"><span class="key-text monospace">Ctrl</span></span> + <span class="key-display"><span class="key-text">O</span></span></div>
                 Open File
            </button>
            <button class="btn btn-dark d-flex justify-content-between" @click="setPath('/project/env')">
                <div class="d-flex flex-row justify-content-start"><span class="key-display"><span class="key-text monospace">Ctrl</span></span> + <span class="key-display"><span class="key-text">N</span></span></div>
                New Project
            </button>
            <button class="btn btn-dark d-flex justify-content-between" @click="setPath('/project/env')">
                <div class="d-flex flex-row justify-content-start"><span class="key-display"><span class="key-text monospace">Ctrl</span></span> + <span class="key-display"><span class="key-text">K</span></span></div>
                Open Project
            </button>
        </div>
    </div>
</div>

</template>

<script>
export default {
    name: 'Home',

    methods: {
        setPath(new_path) {
            this.$router.push(new_path)
        }
    }
}
</script>

<style scoped>

.home-view {
    width: 100%;
    height: 100%;
}

.info-container {
    position: relative;
    display: flex;
    flex-direction: column;
    min-width: 0;
    word-wrap: break-word;
}

.info-buttons {
    padding-top: 10px;
    width: 70%;
}

.big-logo {
    width: 80%;
    height: auto;
}

.key-display {
    background-color: var(--background-dark);
    border-radius: 5px;
    margin-left: 2.5px;
    margin-right: 2.5px;
    min-width: 22px;
}

.key-text {
    padding: 5px;
}

.btn-dark {
    box-shadow: none !important; 
    outline: 0 !important;

    border: none;
    border-radius: 5px;

    background-color: var(--background);
    color: var(--text-dark);
}

.btn-dark div {
    color: var(--text);
} 

.btn-dark div .key-display {
    color: var(--text-dark);
} 

.btn-dark:hover {
    background-color: var(--background-dark);
    color: var(--text);
} 

.btn-dark:hover div {
    color: var(--text);
} 

.btn-dark:hover div .key-display {
    background-color: var(--background-dark);
    color: var(--text);
} 

.btn-dark:active div .key-display {
    background-color: var(--background-darker);
    color: var(--text-light);
}

.btn-dark:active {
    background-color: var(--background-darker);
    color: var(--text-light);
}

</style>
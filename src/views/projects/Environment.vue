<template>

<div class="environment d-flex flex-column justify-content-center align-items-center">
    
    <div class="environment-card">
        <div class="environment-body d-flex flex-column">
            <h5 class="environment-card-title">.NET Environment</h5>
            <h6 class="environment-card-subtitle mb-2">.NET Core / .NET Framework</h6>
            <p class="environment-card-text">Environment for building .NET Core and .NET Framework applications.</p>
            <div class="d-flex flex-row justify-content-evenly">
                <button class="btn btn-dark d-flex align-self-center monospace" @click="setPath('/editor/dotnet')">
                    open
                </button>
                <button class="btn btn-dark d-flex align-self-center monospace" @click="setPath('/project/env')" disabled>
                    new
                </button>
            </div>
        </div>
    </div>

</div>

</template>

<script>

export default {
    name: 'Environment',

    methods: {
        setPath(new_path) {
            this.$router.push(new_path)
        }
    }
}

</script>

<style scoped>

.environment {
    width: 100%;
    height: 100%;
    padding: 5px;
}

.environment-card {
    display: flex;
    flex-direction: column;
    background-color: var(--background-dark);
    border-radius: .25rem;
    height: min-content;
}

.environment-body {
    flex: 1 1 auto;
    padding: 1rem 1rem;
}

.environment-card-text {
    font-size: 15px;
    color: var(--text);
}

.environment-card-title {
    font-size: 20px;
    color: var(--text-light);
}

.environment-card-subtitle {
    font-size: 17.5px;
    color: var(--text-dark);
}

.btn-dark {
    box-shadow: none !important; 
    outline: 0 !important;

    border: none;
    border-radius: 5px;

    background-color: var(--background-dark);
    color: var(--text-light);
}

.btn-dark:hover {
    background-color: var(--background);
    color: var(--text-light);
} 

.btn-dark:active {
    background-color: var(--background-darker);
    color: var(--text-dark);
}

@media (max-width: 576px) {  
    .environment-card {
        width: 12.5em;
    }

    .environment-card-text {
        user-select: none;
        height: 0;
        overflow:hidden;
    }
}

/* Small devices (landscape phones, 576px and up) */
@media (min-width: 576px) and (max-width:768px) {  
    .environment-card {
        width: 15em;
    }

    .environment-card-text {
        user-select: none;
        height: 0;
        overflow:hidden;
    }
}
 
/* Medium devices (tablets, 768px and up) The navbar toggle appears at this breakpoint */
@media (min-width: 768px) and (max-width:992px) {  
    .environment-card {
        width: 20em;
    }
}
 
/* Large devices (desktops, 992px and up) */
@media (min-width: 992px) and (max-width:1200px) { 
    .environment-card {
        width: 25em;
    }
}
 
/* Extra large devices (large desktops, 1200px and up) */
@media (min-width: 1200px) {  
    .environment-card {
        width: 30em;
    }
}

</style>
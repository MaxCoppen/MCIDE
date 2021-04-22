<template>

<div class="d-flex flex-row" :class="{ tab: !filedata.open, 'tab-open': filedata.open }">

    <button class="focus-btn d-flex justify-content-start flex-row" @click="focus()">
        <img class="type-ico" :src=iconurl>
        <p>{{filedata.name}}.{{filedata.type}}</p>
    </button>

    <div v-show="filedata.changed === false" class="close-ico-parent">
        <button class="close-btn d-flex justify-content-center" @click="close()">
            <i class="close-ico" data-feather="x"></i>
        </button>
    </div>

    <div v-show="filedata.changed === true" class="close-ico-parent">
        <button class="close-btn d-flex justify-content-center" @click="close()">
            <i class="changes-ico" data-feather="circle"></i>
        </button>
    </div>

</div>

</template>

<script>
export default {
    props: {
        filedata: Object
    },

    data() {
        return { iconurl: '' }
    },

    created() {
        const languages = [
            'js', 'ts',
            'json',
            'html', 'css',
            'c', 'cs', 'cpp',
            'vue'
        ]

        const ext = languages.includes(this.filedata.type);

        if (ext)
            this.iconurl = './file-icons/' + this.filedata.type + '.png'
        else
            this.iconurl = './file-icons/txt.png'
    },

    methods: {
        focus() {
            this.$emit('focusFile', this.filedata)
        },

        close() {
            this.$emit('closeFile', this.filedata)
        }
    }
}
</script>

<style scoped>

.tab {
    background-color: var(--background);
    color: var(--text-dark);

    position: relative;

    box-shadow: none !important; 
    outline: 0 !important;
    border: none;

    padding: 0;
    padding-left: 7.5px;
    padding-right: 5px;

    width: fit-content;
    height: 100%;

    transition: background-color 0.2s;
}

.tab:hover {
    background-color: var(--background-dark);
}

.tab:active {
    background-color: var(--background-light);
}

.tab-open {
    background-color: var(--background-dark);
    color: var(--text-dark);

    position: relative;

    box-shadow: none !important; 
    outline: 0 !important;
    border: none;

    padding: 0;
    padding-left: 7.5px;
    padding-right: 5px;

    width: fit-content;
    height: 100%;

    transition: background-color 0.2s;
}

.tab-open:hover {
    background-color: var(--background-dark);
}

.tab-open:active {
    background-color: var(--background-light);
}

.type-ico {
    margin: auto;
    margin-left: 5px;
    margin-right: 5px;
    margin-top: 7.5px;

    width: auto;
    height: 15px;
}

.focus-btn {
    color: var(--text);
    background: none;
    border: none;

    width: fit-content;
    height: 100%;
    padding: 0;

    transition: color 0.2s;
}

.focus-btn:hover {
    color: var(--text-light);
}

.focus-btn:active {
    color: var(--text-dark);
}

.close-btn {
    color: var(--text-dark);
    background: none;
    border: none;

    width: 20px;
    height: 100%;
    padding: 0;

    opacity: 0;

    transition: opacity 0.2s, color 0.2s;
}

.tab:hover .close-btn {
    opacity: 1;
}

.tab-open .close-btn {
    opacity: 1;
}

.close-btn:hover {
    color: var(--text-light);
}

.close-btn:active {
    color: var(--text-darker);
}

.close-ico-parent {
    width: 100%;
    height: 100%;

    margin: 0;
}

.close-ico {
    color: inherit;

    width: auto;
    height: 18px;
    stroke-width: 1.75px;

    margin: auto;
    margin-top: 6.5px;
}

.changes-ico {
    color: inherit;

    width: auto;
    height: 12px;
    stroke-width: 3px;

    margin: auto;
    margin-top: 9.5px;
}

.change-indicator {
    color: var(--text-light);

    width: 5px;
    margin: 0;

    font-size: 18px;
    font-weight: 700;
}

p {
    margin: auto;
    margin-right: 5px;
    margin-left: 5px;
    margin-bottom: 4px;
    white-space: nowrap;
}

</style>
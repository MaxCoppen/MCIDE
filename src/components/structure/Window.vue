<template>
    
<div ref="window" class="window">
    <div ref="titlebar" class="titlebar">
        <Button icon="x" size="75%" stroke="2px" class="window-button" />
    </div>

    <div class="body">
        <router-view :name="view" />
    </div>
</div>

</template>

<script>
import Button from '../general/IconButton'

export default {
    name: 'window',

    components: { Button },

    props: {
        view: { type: String, required: true }
    },

    data() {
        return {
            dragging: false,
            windowInfo: { X: 0, Y: 0 }
        }
    },

    mounted() {
        this.$refs.titlebar.addEventListener("mousedown", event => this.onMouseDown(event));
        document.addEventListener("mousemove", event => this.onMouseDrag(event));
        document.addEventListener("mouseup", event => this.onMouseUp(event));
    },

    methods: {
        // Event called when the mouse is down.
        onMouseDown(e) {
            if (e.button == 0 && e.path[0].className == 'titlebar') {
                this.$refs.window.classList.add('moving');
                
                // Find all the windows and move this one in front:
                var windows = document.getElementsByClassName("window");
                for (let i = 0; i < windows.length; i++) {
                    windows[i].style.zIndex = 0
                } this.$refs.window.style.zIndex = 1

                // Save the difference between the mouse start and window center:
                this.windowInfo.X = e.clientX - this.$refs.window.style.left.slice(0, -2);
                this.windowInfo.Y = e.clientY - this.$refs.window.style.top.slice(0, -2);

                // Enable dragging.
                this.dragging = true
            }
        },

        // Event called when the mouse is moving.
        onMouseDrag(e) {
            if (this.dragging) {
                // Move the window:
                this.$refs.window.style.left = e.clientX - this.windowInfo.X + 'px';
                this.$refs.window.style.top = e.clientY - this.windowInfo.Y + 'px';

                // Get the rect and parent rect:
                var pRect = this.$refs.window.parentElement.getBoundingClientRect();
                var tgtRect = this.$refs.window.getBoundingClientRect();

                // Bound the window to its parent:
                if (tgtRect.left < pRect.left) this.$refs.window.style.left = pRect.left + 'px';
                if (tgtRect.top < pRect.top) this.$refs.window.style.top = pRect.top + 'px';
                if (tgtRect.right > pRect.right) this.$refs.window.style.left = pRect.right - tgtRect.width + 'px';
                if (tgtRect.bottom > pRect.bottom) this.$refs.window.style.top = pRect.bottom - tgtRect.height + 'px';
            }
        },

        // Event called when the mouse is up.
        onMouseUp(e) {
            if (e.button == 0 && this.$refs.window != null) {
                this.$refs.window.classList.remove('moving')
                // Disable dragging.
                this.dragging = false
            }
        }
    }
}

</script>

<style scoped>

.window {
    width: 300px;
    height: 200px;

    position: absolute;

    display: flex;
    flex-direction: column;

    transition: opacity 0.1s !important;
}

.window-button {
    background-color: #222222;
    color: #CCCCCC;

    max-width: 20px !important;
}

.window-button:hover {
    background-color: #333333;
    color: white;
}

.window-button:active {
    background-color: black;
    color: #AAAAAA;
}

.titlebar {
    user-select: none;
    background-color: #222222;

    width: 100%;
    height: 20px;

    display: flex;
    flex-direction: row;
    justify-content: flex-end;
}

.body {
    background-color: #181818;

    width: 100%;
    height: auto;

    flex-grow: 1;
}

.moving {
    opacity: 0.5;
}

</style>
<template>
    
<div ref="window" class="window">
    <div ref="titlebar" class="titlebar">
        <Button icon="x" size="75%" stroke="2px" class="window-button" />
    </div>

    <div class="body">
        <router-view :name="view" />
    </div>

    <div ref="ghost" class="ghost">

    </div>
</div>

</template>

<script>
import Button from '@/components/general/IconButton'

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

                // Find the hover grid panel:
                const elements = document.elementsFromPoint(e.clientX, e.clientY);
                const element = elements.find(el => el.className.includes("grid-content"))
                if (element != null) {
                    // Set the ghost as child of the target.
                    element.parentNode.appendChild(this.$refs.ghost)

                    // Scale and move the ghost:
                    var eRect = element.getBoundingClientRect();
                    this.$refs.ghost.style.left = eRect.left + 'px'
                    this.$refs.ghost.style.top = eRect.top + 'px'
                    this.$refs.ghost.style.width = (element.className.includes('col') ? eRect.width : eRect.width / 2) + 'px'
                    this.$refs.ghost.style.height = (element.className.includes('row') ? eRect.height : eRect.height / 2) + 'px'

                    if (e.clientY > eRect.top + eRect.height / 2)
                        this.$refs.ghost.style.top = eRect.top + eRect.height / 2 + 'px'
                }

                // Get the rect and parent rect:
                var pRect = this.$refs.window.parentElement.getBoundingClientRect();
                var tgtRect = this.$refs.window.getBoundingClientRect();

                // Bound the window to its parent:
                if (tgtRect.left < pRect.left) this.$refs.window.style.left = pRect.left + 'px';
                if (tgtRect.top < pRect.top) this.$refs.window.style.top = pRect.top + 'px';
                
                if (tgtRect.bottom > pRect.bottom) this.$refs.window.style.top = pRect.bottom - tgtRect.height + 'px';
                if (tgtRect.right > pRect.right) this.$refs.window.style.left = pRect.right - tgtRect.width + 'px';
            }
        },

        // Event called when the mouse is up.
        onMouseUp(e) {
            if (e.button == 0 && this.$refs.window != null && this.dragging) {
                this.$refs.window.classList.remove('moving')
                // Disable dragging.
                this.dragging = false
                // Reset ghost.
                this.$refs.ghost.style.width = '0px'

                // Set the new window grid pos.
                const elements = document.elementsFromPoint(e.clientX, e.clientY);
                const element = elements.find(el => el.className.includes("grid-content"))
                var eRect = element.getBoundingClientRect();
                this.$refs.window.style.left = eRect.left + 'px';
                this.$refs.window.style.top = eRect.top - 20 + 'px';
                this.$refs.window.style.width = eRect.width + 'px';
                this.$refs.window.style.height = eRect.height + 'px';
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
    background-color: #22222200 !important;
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
    background-color: #121212;
    border: 1px solid blue;

    width: 100%;
    height: 20px;

    display: flex;
    flex-direction: row;
    justify-content: flex-end;
}

.body {
    background-color: #121212;
    border: 1px solid blue;

    width: 100%;
    height: auto;

    flex-grow: 1;
}

.moving {
    opacity: 0.5;
}

.ghost {
    position: absolute;

    background-color: red;
}

</style>
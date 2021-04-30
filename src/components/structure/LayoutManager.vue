<template v-if="config.content">

<div class="lm-indicator" />

<div ref="root" class="lm-root">
    <layout-item 
        v-for="(item, index) in config.content" 
        :key="index" 
        :config="item"
        :parent="config.type"
        :index="index"
        :length="config.content.length"
    />
</div>

</template>

<script>

import LayoutItem from './LayoutItem.vue'

export default {
    name: 'layout-manager',

    components: { LayoutItem },

    props: {
        config: Object
    },

    mounted() {
        window.addEventListener('resize', () => this.updateRect())
        this.updateRect()
        this.setupLayout()
    },

    methods: {
        setupLayout() {
            this.setupItem(this.$refs.root)
        },
        
        setupItem(item) {
            const childCount = item.parentElement.children.length

            if (item.classList.value.includes('lm-horizontal')) {
                var dragging = false;
                // On mouse down splitter
                item.addEventListener('mousedown', () => {
                    dragging = true
                })
                // On mouse drag splitter
                document.addEventListener('mousemove', e => {
                    if (dragging) {
                        item.style.left = e.clientX + 'px';
                        console.log('test')
                    }
                })
                // On mouse up splitter
                document.addEventListener('mouseup', () => {
                    dragging = false
                })

            } else if (item.classList.value.includes('lm-vertical')) {
                // On mouse down splitter
                item.addEventListener('mousedown', () => {

                })
            }

            if (childCount > 0) {
                for (let i = 0; i < item.children.length; i++) {
                    this.setupItem(item.children[i])
                }
            }
        },

        // Update all the rectangles.
        updateRect() {
            this.updateItemRect(this.$refs.root)
        },

        // Update the item rectangle.
        updateItemRect(item) {
            const barCount = Math.floor(item.parentElement.children.length / 2)
            const childCount = item.parentElement.children.length - barCount
            const pRect = item.parentElement.getBoundingClientRect()

            if (!item.classList.value.includes('lm-splitter')) {
                // If this item is in a row:
                if (item.parentElement.classList.value.includes('lm-row')) {
                    item.style.width = (pRect.width - barCount * 5) / childCount + 'px';
                    item.style.height = pRect.height + 'px';

                // If this item is in a column:
                } else if (item.parentElement.classList.value.includes('lm-column')) {
                    item.style.width = pRect.width + 'px';
                    item.style.height = (pRect.height - barCount * 5) / childCount + 'px';

                // Otherwise:
                } else {
                    item.style.width = pRect.width + 'px';
                    item.style.height = pRect.height + 'px';
                }
            } else {
                // If this item is in a row:
                if (item.parentElement.classList.value.includes('lm-row')) {
                    item.style.width = '5px';
                    item.style.height = pRect.height + 'px';

                // If this item is in a column:
                } else if (item.parentElement.classList.value.includes('lm-column')) {
                    item.style.width = pRect.width + 'px';
                    item.style.height = '5px';
                }
            }

            if (childCount > 0) {
                for (let i = 0; i < item.children.length; i++) {
                    this.updateItemRect(item.children[i])
                }
            }
        }
    }
}

</script>

<style>

@import '../../css/layout.css';

</style>
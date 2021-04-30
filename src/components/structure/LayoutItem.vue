<template>

<div class="lm-item"
    :class="{ 
        'lm-row': config.type == 'row',
        'lm-column': config.type == 'column',
        'lm-stack': config.type == 'stack' 
    }">
    
    <layout-item
        v-for="(item, index) in config.content" 
        :key="index" 
        :config="item"
        :parent="config.type"
        :index="index"
        :length="config.content.length"
    />
</div>

<div v-if="parent == 'row' && index != length - 1" class="lm-splitter lm-horizontal"></div>
<div v-if="parent == 'column' && index != length - 1" class="lm-splitter lm-vertical"></div>

</template>

<script>

export default {
    name: 'layout-item',

    props: {
        config: Object,
        parent: String,
        index: Number,
        length: Number
    }
}

</script>
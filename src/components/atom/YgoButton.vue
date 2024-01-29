<script setup>
const props = defineProps({
    color: { type:String, default: 'transparent' },
    clickEvent: Function,
    className: { type:String, default: '' },
    disabled: { type:Boolean, default: false },
});

const btnClass = ( [ 'teal', 'transparent', 'gray', 'red', 'darkgray' ].includes(props.color) ? props.color : '' )
                + ( props.color !== '' ? ' ' : '') + props.className;
</script>

<template>
    <button class="ygo-button" :class="btnClass" :disabled="disabled" @click="clickEvent">
        <slot />
    </button>
</template>

<style lang="scss" scoped>
    $bg-teal: var(--primary1);
    $teal: var(--button-text);
    $bg-teal-hover: var(--primary2);

    $bg-transparent: transparent;
    $transparent: var(--text1);
    $bg-transparent-hover: var(--slight-layer);

    $bg-gray: var(--bg-element4);
    $gray: var(--text1);
    $bg-gray-hover: var(--prism-code-1);

    $bg-red: var(--destructive1);
    $red: var(--button-text);
    $bg-red-hover: var(--destructive2);

    $bg-darkgray: var(--bg-element9);
    $darkgray: var(--button-text);
    $bg-darkgray-hover: var(--prism-code-1);

    @mixin button-color($color, $bg-color, $bg-color-hover) {
        background: $bg-color;
        color: $color;

        &:hover {
            background: $bg-color-hover;
            cursor: pointer;
        }
    }

    .ygo-button {
        display: inline-flex;
        -webkit-box-align: center;
        align-items: center;
        -webkit-box-pack: center;
        justify-content: center;
        height: 2rem;
        padding: 0 1.25rem;

        outline: none;
        border: none;
        border-radius: 4px;
        font-size: 1rem;
        font-weight: bold;

        &.teal {
            @include button-color($teal, $bg-teal, $bg-teal-hover);
        }

        &.transparent {
            @include button-color($transparent, $bg-transparent, $bg-transparent-hover);
        }

        &.gray {
            @include button-color($gray, $bg-gray, $bg-gray-hover);
        }

        &.red {
            @include button-color($red, $bg-red, $bg-red-hover);
        }

        &.darkgray {
            @include button-color($darkgray, $bg-darkgray, $bg-darkgray-hover);
        }
    }
</style>

<script>

    import {createEventDispatcher} from "svelte";

    let clickedAnimation = false;
    export function flash() {
        clickedAnimation = true;
        setTimeout(() => {clickedAnimation = false}, 100);
    }

    const dispatch = createEventDispatcher();

    let klass = "";
    export { klass as class };
    export let style = "";

    const onClick = (e) => {
        dispatch("click", e);
    }

</script>

<div class={`transition-shadow shadow-gray-600 dark:shadow-white relative overflow-hidden ${klass}`} style={style}
     class:shadow-key={clickedAnimation} class:shadow-none={!clickedAnimation}
     class:duration-0={clickedAnimation} class:duration-700={!clickedAnimation}
     on:click={onClick}>
    <div class="w-full h-full opacity-40 transition-colors absolute"
         class:bg-white={clickedAnimation} class:bg-transparent={!clickedAnimation}
         class:duration-0={clickedAnimation} class:duration-700={!clickedAnimation} >
    </div>
    <slot></slot>
</div>
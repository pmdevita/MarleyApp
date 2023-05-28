<script>
    import { createEventDispatcher } from 'svelte';

    const dispatch = createEventDispatcher();
    const click = (event) => {
        dispatch('click', event);
    }

</script>
<button class="border-1 rounded-lg border-solid transition-[border] hover:border-blue-500 px-5 py-2.5
               bg-gray-50 dark:bg-gray-900 focus:outline-2 focus-visible:outline-2 mx-1 my-0.5" on:click={click}><slot></slot></button>
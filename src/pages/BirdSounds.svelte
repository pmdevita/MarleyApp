<script>
    import NorthCardPhoto from "../img/northern_cardinal.jpg";
    import NorthCardAudio from "../sound/northern_cardinal.mp3"
    import TuftedPhoto from "../img/tufted_titmouse.jpg";
    import TuftedAudio from "../sound/tutfted_titmouse.mp3";

    import {BUTTON_PAGES} from "../config.js";

    export let config;

import BirdButton from "../lib/BirdButton.svelte";
</script>
<div class="flex w-full h-full items-end">
    {#each config.buttons as button}
        {#await button.image}
        {:then image}
            {#await button.sound}
            {:then sound}
                <BirdButton image={image.default} sound={sound.default}/>
            {/await}
        {/await}
    {/each}
</div>
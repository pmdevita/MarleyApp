<script>
    import Xylophone from "./pages/Xylophone.svelte";
    import BirdSounds from "./pages/BirdSounds.svelte";
    import Button from "./js/components/Button.svelte";
    import {BUTTON_PAGES} from "./config.js";

    const Instruments = {
        XYLOPHONE: "Xylophone",
        BIRD_SOUNDS: "Bird sounds"
    }

    let instrument = Instruments.XYLOPHONE;
    let buttonPageConfig;

    const setButtonPage = (config) => {
        instrument = Instruments.BIRD_SOUNDS;
        buttonPageConfig = config;
    }

</script>
<div class="relative w-full h-full flex items-center justify-center select-none">
    <div class="absolute left-0 top-0">
        <Button on:click={() => instrument = Instruments.XYLOPHONE}>Xylophone</Button>{#each BUTTON_PAGES as buttonPage}<Button on:click={() => setButtonPage(buttonPage)}>{buttonPage.name}</Button>{/each}
    </div>
    {#if (instrument === Instruments.XYLOPHONE)}
        <Xylophone/>
    {/if}
    {#if (instrument === Instruments.BIRD_SOUNDS)}
        <BirdSounds config={buttonPageConfig}/>
    {/if}
</div>
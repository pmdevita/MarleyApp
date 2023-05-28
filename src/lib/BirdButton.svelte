<script>
    import {onDestroy} from "svelte";
    import FlashButton from "../js/components/FlashButton.svelte";

    export let image;
    export let sound;

    let flashbutton;

    let audio = new Audio(sound);

    const playSound = () => {
        if (!audio.paused) {
            return;
        }
        audio.play();
        flashbutton.flash();
    }

    onDestroy(() => {
        audio.pause();
    })

</script>
<FlashButton bind:this={flashbutton} class="h-32 w-32 aspect-square m-4 rounded-xl" on:click={playSound}>
    <div class="h-full w-full rounded-xl overflow-hidden">
        <img class="w-full h-full object-cover block" src={image} alt="bird button">
    </div>
</FlashButton>
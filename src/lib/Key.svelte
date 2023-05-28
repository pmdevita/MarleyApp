<script>
    import { onMount, onDestroy } from "svelte";
    import {fullConfig, keyColors} from "../utils.js";
    import KeyClickHook from "./KeyClickHook.js";
    import {writable} from "svelte/store";
    import FlashButton from "../js/components/FlashButton.svelte";
    let ref;
    export let keyNum;
    export let numOfKeys;
    export let playNote;
    export let parentRef;
    let clickedAnimation = false;

    let colorKey;
    $: colorKey = keyColors[keyNum % keyColors.length]
    let keyHeight;
    $: keyHeight = 50 * Math.log10(((numOfKeys - keyNum) + 2) * 1.5)

    let flashbutton;

    let parentRefStore = writable(parentRef);
    let refStore = writable(ref);
    $: parentRefStore.set(parentRef);
    $: refStore.set(ref ? ref.children[0] : undefined)

    let [startNote, endNote] = KeyClickHook(parentRefStore, refStore);

    startNote(() => {
        playNote(keyNum);
        flashbutton.flash();
    })

    endNote(() => {

    })

</script>
<div bind:this={ref} class="flex-1 m-4 h-full rounded-xl flex items-center">
    <FlashButton bind:this={flashbutton} class="bg-blue-400 h-full w-full rounded-xl overflow-hidden flex items-center py-2.5"
                 style={`height: ${keyHeight}%; background: ${colorKey};`}>
        <div class="mx-2.5 border-4 border-gray-600 w-full h-full rounded-xl">

        </div>
    </FlashButton>
</div>

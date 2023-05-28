<script>
  import Key from "../lib/Key.svelte";
  import { Soundfont } from "smplr";
  import MarimbaSounds from "../midi/xylophone-mp3.js?url";
  import {diatonicScale} from "../utils.js";

  let ref;

  let numOfKeys = 8;
  let keyWidth;
  $: keyWidth = (100 - 10) / numOfKeys;

  let audioContext;
  let marimba;

  const play = (num) => {
    if (!audioContext) {
      audioContext = new window.AudioContext();
      let instrumentURL = MarimbaSounds;
      if (!instrumentURL.startsWith("http")) {
        instrumentURL = window.location.origin + instrumentURL;
      }
      marimba = new Soundfont(audioContext, {instrument: instrumentURL});
      return;
    }
    let noteNum = diatonicScale[num % diatonicScale.length] + Math.floor(num / diatonicScale.length) * (diatonicScale[diatonicScale.length - 1] + 1);
    marimba.start({note: 72 + noteNum});
  }

</script>

<div bind:this={ref} class="w-full h-full flex items-center justify-center select-none">
  {#each {length: numOfKeys} as _, i}
    <Key keyNum={i} numOfKeys={numOfKeys} playNote={play} parentRef={ref}/>
  {/each}
</div>


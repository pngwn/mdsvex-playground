<script>
  import { typewriter } from "./typewriter.js";

  import Penguin from "./Penguin.svelte";
  export let heading;
  export let paragraph;
  export let penguin;
  export let walk;
</script>

<style>
  .container {
    text-align: center;
    font-family: sans-serif;
    height: 30rem;
    margin-top: 10rem;
  }

  h1 {
    font-weight: 100;
    font-size: 8rem;
    margin-bottom: 0;
    margin: 0;
    font-family: "Roboto";
  }

  p {
    margin: 1rem 0;
    font-size: 2.5rem;
    font-weight: 300;
    font-family: "Catamaran";
  }
</style>

<div class="container">
  {#if heading.value}
    <h1 in:typewriter={{ delay: heading.l * 100, speed: 100 }}>
      {heading.value}
    </h1>
  {/if}

  {#if paragraph.value}
    <p in:typewriter={{ delay: paragraph.l * 100, speed: 100 }}>
      {paragraph.value}
    </p>
  {/if}

  {#if penguin}
    <Penguin {walk} />
  {/if}
</div>

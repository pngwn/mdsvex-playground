<script>
  import { onMount } from "svelte";
  import Repl from "../components/Repl/Repl.svelte";
  import { code_1, code_2, code_3, code_4, code_5 } from "./_source.js";

  let repl;
  let checked;
  let width;

  $: is_mobile = width < 750;

  onMount(() => {
    repl.set({
      components: [
        {
          type: "svx",
          name: "App",
          source: code_1,
        },
        {
          type: "svelte",
          name: "Boinger",
          source: code_2,
        },
        {
          type: "svx",
          name: "Section",
          source: code_3,
        },
        {
          type: "svelte",
          name: "Count",
          source: code_4,
        },
        {
          type: "svelte",
          name: "Seriously",
          source: code_5,
        },
      ],
    });
  });
</script>

<style>
  .outer {
    position: absolute;
    top: 80px;
    left: 50px;
    right: 50px;
    bottom: 50px;
    margin: auto;
    border-radius: 5px;
    overflow: hidden;
    box-shadow: 0 0 10px 3px rgba(0, 0, 0, 0.2);
  }

  .inner {
    height: 100%;
    width: 100%;
  }

  .mobile .inner {
    width: 200%;
    height: calc(100% - 42px);
    transition: transform 0.3s;
  }

  .mobile .offset {
    transform: translate(-50%, 0);
  }

  .input-output-toggle {
    display: grid;
    position: absolute;
    user-select: none;
    grid-template-columns: 1fr 40px 1fr;
    grid-gap: 0.5em;
    align-items: center;
    width: 100%;
    height: 42px;
    border-top: 1px solid var(--second);
  }
  input {
    display: block;
  }
  span {
    color: #ccc;
  }
  .active {
    color: #555;
  }
</style>

<svelte:window bind:innerWidth={width} />

<div class="outer" class:mobile={is_mobile}>
  <div class="inner" class:offset={checked}>
    <Repl workersUrl="/workers" bind:this={repl} fixed={is_mobile} />
  </div>

  {#if is_mobile}
    <label class="input-output-toggle">
      <span class:active={!checked} style="text-align: right">input</span>
      <input type="checkbox" bind:checked />
      <span class:active={checked}>output</span>
    </label>
  {/if}
</div>

<script>
  import { onMount } from "svelte";
  import Repl from "../components/Repl/Repl.svelte";
  import { code_1, code_2, code_3, code_4, code_5 } from "./_source.js";

  let repl;

  onMount(() => {
    repl.set({
      components: [
        {
          type: "svx",
          name: "App",
          source: code_1
        },
        {
          type: "svelte",
          name: "Boinger",
          source: code_2
        },
        {
          type: "svx",
          name: "Section",
          source: code_3
        },
        {
          type: "svelte",
          name: "Count",
          source: code_4
        },
        {
          type: "svelte",
          name: "Seriously",
          source: code_5
        }
      ]
    });
  });
</script>

<style>
  div {
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
</style>

<div>
  <Repl workersUrl="/workers" bind:this={repl} />
</div>

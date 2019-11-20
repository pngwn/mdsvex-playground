<script>
  import Nav from "../components/Nav.svelte";
</script>

<style>
  main {
    height: 100vh;
    overflow: hidden;
  }
</style>

<Nav />

<main>
  <slot />
</main>

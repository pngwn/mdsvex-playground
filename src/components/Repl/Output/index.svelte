<script>
  import { getContext, onMount } from "svelte";
  import SplitPane from "../SplitPane.svelte";
  import Viewer from "./Viewer.svelte";
  import PaneWithPanel from "./PaneWithPanel.svelte";
  import CompilerOptions from "./CompilerOptions.svelte";
  import Compiler from "./Compiler.js";
  import CodeMirror from "../CodeMirror.svelte";
  import { is_browser } from "../env.js";

  const { register_output } = getContext("REPL");

  export let svelteUrl;
  export let workersUrl;
  export let status;
  export let sourceErrorLoc = null;
  export let runtimeError = null;
  export let embedded = false;
  export let relaxed = false;
  export let injectedJS;
  export let injectedCSS;
  export let funky = false;

  let foo; // TODO workaround for https://github.com/sveltejs/svelte/issues/2122

  register_output({
    set: async (selected, options) => {
      if (selected.type === "js") {
        js_editor.set(`/* Select a component to see its compiled code */`);
        css_editor.set(`/* Select a component to see its compiled code */`);
        return;
      }

      const compiled = await compiler.compile(selected, options);
      if (!js_editor) return; // unmounted

      js_editor.set(compiled.js, "js");
      css_editor.set(compiled.css, "css");
    },

    update: async (selected, options) => {
      if (selected.type === "js") return;

      const compiled = await compiler.compile(selected, options);
      if (!js_editor) return; // unmounted

      js_editor.update(compiled.js);
      css_editor.update(compiled.css);
    }
  });

  const compiler = is_browser && new Compiler(workersUrl, svelteUrl);

  // refs
  let viewer;
  let js_editor;
  let css_editor;
  const setters = {};

  let view = "result";
</script>

<style>
  .tab-content {
    position: absolute;
    width: 100%;
    height: 100% !important;
    opacity: 0;
    pointer-events: none;
  }

  .tab-content.visible {
    /* can't use visibility due to a weird painting bug in Chrome */
    opacity: 1;
    pointer-events: all;
  }
</style>

<div class="tab-content" class:visible={view === 'result'}>
  <Viewer
    {funky}
    bind:this={viewer}
    bind:error={runtimeError}
    {status}
    {relaxed}
    {injectedJS}
    {injectedCSS} />
</div>

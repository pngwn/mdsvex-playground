<script>
  import { stores } from "@sapper/app";
  import { onMount } from "svelte";
  import docs from "./_docs.svtext";
  import Cheatsheet from "../components/Cheatsheet.svx";

  let root;
  let scrollY = 0;
  let current;
  let position = "";

  const { page } = stores();

  const nav = [
    ["Install", "docs#install-it"],
    ["Use", "docs#use-it"],
    [
      "Options",
      "docs#options",
      [
        ["extension", "docs#extension", true],
        ["smartypants", "docs#smartypants", true],
        ["layout", "docs#layout", true],
        ["remarkPlugins", "docs#remarkplugins--rehypeplugins", true],
        ["rehypePlugins", "docs#remarkplugins--rehypeplugins", true],
        ["highlight", "docs#highlight", true],
        ["frontmatter", "docs#frontmatter", true]
      ]
    ],
    [
      "Layouts",
      "docs#layouts",
      [
        ["named layouts", "docs#named-layouts", false],
        ["disabling layouts", "docs#disabling-layouts", false],
        ["custom components", "docs#custom-components", false]
      ]
    ],
    ["Frontmatter", "docs#frontmatter-1"],
    ["Limitations", "docs#limitations"]
  ];

  $: root && scrollY && calculate_positions();

  function remove_origin(href) {
    const re = new RegExp(`http(s*)://${$page.host}/`);
    return href.replace(re, "");
  }

  function calculate_positions() {
    if (root.getBoundingClientRect().top >= 0) {
      position = "absolute";
    } else {
      position = "fixed";
    }

    const nodes = Array.from(root.children).filter(
      v => v.tagName === "H2" || v.tagName === "H3"
    );
    const last = nodes.length - 1;

    if (root.getBoundingClientRect().bottom === window.innerHeight) {
      current = "docs" + remove_origin(nodes[last].children[0].href);
      return;
    }

    for (let node of nodes) {
      const { top } = node.getBoundingClientRect();
      if (top > 5) {
        break;
      }
      current = "docs" + remove_origin(node.children[0].href);
    }
  }

  // somebody save me

  onMount(() => {
    if (window !== undefined && window.location.hash) {
      const el = document.getElementById(window.location.hash.replace("#", ""));
      el && el.scrollIntoView();
    }

    calculate_positions();
  });
</script>

<style>
  nav {
    padding: 20px 30px;
    width: 300px;
    top: 0;
    height: calc(100% - 70px);
    overflow-y: scroll;
    margin-top: 40px;
  }

  ul {
    list-style-type: none;
  }

  li {
    margin: 30px 0px;
    position: relative;
    text-transform: uppercase;
    font-weight: bold;
    font-family: "lato-bold-sub";
  }

  ul > li > ul > li {
    margin: 10px 0px;
    text-transform: none;
    font-weight: 400;
    font-family: "lato-sub";
  }

  a {
    text-decoration: none;
    border: none;
    color: #777;
    margin-left: 25px;
  }

  a code {
    position: relative;
    border-radius: 0.3rem;
    white-space: nowrap;
    color: #777;
    -webkit-font-smoothing: initial;
    background: #eee;
    padding: 3px 6px 0 6px !important;
    transition: 0.3s;
    font-family: "fira-full";
    font-size: 1.4rem;
  }

  a:hover,
  a:hover code,
  a.active {
    color: #000;
  }

  a:hover code {
    background: #ccc;
  }

  a.active {
    font-weight: bold;
  }

  a.active code {
    background: #333;
    color: #eee;
  }

  article :global(h1) {
    margin-bottom: 46px;
    font-family: "roboto-sub";
    font-weight: 100;
    font-size: 6rem;
  }

  article :global(h2) {
    margin: 5rem 0 3rem 0;
    border-bottom: 1px solid #ccc;
    font-family: "roboto-bold-full";
  }

  article :global(h3) {
    margin-bottom: 2rem;
    margin-top: 3rem;
    font-family: "roboto-bold-full";
  }

  article :global(h4) {
    margin-top: 2rem;
    margin-bottom: 2rem;
    font-family: "roboto-bold-full";
  }

  article :global(p) {
    font-family: "roboto-full";
  }

  article :global(code) {
    font-family: "fira-full";
    position: relative;
    border-radius: 0.3rem;
    color: #333;
    -webkit-font-smoothing: initial;
    background: #eee;
    padding: 1px 4px 0;
    white-space: pre;
    word-spacing: normal;
    word-break: normal;
    word-wrap: normal;
  }

  article :global(pre code) {
    white-space: pre;
    background: none;
    color: #cbccc6;
    padding: 0;
    white-space: pre;
    word-spacing: normal;
    word-break: normal;
    word-wrap: normal;
    tab-size: 2rem;
  }

  article :global(pre) {
    background: #1f2430;
    color: #cbccc6;
    border-radius: 3px;
    padding: 1rem 2rem;
    margin: 0rem 0 4rem 0;
    font-size: 1.4rem;
    white-space: pre;
    word-spacing: normal;
    word-break: normal;
    word-wrap: normal;
    line-height: 2.5rem;
  }

  article :global(blockquote) {
    border: 1px solid #bebebe;
  }

  article :global(blockquote p) {
    color: #222;
    font-size: 1.8rem;
  }

  article :global(h3 code) {
    font-size: 2.2rem;
    /* background: none; */
  }

  article :global(h4 code) {
    font-size: 1.8rem;
    margin-bottom: 2rem;
  }

  article :global(pre.language-sig) {
    display: inline-block;
    padding: 2px 7px 2px;
    margin: 20px 0 0 0;
  }

  article :global(a) {
    color: #777;
    border-bottom: 1px solid #999;
  }

  article :global(a:hover) {
    color: #333;
    border-bottom: 1px solid #333;
  }

  article :global(h1 a),
  article :global(h2 a),
  article :global(h3 a),
  article :global(h4 a) {
    display: block;
    height: 100%;
    width: 0;
    padding-top: 30px;
  }

  .mini {
    text-transform: lowercase;
    margin: 0;
    font-family: "fira-full";
    font-weight: normal;
    font-size: 1.6rem;
  }

  @media (max-width: 930px) {
    article {
      width: 100%;
      max-width: 100%;
      margin-left: 0;
      margin-top: 20px;
    }

    article :global(h1) {
      text-align: center;
    }

    nav {
      transform: translateX(-300px);
    }
  }

  .container {
    display: grid;
    grid-template-columns: repeat(12, 1fr);
    grid-template-rows: 1fr;
    grid-gap: 30px;
    margin-top: 60px;
  }

  article {
    grid-column: 5 / span 8;
    max-width: 100%;
    min-width: 0;
  }
</style>

<svelte:window bind:scrollY />

<main>
  <Cheatsheet />
  <div style="position: relative;">

    {#if position}
      <nav style="position: {position};">
        <ul>

          {#each nav as [title, href, children]}
            <li class={children ? 'solo' : 'solo'}>
              <a
                class:active={current === href}
                {href}
                on:click={() => (current = href)}>
                {title}
              </a>
              {#if children}
                <ul>
                  {#each children as [child_title, child_link, is_code]}
                    <li>
                      {#if is_code}
                        <a
                          class:active={current === child_link}
                          href={child_link}>
                          <code>{child_title}</code>
                        </a>
                      {:else}
                        <a
                          class:active={current === child_link}
                          href={child_link}>
                          {child_title}
                        </a>
                      {/if}
                    </li>
                  {/each}
                </ul>
              {/if}
            </li>
          {/each}
          <li class="mini">
            <a href="/playground">playground</a>
          </li>
          <li class="mini">
            <a href="https://www.github.com/pngwn/mdsvex">github</a>
          </li>
        </ul>
      </nav>
    {/if}

    <div class="container">
      <article bind:this={root}>
        <slot />
        {@html docs}
      </article>
    </div>
  </div>
</main>

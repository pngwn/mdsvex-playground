<script>
  import { stores } from "@sapper/app";
  import { onMount } from "svelte";
  import docs from "./_docs.svexy";

  let root;
  let scrollY = 0;
  let current;

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
        ["remarkPlugins", "docs#remarkplugins", true],
        ["rehypePlugins", "docs#rehypeplugins", true],
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
    return href.replace(`http://${$page.host}/`, "");
  }

  function calculate_positions() {
    if (window.innerHeight + scrollY >= root.offsetHeight) {
      for (let i = root.children.length - 1; i >= 0; i--) {
        const tag = root.children[i].tagName;
        if (tag === "H2" || tag === "H3") {
          current = "docs" + remove_origin(root.children[i].children[0].href);
          break;
        }
      }

      return;
    }

    current = "docs" + remove_origin(root.children[0].children[0].href);
    const last = root.children.length - 1;

    for (let node of root.children) {
      const tag = node.tagName;

      if (tag === "H2" || tag === "H3") {
        const { top } = node.getBoundingClientRect();
        if (top > 5) {
          break;
        }
        current = "docs" + remove_origin(node.children[0].href);
      }
    }
  }

  // somebody save me

  onMount(() => {
    if (window !== undefined && window.location.hash) {
      document
        .getElementById(window.location.hash.replace("#", ""))
        .scrollIntoView();
    }
  });
</script>

<style>
  main {
    display: flex;
  }

  nav {
    padding: 20px 30px;
    width: 300px;
    position: fixed;
    height: calc(100% - 140px);
    overflow-y: scroll;
    margin-top: 140px;
  }

  ul {
    list-style-type: none;
  }

  li {
    margin: 30px 0px;
    position: relative;
    text-transform: uppercase;
    font-weight: 600;
  }

  ul > li > ul > li {
    margin: 10px 0px;
    text-transform: none;
    font-weight: 400;
  }

  a {
    text-decoration: none;
    border: none;
    color: #777;
    font-family: "Lato";
    margin-left: 25px;
  }

  a code {
    position: relative;
    border-radius: 0.3rem;
    white-space: nowrap;
    color: #777;
    -webkit-font-smoothing: initial;
    background: #eee;
    padding: 3px 6px;
    transition: 0.3s;
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

  article {
    margin-top: 50px;
    padding: 20px;
    max-width: 70rem;
    margin-left: 300px;
  }

  article :global(h1) {
    margin-bottom: 46px;
    font-family: Roboto;
    font-weight: 100;
    font-size: 6rem;
  }

  article :global(h3) {
    margin-bottom: 2rem;
    margin-top: 3rem;
  }

  article :global(h4) {
    margin-top: 2rem;
    margin-bottom: 2rem;
  }

  article :global(p) {
    font-family: "Roboto";
  }

  article :global(code),
  a code {
    font-family: "Fira Mono";
    position: relative;
    border-radius: 0.3rem;
    color: #333;
    -webkit-font-smoothing: initial;
    background: #eee;
    padding: 3px 6px;
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

  article :global(h2) {
    margin: 5rem 0 3rem 0;
    border-bottom: 1px solid #ccc;
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
    padding: 2px 7px 1px;
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
</style>

<svelte:window bind:scrollY />

<main>
  <nav>
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
                    <a class:active={current === child_link} href={child_link}>
                      <code>{child_title}</code>
                    </a>
                  {:else}
                    <a class:active={current === child_link} href={child_link}>
                      {child_title}
                    </a>
                  {/if}
                </li>
              {/each}
            </ul>
          {/if}
        </li>
      {/each}
    </ul>
  </nav>

  <article bind:this={root}>
    <slot />
    {@html docs}
  </article>
</main>

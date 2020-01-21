<script>
  export let nav;
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

  /* ul > li > ul {
    margin-left: 20px;
  } */

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
  }

  a:hover,
  a:hover code {
    color: #000;
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
    margin-top: 5rem;
  }

  article :global(h4) {
    margin-top: 4rem;
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
    margin: 7rem 0 3rem 0;
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
</style>

<main>
  <nav>
    <ul>
      {#each nav as [title, href, children]}
        <li class={children ? 'solo' : 'solo'}>
          <a {href}>{title}</a>
          {#if children}
            <ul>
              {#each children as [child_title, child_link, is_code]}
                <li>
                  {#if is_code}
                    <a href={child_link}>
                      <code>{child_title}</code>
                    </a>
                  {:else}
                    <a href={child_link}>{child_title}</a>
                  {/if}
                </li>
              {/each}
            </ul>
          {/if}
        </li>
      {/each}
    </ul>
  </nav>

  <article>
    <slot />
  </article>
</main>

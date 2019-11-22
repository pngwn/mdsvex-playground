<script>
  export let nav;

  console.log(nav);
</script>

<style>
  main {
    display: flex;
  }

  nav {
    padding: 20px 30px;
    width: 300px;
    position: fixed;
    height: 100%;
    overflow-y: scroll;
    padding-top: 164px;
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

  article :global(*) {
    font-family: "Roboto";
  }

  article :global(code),
  a code {
    font-family: "Fira Mono";
    position: relative;
    border-radius: 0.3rem;
    white-space: nowrap;
    color: #333;
    -webkit-font-smoothing: initial;
    background: #eee;
    padding: 3px 6px;
  }

  article :global(pre code) {
    white-space: pre;
    background: none;
    color: #eee;
    padding: 0;
  }

  article :global(pre) {
    background: #333;
    color: #eee;
    border-radius: 3px;
    padding: 1rem 2rem;
    margin: 0rem 0 4rem 0;
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

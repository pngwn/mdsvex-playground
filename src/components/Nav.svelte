<script>
  import GithubIcon from "./GithubIcon.svelte";
</script>

<style>
  nav {
    position: absolute;
    top: 0;
    right: 0;
  }

  ul {
    list-style: none;
    display: flex;
    justify-content: flex-end;
    padding: 10px;
  }

  li {
    margin: 0 10px;
  }

  a {
    border: none;
    font-weight: 300;
    color: #333;
    font-family: "Roboto";
    display: flex;
    align-items: center;
  }

  a:hover {
    text-decoration: underline;
    border: none;
    color: #000;
  }

  a :global(svg) {
    margin: 5px 5px 0 0;
    width: 20px;
    height: 20px;
    opacity: 0.8;
  }

  a:hover :global(svg) {
    opacity: 1;
  }
</style>

<nav>
  <ul>
    <li>
      <a href="docs">docs</a>
    </li>
    <li>
      <a href="playground">try</a>
    </li>
    <li>
      <a
        title="link to github repository"
        href="https://www.github.com/pngwn/mdsvex">
        <GithubIcon />
      </a>
    </li>
  </ul>
</nav>

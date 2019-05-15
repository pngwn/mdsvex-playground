<script>
  import Repl from "../components/Repl/Repl.svelte";
  import { onMount } from "svelte";
  let repl;

  // console.log(mdsvex().markup({ content: "# hello", filename: "thing.svexy" }));
  const code_1 = `---
title: Svex up your markdown
count: 25
color: cadetblue
list: [1, 2, 3, 4, "boo"]

---

\`\`\`js exec
	import Boinger from './Boinger.svelte';
	import Section from './Section.svexy';
	import Count from './Count.svelte';
	import Seriously from './Seriously.svelte';

	let number = 45;
\`\`\`

# { _fm.title }

## Good stuff in your markdown

Markdown is pretty good but sometimes you just need more.

Sometimes you need a boinger like this:

<Boinger color="{_fm.color}"/>

Not many people have a boinger right in their markdown.

## Markdown in your markdown

Sometimes what you wrote last week is so good that you just *have* to include it again.

I'm not gonna stand in the way of your egomania.

>
><Section />
> <Count />
>
>— *Me, May 2019*

Yeah, thats right you can put wigdets in markdown (\`.svexy\` files or otherwise). You can put markdown in widgets too.

<Seriously>
	
### I wasn't joking
	
\`\`\`
	This is real life
\`\`\`
	
</Seriously>

Sometimes you need your widgets **inlined** (like this:<Count count="{number}"/>) because why shouldn't you.

Obviously you have access to values defined in YAML (namespaced under \`_fm\`) and anything defined in an fenced \`js exec\` block can be referenced directly.

Normal markdown stuff works too:

- Like
- This
- List
- Here

And *this* and **THIS**. And other stuff. You can't use \`each\` blocks. Don't try, it wont work.

`;

  const code_2 = `

<script>
	import { flip } from 'svelte/animate';
	import { crossfade, scale } from 'svelte/transition';
	export let color = 'pink';
	const [send, receive] = crossfade({fallback: scale})
	
	let boingers = [
		{val: 1, boinged: true},
		{val: 2, boinged: true},
		{val: 3, boinged: false},
		{val: 4, boinged: true},
		{val: 5, boinged: false}
	];
	
	function toggleBoing (id){
		const index = boingers.findIndex(v => v.val === id);
		boingers[index].boinged = !boingers[index].boinged
	}
<\/script>
<div class="container">
	<div class="boingers">
		{#each boingers.filter(v => !v.boinged) as {val} (val)}
			<div animate:flip 
					 in:receive="{{key: val}}"
					 out:send="{{key: val}}"
					 style="background:{color};"
					 on:click="{() => toggleBoing(val)}">{val}</div>
		{/each}
	</div>
	
	<div class="boingers">
		{#each boingers.filter(v => v.boinged) as {val} (val)}
			<div animate:flip 
					 in:receive="{{key: val}}"
					 out:send="{{key: val}}"
					 style="background:{color};"
					 on:click="{() => toggleBoing(val)}">{val}</div>
		{/each}
	</div>
</div>

<style>
	.container {
		width: 300px;
		height: 200px;
		display: flex;
		justify-content: space-between; 
	}
	.boingers {
		display: grid;
		grid-template-rows: repeat(3, 1fr);
		grid-template-columns: repeat(2, 1fr);
		grid-gap: 10px;
			
			
	}
	.boingers div {
		
		width: 50px;
		height: 50px;
		display: flex;
		justify-content: center;
		align-items: center;
		color: #eee;
		font-weight: bold;
		border-radius: 2px;
		cursor: pointer;
	}
</style>



`;


  const code_3 = `# What i wrote last week

Why am i so smart, how is this possible.
`;
const code_4 = `
<script>
	export let count = 0;
<\/script>

<span class="outer">
	<button on:click="{() => count = count - 1}">-</button>
	<span class="inner">{count}</span>
	<button on:click="{() => count = count + 1}">+</button>
</span>

<style>
	.outer {
		background: darkorange;
		height: 20px;
		font-size: 12px;
		display: inline-flex;
		justify-content: space-between;
		align-items: center;
		transform: translateY(-1px);
		margin: 0 5px;
		border-radius: 3px;
		width: 65px;
		box-shadow: 0 3px 15px 1px rgba(0,0,0,0.3)
	}
	.inner {
		margin: 0 0px;
	}
	button {
		height: 20px;
		padding: 0px 7px 1px 7px;
		margin: 0;
		border: none;
		background: none;
		color: #eee;
		font-weight: bold;
		cursor: pointer;
	}
</style>
`
const code_5 = `
<div><slot></slot></div>

<style>
	div {
		background: pink;
		border: 23px solid orange;
		padding: 0 15px;
		width: 400px;
		text-align: center;
		transform: translateX(-200px);
		animation: 2s slide infinite alternate ease-in-out;
	}
	
	@keyframes slide {
		from {
			transform: translateX(-200px)
		}
		to {
			transform: translateX(200px)
		}
		
	}
</style>
`

  onMount(() => {
    repl.set({
      components: [
        {
          type: "svexy",
          name: "App",
          source: code_1
        },
        {
          type: "svelte",
          name: "Boinger",
          source: code_2
        },
        {
          type: "svexy",
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
  .container {
    width: 300px;
    height: 200px;
    display: flex;
    justify-content: space-between;
  }
  .boingers {
    display: grid;
    grid-gap: 10px;
    grid-template-rows: repeat(3, 1fr);
    grid-template-columns: repeat(2, 1fr);
  }

  .boingers div {
    width: 50px;
    height: 50px;
    background: cadetblue;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #eee;
    border-radius: 2px;
  }
</style>

<Repl bind:this={repl} />

<script>
  import { onMount } from "svelte";
  import Input from "../components/Input.svelte";
  import Output from "../components/Output.svelte";

  const _input = [
    [
      { color: "green", text: "#", l: 0 },
      { color: "green", text: " mdsvex", l: 1 }
    ],
    [{ color: "grey", text: "svelte in markdown ", l: 0 }],
    [
      { color: "teal", text: "<", l: 0 },
      { color: "blue", text: "Penguin", l: 1 },
      { color: "teal", text: " />", l: 8 }
    ]
  ];

  const _heading = "mdsvex";
  const _paragraph = "svelte in markdown";
  const _penguin = false;

  let input = [];
  let heading = { value: "", l: 2 };
  let paragraph = { value: "", l: 0 };
  let penguin = false;
  let walk = false;

  const wait = t => new Promise(res => setTimeout(res, t));

  onMount(async () => {
    await wait(1000);
    input = [...input, _input[0]];
    heading.value = _heading;
    await wait(1000);
    input = [...input, _input[1]];
    paragraph.value = _paragraph;
    await wait(2500);
    input = [...input, _input[2]];
    await wait(1100);
    penguin = true;
    await wait(100);
    input[2] = [
      input[2][0],
      input[2][1],
      { color: "yellow", text: " walk", l: 8 },
      { color: "red", text: "=", l: 13 },
      { color: "teal", text: "{", l: 14 },
      { color: "orange", text: "true", l: 20 },
      { color: "teal", text: "}", l: 15 },
      { color: "teal", text: " />", l: 8 }
    ];
    await wait(3000);
    walk = true;
  });
</script>

<!-- <script>
  import Repl from "../components/Repl/Repl.svelte";
  import { onMount } from "svelte";
  import { mdsvex } from "mdsvex";

  console.log();
  let repl;

  async function run() {
    let x = await mdsvex().markup({ content: "# hello", filename: "hi.svexy" });

    console.log(x);
  }

  run();

  // console.log(mdsvex().markup({ content: "# hello", filename: "thing.svexy" }));
  //   const code_1 = `---
  // title: Svex up your markdown
  // count: 25
  // color: cadetblue
  // list: [1, 2, 3, 4, "boo"]

  // ---

  // \`\`\`js exec
  // 	import Boinger from './Boinger.svelte';
  // 	import Section from './Section.svexy';
  // 	import Count from './Count.svelte';
  // 	import Seriously from './Seriously.svelte';

  // 	let number = 45;
  // \`\`\`

  // # { _metadata.title }

  // ## Good stuff in your markdown

  // Markdown is pretty good but sometimes you just need more.

  // Sometimes you need a boinger like this:

  // <Boinger color="{_metadata.color}"/>

  // Not many people have a boinger right in their markdown.

  // ## Markdown in your markdown

  // Sometimes what you wrote last week is so good that you just *have* to include it again.

  // I'm not gonna stand in the way of your egomania.

  // >
  // ><Section />
  // > <Count />
  // >
  // >— *Me, May 2019*

  // Yeah, thats right you can put wigdets in markdown (\`.svexy\` files or otherwise). You can put markdown in widgets too.

  // <Seriously>

  // ### I wasn't joking

  // \`\`\`
  // 	This is real life
  // \`\`\`

  // </Seriously>

  // Sometimes you need your widgets **inlined** (like this:<Count count="{number}"/>) because why shouldn't you.

  // Obviously you have access to values defined in YAML (namespaced under \`_metadata\`) and anything defined in an fenced \`js exec\` block can be referenced directly.

  // Normal markdown stuff works too:

  // - Like
  // - This
  // - List
  // - Here

  // And *this* and **THIS**. And other stuff. You can't use \`each\` blocks. Don't try, it wont work.

  // `;

  //   const code_2 = `

  // <script>
  // 	import { flip } from 'svelte/animate';
  // 	import { crossfade, scale } from 'svelte/transition';
  // 	export let color = 'pink';
  // 	const [send, receive] = crossfade({fallback: scale})

  // 	let boingers = [
  // 		{val: 1, boinged: true},
  // 		{val: 2, boinged: true},
  // 		{val: 3, boinged: false},
  // 		{val: 4, boinged: true},
  // 		{val: 5, boinged: false}
  // 	];

  // 	function toggleBoing (id){
  // 		const index = boingers.findIndex(v => v.val === id);
  // 		boingers[index].boinged = !boingers[index].boinged
  // 	}
  // <\/script>
  // <div class="container">
  // 	<div class="boingers">
  // 		{#each boingers.filter(v => !v.boinged) as {val} (val)}
  // 			<div animate:flip
  // 					 in:receive="{{key: val}}"
  // 					 out:send="{{key: val}}"
  // 					 style="background:{color};"
  // 					 on:click="{() => toggleBoing(val)}">{val}</div>
  // 		{/each}
  // 	</div>

  // 	<div class="boingers">
  // 		{#each boingers.filter(v => v.boinged) as {val} (val)}
  // 			<div animate:flip
  // 					 in:receive="{{key: val}}"
  // 					 out:send="{{key: val}}"
  // 					 style="background:{color};"
  // 					 on:click="{() => toggleBoing(val)}">{val}</div>
  // 		{/each}
  // 	</div>
  // </div><style ✂prettier:content✂="CgkuY29udGFpbmVyIHsKCQl3aWR0aDogMzAwcHg7CgkJaGVpZ2h0OiAyMDBweDsKCQlkaXNwbGF5OiBmbGV4OwoJCWp1c3RpZnktY29udGVudDogc3BhY2UtYmV0d2VlbjsKCX0KCS5ib2luZ2VycyB7CgkJZGlzcGxheTogZ3JpZDsKCQlncmlkLXRlbXBsYXRlLXJvd3M6IHJlcGVhdCgzLCAxZnIpOwoJCWdyaWQtdGVtcGxhdGUtY29sdW1uczogcmVwZWF0KDIsIDFmcik7CgkJZ3JpZC1nYXA6IDEwcHg7CgoKCX0KCS5ib2luZ2VycyBkaXYgewoKCQl3aWR0aDogNTBweDsKCQloZWlnaHQ6IDUwcHg7CgkJZGlzcGxheTogZmxleDsKCQlqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjsKCQlhbGlnbi1pdGVtczogY2VudGVyOwoJCWNvbG9yOiAjZWVlOwoJCWZvbnQtd2VpZ2h0OiBib2xkOwoJCWJvcmRlci1yYWRpdXM6IDJweDsKCQljdXJzb3I6IHBvaW50ZXI7Cgl9Cg==" ✂prettier:content✂="" ✂prettier:content✂="" ✂prettier:content✂="" ✂prettier:content✂="" ✂prettier:content✂="" ✂prettier:content✂="" ✂prettier:content✂="" ✂prettier:content✂="" ✂prettier:content✂="" ✂prettier:content✂="" ✂prettier:content✂="" ✂prettier:content✂="" ✂prettier:content✂="" ✂prettier:content✂="" ✂prettier:content✂="" ✂prettier:content✂="" ✂prettier:content✂="" ✂prettier:content✂="" ✂prettier:content✂="" ✂prettier:content✂="" ✂prettier:content✂="" ✂prettier:content✂="" ✂prettier:content✂="" ✂prettier:content✂="" ✂prettier:content✂=""></style>`;

  //   const code_3 = `# What i wrote last week

  // Why am i so smart, how is this possible.
  // `;
  //   const code_4 = `
  // <script>
  // 	export let count = 0;
  // <\/script>

  // <span class="outer">
  // 	<button on:click="{() => count = count - 1}">-</button>
  // 	<span class="inner">{count}</span>
  // 	<button on:click="{() => count = count + 1}">+</button>
  // </span><style ✂prettier:content✂="Cgkub3V0ZXIgewoJCWJhY2tncm91bmQ6IGRhcmtvcmFuZ2U7CgkJaGVpZ2h0OiAyMHB4OwoJCWZvbnQtc2l6ZTogMTJweDsKCQlkaXNwbGF5OiBpbmxpbmUtZmxleDsKCQlqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWJldHdlZW47CgkJYWxpZ24taXRlbXM6IGNlbnRlcjsKCQl0cmFuc2Zvcm06IHRyYW5zbGF0ZVkoLTFweCk7CgkJbWFyZ2luOiAwIDVweDsKCQlib3JkZXItcmFkaXVzOiAzcHg7CgkJd2lkdGg6IDY1cHg7CgkJYm94LXNoYWRvdzogMCAzcHggMTVweCAxcHggcmdiYSgwLDAsMCwwLjMpCgl9CgkuaW5uZXIgewoJCW1hcmdpbjogMCAwcHg7Cgl9CglidXR0b24gewoJCWhlaWdodDogMjBweDsKCQlwYWRkaW5nOiAwcHggN3B4IDFweCA3cHg7CgkJbWFyZ2luOiAwOwoJCWJvcmRlcjogbm9uZTsKCQliYWNrZ3JvdW5kOiBub25lOwoJCWNvbG9yOiAjZWVlOwoJCWZvbnQtd2VpZ2h0OiBib2xkOwoJCWN1cnNvcjogcG9pbnRlcjsKCX0K" ✂prettier:content✂="" ✂prettier:content✂="" ✂prettier:content✂="" ✂prettier:content✂="" ✂prettier:content✂="" ✂prettier:content✂="" ✂prettier:content✂="" ✂prettier:content✂="" ✂prettier:content✂="" ✂prettier:content✂="" ✂prettier:content✂="" ✂prettier:content✂="" ✂prettier:content✂="" ✂prettier:content✂="" ✂prettier:content✂="" ✂prettier:content✂="" ✂prettier:content✂="" ✂prettier:content✂="" ✂prettier:content✂="" ✂prettier:content✂="" ✂prettier:content✂="" ✂prettier:content✂="" ✂prettier:content✂="" ✂prettier:content✂="" ✂prettier:content✂=""></style>`;
  //   const code_5 = `
  // <div><slot></slot></div><style ✂prettier:content✂="CglkaXYgewoJCWJhY2tncm91bmQ6IHBpbms7CgkJYm9yZGVyOiAyM3B4IHNvbGlkIG9yYW5nZTsKCQlwYWRkaW5nOiAwIDE1cHg7CgkJd2lkdGg6IDQwMHB4OwoJCXRleHQtYWxpZ246IGNlbnRlcjsKCQl0cmFuc2Zvcm06IHRyYW5zbGF0ZVgoLTIwMHB4KTsKCQlhbmltYXRpb246IDJzIHNsaWRlIGluZmluaXRlIGFsdGVybmF0ZSBlYXNlLWluLW91dDsKCX0KCglAa2V5ZnJhbWVzIHNsaWRlIHsKCQlmcm9tIHsKCQkJdHJhbnNmb3JtOiB0cmFuc2xhdGVYKC0yMDBweCkKCQl9CgkJdG8gewoJCQl0cmFuc2Zvcm06IHRyYW5zbGF0ZVgoMjAwcHgpCgkJfQoKCX0K" ✂prettier:content✂="" ✂prettier:content✂="" ✂prettier:content✂="" ✂prettier:content✂="" ✂prettier:content✂="" ✂prettier:content✂="" ✂prettier:content✂="" ✂prettier:content✂="" ✂prettier:content✂="" ✂prettier:content✂="" ✂prettier:content✂="" ✂prettier:content✂="" ✂prettier:content✂="" ✂prettier:content✂="" ✂prettier:content✂="" ✂prettier:content✂="" ✂prettier:content✂="" ✂prettier:content✂="" ✂prettier:content✂="" ✂prettier:content✂="" ✂prettier:content✂="" ✂prettier:content✂="" ✂prettier:content✂="" ✂prettier:content✂="" ✂prettier:content✂=""></style>`;

  onMount(() => {
    repl.set({
      components: [
        {
          type: "svexy",
          name: "App",
          source: `<h1>hi</h1>`
        },
        {
          type: "svelte",
          name: "Penguin",
          source: `<h1>hi</h1>`
        }
      ]
    });
  });
</script><style>
  .container {
    position: relative;
    width: 90%;
    /* width: 500px; */
    margin: 40px auto;
    height: 80%;
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
</style><div class="container">
  <Repl
    orientation="columns"
    bind:this={repl}
    workersUrl="/workers"
    funky={true} />
</div> -->
<Output {heading} {paragraph} {penguin} {walk} />

<Input {input} />

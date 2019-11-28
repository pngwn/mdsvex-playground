import Prism from "prismjs";
import "prism-svelte";
import "prismjs/components/prism-typescript";
import "prismjs/components/prism-markdown";
import "prismjs/components/prism-bash";
import "prismjs/components/prism-jsx";
import "./svx.js";
import "prismjs/components/prism-yaml";
import "prismjs/components/prism-scss";

const langs = {
	html: "markup",
	js: "javascript",
	ts: "typescript",
	bash: "bash",
	mdx: "markdown",
	svelte: "svelte",
	svx: "mdsvex",
	mdsvex: "mdsvex",
	yaml: "yaml",
	scss: "scss",
	sig: "ts"
};

export function highlight(code, lang) {
	const _lang = langs[lang] || "";

	const highlighted = _lang
		? Prism.highlight(code, Prism.languages[_lang], _lang)
		: code;

	return highlighted;
}

var visit = require("unist-util-visit");
var escape = require("escape-html");

export function highlighter(options) {
	return function(ast) {
		visit(ast, "code", function(node) {
			const html = node.value;
			node.type = "html";
			node.value = `<pre class="language-${node.lang}">
  <code class="language-${node.lang || ""}">
${
	node.lang
		? options
				.highlight(html, node.lang)
				.replace(/[{}]/g, c => ({ "{": "&#123;", "}": "&#125;" }[c]))
				// I'll fix this properly at some point, issue with svelte
				.replace(
					/script\<\/span\>\<span class\=\"token punctuation\">(?:(?:\>)|(?:&gt;))<\/span><\/span\>/,
					'script</span><span class="token punctuation">></span></span>\n  '
				)
				.replace(
					/(style\<\/span\>\<span class\=\"token punctuation\">\><\/span><\/span\>)|(style\<\/span\>\<span class\=\"token punctuation\">&lt;<\/span><\/span\>)/,
					`script</span><span class="token punctuation">></span></span>\n  `
				)
				.replace(
					/script<\/span> <span class="token attr-name">context<\/span><span class="token attr-value"><span class="token punctuation">=<\/span><span class="token punctuation">"<\/span>module<span class="token punctuation">"<\/span><\/span><span class="token punctuation">((?:&gt;)|(?:>))<\/span><\/span>/,
					'script</span> <span class="token attr-name">context</span><span class="token attr-value"><span class="token punctuation">=</span><span class="token punctuation">"</span>module<span class="token punctuation">"</span></span><span class="token punctuation">&gt;</span></span>\n  '
				)
		: node.value
}
  </code>
</pre>`;
		});
	};
}

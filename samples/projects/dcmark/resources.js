// https://emojidb.org/reset-emojis
const resetButtonText = "🔄"; //☰ 🔄 🔥 💥
const darkButtonText = ["☀️", "🌙"];
const syncButtonText = "⇄";

const defaultMarkdown = `
# DcMark Markdown Editor

---

This is your default markdown block.

* You can edit this
* Reset will restore it
* Cut & Paste into edit window


\`\`\`js
console.log("Hello Markdown");
\`\`\`


<button onclick="alert('Hello!')">Click me</button>

## Made with DOMicile

`;

const defaultHTML = `
<h1>Welcome to the Editor</h1>
<p>This is the default HTML.</p>
<ul>
  <li>You can edit this.</li>
  <li>Reset will restore it.</li>
</ul>
`;

const defaultSLML = `
  Title: Live Markup Viewer
  Greeting: Hello Joel!
  This paragraph is not labeled and is the body of the data item. 
    1. You can edit this.
    2. Reset will restore it.
`;

const cssMap = {
  default: "./assets/css/preview.css",
  dark: "./assets/css/preview_dark.css",
  slml: "./assets/css/preview_slml.css",
  slate: "./assets/css/preview_slate.css",
  none: "./assets/css/preview_none.css"
};

function htmlTemplateBasic(content, cssUrl) {
  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="UTF-8">
      <title>{{title}}</title>
      <link rel="stylesheet" href="./assets/css/normalize.css">
      <link rel="stylesheet" href="${cssUrl}">
    </head>
    <body>
      ${content}
    </body>
    </html>
  `;

  return html;
}

function htmlTemplateHighlight(content, cssUrl) {
  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="UTF-8">
      <title>{{title}}</title>
      <link rel="stylesheet" href="./assets/css/normalize.css">
      <link rel="stylesheet" href="${cssUrl}">
      <script src="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.11.1/highlight.min.js"></script>
    </head>
    <body>
      ${content}
    <script>hljs.highlightAll();</script>
    </body>
    </html>
  `;

  return html;
}

const htmlTemplates = {
  basic: htmlTemplateBasic,
  highlight: htmlTemplateHighlight
};
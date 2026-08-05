// testing ground for strings and numbers as children

const number = new Element("div", { css: { fontSize: "32px" }}, 0100100001101001);
number.render(document.body);

const div = new Element("div", { css: { fontSize: "26px" }}, "01001000 01101001");
div.render(document.body);

const label = new Element("label", {css: { fontSize: "22px" } }, 
  "Hello ",
  new Element("input", { props: { type: "checkbox", onchange: (e) => alert(e.target.checked) }}),
  " Goodbye",
  " Chow",
);
label.render(document.body);

document.body.style.color = "#eee";
document.body.style.backgroundColor = "#111";
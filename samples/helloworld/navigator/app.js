const base = "/samples/helloworld/navigator";
// This relies on the local .htaccess Apache rules
function HomePage() {
  console.log("Home Page");
  const text1 = "This is a hello world demonstration of a DOMicile SPA.";
  const text2 = "Except for the contacts page, the was to see if static files were still ok when working with popstate so you can mix and match instead of just a pure SPA which is certainly faster but fetch's and lots of components will do that too it just helps improve the performance.";
  const text3 = "The pure SPA does seem like a greaser thought!";
  return [
    new Element("h1", {css: {textAlign: "center"}, props: {textContent: "Home Page"}}),
    new Element("p", {css: {textAlign: "center"}, props: {textContent: text1}}),
    new Element("p", {css: {textAlign: "center"}, props: {textContent: text2}}),
    new Element("p", {css: {textAlign: "center"}, props: {textContent: text3}}),
    new Box({css: { display: "flex", flexDirection: "column", textAlign: "center" }, props: {}},
      new Navigator({
        base: base,
        props: { className: "nav-home", href: "/about", textContent: "About" },
        css: { textAlign: "center", color: "white", cursor: "pointer" }
      }),
      new Element('a', {
        base: base,
        props: { href: base + "/contacts.html", textContent: "Contacts" },
        css: { color: "white", cursor: "pointer" }
      })
    )
  ];
}

function AboutPage() {
  console.log("About Page");
  return [
    new Element("h1", {css: {textAlign: "center"}, props: {textContent: "About Page"}}),
    new ContentLoader({base: base, src: "/about.md", isMarkdown: true}),
    new Box({css: { display: "flex", flexDirection: "column", textAlign: "center" }, props: {}},
      new Navigator({
        base: base,
        props: { href: "/", textContent: "Home" },
        css: { color: "white", cursor: "pointer" }
      }),
      new Element('a', {
        base: base,
        props: { href: base + "/contacts.html", textContent: "Contacts" },
        css: { color: "white", cursor: "pointer" }
      })
    )
  ];
}

function Error404Page() {
  console.log("404 Page");
  return [new Element("h1", {css: { fontSize: "134px", textAlign: "center"}, props: {textContent: "404"}})];
}

function PageTemplate(contents = []) {
  // TODO: add navbar and footer
  return [...contents];
}

console.log("Incoming URL", window.location.href);

router = new RouterAsync({
  base: base,
  //template: PageTemplate,
  page404: Error404Page,
  template404: PageTemplate,
  routes: {
    "/":        { contents: HomePage },
    "/about":   { contents: AboutPage },
    "/contacts":   { contents: null }, // placeholder: this is not needed
  },
  runAsync: true,
});

function render({ contents, template }) {
  /* deprecated
  const components = template             // if local template
    ? template(contents)                  // use local template
    : this.metadata?.template             // if global template
      ? this.metadata.template(contents)  // use global template
      : contents;                         // no template just return contents
  */
  const components = template(contents); 
  //const page = applyLayout(components);
  const page = components;
  console.log("Page:", page);
  
  page.forEach(component => {
    component.render(document.getElementById("root"));
    //console.log("HTML>", beautifyHTML(component.toHTML()));
    //console.log("Serialize>", component.toJSON());
  });
  
  const effect = new BlueNeonRain();
  effect.render(document.body);
  effect.dom.style.zIndex = -1;
  effect.start();
    
}

// resolve page refreshes
router.resolve(function({ contents, template }) {
  //document.body.innerHTML = "";
  document.getElementById("root").innerHTML = "";
  render({contents, template});
  
});

// resolve popstate event
router.listen(function({ contents, template }) {
  //alert("router.listener was invoked!");
  document.getElementById("root").innerHTML = "";
  render({contents, template});
});

console.log("Setting background Hero image");
document.body.style.backgroundImage = 'url("' + base + '/hero-bg.jpg")';
document.body.style.color = "#bbb";
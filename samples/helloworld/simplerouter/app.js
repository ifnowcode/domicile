const base = "/samples/helloworld/simplerouter";
const dcbase = "/domicile1";

console.log("Incoming URL", window.location.href);

function runApp(config={}, theme={}) {
  
  function HomePage() {
    console.log("Home Page");
    const text = "This is a hello world demonstration of DOMicile!";
    return [
      new Element("h1", {css: {textAlign: "center"}, props: {textContent: "Home Page"}}),
      new Element("p", {css: {textAlign: "center"}, props: {textContent: text}}),
    ];
  }

  function AboutPage() {
    console.log("About Page");
    return [
      new Element("h1", {css: {textAlign: "center"}, props: {textContent: "About"}}),
    ];
  }

  function Error404Page() {
    console.log("404 Page");
    return [new Element("h1", {css: {fontSize: "146px", textAlign: "center"}, props: {textContent: "404"}})];
  }
    
  function PageTemplate(contents = []) {
    const page = [];
    const color = getRandomColor();
    const navbar = new NavBarTopClickerSticker({
            base: base,
            logoText: "SimpleRouter",
            logoHTML: `<span style="color:${color};"><b>Simple</b></span>Router`,
            //logoImage: imagerelurl + 'granite-raw-block-250x250.jpg',
            menus: [
              { label: "Home", href: "/" },
              { label: "Help", items: [
                  { label: "About", href: "/about" },
                  { label: "Contacts", href: "/contacts.html" },
                ]
              },
            ],
    });
    
    page.push(navbar);
    
    contents.forEach(widget => page.push(widget));
    
    page.push(new Element("p", {css: {textAlign: "center"}},
      new Element("a", {css: {display: "block"}, props: {textContent: "about", href: base + "/about"}}),
        new Element("a", {css: {display: "block"}, props: {textContent: "contacts", href: base + "/contacts.html"}})
      )
    )
      
    return page;
  }

  router = new RouterAsync({
    base: base,
    template: PageTemplate,
    page404: Error404Page,
    template404: PageTemplate,
    routes: {
      "/":        { contents: HomePage },
      "/about":   { contents: AboutPage },
      //"/contacts":   { contents: null }, // placeholder: this is not needed
    },
    runAsync: true,
  });

  function render({ contents, template }) {
    const page = template(contents);
    console.log("Page:", page);
    page.forEach(widget => {
      widget.render(document.getElementById("root"));
      //console.log("HTML>", beautifyHTML(widget.toHTML()));
      //console.log("Serialize>", widget.toJSON());
    });
    
    console.log("***********************************");
    applyJSONTheme(theme);
    
    const neon = new FloatingNeonWord({
      words: ["Lava", "Glow", "You", "Me", "Fire", "Hot", "Sssst!", "Mmm.."],
      color: "#ff0000",
      intensity: 1.4,
      count: 10,
      sizeMin: 32,
      sizeMax: 72
    });
    
    neon.render(document.getElementById("root"));
    neon.dom.style.zIndex = -1;
    neon.start();
  }
      
  router.resolve(function({ contents, template }) {
    document.getElementById("root").innerHTML = "";
    console.log("resolve", contents, template);
    render({contents, template});
  });

  router.listen(function({ contents, template }) {
    document.getElementById("root").innerHTML = "";
    console.log("listen", contents, template);
    render({contents, template});
  });

  ////document.body.style.background = "#000";
  //document.documentElement.style.setProperty("--dc-bg", "#002");
  ////document.body.style.color = "#fff"; 
  //document.documentElement.style.setProperty("--dc-color", "#fff");
  ////document.body.style.minHeight = "100%";
  ////document.body.style.margin = "0";

  //:root {
  //  --dc-nav-bg: #002; /*#222*/
  //  --dc-nav-dropdown-bg1: #0000ff; /* #1b1f27*/ /*gradient start*/
  //  --dc-nav-dropdown-bg2: #000011; /*#11151c*/ /*gradient end*/
  //  --dc-nav-hover-bg: rgba(91, 141, 239, 0.14); /*rgba(91, 141, 239, 0.14)*/
  //  --dc-nav-hover-color: #ffff00; /*#ffffff*/
  //}
  // documentElement is html or the entire document
  /*
  document.documentElement.style.setProperty("--dc-nav-bg", "#002");
  document.documentElement.style.setProperty("--dc-nav-dropdown-bg1", "#0000ff");
  document.documentElement.style.setProperty("--dc-nav-dropdown-bg2", "#000011");
  document.documentElement.style.setProperty("--dc-nav-hover-bg", "rgba(91, 141, 239, 0.14)");
  document.documentElement.style.setProperty("--dc-nav-hover-color", "#ffff00"); // yellow
  */
  //TODO: put all value pairs in a resource, JSON? and load it at runtime
  /*
  (async () => {
    const theme = await loadJSONTheme(base + "/theme.json");
    applyJSONTheme(theme);
  })();
  */
  //loadAndApplyTheme(base + "/theme.json");
  // pre-loading and just applying reduces or eliminates FOUCk which is why I did this in two parts
  
}

(async () => {
  const config = await loadJsonFile(base + "/config.json");
  const theme = await loadJSONTheme(base + "/assets/themes/blues.json");
  runApp(config ?? {}, theme ?? {});
})().catch(console.error);
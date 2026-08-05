console.log("Checking About", pageCount = pageCount + 1);

//if (window.location.href === 'https://repo01.src.web' + base + "/about") {
if (window.location.href === baseurl + "/about") {
  
  function GetPage() {
    console.log("GetPage /about");
    const text = "This is all about a hello world demonstration of DOMicile page-router!";
    const statement = "This is all about each 'page' checking the url and defining a common function name that the renderer will later use to render the content. So pages have their routing handled locally for better packaging. The app.js is the global app then all pages and partials are defined followed up by the render in index.html. The order important. As they load pages will check the URL to see if it is theirs.";
    
    return [
      new Element("h1", {css: {textAlign: "center"}, props: {textContent: "About Page"}}),
      new Element("p", {css: {textAlign: "center"}, props: {textContent: text}}),
      new Element("p", {css: {textAlign: "center"}, props: {textContent: statement}}),
    ];
  }

  /*
  GetPage().forEach(widget => {
      widget.render(document.getElementById("root"));
  });
  */
  
  function ProcessEffects() {
    const effect = new Sparkles();
    effect.render(document.body);
    effect.dom.style.zIndex = -1;
    effect.start();

    //setTimeout(() => effect.stop(), 4000);
    //setTimeout(() => effect.clear(), 7000);
  }
}
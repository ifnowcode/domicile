const base = "/samples/helloworld/norouter";
// This relies on the local .htaccess Apache rules
function HomePage() {
  console.log("Home Page");
  const text = "This is a hello world demonstration of DOMicile!";
  return [
    new Element("h1", {css: {textAlign: "center"}, props: {textContent: "Home Page"}}),
    new Element("p", {css: {textAlign: "center"}, props: {textContent: text}}),
    new Element("p", {css: {textAlign: "center"}},
      // about should fail as there is no router
      new Element("a", {css: {display: "block"}, props: {textContent: "about", href: base + "/about"}}),
      // contacts should serve static HTML
      new Element("a", {css: {display: "block"}, props: {textContent: "contacts", href: base + "/contacts.html"}})
    )
  ];
}

HomePage().forEach(widget => {
    widget.render(document.getElementById("root"));
});

document.body.style.backgroundImage = 'url("hero-bg.jpg")';
document.body.style.color = "#bbb";

const effect = new BlueNeonRain();
effect.render(document.body);
effect.dom.style.zIndex = -1;
effect.start();
// footer.js
function GetFooter() {
  return [
    new Element("p", {css: {gap: "10px", textAlign: "center"}},
      // about should fail as there is no router
      new Element("a", {css: {display: "inline-block"}, props: {textContent: "home", href: base + "/"}}),
      new Element("a", {css: {display: "inline-block"}, props: {textContent: "about", href: base + "/about"}}),
      // contacts should serve static HTML
      new Element("a", {css: {display: "inline-block"}, props: {textContent: "contacts", href: base + "/contacts.html"}})
    ),
    new Footer()
  ]
}
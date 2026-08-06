// Inline Dropdown Navbar
const header = new Element('h1', {css: {textAlign: "center"}, props: {textContent: "DOMicile"}});
header.render(document.getElementById("root"));
const navbar = new InlineDropdownNavbar();
navbar.render(document.getElementById("root"));

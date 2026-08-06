const base = "/samples/helloworld/pagerouter";
const baseurl = window.location.protocol + "//" + window.location.hostname + base;
// This relies on the local .htaccess Apache rules
let pageCount = 0;
console.log("Window Location:", window.location, "Location", baseurl + "/");

console.log("Setting global CSS ...");
document.body.style.background = "#000";
document.body.style.backgroundImage = 'url("' + base + '/assets/images/hero-bg.jpg")';
document.body.style.color = "#bbb";
document.body.style.margin = "20px";

// the effects should be on top of the background and below the elements like this H1 for zIndex of -1, anything higher should render above everything.
// Use this to very effects are working correctly or for a simple static render project starter
// This is a good sample for testing effects as well
new Element("h1", { 
  css: { textAlign: "center" }, 
  props: {textContent: "DOMicile Effects"}
}).render(document.getElementById("main"));

// effects are layered in order rendered if same zIndex (defaults to -1).
const test = new FloatingNeonWord({
  words: ["Test"],
  color: "#f00",
  intensity: 1.4,
  count: 10,
  sizeMin: 32,
  sizeMax: 72
})
test.render(document.getElementById("overlay"));
//test.dom.style.zIndex = -1;
test.start();

const neon = new FloatingNeonWord({
  words: ["Cool", "Sup", "Hello", "Aloha"],
  color: "#0f0",
  intensity: 1.4,
  count: 10,
  sizeMin: 32,
  sizeMax: 72
})
neon.render(document.getElementById("overlay"));
//neon.dom.style.zIndex = -1;
neon.start();

const effect = new BlueNeonRain();
effect.render(document.getElementById("overlay"));
//effect.dom.style.zIndex = -1;
effect.start();


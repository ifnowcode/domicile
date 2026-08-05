const base = "/js/rnd/domicile/examples/helloworld/pagerouter";
const baseurl = window.location.protocol + "//" + window.location.hostname + base;

// This relies on the local .htaccess Apache rules
let pageCount = 0;

console.log("Window Location:", window.location, "Location", baseurl + "/");

console.log("Setting global CSS ...");
document.body.style.backgroundImage = 'url("' + base + '/assets/images/hero-bg.jpg")';
document.body.style.color = "#bbb";
document.body.style.margin = "20px";

window.addEventListener("popstate", () => {
  const currentPath = getLocalPath(base);
  console.warn("No POPSTATE handling", currentPath);
  // TODO: load page
  // don't know how to do this for a page router system
  // set popoff to false in navigation
  // must not use Navigator or popstate handling.
  // Navigator accepts a `popoff: false` option that turns off popstate handling
});
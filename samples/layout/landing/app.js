//const page = [];
const base = "/js/rnd/domicile/examples/layout/landing"

const landing = new LunaLandingPage({
  base,
  logoImage: null,
  logoText: "✶ DOMicile",
  links: [
    { label: "Product", href: "/product" },
    { label: "Customers", href: "/customers" },
    { label: "Company", href: "/company" },
    { label: "Resources", href: "/resources" }
  ],
  title: "The new standard in JavaScript front end frameworks!",
  subtitle: "Meet the platform that accelerates web building, eliminates manual work and grows web sites quickly.",
  backgroundImage: "duna-d_post.png"
});

landing.render(document.body);
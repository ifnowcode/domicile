// header.js
function GetHeader() {
  return [
    new NavBarHLink({
        base: base,
        popoff: true,
        logoText: "PageRouter Demo",
        logoImage: base + "/assets/images/granite-raw-block-250x250.jpg",
        links: [
          { label: "Home", href: "/" }, // home.js intercepts and loads
          { label: "Products", href: "/products" }, // product.js wraps HTML file
          { label: "Downloads", href: "/downloads" }, // downloads.js intercepts and loads
          { label: "About", href: "/about" }, // about.js intercepts and loads
          { label: "Contacts", href: "/contacts" }, // contacts.js intercepts and loads HTML file
          { label: "Contacts>", href: "/pages/contacts.html" }, // directly loads HTML file
          { label: "Markdown", href: "/frameworks" }, // frameworks.js intercepts and loads MD
          { label: "Matrix", href: "/matrix" }, // matrix.js intercepts and loads the matrix
        ],
      })
  ];
}
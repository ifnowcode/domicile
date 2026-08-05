const shell = new AppShellBox({
  logoImage: null,
  logoText: "DOMicile",
  links: [
    { label: "Product", href: "/product" },
    { label: "Pricing", href: "/pricing" },
    { label: "Docs", href: "/docs" },
    { label: "Blog", href: "/blog" }
  ],
  ctaText: "Get Started",
  backgroundImage: "./hero-bg.jpg",
  children: [
    new Box({ props: { textContent: "Build faster with DOMicile." }, css: {
      fontSize: "42px",
      fontWeight: "600",
      marginBottom: "20px",
      color: "#fff",
    }}),
    new Box({ props: { textContent: "Composable UI. Deterministic layouts. No magic." }, css: {
      fontSize: "18px",
      marginBottom: "30px",
      color: "#fff",
    }}),
    new Box({ props: { textContent: "Start Building" }, css: {
      background: "#000",
      color: "#fff",
      padding: "12px 24px",
      borderRadius: "4px",
      fontSize: "16px",
      cursor: "pointer",
      display: "inline-block"
    }})
  ]
});

shell.render(document.body);

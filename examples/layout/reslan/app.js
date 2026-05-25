const shell = new ResponsiveLandingPage({
  logoImage: null,
  logoText: "DOMicile",
  links: [
    { label: "Product", href: "/product" },
    { label: "Pricing", href: "/pricing" },
    { label: "Docs", href: "/docs" },
    { label: "Blog", href: "/blog" }
  ],
  title: "It's what you've been waiting for your whole life.",
  subtitle: "Fuck Yeah!",
  backgroundImage: "Guemes_Island_WA,_rural_road_-_panoramio.jpg",
  children: [
    new Element('br'), new Element('br'), new Element('br'),
    new Box({ props: { textContent: "Build faster with DOMicile." }, css: {
      fontSize: "42px",
      fontWeight: "600",
      marginBottom: "20px",
      //color: "green"
    }}),
    new Box({ props: { textContent: "Composable UI. Deterministic layouts. No magic." }, css: {
      fontSize: "18px",
      marginBottom: "30px",
      //color: "green"
    }}),
    new Box({ props: { textContent: "Start Building" }, css: {
      background: "#000",
      color: "#fff",
      padding: "12px 24px",
      borderRadius: "4px",
      fontSize: "16px",
      cursor: "pointer",
      display: "inline-block"
    }}),
    new Element('br'), new Element('br'),
  ]
});

shell.render(document.body);

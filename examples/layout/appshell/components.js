class AppShellBox extends Box {
  constructor({ logoImage, logoText, links, ctaText, children, backgroundImage }) {
    super({ css: {
      position: "relative",
      width: "100%",
      minHeight: "100vh",
      backgroundImage: `url(${backgroundImage})`,
      backgroundSize: "cover",
      backgroundPosition: "center",
      fontFamily: "sans-serif",
      display: "flex",
      flexDirection: "column"
    }});

    // Top NavBar
    const navBar = new Box({ css: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      padding: "16px 32px",
      background: "rgba(255,255,255,0.9)",
      backdropFilter: "blur(10px)",
      position: "sticky",
      top: "0",
      zIndex: "1000"
    }});

    const logo = new Box({ css: { display: "flex", alignItems: "center", gap: "10px" }});
    if (logoImage) {
      logo.addChild(new ImageBox({ props: { src: logoImage, alt: "Logo" }, css: { height: "28px" }}));
    }
    logo.addChild(new Box({ props: { textContent: logoText }, css: { fontSize: "18px", fontWeight: "bold" }}));

    const navLinks = new Box({ css: { display: "flex", gap: "24px" }});
    for (const link of links) {
      navLinks.addChild(new Link({
        props: { href: link.href, textContent: link.label },
        css: {
          color: "#333",
          textDecoration: "none",
          fontSize: "14px",
          fontWeight: "500"
        }
      }));
    }

    const ctaButton = new Box({
      props: { textContent: ctaText },
      css: {
        background: "#000",
        color: "#fff",
        padding: "8px 16px",
        borderRadius: "4px",
        fontSize: "14px",
        cursor: "pointer"
      }
    });

    navBar.addChild(logo, navLinks, ctaButton);

    // Main content
    const main = new Box({ css: {
      flex: "1",
      padding: "60px 20px",
      maxWidth: "800px",
      margin: "0 auto",
      textAlign: "center",
      color: "#333"
    }});

    for (const child of children) {
      main.addChild(child);
    }

    this.addChild(navBar, main);
  }
}

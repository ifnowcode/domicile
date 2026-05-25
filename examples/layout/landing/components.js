class LunaLandingPage extends Box {
  constructor({ base, logoImage, logoText, links, title, subtitle, backgroundImage }) {
    console.log("BASE:", base);
    super({ css: {
      position: "relative",
      width: "100%",
      minHeight: "100vh",
      backgroundImage: `url(${backgroundImage})`,
      backgroundSize: "cover",
      backgroundPosition: "center",
      color: "#fff",
      fontFamily: "sans-serif",
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-between"
    }});

    // Top bar
    const topBar = new Box({ css: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      padding: "20px 40px",
      background: "rgba(0,0,0,0.4)"
    }});

    // Left: Logo
    const logo = new Box({ css: { display: "flex", alignItems: "center", gap: "10px" }});
    if (logoImage) {
      logo.addChild(new ImageBox({ props: { src: logoImage, alt: "Logo" }, css: { height: "32px" }}));
    }
    logo.addChild(new Box({ props: { id: "logo-text", textContent: logoText }, css: { fontSize: "20px", fontWeight: "bold" }}));
    console.log("BASE:", base);
    // Middle: Nav links
    const navLinks = new Box({ css: { display: "flex", gap: "30px" }, props: {id: "nav-links"}});
    for (const link of links) {
      console.log("Add Link:");
      navLinks.addChild(new Element('a', {
        props: { href: base + link.href, textContent: link.label },
        css: {
          color: "#fff",
          textDecoration: "none",
          fontSize: "14px",
          fontWeight: "500"
        }
      }));
    }

    // Right: CTA button
    const ctaButton = new Box({
      props: { textContent: "Schedule a demo" },
      css: {
        background: "#000",
        padding: "10px 20px",
        borderRadius: "4px",
        fontSize: "14px",
        cursor: "pointer"
      }
    });

    topBar.addChild(logo, navLinks, ctaButton);

    // Hero section
    const hero = new Box({ css: {
      textAlign: "center",
      padding: "100px 20px",
      maxWidth: "800px",
      margin: "0 auto"
    }});

    hero.addChild(
      new Box({ props: { textContent: title }, css: {
        fontSize: "40px",
        fontWeight: "600",
        marginBottom: "20px",
        color: "green",
      }}),
      new Box({ props: { textContent: subtitle }, css: {
        fontSize: "18px",
        fontWeight: "400",
        marginBottom: "30px",
        color: "#333",
      }}),
      new Box({ props: { textContent: "Get started" }, css: {
        background: "#000",
        padding: "12px 24px",
        borderRadius: "4px",
        fontSize: "16px",
        cursor: "pointer",
        display: "inline-block"
      }})
    );

    this.addChild(topBar, hero);
  }
}

class ResponsiveLandingPage extends Box {
  constructor({ 
    logoImage, 
    logoText, 
    links, 
    title, 
    subtitle, 
    backgroundImage,
    children
  }) {
    super({ css: {
      position: "relative",
      width: "100%",
      minHeight: "100vh",
      backgroundImage: `url(${backgroundImage})`,
      backgroundSize: "cover",
      backgroundPosition: "center",
      display: "flex",
      flexDirection: "column",
      //color: "#111",
      fontFamily: "sans-serif"
    }});

    // -------------------------------
    // TOP NAVBAR
    // -------------------------------
    const nav = new Box({ css: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      padding: "20px 30px",
      position: "sticky",
      top: "0",
      zIndex: "1000",
      backdropFilter: "blur(10px)",
      background: "rgba(0,0,0,0.25)"
    }});

    // Logo
    const logo = new Box({ css: { display: "flex", alignItems: "center", gap: "10px" }});
    if (logoImage) {
      logo.addChild(new ImageBox({
        props: { src: logoImage },
        css: { height: "28px" }
      }));
    }
    logo.addChild(new Box({
      props: { textContent: logoText },
      css: { fontSize: "20px", fontWeight: "600" }
    }));

    // Desktop nav links
    const navLinks = new Box({ css: {
      display: "flex",
      gap: "30px",
      alignItems: "center"
    }});

    for (const link of links) {
      navLinks.addChild(new Link({
        props: { href: link.href, textContent: link.label },
        css: {
          color: "#fff",
          textDecoration: "none",
          fontSize: "15px",
          fontWeight: "500"
        }
      }));
    }

    // CTA button (desktop)
    const cta = new Box({
      props: { textContent: "Get Started" },
      css: {
        background: "#000",
        padding: "10px 18px",
        borderRadius: "4px",
        cursor: "pointer",
        fontSize: "14px",
        fontWeight: "500"
      }
    });

    const rightSide = new Box({ css: { display: "flex", gap: "20px", alignItems: "center" }});
    rightSide.addChild(navLinks, cta);

    // -------------------------------
    // MOBILE HAMBURGER
    // -------------------------------
    const hamburger = new Box({
      props: { innerHTML: "&#9776;" },
      css: {
        fontSize: "28px",
        cursor: "pointer",
        display: "none"
      }
    });

    // -------------------------------
    // MOBILE MENU DRAWER
    // -------------------------------
    const drawer = new Box({ css: {
      position: "fixed",
      top: "0",
      right: "-260px",
      width: "260px",
      height: "100vh",
      background: "rgba(0,0,0,0.85)",
      backdropFilter: "blur(6px)",
      padding: "40px 20px",
      display: "flex",
      flexDirection: "column",
      gap: "20px",
      transition: "right 0.3s ease",
      zIndex: "2000"
    }});

    for (const link of links) {
      drawer.addChild(new Link({
        props: { href: link.href, textContent: link.label },
        css: {
          color: "#fff",
          fontSize: "20px",
          textDecoration: "none",
          padding: "10px 0"
        }
      }));
    }

    const closeBtn = new Box({
      props: { innerHTML: "&times;", onclick: 'console.log("Clicked Close")' },
      css: {
        fontSize: "32px",
        cursor: "pointer",
        alignSelf: "flex-end",
        marginBottom: "20px"
      }
    });

    drawer.addChild(closeBtn);

    // Toggle drawer
    hamburger.metadata.props.onclick = () => {
      console.log("Clicked Hamburger");
      drawer.dom.style.right = "0px";
    }
    closeBtn.metadata.props.onclick = () => {
      console.log("Clicked Close Button");
      drawer.dom.style.right = "-260px";
    }

    // -------------------------------
    // HERO CONTENT
    // -------------------------------
    const hero = new Box({ css: {
      textAlign: "center",
      marginTop: "120px",
      padding: "0 20px",
      maxWidth: "800px",
      alignSelf: "center"
    }});

    hero.addChild(
      new Box({
        props: { textContent: title },
        css: {
          fontSize: "48px",
          fontWeight: "700",
          marginBottom: "20px"
        }
      }),
      new Box({
        props: { textContent: subtitle },
        css: {
          fontSize: "20px",
          fontWeight: "300",
          marginBottom: "30px"
        }
      }),
      new Box({
        props: { textContent: "Get Started" },
        css: {
          background: "#000",
          padding: "14px 28px",
          borderRadius: "4px",
          cursor: "pointer",
          display: "inline-block",
          fontSize: "18px"
        }
      })
    );

    // -------------------------------
    // RESPONSIVE BEHAVIOR
    // -------------------------------
    this.onMount = () => {
      const update = () => {
        const w = window.innerWidth;

        if (w < 800) {
          navLinks.dom.style.display = "none";
          cta.dom.style.display = "none";
          hamburger.dom.style.display = "block";
        } else {
          navLinks.dom.style.display = "flex";
          cta.dom.style.display = "block";
          hamburger.dom.style.display = "none";
          drawer.dom.style.right = "-260px";
        }
      };

      update();
      this._resizeHandler = update;
      window.addEventListener("resize", update);
    };

    this.onUnmount = () => {
      window.removeEventListener("resize", this._resizeHandler);
    };
    
    for (const child of children) {
      hero.addChild(child);
    }

    // -------------------------------
    // BUILD TREE
    // -------------------------------
    nav.addChild(logo, rightSide, hamburger);
    this.addChild(nav, hero, drawer);
  }
}

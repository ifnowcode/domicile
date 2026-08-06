// https://www.w3schools.com/howto/howto_js_mobile_navbar.asp

class MobileNavbar extends Element {
  constructor(metadata = {}) {
    super("div", {
      css: {
        fontFamily: "Arial, Helvetica, sans-serif",
        margin: "0",
        boxSizing: "border-box"
      },
      ...metadata
    });

    // --- MOBILE CONTAINER ---
    this.container = new Element("div", {
      css: {
        maxWidth: "480px",
        margin: "auto",
        backgroundColor: "#555",
        height: "500px",
        color: "white",
        borderRadius: "10px"
      }
    });

    // --- TOP NAV ---
    this.topnav = new Element("div", {
      css: {
        overflow: "hidden",
        backgroundColor: "#333",
        position: "relative"
      }
    });

    // Logo link
    this.logo = new Element("a", {
      props: { href: "#home", textContent: "DOMicile" },
      css: {
        color: "white",
        padding: "14px 16px",
        textDecoration: "none",
        fontSize: "17px",
        display: "block",
        backgroundColor: "#04AA6D"
      }
    });

    // Collapsible links container
    this.links = new Element("div", {
      css: {
        display: "none" // initial state
      }
    });

    this.links.addChild(
      new Element("a", {
        props: { href: "#news", textContent: "News" },
        css: {
          color: "white",
          padding: "14px 16px",
          textDecoration: "none",
          fontSize: "17px",
          display: "block"
        }
      })
    );

    this.links.addChild(
      new Element("a", {
        props: { href: "#contact", textContent: "Contact" },
        css: {
          color: "white",
          padding: "14px 16px",
          textDecoration: "none",
          fontSize: "17px",
          display: "block"
        }
      })
    );

    this.links.addChild(
      new Element("a", {
        props: { href: "#about", textContent: "About" },
        css: {
          color: "white",
          padding: "14px 16px",
          textDecoration: "none",
          fontSize: "17px",
          display: "block"
        }
      })
    );

    // Hamburger icon
    this.icon = new Element("a", {
      props: { href: "javascript:void(0);" },
      css: {
        backgroundColor: "black",
        display: "block",
        position: "absolute",
        right: "0",
        top: "0",
        padding: "14px 16px",
        color: "white",
        fontSize: "20px",
        cursor: "pointer"
      }
    });

    this.icon.addChild(
      new Element("i", {
        props: { className: "fa fa-bars" }
      })
    );

    // Build topnav
    this.topnav.addChild(this.logo);
    this.topnav.addChild(this.links);
    this.topnav.addChild(this.icon);

    // --- CONTENT ---
    this.content = new Element("div", {
      css: { paddingLeft: "16px" }
    });

    this.content.addChild(
      new Element("h3", {
        props: { textContent: "Vertical Mobile Navbar" }
      })
    );

    this.content.addChild(
      new Element("p", {
        props: {
          textContent:
            "This example demonstrates how a navigation menu on a mobile/smart phone could look like."
        }
      })
    );

    this.content.addChild(
      new Element("p", {
        props: {
          textContent:
            "Click on the hamburger menu (three bars) in the top right corner, to toggle the menu."
        }
      })
    );

    // Add everything to container
    this.container.addChild(this.topnav);
    this.container.addChild(this.content);

    // Add container to root
    this.addChild(this.container);

    // Event handler reference
    this._toggleHandler = null;
  }

  onMount() {
    const links = this.links.dom;

    this._toggleHandler = () => {
      links.style.display = links.style.display === "block" ? "none" : "block";
    };

    this.icon.dom.addEventListener("click", this._toggleHandler);
  }

  onUnmount() {
    this.icon.dom.removeEventListener("click", this._toggleHandler);
  }
}

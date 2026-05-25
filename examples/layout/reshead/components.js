// https://www.w3schools.com/howto/howto_css_responsive_header.asp

class ResponsiveHeader extends Element {
  constructor(metadata = {}) {
    super("div", {
      css: {
        margin: "0",
        fontFamily: "Arial, Helvetica, sans-serif",
        boxSizing: "border-box"
      },
      ...metadata
    });

    // --- Header container ---
    this.header = new Element("div", {
      css: {
        overflow: "hidden",
        backgroundColor: "#f1f1f1",
        padding: "20px 10px"
      }
    });

    // Logo link
    this.logo = new Element("a", {
      props: {
        href: "#default",
        innerHTML: "DOMicile"
      },
      css: {
        float: "left",
        color: "black",
        textAlign: "center",
        padding: "12px",
        textDecoration: "none",
        fontSize: "25px",
        lineHeight: "25px",
        borderRadius: "4px",
        fontWeight: "bold"
      }
    });

    // Right-side container
    this.headerRight = new Element("div", {
      css: {
        float: "right"
      }
    });

    // Menu links
    this.homeLink = new Element("a", {
      props: {
        href: "#home",
        textContent: "Home"
      },
      css: {
        float: "left",
        color: "white",
        backgroundColor: "dodgerblue",
        textAlign: "center",
        padding: "12px",
        textDecoration: "none",
        fontSize: "18px",
        lineHeight: "25px",
        borderRadius: "4px",
        marginLeft: "4px"
      }
    });

    this.contactLink = new Element("a", {
      props: {
        href: "#contact",
        textContent: "Contact"
      },
      css: {
        float: "left",
        color: "black",
        textAlign: "center",
        padding: "12px",
        textDecoration: "none",
        fontSize: "18px",
        lineHeight: "25px",
        borderRadius: "4px",
        marginLeft: "4px"
      }
    });

    this.aboutLink = new Element("a", {
      props: {
        href: "#about",
        textContent: "About"
      },
      css: {
        float: "left",
        color: "black",
        textAlign: "center",
        padding: "12px",
        textDecoration: "none",
        fontSize: "18px",
        lineHeight: "25px",
        borderRadius: "4px",
        marginLeft: "4px"
      }
    });

    // Build header structure
    this.headerRight.addChild(this.homeLink);
    this.headerRight.addChild(this.contactLink);
    this.headerRight.addChild(this.aboutLink);

    this.header.addChild(this.logo);
    this.header.addChild(this.headerRight);

    // --- Content section ---
    this.content = new Element("div", {
      css: {
        paddingLeft: "20px"
      }
    });

    this.content.addChild(
      new Element("h1", { props: { textContent: "Responsive Header" } })
    );

    this.content.addChild(
      new Element("p", {
        props: { textContent: "Resize the browser window to see the effect." }
      })
    );

    this.content.addChild(
      new Element("p", { props: { textContent: "Some content.." } })
    );

    // Add everything to root
    this.addChild(this.header);
    this.addChild(this.content);
  }

  onMount() {
    // Inject responsive CSS for mobile layout
    const style = document.createElement("style");
    style.textContent = `
      @media screen and (max-width: 500px) {
        .domicile-header-link {
          float: none !important;
          display: block !important;
          text-align: left !important;
        }
        .domicile-header-right {
          float: none !important;
        }
      }

      .domicile-header-link:hover {
        background-color: #ddd !important;
        color: black !important;
      }
    `;
    document.head.appendChild(style);

    // Add classes for media queries
    this.logo.dom.classList.add("domicile-header-link");
    this.homeLink.dom.classList.add("domicile-header-link");
    this.contactLink.dom.classList.add("domicile-header-link");
    this.aboutLink.dom.classList.add("domicile-header-link");
    this.headerRight.dom.classList.add("domicile-header-right");
  }
}

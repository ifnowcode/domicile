// https://www.w3schools.com/howto/howto_css_subnav.asp

class InlineDropdownNavbar extends Element {
  constructor(metadata = {}) {
    super("div", {
      css: {
        margin: "0",
        fontFamily: "Arial, Helvetica, sans-serif",
        boxSizing: "border-box"
      },
      props: { className: 'dropdown-navbar' },
      ...metadata
    });
    
    this.subnavs = [];
    this.counter = 0;

    InlineDropdownNavbar .injectCSSonce();

    // --- NAVBAR ROOT ---
    this.navbar = new Element("div", {
      css: {
        //overflow: "hidden",
        //backgroundColor: "#333"
      },
      props: { className: 'navbar' }
    });

    // --- HOME LINK ---
    const homeLink = this.makeNavLink("Home", "#home");

    // --- ABOUT SUBNAV ---
    const aboutSubnav = this.makeSubnav("About", [
      { label: "Company", href: "#company" },
      { label: "Team", href: "#team" },
      { label: "Careers", href: "#careers" }
    ]);
        
    this.subnavs.push(aboutSubnav);

    // --- SERVICES SUBNAV ---
    const servicesSubnav = this.makeSubnav("Services", [
      { label: "Bring", href: "#bring" },
      { label: "Deliver", href: "#deliver" },
      { label: "Package", href: "#package" },
      { label: "Express", href: "#express" }
    ]);
    
    this.subnavs.push(servicesSubnav);

    // --- PARTNERS SUBNAV ---
    const partnersSubnav = this.makeSubnav("Partners", [
      { label: "Link 1", href: "#link1" },
      { label: "Link 2", href: "#link2" },
      { label: "Link 3", href: "#link3" },
      { label: "Link 4", href: "#link4" }
    ]);
    
    this.subnavs.push(partnersSubnav);

    // --- CONTACT LINK ---
    const contactLink = this.makeNavLink("Contact", "#contact");

    // Build navbar
    this.navbar.addChild(homeLink);
    this.navbar.addChild(aboutSubnav[0]);
    this.navbar.addChild(servicesSubnav[0]);
    this.navbar.addChild(partnersSubnav[0]);
    this.navbar.addChild(contactLink);

    // --- CONTENT AREA ---
    this.content = new Element("div", {
      css: { padding: "0 16px" }
    });
    
    this.content.addChild(
      new Element("h3", {
        props: { textContent: "Subnav/dropdown menu inside a Navigation Bar" }
      })
    );

    this.content.addChild(
      new Element("p", {
        props: {
          textContent:
            'Hover over the "about", "services" or "partners" link to see the sub navigation menu.'
        }
      })
    );

    // Add everything to root
    this.addChild(this.navbar);
    this.addChild(this.content);
  }

  fjoo() {
    // For each subnav wrapper
    console.log("Subnavs", this.subnavs);
    this.subnavs.forEach(entry => {
      console.log("Sub Nav:", entry);
      const wrapper = entry[0].dom;
      const content = entry[1].dom;
        
      wrapper.addEventListener("mouseenter", () => {
        console.log("Mouse Enter:", content);
        content.style.display = "block";
        content.visible = true;
      });

      wrapper.addEventListener("mouseleave", () => {
        console.log("Mouse Leave:", content);
        content.style.display = "none";
        content.visible = '';
      });
    });
  }

  // --- Helper: Create a simple nav link ---
  makeNavLink(label, href) {
    return new Element("a", {
      props: { textContent: label, href },
      css: {
        float: "left",
        fontSize: "16px",
        color: "white",
        textAlign: "center",
        padding: "14px 16px",
        textDecoration: "none",
        borderRadius: "4px"
      }
    });
  }

  // --- Helper: Create a subnav dropdown ---
  makeSubnav(label, items) {
    const wrapper = new Element("div", {
      css: {
        //float: "left",
        //overflow: "hidden",
        //position: "relative"
      },
      props: { className: 'subnav' }
    });

    const button = new Element("button", {
      props: { className: 'subnavbtn', innerHTML: `${label} <i class="fa fa-caret-down"></i>` },
      css: {
        fontSize: "16px",
        border: "none",
        outline: "none",
        color: "white",
        padding: "14px 16px",
        backgroundColor: "inherit",
        fontFamily: "inherit",
        margin: "0",
        cursor: "pointer"
      }
    });

    const content = new Element("div", {
      css: {
        //display: "none",
        //position: "absolute",
        //left: "0",
        //backgroundColor: "red",
        //width: "100%",
        //zIndex: "1"
      },
      props: {id: `content${this.counter++}`, className: 'subnav-content'}
    });

    items.forEach(item => {
      content.addChild(
        new Element("a", {
          props: { textContent: item.label, href: item.href },
          css: {
            float: "left",
            color: "white",
            textDecoration: "none",
            padding: "14px 16px"
          }
        })
      );
    });

    wrapper.addChild(button);
    wrapper.addChild(content);
    //console.log("PUSH Wrapper:", wrapper, ", Content:", content);
    return [wrapper, content];
  }

  static injectCSSonce() {
    if (this._cssInjected) return;
    this._cssInjected = true;
    //console.log("Inject CSS");
    // Inject CSS for hover behavior + responsive layout
    const style = document.createElement("style");
    style.textContent = `
      .navbar {
        overflow: hidden;
        background-color: #333; 
      }
      .navbar a {
        float: left;
        font-size: 16px;
        color: white;
        text-align: center;
        padding: 14px 16px;
        text-decoration: none;
      }
      .subnav {
        float: left;
        overflow: hidden;
      }
      .subnav .subnavbtn {
        font-size: 16px;  
        border: none;
        outline: none;
        color: white;
        padding: 14px 16px;
        background-color: inherit;
        font-family: inherit;
        margin: 0;
      }
            .navbar a:hover, .subnav:hover .subnavbtn {
        background-color: red;
      }
      .subnav-content {
        display: none;
        position: absolute;
        left: 0;
        background-color: red;
        width: 100%;
        z-index: 1;
      }
      .subnav-content a {
        float: left;
        color: white;
        text-decoration: none;
      }
      .subnav-content a:hover {
        background-color: #eee;
        color: black;
      }
      .subnav:hover .subnav-content {
        display: block;
      }
      @media screen and (max-width: 500px) {
        .navbar a,
        .subnavbtn {
          float: none !important;
          display: block !important;
          text-align: left !important;
        }
      }
    `;
    document.head.appendChild(style);
  }
}

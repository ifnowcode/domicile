class ResponsiveSideNavLayout extends RegionalLayoutEx {
  constructor(metadata = {}) {
    super('div',
      {
        sidebar: {
          tag: "nav",
          css: {background: "red"},
          props: {className: "sidenav"}
        },
        main: {
          tag: "main",
          props: {className: "main"}
        }
      },
      {
        tag: "div",
        props: {className: "responsive-sidenav-layout"},
        css: {
          display: "flex",
          //width: "100%",
          //height: "100%",
          //position: "relative",
          overflow: "hidden",
          fontFamily: "Arial, sans-serif", 
          //fontSize: "18px", 
          margin: "0",
          padding: "0",
          boxSizing: "border-box",
          //fontFamily: "Arial, sans-serif",
          ...metadata.css
        },
        ...metadata
      }
    );

    ResponsiveSideNavLayout.injectCSS();

    // Toggle button lives at root
    this.toggleButton = new Element("button", {
      props: {
        className: "toggle",
        onclick: () => this.toggle(),
      }
    },
      new Element("i", { props: {className: "fa fa-bars" }})
    );
    this.addChild(this.toggleButton);

    // Sidebar content goes into the sidebar region (which IS the <nav>)
    const navList = new Element("ul", {},
      this.navItem("fa-home", "Home"),
      this.navItem("fa-envelope", "Messages"),
      this.navItem("fa-cog", "Settings")
    );
    this.addTo("sidebar", navList);

    // Main content goes into the main region (which IS the <main>)
    const header = new Element("header", {},
      new Element("h1", { props: {innerHTML: `<span style="color:${getRandomColor()};"><b>DOM</b></span>icile` }})
    );

    const article = new Element("article", {}, ...[
      new Element("section", { props: {textContent: "Lorem ipsum dolor sit amet..." }}),
      new Element("section", { props: {textContent: "Lorem ipsum dolor sit amet..." }})
    ]);

    this.addTo("main", header);
    this.addTo("main", article);
  }

  navItem(icon, label) {
    return new Element("li", {css: {textDecoration: "none"}},
      new Element("a", { props: {href: "#" }},
        new Element("i", {props: { className: `fa ${icon}` }}),
        new Element("span", { props: {textContent: label }})
      )
    );
  }

  toggle() {
    const nav = this.regions.sidebar.dom;
    if (!nav) return;

    if (window.innerWidth <= 768) {
      nav.classList.remove("min");
      nav.classList.toggle("active");
    } else {
      nav.classList.remove("active");
      nav.classList.toggle("min");
    }
  }

  static injectCSS() {
    if (this._cssInjected) return;
    this._cssInjected = true;

    const style = document.createElement("style");
    style.textContent = `
      .responsive-sidenav-layout button.toggle {
        z-index: 10;
        position: fixed;
        left: 12px;
        top: 10px;
        background-color: #575757;
        color: white;
        border: none;
        padding: 10px;
        cursor: pointer;
        z-index: 9999;
      }
      
      .responsive-sidenav-layout .sidenav ul { 
        list-style: none; 
        margin: 0; 
        padding: 0; 
      }
      
      .responsive-sidenav-layout nav {
        width: 250px;
        height: 100vh;
        background-color: #333;
        transition: all 0.3s;
        padding-top: 60px;
        &.min {
          width: 60px;
          span {
            opacity: 0;
          }
        }

        ul {
          color: white;

          a {
            display: flex;
            gap: 10px;
            padding: 10px 20px;
            color: white;
            text-decoration: none;
            &:hover {
              background-color: gray;
            }

            span {
              transition: opacity 0.3s ease-in-out;
            }

          }
        }
      }

      .responsive-sidenav-layout main {
        flex-grow: 1;
        display: flex;
        flex-direction: column;
      }

      .responsive-sidenav-layout header {
        height: 60px;
        display: flex;
        align-items: center;
        padding: 20px;
        border-bottom: 1px solid #ccc;
      }

      .responsive-sidenav-layout article {
        padding: 20px;
      }

      @media (max-width: 768px) {
        header {
          padding-left: 55px;
        }
        nav {
          position: fixed;
          left: -250px;
          top: 0;
        }

        nav.active {
          left: 0;
        }
        
        .main > header {
          padding-left: 55px; /* same as sample */
        }
      }

    `;
    document.head.appendChild(style);
  }
}

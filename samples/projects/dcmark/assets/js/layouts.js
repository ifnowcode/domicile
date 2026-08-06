// Full Page Layouts
// Was going to allow partials most layouts need full page consideration (we'll see)
// https://www.w3schools.com/html/html_layout.asp
// https://www.w3schools.am/html/html_layout.html
// https://www.w3schools.com/css/css_website_layout.asp
class Layout extends Element {
  constructor(tag = "div", metadata = {}) {
    super(tag, metadata);
    this._resizeObserver = null;
  }
}

class ResizeLayout extends Element {
  constructor(tag = "div", metadata = {}) {
    super(tag, metadata);
    this._resizeObserver = null;
  }

  onMount() {
    this._resizeObserver = new ResizeObserver(entries => {
      const rect = entries[0].contentRect;
      this.onResize(rect.width, rect.height);
    });
    this._resizeObserver.observe(this.dom);
  }

  onUnmount() {
    if (this._resizeObserver) {
      this._resizeObserver.disconnect();
      this._resizeObserver = null;
    }
  }

  onResize(width, height) {
    // default: do nothing
  }
}


class RegionalLayout extends Element {
  constructor(tag = "div", meta_regions = {}, metadata = {}) {
    super(tag, metadata);
    // Create named region containers
    this.regions = {};
    if (tracedebug) console.log(tag, "meta_regions", meta_regions);
    for (const [regionName, regionMeta] of Object.entries(meta_regions)) {
      const regionBox = new Box(regionMeta);
      this.regions[regionName] = regionBox;
      this.addChild(regionBox);
      if (tracedebug) console.log("Add Region:", regionName, regionBox, "THIS", this); 
    }
  }

  addTo(region, ...widgets) {
    const target = this.regions[region];
    if (!target) {
      throw new Error(`Unknown region: ${region}`);
    }

    // Flatten: allow addTo("main", w1, w2, [w3, w4])
    const flat = widgets.flat();

    for (const widget of flat) {
      target.addChild(widget);
    }

    return this; // optional chaining convenience
  }

  removeFrom(region, ...widgets) {
    const target = this.regions[region];
    if (!target) {
      throw new Error(`Unknown region: ${region}`);
    }

    // Flatten: allow addTo("main", w1, w2, [w3, w4])
    const flat = widgets.flat();

    for (const widget of flat) {
      target.removeChild(widget);
    }

    return this; // optional chaining convenience
  }
  
  onMount() {
    // Observe the layout’s own DOM element
    this._observer = new ResizeObserver(entries => {
      for (const entry of entries) {
        const { width, height } = entry.contentRect;
        this.onResize(width, height);
      }
    });

    this._observer.observe(this.dom);
  }
  
  onUnmount() {
    if (this._observer) {
      this._observer.disconnect();
      this._observer = null;
    }
  }

  onResize(width, height) {
    // Default: do nothing
    // Layout subclasses override this
  }

}

class RegionalLayoutEx extends Element {
  constructor(tag = "div", meta_regions = {}, metadata = {}) {
    super(tag, metadata);
    if (tracedebug) console.log("Layout:", tag); 
    // Create named region containers
    this.regions = {};
    if (tracedebug) console.log("meta_regions", meta_regions);
    for (const [regionName, regionMeta] of Object.entries(meta_regions)) {
      const regionBox = new Element(regionMeta.tag || 'div', regionMeta);
      this.regions[regionName] = regionBox;
      this.addChild(regionBox);
      if (tracedebug) console.log("Add Region:", regionName, regionBox, "THIS", this); 
    }
  }

  addTo(region, ...widgets) {
    const target = this.regions[region];
    if (!target) {
      throw new Error(`Unknown region: ${region}`);
    }

    // Flatten: allow addTo("main", w1, w2, [w3, w4])
    const flat = widgets.flat();

    for (const widget of flat) {
      target.addChild(widget);
    }

    return this; // optional chaining convenience
  }

  removeFrom(region, ...widgets) {
    const target = this.regions[region];
    if (!target) {
      throw new Error(`Unknown region: ${region}`);
    }

    // Flatten: allow addTo("main", w1, w2, [w3, w4])
    const flat = widgets.flat();

    for (const widget of flat) {
      target.removeChild(widget);
    }

    return this; // optional chaining convenience
  }
  
  onMount() {
    // Observe the layout’s own DOM element
    this._observer = new ResizeObserver(entries => {
      for (const entry of entries) {
        const { width, height } = entry.contentRect;
        this.onResize(width, height);
      }
    });

    this._observer.observe(this.dom);
  }
  
  onUnmount() {
    if (this._observer) {
      this._observer.disconnect();
      this._observer = null;
    }
  }

  onResize(width, height) {
    // Default: do nothing
    // Layout subclasses override this
  }

}

class FixedSidebarFlexLayout extends RegionalLayout {
  constructor(metadata = {}) {
    super(
      "div",
      {
        sidebar: { css: {
          //display: "flex",
          width: "200px",
          height: "100vh",
          padding: "20px",
          position: "fixed",
          top: "0",
          left: "0",
          backgroundColor: "#333",
          overflowX: "hidden"
        }},
        main: { css: {
          marginLeft: "200px",
          minHeight: "100vh",
          padding: "0 10px",
          //background: "red"
        }}
      },
      metadata
    );

    this.css = {
      display: "flex",
      flexDirection: "row",
      width: "100%",
      height: "100%",
      ...metadata.css
    };
    
    //FixedSidebarFlexLayout.injectCSS();
  }
  
  static injectCSS() {
    if (this._cssInjected) return;
    this._cssInjected = true;

    const style = document.createElement("style");
    style.textContent = ``;
    document.head.appendChild(style);
  }
}

class FixedSidebarFlexLayout2 extends RegionalLayout {
  constructor(metadata = {}) {
    super(
      "div",
      {
        sidebar: {
          css: {
            width: "200px",
            height: "100%",
            padding: "20px",
            position: "absolute",
            top: "0",
            left: "0",
            backgroundColor: "#333",
            overflowX: "hidden",
            boxSizing: "border-box",
            transition: "width 0.25s ease"
          }
        },
        main: {
          css: {
            marginLeft: "200px",
            minHeight: "100%",
            padding: "0 10px",
            boxSizing: "border-box",
            transition: "margin-left 0.25s ease"
          }
        }
      },
      metadata
    );

    this.css = {
      position: "relative",   // CRITICAL: makes sidebar absolute to this container
      display: "flex",
      flexDirection: "row",
      width: "100%",
      height: "100%",
      overflow: "hidden",
      ...metadata.css
    };
  }

  onMount() {
    // Find the previous sibling (NavBar)
    const prev = this.dom.previousElementSibling;
    if (!prev) return;

    const ro = new ResizeObserver(entries => {
      const { width, height } = entries[0].contentRect;
      this.dom.style.marginTop = height + "px";
      this.onResize(width, height);
    });

    ro.observe(prev);

    this._navObserver = ro;
  }

  onUnmount() {
    if (this._navObserver) {
      this._navObserver.disconnect();
      this._navObserver = null;
    }
  }


  onResize(width, height) {
    const sidebar = this.regions.sidebar.dom;
    const main = this.regions.main.dom;

    // Scaffold: adjust breakpoint as needed
    if (width < 600) {
      sidebar.style.width = "60px";
      main.style.marginLeft = "60px";
    } else {
      sidebar.style.width = "200px";
      main.style.marginLeft = "200px";
    }
  }

  onUnmount() {
    if (this._observer) {
      this._observer.disconnect();
      this._observer = null;
    }
  }
}

class CollapsableSidebarFlexLayout extends RegionalLayout {
  constructor(metadata = {}) {
    super(
      "div",
      {
        sidebar: {
          css: {
            width: "200px",
            height: "100vh",
            padding: "20px",
            position: "fixed",
            top: "0",
            left: "0",
            backgroundColor: "#333",
            overflowX: "hidden",
            transition: "width 0.25s ease"
          },
          props: { className: "sidebar collapsed" }
        },
        main: {
          css: {
            marginLeft: "200px",
            minHeight: "100vh",
            padding: "0 10px",
            transition: "margin-left 0.25s ease"
          },
          props: { className: 'main expanded-main' }
        }
      },
      metadata
    );

    this.css = {
      display: "flex",
      flexDirection: "row",
      width: "100%",
      height: "100%",
      ...metadata.css
    };

    // Add a collapse toggle button inside the sidebar
    const toggleBtn = new Element("button", {
      props: {
        textContent: "☰",
        className: "sidebar-toggle"
      },
      css: {
        background: "transparent",
        color: "white",
        border: "none",
        fontSize: "24px",
        cursor: "pointer",
        marginBottom: "20px"
      }
    });

    toggleBtn.metadata.props.onclick = () => {
      console.log("CLICK");
      this.toggleSidebar();
    }

    this.regions.sidebar.addChild(toggleBtn);
    this.regions.sidebar.addChild(new Element('br'));
    
    //this.updateMobileState();
    window.addEventListener("resize", () => this.updateMobileState());
    
    CollapsableSidebarFlexLayout.injectCSS();
  }
  
  updateMobileState() {
    const sidebar = this.regions.sidebar.dom;
    if (!sidebar.classList.contains("collapsed")) {
      this.toggleSidebar();
    }
  }

  toggleSidebar() {
    const sidebar = this.regions.sidebar.dom;
    const main = this.regions.main.dom;

    const collapsed = sidebar.classList.toggle("collapsed");

    if (collapsed) {
      main.classList.add("expanded-main");
    } else {
      main.classList.remove("expanded-main");
    }
  }

  static injectCSS() {
    if (this._cssInjected) return;
    this._cssInjected = true;

    const style = document.createElement("style");
    style.textContent = `
      /* Collapsed sidebar width */
      .collapsed {
        width: 60px !important;
      }

      /* Main content shifts left */
      .expanded-main {
        margin-left: 60px !important;
      }

      /* Hide all sidebar children EXCEPT the toggle button */
      .collapsed > *:not(.sidebar-toggle) {
        display: none !important;
      }

      /* Toggle button always visible */
      .sidebar-toggle {
        display: block;
      }

      /* ------------------------------
         RESPONSIVE AUTO-COLLAPSE
         ------------------------------ */
      /*
      @media (max-width: 500px) {
        .sidebar {
          width: 30px !important;
        }
        
        .sidebar > *:not(.sidebar-toggle) {
          display: none !important;
        }

        .main {
          margin-left: 60px !important;
        }
      }
      */
    `;
    document.head.appendChild(style);
  }
}

class dep_CollapsableSidebarFlexLayout2 extends RegionalLayout {
  constructor(metadata = {}) {
    super(
      "div",
      {
        sidebar: {
          css: {
            width: "200px",
            height: "100vh",
            padding: "20px",
            position: "fixed",
            top: "0",
            left: "0",
            backgroundColor: "#333",
            overflowX: "hidden",
            transition: "width 0.25s ease, transform 0.25s ease",
            zIndex: "1000"
          },
          props: { className: 'sidebar' }
        },
        main: {
          css: {
            marginLeft: "200px",
            minHeight: "100vh",
            padding: "0 10px",
            transition: "margin-left 0.25s ease"
          },
          props: { className: 'main' }
        }
      },
      metadata
    );

    this.css = {
      display: "flex",
      flexDirection: "row",
      width: "100%",
      height: "100%",
      ...metadata.css
    };

    CollapsableSidebarFlexLayout2.injectCSS();

    // Give regions stable class names
    this.regions.sidebar.metadata.props.className = "sidebar";
    this.regions.main.metadata.props.className = "main";

    // Add toggle button
    const toggleBtn = new Element("button", {
      props: {
        textContent: "☰",
        className: "sidebar-toggle"
      },
      css: {
        background: "transparent",
        color: "white",
        border: "none",
        fontSize: "24px",
        cursor: "pointer",
        marginBottom: "20px"
      }
    });

    toggleBtn.metadata.props.onclick = () => this.toggleSidebar();
    this.regions.sidebar.addChild(toggleBtn);

    // Detect mobile mode once on load
    //this.updateMobileState();
    //window.addEventListener("resize", () => this.updateMobileState());
  }

  updateMobileState() {
    const root = this.dom;
    if (root) {
      if (window.innerWidth <= 500) {
        root.classList.add("mobile");
        this.regions.sidebar.dom.classList.add("collapsed");
        this.regions.main.dom.classList.add("expanded-main");
      } else {
        root.classList.remove("mobile");
        this.regions.sidebar.dom.classList.remove("collapsed");
        this.regions.main.dom.classList.remove("expanded-main");
      }
    }
  }

  toggleSidebar() {
    const sidebar = this.regions.sidebar.dom;
    const main = this.regions.main.dom;
    const root = this.dom;

    if (root.classList.contains("mobile")) {
      // Mobile: fly-over mode
      sidebar.classList.toggle("open");
      return;
    }

    // Desktop: push mode
    const collapsed = sidebar.classList.toggle("collapsed");

    if (collapsed) {
      main.classList.add("expanded-main");
    } else {
      main.classList.remove("expanded-main");
    }
  }

  static injectCSS() {
    if (this._cssInjected) return;
    this._cssInjected = true;

    const style = document.createElement("style");
    style.textContent = `
      /* Desktop collapsed */
      .collapsed {
        width: 60px !important;
      }
      .expanded-main {
        margin-left: 60px !important;
      }
      .collapsed > *:not(.sidebar-toggle) {
        display: none !important;
      }

      /* Mobile mode */
      .mobile .sidebar {
        width: 200px !important;
        transform: translateX(-200px);
      }
      .mobile .sidebar.open {
        transform: translateX(0);
      }
      .mobile .main {
        margin-left: 0 !important;
      }
      .mobile .sidebar > *:not(.sidebar-toggle) {
        display: block !important;
      }
      .mobile .collapsed > *:not(.sidebar-toggle) {
        display: none !important;
      }

      .sidebar-toggle {
        display: block;
      }
    `;
    document.head.appendChild(style);
  }
}

class FlexNavLayout extends RegionalLayout {
  static defaults = {
    css: {},
    props: {},
    base: "",
    logoText: "",
    logoImage: null,
    links: []
  };

  constructor(metadata = {}) {
    // Define the two regions: flexbar and content
    super(
      "div",
      {
        flexbar: { css: {
            //display: "flex",
            //alignItems: "center",
            //padding: "10px",
            //gap: "10px",
            //background: "#eee",
            //borderBottom: "1px solid #ccc",
          },
          props: {
            className: "flexbar"
          }
        },
        main: {
          css: {
            padding: "20px",
          },
          props: { className: "content" }
        }
      },
      FlexNavLayout.applyDefaults(metadata)
    );
    
    FlexNavLayout.injectCSS();

    const { base, links } = this.metadata;

    // Build the flexbar contents
    const current = window.location.pathname;

    for (const link of links) {
      const fullHref = base + link.href;

      this.regions.flexbar.addChild(
        new Element("a", {
          css: { marginRight: "10px" },
          props: {
            textContent: link.label,
            href: fullHref,
            className: current === fullHref ? "active" : ""
          }
        })
      );
    }

  }

  static applyDefaults(metadata) {
    return {
      css: { ...this.defaults.css, ...(metadata.css || {}) },
      props: {
        ...this.defaults.props,
        id: "flexbar-page",
        className: "flexbar-page"
      },
      base: metadata.base ?? "",
      logoText: metadata.logoText ?? this.defaults.logoText,
      logoImage: metadata.logoImage ?? this.defaults.logoImage,
      links: metadata.links ?? this.defaults.links
    };
  }
  
  static injectCSS() {
    if (this._cssInjected) return;
    this._cssInjected = true;

    const style = document.createElement("style");
    style.textContent = `
      .flexbar {
          margin: 0;
          padding: 0;
          width: 200px;
          background-color: #444;
          position: fixed;
          height: 100%;
          overflow: auto;
        }
        .flexbar a {
          display: block;
          color: black;
          padding: 16px;
          text-decoration: none;
        }
         
        .flexbar a.active {
          background-color: #04AA6D;
          color: white;
        }
        .flexbar a:hover:not(.active) {
          background-color: #555;
          color: white;
        }
        div.content {
          margin-left: 200px;
          padding: 1px 16px;
          height: auto;
        }
        @media screen and (max-width: 700px) {
          .flexbar {
            width: 100%;
            height: auto;
            position: relative;
          }
          .flexbar a {float: left;}
          div.content {margin-left: 0;}
        }
        @media screen and (max-width: 400px) {
          .flexbar a {
            text-align: center;
            float: none;
          }
        }
    `;
    document.head.appendChild(style);
  }
}

class TwoColumnResponsiveLayout extends RegionalLayout {
  constructor(metadata = {}) {
    super(
      "div",
      {
        left: {
          css: {
            display: "flex",
            width: "45%",
            padding: "15px",
            float: "left",
            transition: "width 0.25s ease"
          },
          //props: {className: 'flexchild50'}
        },
        right: {
          css: {
            //display: "flex",
            //width: "50%",
            //margin: "10px",
            transition: "width 0.25s ease"
          }
        }
      },
      metadata
    );

    this.css = {
      display: "flex",
      flexDirection: "row",
      flexWrap: "wrap",
      width: "100%",
      ...metadata.css
    };
  }

  onMount() {
    this._observer = new ResizeObserver(entries => {
      const { width } = entries[0].contentRect;
      this.onResize(width);
    });

    this._observer.observe(this.dom);
  }

  onUnmount() {
    if (this._observer) {
      this._observer.disconnect();
      this._observer = null;
    }
  }
  
  onResize(width) {
    const left = this.regions.left.dom;
    const right = this.regions.right.dom;
    console.log(width,  "Left", left.style.width, ", Right", right.style.width);
    // Scaffold: adjust breakpoint and widths as needed
    if (width < 600) {
      left.style.width = "100%";
      //right.style.width = "100%";
    } else {
      left.style.width = "50%";
      //right.style.width = "50%";
    }
  }
}

class Toolbar extends RegionalLayout {
  constructor(metadata = {}) {
    super(
      {
        left: {},
        center: {},
        right: {}
      },
      {
        tag: "div",
        css: {
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          width: "100%",
          height: "40px",
          padding: "0 10px",
          boxSizing: "border-box",
          backgroundColor: "#f0f0f0",
          borderBottom: "1px solid #ccc",
          ...metadata.css
        },
        ...metadata
      }
    );

    // Region-level CSS
    this.regions.left.css = {
      display: "flex",
      alignItems: "center",
      gap: "8px"
    };

    this.regions.center.css = {
      flex: "1",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      gap: "8px"
    };

    this.regions.right.css = {
      display: "flex",
      alignItems: "center",
      gap: "8px"
    };
  }
}

//////////////////////////////////////////////////////////////////////////////
// Not sure where the ultimate home is for this, need to understand better
//////////////////////////////////////////////////////////////////////////////
class GridLayout extends Element {
  constructor(metadata={}, ...children) {
    super('div', metadata, ...children);
  }
  static defaults = {
    css: {
      padding: '10px',
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))',
      gap: '1rem',
    },
    props: { className: 'box'},
  };
}

if(registration) GridLayout.register();

function GridLayoutDemo() {
  return new GridLayout({},
    new Element('div', { css: { background: getRandomColor(), padding: '1rem'}, props: { textContent: 'Item 1'}}),
    new Element('div', { css: { background: getRandomColor(), padding: '1rem'}, props: { textContent: 'Item 2'}}),
    new Element('div', { css: { background: getRandomColor(), padding: '1rem'}, props: { textContent: 'Item 3'}}),
    new Element('div', { css: { background: getRandomColor(), padding: '1rem'}, props: { textContent: 'Item 4'}}),
    new Element('div', { css: { background: getRandomColor(), padding: '1rem'}, props: { textContent: 'Item 5'}}),
    new Element('div', { css: { background: getRandomColor(), padding: '1rem'}, props: { textContent: 'Item 6'}}),
  );
}

//if(registration) GridLayoutDemo.register()
// https://www.w3schools.com/howto/howto_js_navbar_sticky.asp
// https://www.w3schools.com/howto/howto_css_navbar_image.asp
// https://www.w3schools.com/howto/howto_css_dropdown.asp hover
// https://www.w3schools.com/Css/css_navbar.asp

class dep_NavBar extends Box {
  constructor(metadata = {}) {
    super({
      base,
      css: {
        display: "flex",
        flexWrap: "wrap",
        alignItems: "center",
        padding: "10px",
        width: "100%",
        ...(metadata.css || {})
      },
      props: {
        ...(metadata.props || {className: `dc-nav-bar`})
      }
    });
    console.trace("::: NavBar construction");
    this.container = new Element('div', {css: {
        display: "flex",
        flexWrap: "wrap",
        alignItems: "center",
        padding: "10px",
        width: "100%",
        ...(metadata.css || {})
    }});
    let color = getRandomColor();
    //#2C5C78 nice slate blue
    console.log("[color] RANDOM:", color);
    this.container.addChild(new Element('span', {
                        css: {
                          fontSize: '24px',
                          margin: '0 10px',
                        },
                        props: {
                          innerHTML: `<span style=\"color:${color};\"><b>DOM</b></span>icile`
                        }
                      }));

    this.container.addChild(new Element('a', {
      css: {marginRight: '10px'},
      props: {textContent: "Home", href: base + "/"}
    }));

    this.container.addChild(new Element('a', {
      css: {marginRight: '10px'},
      props: {textContent: "Slides", href: base + "/slides"}
    }));

    this.container.addChild(new Element('a', {
      css: {marginRight: '10px'},
      props: {textContent: "Carousel", href: base + "/carousel"}
    }));

    this.container.addChild(new Element('a', {
      css: {marginRight: '10px'},
      props: {textContent: "Test", href: base + "/test"}
    }));

    this.container.addChild(new Element('a', {
      css: {marginRight: '10px'},
      props: {textContent: "About", href: base + "/about"}
    }));

    const clock = new DigitalClock({
      css: {
        marginLeft: "auto",
        padding: '0 30px',
        fontFamily: "monospace",
        fontSize: "24px"
      }
    });
    this.container.addChild(clock);

    this.addChild(this.container);
    this.addChild(new Element("hr", {
      css: {
        flexBasis: "100%",
        height: "1px" // optional
      }
    }));
  }
}

class dep_NavBar2 extends Box {
  constructor(metadata = {}) {
    super({
      css: {
        display: "flex",
        flexWrap: "wrap",
        alignItems: "center",
        padding: "10px",
        width: "100%",
        ...(metadata.css || {})
      },
      props: {
        ...(metadata.props || { className: `dc-nav-bar-2` })
      }
    });

    this.container = new Element("div", {
      css: {
        display: "flex",
        flexWrap: "wrap",
        alignItems: "center",
        width: "100%",
        gap: "10px",
        ...(metadata.css || {})
      }
    });

    const color = getRandomColor();

    this.container.addChild(
      new Element("span", {
        css: {
          fontSize: "24px",
          margin: "0 10px"
        },
        props: {
          innerHTML: `<span style="color:${color};"><b>DOM</b></span>icile`
        }
      })
    );

    const links = [
      ["Home", "/"],
      ["Slides", "/slides"],
      ["Carousel", "/carousel"],
      ["Test", "/test"],
      ["About", "/about"]
    ];

    for (const [label, path] of links) {
      this.container.addChild(
        new Element("a", {
          css: { marginRight: "10px" },
          props: { textContent: label, href: urel + path }
        })
      );
    }

    const clock = new DigitalClock({
      css: {
        marginLeft: "auto",
        minWidth: "0",
        padding: "0 30px",
        fontFamily: "monospace",
        fontSize: "24px"
      }
    });

    this.container.addChild(clock);

    this.addChild(this.container);

    this.addChild(
      new Element("hr", {
        css: {
          flexBasis: "100%",
          height: "1px"
        }
      })
    );
  }
}

class NavBarHLink_dep extends Box {
  static defaults = {
    css: {},
    props: {},
    base: "",
    logoText: "",
    logoImage: null,
    links: []
  };

  constructor(metadata = {}) {
    super(NavBarLink.applyDefaults(metadata));

    const { base, logoText, logoImage, links } = this.metadata;

    // --- FLEX CONTAINER ---
    this.container = new Element("div", {
      css: {
        display: "flex",
        flexWrap: "wrap",
        alignItems: "center",
        width: "100%",
        gap: "10px",
        padding: "10px"
      }
    });

    // --- LOGO AREA ---
    const logoWrapper = new Element("div", {
      css: {
        display: "flex",
        alignItems: "center",
        gap: "10px",
        fontSize: "24px",
        margin: "0 10px"
      }
    });

    if (logoImage) {
      logoWrapper.addChild(
        new Element("img", {
          css: {
            height: "32px",
            width: "32px",
            objectFit: "contain"
          },
          props: { src: logoImage, alt: logoText || "Logo" }
        })
      );
    }

    if (logoText) {
      logoWrapper.addChild(
        new Element("span", {
          css: {
          fontSize: "24px",
          margin: "0 10px",
        },
        props: {
          innerHTML: logoText,
        }
        })
      );
    }

    this.container.addChild(logoWrapper);

    // --- LINKS ---
    for (const link of links) {
      if (tracedebug) console.log("UREL Link:", base + link.href);
      this.container.addChild(
        new Element("a", {
          css: { 
            display: "block",
            marginRight: "10px",
            color: "white",
          },
          props: {
            textContent: link.label,
            href: base + link.href
          }
        })
      );
    }

    // --- CLOCK ---
    const clock = new DigitalClock({
      css: {
        marginLeft: "auto",
        minWidth: "0",
        padding: "0 30px",
        fontFamily: "monospace",
        fontSize: "24px"
      }
    });
    this.container.addChild(clock);

    // Add container + divider
    this.addChild(this.container);

    this.addChild(
      new Element("hr", {
        css: {
          flexBasis: "100%",
          height: "1px"
        }
      })
    );
  }

  static applyDefaults(metadata) {
    return {
      css: { ...this.defaults.css, ...(metadata.css || {}) },
      props: { ...this.defaults.props, ...({className: 'dc-nav-bar'}) },
      base: metadata.base ?? "",
      logoText: metadata.logoText ?? this.defaults.logoText,
      logoImage: metadata.logoImage ?? this.defaults.logoImage,
      links: metadata.links ?? this.defaults.links,
    };
  }
}

// this works!
class NavBarLink extends Element {
  static defaults = {
    css: {},
    props: {},
    base: "",
    logoText: "",
    logoImage: null,
    popoff: true,
    links: []
  };

  constructor(metadata = {}) {
    super('div', NavBarLink.applyDefaults(metadata));

    const { base, popoff, logoText, logoHTML, logoImage, links } = this.metadata;
    // --- FLEX CONTAINER ---
    this.container = new Element("div", {
      css: {
        display: "flex",
        //flexDirection: "column",  // set by caller
        //flexWrap: "wrap",         // set by caller
        //alignItems: "flex-start",
        width: "100%",
        gap: "10px",
        padding: "10px",
        ...metadata.css
      }
    });

    // --- LOGO AREA ---
    const logoWrapper = new Element("div", {
      css: {
        display: "flex",
        alignItems: "center",
        gap: "10px",
        fontSize: "24px",
        margin: "0 10px"
      }
    });

    if (logoImage) {
        logoWrapper.addChild(new Link({ base, props: { href: '/'}},
          new Element("img", {
            css: { 
              //height: "32px",
              //width: "32px",
              objectFit: "contain"
            },
            props: { className: "dc-nav-logo-img", src: logoImage }
          })
        )
      );
    }

    //const color = getRandomColor();

    if (logoText || logoHTML) { // classNames: .nav-logo-font {}
      logoWrapper.addChild(
        new Link( { base, props: { href: "/" } },
          new Element("div", {
            //css: { fontSize: "22px", fontWeight: "bold" },
            props: {
              className: "dc-nav-logo-text",
              ...(logoHTML ? { innerHTML: logoHTML } : { textContent: logoText })
            }
          })
        )
      );
    }

    this.container.addChild(logoWrapper);

    // --- LINKS ---
    for (const link of links) {
      if (tracedebug) console.log("UREL Link:", base + link.href);
      this.container.addChild(
        new LinkNav({
          base,
          popoff: popoff,
          css: { 
            //display: "block",
            marginRight: "10px",
            color: "white",
          },
          props: {
            textContent: link.label,
            href: link.href
          }
        })
      );
      //this.container.addChild(new Element('br'));
    }

    // --- CLOCK ---
    /*
    const clock = new DigitalClock({
      css: {
        marginLeft: "auto",
        minWidth: "0",
        padding: "0 30px",
        fontFamily: "monospace",
        fontSize: "24px"
      }
    });
    this.container.addChild(clock);
    */
    
    // Add container + divider
    this.addChild(this.container);

    this.addChild(
      new Element("hr", {
        css: {
          flexBasis: "100%",
          height: "1px"
        }
      })
    );
  }

  static applyDefaults(metadata) {
    return {
      css: { ...this.defaults.css, ...(metadata.css || {}) },
      props: { ...this.defaults.props, ...({className: 'dc-nav-bar'}) },
      base: metadata.base ?? "",
      popoff: metadata.popoff ?? true,
      logoText: metadata.logoText ?? this.defaults.logoText,
      logoImage: metadata.logoImage ?? this.defaults.logoImage,
      links: metadata.links ?? this.defaults.links,
    };
  }
}

// this works!
class NavBarHLink extends NavBarLink {
  constructor(metadata = {}) {
    const merged = {
      ...metadata,
      css: {
        ...(metadata.css || {}),
        flexWrap: "wrap",
        alignItems: "center",
      },
      props: {
        ...(metadata.props || {}),
      },
    };

    super(merged);
  }
}

// this works!
class NavBarVLink extends NavBarLink {
  constructor(metadata = {}) {
    const merged = {
      ...metadata,
      css: {
        ...(metadata.css || {}),
        flexDirection: "column",
        alignItems: "flex-start",
      },
      props: {
        ...(metadata.props || {}),
      },
    };

    super(merged);
  }
}

// this works!
class NavBarDropdown extends Box {
  static defaults = {
    css: {},
    props: {},
    base: "",
    logoText: "",
    logoHTML: null,
    logoImage: null,
    menus: [] // supports one level of links
  };

  constructor(metadata = {}) {
    super(NavBarDropdown.applyDefaults(metadata));
    const { base, logoText, logoHTML, logoImage, menus = [] } = this.metadata;
    console.log("FUCK", this.metadata);
    // --- FLEX CONTAINER ---
    this.container = new Element("div", {
      css: {
        display: "flex",
        flexWrap: "wrap",
        alignItems: "center",
        width: "100%",
        gap: "10px",
        padding: "10px"
      }
    });

    // --- LOGO AREA ---
    const logoWrapper = new Element("div", {
      css: {
        display: "flex",
        alignItems: "center",
        gap: "10px",
        fontSize: "24px",
        margin: "0 10px"
      }
    });

    if (logoImage) {
        logoWrapper.addChild(new Link({ base, props: { href: '/'}},
          new Element("img", {
            css: { 
              //height: "32px",
              //width: "32px",
              objectFit: "contain"
            },
            props: { className: "dc-nav-logo-img", src: logoImage }
          })
        )
      );
    }

    //const color = getRandomColor();

    if (logoText || logoHTML) { // classNames: .nav-logo-font {}
      logoWrapper.addChild(
        new Link( { base, props: { href: "/" } },
          new Element("div", {
            //css: { fontSize: "22px", fontWeight: "bold" },
            props: {
              className: "dc-nav-logo-text",
              ...(logoHTML ? { innerHTML: logoHTML } : { textContent: logoText })
            }
          })
        )
      );
    }

    this.container.addChild(logoWrapper);

    // --- LINKS OR DROPDOWNS ---
    for (const item of menus) {
      if (item.items) {
        // Dropdown or cascading dropdown
        this.container.addChild(this.buildDropdown(item, base));
      } else {
        // Simple link
        this.container.addChild(
          new Element("a", {
            css: { marginRight: "10px" },
            props: {
              textContent: item.label,
              href: base + item.href
            }
          })
        );
      }
    }

    // --- CLOCK ---
    const clock = new DigitalClock({
      css: {
        marginLeft: "auto",
        minWidth: "0",
        padding: "0 30px",
        fontFamily: "monospace",
        fontSize: "24px"
      }
    });

    this.container.addChild(clock);

    // Add container + divider
    this.addChild(this.container);

    this.addChild(
      new Element("hr", {
        css: { flexBasis: "100%", height: "1px" }
      })
    );
  }

  // --- Build dropdowns recursively ---
  buildDropdown(item, base) {
    const wrapper = new Box({
      css: { display: "flex", flexDirection: "column", marginRight: "10px" },
      //props: { className: "nav-select-wrap" }
    });

    const select = new Element("select", {
      props: {
        className: "dc-nav-select",
        onchange: (e) => {
          // -1 to compensate for the disable item assuming that is not counted because I need to do this. I believe for that reason.
          const selected = item.items[e.target.selectedIndex-1];
          if (selected.href) {
            window.location.href = base + selected.href;
          }
        }
      }
    });
    
    select.addChild(
      new Element("option", {
        props: { textContent: item.label, disabled: "", selected: "" }
      })
    );

    // Populate first-level items
    for (const opt of item.items) {
      select.addChild(
        new Element("option", {
          props: { textContent: opt.label }
        })
      );
    }

    wrapper.addChild(select);

    // If cascading: build nested dropdowns
    for (const opt of item.items) {
      if (opt.options) {
        wrapper.addChild(this.buildDropdown(opt, base));
      }
    }

    return wrapper;
  }

  static applyDefaults(metadata) {
    return {
      css: { ...this.defaults.css, ...(metadata.css || {}) },
      props: { ...this.defaults.props, className: "dc-nav-bar" },
      base: metadata.base ?? "",
      logoText: metadata.logoText ?? this.defaults.logoText,
      logoHTML:  metadata.logoHTML ?? this.defaults.logoHTML,
      logoImage: metadata.logoImage ?? this.defaults.logoImage,
      menus: metadata.menus ?? this.defaults.menus
    };
  }
}

// this works!
class NavBarTopBase extends BoxBox {
  static defaults = {
    css: {
      //display: "flex",
      alignItems: "center",
      gap: "20px",
      //padding: "10px 20px",
      backgroundColor: "var(--dc-nav-bg)",
      //borderBottom: "1px solid #ddd",
      position: "relative",
      //zIndex: 1000
    },
    props: {},
    base: "",
    logoText: "",
    logoHTML: null,
    logoImage: null,
    menus: [] // now supports links OR dropdowns OR nested dropdowns
  };

  constructor(metadata = {}) {
    let innermeta = {
      css: {
        display: "flex",
        flexWrap: "wrap",
        alignItems: "center",
        width: "100%",
        gap: "10px",
        padding: "10px"
      }
    };
    super(innermeta, NavBarTopBase.applyDefaults(metadata));
    //this._inner = new Box(innermeta);
    //this.addChild(this._inner);
  }

  static applyDefaults(metadata) {
    return {
      css: { ...this.defaults.css, ...(metadata.css || {}) },
      props: { ...this.defaults.props, className: "dc-nav-bar" },
      base: metadata.base ?? "",
      logoText: metadata.logoText ?? this.defaults.logoText,
      logoHTML: metadata.logoHTML ?? this.defaults.logoHTML,
      logoImage: metadata.logoImage ?? this.defaults.logoImage,
      menus: metadata.menus ?? this.defaults.menus
    };
  }

  // --- Utility Methods ---
  sticky(on = true) {
    this.metadata.css.position = on ? "sticky" : "relative";
    this.metadata.css.top = on ? "0" : "";
    this.refresh();
    return this;
  }

  background(color) {
    this.metadata.css.backgroundColor = color;
    this.refresh();
    return this;
  }

  spacing(px) {
    this.metadata.css.padding = `${px}px`;
    this.refresh();
    return this;
  }

  addLeft(child) {
    this._inner.addChild(child);
    return this;
  }

  addRight(child) {
    child.metadata.css.marginLeft = "auto";
    this._inner.addChild(child);
    return this;
  }
}

// BUG: this doesn't appear to be working. All instances using NavBarTopHoverDDX1
class NavBarTopHover_dep extends NavBarTopBase {
  constructor(metadata = {}) {
    super({
      ...metadata,
      css: {
        display: "flex",
        flexWrap: "wrap",
        alignItems: "center",
        gap: "10px",
        padding: "10px 16px",
        ...(metadata.css || {})
      }
    });

    const { logoText, logoImage, menus = [] } = metadata;

    NavBarTopHover.injectCSS();

    // --- Logo ---
    if (logoText || logoImage) {
      const logo = new Box({
        css: { display: "flex", alignItems: "center", gap: "10px" }
      });

      if (logoImage) {
        logo.addChild(
          new Element("img", {
            css: { height: "32px", width: "32px", objectFit: "contain" },
            props: { src: logoImage }
          })
        );
      }

      if (logoText) {
        logo.addChild(
          new Element("span", {
            css: { fontSize: "22px", fontWeight: "bold" },
            props: { textContent: logoText }
          })
        );
      }

      this.addLeft(logo);
    }

    // --- Menus ---
    for (const item of menus) {
      this.addLeft(this.buildMenuItem(item));
    }
  }

  buildMenuItem(item, level = 0) {
    if (item.items && Array.isArray(item.items)) {
      return this.buildDropdown(item, level);
    }
    if (item.href) {
      return this.buildLink(item);
    }
    return new Element("span", {
      css: { padding: "8px 12px" },
      props: { textContent: item.label }
    });
  }

  buildLink(item) {
    return new Element("a", {
      css: {
        padding: "8px 12px",
        textDecoration: "none",
        color: "#333",
        cursor: "pointer",
        display: "inline-block",
        whiteSpace: "nowrap"
      },
      props: {
        textContent: item.label,
        href: item.href
      }
    });
  }

  buildDropdown(item, level = 0) {
    const wrapper = new Box({
      props: { className: "nav-dropdown" },
      css: {
        position: "relative",
        display: "flex",
        flexDirection: "column"
      }
    });

    const button = new Element("button", {
      props: {
        className: "nav-dropbtn",
        type: "button",
        textContent: item.label
      },
      css: {
        padding: "8px 12px",
        cursor: "pointer",
        userSelect: "none",
        backgroundColor: "#eee",
        borderRadius: "4px",
        border: "1px solid #ddd",
        whiteSpace: "nowrap"
      }
    });

    wrapper.addChild(button);

    const content = new Box({
      props: { className: "nav-dropdown-content" },
      css: {
        display: "none",
        position: "absolute",
        backgroundColor: "#f9f9f9",
        minWidth: "160px",
        boxShadow: "0px 8px 16px rgba(0,0,0,0.2)",
        zIndex: 1000,
        flexDirection: "column",
        left: level === 0 ? "0" : "100%",
        top: level === 0 ? "100%" : "0"
      }
    });

    for (const sub of item.items) {
      content.addChild(this.buildMenuItem(sub, level + 1));
    }

    wrapper.addChild(content);

    // --- Interaction: click first, hover as enhancement ---
    const toggleOpen = () => {
      if (!wrapper.dom) return;
      wrapper.dom.classList.toggle("open");
    };

    button.metadata.props.onclick = (e) => {
      e.stopPropagation();
      toggleOpen();
    };

    // Hover only when pointer is fine (desktop)
    if (window.matchMedia && window.matchMedia("(pointer: fine)").matches) {
      wrapper.metadata.props.onmouseenter = () => {
        wrapper.dom.classList.add("open");
      };
      wrapper.metadata.props.onmouseleave = () => {
        wrapper.dom.classList.remove("open");
      };
    }

    return wrapper;
  }

  static injectCSS() {
    if (this._cssInjected) return;
    this._cssInjected = true;

    const style = document.createElement("style");
    style.textContent = `
      /* Base layout */
      .dc-nav-bar,
      .nav-bar-hover {
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        gap: 10px;
      }

      .nav-dropdown {
        position: relative;
        display: flex;
        flex-direction: column;
      }

      .nav-dropdown-content {
        display: none;
      }

      .nav-dropdown.open > .nav-dropdown-content {
        display: flex;
      }

      /* Mobile: dropdowns inline, full width */
      @media (max-width: 768px) {
        .nav-dropdown {
          width: 100%;
        }

        .nav-dropbtn {
          width: 100%;
          text-align: left;
        }

        .nav-dropdown-content {
          position: static !important;
          box-shadow: none;
          min-width: 100%;
        }
      }
    `;
    document.head.appendChild(style);
  }
}

// this works!
class NavBarTopHoverDD1X extends NavBarTopBase {
  constructor(metadata = {}) {
    super(metadata);
    const { base, logoText, logoHTML, logoImage, menus = [] } = metadata;
    
    NavBarTopHoverDD1X.injectCSS();
    
    // TODO: add parameter for link/button padding?
    // --- Logo ---
    if (logoText || logoImage || logoHTML) {
      const logo = new Box({
        css: { display: "flex",
               alignItems: "center",
               flexWrap: "wrap",
               //gap: "10px"
        },
        props: { className: "dc-nav-logo" }
      });

      if (logoImage) {
          logo.addChild(new Link({ base, props: { href: '/'}},
            new Element("img", {
              css: { 
                //height: "32px",
                //width: "32px",
                objectFit: "contain"
              },
              props: { className: "dc-nav-logo-img", src: logoImage }
            })
          )
        );
      }

      if (logoText || logoHTML) { // classNames: .nav-logo-font {}
        logo.addChild(
          new LinkNav( { base, props: { href: "/" } },
            new Element("div", {
              //css: { fontSize: "22px", fontWeight: "bold" },
              props: {
                className: "dc-nav-logo-text",
                ...(logoHTML ? { innerHTML: logoHTML } : { textContent: logoText })
              }
            })
          )
        );

        this.addLeft(logo);
      }
    }

    // --- Mixed Menus ---
    for (const item of menus) {
      this.addLeft(this.buildMenuItem(item));
    }

    // --- CLOCK ---
    const clock = new DigitalClock({
      css: {
        //marginLeft: "auto",
        //minWidth: "0",
        //padding: "0 30px",
        //fontFamily: "monospace",
        //fontSize: "24px"
      },
      props: { className: "dc-nav-digitalclock" }
    });

    this.addRight(clock);
  }

  // --- Decide what kind of menu item to build ---
  buildMenuItem(item, level=0) {
    if (tracemenu) console.log("[menu] Build Item:", item);
    if (item.items && Array.isArray(item.items)) {
      if (tracemenu) console.log("[menu] Build Dropdown:", item);
      return this.buildDropdown(item, level);
    }

    if (item.href) {
      if (tracemenu) console.log("[menu] Build Link:", item);
      return this.buildLink(item);
    }

    // fallback: label only
    if (tracemenu) console.log("[menu] Return Span:", item);
    return new Element("span", {
      css: { padding: "10px 16px" },
      props: { textContent: "label|" + item.label }
    });
  }

  // --- Simple Link ---
  buildLink(item) {
    return new LinkNav({
      base: this.metadata.base,
      css: {
        //padding: "6px 10px", // padding for link and button must match
        //textDecoration: "none",
        //color: "#eee",
        //cursor: "pointer",
        ////leftMargin: "0px",
      },
      props: {
        className: "dc-nav-dropdown-link",
        textContent: item.label,
        href: item.href
      }
    });
  }

  // --- Hover Dropdown (recursive) ---
  buildDropdown(item, level=0) {
    if (tracemenu) console.log("[menu] Build Dropdown:", item);
    const dropdown = new Box({
      css: {
        position: "relative",
        display: "flex",
        flexDirection: "column",
        //background: "#444",
        //color: "#eee",
        //padding: "6px 10px"
      },
      props: { className: "dc-nav-dropdown-box" },
    });

    // Button
    const button = new Box({
      css: {
        ////padding: "10px 16px", // padding for link and button must match
        //cursor: "pointer",
        //userSelect: "none",
        ////backgroundColor: "#444",
        //color: "#888",
        //borderRadius: "4px",
        //whiteSpace: "nowrap"
      },
      props: { className: "dc-nav-dropdown-button", textContent: item.label }
    });

    dropdown.addChild(button);

    // Dropdown content
    const content = new Box({
      css: {
        display: "none",
        position: "absolute",
        backgroundColor: "#222",
        minWidth: "160px",
        boxShadow: "0px 8px 16px rgba(0,0,0,0.2)",
        padding: `10px 16px 10px 10px`,
        zIndex: 1000,
        flexDirection: "column",
        left: level === 0 ? "0" : "100%",
        top: level === 0 ? "100%" : "0"
      },
      props: { className: "dc-nav-dropdown-content"}
    });

    // Populate items (recursive)
    for (const sub of item.items) {
      if (tracemenu) console.log("[menu] SUB:", sub);
      if (sub.items) {
        content.addChild(this.buildMenuItem(sub, level + 1));
      } else {
        content.addChild(this.buildLink(sub));
      }
    }

    dropdown.addChild(content);

    // --- Interaction: click first, hover as enhancement ---
    const toggleOpen = () => {
      if (!dropdown.dom) return;
      //dropdown.dom.classList.toggle("open");
      if (content.dom.style.display === 'flex') {
        content.dom.style.display = 'none';
      } else {
        content.dom.style.display = 'flex';
      }
    };

    button.metadata.props.onclick = (e) => {
      e.stopPropagation();
      toggleOpen();
    };

    // Hover behavior
    button.metadata.props.onmouseenter = () => {
      if (tracemenu) console.log("[menu] On Mouse Enter");
      content.dom.style.display = 'flex';
      //content.metadata.css.display = "flex";
      //content.refresh();
    };

    dropdown.metadata.props.onmouseleave = () => {
      if (tracemenu) console.log("[menu] On Mouse Leave");
      content.dom.style.display = 'none';
      //content.metadata.css.display = "none";
      //content.refresh();
    };

    return dropdown;
  }

  static injectCSS() {
    if (this._cssInjected) return;
    this._cssInjected = true;

    const style = document.createElement("style");
    style.textContent = `
      .dropdown .dropdown-content {
        display: none;
      }
      .dropdown.open .dropdown-content {
        display: flex !important;
      }
      @media (max-width: 768px) {
        .dropdown .dropdown-content {
          position: static !important;
          display: none;
          box-shadow: none;
          min-width: 100%;
        }

        .dropdown.open .dropdown-content {
          display: flex !important;
        }

        { .dropbtn { width: 100%; } }
      }
    `;
    document.head.appendChild(style);
  }
}

// BUG: only shows one level, no multi cascade except when vertical and then still has issues with functionality (jumpy can't access lower menus)
class NavBarTopHoverUL1X extends NavBarTopBase {
  constructor(metadata = {}) {
    super(metadata);
    const { base, logoText, logoHTML, logoImage, menus = [] } = metadata;

    NavBarTopHoverUL1X.injectCSS();

    if (logoText || logoImage || logoHTML) {
      const logo = new Box({
        css: {
          display: "flex",
          alignItems: "center",
          flexWrap: "wrap",
        },
        props: { className: "dc-nav-logo" }
      });

      if (logoImage) {
        logo.addChild(
          new Link({ base, props: { href: "/" } },
            new Element("img", {
              css: { objectFit: "contain" },
              props: { className: "dc-nav-logo-img", src: logoImage }
            })
          )
        );
      }

      if (logoText || logoHTML) {
        logo.addChild(
          new LinkNav({ base, props: { href: "/" } },
            new Element("div", {
              props: {
                className: "dc-nav-logo-text",
                ...(logoHTML ? { innerHTML: logoHTML } : { textContent: logoText })
              }
            })
          )
        );

        this.addLeft(logo);
      }
    }

    const nav = new Element("ul", {
      props: { className: "dc-nav-ul" }
    });

    for (const item of menus) {
      nav.addChild(this.buildMenuItem(item));
    }

    this.addLeft(nav);

    const clock = new DigitalClock({
      props: { className: "dc-nav-digitalclock" }
    });

    this.addRight(clock);
  }

  buildMenuItem(item, level = 0) {
    if (item.items && Array.isArray(item.items)) {
      return this.buildDropdown(item, level);
    }

    if (item.href) {
      return this.buildLinkItem(item);
    }

    return new Element("li", {
      props: { className: "dc-nav-li" },
      children: [
        new Element("span", {
          props: { textContent: item.label }
        })
      ]
    });
  }

  buildLinkItem(item) {
    const li = new Element("li", {
      props: { className: "dc-nav-li" }
    });

    li.addChild(
      new LinkNav({
        base: this.metadata.base,
        props: {
          className: "dc-nav-link",
          textContent: item.label,
          href: item.href
        }
      })
    );

    return li;
  }

  buildDropdown(item, level = 0) {
    const li = new Element("li", {
      props: { className: "dc-nav-li dc-nav-dropdown" }
    });

    const button = new Element("button", {
      props: {
        className: "dc-nav-dropbtn",
        type: "button",
        textContent: item.label
      }
    });

    const submenu = new Element("ul", {
      props: { className: "dc-nav-submenu" }
    });

    for (const sub of item.items) {
      submenu.addChild(this.buildMenuItem(sub, level + 1));
    }

    li.addChild(button);
    li.addChild(submenu);

    button.metadata.props.onclick = (e) => {
      e.stopPropagation();
      li.dom.classList.toggle("open");
    };

    li.metadata.props.onmouseenter = () => {
      li.dom.classList.add("open");
    };

    li.metadata.props.onmouseleave = () => {
      li.dom.classList.remove("open");
    };

    return li;
  }

  static injectCSS() {
    if (this._cssInjected) return;
    this._cssInjected = true;

    const style = document.createElement("style");
    style.textContent = `
      .dc-nav-ul,
      .dc-nav-submenu {
        list-style: none;
        margin: 0;
        padding: 0;
      }

      .dc-nav-ul {
        display: flex;
        align-items: stretch;
        gap: 0;
      }

      .dc-nav-li {
        position: relative;
      }

      .dc-nav-link,
      .dc-nav-dropbtn {
        display: flex;
        align-items: center;
        padding: 10px 16px;
        text-decoration: none;
        color: #e6eaf2;
        background: transparent;
        border: 0;
        cursor: pointer;
        font: inherit;
        white-space: nowrap;
      }

      .dc-nav-link:hover,
      .dc-nav-dropbtn:hover {
        background: rgba(91, 141, 239, 0.14);
        color: #ffffff;
      }

      .dc-nav-submenu {
        display: none;
        position: absolute;
        top: 100%;
        left: 0;
        min-width: 180px;
        background: linear-gradient(180deg, #1b1f27 0%, #11151c 100%);
        border: 1px solid #2a3140;
        border-radius: 12px;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.35);
        z-index: 1000;
        overflow: hidden;
      }

      .dc-nav-dropdown.open > .dc-nav-submenu {
        display: block;
      }

      .dc-nav-submenu .dc-nav-li {
        width: 100%;
      }

      .dc-nav-submenu .dc-nav-link,
      .dc-nav-submenu .dc-nav-dropbtn {
        width: 100%;
        justify-content: flex-start;
      }

      .dc-nav-submenu .dc-nav-dropdown > .dc-nav-submenu {
        top: 0;
        left: 100%;
      }

      @media (max-width: 768px) {
        .dc-nav-ul {
          flex-direction: column;
        }

        .dc-nav-submenu {
          position: static;
          box-shadow: none;
          border-radius: 0;
          border: 0;
        }

        .dc-nav-dropdown.open > .dc-nav-submenu {
          display: block;
        }
      }
    `;
    document.head.appendChild(style);
  }
}

// BUG: only drops down multi on vertical but jumpy (min window collapses to vertical)
class NavBarTopHoverUL2X extends NavBarTopBase {
  constructor(metadata = {}) {
    super(metadata);
    const { base, logoText, logoHTML, logoImage, menus = [] } = metadata;

    NavBarTopHoverUL1X.injectCSS();

    if (logoText || logoImage || logoHTML) {
      const logo = new Box({
        css: {
          display: "flex",
          alignItems: "center",
          flexWrap: "wrap",
        },
        props: { className: "dc-nav-logo" }
      });

      if (logoImage) {
        logo.addChild(
          new Link({ base, props: { href: "/" } },
            new Element("img", {
              css: { objectFit: "contain" },
              props: { className: "dc-nav-logo-img", src: logoImage }
            })
          )
        );
      }

      if (logoText || logoHTML) {
        logo.addChild(
          new LinkNav({ base, props: { href: "/" } },
            new Element("div", {
              props: {
                className: "dc-nav-logo-text",
                ...(logoHTML ? { innerHTML: logoHTML } : { textContent: logoText })
              }
            })
          )
        );

        this.addLeft(logo);
      }
    }

    const nav = new Element("ul", {
      props: { className: "dc-nav-ul" }
    });

    for (const item of menus) {
      nav.addChild(this.buildMenuItem(item, 0, []));
    }

    this.addLeft(nav);

    const clock = new DigitalClock({
      props: { className: "dc-nav-digitalclock" }
    });

    this.addRight(clock);
  }

  buildMenuItem(item, level = 0, path = []) {
    if (item.items && Array.isArray(item.items) && item.items.length) {
      return this.buildDropdown(item, level, path);
    }

    if (item.href) {
      return this.buildLinkItem(item);
    }

    return new Element("li", {
      props: { className: "dc-nav-li" },
      children: [
        new Element("span", {
          props: { textContent: item.label }
        })
      ]
    });
  }

  buildLinkItem(item) {
    const li = new Element("li", {
      props: { className: "dc-nav-li" }
    });

    li.addChild(
      new LinkNav({
        base: this.metadata.base,
        props: {
          className: "dc-nav-link",
          textContent: item.label,
          href: item.href
        }
      })
    );

    return li;
  }

  buildDropdown(item, level = 0, path = []) {
    const li = new Element("li", {
      props: { className: "dc-nav-li dc-nav-dropdown" }
    });

    const button = new Element("button", {
      props: {
        className: "dc-nav-dropbtn",
        type: "button",
        textContent: item.label
      }
    });

    const submenu = new Element("ul", {
      props: { className: "dc-nav-submenu" }
    });

    const nextPath = path.concat(item.label);

    for (const sub of item.items) {
      submenu.addChild(this.buildMenuItem(sub, level + 1, nextPath));
    }

    li.addChild(button);
    li.addChild(submenu);

    const openFn = () => {
      li.dom.classList.add("open");
    };

    const closeFn = () => {
      li.dom.classList.remove("open");
      this.closeDescendantDropdowns(li.dom);
    };

    button.metadata.props.onclick = (e) => {
      e.stopPropagation();
      const isOpen = li.dom.classList.contains("open");
      if (isOpen) {
        closeFn();
      } else {
        openFn();
      }
    };

    li.metadata.props.onmouseenter = () => {
      li.dom.classList.add("open");
    };

    li.metadata.props.onmouseleave = () => {
      li.dom.classList.remove("open");
      this.closeDescendantDropdowns(li.dom);
    };

    return li;
  }

  closeDescendantDropdowns(rootLi) {
    if (!rootLi) return;
    const nested = rootLi.querySelectorAll(".dc-nav-dropdown.open");
    for (const el of nested) {
      if (el !== rootLi) el.classList.remove("open");
    }
  }

  static injectCSS() {
    if (this._cssInjected) return;
    this._cssInjected = true;

    const style = document.createElement("style");
    style.textContent = `
      .dc-nav-ul,
      .dc-nav-submenu {
        list-style: none;
        margin: 0;
        padding: 0;
      }

      .dc-nav-ul {
        display: flex;
        align-items: stretch;
        gap: 0;
      }

      .dc-nav-li {
        position: relative;
      }

      .dc-nav-link,
      .dc-nav-dropbtn {
        display: flex;
        align-items: center;
        padding: 10px 16px;
        text-decoration: none;
        color: #e6eaf2;
        background: transparent;
        border: 0;
        cursor: pointer;
        font: inherit;
        white-space: nowrap;
      }

      .dc-nav-link:hover,
      .dc-nav-dropbtn:hover {
        background: rgba(91, 141, 239, 0.14);
        color: #ffffff;
      }

      .dc-nav-submenu {
        display: none;
        position: absolute;
        top: 100%;
        left: 0;
        min-width: 180px;
        background: linear-gradient(180deg, #1b1f27 0%, #11151c 100%);
        border: 1px solid #2a3140;
        border-radius: 12px;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.35);
        z-index: 1000;
        overflow: hidden;
      }

      .dc-nav-dropdown.open > .dc-nav-submenu {
        display: block;
      }

      .dc-nav-submenu .dc-nav-li {
        width: 100%;
      }

      .dc-nav-submenu .dc-nav-link,
      .dc-nav-submenu .dc-nav-dropbtn {
        width: 100%;
        justify-content: flex-start;
      }

      .dc-nav-submenu .dc-nav-dropdown {
        position: relative;
      }

      .dc-nav-submenu .dc-nav-dropdown > .dc-nav-submenu {
        top: 0;
        left: 100%;
        margin-left: 2px;
      }

      .dc-nav-dropdown > .dc-nav-dropbtn::after {
        content: "▾";
        margin-left: auto;
        opacity: 0.8;
        font-size: 0.85em;
      }

      .dc-nav-submenu .dc-nav-dropdown > .dc-nav-dropbtn::after {
        content: "▸";
      }

      @media (max-width: 768px) {
        .dc-nav-ul {
          flex-direction: column;
        }

        .dc-nav-submenu {
          position: static;
          box-shadow: none;
          border-radius: 0;
          border: 0;
          min-width: 0;
        }

        .dc-nav-dropdown.open > .dc-nav-submenu {
          display: block;
        }

        .dc-nav-dropdown > .dc-nav-dropbtn::after,
        .dc-nav-submenu .dc-nav-dropdown > .dc-nav-dropbtn::after {
          content: "▾";
        }
      }
    `;
    document.head.appendChild(style);
  }
}

// BUG: only drops down multi on vertical but jumpy (min window collapses to vertical)
class NavBarTopHoverUL2XB extends NavBarTopBase {
  constructor(metadata = {}) {
    super(metadata);
    const { base, logoText, logoHTML, logoImage, menus = [] } = metadata;

    NavBarTopHoverUL2X.injectCSS();

    if (logoText || logoImage || logoHTML) {
      const logo = new Box({
        css: {
          display: "flex",
          alignItems: "center",
          flexWrap: "wrap",
        },
        props: { className: "dc-nav-logo" }
      });

      if (logoImage) {
        logo.addChild(
          new Link({ base, props: { href: "/" } },
            new Element("img", {
              css: { objectFit: "contain" },
              props: { className: "dc-nav-logo-img", src: logoImage }
            })
          )
        );
      }

      if (logoText || logoHTML) {
        logo.addChild(
          new LinkNav({ base, props: { href: "/" } },
            new Element("div", {
              props: {
                className: "dc-nav-logo-text",
                ...(logoHTML ? { innerHTML: logoHTML } : { textContent: logoText })
              }
            })
          )
        );

        this.addLeft(logo);
      }
    }

    const nav = new Element("ul", {
      props: { className: "dc-nav-ul" }
    });

    for (const item of menus) {
      nav.addChild(this.buildMenuItem(item, 0, []));
    }

    this.addLeft(nav);

    const clock = new DigitalClock({
      props: { className: "dc-nav-digitalclock" }
    });

    this.addRight(clock);
  }

  buildMenuItem(item, level = 0, path = []) {
    if (item.items && Array.isArray(item.items) && item.items.length) {
      return this.buildDropdown(item, level, path);
    }

    if (item.href) {
      return this.buildLinkItem(item);
    }

    return new Element("li", {
      props: { className: "dc-nav-li" },
      children: [
        new Element("span", {
          props: { textContent: item.label }
        })
      ]
    });
  }

  buildLinkItem(item) {
    const li = new Element("li", {
      props: { className: "dc-nav-li" }
    });

    li.addChild(
      new LinkNav({
        base: this.metadata.base,
        props: {
          className: "dc-nav-link",
          textContent: item.label,
          href: item.href
        }
      })
    );

    return li;
  }

  buildDropdown(item, level = 0, path = []) {
    const li = new Element("li", {
      props: { className: "dc-nav-li dc-nav-dropdown" }
    });

    const button = new Element("button", {
      props: {
        className: "dc-nav-dropbtn",
        type: "button",
        textContent: item.label
      }
    });

    const submenu = new Element("ul", {
      props: { className: "dc-nav-submenu" }
    });

    const nextPath = path.concat(item.label);

    for (const sub of item.items) {
      submenu.addChild(this.buildMenuItem(sub, level + 1, nextPath));
    }

    li.addChild(button);
    li.addChild(submenu);

    const openFn = () => {
      li.dom.classList.add("open");
    };

    const closeFn = () => {
      li.dom.classList.remove("open");
      this.closeDescendantDropdowns(li.dom);
    };

    button.metadata.props.onclick = (e) => {
      e.stopPropagation();
      const isOpen = li.dom.classList.contains("open");
      if (isOpen) {
        closeFn();
      } else {
        openFn();
      }
    };

    li.metadata.props.onmouseenter = () => {
      li.dom.classList.add("open");
    };

    li.metadata.props.onmouseleave = () => {
      li.dom.classList.remove("open");
      this.closeDescendantDropdowns(li.dom);
    };

    return li;
  }

  closeDescendantDropdowns(rootLi) {
    if (!rootLi) return;
    const nested = rootLi.querySelectorAll(".dc-nav-dropdown.open");
    for (const el of nested) {
      if (el !== rootLi) el.classList.remove("open");
    }
  }

  static injectCSS() {
    if (this._cssInjected) return;
    this._cssInjected = true;

    const style = document.createElement("style");
    style.textContent = `
      .dc-nav-ul,
      .dc-nav-submenu {
        list-style: none;
        margin: 0;
        padding: 0;
      }

      .dc-nav-ul {
        display: flex;
        align-items: stretch;
        gap: 0;
      }
      /*
      .dc-nav-ul > .dc-nav-dropdown {
        min-width: 180px;
      }

      .dc-nav-dropdown {
        position: relative;
        flex: 0 0 auto;
        min-width: max-content;
        overflow: visible;
      }
          .dc-nav-li {
        position: relative;
      }
      */
      .dc-nav-link,
      .dc-nav-dropbtn {
        display: flex;
        align-items: center;
        padding: 10px 16px;
        text-decoration: none;
        color: #e6eaf2;
        background: transparent;
        border: 0;
        cursor: pointer;
        font: inherit;
        white-space: nowrap;
      }

      .dc-nav-link:hover,
      .dc-nav-dropbtn:hover {
        background: rgba(91, 141, 239, 0.14);
        color: #ffffff;
      }

      .dc-nav-submenu {
        display: none;
        position: absolute;
        top: 100%;
        left: 0;
        min-width: 180px;
        background: linear-gradient(180deg, #1b1f27 0%, #11151c 100%);
        border: 1px solid #2a3140;
        border-radius: 12px;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.35);
        z-index: 1000;
        overflow: hidden;
      }

      /* OPEN STATE */
      .dc-nav-dropdown.open > .dc-nav-submenu {
        display: block;
      }

      /* CASCADE ANY DEPTH */
      .dc-nav-dropdown > .dc-nav-submenu {
        top: 0;
        left: 100%;
        margin-left: 2px;
      }

      /* ARROWS */
      .dc-nav-dropdown > .dc-nav-dropbtn::after {
        content: "▾";
        margin-left: auto;
        opacity: 0.8;
        font-size: 0.85em;
      }

      .dc-nav-submenu .dc-nav-dropdown > .dc-nav-dropbtn::after {
        content: "▸";
      }

    `;
    document.head.appendChild(style);
  }
}

// this works mostly! still has that jumpy issue when in vertical mode
class NavBarTopHoverUL3X extends NavBarTopBase {
  constructor(metadata = {}) {
    super(metadata);
    const { base, logoText, logoHTML, logoImage, menus = [] } = metadata;

    NavBarTopHoverUL3X.injectCSS();

    if (logoText || logoImage || logoHTML) {
      const logo = new Box({
        css: {
          display: "flex",
          alignItems: "center",
          flexWrap: "wrap",
        },
        props: { className: "dc-nav-logo" }
      });

      if (logoImage) {
        logo.addChild(
          new Link({ base, props: { href: "/" } },
            new Element("img", {
              css: { objectFit: "contain" },
              props: { className: "dc-nav-logo-img", src: logoImage }
            })
          )
        );
      }

      if (logoText || logoHTML) {
        logo.addChild(
          new LinkNav({ base, props: { href: "/" } },
            new Element("div", {
              props: {
                className: "dc-nav-logo-text",
                ...(logoHTML ? { innerHTML: logoHTML } : { textContent: logoText })
              }
            })
          )
        );

        this.addLeft(logo);
      }
    }

    const nav = new Element("ul", {
      props: { className: "dc-nav-ul" }
    });

    for (const item of menus) {
      nav.addChild(this.buildMenuItem(item, 0, []));
    }

    this.addLeft(nav);

    const clock = new DigitalClock({
      props: { className: "dc-nav-digitalclock" }
    });

    this.addRight(clock);
  }

  buildMenuItem(item, level = 0, path = []) {
    if (item.items && Array.isArray(item.items) && item.items.length) {
      return this.buildDropdown(item, level, path);
    }

    if (item.href) {
      return this.buildLinkItem(item);
    }

    return new Element("li", {
      props: { className: "dc-nav-li" },
      children: [
        new Element("span", {
          props: { textContent: item.label }
        })
      ]
    });
  }

  buildLinkItem(item) {
    const li = new Element("li", {
      props: { className: "dc-nav-li" }
    });

    li.addChild(
      new LinkNav({
        base: this.metadata.base,
        props: {
          className: "dc-nav-link",
          textContent: item.label,
          href: item.href
        }
      })
    );

    return li;
  }

  buildDropdown(item, level = 0, path = []) {
    const li = new Element("li", {
      props: { className: "dc-nav-li dc-nav-dropdown" }
    });

    const button = new Element("button", {
      props: {
        className: "dc-nav-dropbtn",
        type: "button",
        textContent: item.label
      }
    });

    const submenu = new Element("ul", {
      props: { className: "dc-nav-submenu" }
    });

    const nextPath = path.concat(item.label);

    for (const sub of item.items) {
      submenu.addChild(this.buildMenuItem(sub, level + 1, nextPath));
    }

    li.addChild(button);
    li.addChild(submenu);

    const openFn = () => {
      li.dom.classList.add("open");
    };

    const closeFn = () => {
      li.dom.classList.remove("open");
      this.closeDescendantDropdowns(li.dom);
    };

    button.metadata.props.onclick = (e) => {
      e.stopPropagation();
      const isOpen = li.dom.classList.contains("open");
      if (isOpen) {
        closeFn();
      } else {
        openFn();
      }
    };

    // Hover open/close at any depth
    li.metadata.props.onmouseenter = () => {
      li.dom.classList.add("open");
    };

    li.metadata.props.onmouseleave = () => {
      li.dom.classList.remove("open");
      this.closeDescendantDropdowns(li.dom);
    };

    return li;
  }

  closeDescendantDropdowns(rootLi) {
    if (!rootLi) return;
    const nested = rootLi.querySelectorAll(".dc-nav-dropdown.open");
    for (const el of nested) {
      if (el !== rootLi) el.classList.remove("open");
    }
  }

  static injectCSS() {
    if (this._cssInjected) return;
    this._cssInjected = true;

    const style = document.createElement("style");
    style.textContent = `
      .dc-nav-ul,
      .dc-nav-submenu {
        list-style: none;
        margin: 0;
        padding: 0;
      }

      .dc-nav-ul {
        display: flex;
        align-items: stretch;
        gap: 0;
      }

      .dc-nav-li {
        position: relative;
        overflow: visible;
      }

      .dc-nav-dropdown {
        position: relative;
        flex: 0 0 auto;
        min-width: max-content;
        overflow: visible;
      }

      .dc-nav-link,
      .dc-nav-dropbtn {
        display: flex;
        align-items: center;
        padding: 10px 16px;
        text-decoration: none;
        color: #e6eaf2;
        background: transparent;
        border: 0;
        cursor: pointer;
        font: inherit;
        white-space: nowrap;
      }

      .dc-nav-dropbtn {
        position: relative;
      }

      .dc-nav-link:hover,
      .dc-nav-dropbtn:hover {
        background: rgba(91, 141, 239, 0.14);
        color: #ffffff;
      }

      .dc-nav-submenu {
        display: none;
        position: absolute;
        top: 100%;
        left: 0;
        min-width: 180px;
        background: linear-gradient(180deg, #1b1f27 0%, #11151c 100%);
        border: 1px solid #2a3140;
        border-radius: 12px;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.35);
        z-index: 1000;
        overflow: visible;
      }

      .dc-nav-dropdown.open > .dc-nav-submenu {
        display: block;
      }

      /* Cascade any depth to the right */
      .dc-nav-dropdown > .dc-nav-submenu {
        top: 0;
        left: 100%;
        margin-left: 2px;
      }

      /* Top-level submenu drops down */
      .dc-nav-ul > .dc-nav-dropdown > .dc-nav-submenu {
        top: 100%;
        left: 0;
        margin-left: 0;
      }

      .dc-nav-submenu .dc-nav-li {
        width: 100%;
      }

      .dc-nav-submenu .dc-nav-link,
      .dc-nav-submenu .dc-nav-dropbtn {
        width: 100%;
        justify-content: flex-start;
      }

      /* Arrows */
      .dc-nav-dropdown > .dc-nav-dropbtn::after {
        content: "▾";
        margin-left: auto;
        opacity: 0.8;
        font-size: 0.85em;
      }

      .dc-nav-submenu .dc-nav-dropdown > .dc-nav-dropbtn::after {
        content: "▸";
      }

      @media (max-width: 768px) {
        .dc-nav-ul {
          flex-direction: column;
        }

        .dc-nav-dropdown {
          min-width: 100%;
        }

        .dc-nav-submenu {
          position: static;
          box-shadow: none;
          border-radius: 0;
          border: 0;
          min-width: 0;
        }

        .dc-nav-dropdown.open > .dc-nav-submenu {
          display: block;
        }

        .dc-nav-dropdown > .dc-nav-dropbtn::after,
        .dc-nav-submenu .dc-nav-dropdown > .dc-nav-dropbtn::after {
          content: "▾";
        }
      }
    `;
    document.head.appendChild(style);
  }
}


//const NavBarTopHover = NavBarTopHoverDD1X;
//const NavBarTopHover = NavBarTopHoverUL1X;
//const NavBarTopHover = NavBarTopHoverUL2X;
//const NavBarTopHover = NavBarTopHoverUL2XB;
const NavBarTopHover = NavBarTopHoverUL3X;

// this old clunker works! best in mobile!
class NavBarTopClickerSticker extends NavBarTopBase {
  constructor(metadata = {}) {
    super(metadata);
    const { base, logoText, logoHTML, logoImage, menus = [] } = metadata;

    NavBarTopClickerSticker.injectCSS();

    const left = new Box({
      css: {
        display: "flex",
        alignItems: "center",
        gap: "1rem",
        flexWrap: "wrap",
      },
      props: { className: "dc-nav-left" }
    });

    if (logoText || logoImage || logoHTML) {
      const logo = new Box({
        css: {
          display: "flex",
          alignItems: "center",
          flexWrap: "wrap",
        },
        props: { className: "dc-nav-logo" }
      });

      if (logoImage) {
        logo.addChild(
          new Link({ base, props: { href: "/" } },
            new Element("img", {
              css: { objectFit: "contain" },
              props: { className: "dc-nav-logo-img", src: logoImage }
            })
          )
        );
      }

      if (logoText || logoHTML) {
        logo.addChild(
          new LinkNav({ base, props: { href: "/" } },
            new Element("div", {
              props: {
                className: "dc-nav-logo-text",
                ...(logoHTML ? { innerHTML: logoHTML } : { textContent: logoText })
              }
            })
          )
        );
      }

      left.addChild(logo);
    }

    const nav = new Element("ul", {
      props: { className: "dc-nav-ul dc-nav-ul-classic" }
    });

    for (const item of menus) {
      nav.addChild(this.buildMenuItem(item));
    }

    left.addChild(nav);
    this.addLeft(left);

    const clock = new DigitalClock({
      props: { className: "dc-nav-digitalclock" }
    });

    this.addRight(clock);
  }

  buildMenuItem(item) {
    const li = new Element("li", {
      props: { className: "dc-nav-li" }
    });

    if (item.items && item.items.length) {
      const button = new Element("button", {
        props: {
          type: "button",
          className: "dc-nav-link dc-nav-toggle",
          textContent: item.label
        }/*,
        events: {
          onclick: (e) => {
            console.log("Toggle open");
            e.preventDefault();
            e.stopPropagation();
            li.dom.classList.toggle("open");
          }
        }*/
      });
        
      li.addChild(button);
      
      const openFn = () => {
        li.dom.classList.add("open");
      };

      const closeFn = () => {
        li.dom.classList.remove("open");
        this.closeDescendantDropdowns(li.dom);
      };

      button.metadata.props.onclick = (e) => {
        e.stopPropagation();
        const isOpen = li.dom.classList.contains("open");
        if (isOpen) {
          closeFn();
        } else {
          openFn();
        }
      };

      const dropdown = new Element("ul", {
        props: { className: "dc-nav-dropdown" }
      });

      for (const child of item.items) {
        dropdown.addChild(this.buildDropdownItem(child));
      }

      li.addChild(dropdown);
      return li;
    }

    if (item.href) {
      li.addChild(
        new LinkNav({
          base: this.metadata.base,
          props: {
            className: "dc-nav-link",
            textContent: item.label,
            href: item.href
          }
        })
      );
    } else {
      li.addChild(
        new Element("span", {
          props: {
            className: "dc-nav-link",
            textContent: item.label
          }
        })
      );
    }

    return li;
  }

  buildDropdownItem(item) {
    const li = new Element("li", {
      props: { className: "dc-nav-li" }
    });

    if (item.href) {
      li.addChild(
        new LinkNav({
          base: this.metadata.base,
          props: {
            className: "dc-nav-link",
            textContent: item.label,
            href: item.href
          }
        })
      );
    } else {
      li.addChild(
        new Element("span", {
          props: {
            className: "dc-nav-link",
            textContent: item.label
          }
        })
      );
    }

    return li;
  }
  
  closeDescendantDropdowns(rootLi) {
    if (!rootLi) return;
    const nested = rootLi.querySelectorAll(".dc-nav-dropdown.open");
    for (const el of nested) {
      if (el !== rootLi) el.classList.remove("open");
    }
  }

  static injectCSS() {
    if (this._cssInjected) return;
    this._cssInjected = true;

    const style = document.createElement("style");
    style.textContent = `
      .dc-nav-left {
        display: flex;
        align-items: center;
        gap: 1rem;
        flex-wrap: wrap;
      }

      .dc-nav-logo {
        display: flex;
        align-items: center;
        gap: 0.75rem;
      }

      .dc-nav-logo-img {
        height: 32px;
        width: auto;
        display: block;
      }

      .dc-nav-logo-text {
        color: #e6eaf2;
        font-weight: 600;
        font-size: 1rem;
        line-height: 1;
        white-space: nowrap;
      }

      .dc-nav-ul,
      .dc-nav-ul-classic {
        list-style: none;
        margin: 0;
        padding: 0;
        display: flex;
        align-items: center;
        gap: 0.25rem;
      }

      .dc-nav-li {
        position: relative;
      }

      .dc-nav-link {
        display: inline-flex;
        align-items: center;
        padding: 10px 14px;
        text-decoration: none;
        color: #e6eaf2;
        border: 0;
        background: transparent;
        font: inherit;
        cursor: pointer;
        border-radius: 10px;
        white-space: nowrap;
        transition: background 0.15s ease, color 0.15s ease;
      }

      .dc-nav-link:hover,
      .dc-nav-li.open > .dc-nav-link {
        background: var(--dc-nav-hover-bg);
        color: var(--dc-nav-hover-color);
      }

      .dc-nav-dropdown {
        list-style: none;
        margin: 0;
        padding: 0.35rem;
        position: absolute;
        top: calc(100% + 0.35rem);
        left: 0;
        min-width: 220px;
        background: linear-gradient(180deg, var(--dc-nav-dropdown-bg1), var(--dc-nav-dropdown-bg2));
        border: 1px solid #2a3140;
        border-radius: 12px;
        box-shadow: 0 12px 30px rgba(0, 0, 0, 0.35);
        display: none;
        z-index: 1000;
      }

      .dc-nav-li.open > .dc-nav-dropdown {
        display: block;
      }

      .dc-nav-dropdown > .dc-nav-li {
        width: 100%;
      }

      .dc-nav-dropdown .dc-nav-link {
        width: 100%;
        justify-content: flex-start;
      }

      @media (max-width: 768px) {
        .dc-nav-left {
          flex-direction: column;
          align-items: flex-start;
          gap: 0.75rem;
        }

        .dc-nav-ul,
        .dc-nav-ul-classic {
          flex-direction: column;
          align-items: flex-start;
          width: 100%;
        }

        .dc-nav-link {
          width: 100%;
        }

        .dc-nav-dropdown {
          position: static;
          display: none;
          width: 100%;
          min-width: 0;
          margin-top: 0.25rem;
        }

        .dc-nav-li.open > .dc-nav-dropdown {
          display: block;
        }
      }
    `;
    document.head.appendChild(style);
  }
}
class NavBarTopHover extends NavBarTopBase {
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

    NavBarTopHover.ensureCSS();

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

  static ensureCSS() {
    if (this._cssInjected) return;
    this._cssInjected = true;

    const style = document.createElement("style");
    style.textContent = `
      /* Base layout */
      .nav-bar-3,
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

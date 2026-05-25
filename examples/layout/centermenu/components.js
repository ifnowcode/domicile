class VerticalMenu extends Element {
  constructor(metadata = {}) {
    const defaults = {
      open: false,
      items: ["Home", "Contact", "About", "Products", "Services"],
      css: {
        position: "absolute",
        top: "0",
        left: "0",
        width: "100vw",
        height: "100vh",
        pointerEvents: "none"
      }
    };

    const merged = {
      ...defaults,
      ...metadata,
      css: { ...defaults.css, ...(metadata.css || {}) }
    };

    super("div", merged);

    this.open = merged.open;
    this.items = merged.items;

    this.buildMenu();
  }

  buildMenu() {
    this.buttons = [];

    this.items.forEach((label, i) => {
      const btn = new Element("div", {
        css: {
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "200px",
          padding: "14px 0",
          background: "rgba(0,0,0,0.6)",
          borderRadius: "8px",
          textAlign: "center",
          fontSize: "20px",
          fontWeight: "600",
          cursor: "pointer",
          pointerEvents: "auto",
          opacity: "0",
          transition: "transform 0.35s ease, opacity 0.25s ease"
        },
        props: { textContent: label }
      });

      btn._offsetIndex = i; // used for vertical spacing

      this.buttons.push(btn);
      this.addChild(btn);
    });
  }

  toggle() {
    this.open = !this.open;
    this.updateMenu();
  }

  updateMenu() {
    if (this.open) {
      this.buttons.forEach((btn, i) => {
        const offset = (i - Math.floor(this.buttons.length / 2)) * 70;

        btn.dom.style.opacity = "1";
        btn.dom.style.transform =
          `translate(-50%, calc(-50% + ${offset}px))`;
      });
    } else {
      this.buttons.forEach(btn => {
        btn.dom.style.opacity = "0";
        btn.dom.style.transform = "translate(-50%, -50%)";
      });
    }
  }

  onMount() {
    this.updateMenu();
  }
}


class VerticalMenuPage extends Element {
  constructor(metadata = {}) {
    const defaults = {
      css: {
        width: "100vw",
        height: "100vh",
        //backgroundImage: "url('your-background.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        position: "relative",
        overflow: "hidden",
        background: "red",
      }
    };

    const merged = {
      ...defaults,
      ...metadata,
      css: { ...defaults.css, ...(metadata.css || {}) }
    };

    super("div", merged);

    this.buildUI();
  }

  buildUI() {
    const color = getRandomColor();
    // Logo
    this.logo = new Element("div", {
      css: {
        position: "absolute",
        top: "20px",
        left: "20px",
        fontSize: "32px",
        fontWeight: "bold",
        //color: "white",
        textShadow: "0 0 10px black"
      },
      props: { className: "logo-box", innerHTML: `<span style=\"color:${color};\"><b>DOM</b></span>icile` }
    });

    // Hamburger
    this.hamburger = new Element("div", {
      css: {
        position: "absolute",
        top: "20px",
        right: "20px",
        width: "40px",
        height: "30px",
        cursor: "pointer",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between"
      }
    });

    ["#fff", "#fff", "#fff"].forEach(color => {
      this.hamburger.addChild(
        new Element("div", {
          css: {
            width: "100%",
            height: "6px",
            background: color,
            borderRadius: "3px"
          }
        })
      );
    });

    // Vertical Menu
    this.menu = new VerticalMenu();

    this.hamburger.metadata.props.onclick = () => this.menu.toggle();

    this.addChild(this.logo);
    this.addChild(this.hamburger);
    this.addChild(this.menu);
  }

  onresize(width, height) {
    // Vertical menu does not need radius logic
    // but you could add responsive spacing here if desired
  }
}

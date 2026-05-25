class RadialMenu extends Element {
  constructor(metadata = {}) {
    const defaults = {
      open: false,
      items: [
        { label: "Contact" },
        { label: "About" },
        { label: "Products" },
        { label: "Services" } // placeholder
      ],
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
    
    this.center = new Element("div", {
      css: {
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        width: "180px",
        height: "180px",
        borderRadius: "50%",
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gridTemplateRows: "1fr 1fr",
        overflow: "hidden",
        pointerEvents: "auto",
        opacity: "0",
        transition: "opacity 0.3s"
      }
    });


    this.addChild(this.center);

    const simonColors = ["#4CAF50", "#F44336", "#FFEB3B", "#2196F3"];

    this.simonButtons = simonColors.map((color, i) => {
      const btn = new Element("div", {
        css: {
          background: color,
          border: "2px solid #222",
          transition: "filter 0.2s"
        }
      });

      btn.onclick = () => {
        btn.dom.style.filter = "brightness(1.4)";
        setTimeout(() => (btn.dom.style.filter = ""), 150);
      };

      this.center.addChild(btn);
      return btn;
    });
    
    this.centerLabel = new Element("div", {
      css: {
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        width: "80px",
        height: "80px",
        borderRadius: "50%",
        background: "rgba(0,0,0,1)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        fontSize: "20px",
        fontWeight: "bold",
        pointerEvents: "none"
      },
      props: { textContent: "🏠︎" }
    });

    this.center.addChild(this.centerLabel);

  }

  toggle() {
    this.open = !this.open;
    this.updateMenu();
  }

  updateMenu() {
    if (this.open) {
      this.center.dom.style.opacity = "1";
      /*
      this.orbitButtons.forEach(btn => {
        const x = Math.cos(btn._angle) * btn._radius;
        const y = Math.sin(btn._angle) * btn._radius;

        btn.dom.style.opacity = "1";
        btn.dom.style.transform =
          `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))`;
      });
      */
    } else {
      this.center.dom.style.opacity = "0";

      //this.orbitButtons.forEach(btn => {
      //  btn.dom.style.opacity = "0";
      //  btn.dom.style.transform = "translate(-50%, -50%)";
      //});
    }
  }

  onMount() {
    this.updateMenu();
  }
}

class CircularMenuPage extends Element {
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
      },
      props: { className: "circular-menu-age" }
    };

    const merged = {
      ...defaults,
      ...metadata,
      css: { ...defaults.css, ...(metadata.css || {}) }
    };

    super("div", merged);

    this.buildUI();
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
    console.log("Width:", width, ", Height:", height);
    // Pick a radius proportional to the smaller dimension
    const minDim = Math.min(width, height);

    // 22–28% of the smaller dimension feels good visually
    const newRadius = width * 0.20;

    // Update each orbit button's radius
    //this.menu.orbitButtons.forEach(btn => {
    //  btn._radius = newRadius;
    //});

    // Recompute positions if the menu is open
    this.menu.updateMenu();
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
      },
      props: { className: 'hamburger'}
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

    // Radial Menu
    this.menu = new RadialMenu();

    this.hamburger.metadata.props.onclick = () => this.menu.toggle();

    this.addChild(this.logo);
    this.addChild(this.hamburger);
    this.addChild(this.menu);
  }
}

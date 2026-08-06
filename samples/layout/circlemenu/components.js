class RadialMenu extends Element {
  constructor(metadata = {}) {
    const defaults = {
      open: false,
      items: [
        { label: "Contact" },
        { label: "About" },
        { label: "Downloads" },
        { label: "Source" },
        { label: "Products" },
        { label: "Services" }, // placeholder
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
        width: "120px",
        height: "120px",
        borderRadius: "50%",
        background: "rgba(0,0,0,0.5)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        fontSize: "20px",
        fontWeight: "bold",
        pointerEvents: "auto",
        transition: "opacity 0.3s",
        opacity: "0"
      },
      props: { textContent: "🏠︎" }
    });

    this.addChild(this.center);

    this.orbitButtons = [];

    const radius = 180;
    const angleStep = (Math.PI * 2) / this.items.length;

    this.items.forEach((item, i) => {
      const angle = i * angleStep;

      const btn = new Element("div", {
        css: {
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "100px",
          height: "100px",
          borderRadius: "50%",
          background: "rgba(0,0,0,0.6)",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          fontSize: "16px",
          fontWeight: "bold",
          pointerEvents: "auto",
          transition: "transform 0.4s, opacity 0.3s",
          opacity: "0"
        },
        props: { textContent: item.label }
      });

      btn._angle = angle;
      btn._radius = radius;

      this.orbitButtons.push(btn);
      this.addChild(btn);
    });
  }

  toggle() {
    this.open = !this.open;
    this.updateMenu();
  }

  updateMenu() {
    if (this.open) {
      this.center.dom.style.opacity = "1";

      this.orbitButtons.forEach(btn => {
        const x = Math.cos(btn._angle) * btn._radius;
        const y = Math.sin(btn._angle) * btn._radius;

        btn.dom.style.opacity = "1";
        btn.dom.style.transform =
          `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))`;
      });
    } else {
      this.center.dom.style.opacity = "0";

      this.orbitButtons.forEach(btn => {
        btn.dom.style.opacity = "0";
        btn.dom.style.transform = "translate(-50%, -50%)";
      });
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
      props: { className: "circular-menu-page" }
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
    
    //this.menu.toggle();
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
    const base = 0.20;
    // Inverse square‑root easing
    const factor = base * Math.sqrt(600 / width);
    const newRadius = width * factor;
    // Logarithmic easing
    //const scale = Math.log(width) / Math.log(1920); // normalized 0–1
    //const factor = base * (0.8 + (1 - scale) * 0.4); 
    //const newRadius = width * factor;

    // Update each orbit button's radius
    this.menu.orbitButtons.forEach(btn => {
      btn._radius = newRadius;
    });

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

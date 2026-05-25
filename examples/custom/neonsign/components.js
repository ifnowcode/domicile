class NeonText extends Element {
  constructor({
    text = "NEON",
    color = "#39ff14",
    size = "3rem",
    intensity = 1.0,
    fontWeight = 800,
    css = {},
    props = {},
    ...rest
  } = {}) {
    NeonText.injectCSS();

    super("div", {
      css: {
        "--neon-color": color,
        "--neon-size": size,
        "--neon-intensity": intensity,
        "--neon-weight": fontWeight,
        //textAlign: "center",
        ...css
      },
      props: {
        className: "neon-sign",
        ...props
      },
      ...rest
    });

    this.textNode = new Element("span", {
      props: {
        className: "neon-sign-text",
        textContent: text
      }
    });

    this.addChild(this.textNode);
  }


  static injectCSS() {
    if (this._cssInjected) return;
    this._cssInjected = true;

    const style = document.createElement("style");
    style.textContent = `
      .neon-sign {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        padding: 0.5em 1em;
        background: transparent;
      }

      .neon-sign-text {
        font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
        font-size: var(--neon-size, 3rem);
        font-weight: var(--neon-weight, 800);
        letter-spacing: 0.08em;
        text-transform: uppercase;
        color: var(--neon-color, #39ff14);
        text-shadow:
          0 0 calc(4px * var(--neon-intensity, 1)) var(--neon-color, #39ff14),
          0 0 calc(10px * var(--neon-intensity, 1)) var(--neon-color, #39ff14),
          0 0 calc(20px * var(--neon-intensity, 1)) var(--neon-color, #39ff14),
          0 0 calc(40px * var(--neon-intensity, 1)) var(--neon-color, #39ff14);
      }
    `;
    document.head.appendChild(style);
  }
}


class Neon extends Element {
  constructor({
    text = "NEON",
    color = "#39ff14",
    size = "3rem",
    intensity = 1.0,
    fontWeight = 800,
    flicker = 0,     // 0 = none
    pulse = 0,       // 0 = none
    tube = false,    // outline tube mode
    css = {},
    props = {},
    ...rest
  } = {}) {

    Neon.injectCSS();

    super("div", {
      props: {
        className: "neon-sign",
        ...props
      },
      css: {
        "--neon-color": color,
        "--neon-size": size,
        "--neon-intensity": intensity,
        "--neon-weight": fontWeight,
        "--neon-flicker": flicker,
        "--neon-pulse": pulse,
        "--neon-tube": tube ? 1 : 0,
        textAlign: "center",
        ...css
      },
      ...rest
    });

    this.textNode = new Element("span", {
      props: {
        className: "neon-sign-text",
        textContent: text
      }
    });

    this.addChild(this.textNode);
  }

  static injectCSS() {
    if (this._cssInjected) return;
    this._cssInjected = true;

    const style = document.createElement("style");
    style.textContent = `

      /* Base container */
      .neon-sign {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        padding: 0.5em 1em;
        background: transparent;
      }

      /* Core neon text */
      .neon-sign-text {
        font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
        font-size: var(--neon-size, 3rem);
        font-weight: var(--neon-weight, 800);
        letter-spacing: 0.08em;
        text-transform: uppercase;
        color: var(--neon-color, #39ff14);

        /* Glow */
        text-shadow:
          0 0 calc(4px * var(--neon-intensity, 1)) var(--neon-color),
          0 0 calc(10px * var(--neon-intensity, 1)) var(--neon-color),
          0 0 calc(20px * var(--neon-intensity, 1)) var(--neon-color),
          0 0 calc(40px * var(--neon-intensity, 1)) var(--neon-color);

        /* Tube outline (optional) */
        filter: drop-shadow(0 0 calc(2px * var(--neon-tube)) var(--neon-color))
                drop-shadow(0 0 calc(6px * var(--neon-tube)) var(--neon-color));
      }

      /* Flicker animation (randomized opacity) */
      @keyframes neon-flicker {
        0%, 19%, 21%, 23%, 25%, 54%, 56%, 100% {
          opacity: 1;
        }
        20%, 24%, 55% {
          opacity: 0.4;
        }
      }

      /* Pulse animation (glow intensity) */
      @keyframes neon-pulse {
        0% {
          text-shadow:
            0 0 calc(4px * var(--neon-intensity)) var(--neon-color),
            0 0 calc(10px * var(--neon-intensity)) var(--neon-color),
            0 0 calc(20px * var(--neon-intensity)) var(--neon-color),
            0 0 calc(40px * var(--neon-intensity)) var(--neon-color);
        }
        50% {
          text-shadow:
            0 0 calc(8px * var(--neon-intensity)) var(--neon-color),
            0 0 calc(20px * var(--neon-intensity)) var(--neon-color),
            0 0 calc(40px * var(--neon-intensity)) var(--neon-color),
            0 0 calc(80px * var(--neon-intensity)) var(--neon-color);
        }
        100% {
          text-shadow:
            0 0 calc(4px * var(--neon-intensity)) var(--neon-color),
            0 0 calc(10px * var(--neon-intensity)) var(--neon-color),
            0 0 calc(20px * var(--neon-intensity)) var(--neon-color),
            0 0 calc(40px * var(--neon-intensity)) var(--neon-color);
        }
      }

      /* Apply flicker only if > 0 */
      .neon-sign-text {
        animation:
          neon-flicker calc(1s * var(--neon-flicker)) infinite steps(1, end),
          neon-pulse calc(2s * var(--neon-pulse)) infinite ease-in-out;
      }

    `;
    document.head.appendChild(style);
  }
}

class Neon2 extends Element {
  constructor({
    text = "NEON",
    color = "#39ff14",
    size = "3rem",
    intensity = 1.0,
    fontWeight = 800,
    flicker = 0,     // 0 = none
    pulse = 0,       // 0 = none
    tube = false,    // outline tube mode
    css = {},
    props = {},
    ...rest
  } = {}) {

    Neon.injectCSS();

    super("div", {
      props: {
        className: "neon-sign",
        ...props
      },
      css: {
        "--neon-color": color,
        "--neon-size": size,
        "--neon-intensity": intensity,
        "--neon-weight": fontWeight,
        "--neon-flicker": flicker,
        "--neon-pulse": pulse,
        "--neon-tube": tube ? 1 : 0,
        textAlign: "center",
        ...css
      },
      ...rest
    });

    this.textNode = new Element("span", {
      props: {
        className: "neon-sign-text",
        textContent: text
      }
    });

    this.addChild(this.textNode);
  }

  static injectCSS() {
    if (this._cssInjected) return;
    this._cssInjected = true;

    const style = document.createElement("style");
    style.textContent = `

      /* Base container */
      .neon-sign {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        padding: 0.5em 1em;
        background: transparent;
      }

      /* Core neon text */
      .neon-sign-text {
        font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
        font-size: var(--neon-size, 3rem);
        font-weight: var(--neon-weight, 800);
        letter-spacing: 0.08em;
        text-transform: uppercase;

        /* Inner fill */
        color: var(--neon-color);

        /* Sharp tube outline */
        -webkit-text-stroke: calc(2px * var(--neon-tube)) var(--neon-color);
        text-stroke: calc(2px * var(--neon-tube)) var(--neon-color);

        /* Outer glow (separate from tube) */
        text-shadow:
          0 0 calc(6px * var(--neon-intensity)) var(--neon-color),
          0 0 calc(12px * var(--neon-intensity)) var(--neon-color),
          0 0 calc(24px * var(--neon-intensity)) var(--neon-color),
          0 0 calc(48px * var(--neon-intensity)) var(--neon-color);
      }

      /* Flicker animation (randomized opacity) */
      @keyframes neon-flicker {
        0%, 19%, 21%, 23%, 25%, 54%, 56%, 100% {
          opacity: 1;
        }
        20%, 24%, 55% {
          opacity: 0.4;
        }
      }

      /* Pulse animation (glow intensity) */
      @keyframes neon-pulse {
        0% {
          text-shadow:
            0 0 calc(4px * var(--neon-intensity)) var(--neon-color),
            0 0 calc(10px * var(--neon-intensity)) var(--neon-color),
            0 0 calc(20px * var(--neon-intensity)) var(--neon-color),
            0 0 calc(40px * var(--neon-intensity)) var(--neon-color);
        }
        50% {
          text-shadow:
            0 0 calc(8px * var(--neon-intensity)) var(--neon-color),
            0 0 calc(20px * var(--neon-intensity)) var(--neon-color),
            0 0 calc(40px * var(--neon-intensity)) var(--neon-color),
            0 0 calc(80px * var(--neon-intensity)) var(--neon-color);
        }
        100% {
          text-shadow:
            0 0 calc(4px * var(--neon-intensity)) var(--neon-color),
            0 0 calc(10px * var(--neon-intensity)) var(--neon-color),
            0 0 calc(20px * var(--neon-intensity)) var(--neon-color),
            0 0 calc(40px * var(--neon-intensity)) var(--neon-color);
        }
      }

      /* Apply flicker only if > 0 */
      .neon-sign-text {
        animation:
          neon-flicker calc(1s * var(--neon-flicker)) infinite steps(1, end),
          neon-pulse calc(2s * var(--neon-pulse)) infinite ease-in-out;
      }

    `;
    document.head.appendChild(style);
  }
}

class NeonSvgSign extends Element {
  constructor({
    text = "NEON",
    color = "#39ff14",
    size = 64,        // font size in px
    flicker = 0,      // 0 = none
    pulse = 0,        // 0 = none
    css = {},
    props = {},
    ...rest
  } = {}) {
    NeonSvgSign.injectCSS();

    super("div", {
      css: {
        "--neon-svg-color": color,
        "--neon-svg-size": `${size}px`,
        "--neon-svg-flicker": flicker,
        "--neon-svg-pulse": pulse,
        ...css
      },
      props: {
        className: "neon-svg-sign",
        ...props
      },
      ...rest
    });

    this.svg = new Element("svg", {
      props: {
        viewBox: "0 0 800 200",
        width: "100%",
        height: "100%",
      }
    });

    const defs = new Element("defs");

    // Glow filter
    const filter = new Element("filter", {
      props: { id: "neon-glow" }
    });
    filter.addChild(new Element("feGaussianBlur", {
      props: { stdDeviation: "4", result: "blur" }
    }));
    filter.addChild(new Element("feColorMatrix", {
      props: {
        type: "matrix",
        values: "0 0 0 0  0  0 0 0 0  1  0 0 0 0  0  0 0 1 0"
      }
    }));
    filter.addChild(new Element("feMerge", {}, 
      new Element("feMergeNode", { props: { in: "blur" } }),
      new Element("feMergeNode", { props: { in: "SourceGraphic" } })
    ));

    defs.addChild(filter);
    this.svg.addChild(defs);

    // Glow text (behind)
    this.glowText = new Element("text", {
      props: {
        x: "50%",
        y: "50%",
        "dominant-baseline": "middle",
        "text-anchor": "middle",
        className: "neon-svg-text neon-svg-text-glow"
      }
    });
    this.glowText.metadata.props.textContent = text;

    // Tube text (front)
    this.tubeText = new Element("text", {
      props: {
        x: "50%",
        y: "50%",
        "dominant-baseline": "middle",
        "text-anchor": "middle",
        className: "neon-svg-text neon-svg-text-tube"
      }
    });
    this.tubeText.metadata.props.textContent = text;

    this.svg.addChild(this.glowText);
    this.svg.addChild(this.tubeText);
    this.addChild(this.svg);
  }

  static injectCSS() {
    if (this._cssInjected) return;
    this._cssInjected = true;

    const style = document.createElement("style");
    style.textContent = `
      .neon-svg-sign {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        padding: 0.5em 1em;
        background: transparent;
      }

      .neon-svg-text {
        font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
        font-size: var(--neon-svg-size, 64px);
        font-weight: 800;
        letter-spacing: 0.08em;
        text-transform: uppercase;
      }

      /* Glow layer */
      .neon-svg-text-glow {
        fill: var(--neon-svg-color, #39ff14);
        filter: url(#neon-glow);
        opacity: 0.9;
      }

      /* Tube layer (crisp stroke) */
      .neon-svg-text-tube {
        fill: none;
        stroke: var(--neon-svg-color, #39ff14);
        stroke-width: 4;
        stroke-linejoin: round;
        stroke-linecap: round;
      }

      /* Flicker + pulse */
      @keyframes neon-svg-flicker {
        0%, 19%, 21%, 23%, 25%, 54%, 56%, 100% { opacity: 1; }
        20%, 24%, 55% { opacity: 0.4; }
      }

      @keyframes neon-svg-pulse {
        0%, 100% { transform: scale(1); }
        50% { transform: scale(1.03); }
      }

      .neon-svg-sign {
        animation:
          neon-svg-flicker calc(1s * var(--neon-svg-flicker)) infinite steps(1, end),
          neon-svg-pulse calc(2s * var(--neon-svg-pulse)) infinite ease-in-out;
        transform-origin: center center;
      }
    `;
    document.head.appendChild(style);
  }
}

class NeonSvgSign2 extends Element {
  constructor({
    text = "NEON",
    color = "#39ff14",
    size = 64,        // font size in px
    flicker = 0,      // 0 = none
    pulse = 0,        // 0 = none
    css = {},
    props = {},
    ...rest
  } = {}) {
    NeonSvgSign.injectCSS();

    super("div", {
      css: {
        "--neon-svg-color": color,
        "--neon-svg-size": `${size}px`,
        "--neon-svg-flicker": flicker,
        "--neon-svg-pulse": pulse,
        ...css
      },
      props: {
        className: "neon-svg-sign",
        ...props
      },
      ...rest
    });

    this.svg = new Element("svg", {
      props: {
        viewBox: "0 0 800 200",
        width: "100%",
        height: "100%",
      }
    });

    const defs = new Element("defs");

    const filter = new Element("filter", {
      props: {
        id: "neon-glow",
        x: "-50%",
        y: "-50%",
        width: "200%",
        height: "200%"
      }
    });

    filter.addChild(new Element("feGaussianBlur", {
      props: { stdDeviation: "6", result: "blur1" }
    }));

    filter.addChild(new Element("feGaussianBlur", {
      props: { stdDeviation: "12", result: "blur2" }
    }));

    filter.addChild(new Element("feGaussianBlur", {
      props: { stdDeviation: "24", result: "blur3" }
    }));

    const merge1 = new Element("feMerge", { props: { result: "mergedGlow" } });
    merge1.addChild(new Element("feMergeNode", { props: { in: "blur1" } }));
    merge1.addChild(new Element("feMergeNode", { props: { in: "blur2" } }));
    merge1.addChild(new Element("feMergeNode", { props: { in: "blur3" } }));
    filter.addChild(merge1);

    const merge2 = new Element("feMerge");
    merge2.addChild(new Element("feMergeNode", { props: { in: "mergedGlow" } }));
    merge2.addChild(new Element("feMergeNode", { props: { in: "SourceGraphic" } }));
    filter.addChild(merge2);

    defs.addChild(filter);
    this.svg.addChild(defs);

    // Glow text (behind)
    this.glowText = new Element("text", {
      props: {
        x: "50%",
        y: "50%",
        "dominant-baseline": "middle",
        "text-anchor": "middle",
        className: "neon-svg-text neon-svg-text-glow"
      }
    });
    this.glowText.metadata.props.textContent = text;

    // Tube text (front)
    this.tubeText = new Element("text", {
      props: {
        x: "50%",
        y: "50%",
        "dominant-baseline": "middle",
        "text-anchor": "middle",
        className: "neon-svg-text neon-svg-text-tube"
      }
    });
    this.tubeText.metadata.props.textContent = text;

    this.svg.addChild(this.glowText);
    this.svg.addChild(this.tubeText);
    this.addChild(this.svg);
  }

  static injectCSS() {
    if (this._cssInjected) return;
    this._cssInjected = true;

    const style = document.createElement("style");
    style.textContent = `
      .neon-svg-sign {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        padding: 0.5em 1em;
        background: transparent;
      }

      .neon-svg-text {
        font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
        font-size: var(--neon-svg-size, 64px);
        font-weight: 800;
        letter-spacing: 0.08em;
        text-transform: uppercase;
      }

      /* Glow layer */
      .neon-svg-text-glow {
        fill: var(--neon-svg-color, #39ff14);
        opacity: 0.9;
      }

      /* Tube layer (crisp stroke) */
      .neon-svg-text-tube {
        fill: none;
        stroke: var(--neon-svg-color, #39ff14);
        stroke-width: 4;
        stroke-linejoin: round;
        stroke-linecap: round;
      }

      /* Flicker + pulse */
      @keyframes neon-svg-flicker {
        0%, 19%, 21%, 23%, 25%, 54%, 56%, 100% { opacity: 1; }
        20%, 24%, 55% { opacity: 0.4; }
      }

      @keyframes neon-svg-pulse {
        0%, 100% { transform: scale(1); }
        50% { transform: scale(1.03); }
      }

      .neon-svg-sign {
        animation:
          neon-svg-flicker calc(1s * var(--neon-svg-flicker)) infinite steps(1, end),
          neon-svg-pulse calc(2s * var(--neon-svg-pulse)) infinite ease-in-out;
        transform-origin: center center;
      }
    `;
    document.head.appendChild(style);
  }
}

class NeonSvgSign3 extends Element {
  constructor({
    text = "OPEN",
    color = "#39ff14",
    size = 96,
    css = {},
    props = {},
    ...rest
  } = {}) {

    const svg = `
<svg viewBox="0 0 800 200" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">

  <defs>
    <filter id="neonGlow" x="-50%" y="-50%" width="200%" height="200%">
      <feGaussianBlur in="SourceGraphic" stdDeviation="4" result="blur1"/>
      <feGaussianBlur in="SourceGraphic" stdDeviation="8" result="blur2"/>
      <feGaussianBlur in="SourceGraphic" stdDeviation="16" result="blur3"/>

      <feMerge result="glow">
        <feMergeNode in="blur1"/>
        <feMergeNode in="blur2"/>
        <feMergeNode in="blur3"/>
      </feMerge>

      <feMerge>
        <feMergeNode in="glow"/>
        <feMergeNode in="SourceGraphic"/>
      </feMerge>
    </filter>
  </defs>

  <!-- Glow -->
  <text x="50%" y="50%"
        dominant-baseline="middle"
        text-anchor="middle"
        font-family="Segoe UI, sans-serif"
        font-size="${size}"
        font-weight="800"
        fill="${color}"
        filter="url(#neonGlow)">
    ${text}
  </text>

  <!-- Tube -->
  <text x="50%" y="50%"
        dominant-baseline="middle"
        text-anchor="middle"
        font-family="Segoe UI, sans-serif"
        font-size="${size}"
        font-weight="800"
        fill="none"
        stroke="${color}"
        stroke-width="6"
        stroke-linejoin="round"
        stroke-linecap="round">
    ${text}
  </text>

</svg>`;

    super("div", {
      props: {
        className: "neon-svg-sign",
        innerHTML: svg,
        ...props
      },
      css: {
        display: "inline-block",
        ...css
      },
      ...rest
    });
  }
}

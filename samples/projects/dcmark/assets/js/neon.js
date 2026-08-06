class NeonTitle extends Element {
  constructor(
  {
    text = "NEON",
    color = "#ff00ff",
    glow = color,
    intensity = 1.2,
    pulse = false,
    flicker = false,
    size = "3rem",
    ...options
  } = {},
    metadata = {}
  ) {
    console.log("CSS", metadata.css);
    super("div", {
      ...metadata,
      props: {
        className: "neon-title",
        textContent: text,
        "data-text": text,   // ⭐ REQUIRED for ::after content
        ...(metadata.props || {})
      },
      css: {
        fontSize: size,
        fontWeight: "800",
        textAlign: "center",
        color,
        "--neon-color": color,
        "--neon-glow": glow,
        "--neon-intensity": intensity,
        "--neon-pulse-enabled": pulse ? "running" : "paused",
        "--neon-flicker-enabled": flicker ? "running" : "paused",
        ...(metadata.css || {})
      },
    });

    NeonTitle.injectCSS();
  }

  static injectCSS() {
    if (NeonTitle._cssInjected) return;
    NeonTitle._cssInjected = true;

    const style = document.createElement("style");
    style.textContent = `
      .neon-title {
        display: inline-block;
        position: relative;
        line-height: 1; /* ⭐ prevents baseline collapse */
        padding-bottom: 0.45em; /* ⭐ restores space that ::after used to create */

        color: var(--neon-color);
        text-shadow:
          0 0 calc(4px * var(--neon-intensity)) var(--neon-glow),
          0 0 calc(8px * var(--neon-intensity)) var(--neon-glow),
          0 0 calc(16px * var(--neon-intensity)) var(--neon-glow),
          0 0 calc(32px * var(--neon-intensity)) var(--neon-glow);

        /* ⭐ Glow contributes to layout height */
        filter: drop-shadow(0 0 calc(8px * var(--neon-intensity)) var(--neon-glow));

        animation: neonPulse 4s ease-in-out infinite;
        animation-play-state: var(--neon-pulse-enabled);
      }

      /* ⭐ Flicker applied to entire element */
      .neon-title.neon-flicker {
        animation:
          neonPulse 4s ease-in-out infinite,
          neonFlicker 3s infinite steps(1);
        animation-play-state: var(--neon-pulse-enabled), var(--neon-flicker-enabled);
      }

      /* Realistic flicker using opacity + shadow jitter */
      .neon-title {
        content: attr(data-text);
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        opacity: 1;
        animation: neonFlicker 3s infinite steps(1);
        animation-play-state: var(--neon-flicker-enabled);
      }

      @keyframes neonPulse {
        0%, 100% {
          text-shadow:
            0 0 calc(4px * var(--neon-intensity)) var(--neon-glow),
            0 0 calc(8px * var(--neon-intensity)) var(--neon-glow),
            0 0 calc(16px * var(--neon-intensity)) var(--neon-glow),
            0 0 calc(32px * var(--neon-intensity)) var(--neon-glow);
        }
        50% {
          text-shadow:
            0 0 calc(2px * var(--neon-intensity)) var(--neon-glow),
            0 0 calc(4px * var(--neon-intensity)) var(--neon-glow),
            0 0 calc(8px * var(--neon-intensity)) var(--neon-glow),
            0 0 calc(16px * var(--neon-intensity)) var(--neon-glow);
        }
      }

      @keyframes neonFlicker {
        0%, 5%, 7%, 10%, 12%, 20%, 22%, 30%, 100% {
          opacity: 1;
          filter: none;
        }
        6%, 11%, 21% {
          opacity: 0.4;
          filter: blur(1px);
        }
        31% {
          opacity: 0.2;
          filter: blur(2px);*/
        }
      }
    `;
    document.head.appendChild(style);
  }
}

/* Example:
header.addChild(
  new NeonTitle({
    text: titleName,
    color: "#39ff14",
    glow: "#39ff14",
    intensity: 1.4,
    pulse: true,
    flicker: true,
    size: "3.2rem"
  })
);
*/

class NeonTitle2 extends Element {
  constructor(
  {
    text = "NEON",
    color = "#ff00ff",
    glow = color,
    intensity = 1.2,
    pulse = false,
    flicker = false,
    size = "3rem",
    ...options
  } = {},
    metadata = {}
  ) {
    const classes = ["neon-title"];
    if (pulse) classes.push("neon-pulse");
    if (flicker) classes.push("neon-flicker");

    super("div", {
      ...metadata,                        // keep other metadata keys (events, attrs, etc.)
      props: {
        ...(metadata.props || {}),        // ⭐ merge external props
        className: classes.join(" "),
        textContent: text,
      },
      css: {
        ...(metadata.css || {}),          // ⭐ merge external CSS (overrides internal)
        fontSize: size,
        fontWeight: "800",
        textAlign: "center",
        color,
        "--neon-color": color,
        "--neon-glow": glow,
        "--neon-intensity": intensity,
        "--neon-pulse-enabled": pulse ? "running" : "paused",
      },
    });
    
    console.log("CSS", metadata.css);

    NeonTitle2.injectCSS();
  }

  static injectCSS() {
    if (NeonTitle2._cssInjected) return;
    NeonTitle2._cssInjected = true;

    const style = document.createElement("style");
    style.textContent = `
      .neon-title {
        display: inline-block;
        position: relative;
        line-height: 1; /* ⭐ prevents baseline collapse */
        padding-bottom: 0.45em; /* ⭐ restores space that ::after used to create */

        color: var(--neon-color);
        text-shadow:
          0 0 calc(4px * var(--neon-intensity)) var(--neon-glow),
          0 0 calc(8px * var(--neon-intensity)) var(--neon-glow),
          0 0 calc(16px * var(--neon-intensity)) var(--neon-glow),
          0 0 calc(32px * var(--neon-intensity)) var(--neon-glow);

        /* ⭐ Glow contributes to layout height */
        filter: drop-shadow(0 0 calc(8px * var(--neon-intensity)) var(--neon-glow));

        animation: neonPulse 4s ease-in-out infinite;
        animation-play-state: var(--neon-pulse-enabled);
      }

      /* When flicker is enabled, layer flicker on top of pulse */
      .neon-title.neon-flicker {
        animation:
          neonPulse 4s ease-in-out infinite,
          neonFlicker 3s infinite steps(1);
        animation-play-state: var(--neon-pulse-enabled), running;
      }

      @keyframes neonPulse {
        0%, 100% {
          text-shadow:
            0 0 calc(4px * var(--neon-intensity)) var(--neon-glow),
            0 0 calc(8px * var(--neon-intensity)) var(--neon-glow),
            0 0 calc(16px * var(--neon-intensity)) var(--neon-glow),
            0 0 calc(32px * var(--neon-intensity)) var(--neon-glow);
        }
        50% {
          text-shadow:
            0 0 calc(2px * var(--neon-intensity)) var(--neon-glow),
            0 0 calc(4px * var(--neon-intensity)) var(--neon-glow),
            0 0 calc(8px * var(--neon-intensity)) var(--neon-glow),
            0 0 calc(16px * var(--neon-intensity)) var(--neon-glow);
        }
      }

      @keyframes neonFlicker {
        0%, 5%, 7%, 10%, 12%, 20%, 22%, 30%, 100% {
          opacity: 1;
          filter: none;
        }
        6%, 11%, 21% {
          opacity: 0.4;
          filter: blur(1px);
        }
        31% {
          opacity: 0.2;
          filter: blur(2px);
        }
      }
    `;
    document.head.appendChild(style);
  }
}

// Test base class component
class NeonTitle3 extends Component {
  constructor(options = {}, metadata = {}) {
    const {
      text = "NEON",
      color = "#ff00ff",
      glow = color,
      intensity = 1.2,
      pulse = false,
      flicker = false,
      size = "3rem",
      ...rest
    } = options;

    const classes = ["neon-title"];
    if (pulse) classes.push("neon-pulse");
    if (flicker) classes.push("neon-flicker");

    super("div",
      {
        props: {
          className: classes.join(" "),
          textContent: text
        },
        css: {
          fontSize: size,
          fontWeight: "800",
          textAlign: "center",
          color,
          "--neon-color": color,
          "--neon-glow": glow,
          "--neon-intensity": intensity,
          "--neon-pulse-enabled": pulse ? "running" : "paused"
        },
        ...rest
      },
      metadata
    );

    NeonTitle2.injectCSS();
  }
}

class NeonTubeSign extends Element {
  constructor({
    text = "OPEN",
    color = "#39ff14",
    glow = color,
    size = 96,
    pulse = true,
    flicker = true,
    ...metadata
  } = {}) {

    const id = NeonTubeSign.nextId();
    const glowId = `neonGlow-${id}`;

    const glowClasses = ["neon-glow"];
    if (pulse) glowClasses.push("pulse");
    if (flicker) glowClasses.push("flicker");

    const svg = `
    <svg class="neon-tube-sign-svg"
         viewBox="0 0 100 100"
         width="100"
         height="100"
         xmlns="http://www.w3.org/2000/svg">

      <defs>
        <filter id="${glowId}" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur in="SourceGraphic" stdDeviation="4" result="b1"/>
          <feGaussianBlur in="SourceGraphic" stdDeviation="8" result="b2"/>
          <feGaussianBlur in="SourceGraphic" stdDeviation="16" result="b3"/>
          <feMerge>
            <feMergeNode in="b1"/>
            <feMergeNode in="b2"/>
            <feMergeNode in="b3"/>
          </feMerge>
        </filter>
      </defs>

      <!-- Glow layer (animated) -->
      <text class="${glowClasses.join(" ")}"
            x="50%" y="50%"
            dominant-baseline="middle"
            text-anchor="middle"
            font-family="Segoe UI, system-ui, sans-serif"
            font-size="${size}"
            font-weight="800"
            fill="${glow}"
            filter="url(#${glowId})">
        ${text}
      </text>

      <!-- Tube stroke (static) -->
      <text class="neon-tube"
            x="50%" y="50%"
            dominant-baseline="middle"
            text-anchor="middle"
            font-family="Segoe UI, system-ui, sans-serif"
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

    NeonTubeSign.injectCSS();

    super("div", {
      props: {
        className: "neon-tube-sign",
        innerHTML: svg
      },
      css: {
        display: "inline-block"
      },
      ...metadata
    });
  }

  static _cssInjected = false;
  static _idCounter = 0;
  static nextId() {
    return ++NeonTubeSign._idCounter;
  }

  static injectCSS() {
    if (NeonTubeSign._cssInjected) return;
    NeonTubeSign._cssInjected = true;

    const style = document.createElement("style");
    style.textContent = `
      .neon-tube-sign-svg {
        overflow: visible;
      }

      .neon-glow {
        transform-origin: center;
      }

      /* ⭐ Pulse only */
      .neon-glow.pulse {
        animation: neonTubePulse 2.4s ease-in-out infinite;
      }

      /* ⭐ Flicker only */
      .neon-glow.flicker {
        animation: neonTubeFlicker 4s infinite steps(1);
      }

      /* ⭐ Pulse + Flicker combined */
      .neon-glow.pulse.flicker {
        animation:
          neonTubePulse 2.4s ease-in-out infinite,
          neonTubeFlicker 4s infinite steps(1);
      }

      @keyframes neonTubePulse {
        0%, 100% {
          opacity: 1;
          transform: scale(1);
        }
        50% {
          opacity: 0.6;
          transform: scale(1.03);
        }
      }

      @keyframes neonTubeFlicker {
        0%, 5%, 7%, 10%, 12%, 20%, 22%, 30%, 100% {
          opacity: 1;
        }
        6%, 11%, 21% {
          opacity: 0.45;
        }
        31% {
          opacity: 0.2;
        }
      }
    `;
    document.head.appendChild(style);
  }
}

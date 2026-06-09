# DOMicile

[https://ifnowcode.github.io/domicile](https://ifnowcode.github.io/domicile)

This README.md was written by AI and is basically focused ipsum lorem. This is the best I could do on short notice so don't trust it for accuracy. Domicile1 is the framework, example and test all rolled into one. Examples are good starters and server is an attempt at server side DOMicile. I created this because I wanted a light weight framework that didn't render multiple times but instead did all post render dynamic code in the DOM so the class objects are setup and rendered like React then each object can override a callback for `onload` to do live work in the DOM post render.

---

### A deterministic, component-driven DOM framework for real JavaScript engineering

DOMicile is a **minimal, deterministic, memory-safe DOM framework** designed for engineers who want full control over rendering, lifecycle, and component architecture — without the opacity, churn, or magic of modern UI libraries.

DOMicile is built around three principles:

  1. **Determinism** — no hidden reactivity, no virtual DOM, no diffing heuristics.

  2. **Transparency** — every component is a real DOM node with predictable lifecycle.

  3. **Discipline** — no leaks, no repeated listeners, no runaway timers, no ghost nodes.

DOMicile is not a React clone. It’s a **real engineering framework** for people who want to understand and control their UI system at every level.

---

## ✨ Features

  * **Deterministic rendering** — components render once unless you explicitly update them.

  * **Zero DOM churn** — DOMicile reuses nodes instead of recreating them.

  * **Memory-safe architecture** — no accidental closures, no dangling listeners.

  * **Declarative components** — built on a clean Element base class.

  * **Metadata-aware merging**— props, CSS, events, and attributes merge predictably.

  * **Scoped CSS injection** — components can inject their own styles once.

  * **Composable layout system** — build complex UIs from small, deterministic pieces.

  * **No build step** — DOMicile is just JavaScript.

  * **No magic** — what you write is what runs.
  
---

## 🚀 Quick Start

js
```
import { Element } from "./DOMicile.js";

class HelloWorld extends Element {
  constructor() {
    super("div", {
      props: { textContent: "Hello DOMicile!" },
      css: { fontSize: "2rem", color: "hotpink" }
    });
  }
}

document.body.appendChild(new HelloWorld().node);
```

DOMicile components are **real DOM nodes**, not abstractions.

---

## 🧱 Component Architecture

DOMicile components extend the base Element class, which provides:

  * predictable construction

  * deterministic rendering

  * safe event binding

  * metadata merging

  * lifecycle hooks

  * child management

### Example Component

js
```
class Button extends Element {
  constructor(label, onClick) {
    super("button", {
      props: { textContent: label },
      events: { click: onClick },
      css: {
        padding: "0.5em 1em",
        borderRadius: "6px",
        background: "#333",
        color: "white",
        cursor: "pointer"
      }
    });
  }
}
```

---

## 🧬 Metadata Merging (Canonical Pattern)

DOMicile uses a two-argument component pattern:

  * `options` — internal defaults

  * `metadata` — external overrides

The canonical merge strategy is:

js
```
props: { ...internal.props, ...metadata.props }
css:   { ...metadata.css,   ...internal.css }
```

This ensures:

  * internal defaults remain intact

  * external overrides work as expected

  * no accidental overwrites

  * no missing styles or props

For deeper exploration, see:

  * **Metadata merging**

  * **Component architecture**

---

## 🧩 Component — The Canonical Base Class

DOMicile includes a universal component base class that handles metadata merging, props merging, CSS merging, and structural consistency.

js
```
class Component extends Element {
  constructor(tag, internal = {}, metadata = {}) {
    const mergedProps = { ...(internal.props || {}), ...(metadata.props || {}) };
    const mergedCSS   = { ...(metadata.css || {}),   ...(internal.css || {}) };

    const merged = {
      ...metadata,
      ...internal,
      props: mergedProps,
      css: mergedCSS
    };

    super(tag, merged);
  }
}
```

Use this as the base for all components:

js
```
class MyComponent extends Component {
  constructor(options = {}, metadata = {}) {
    super("div", {
      props: { textContent: "Hello" },
      css: { color: "red" }
    }, metadata);
  }
}
```

---

## 🔥 Example: NeonTitle2

DOMicile makes it easy to build complex, animated components like NeonTitle2, which includes:

  * glow layers

  * pulse animation

  * flicker animation

  * CSS variable-driven intensity

  * metadata-safe margin and layout behavior

Explore more:

  * NeonTitle2 component

  * Neon glow effects

---

## 🧼 Memory Safety

DOMicile enforces:

  * one-time event binding

  * no repeated listeners

  * no closure leaks

  * no ghost nodes

  * no runaway timers

  * predictable cleanup

This makes DOMicile ideal for:

  * long-running apps

  * simulations

  * games

  * dashboards

  * embedded UIs

Learn more:

  * **Memory safety**

  * **Event lifecycle**

---

## 🧪 Testing

DOMicile components are easy to test because they are:

  * pure DOM nodes

  * deterministic

  * free of hidden state

You can mount them in any test environment:

js
```
const title = new NeonTitle2({ text: "Test" });
expect(title.node.textContent).toBe("Test");
```

---

## 🛠️ Roadmap

  * Component-scoped stylesheets

  * Reactive state helpers

  * DOM reuse pools

  * Virtualized lists

  * Built-in layout primitives

  * Devtools inspector
  
---

## 🤝 Contributing

Contributions are welcome.
Open an issue or submit a PR with:

  * clear intent

  * minimal deltas

  * deterministic behavior

  * no magic

---

## 📄 License

MIT License — free to use, modify, and distribute.
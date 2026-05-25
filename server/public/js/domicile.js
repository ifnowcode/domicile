console.log("DOMicile ver 0.0.1");
/////////////////////////////////////////////////////////////////////
//
// Local Helpers (more in utils.js)
//
/////////////////////////////////////////////////////////////////////
function random(min, max) {
  return min + Math.random() * (max + 1 - min);
}

function randomIndex(length) {
  return Math.floor(Math.random() * length)
}

function getRandomColor() {
  var letters = '0123456789ABCDEF';
  var color = '#';
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  console.log("Color:", color);
  return color;
}

function removeExtension(path) {
  return path.substring(0, path.lastIndexOf('.')) || path;
}

function getFile(path) {
  return path.replace(/^.*[\\\/]/, '');
}

function getFileName(path) {
  return removeExtension(getFile(path));
}

function getExtension(filename) {
  const sections = filename.split('/');
  console.log("Sections:", sections);
  const parts = sections[sections.length-1].split('.');
  console.log("Parts:", parts);
  return parts.length > 1 ? parts.pop() : '';
}
/////////////////////////////////////////////////////////////////////
//
// IndexedDB
//
// Example:
// await IndexedDBStorage.setItem("CMS", "pages", "home", { title: "Welcome" });
// const page = await IndexedDBStorage.getItem("CMS", "pages", "home");
// console.log(page.title);
//
/////////////////////////////////////////////////////////////////////
class IndexedDBStorage {
  static _openDB(dbName, storeName) {
    return new Promise((resolve, reject) => {
      const open = indexedDB.open(dbName, 1);

      open.onupgradeneeded = () => {
        const db = open.result;
        if (!db.objectStoreNames.contains(storeName)) {
          db.createObjectStore(storeName);
        }
      };

      open.onerror = () => reject(open.error);
      open.onsuccess = () => resolve(open.result);
    });
  }

  static async getItem(dbName, storeName, key) {
    const db = await this._openDB(dbName, storeName);

    return new Promise((resolve, reject) => {
      const tx = db.transaction(storeName, "readonly");
      const store = tx.objectStore(storeName);
      const request = store.get(key);

      request.onerror = () => reject(request.error);
      request.onsuccess = () => resolve(request.result);
    });
  }

  static async setItem(dbName, storeName, key, value) {
    const db = await this._openDB(dbName, storeName);

    return new Promise((resolve, reject) => {
      const tx = db.transaction(storeName, "readwrite");
      const store = tx.objectStore(storeName);
      const request = store.put(value, key);

      request.onerror = () => reject(request.error);
      request.onsuccess = () => resolve(true);
    });
  }
}

class StorageLoader {
  constructor(dbName, storeName, key) {
    this.dbName = dbName;
    this.storeName = storeName;
    this.key = key;

    this.value = null;
    this.loaded = false;
    this.onLoad = null;

    this.load();
  }

  async load() {
    try {
      this.value = await IndexedDBStorage.getItem(
        this.dbName,
        this.storeName,
        this.key
      );
    } catch (err) {
      console.error("StorageLoader error:", err);
    }

    this.loaded = true;
    if (this.onLoad) this.onLoad(this.value);
  }

  async save(newValue) {
    await IndexedDBStorage.setItem(
      this.dbName,
      this.storeName,
      this.key,
      newValue
    );
    this.value = newValue;
  }
}

/////////////////////////////////////////////////////////////////////
//
// DOMicile fundamentals Router, Element and Box
//
// createElementFromHTML - creates raw elements from HTML
//
// app.js - examples: shows how to use DOMicile to build a website
// components.js - library: components derived from Element and Box
//
// ELements are children and `Box`es are for wrapping components. Deriving from `Box` creates a simple `div` wrapper that is standardized and we can build up off of standardized `div` handling. I worried it would conflict with the core CSS Element class but so far no problems.
//
// Boxes are the base for widgets the fundamental object that builds a DOMicile website. That said many components derive from `Element` as they don't need a div and aren't full widgets (I think both terms are accurate).
//
// Widgets are UI components. Components are not necessarily Widgets. If a Widget needs to `refresh` itself. E.g. this.refresh() or remove itself E.g `parent.removeChild(this._dom)` then it needs to be in a `Box` E.g. here we put a predefined table as a child to a box `new Box({}, table)`, now we have a parent we can use without affecting siblings. TODO: make this transparent so the box functionality is inherent and there is no need for embedding in a parent `Box`. For now this is simple and strong.
//
// Components are all class objects from non UI like `Router` to UI like `NavBar`. A `Router` is a component, a `NavBar` is a `Widget` which is a UI component.
//
/////////////////////////////////////////////////////////////////////
class Router {
  constructor(metadata = {}) {
    this.metadata = {
      base: metadata.base || "",
      routes: metadata.routes || {}
    };

    this.currentPath = this.getLocalPath();
  }

  // Compute the local path relative to base
  getLocalPath() {
    const url = window.location.href;
    const baseURL = window.location.origin + this.metadata.base;
    return url.slice(baseURL.length) || "/";
  }

  // Return the widgets for the current route
  resolve() {
    const fn = this.metadata.routes[this.currentPath];
    if (!fn) {
      console.warn("No route found for:", this.currentPath);
      return [];
    }
    return fn();
  }

  // Programmatic navigation
  navigate(path) {
    const full = this.metadata.base + path;
    window.history.pushState({}, "", full);
    this.currentPath = path;
    window.dispatchEvent(new PopStateEvent("popstate"));
  }

  // Listen for browser navigation
  listen(callback) {
    window.addEventListener("popstate", () => {
      this.currentPath = this.getLocalPath();
      callback(this.resolve());
    });
  }
}
  
class RouterAsync {
  constructor(metadata = {}) {
    this.metadata = {
      base: metadata.base || "",
      template: metadata.template || ((c) => c),
      page404: metadata.page404 || ((c) => c),
      template404: metadata.template404 || ((c) => c),
      routes: metadata.routes || {},
      runAsync: metadata.runAsync || false
    };

    this.currentPath = this.getLocalPath();
  }

  // Compute the local path relative to base
  getLocalPath() {
    const url = window.location.href;
    const baseURL = window.location.origin + this.metadata.base;
    return url.slice(baseURL.length) || "/";
  }

  // Resolve route — async inside, sync outside
  resolve(callback) {
    const entry = this.metadata.routes[this.currentPath];
    console.log("[router] Entry", entry);
    if (!entry) {
      console.warn("No route entry found for:", this.currentPath);
      callback({ contents: this.metadata.page404(), template: this.metadata.template404 });
      return;
    }

    const fn = entry.contents;
    if (!fn) {
      console.warn("No route handler found for:", this.currentPath);
      callback({ contents: [], template: page404 });
      return;
    }
    const template = entry.template ? entry?.template : this.metadata?.template ? this.metadata.template : (contents) => contents;
    console.log("Final Template Fn", fn, template);
    if (!this.metadata.runAsync) {
      const contents = fn();
      callback({ contents, template });
      return;
    }

    Promise.resolve(fn())
      .then(contents => callback({ contents, template }))
      .catch(err => {
        console.error(err);
        callback({ contents: [], template });
      });
  }

  // Programmatic navigation
  navigate(path) {
    const full = this.metadata.base + path;
    window.history.pushState({}, "", full);
    this.currentPath = path;
    window.dispatchEvent(new PopStateEvent("popstate"));
  }

  // Listen for browser navigation
  listen(callback) {
    window.addEventListener("popstate", () => {
      this.currentPath = this.getLocalPath();
      this.resolve(callback);
    });
  }
}

// https://developer.mozilla.org/en-US/docs/Web/API/Element
class Element {
  constructor(localName, metadata = {}, ...children) {
    this.localName = localName;
    this.metadata = this.constructor.applyDefaults(metadata);
    console.log("[meta]", this.constructor.name, localName, metadata);
    this.children = children;
    this._dom = null;
  }

  static defaults = {
    css: {},
    props: {}
  };

  static applyDefaults(metadata) {
    //console.log("[meta] CSS:", defaults.css);
    //console.log("[meta] PROPS:", defaults.props);
    let merge = {
      ...this.defaults,
      ...metadata,
      css: { ...this.defaults.css, ...(metadata.css || {}) },
      props: { ...this.defaults.props, ...(metadata.props || {}) }
    };
    //console.log("[meta] MERGEPROPS:", merge.props);
    return merge;
  }

  addChild(elem) {
    this.children.push(elem);
  }

  removeChild(elem) {
    this.children = this.children.filter(c => c !== elem);
  }
  
  refresh() {
    if (!this._dom) return; // not mounted yet
    console.log("[refresh] Refreshing", this._dom);
    // Clear existing DOM children
    while (this._dom.firstChild) {
      this._dom.removeChild(this._dom.firstChild);
    }

    // Render each metadata child into DOM
    for (const child of this.children) {
      const dom = child.render(this._dom);
      //this._dom.appendChild(dom);
    }
  }

  render(container) {
    // https://developer.mozilla.org/en-US/docs/Web/API/Document/createElement
    console.log("[render]", this.localName, this.constructor.name, container);
    const el = document.createElement(this.localName);
    this._dom = el;
    el._widget = this;

    // Apply CSS
    Object.assign(el.style, this.metadata.css);

    // Apply props
    //Object.assign(el, this.metadata.props);
    this.applyProps(el, this.metadata.props);

    // Render children
    for (const child of this.children) {
      console.log("Child render:", typeof child, child);
      if (child instanceof Element) {
        child.render(el);
      } else {
        console.error("[render] Invalid instance", typeof child, child);
      }
    }

    container.appendChild(el);
  }

  applyProps(el, props) {
    const booleanProps = new Set([
      "controls",
      "muted",
      "autoplay",
      "loop",
      "playsInline",
      "checked",
      "disabled",
      "selected"
    ]);

    for (const [key, value] of Object.entries(props)) {

      // 1. EVENT HANDLERS
      if (key.startsWith("on")) {
        if (typeof value === "string") {
          // Serializable handler: string → function(event) { ... }
          const fn = new Function("event", value);
          el[key] = fn;
        } else if (typeof value === "function") {
          // Direct handler: keep working code paths
          el[key] = value;
        }
        // (Optional) If you want to see it in HTML for debugging:
        // el.setAttribute(key, "");
        continue;
      }

      // 2. BOOLEAN ATTRIBUTES
      if (booleanProps.has(key)) {
        if (value === "" || value === true) {
          el.setAttribute(key, "");
          el[key] = true;
        } else {
          el.removeAttribute(key);
          el[key] = false;
        }
        continue;
      }

      // 3. STYLE OBJECT (if you ever pass style as object)
      if (key === "style" && value && typeof value === "object") {
        Object.assign(el.style, value);
        continue;
      }

      // 4. NORMAL PROPS: prefer DOM property, fallback to attribute
      const hasDomProp = key in el && typeof el[key] !== "function";

      if (hasDomProp) {
        el[key] = value;
      } else {
        el.setAttribute(key, value);
      }
    }
  }


  toJSON() {// Serialize component
    let serialized = {
      type: this.constructor.name,
      localName: this.localName,
      metadata: this.metadata,
      children: this.children.map(child => child.toJSON())
    };
    //console.log("[serialize] JSON ${serialized}", serialized);
    return serialized;
  }

  static fromJSON(data) { // Deserialize component
    const cls = widgetRegistry[data.type];
    if (!cls) {
      throw new Error(`Unknown widget type: ${data.type}`);
    }
    //console.log("[serialize] ${data.metadata}", data.metadata);
    // Create instance with metadata
    const instance = new cls(data.metadata);

    // Recursively load children
    if (Array.isArray(data.children)) {
      for (const childData of data.children) {
        const child = Element.fromJSON(childData);
        instance.children.push(child);
      }
    }
    //console.log("[serialize] ${instance}", instance);
    return instance;
  }

}

class Box extends Element {
  static defaults = {
    css: {
      display: "block"
    },
    props: { className: 'box'},
  };

  constructor(metadata={}, ...children) {
    super('div', metadata, ...children);
  }
}

class Box2 extends Element {
  static defaults = {
    css: {
      display: "block",
      boxSizing: "border-box"
    },
    props: {},
    children: []
  };

  constructor(metadata = {}, ...children) {
    // Merge metadata safely without stripping fields
    const merged = {
      ...metadata, // keep all user fields
      css: {
        ...Box.defaults.css,
        ...(metadata.css || {})
      },
      props: {
        ...Box.defaults.props,
        ...(metadata.props || {})
      }
    };

    super('div', merged, ...children);
  }
}


class GridBox extends Box {
  static defaults = {
    css: {
      display: "grid"
    },
    props: { className: 'grid-box'},
  };
  constructor(metadata = {}, ...children) {
    super({
        css: {
          display: "grid",
          gridTemplateColumns: "auto 1fr",
          alignItems: "start",
          gap: "20px",
          marginBottom: "20px",
          ...metadata.css
        },
        props: metadata.props || {className: 'grid-box'}
      },
      ...children
    );
  }
}

class FlexRowBox extends Box {
  constructor(metadata = {}, ...children) {
    super({
        css: {
          display: "flex",
          flexDirection: "row",
          flexWrap: "wrap",
          gap: "20px",
          alignItems: "flex-start",
          ...metadata.css
        },
        props: metadata.props || {}
      },
      ...children
    );
  }
}

class ResponsiveColumnsBox extends Box {
  constructor(metadata = {}, ...children) {
    super({
        css: {
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "0px",
          ...metadata.css
        },
        props: metadata.props || {}
      },
      ...children
    );

    // Mobile collapse
    this.metadata.css["@media (max-width: 620px)"] = {
      gridTemplateColumns: "1fr"
    };
  }
}

class HTMLBox extends Box {
  constructor(metadata = {}) {
    super(metadata);
    this.setHTML(metadata.html || "");
    this.metadata.props['innerHTML'] = this.html;
  }

  directDOMinjection() {
    if (!this._dom) {
      console.log("HTMLBox renderHTML: No DOM, no direct DOM rendering!");
      return;
    }
    this._dom.innerHTML = this.html;
  }

  setHTML(html) {
    console.log("HTML", this.html);
    this.html = html;
    this.metadata.props['innerHTML'] = this.html;
    this.directDOMinjection();
  }
 
}

class ContentLoader extends HTMLBox {
  constructor(metadata = {}) {
    super(metadata);
    this.base = metadata.base || '';
    this.src = metadata.src;
    this.isMarkdown = metadata.isMarkdown || false;
    this.load();
  }

  async load() {
    const res = await fetch(this.base + this.src);
    let text = await res.text();

    if (this.isMarkdown) {
      text = DOMPurify.sanitize(marked.parse(text));
    }

    this.setHTML(text);
  }
}

class RESTLoader {
  constructor(url) {
    this.url = url;
    this.data = null;
    this.loaded = false;
    this.onLoad = null;

    this.load();
  }

  async load() {
    try {
      const res = await fetch(this.url);
      this.data = await res.json();
    } catch (err) {
      console.error("RESTLoader error:", err);
    }

    this.loaded = true;
    if (this.onLoad) this.onLoad(this.data);
  }
}


// deprecated
function dep_createElementFromHTML(htmlString) {
  console.log("[entry] createElementFromHTML", htmlString);

  const template = document.createElement("template");
  template.innerHTML = htmlString.trim();

  console.log("[info] template.innerHTML", template.innerHTML);

  function convert(node) {
    // TEXT NODE → return raw string
    if (node.nodeType === Node.TEXT_NODE) {
      return node.textContent;
    }

    // ELEMENT NODE → convert attributes into metadata.props
    const metadata = { props: {} };

    for (const attr of node.attributes) {
      metadata.props[attr.name] = attr.value;
    }

    // Convert children recursively
    const children = Array.from(node.childNodes).map(convert);

    console.log("Children:", children);

    // Create Element instance using your new paradigm
    const el = new Element(node.tagName.toLowerCase(), metadata, ...children);

    console.log("[info] Element -", el);

    return el;
  }

  const root = convert(template.content.firstChild);

  console.log("[info] Parent Element -", root);

  return root;
}


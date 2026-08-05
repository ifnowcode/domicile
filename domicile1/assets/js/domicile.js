const startTime = performance.now();

const tracewarn = true;
const traceerror = true;
const tracedebug = false;
const tracemount = false;
const tracerender = false;
const traceelement = false;
const tracemenu = false;
const tracedom = false;
const tracerouter = true;
const tracefx = true;
const tracegame = false;

const widgetRegistry = {};
const registration = true; // not using Element.fromJSON(json) yet


window.addEventListener("load", () => {
  const loadTime = performance.now() - startTime;
  if (loadTime < 1000) {
    if (tracedebug) console.log("[perf] Page load time:", loadTime, "ms");
  } else if (loadTime < 3000) {
    if (tracewarn) console.warn("[perf] Page load time:", loadTime, "ms");
  } else {
    if (traceerror) console.error("[perf] Page load time:", loadTime, "ms");
  }
});
console.log("Initializing DOMicile ver 1.0.0 Alpha ...");
/////////////////////////////////////////////////////////////////////
//
// Local Helpers (more in utils.js)
//
//https://www.w3schools.com/howto/howto_js_media_queries.asp
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
  return color;
}

function removeExtension(path) {
  return path.substring(0, path.lastIndexOf('.')) || path;
}

function capitalizeFirst(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

function getFile(path) {
  return path.replace(/^.*[\\\/]/, '');
}

function getFileName(path) {
  return removeExtension(getFile(path));
}

function getExtension(filename) {
  const sections = filename.split('/');
  if (tracedebug) console.log("Sections:", sections);
  const parts = sections[sections.length-1].split('.');
  if (tracedebug) console.log("Parts:", parts);
  return parts.length > 1 ? parts.pop() : '';
}

function getFileExtension(filename) {
  return (filename.split('.').pop() || '').toLowerCase();
}

function prettifyHTML(html) {
  const tab = "  ";
  let result = "";
  let indent = 0;

  html.split(/>\s*</).forEach((element) => {
    if (element.match(/^\/\w/)) indent--;

    result += tab.repeat(indent) + "<" + element + ">\n";

    if (element.match(/^<?\w[^>]*[^\/]$/) && !element.startsWith("!")) {
      indent++;
    }
  });

  return result.trim();
}

function prettyDOMHTML(html) {
  const parser = new DOMParser();
  const doc = parser.parseFromString(html, "text/html");
  const serializer = new XMLSerializer();
  const xml = serializer.serializeToString(doc.body);

  return xml
    .replace(/></g, ">\n<")
    .replace(/^\s+$/gm, "");
}

function beautifyHTML(html) {
  const pretty = html_beautify(html, {
    indent_size: 2,
    wrap_line_length: 80,
    preserve_newlines: true
  });

  return pretty;
}

function parseRoute(url, baseurl) {
  const data = {
    query: null,
    value: null,
    extra: null,
  };
  
  const prefix = baseurl.replace(/\/$/, "");
  
  if (!url.startsWith(prefix)) {
    return data;
  }

  const rest = url.slice(prefix.length);
  if (tracedebug) console.log("defining Rest", prefix, rest);
  const [pathPart, queryString = ""] = rest.split("?");
  const [valuePart = "", extraPart = ""] = pathPart.split("/");
  if (tracedebug) console.log("define", pathPart, queryString, valuePart, extraPart);
  if (queryString) {
    const params = new URLSearchParams(queryString);
    data.query = params.get("query") ?? null;
  }

  data.value = valuePart || null;
  data.extra = extraPart || null;

  return data;
}

function getLocalPath(base) {
  const path = window.location.pathname.replace(/\/$/, "");

  let basePath = base || "";
  if (basePath.startsWith(window.location.origin)) {
    basePath = new URL(basePath).pathname;
  }
  basePath = basePath.replace(/\/$/, "");

  console.log("[router] path", path);
  console.log("[router] basePath len:", basePath.length, "path:", basePath);

  let relPath = path;
  if (basePath && path.startsWith(basePath)) {
    console.warn("[router] Slicing basePath", basePath.length);
    relPath = path.slice(basePath.length) || "/";
  }

  relPath = relPath.startsWith("/") ? relPath : `/${relPath}`;

  console.log("[router] relPath", relPath);
  return relPath;
}

//const data = await loadJsonFile("/data/file.json");
async function loadJsonFile(url) {
  const response = await fetch(url);
  if (!response.ok) throw new Error(`HTTP ${response.status}`);
  return await response.json();
}

/*
async function main() {
  const config = await loadJsonFile(base + "/config.json");
  const theme = await loadJSONTheme(base + "/theme.json");
  runApp(config || {}, theme || {});
}
main().catch(console.error);
runApp() {
  //...
  applyJSONTheme(theme);
}
//or
loadAndApplyTheme("/theme.json");
//or
(async () => {
  const theme = await loadJSONTheme("/theme.json");
  applyJSONTheme(theme);
})();
*/
async function loadJSONTheme(url) {
  let text = '';
  if (false) {
    text = await safeFetch(url);
  } else {
    const res = await fetch(url);
    if (!res.ok) {
      throw new Error(`Failed to load theme file: ${res.status} ${res.statusText}`);
    }
    text = await res.text();
  }  

  // scrub data for comments
  const cleaned = text
    .replace(/\/\*[\s\S]*?\*\//g, "")
    .replace(/^\s*\/\/.*$/gm, "")
    .replace(/^\s*#.*$/gm, "");

  // parse scrubbed data
  return JSON.parse(cleaned);
}
// Example theme.json:
// {
//   // nav colors
//   "--dc-nav-bg": "#002",
//   "--dc-nav-fg": "#fff",
//   /* spacing */
//   "--dc-nav-padding": "12px",
//   "--dc-nav-radius": 8
// }
// supports comments

//loadJSONTheme(base + "/theme.json");

function applyJSONTheme(data) {
  for (const [key, value] of Object.entries(data)) {
    document.documentElement.style.setProperty(key, String(value));
  }
}

async function loadAndApplyTheme(url) {
  const theme = await loadJSONTheme(url);
  applyJSONTheme(theme);
}

async function safeFetch(url, options = {}) {
  const {
    baseUrl = "",
    timeoutMs = 15000,
    headers = {},
    credentials = "same-origin",
    mode = "same-origin",
    parse = "auto", // "auto" | "json" | "text" | "blob" | "arrayBuffer" | "response"
    signal,
    ...fetchOptions
  } = options;

  const fullUrl = new URL(url, baseUrl).toString();
  const controller = new AbortController();
  const timeoutId = setTimeout(
    () => controller.abort(new DOMException("Request timed out", "TimeoutError")),
    timeoutMs
  );

  const combinedSignal =
    signal && AbortSignal.any
      ? AbortSignal.any([signal, controller.signal])
      : signal || controller.signal;

  try {
    const res = await fetch(fullUrl, {
      ...fetchOptions,
      headers: {
        ...headers,
        ...(fetchOptions.headers || {}),
      },
      credentials,
      mode,
      signal: combinedSignal,
    });

    if (!res.ok) {
      throw new Error(`HTTP ${res.status} ${res.statusText}`);
    }

    if (parse === "response") return res;

    const contentType = res.headers.get("content-type") || "";

    if (parse === "json") return await res.json();
    if (parse === "text") return await res.text();
    if (parse === "blob") return await res.blob();
    if (parse === "arrayBuffer") return await res.arrayBuffer();

    if (contentType.includes("application/json")) return await res.json();
    if (contentType.startsWith("text/") || contentType.includes("json")) return await res.text();
    return await res.arrayBuffer();
  } finally {
    clearTimeout(timeoutId);
  }
}

class SafeFetch {
  constructor(config = {
    baseUrl = "",
    timeoutMs = 15000,
    credentials = "same-origin",
    mode = "same-origin",
    headers = {},
  } = {}) {
    this.config = config;
    //this.baseUrl = baseUrl;
    //this.timeoutMs = timeoutMs;
    //this.credentials = credentials;
    //this.mode = mode;
    //this.headers = headers;
  }

  request(url, options = {}) {
    return safeFetch(url, { ...this.config, ...options });
  }

  get(url, options = {}) {
    return this.request(url, { ...options, method: "GET" });
  }

  post(url, body, options = {}) {
    return this.request(url, {
      ...options,
      method: "POST",
      body: typeof body === "string" ? body : JSON.stringify(body),
      headers: {
        "Content-Type": "application/json",
        ...(options.headers || {}),
      },
    });
  }
}


// usage
//const api = new SafeFetch({ baseUrl: "/api", timeoutMs: 10000 });
//const data = await api.get("/theme.json");
class SafeFetch1 {
  constructor({
    baseUrl = "",
    timeoutMs = 15000,
    credentials = "same-origin",
    mode = "same-origin",
    headers = {},
  } = {}) {
    this.baseUrl = baseUrl;
    this.timeoutMs = timeoutMs;
    this.credentials = credentials;
    this.mode = mode;
    this.headers = headers;
  }

  async request(url, options = {}) {
    const fullUrl = new URL(url, this.baseUrl).toString();
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(new DOMException("Request timed out", "TimeoutError")), this.timeoutMs);

    try {
      const res = await fetch(fullUrl, {
        ...options,
        headers: {
          ...this.headers,
          ...(options.headers || {}),
        },
        credentials: options.credentials ?? this.credentials,
        mode: options.mode ?? this.mode,
        signal: options.signal ? AbortSignal.any([options.signal, controller.signal]) : controller.signal,
      });

      if (!res.ok) {
        throw new Error(`HTTP ${res.status} ${res.statusText}`);
      }

      const contentType = res.headers.get("content-type") || "";
      if (contentType.includes("application/json")) return await res.json();
      if (contentType.startsWith("text/") || contentType.includes("json")) return await res.text();
      return await res.arrayBuffer();
    } finally {
      clearTimeout(timeoutId);
    }
  }

  get(url, options = {}) {
    return this.request(url, { ...options, method: "GET" });
  }

  post(url, body, options = {}) {
    return this.request(url, {
      ...options,
      method: "POST",
      body: typeof body === "string" ? body : JSON.stringify(body),
      headers: {
        "Content-Type": "application/json",
        ...(options.headers || {}),
      },
    });
  }
}
/////////////////////////////////////////////////////////////////////
// Timers
//
// startToggleLoop
//  E.g. 
//    const stop = startToggleLoop(
//      500,
//      500,
//      () => console.log("ON"),
//      () => console.log("OFF")
//    );
//
/////////////////////////////////////////////////////////////////////
function startToggleLoop(onMs, offMs, turnOn, turnOff, on = true) {
  let active = on;
  let timer = null;

  function step() {
    if (active) {
      turnOn();
      timer = setTimeout(() => {
        active = false;
        step();
      }, onMs);
    } else {
      turnOff();
      timer = setTimeout(() => {
        active = true;
        step();
      }, offMs);
    }
  }

  step();

  return () => {
    clearTimeout(timer);
  };
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
      if (traceerror) console.error("StorageLoader error:", err);
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
// ELements are Content and children and `Box`es are for wrapping components. Deriving from `Box` creates a simple `div` wrapper that is standardized and we can build up off of standardized `div` handling. I worried it would conflict with the core CSS Element class but so far no problems.
//
// Boxes are Containers and the base for widgets the fundamental object that builds a DOMicile website. That said many components derive from `Element` as they don't need a div and aren't full widgets (I think both terms are accurate).
//
// Widgets are UI components. Components are not necessarily Widgets. If a Widget needs to `refresh` itself. E.g. this.refresh() or remove itself E.g `parent.removeChild(this.dom)` then it needs to be in a `Box` E.g. here we put a predefined table as a child to a box `new Box({}, table)`, now we have a parent we can use without affecting siblings. TODO: make this transparent so the box functionality is inherent and there is no need for embedding in a parent `Box`. For now this is simple and strong.
//
// Components are all class objects from non UI like `Router` to UI like `NavBar`. A `Router` is a component, a `NavBar` is a `Widget` which is a UI component.
//
// Layouts <layouts.js> are multi-child or region components that have set layout defaults between regions and allow adding children per region. This way a particular CSS layout page or partial can be set between child objects. This will encapsulate layout concepts like three or four column grid and side bar and main relationships. I can even have dynamic layouts that allow adding and removing regions.
//
// Layer Cake (CCL): Content (Element), Container (Box), Layout (Layout)
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
      if (tracewarn) console.warn("No route found for:", this.currentPath);
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
    if (tracerouter) console.log("[router] RouterAsync entry");
    this.metadata = {
      base: metadata.base || "",
      firewall: metadata.firewall,
      template: metadata.template || ((c) => c),
      page404: metadata.page404 || ((c) => {
        //alert('404 - document not found!');
        let p = document.createElement('p');
        p.textContent = "404";
        p.style.fontSize = "134px";
        //p.style.marginTop = "10px";
        p.style.textAlign = "center";
        document.body.appendChild(p);
        p = document.createElement('p');
        p.textContent = "file not found! 404 handler not found!";
        p.style.textAlign = "center";
        document.body.appendChild(p);
        return c;
      }),
      template404: metadata.template404 || ((c) => c),
      routes: metadata.routes || {},
      runAsync: metadata.runAsync || false
    };

    this.currentPath = this.getLocalPath();
    this.firewall = metadata.firewall;
    if (tracerouter) console.log("[router] PATH", this.currentPath);
  }

  
  getLocalPath() {
    const params = new URLSearchParams(window.location.search);
    // check for (?redirect=) redirect
    // BUG: couldn't get this working for 404.html redirect, this side should work though
    const redirect = params.get('redirect');
    if (redirect) {
      if (tracerouter) console.log("[router] REDIRECT: Replace state", redirect);
      history.replaceState({}, '', redirect); // correct the url
      return redirect.slice(this.metadata.base.length) || "/";
    }
    // check for fragment (#!) redirect (404 routing uses this)
    const fragment = window.location.hash.slice(2);
    if (fragment) {
      if (tracerouter) console.log("[router] REDIRECT: Hash state", fragment);
      history.replaceState({}, '', fragment); // correct the url
      return fragment.slice(this.metadata.base.length) || "/";
    }
    // No Redirect: Compute the local path relative to base
    const url = window.location.href;
    const baseURL = window.location.origin + this.metadata.base;
    return url.slice(baseURL.length) || "/";
  }

  // Resolve route — async inside, sync outside
  resolve(callback) {
    const entry = this.metadata.routes[this.currentPath];
    if (tracerouter) console.log("[router] INVOKE FIREWALL", this.firewall);
    if (this.firewall) this.firewall(this.currentPath, this.metadata.routes);
    if (tracerouter) console.log("[router] Resolve", entry);
    
    if (!entry) {
      if (tracewarn) console.warn("No route entry found for:", this.currentPath, this.metadata.page404);
      callback({ contents: this.metadata.page404() || [], template: this.metadata.template404 || [] });
      return;
    }

    const fn = entry.contents;
    if (!fn) {
      if (tracewarn) console.warn("No route handler found for:", this.currentPath);
      callback({ contents: [], template: this.metadata.page404 });
      return;
    }

    const template = entry.template ? entry?.template : this.metadata?.template ? this.metadata.template : (contents) => contents;
    if (tracerouter) console.log("[router] Final Template Fn", fn, template);
    if (!this.metadata.runAsync) {
      const contents = fn();
      callback({ contents, template });
      return;
    }

    Promise.resolve(fn())
      .then(contents => callback({ contents, template }))
      .catch(err => {
        //if (traceerror) console.error(contents);
        if (traceerror) console.error(err);
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
      console.log("[router] popstate listener", this.currentPath)
      const ext = getFileExtension(this.currentPath);
      if ( ['html', 'htm'].includes(ext) ) {
        console.log("[router] href intercept", this.currentPath)
        window.location.href = this.metadata.base + this.currentPath;
      } else {
        if (tracerouter) console.log("[router] POPSTATE:", this.currentPath);
        this.resolve(callback);
      }
    });
  }
} 

// https://developer.mozilla.org/en-US/docs/Web/API/Element
class Element {
  static _nextord = 0;
  static defaults = {
    css: {},
    props: {}
  };

  constructor(localName, metadata = {}, ...children) {
    this.localName = localName;
    this.mounted = false;
    this.metadata = this.constructor.applyDefaults(metadata);
    this.children = children;
    this.dom = null;
    this.ordinal = Element._nextord++;
    if (traceelement) console.log("[meta]", this.name, localName, ordingal, metadata);
    window.addEventListener("resize", this.onResize.bind(this));
  }
  
  static applyDefaults(metadata) {
    //if (tracedebug) console.log("[meta] CSS:", defaults.css);
    //if (tracedebug) console.log("[meta] PROPS:", defaults.props);
    let merge = {
      ...this.defaults,
      ...metadata,
      css: { ...this.defaults.css, ...(metadata.css || {}) },
      props: { ...this.defaults.props, ...(metadata.props || {}) }
    };
    if (tracedebug) console.log("[meta] MERGED:", merge);
    return merge;
  }
  
  static register() {
    // this.name is used in static functions otherwise this.constructor.name
    widgetRegistry[this.name] = this;
    return this;
  }

  onMount() {
    // DOM is guaranteed to exist here
    if (tracemount) console.log("[DOM] Mounted", this.constructor.name);
  }

  onUnmount() {
    // Remove any DOM nodes if left since this is going away
    for (const child of this.children) {
      if (child.mounted) {
        child.removeChild();
      }
    }
    if (tracemount) console.log("[DOM] Dis-Mounted", this.constructor.name);
  }

  addChild(...elems) {
    //this.children.push(elem);
    const flat = elems.flat();

    for (const elem of flat) {
      this.children.push(elem);
    }

    return flat[0];
  }

  removeChild(elem) {
    alert("Child removed! removeChild() Code untested.", elem);
    if (true) {
      if (elem.dom) elem.dom.remove();
      elem.mounted = false;
      elem.onUnmount();
      // readable, creates a new array
      this.children = this.children.filter(c => c !== elem);
    } else {
      // this may be more efficient
      const i = this.children.indexOf(elem);
      if (i !== -1) this.children.splice(i, 1);
    }
  }

  // I think this needs to be boxed (wrapped in a Box class object or div as parent)
  refresh() { 
    if (!this.dom) return; // not mounted yet
    if (tracedebug) console.log("[refresh] Refreshing", this.dom);
    // Clear existing DOM children
    while (this.dom.firstChild) {
      this.dom.removeChild(this.dom.firstChild);
    }
    // Render each metadata child into DOM
    for (const child of this.children) {
      const dom = child.render(this.dom);
      //this.dom.appendChild(dom);
    }
  }

  render(container) {
    // https://developer.mozilla.org/en-US/docs/Web/API/Document/createElement
    if (tracerender) console.log("[render]", this.localName, this.constructor.name, container);
    const el = document.createElement(this.localName);
    this.dom = el;
    el._widget = this;

    // Apply CSS
    //Object.assign(el.style, this.metadata.css);
    for (const key in this.metadata.css) {
      if (key.startsWith("--")) {
        el.style.setProperty(key, this.metadata.css[key]);
      } else {
        el.style[key] = this.metadata.css[key];
      }
    }

    // Apply props
    //Object.assign(el, this.metadata.props);
    this.applyProps(el, this.metadata.props);

    // Render children
    for (const child of this.children) {
      if (tracerender) console.log("[render] child:", typeof child, child);
      if (child instanceof Element) {
        child.render(el);
      } else if (typeof child === 'string' || typeof child === 'number') {
        el.appendChild(document.createTextNode(child));
      } else {
        if (traceerror) console.error("[render] Invalid instance", typeof child, child);
      }
    }

    container.appendChild(el);
    this.mounted = true;

    // After DOM insertion
    if (typeof this.onMount === "function") {
      // Defer to next microtask to ensure DOM is fully attached
      queueMicrotask(() => this.onMount());
    }

    return el;
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

      //if (el instanceof SVGElement) {
      //    if (tracedebug) console.log("SVG Element property");
      //    el.setAttribute(propName, value);
      //    continue;
      //}

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

  toJSON() { // Serialize component
    let serialized = {
      type: this.constructor.name,
      localName: this.localName,
      metadata: this.metadata,
      children: this.children.map(child => child.toJSON())
    };
    //if (tracedebug) console.log("[serialize] JSON ${serialized}", serialized);
    return serialized;
  }

  static fromJSON(data) { // Deserialize component
    const _classdef = widgetRegistry[data.type];
    if (!_classdef) {
      throw new Error(`Unknown widget type: ${data.type}`);
    }
    //if (tracedebug) console.log("[serialize] ${data.metadata}", data.metadata);
    // Create instance with metadata
    const instance = new _classdef(data.metadata);

    // Recursively load children
    if (Array.isArray(data.children)) {
      for (const childData of data.children) {
        const child = Element.fromJSON(childData);
        instance.children.push(child);
      }
    }
    //if (tracedebug) console.log("[serialize] ${instance}", instance);
    return instance;
  }

  toHTML_dep() {
    const tag = this.localName;
    if (tracedebug) console.log("[tag] toHTML", tag);
    const attrs = [];

    // Props → HTML attributes
    for (const [key, value] of Object.entries(this.metadata.props || {})) {
      if (key.startsWith("on")) {
        // Event handler
        if (typeof value === "string") {
          // SSR-safe: string event handler
          const eventName = key.toLowerCase();
          attrs.push(`${eventName}="${value}(event)"`);
        }
        // If it's a function → skip (hydration will attach it later)
      } else {
        // Normal attribute
        attrs.push(`${key}="${String(value)}"`);
      }
    }

    // CSS → inline style
    if (this.metadata.css) {
      const style = Object.entries(this.metadata.css)
        .map(([k, v]) => `${k}:${v}`)
        .join(";");
      attrs.push(`style="${style}"`);
    }

    const open = `<${tag}${attrs.length ? " " + attrs.join(" ") : ""}>`;

    const childrenHTML = (this.children || [])
      .map(child => child.toHTML())
      .join("");

    const close = `</${tag}>`;

    return open + childrenHTML + close;
  }

  toHTML(indent = 0) {
    const pad = "  ".repeat(indent);

    // Void elements (self-closing)
    const voidTags = new Set([
      "area","base","br","col","embed","hr","img",
      "input","link","meta","param","source","track","wbr"
    ]);

    // Tag name
    const tag = this.localName.toLowerCase();

    // Build attributes
    const attrs = [];

    for (const [key, value] of Object.entries(this.metadata.props || {})) {
      if (key === "textContent") continue;
      if (value === undefined || value === null || value === "") continue;

      const attrName = key === "className" ? "class" : key.toLowerCase();
      attrs.push(`${attrName}="${String(value)}"`);
    }

    // Style object → CSS string
    if (this.metadata.css && Object.keys(this.metadata.css).length > 0) {
      const css = Object.entries(this.metadata.css)
        .map(([k, v]) => `${k.replace(/[A-Z]/g, m => "-" + m.toLowerCase())}:${v}`)
        .join(";");
      attrs.push(`style="${css}"`);
    }

    const attrString = attrs.length ? " " + attrs.join(" ") : "";

    // Handle void elements
    if (voidTags.has(tag)) {
      return `${pad}<${tag}${attrString} />\n`;
    }

    // Opening tag
    let html = `${pad}<${tag}${attrString}>`;

    // Text content
    if (this.metadata.props?.textContent) {
      html += this.metadata.props.textContent;
    }

    // Children
    if (this.children.length > 0) {
      html += "\n";
      for (const child of this.children) {
        html += child.toHTML(indent + 1);
      }
      html += `${pad}</${tag}>\n`;
    } else {
      // No children → inline close
      html += `</${tag}>\n`;
    }

    return html;
  }
  
  onResize() {
    //console.log("resized:", this.dom.offsetWidth, this.dom.offsetHeight, this);
  }

  destroy() {
    window.removeEventListener("resize", this.onResize);
    this.mounted = false;
  }

}

if(registration) Element.register();

// this is for organizing internal vs passed in metadata
// competes with static defaults declaration used by Element I.e. you can use static defaults or this if you want inline internal meta. See examples JSONViewer and JSONLViewer
class Component extends Element {
  constructor(tag, internal = {}, metadata = {}, ...children) {
    const mergedProps = { ...(internal.props || {}), ...(metadata.props || {}) };
    const mergedCSS   = { ...(internal.css || {}), ...(metadata.css || {}) };

    const mergedMeta = {
      ...internal,
      ...metadata,
      props: mergedProps,
      css: mergedCSS
    };

    super(tag, mergedMeta, ...children);
  }
}

if(registration) Component.register();

console.log("DOMicile ver 1.0.0 RC initialized");
// I wanted a generic frame class but this is all just to make a div
class Box1 extends Element {
  static defaults = {
    css: {},
    props: { className: 'box'},
  };

  constructor(metadata={}, ...children) {
    super('div', metadata, ...children);
  }
}

const Box = Box1;
if(registration) Box.register();

class BoxBox1 extends Element {
  static defaults = {
    css: {
      //display: "block",
      //boxSizing: "border-box"
    },
    props: { className: 'boxbox1'},
  };

  constructor(innermeta, metadata = {}, ...children) {
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
    // this is the outer container
    super('div', merged);
    // this._inner is the inner container we abstract as the container so the child doesn't know it's not in just a single walled container when its actually double walled
    this._inner = new Box(innermeta, ...children);
    super.addChild(this._inner);
  }

  addChild(elem) {
    this._inner.addChild(elem);
    return elem;
  }

  removeChild(elem) {
    this._inner.removeChild(elem);
  }

  refresh() {
    this._inner.refresh();
  }
}

class BoxBox2 extends Element {
  static defaults = {
    css: {},
    props: { className: 'boxbox2' },
    children: []
  };

  constructor(innermeta, metadata = {}, ...children) {
    // Merge metadata
    const merged = {
      ...metadata,
      css: {
        ...Box.defaults.css,
        ...(metadata.css || {})
      },
      props: {
        ...Box.defaults.props,
        ...(metadata.props || {})
      }
    };
    // Outer container
    super("div", merged);

    // Inner container
    this._inner = new Element("div", innermeta, ...children);
    super.addChild(this._inner);
  }

  applySplitCSS(css) {
    const outerCSS = {};
    const innerCSS = {};

    for (const [key, value] of Object.entries(css)) {
      if (this.isOuterCSS(key)) outerCSS[key] = value;
      else innerCSS[key] = value;
    }

    // Apply to outer
    Object.assign(this.metadata.css, outerCSS);

    // Apply to inner
    Object.assign(this._inner.metadata.css, innerCSS);
  }

  // Rules for splitting CSS
  isOuterCSS(key) {
    return [
      "width", "height",
      "margin", "marginTop", "marginBottom", "marginLeft", "marginRight",
      "border", "borderRadius",
      "background", "backgroundColor",
      "position", "top", "left", "right", "bottom",
      "flex", "flexGrow", "flexShrink", "flexBasis",
      "display"
    ].includes(key);
  }

  addChild(elem) {
    return this._inner.addChild(elem);
  }

  removeChild(elem) {
    return this._inner.removeChild(elem);
  }

  refresh() {
    //super.refresh();      // refresh outer
    this._inner.refresh(); // refresh inner
  }
}

const BoxBox = BoxBox2; // E.g. used in NavBarTopBase
if(registration) BoxBox.register();

// For Example and organization
// TODO: change Box to Component
class GridBox extends Box {
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
        props: metadata.props || {className: 'grid-columns-box'}
      },
      ...children
    );
  }
}

if(registration) GridBox.register();

// For Example and organization
// TODO: change Box to Component
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
        props: metadata.props || {className: 'flex-row-box'}
      },
      ...children
    );
  }
}

if(registration) FlexRowBox.register();

// For Example and organization
// TODO: change Box to Component
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

if(registration) ResponsiveColumnsBox.register();

class HTMLBox extends Box {
  static defaults = {
    props: { className: 'html-box'},
  };
  constructor(metadata = {}) {
    super(metadata);
    this.setHTML(metadata.html || "");
    this.metadata.props['innerHTML'] = this.html;
  }

  _directDOMinjection() {
    if (!this.dom) {
      if (traceerror) console.log("HTMLBox directDOMinjection: No DOM, no direct DOM rendering!");
      return;
    }
    if (tracedom) console.debug("HTMLBox DOM Injection");
    this.dom.innerHTML = this.html;
  }

  setHTML(html) {
    //if (tracedebug) console.log("HTML", html);
    this.html = html;
    this.metadata.props['innerHTML'] = this.html;
    this._directDOMinjection();
  }
  
  docify(html) {
    const doc = new DOMParser().parseFromString(html, "text/html");
    return doc.documentElement.outerHTML;
  }
  
  extractHeadStyles(html) {
    const doc = new DOMParser().parseFromString(html, "text/html");
    return Array.from(doc.head.querySelectorAll("style"))
      .map(style => style.textContent)
      .join("\n");
  }
  
  extractBodyContent(html) {
    const doc = new DOMParser().parseFromString(html, "text/html");
    return doc.body.innerHTML;
  }
}

if(registration) HTMLBox.register();

// TODO: uses template replacement when loading HTML (and MD?)
class ContentLoader extends HTMLBox {
  constructor(metadata = {}) {
    super(metadata);
    this.base = metadata.base || '';
    this.src = metadata.src;
    this.isMarkdown = metadata.isMarkdown || false;
    this.sanitize = metadata.sanitize || true;
    this.load(this.src);
  }
  
  async load(source) {
    const res = await fetch(this.base + source);
    if (!res.ok) {
      console.error("Fetch failed!", this.base + source);
      return;
    }
    
    let text = await res.text();
    let html = text;
    console.log("Fetch succeeded!", text);

    if (this.isMarkdown) {
      html = marked.parse(html);
      if (this.sanitize) html = DOMPurify.sanitize(html);
    } else {
      if (this.sanitize) html = DOMPurify.sanitize(html);
    }

    this.setHTML(this.docify(html));
  }
}

if(registration) ContentLoader.register();

// DirectoryLoader (I never got this to work)
class IndexLoader {
  constructor(basePath, load=false) {
    this.basePath = basePath;
    this.items = [];      // array of { file, loader }
    this.loaded = false;  // index.json loaded
    this.onLoad = null;  // set onLoad if load=true
    if (load) this.loadIndex(); //
  }

  async loadIndex() {
    const res = await fetch(`${this.basePath}/index.json`);
    if (!res.ok) {
      console.error("Fetch failed!", res.status);
      return this.items;
    }
    const files = await res.json();

    for (const file of files) {
      const url = `${this.basePath}/${file}`;
      const box = new ContentLoader({ src: url});

      const match = file.match(/^(\d{14})-(.+)\.html$/);
      if (!match) continue;

      const timestamp = match[1];
      const rawTitle = match[2];
      const title = rawTitle.replace(/_/g, " ");

      this.items.push({
        timestamp,
        url,
        file,
        title,
        box
      });
    }

    this.items.sort((a, b) => b.timestamp.localeCompare(a.timestamp));

    this.loaded = true;
    if (this.onLoad) this.onLoad(this);
    return this.items;
  }
}

//if(registration) IndexLoader.register();

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
      if (traceerror) console.error("RESTLoader error:", err);
    }

    this.loaded = true;
    if (this.onLoad) this.onLoad(this.data);
  }
}

//if(registration) RESTLoader.register();

class IFrameLoader1 extends Element {
  constructor(metadata = {}) {
    super('div', metadata);
    this.base = metadata.base || '';
    this.src = metadata.src;
    this.isMarkdown = metadata.isMarkdown || false;
    this.html = null;
    console.log("[iframe] Loading source!", base + this.src);
    this.iframe = new Element("iframe");
    //this.iframe = new Element("iframe", { props: { src: base + this.src }});
    this.addChild(this.iframe);
    this.load(this.src);
  }
  
  async load(source) {
    const res = await fetch(this.base + source);
    if (!res.ok) {
      console.error("[iframe] Fetch failed!", res);
      return;
    }
    
    let html = '';
    let text = await res.text();
    console.log("[iframe] Fetch succeeded!", text);

    if (this.isMarkdown) {
      let parsed = marked.parse(text);
      html = DOMPurify.sanitize(parsed);
    } else {
      html = DOMPurify.sanitize(text);
    }
    
    this.setHTML(text);
  }
  
  setHTML(html) {
    console.log("[iframe] setHTML", this.iframe);
    this.html = html;
    if (this.iframe.mounted) this.iframe.dom.srcdoc = html;
  }
  
  onMount() {
    console.log("[iframe] OnMount");
    //this.iframe.dom.srcdoc = this.html;
    //this.resize();
  }
  
  resize() {
    try {
      this.iframe.dom.style.height = this.iframe.dom.contentWindow.document.documentElement.scrollHeight + 'px';
    } catch (e) {
      console.warn('[iframe] Could not resize iframe:', e);
    }
  }
}

class IFrameLoader extends Element {
  constructor(metadata = {}) {
    super("div", metadata);

    this.base = metadata.base || "";
    this.src = metadata.src;
    this.isMarkdown = metadata.isMarkdown || false;
    this.html = null;

    this.iframe = new Element("iframe", {
      css: {
        width: "100%",
        border: "none",
        overflow: "hidden"
      }
    });

    this.addChild(this.iframe);
    this.load(this.src);

    window.addEventListener("message", (event) => {
      if (event.data?.type === "iframe-resize") {
        this.iframe.dom.style.height = event.data.height + "px";
      }
    });
  }

  async load(source) {
    const res = await fetch(this.base + source);
    if (!res.ok) return;

    const text = await res.text();
    const html = this.isMarkdown ? marked.parse(text) : text;
    //const beautify = html_beautify(html);
    
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, 'text/html');
    const clean = doc.documentElement.outerHTML;
    
    this.setHTML(clean);
  }

  setHTML(html) {
    const resizeScript = `
      <script>
        function sendHeight() {
          const height = document.documentElement.scrollHeight;
          parent.postMessage({ type: "iframe-resize", height }, "*");
        }
        window.addEventListener("load", sendHeight);
        window.addEventListener("resize", sendHeight);
        new MutationObserver(sendHeight).observe(document.body, { childList: true, subtree: true });
      </script>
    `;

    this.html = html + resizeScript;

    if (this.iframe.mounted) {
      this.iframe.dom.srcdoc = this.html;
    }
  }
}

if(registration) IFrameLoader.register();

class SandboxedIFrameLoader extends Element {
  constructor(metadata = {}) {
    super("div", metadata);

    this.base = metadata.base || "";
    this.src = metadata.src;
    this.isMarkdown = metadata.isMarkdown || false;
    this.html = null;

    // Sandbox config: tighten or relax as needed
    // || falls back on empty string; ?? only falls back on null or undefined.
    const sandboxFlags = metadata.sandbox ?? [
      // no forms, no popups, no top-navigation
      "allow-scripts",	// Allows the execution of JavaScript within the iframe.
      //"allow-forms",	// Permits form submissions from the iframe.
      //"allow-popups",	// Enables the opening of popups from the iframe.
      //"allow-same-origin",	// Treats the iframe content as being from the same origin, allowing access to cookies and local storage.
      //"allow-top-navigation",	// Allows the iframe to navigate its top-level browsing context.
      //"allow-top-navigation-by-user-activation",	// Permits top-level navigation only if initiated by user actions.
      //"allow-modals",	// Grants permission to open modal dialogs.
      //"allow-presentation",	// Allows the iframe to start a presentation session.
      //"allow-popups-to-escape-sandbox",	// Lets popups open in a new unsandboxed context, bypassing the iframe's restrictions.
    ].join(" ");
    
    console.log("Sandbox Flags:", sandboxFlags);

    this.iframe = new Element("iframe", {
      props: {
        sandbox: sandboxFlags
      },
      css: {
        width: "100%",
        border: "none",
        overflow: "hidden"
      }
    });

    this.addChild(this.iframe);
    this.load(this.src);

    // Parent listens for resize messages from sandboxed iframe
    window.addEventListener("message", (event) => {
      if (event.data?.type === "sandbox-iframe-resize" &&
          event.source === this.iframe.dom.contentWindow) {
        this.iframe.dom.style.height = event.data.height + "px";
      }
    });
  }

  async load(source) {
    const res = await fetch(this.base + source);
    if (!res.ok) {
      console.error("[sandbox-iframe] Fetch failed", res.status);
      return;
    }

    const text = await res.text();
    const html = this.isMarkdown ? marked.parse(text) : text;
    //const beautify = html_beautify(html);
    
    const doc = new DOMParser().parseFromString(html, 'text/html');
    const clean = doc.documentElement.outerHTML;
    
    this.setHTML(clean);
  }

  setHTML(html) {
    const resizeScript = `
      <script>
        (function() {
          function sendHeight() {
            var height = document.documentElement.scrollHeight;
            parent.postMessage({ type: "sandbox-iframe-resize", height: height }, "*");
          }
          window.addEventListener("load", sendHeight);
          window.addEventListener("resize", sendHeight);
          new MutationObserver(sendHeight).observe(document.body, {
            childList: true,
            subtree: true
          });
        })();
      </script>
    `;

    this.html = html + resizeScript;

    if (this.iframe.mounted) {
      this.iframe.dom.srcdoc = this.html;
    }
  }

  onMount() {
    if (this.html) {
      this.iframe.dom.srcdoc = this.html;
    }
  }
}

if(registration) SandboxedIFrameLoader.register();

class InjectHTMLLoader extends HTMLBox {
  constructor(metadata = {}) {
    super(metadata);
    this.base = metadata.base || '';
    this.src = metadata.src;
    this.ext = getFileExtension(this.src);
    this.isMarkdown = this.ext === "md" ? true : false;
    this.isMarkdown = metadata.isMarkdown || false;
    this.sanitize = metadata.sanitize || true;
    this.load(this.src);
  }
  
  async load(source) {
    if (!['md', 'html', 'htm'].includes(getFileExtension(source))) {
      console.error("Unsupported file type!", source);
      this.setHTML("ERROR: InjectHTMLLoader Unsupported File Type > [" + getFileExtension(source) + "]");
      return;
    }
    const res = await fetch(this.base + source);
    if (!res.ok) {
      console.error("Fetch failed!", this.base + source);
      return;
    }

    let text = await res.text();
    if (tracedebug) console.log("Fetch succeeded!");
    
    let html = "";
    if (this.isMarkdown) {
      html = marked.parse(text);
    } else {
      html = this.docify(text);
      const css = this.extractHeadStyles(html);
      if (tracedebug) console.log("[inject] CSS:", css);
      //caveat: injected CSS will change the whole page not just the div it's in which can alter overall look. Intended for internal custom pages that don't conflict not random full HTML pages that are meant to be standalone. Testing with random full HTML page.
      const style = InjectHTMLLoader.injectCSS(css);
      html = this.extractBodyContent(html)
    }
    
    if (this.sanitize) {
      html = DOMPurify.sanitize(html);
    }
      
    if (tracedebug) console.log("[inject] HTML:", html);
    this.setHTML(html);
  }

  static injectCSS(cssText, target = document.head) {
    if (InjectHTMLLoader._cssInjected) return;
    InjectHTMLLoader._cssInjected = true;
    const style = document.createElement("style");
    style.textContent = cssText;
    target.appendChild(style);
    return style;
  }

}

if(registration) InjectHTMLLoader.register();

class Footer extends Box {
  constructor(metadata = {}, ...children) {
    super({
      css: {
        width: "100%",
        padding: "0px 0",
        marginTop: "10px",
        //borderTop: "1px solid #ddd",
        textAlign: "center",
        fontSize: "14px",
        color: "#666",
        //background: '#090909',
        ...(metadata.css || {})
      },
      props: {
        ...(metadata.props || {className: `footer-bar`})
      }
    }, ...children);
    let companyName = metadata.companyName ?? "";
    let copyright = metadata.copyright || "All rights reserved.";
    this.addChild(
      new Element('button', {
        css: { },
        props: { 
          className: "dc-btn-dark",
          id: "dc-footer-button-" + this.ordinal,
          textContent: "Scroll to Top", 
          onclick: () => {
            console.log("Scroll to top");
            document.body.scrollTop = 0; // For Safari
            document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
          }
        }
      })
    );
    this.addChild(new Element('br'));
    this.addChild(new Element('br'));
    this.addChild(
      new Element("div", {
        props: { textContent: `${companyName} © ${new Date().getFullYear()} ${copyright}`}
      })
    );
  }
  
  onMount() {
    const btn = document.getElementById("dc-footer-button-" + this.ordinal);
    window.addEventListener("scroll", () => {
      btn.classList.toggle("is-visible", window.scrollY > 300);
    });
  }
  
  onUnmount() {
  }
}

if(registration) Footer.register();

class ScrollToTop extends Box {
  constructor(metadata = {}) {
    super({
      css: {
        width: "100%",
        padding: "0px 0",
        marginTop: "10px",
        //borderTop: "1px solid #ddd",
        textAlign: "center",
        fontSize: "14px",
        color: "#666",
        //background: '#090909',
        ...(metadata.css || {})
      },
      props: {
        ...(metadata.props || {className: `footer-bar`})
      }
    });
    this.addChild(
      new Element('button', {
        css: { },
        props: { 
          className: "scroll-to-top",
          id: "dc-footer-button-" + this.ordinal,
          textContent: "Scroll", 
          onclick: () => {
            console.log("Scroll to top");
            document.body.scrollTop = 0; // For Safari
            document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
          }
        }
      })
    );
  }
  
  onMount() {
    const btn = document.getElementById("dc-footer-button-" + this.ordinal);

    this.handleScroll = () => {
      btn.classList.toggle("is-visible", window.scrollY > 300);
    };

    window.addEventListener("scroll", this.handleScroll);
  }

  onUnmount() {
    window.removeEventListener("scroll", this.handleScroll);
  }
}

if(registration) ScrollToTop.register();

class DemoWidget extends Box {
  constructor(metadata = {}) {
    super({
      css: {
        display: "inline-block",
        padding: "10px",
        ...(metadata.css || {})
      },
      props: {
        className: metadata.props?.className ? metadata.props.className : 'demo-widget',
        ...(metadata.props || {})
      },
      ...metadata
    });

    console.log("::: DemoWidget construction");

    this.addChild(new Element('div', {
      css: { background: "red" },
      props: { textContent: "Check out these images..." }
    }));

    this.addChild(new ImageBox({
      props: { src: imagerelurl + "granite-raw-block-250x250.jpg" }
    }));

    this.addChild(new ImageBox({
      props: { src: imagerelurl + "granite-raw-block-250x250.jpg" }
    }));
  }
}

//if(registration) DemoWidget.register();

class TabbedWidget extends Box {
  static defaults = {
    css: {},
    props: {},
    tabs: [] // [{ label: "Tab 1", content: Element }]
  };

  constructor(metadata = {}) {
    super(TabbedWidget.applyDefaults(metadata));
    console.log("Create tabbed widget", metadata);
    this.metadata.tabs = this.metadata.tabs || [];
    this.activeIndex = 0;

    // --- TAB BAR ---
    this.tabBar = new Element("div", {
      css: {
        display: "flex",
        gap: "0.5rem",
        borderBottom: "1px solid #ccc",
        paddingBottom: "0.5rem",
        //color: 'white',
        ...(metadata.tabBarCSS || {})
      }
    });

    // --- CONTENT AREA ---
    this.contentArea = new Box({
      css: {
        paddingTop: "1rem",
        ...(metadata.contentCSS || {})
      }
    });

    // Add both to the Box container
    this.addChild(this.tabBar);
    this.addChild(this.contentArea);

    // Build initial UI
    this.buildTabs();
    this.showActiveTab();
  }

  // Merge defaults with user metadata
  /* 3:49 PM 1/30/2026 */
  static applyDefaults(metadata) {
    return {
      css: { ...this.defaults.css, ...(metadata.css || {}) },
      props: { ...this.defaults.props, ...(metadata.props || {}) },
      tabs: metadata.tabs || this.defaults.tabs
    };
  }

  // -----------------------------
  // Build the tab buttons
  // -----------------------------
  buildTabs() {
    // clear out the tabs or they will stack up
    this.tabBar.children = [];
    // reapply tabs
    this.metadata.tabs.forEach((tab, index) => {
      const btn = new Element("button", {
        css: {
          padding: "0.5rem 1rem",
          border: "none",
          borderBottom: index === this.activeIndex ? "2px solid lavender" : "2px solid transparent",
          background: "none",
          cursor: "pointer",
          color: 'lavender',
        },
        props: {
          textContent: tab.label,
          onclick: () => {
            console.log("[tab] Select", index);
            this.selectTab(index);
          }
        }
      });

      this.tabBar.addChild(btn);
    });

    // dynamically refresh the tab bar
    if (this.tabBar.dom) this.tabBar.refresh();
  }

  // -----------------------------
  // Show the active tab content
  // -----------------------------
  showActiveTab() {
    this.contentArea.children = [];

    const active = this.metadata.tabs[this.activeIndex];
    if (active && active.content) {
      active.content.forEach((key, value) => {
        this.contentArea.addChild(key);
      });
    }

    if (this.contentArea.dom) this.contentArea.refresh();
  }

  // -----------------------------
  // Public API
  // -----------------------------
  addTab(label, content) {
    this.metadata.tabs.push({ label, content });
    this.buildTabs();
    this.showActiveTab();
  }

  selectTab(index) {
    this.activeIndex = index;
    this.buildTabs();
    this.showActiveTab();
  }
}

if(registration) TabbedWidget.register();

class Contact extends Box {
  constructor(metadata = {}) {
    super({
      css: {
        display: "flex",
        flexDirection: "column",
        gap: "15px",
        maxWidth: "400px",
        padding: "20px",
        border: "1px solid #ddd",
        borderRadius: "8px",
        background: "#fafafa",
        color: "black",
        ...metadata.css
      },
      props: metadata.props || {}
    });

    // First Name
    this.addChild(
      new Element("label", { props: { textContent: "First Name" } }),
      new Element("input", {
        props: {
          type: "text",
          name: "firstName",
          placeholder: "Joel"
        },
        css: {
          padding: "8px",
          border: "1px solid #ccc",
          borderRadius: "4px",
        }
      })
    );

    // Last Name
    this.addChild(
      new Element("label", { props: { textContent: "Last Name" } }),
      new Element("input", {
        props: {
          type: "text",
          name: "lastName",
          placeholder: "Johnson"
        },
        css: {
          padding: "8px",
          border: "1px solid #ccc",
          borderRadius: "4px"
        }
      })
    );

    // Email
    this.addChild(
      new Element("label", { props: { textContent: "Email" } }),
      new Element("input", {
        props: {
          type: "email",
          name: "email",
          placeholder: "email@example.com"
        },
        css: {
          padding: "8px",
          border: "1px solid #ccc",
          borderRadius: "4px",
          color: "black",
        }
      })
    );

    // Message
    this.addChild(
      new Element("label", { props: { textContent: "Message" } }),
      new Element("textarea", {
        props: {
          name: "message",
          placeholder: "Your message...",
          rows: 5
        },
        css: {
          padding: "8px",
          border: "1px solid #ccc",
          borderRadius: "4px",
          resize: "vertical"
        }
      })
    );

    // Submit Button
    this.addChild(
      new Element("button", {
        props: {
          textContent: "Send",
          type: "submit"
        },
        css: {
          padding: "10px 15px",
          background: "#333",
          color: "white",
          border: "none",
          borderRadius: "4px",
          cursor: "pointer"
        }
      })
    );
  }
}

if(registration) Contact.register();

// WIP - this doesn't work yet
class Calendar extends Box {
  constructor(metadata = {}) {
    const defaults = {
      year: new Date().getFullYear(),
      month: new Date().getMonth(), // 0–11
      onSelect: null,
      css: {
        display: "inline-flex",
        flexDirection: "column",
        padding: "10px",
        border: "1px solid #ccc",
        borderRadius: "8px",
        fontFamily: "sans-serif",
        //background: "#fff",
        userSelect: "none"
      }
    };

    const merged = {
      ...defaults,
      ...metadata,
      css: { ...defaults.css, ...(metadata.css || {}) }
    };

    super(merged);

    this.year = merged.year;
    this.month = merged.month;
    this.onSelect = merged.onSelect;
    this.lastCell = null;

    this.buildHeader();
    this.buildGrid();
  }

  buildHeader() {
    this.header = new Element("div", {
      css: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: "10px",
        fontWeight: "600"
      }
    });

    this.prevBtn = new Element("div", {
      props: { textContent: "<" },
      css: { cursor: "pointer", padding: "4px 8px" }
    });

    this.nextBtn = new Element("div", {
      props: { textContent: ">" },
      css: { cursor: "pointer", padding: "4px 8px" }
    });

    this.title = new Element("div");

    this.prevBtn.metadata.props.onclick = () => {
        console.log("-Click Month:");
        this.changeMonth(-1);
    }
    this.nextBtn.metadata.props.onclick = () => {
      console.log("+Click Month:");
      this.changeMonth(1);
    }

    this.header.addChild(this.prevBtn);
    this.header.addChild(this.title);
    this.header.addChild(this.nextBtn);

    this.addChild(this.header);
  }

  buildGrid() {
    this.grid = new Element("div", {
      css: {
        display: "grid",
        gridTemplateColumns: "repeat(7, 1fr)",
        gap: "4px"
      }
    });

    const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    weekdays.forEach(d =>
      this.grid.addChild(
        new Element("div", {
          props: { textContent: d },
          css: { textAlign: "center", fontWeight: "600", padding: "4px 0" }
        })
      )
    );

    this.dayCells = [];
    for (let i = 0; i < 6 * 7; i++) {
      const cell = new Element("div", {
        css: {
          textAlign: "center",
          padding: "6px 0",
          borderRadius: "4px",
          cursor: "pointer",
          minHeight: "24px"
        }
      });

      cell.metadata.props.onclick = () => {
        const day = cell._dayNumber;
        if (!day) return;
        console.log("Click cell:", day);
        if (this.lastCell) this.lastCell.dom.style.border = "";
        cell.dom.style.border = "1px solid red";
        this.lastCell = cell;
        if (this.onSelect) {
          this.onSelect({
            year: this.year,
            month: this.month,
            day
          });
        }
      };

      cell.metadata.props.onmouseenter = () => {
        if (!cell._dayNumber) return;
        cell.dom.style.background = "#eee";
        cell.dom.style.color = "#000";
      };

      cell.metadata.props.onmouseleave = () => {
        cell.dom.style.background = "";
        cell.dom.style.color = "";
      };

      this.dayCells.push(cell);
      this.grid.addChild(cell);
    }

    this.addChild(this.grid);
  }

  onMount() {
    this.updateCalendar();
  }

  updateCalendar() {
    const monthName = new Date(this.year, this.month).toLocaleString("default", {
      month: "long"
    });
    this.title.dom.textContent = `${monthName} ${this.year}`;

    const firstDay = new Date(this.year, this.month, 1).getDay();
    const daysInMonth = new Date(this.year, this.month + 1, 0).getDate();

    const today = new Date();

    this.dayCells.forEach((cell, index) => {
      const dayNumber = index - firstDay + 1;

      if (dayNumber < 1 || dayNumber > daysInMonth) {
        // Not part of this month
        cell.dom.textContent = "";
        cell._dayNumber = null;
        cell.dom.style.visibility = "hidden";
        cell.dom.style.border = ""; // reset border
        return;
      }

      // Valid day
      cell.dom.textContent = dayNumber;
      cell._dayNumber = dayNumber;
      cell.dom.style.visibility = "visible";

      // --- TODAY DETECTION ---
      const isToday =
        today.getFullYear() === this.year &&
        today.getMonth() === this.month &&
        today.getDate() === dayNumber;

      if (isToday) {
        this.currentCell = cell;
        console.log("Today is:", dayNumber);
        cell.dom.style.border = "2px solid green";
        cell.dom.style.borderRadius = "4px";
      } else {
        // Reset border for non-today cells
        cell.dom.style.border = "";
      }
    });
  }


  changeMonth(delta) {
    this.month += delta;
    if (this.month < 0) {
      this.month = 11;
      this.year--;
    } else if (this.month > 11) {
      this.month = 0;
      this.year++;
    }
    this.updateCalendar();
  }
}

if(registration) Calendar.register();
// SPA
console.log("Starting Marky");

// starting template
class UI extends Element {
  constructor(app, metadata = {}) {
    super("div", {
      ...metadata,
      css: {
        display: "none",
        ...metadata.css
      },
      props: {
        ...metadata.props,
        className: "dc-ui",
      }
    })
    this.app = app;
  }

  onMount() {
  }
}

class Label extends Element {
  constructor(/*text, */metadata = {}, ...children) {
    super("label", {
      ...metadata,
      css: {
        ...metadata.css,
      },
      props: {
        //textContent: text,
        className: "dc-label",
        ...metadata.props,
      }
    })
    this.addChild(...children);
  }
}

class ThemeDropdown extends Optdown {
  constructor(app, metadata = {}) {
    super({
        ...metadata,
        //name: "Theme", 
        list: Object.keys(cssMap),
        css: {
          marginLeft: "6px",
        },
      }
    );
    this.app = app;
  }
  
  onChange(e) {
      //console.log("Select", this.list[e.target.selectedIndex]);
      //this.app.preview.write(this.app.textbox.read());
      this.app.update();
  }
}

class Toolbar3P extends Element {
  constructor(app, metadata = {}) {
    super("div", {
        ...(metadata || {}),
        css: {
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "0.5em 1em 0.5em 1em",
          width: "100%",
          background: "#222",
          color: "#eee",
          border: "1px solid #444",
          fontFamily: "sans-serif",
          ...(metadata.css || {})
        },
        props: {
          className: "dc-toolbar",
          ...(metadata.props || {})
        }
      }
    );
    this.app = app;
    this.left = new Element("div", {css: { display: "flex", flexWrap: "wrap", alignItems: "center", gap: "10px", padding: "10px", border: "1px solid #111",}});
    this.middle = new Element("div", {css: { display: "flex", flexWrap: "wrap", alignItems: "center", gap: "10px", padding: "10px", border: "1px solid #111",}});
    this.right = new Element("div", {css: { display: "flex", flexWrap: "wrap", alignItems: "center", gap: "10px", padding: "10px", border: "1px solid #111",}});

    this.left.addChild(new Element("button", {
          css: {
            //textAlign: "right",
          },
          props: {
            textContent: "Reset",
            onclick: () => {
              this.app.textbox.write(defaultMarkdown);
            }
          }
        }
      )
    );

    this.editor = new Element("input", {
        css: {
          marginLeft: "6px",
        },
        props: {
          type: "checkbox",
          checked: "",
        }
      }
    );
    this.addLeft(new Label({}, "Editor", this.editor));

    this.syncscroll = new Element("input", {
        css: {
          marginLeft: "6px",
        },
        props: {
          type: "checkbox",
          checked: "",
        }
      }
    );
    this.middle.addChild(new Label({}, "Scroll", this.syncscroll));
    
    this.themes = new ThemeDropdown(this.app);
    //this.right.addChild(this.themes);
    this.right.addChild(new Element("label", {}, "Theme", this.themes));
    
    this.sanitize = new Element("input", {
        css: {
          marginLeft: "6px",
        },
        props: {
          type: "checkbox",
          checked: "",
        }
      }
    );
    this.right.addChild(new Label({}, "Purify", this.sanitize));

    this.raw = new Element("input", {
        css: {
          marginLeft: "6px",
        },
        props: {
          type: "checkbox",
        }
      }
    );
    this.right.addChild(new Label({}, "HTML", this.raw));

    this.addChild(this.left);
    this.addChild(this.middle);
    this.addChild(this.right);
  }
  
  addLeft(...children) {
    this.left.addChild(...children);
  }

  onMount() {
    this.editor.dom.addEventListener('change', (e) => {
      //console.log("Editor", e.target.checked);
      let showEditor = e.target.checked;
      let showPreview = true;
      this.app.textbox.dom.style.flex = showEditor ? "1" : "0";
      //this.app.preview.dom.style.flex = showPreview ? "1" : "0";
      this.app.textbox.dom.classList.toggle('hidden', !showEditor);
      //this.app.preview.dom.classList.toggle('hidden', !showPreview);
    });
    this.raw.dom.addEventListener('change', (e) => {
      //this.app.preview.write(this.app.textbox.read());
      this.app.update();
    });
    this.sanitize.dom.addEventListener('change', (e) => {
      //this.app.preview.write(this.app.textbox.read());
      this.app.update();
    });
  }
}

class MDPreview extends Element {
  constructor(app, metadata = {}) {
    super("iframe", {
        ...(metadata || {}),
        css: {
          ...(metadata.css || {})
        },
        props: {
          className: "dc-preview-md",
          ...(metadata.props || {})
        }
      }
    );
    this.app = app;
  }

  escapeHtml(str) {
    return str
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;");
  }

  write(text) {
    const doc = this.dom.contentDocument;
    //doc.body.innerHTML = "";
    const html = marked.parse(text);
    const bleached = DOMPurify.sanitize(html);
    const fin = htmlTemplateBasic(
      this.app.toolbar.sanitize.dom.checked ? bleached : html,
      cssMap[this.app.toolbar.themes.dom.value] //'./assets/css/preview_slate.css'
    );
    const beautify = html_beautify(fin);
    //console.log(beautify);
    if (this.app.toolbar.raw.dom.checked) {
      const esc = this.escapeHtml(beautify);
      doc.body.innerHTML = `<pre><code>${esc}</code></pre>`;
      doc.body.style.color = "#eee";
      doc.body.style.backgroundColor = "#111";
      doc.body.style.fontFamily = "monospace";
    } else {
      doc.body.style.color = "";
      doc.body.style.backgroundColor = "";
      doc.body.style.fontFamily = "";
      doc.body.innerHTML = fin;
    }
  }

  read() {
    return this.dom.value;
  }

  onMount() {
    this.dom.addEventListener('load', () => {
      const doc = this.dom.contentWindow.document;
      console.log("Load:", doc);
      //if (view) updatePreview(currentMode);
      this.app.textbox.dom.addEventListener('scroll', () => {
        //console.log("Scroll Preview", this.app.toolbar.syncscroll.checked);
        if (!this.app.toolbar.syncscroll.dom.checked) return;
        console.log("IFrame Scroll Sync:", doc);
        const source = doc.body;
        const ratio = source.scrollTop / (source.scrollHeight - source.clientHeight);
        const target = this.app.textbox.dom;
        target.scrollTop = ratio * (target.scrollHeight - target.clientHeight);
      });
    });
  }
}

class TextBox extends Element {
  constructor(app, metadata = {}) {
    super("textarea", {
        ...(metadata || {}),
        css: {
          ...(metadata.css || {})
        },
        props: {
          className: "dc-textbox",
          ...(metadata.props || {})
        }
      }
    );
    this.app = app;
  }

  write(text) {
    this.dom.value = text;
    sessionStorage.setItem('editorContent', this.dom.value);
    //this.app.preview.write(this.app.textbox.read());
    this.app.update();
  }

  read() {
    return this.dom.value;
  }

  onMount() {
    this.dom.value = sessionStorage.getItem('editorContent') ?? defaultMarkdown;
    this.dom.addEventListener('input', () => {
      sessionStorage.setItem('editorContent', this.dom.value);
      //this.app.preview.write(this.app.textbox.read());
      this.app.update();
    });
    this.dom.addEventListener('scroll', () => {
      //console.log("Scroll Textbpx", this.app.toolbar.syncscroll.checked);
      if (!this.app.toolbar.syncscroll.dom.checked) return;
      const doc = this.app.preview.dom.contentWindow.document;
      //console.log("Editor Scroll Sync:", doc);
      const ratio = this.dom.scrollTop / (this.dom.scrollHeight - this.dom.clientHeight);
      const target = doc.body;
      target.scrollTop = ratio * (target.scrollHeight - target.clientHeight);
    });
  }
}

class SPApp extends Element {
  constructor(metadata = {}) {
    super("div", {
      ...metadata,
      css: {
        display: "flex",
        flexDirection: "column",
        height: "100vh",
        ...metadata.css
      },
      props: {
        ...metadata.props,
        className: "dc-container",
      }
    })
    // title?
    //this.addChild(new Element("h1", { props: { textContent: "Hello" }}));
    // toolbar
    this.toolbar = new Toolbar3P(this);
    /*
    this.toolbar.addChild(new Element("button", {
          css: {
            //textAlign: "right",
          },
          props: {
            textContent: "Reset",
            onclick: () => {
              //this.onClick({msg: "Hello There!"});
              //this.preview.write(this.textbox.read());
              //alert(this.textbox.read());
              this.textbox.write(defaultMarkdown);
            }
          }
        }
      )
    );
    this.toolbar.raw = new Element("input", {
          css: {
          },
          props: {
            type: "checkbox",
          }
        }
      );
    this.toolbar.addChild(this.toolbar.raw);
    */
    this.addChild(this.toolbar);

    // main
    this.main = new Element("div", {
      css: {
        display: "flex",
        //flexWrap: "wrap",
        minHeight: "0",
        height: "100%",
        width: "100%",
        //backgroundColor: "var(--bg)",
        ...metadata.css
      },
    });

    this.textbox = new TextBox(this, {
      css: {
          flex: "1",
          minHeight: "0",
          height: "100%",
          /* padding: 1em;*/
          boxSizing: "border-box",
          border: "1px solid brown",
          resize: "none",
          fontFamily: "monospace",
          backgroundColor: "#1e1e1e",
          color: "#dcdcdc",
        }
    });
    this.main.addChild(this.textbox);

    this.preview = new MDPreview(this, {
      css: {
          flex: "1",
          minHeight: "0",
          height: "100%",
          /* padding: 1em;*/
          boxSizing: "border-box",
          border: "none",
          resize: "none",
          fontFamily: "monospace",
          overflowY: "auto",
          border: "1px solid blue",
          //backgroundColor: "#222",
          //color: "#eee",
        },
        //props: { textContent: defaultMarkdown }
    });
    this.main.addChild(this.preview);

    this.addChild(this.main);
  }

  onMount() {
    this.preview.write(this.textbox.read());
  }
  
  update() {
    this.preview.write(this.textbox.read());
  }
}

document.body.style.color = "#fff";
document.body.style.backgroundColor = "#111";

new SPApp().render(document.getElementById("root"));

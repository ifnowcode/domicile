// SPA
console.log("Starting SPA");

class Toolbar extends Element {

  constructor(app, metadata = {}) {
    super("div", {
        ...(metadata || {}),
        css: {
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "0.5em 1em",
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
    
    this.addChild(new Element("button", { 
          css: {
            //textAlign: "right",
          },
          props: { 
            textContent: "Reset", 
            onclick: () => {
              //this.app.onClick({msg: "Hello There!"});
              //this.app.preview.write(this.app.textbox.read());
              //alert(this.app.textbox.read());
              this.app.textbox.write(defaultMarkdown);
            }
          }
        }
      )
    );
    
    this.raw = new Element("input", { 
          css: {
          },
          props: { 
            type: "checkbox", 
          }
        }
      );
      
    this.addChild(this.raw);
  }
  
  onMount() {
    this.raw.dom.addEventListener('change', (e) => {
      this.app.preview.write(this.app.textbox.read());
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
    const content = DOMPurify.sanitize(html);
    const fin = htmlTemplateBasic(content, './assets/css/preview_slate.css');
    const beautify = html_beautify(fin);
    console.log(beautify);
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
    this.app.preview.write(this.app.textbox.read());
  }
  
  read() {
    return this.dom.value;
  }
  
  onMount() {
    this.dom.value = sessionStorage.getItem('editorContent')
    this.dom.addEventListener('input', () => {
      sessionStorage.setItem('editorContent', this.dom.value);
      this.app.preview.write(this.app.textbox.read());
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
    this.toolbar = new Toolbar(this);
    this.addChild(this.toolbar);
    // main
    this.main = new Element("div", {
      css: {
        display: "flex",
        //flexWrap: "wrap",
        minHeight: "0",
        //height: "100%",
        width: "100%",
        backgroundColor: "var(--bg)",
        ...metadata.css
      },
    });
    
    this.textbox = new TextBox(this, { 
      css: {
          flex: "1",
          minHeight: "0",
          height: "100vh",
          /* padding: 1em;*/
          boxSizing: "border-box",
          border: "1px solid red",
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
          height: "100vh",
          /* padding: 1em;*/
          boxSizing: "border-box",
          border: "none",
          resize: "none",
          fontFamily: "monospace",
          overflowY: "auto",
          border: "1px solid green",
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
}

document.body.style.color = "#fff";
document.body.style.backgroundColor = "#111";

new SPApp().render(document.getElementById("root"));

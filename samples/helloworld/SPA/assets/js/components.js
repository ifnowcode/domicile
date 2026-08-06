/////////////////////////////////////////////////////////////////////
//
// Components
//
/////////////////////////////////////////////////////////////////////
class Button extends Element {
  static defaults = {
    css: {
      background: "teal"
    },
    props: { className: 'button' },
  };
  constructor(metadata={}) {
    super('button', metadata);
    console.log("::: Button construction");
  }
}

if(registration) Button.register();

class Typewriter extends Element {
  constructor(metadata={props: {className: "typewriter"}}) {
    super('div', metadata);
    const { delay=0, speed=50, text='Lorem ipsum dummy text blabla.' } = metadata;
    console.log("::: Typewriter construction");
    this.i = 0;
    this.delayid = null;
    this.writeid = null;
    this.txt = text;
    this.delay = delay;
    this.speed = speed;
    this.writer = new Element('p');
    this.addChild(this.writer);
  }

  write() {
    if (this.i < this.txt.length) {
      this.writer.dom.innerHTML += this.txt.charAt(this.i);
      this.i++;
      if (this.writeid) clearTimeout(this.writeid);
      this.writeid = setTimeout(this.write.bind(this), this.speed);
    }
  }

  onMount() {
    this.i = 0;
    console.log("Typewriter is being mounted");
    if (this.delayid) clearTimeout(this.delayid);
    this.delayid = setTimeout(this.write.bind(this), this.delay); 
  }
  
  onUnmount() {
    console.log("Typewriter is being unmounted");
  }
}

if(registration) Typewriter.register();

class ButtonCounter extends Element {
  constructor(metadata = {}) {
    super("button", metadata);
    //this.key = metadata.key || `counter-${ButtonCounter.nextId++}`;
    this.key = `counter-${this.ordinal}`;
    console.log("::: ButtonCounter construction", this.key);
    // local state stored in metadata
    this.metadata.count = sessionStorage.getItem(this.key) ?? this.metadata.count ?? 0;

    // event handler
    this.metadata.props.onclick = () => {
      this.metadata.count++;
      this.updateLabel();
    };
  }

  updateLabel() {
    if (this.dom) {
      this.dom.textContent = `Clicked ${this.metadata.count} Times`;
      sessionStorage.setItem(this.key, this.metadata.count);
    }
  }

  render(container) {
    super.render(container);
    this.updateLabel();
  }
}

if(registration) ButtonCounter.register();

class UnderConstruction extends Element {
  static defaults = {
    css: {
      //background: "teal"
    },
    props: { className: 'under-construction' },
  };

  constructor(metadata={}) {
    super('button', metadata);
    console.log("::: UnderConstruction", this.metadata);
    this.addChild(new Element('p', { props: {textContent: "TBD: This is 🚧 'Under Construction'"}}));
  }
}

if(registration) UnderConstruction.register();

class Link extends Element { // internal link because base
  constructor(metadata = {}, ...children) {
    // Expect props.href and props.textContent at minimum
    const { base } = metadata;
    const { href, textContent, className='' } = metadata.props;
    const link = base + href;
    console.log("Create Link:", link);
    super("a", {
      ...metadata,
      props: {
        ...metadata.props,
        href: link,
        textContent,
        className: className,
        onclick: (e) => {
          // Allow normal browser behavior for:
          // - middle click
          // - right click
          // - ctrl/cmd click (open in new tab)
          if (
            e.metaKey ||
            e.ctrlKey ||
            e.shiftKey ||
            e.button !== 0
          ) {
            return;
          } else if (e.altKey) {
            // bypass navigate and load the href like a normal link
            console.warn("Link Alt Click", e);
            e.preventDefault();
            window.location.href = link;
            return;
          }

          console.log("Link Click", e);
          //e.preventDefault();
          //this.navigate(link);
        }
      },
      css: metadata.css
    }, ...children);
    this.base = base;
  }
}

if(registration) Link.register();

class Navigator extends Element {
  constructor(metadata = {}, ...children) {
    // Expect props.href and props.textContent at minimum
    const { base, popoff=false } = metadata;
    const { href, textContent, className='' } = metadata.props;
    const link = base + href;
    console.log("Create Link:", link);
    super("a", {
      ...metadata,
      props: {
        ...metadata.props || {},
        href: link,
        textContent,
        className: className,
        onclick: (e) => {
          // Allow normal browser behavior for:
          // - middle click
          // - right click
          // - ctrl/cmd click (open in new tab)
          if (
            e.metaKey ||
            e.ctrlKey ||
            e.shiftKey ||
            e.button !== 0
          ) {
            return;
          } else if (e.altKey || popoff) {
            // bypass navigate (popstate routing) and load the href
            console.log("Link Alt Click", e);
            window.location.href = link;
            return;
          }

          console.log("Link Click", e);
          e.preventDefault();
          this.navigate(link);
        }
      },
      css: metadata.css
    }, ...children);
    this.base = base;
  }

  // Programmatic navigation
  navigate(path) {
    console.log("Navigate to", path);
    window.history.pushState({}, "", path);
    window.dispatchEvent(new PopStateEvent("popstate"));
  }
}

if(registration) Navigator.register();
const LinkNav = Navigator;

class ImageBox extends Element {
  static defaults = {
    css: {
      display: "inline-block",
    },
    props: {
      src: "",
      className: 'dc-image-box',
    },
  };

  constructor(metadata={}) {
    super('img', metadata);
    //console.log("::: ImageBox construction");
  }
}

if(registration) ImageBox.register();

class Table extends Element {
  static defaults = {
    css: {
      //display: "table",
      //borderCollapse: "collapse",
      //fontFamily: "monospace"
    },
    props: {},
    columns: [],
    rows: []
  };

  constructor(metadata = {}) {
    super('div', Table.applyDefaults(metadata));
    console.log("::: WideScreenSlideshow construction");
    console.log("Meta:", this.metadata);
  }

  // Merge defaults with user metadata
  static applyDefaults(metadata) {
    return {
      css: { ...this.defaults.css, ...(metadata.css || {}) },
      props: { ...this.defaults.props, ...(metadata.props || {}) },
      columns: metadata.columns || this.defaults.columns,
      rows: metadata.rows || this.defaults.rows
    };
  }

  // -----------------------------
  // Dynamic API
  // -----------------------------
  setColumns(columns) {
    this.metadata.columns = columns;
    this.rerender();
  }

  setRows(rows) {
    this.metadata.rows = rows;
    this.rerender();
  }

  addRow(row) {
    this.metadata.rows.push(row);
    this.rerender();
  }

  removeRow(index) {
    this.metadata.rows.splice(index, 1);
    this.rerender();
  }

  render(container) {
    const table = document.createElement("table");
    this.dom = table;
    table._widget = this;

    Object.assign(table.style, this.metadata.css);
    Object.assign(table, this.metadata.props);

    // Build header
    const thead = document.createElement("thead");
    const hrow = document.createElement("tr");

    for (const col of this.metadata.columns) {
      const th = document.createElement("th");
      th.textContent = col.label || col.key;
      hrow.appendChild(th);
    }

    thead.appendChild(hrow);
    table.appendChild(thead);

    // Build body
    const tbody = document.createElement("tbody");

    for (const row of this.metadata.rows) {
      const tr = document.createElement("tr");

      for (const col of this.metadata.columns) {
        const td = document.createElement("td");
        td.textContent = row[col.key];
        tr.appendChild(td);
      }

      tbody.appendChild(tr);
    }

    table.appendChild(tbody);
    container.appendChild(table);
  }

  rerender() {
    if (!this.dom) return;
    const parent = this.dom.parentNode;
    if (!parent) return;
    parent.removeChild(this.dom);
    this.render(parent);
  }

}

if(registration) Table.register();

class Table2 extends Element {
  static defaults = {
    css: {},
    props: {},
    columns: [],
    rows: []
  };

  constructor(metadata = {}) {
    super('div', Table2.applyDefaults(metadata));

    this.table = new Element("table", {
      css: this.metadata.css,
      props: this.metadata.props
    });

    this.thead = new Element("thead");
    this.tbody = new Element("tbody");

    this.table.addChild(this.thead);
    this.table.addChild(this.tbody);

    this.addChild(this.table);

    this.buildHeader();
    this.buildBody();
  }

  // Merge defaults with user metadata
  static applyDefaults(metadata) {
    return {
      css: { ...this.defaults.css, ...(metadata.css || {}) },
      props: { ...this.defaults.props, ...(metadata.props || {}) },
      columns: metadata.columns || this.defaults.columns,
      rows: metadata.rows || this.defaults.rows
    };
  }

  // -----------------------------
  // Build header once
  // -----------------------------
  buildHeader() {
    this.thead.children = [];

    const headerRow = new Element("tr");

    for (const col of this.metadata.columns) {
      const th = new Element("th", {
        props: { textContent: col.label || col.key }
      });
      headerRow.addChild(th);
    }

    this.thead.addChild(headerRow);

    if (this.thead.dom) this.thead.renderChildren();
  }

  // -----------------------------
  // Build body (called on refresh)
  // -----------------------------
  buildBody() {
    this.tbody.children = [];

    for (const row of this.metadata.rows) {
      const tr = new Element("tr");

      for (const col of this.metadata.columns) {
        const td = new Element("td", {
          props: { textContent: row[col.key] }
        });
        tr.addChild(td);
      }

      this.tbody.addChild(tr);
    }

    if (this.tbody.dom) this.tbody.renderChildren();
  }

  // -----------------------------
  // Dynamic API
  // -----------------------------
  setColumns(columns) {
    this.metadata.columns = columns;
    this.buildHeader();
    this.buildBody();
  }

  setRows(rows) {
    this.metadata.rows = rows;
    this.buildBody();
  }

  addRow(row) {
    this.metadata.rows.push(row);
    this.buildBody();
  }

  removeRow(index) {
    this.metadata.rows.splice(index, 1);
    this.buildBody();
  }

  refresh() {
    this.buildBody();
  }
}

if(registration) Table2.register();

class DigitalClock extends Element {
  constructor(metadata = {}) {
    super("div", {
      css: { display: 'inherit'},
      ...metadata
    });
    // child that displays the time
    this.timeLabel = new Element("span", {
      props: { textContent: DigitalClock.formatTime(new Date()) }
    });

    this.addChild(this.timeLabel);

    // keep ticking
    this._timer = setInterval(() => {
      const now = new Date();
      const text = DigitalClock.formatTime(now);

      // update metadata
      this.timeLabel.metadata.props.textContent = text;

      // update DOM if mounted
      if (this.timeLabel.dom) {
        this.timeLabel.dom.textContent = text;
      }
    }, 1000);
  }

  // optional cleanup if you add a destroy lifecycle later
  dispose() {
    if (this._timer) {
      clearInterval(this._timer);
      this._timer = null;
    }
  }

  static formatTime(d) {
    const hh = String(d.getHours()).padStart(2, "0");
    const mm = String(d.getMinutes()).padStart(2, "0");
    const ss = String(d.getSeconds()).padStart(2, "0");
    return `${hh}:${mm}:${ss}`;
  }
}

if(registration) DigitalClock.register();

class SmallAnalogClock extends Element {
  constructor(metadata = {}) {
    super("div", {
      css: {
        display: "grid",
        placeItems: "center",
      },
      ...metadata
    });

    console.log("::: AnalogClock construction");

    this.showNumbers = metadata.showNumbers ?? true;

    this.face = new Element("div", {
      css: {
        position: "relative",
        width: "120px",
        height: "120px",
        border: "2px solid currentColor",
        borderRadius: "50%",
        boxSizing: "border-box",
      }
    });

    if (this.showNumbers) {
      for (let i = 1; i <= 12; i++) {
        const angle = i * 30;
        const rad = (angle - 90) * (Math.PI / 180);
        const x = 50 + 40 * Math.cos(rad);
        const y = 50 + 40 * Math.sin(rad);

        const number = new Element("span", {
          props: { textContent: String(i) },
          css: {
            position: "absolute",
            left: `${x}%`,
            top: `${y}%`,
            transform: "translate(-50%, -50%)",
            fontSize: "12px",
            lineHeight: "1",
            userSelect: "none",
          }
        });

        this.face.addChild(number);
      }
    }

    this.hourHand = new Element("div", {
      css: {
        position: "absolute",
        left: "50%",
        top: "50%",
        width: "4px",
        height: "30px",
        background: "currentColor",
        transformOrigin: "50% 100%",
        transform: "translate(-50%, -100%) rotate(0deg)",
        borderRadius: "999px",
      }
    });

    this.minuteHand = new Element("div", {
      css: {
        position: "absolute",
        left: "50%",
        top: "50%",
        width: "3px",
        height: "42px",
        background: "currentColor",
        transformOrigin: "50% 100%",
        transform: "translate(-50%, -100%) rotate(0deg)",
        borderRadius: "999px",
      }
    });

    this.secondHand = new Element("div", {
      css: {
        position: "absolute",
        left: "50%",
        top: "50%",
        width: "2px",
        height: "52px",
        background: "red",
        transformOrigin: "50% 100%",
        transform: "translate(-50%, -100%) rotate(0deg)",
        borderRadius: "999px",
      }
    });

    this.centerDot = new Element("div", {
      css: {
        position: "absolute",
        left: "50%",
        top: "50%",
        width: "10px",
        height: "10px",
        background: "currentColor",
        borderRadius: "50%",
        transform: "translate(-50%, -50%)",
      }
    });

    this.face.addChild(this.hourHand);
    this.face.addChild(this.minuteHand);
    this.face.addChild(this.secondHand);
    this.face.addChild(this.centerDot);

    this.addChild(this.face);

    this._timer = setInterval(() => {
      this.updateHands(new Date());
    }, 1000);

    this.updateHands(new Date());
  }

  updateHands(d) {
    const hours = d.getHours() % 12;
    const minutes = d.getMinutes();
    const seconds = d.getSeconds();

    const hourDeg = (hours * 30) + (minutes * 0.5);
    const minuteDeg = (minutes * 6) + (seconds * 0.1);
    const secondDeg = seconds * 6;

    this.hourHand.metadata.css.transform = `translate(-50%, -100%) rotate(${hourDeg}deg)`;
    this.minuteHand.metadata.css.transform = `translate(-50%, -100%) rotate(${minuteDeg}deg)`;
    this.secondHand.metadata.css.transform = `translate(-50%, -100%) rotate(${secondDeg}deg)`;

    if (this.hourHand.dom) this.hourHand.dom.style.transform = this.hourHand.metadata.css.transform;
    if (this.minuteHand.dom) this.minuteHand.dom.style.transform = this.minuteHand.metadata.css.transform;
    if (this.secondHand.dom) this.secondHand.dom.style.transform = this.secondHand.metadata.css.transform;
  }

  dispose() {
    if (this._timer) {
      clearInterval(this._timer);
      this._timer = null;
    }
  }
}

if(registration) SmallAnalogClock.register();

class NotFound404 extends Element {
  constructor(metadata = {}) {
    super("div", {
      css: {
        textAlign: "center",
        padding: "40px",
        ...(metadata.css || {})
      },
      props: {
        ...(metadata.props || {})
      },
      base: metadata.base || ''
    });

    console.log("${metadata}", metadata);

    this.addChild(
      new Element("h1", {
        css: { fontSize: "126px" },
        props: { textContent: "404" }
      })
    );
    
    this.addChild(
      new Element("h3", {
        props: { textContent: "Page Not Found" }
      })
    );

    this.addChild(
      new Element("p", {
        props: {
          textContent:
            "The page you’re looking for doesn’t exist or may have been moved."
        }
      })
    );
    console.log("${this.metadata.base}", this.metadata.base);
    this.addChild(
      new Element("a", {
        css: { marginTop: "20px", display: "inline-block" },
        props: {
          href: this.metadata.base + "/",
          textContent: "Return to Home"
        }
      })
    );
  }
}

if(registration) NotFound404.register();

class ListWithControls extends Element {
  constructor(metadata = {}) {
    super("div", {
      css: {
        ...(metadata.css || {})
      },
      props: {
        ...(metadata.props || {})
      }
    });

    // --- STATE ---
    this.items = metadata.initialItems || [];
    this.editingIndex = null;
    this.editValue = "";

    // --- UI STRUCTURE ---
    this.addButton = new Element("button", {
      props: {
        textContent: "➕ Add Item",
        onclick: () => this.addItem()
      }
    });

    this.list = new Element("ul", {
      css: {
        listStyle: "none",
        padding: "0",
        marginTop: "1rem"
      }
    });

    this.addChild(this.addButton);
    this.addChild(this.list);

    // initial population
    this.refreshList();
  }

  // --- ACTIONS ---
  addItem() {
    console.log("Add Item");
    const value = prompt("Enter new item:");
    if (!value) return;
    this.items.push(value);
    this.refreshList();
  }

  removeItem(index) {
    console.log("Remove Item");
    this.items.splice(index, 1);
    this.refreshList();
  }

  startEdit(index) {
    console.log("Start Edit");
    this.editingIndex = index;
    this.editValue = this.items[index];
    this.refreshList();
  }

  saveEdit() {
    console.log("Save Edit");
    this.items[this.editingIndex] = this.editValue;
    this.editingIndex = null;
    this.editValue = "";
    this.refreshList();
  }

  cancelEdit() {
    console.log("Cancel Edit");
    this.editingIndex = null;
    this.editValue = "";
    this.refreshList();
  }

  // --- DOM UPDATE ---
  refreshList() {
    this.list.children = []; // clear metadata children

    this.items.forEach((item, index) => {
      const li = new Element("li", {
        css: {
          padding: "0.5rem",
          borderBottom: "1px solid #eee"
        }
      });

      if (this.editingIndex === index) {
        // --- EDIT MODE ---
        const wrapper = new Element("div");

        const input = new Element("input", {
          props: {
            value: this.editValue,
            oninput: (event) => {
              this.editValue = event.target.value;
            }
          }
        });

        const saveBtn = new Element("button", {
          props: {
            textContent: "💾 Save",
            onclick: () => this.saveEdit()
          }
        });

        const cancelBtn = new Element("button", {
          props: {
            textContent: "❌ Cancel",
            onclick: () => this.cancelEdit()
          }
        });

        wrapper.addChild(input);
        wrapper.addChild(saveBtn);
        wrapper.addChild(cancelBtn);
        li.addChild(wrapper);

      } else {
        // --- NORMAL MODE ---
        const row = new Element("div", {
          css: {
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center"
          }
        });

        const label = new Element("span", {
          props: { textContent: item }
        });

        const controls = new Element("div", {
          css: { display: "flex", gap: "0.5rem" }
        });

        const editBtn = new Element("button", {
          props: {
            textContent: "✏️ Edit",
            onclick: () => this.startEdit(index)
          }
        });

        const removeBtn = new Element("button", {
          props: {
            textContent: "🗑️ Remove",
            onclick: () => this.removeItem(index)
          }
        });

        controls.addChild(editBtn);
        controls.addChild(removeBtn);

        row.addChild(label);
        row.addChild(controls);

        li.addChild(row);
      }

      this.list.addChild(li);
    });

    // If already mounted, update DOM
    this.list.refresh();
  }
}

if(registration) ListWithControls.register();

class Modal extends Element {
  constructor(metadata = {}) {
    super("div", {
      css: {
        position: "fixed",
        top: "0",
        left: "0",
        right: "0",
        bottom: "0",
        background: "rgba(0,0,0,0.5)",
        display: metadata.visible ? "flex" : "none",
        alignItems: "center",
        justifyContent: "center",
        zIndex: "1000",
        ...(metadata.css || {})
      },
      props: {
        ...(metadata.props || {})
      }
    });

    this.metadata.visible = metadata.visible ?? false;
    this.onClose = metadata.onClose || (() => {});

    // --- CONTENT WRAPPER ---
    this.content = new Element("div", {
      css: {
        background: "#333",
        padding: "2rem",
        borderRadius: "8px",
        minWidth: "300px",
        maxWidth: "600px"
      }
    });

    // --- CLOSE BUTTON ---
    this.closeButton = new Element("button", {
      css: {
        float: "right",
        fontSize: "1.2rem",
        cursor: "pointer",
        background: '#555',
      },
      props: {
        textContent: "×",
        onclick: () => this.close()
      }
    });

    this.content.addChild(this.closeButton);

    // --- USER CONTENT ---
    if (metadata.children) {
      for (const child of metadata.children) {
        this.content.addChild(child);
      }
    }

    this.addChild(this.content);
  }

  // --- PUBLIC API ---
  open() {
    this.setVisibility(true);
  }

  close() {
    this.setVisibility(false);
    this.onClose();
  }

  setVisibility(flag) {
    this.metadata.visible = flag;

    // If DOM exists, update display immediately
    if (this.dom) {
      this.dom.style.display = flag ? "flex" : "none";
    }
  }

  updateVisibility() {
    if (this.dom) {
      this.dom.style.display = this.metadata.visible ? "flex" : "none";
    }
  }
  /*
  render() {
    super.render();
    this.updateVisibility();
  }
  */
}

if(registration) Modal.register();

class ModalDemo extends Element {
  constructor(metadata = {}) {
    super("div", {
      css: {
        ...(metadata.css || {})
      },
      props: {
        ...(metadata.props || {})
      }
    });

    // --- STATE ---
    this.open = false;

    // --- UI STRUCTURE ---
    this.openButton = new Element("button", {
      props: {
        textContent: "Open Modal",
        onclick: () => this.showModal()
      }
    });

    this.modal = new Modal({
      visible: this.open,
      onClose: () => this.hideModal()
    });

    // Modal content
    this.modal.content.addChild(
      new Element("h2", { props: { textContent: "Modal Title" } })
    );

    this.modal.content.addChild(
      new Element("p", { props: { textContent: "This is modal content." } })
    );

    // Add to tree
    this.addChild(this.openButton);
    this.addChild(this.modal);
  }

  // --- ACTIONS ---
  showModal() {
    this.open = true;
    this.modal.metadata.visible = true;

    if (this.modal.dom) {
      this.modal.updateVisibility();
    }
  }

  hideModal() {
    this.open = false;
    this.modal.metadata.visible = false;

    if (this.modal.dom) {
      this.modal.updateVisibility();
    }
  }
}

if(registration) ModalDemo.register();

function ModalDemo2(metadata = {}) {
    // --- STATE ---
    this.open = false;

    // --- ACTIONS ---
    function showModal() {
      this.open = true;
      this.modal.metadata.visible = true;

      if (this.modal.dom) {
        this.modal.updateVisibility();
      }
    }

    function hideModal() {
      this.open = false;
      this.modal.metadata.visible = false;

      if (this.modal.dom) {
        this.modal.updateVisibility();
      }
    }

    return [
      new Element("button", {
        props: {
          textContent: "Open Modal",
          onclick: () => this.showModal()
        }
      }),
      new Modal({
        visible: this.open,
        onClose: () => this.hideModal()
      },
        new Element("h2", { props: { textContent: "Modal Title" } }),
        new Element("p", { props: { textContent: "This is modal content." } })
      ),
    ];
}

//if(registration) ModalDemo2.register();

class JSONViewer extends Component {
  constructor(/*json, */metadata = {}) {
    super("div",
      {
        props: { className: "json-viewer" },
        css: {
          fontFamily: "monospace",
          fontSize: "0.9rem",
          lineHeight: "1.4",
          padding: "1em",
          border: "1px solid #444",
          borderRadius: "6px",
          background: "#111",
          color: "#eee"
        }
      },
      metadata
    );
    
    this.json = null;

    //if (json) this.renderJSON(json);
    JSONViewer.injectCSS();
  }
  
  onResize() {
    console.log("resized:", this.dom.offsetWidth, this.dom.offsetHeight, this);
    if (this.json) {
      this.renderJSON(this.json);
    }      
  }

  renderJSON(json) {
    while (this.dom.firstChild) { this.dom.removeChild(this.dom.firstChild); }
    this.json = json;
    //this.dom.appendChild(this.buildNode(this.json));
    this.buildNode(this.json);
  }

  buildNode(value, key = null, depth = 0) {
    const container = document.createElement("div");
    container.style.marginLeft = depth * 12 + "px";
    this.dom.appendChild(container);

    // Primitive values
    if (typeof value !== "object" || value === null) {
      container.textContent = key !== null
        ? `${key}: ${JSON.stringify(value)}`
        : JSON.stringify(value);
      return container;
    }

    // Collapsible object/array
    const isArray = Array.isArray(value);
    const summary = document.createElement("div");
    summary.style.cursor = "pointer";
    summary.style.userSelect = "none";
    summary.style.color = "#9cf";

    const children = document.createElement("div");
    children.style.display = "none";
    children.style.marginTop = "4px";

    summary.addEventListener("click", () => {
      children.style.display = children.style.display === "none" ? "block" : "none";
    });
    container.appendChild(summary);

    // Build children
    if (isArray) {
      value.forEach((item, index) => {
        children.appendChild(this.buildNode(item, index, depth + 1));
      });
    } else {
      Object.entries(value).forEach(([k, v]) => {
        children.appendChild(this.buildNode(v, k, depth + 1));
      });
    }
    
    function formatPairs(value, maxPairs, maxLength) {
      const s = Object.entries(value)
        .slice(0, maxPairs)
        .map(([k, v]) => `${k}: ${v}`)
        .join(", ");

      if (s.length <= maxLength) return `{${s}}`;

      return `{${s.slice(0, Math.max(0, maxLength - 3))}...}`;
    }
    
    const label = key !== null ? key : "(root)";
    const type = isArray ? "[" + value.length + "]" : "{" + formatPairs(value, value.length, summary.offsetWidth/20.5) + "}"; // not good at math - best responsive behavior
    
    summary.textContent = `${label} ${type}`;

    container.appendChild(children);
    return container;
  }

  static injectCSS() {
    if (JSONViewer._cssInjected) return;
    JSONViewer._cssInjected = true;

    const style = document.createElement("style");
    style.textContent = `
      .json-viewer div {
        transition: all 0.15s ease;
      }
      .json-viewer div:hover {
        color: #cff;
      }
    `;
    document.head.appendChild(style);
  }
}

if(registration) JSONViewer.register();

class JSONLViewer extends Component {
  constructor(/*source, */metadata = {}) {
    super("div",
      {
        props: { className: "jsonl-viewer" },
        css: {
          fontFamily: "monospace",
          fontSize: "0.9rem",
          lineHeight: "1.4",
          padding: "1em",
          border: "1px solid #444",
          borderRadius: "6px",
          background: "#111",
          color: "#eee",
          overflowY: "auto",
          maxHeight: "600px"
        }
      },
      metadata
    );

    // Accept JSONL string, array of lines, or DOM element
    //if (source) this.loadSource(source);
    JSONLViewer.injectCSS();
  }

  loadSource(source) {
    let jsonlText = "";

    if (typeof source === "string") {
      jsonlText = source;
    } else if (Array.isArray(source)) {
      jsonlText = source.join("\n");
    } else if (source instanceof HTMLElement) {
      jsonlText = source.textContent || "";
    } else {
      jsonlText = "";
    }

    const lines = jsonlText.split(/\r?\n/).filter(Boolean);

    this.renderLines(lines);
  }

  renderLines(lines) {
    this.dom.innerHTML = ""; // deterministic rerender

    lines.forEach((line, index) => {
      let parsed;

      try {
        parsed = JSON.parse(line);
      } catch (err) {
        parsed = { error: "Invalid JSON", raw: line };
      }

      const entry = this.buildEntry(parsed, index);
      this.dom.appendChild(entry);
    });
  }

  buildEntry(value, index) {
    const container = document.createElement("div");
    container.style.marginBottom = "0.5em";

    const header = document.createElement("div");
    header.style.cursor = "pointer";
    header.style.userSelect = "none";
    header.style.color = "#9cf";
    header.textContent = `Line ${index + 1}`;
    container.appendChild(header);

    const body = document.createElement("div");
    body.style.display = "none";
    body.style.marginLeft = "12px";
    body.appendChild(this.buildNode(value, null, 1));
    container.appendChild(body);

    header.addEventListener("click", () => {
      body.style.display = body.style.display === "none" ? "block" : "none";
    });

    return container;
  }

  buildNode(value, key = null, depth = 0) {
    const container = document.createElement("div");
    container.style.marginLeft = depth * 12 + "px";

    if (typeof value !== "object" || value === null) {
      container.textContent = key !== null
        ? `${key}: ${JSON.stringify(value)}`
        : JSON.stringify(value);
      return container;
    }

    const isArray = Array.isArray(value);
    const summary = document.createElement("div");
    summary.style.cursor = "pointer";
    summary.style.userSelect = "none";
    summary.style.color = "#9cf";

    const label = key !== null ? key : "(object)";
    const type = isArray ? "[]" : "{}";

    summary.textContent = `${label} ${type}`;
    container.appendChild(summary);

    const children = document.createElement("div");
    children.style.display = "none";
    children.style.marginTop = "4px";

    summary.addEventListener("click", () => {
      children.style.display = children.style.display === "none" ? "block" : "none";
    });

    if (isArray) {
      value.forEach((item, index) => {
        children.appendChild(this.buildNode(item, index, depth + 1));
      });
    } else {
      Object.entries(value).forEach(([k, v]) => {
        children.appendChild(this.buildNode(v, k, depth + 1));
      });
    }

    container.appendChild(children);
    return container;
  }

  static injectCSS() {
    if (JSONLViewer._cssInjected) return;
    JSONLViewer._cssInjected = true;

    const style = document.createElement("style");
    style.textContent = `
      .jsonl-viewer div {
        transition: all 0.15s ease;
      }
      .jsonl-viewer div:hover {
        color: #cff;
      }
    `;
    document.head.appendChild(style);
  }
}

if(registration) JSONLViewer.register();

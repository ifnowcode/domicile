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

class ButtonCounter extends Element {
  static nextId = 0;
  constructor(metadata = {}) {
    super("button", metadata);
    //this.key = metadata.key || `counter-${ButtonCounter.nextId++}`;
    this.key = `counter-${ButtonCounter.nextId++}`;
    console.log("::: ButtonCounter construction");
    // local state stored in metadata
    this.metadata.count = sessionStorage.getItem(this.key) ?? this.metadata.count ?? 0;;

    // event handler
    this.metadata.props.onclick = () => {
      this.metadata.count++;
      this.updateLabel();
    };
  }

  updateLabel() {
    if (this._dom) {
      this._dom.textContent = `Clicked ${this.metadata.count} Times`;
      sessionStorage.setItem(this.key, this.metadata.count);
    }
  }

  render(container) {
    super.render(container);
    this.updateLabel();
  }
}

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

class ImageBox extends Element {
  static defaults = {
    css: {
      display: "inline-block",
    },
    props: {
      src: "",
      className: 'image-box',
    },
  };

  constructor(metadata={}) {
    super('img', metadata);
    console.log("::: ImageBox construction");
  }
}

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
      props: { src: imagepath + "granite-raw-block-250x250.jpg" }
    }));

    this.addChild(new ImageBox({
      props: { src: imagepath + "granite-raw-block-250x250.jpg" }
    }));
  }
}

class Table extends Box {
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
    super(Table.applyDefaults(metadata));
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
    this._dom = table;
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
    if (!this._dom) return;
    const parent = this._dom.parentNode;
    if (!parent) return;
    parent.removeChild(this._dom);
    this.render(parent);
  }
  
}

class Table2 extends Box {
  static defaults = {
    css: {},
    props: {},
    columns: [],
    rows: []
  };

  constructor(metadata = {}) {
    super(Table.applyDefaults(metadata));

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

    if (this.thead._dom) this.thead.renderChildren();
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

    if (this.tbody._dom) this.tbody.renderChildren();
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

class WideScreenSlideshow extends Element {
  constructor(metadata = {}, ...children) {
    super("div", {
      css: {
        position: "relative",
        width: "100%",
        height: "300px",
        overflow: "hidden",
        ...(metadata.css || {})
      },
      props: {
        className: "carousel",
        ...(metadata.props || {})
      },
      images: metadata.images || [],
      index: 0
    }, ...children);
    console.log("::: WideScreenSlideshow construction");
    // Build DOM children after root <div> exists
    const images = this.metadata.images;

    this.img = new Element("img", {
      css: {
        width: "100%",
        height: "100%",
        objectFit: "cover",
        display: "block"
      },
      props: {}
    });
    this.addChild(this.img);

    this.prevBtn = new Element("button", {
      css: {
        position: "absolute",
        top: "50%",
        left: "0",
        transform: "translateY(-50%)"
      },
      props: {
        textContent: "◀",
        onclick: () => this.prev()
      }
    });
    this.addChild(this.prevBtn);

    // NEXT BUTTON
    this.nextBtn = new Element("button", {
      css: {
        position: "absolute",
        top: "50%",
        right: "0",
        transform: "translateY(-50%)"
      },
      props: {
        textContent: "▶",
        onclick: () => this.next()
      }
    });
    this.addChild(this.nextBtn);
  }

  render(container) {
    super.render(container);
    this.updateImage();
  }

  updateImage() {
    const images = this.metadata.images;
    const index = this.metadata.index;
    console.log("${this.img}", this.img);
    if (this.img && this.img._dom) {
      this.img._dom.src = images[index];
    }
  }

  prev() {
    const images = this.metadata.images;
    console.log("Prev image", (this.metadata.index - 1 + images.length) % images.length);
    this.metadata.index = (this.metadata.index - 1 + images.length) % images.length;
    this.updateImage();
  }

  next() {
    const images = this.metadata.images;
    console.log("Next image", (this.metadata.index + 1) % images.length);
    this.metadata.index = (this.metadata.index + 1) % images.length;
    this.updateImage();
  }
}

function SlideshowDemo() {
  return new WideScreenSlideshow({
    images: [
      'sources/imagesex/Gallery/Flowers/external-content.duckduckgo.com.jpg',
      'sources/imagesex/Gallery/Flowers/220108_web.jpg',
      'sources/imagesex/Gallery/Flowers/FRjE9VYUUAAkpFd.jpg',
      'sources/imagesex/Gallery/Flowers/pexels-photo-1122626b.jpg',
      'sources/imagesex/Gallery/Flowers/pexels-photo-133472.jpg',
      'sources/imagesex/Gallery/Flowers/pexels-photo-3686216.jpg',
      'sources/imagesex/Gallery/Flowers/pexels-photo-369433.jpg',
      'sources/imagesex/Gallery/Flowers/pexels-photo-4041409.jpg',
      'sources/imagesex/Gallery/Flowers/_117100719_flower_bloom_02.jpg'
    ]
  })
}

class DigitalClock extends Element {
  constructor(metadata = {}) {
    super("div", {
      css: { display: 'inherit'},
      ...metadata
    });

    console.log("::: DigitalClock construction");

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
      if (this.timeLabel._dom) {
        this.timeLabel._dom.textContent = text;
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

class NavBar extends Box {
  constructor(metadata = {}) {
    super({
      css: {
        display: "flex", 
        flexWrap: "wrap",
        alignItems: "center",
        padding: "10px",
        width: "100%",
        ...(metadata.css || {})
      },
      props: {
        ...(metadata.props || {className: `nav-bar`})
      }
    });
    console.trace("::: NavBar construction");
    this.container = new Element('div', {css: {
        display: "flex",
        flexWrap: "wrap",
        alignItems: "center",
        padding: "10px",
        width: "100%",
        ...(metadata.css || {})
    }});
    let color = getRandomColor();
    //#2C5C78 nice slate blue
    console.log("[color] RANDOM:", color);
    this.container.addChild(new Element('span', {
                        css: {
                          fontSize: '24px',
                          margin: '0 10px',
                        },
                        props: {
                          innerHTML: `<span style=\"color:${color};\"><b>DOM</b></span>icile`
                        }
                      }));

    this.container.addChild(new Element('a', {
      css: {marginRight: '10px'},
      props: {textContent: "Home", href: urel + "/"}
    }));

    this.container.addChild(new Element('a', {
      css: {marginRight: '10px'},
      props: {textContent: "Slides", href: urel + "/slides"}
    }));

    this.container.addChild(new Element('a', {
      css: {marginRight: '10px'},
      props: {textContent: "Carousel", href: urel + "/carousel"}
    }));

    this.container.addChild(new Element('a', {
      css: {marginRight: '10px'},
      props: {textContent: "Test", href: urel + "/test"}
    }));

    this.container.addChild(new Element('a', {
      css: {marginRight: '10px'},
      props: {textContent: "About", href: urel + "/about"}
    }));

    const clock = new DigitalClock({
      css: {
        marginLeft: "auto",
        padding: '0 30px',
        fontFamily: "monospace",
        fontSize: "24px"
      }
    });
    this.container.addChild(clock);

    this.addChild(this.container);
    this.addChild(new Element("hr", {
      css: {
        flexBasis: "100%",
        height: "1px" // optional
      }
    }));
  }
}

class NavBar2 extends Box {
  constructor(metadata = {}) {
    super({
      css: {
        display: "flex",
        flexWrap: "wrap",
        alignItems: "center",
        padding: "10px",
        width: "100%",
        ...(metadata.css || {})
      },
      props: {
        ...(metadata.props || { className: `nav-bar-2` })
      }
    });

    this.container = new Element("div", {
      css: {
        display: "flex",
        flexWrap: "wrap",
        alignItems: "center",
        width: "100%",
        gap: "10px",
        ...(metadata.css || {})
      }
    });

    const color = getRandomColor();

    this.container.addChild(
      new Element("span", {
        css: {
          fontSize: "24px",
          margin: "0 10px"
        },
        props: {
          innerHTML: `<span style="color:${color};"><b>DOM</b></span>icile`
        }
      })
    );

    const links = [
      ["Home", "/"],
      ["Slides", "/slides"],
      ["Carousel", "/carousel"],
      ["Test", "/test"],
      ["About", "/about"]
    ];

    for (const [label, path] of links) {
      this.container.addChild(
        new Element("a", {
          css: { marginRight: "10px" },
          props: { textContent: label, href: urel + path }
        })
      );
    }

    const clock = new DigitalClock({
      css: {
        marginLeft: "auto",
        minWidth: "0",
        padding: "0 30px",
        fontFamily: "monospace",
        fontSize: "24px"
      }
    });

    this.container.addChild(clock);

    this.addChild(this.container);

    this.addChild(
      new Element("hr", {
        css: {
          flexBasis: "100%",
          height: "1px"
        }
      })
    );
  }
}

class NavBar3 extends Box {
  static defaults = {
    css: {},
    props: {},
    logoText: "",
    logoImage: null,
    links: []
  };

  constructor(metadata = {}) {
    super(NavBar.applyDefaults(metadata));

    const { logoText, logoImage, links } = this.metadata;

    // --- FLEX CONTAINER ---
    this.container = new Element("div", {
      css: {
        display: "flex",
        flexWrap: "wrap",
        alignItems: "center",
        width: "100%",
        gap: "10px",
        padding: "10px"
      }
    });

    // --- LOGO AREA ---
    const logoWrapper = new Element("div", {
      css: {
        display: "flex",
        alignItems: "center",
        gap: "10px",
        fontSize: "24px",
        margin: "0 10px"
      }
    });

    if (logoImage) {
      logoWrapper.addChild(
        new Element("img", {
          css: {
            height: "32px",
            width: "32px",
            objectFit: "contain"
          },
          props: { src: logoImage, alt: logoText || "Logo" }
        })
      );
    }
    
    const color = getRandomColor();

    if (logoText) {
      logoWrapper.addChild(
        new Element("span", {
          css: {
          fontSize: "24px",
          margin: "0 10px"
        },
        props: {
          innerHTML: `<span style="color:${color};"><b>DOM</b></span>icile`
        }
        })
      );
    }

    this.container.addChild(logoWrapper);

    // --- LINKS ---
    for (const link of links) {
      this.container.addChild(
        new Element("a", {
          css: { marginRight: "10px" },
          props: {
            textContent: link.label,
            href: link.href
          }
        })
      );
    }

    // --- CLOCK ---
    const clock = new DigitalClock({
      css: {
        marginLeft: "auto",
        minWidth: "0",
        padding: "0 30px",
        fontFamily: "monospace",
        fontSize: "24px"
      }
    });

    this.container.addChild(clock);

    // Add container + divider
    this.addChild(this.container);

    this.addChild(
      new Element("hr", {
        css: {
          flexBasis: "100%",
          height: "1px"
        }
      })
    );
  }

  static applyDefaults(metadata) {
    return {
      css: { ...this.defaults.css, ...(metadata.css || {}) },
      props: { ...this.defaults.props, ...({id: 'nav-bar', className: 'nav-bar-3'}) },
      logoText: metadata.logoText ?? this.defaults.logoText,
      logoImage: metadata.logoImage ?? this.defaults.logoImage,
      links: metadata.links ?? this.defaults.links
    };
  }
}

class Footer extends Box {
  constructor(metadata = {}) {
    super({
      css: {
        width: "100%",
        padding: "20px 0",
        marginTop: "40px",
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
    let companyname = 'LegacyTech';
    this.addChild(
      new Element("div", {
        props: {
          textContent: `© ${new Date().getFullYear()} Peter J. Anderson. All rights reserved.`
        }
      })
    );
  }
}

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
        props: { textContent: "404 — Page Not Found" }
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
    if (this._dom) {
      this._dom.style.display = flag ? "flex" : "none";
    }
  }
  
  updateVisibility() {
    if (this._dom) {
      this._dom.style.display = this.metadata.visible ? "flex" : "none";
    }
  }
  /*
  render() {
    super.render();
    this.updateVisibility();
  }
  */
}

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

    if (this.modal._dom) {
      this.modal.updateVisibility();
    }
  }

  hideModal() {
    this.open = false;
    this.modal.metadata.visible = false;

    if (this.modal._dom) {
      this.modal.updateVisibility();
    }
  }
}

function ModalDemo2(metadata = {}) {
    // --- STATE ---
    this.open = false;
    
    // --- ACTIONS ---
    function showModal() {
      this.open = true;
      this.modal.metadata.visible = true;

      if (this.modal._dom) {
        this.modal.updateVisibility();
      }
    }

    function hideModal() {
      this.open = false;
      this.modal.metadata.visible = false;

      if (this.modal._dom) {
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

class GridLayout extends Element {
  constructor(metadata={}, ...children) {
    super('div', metadata, ...children);
  }
  static defaults = {
    css: {
      padding: '10px',
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))',
      gap: '1rem',
    },
    props: { className: 'box'},
  };
}

function GridLayoutDemo() {
  return new GridLayout({}, 
    new Element('div', { css: { background: getRandomColor(), padding: '1rem'}, props: { textContent: 'Item 1'}}),
    new Element('div', { css: { background: getRandomColor(), padding: '1rem'}, props: { textContent: 'Item 2'}}),
    new Element('div', { css: { background: getRandomColor(), padding: '1rem'}, props: { textContent: 'Item 3'}}),
    new Element('div', { css: { background: getRandomColor(), padding: '1rem'}, props: { textContent: 'Item 4'}}),
    new Element('div', { css: { background: getRandomColor(), padding: '1rem'}, props: { textContent: 'Item 5'}}),
    new Element('div', { css: { background: getRandomColor(), padding: '1rem'}, props: { textContent: 'Item 6'}}),
  );
}

class TabbedWidget extends Box {
  static defaults = {
    css: {},
    props: {},
    tabs: [] // [{ label: "Tab 1", content: Element }]
  };

  constructor(metadata = {}) {
    super(TabbedWidget.applyDefaults(metadata));

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
    if (this.tabBar._dom) this.tabBar.refresh();
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

    if (this.contentArea._dom) this.contentArea.refresh();
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
          placeholder: "First name"
        },
        css: {
          padding: "8px",
          border: "1px solid #ccc",
          borderRadius: "4px"
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
          placeholder: "Last name"
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
          borderRadius: "4px"
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

/////////////////////////////////////////////////////////////////////
//
// Registry
//
/////////////////////////////////////////////////////////////////////
const widgetRegistry = {
  Element,
  Box,
  Button,
  ImageBox,
  DemoWidget,
  NavBar,
  Table,
};
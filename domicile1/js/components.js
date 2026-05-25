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

class Typewriter extends Element {
  constructor(metadata={props: {className: "typewriter"}}) {
    super('div', metadata);
    console.log("::: Typewriter construction");
    this.i = 0;
    this.txt = 'Lorem ipsum dummy text blabla.';
    this.speed = 50;
    
    this.writer = new Element('p');
    this.addChild(this.writer);
  }
  
  write() {
    if (this.i < this.txt.length) {
      this.writer.dom.innerHTML += this.txt.charAt(this.i);
      this.i++;
      setTimeout(this.write.bind(this), this.speed);
    }
  }

  onMount() {
    this.write();
  }
}

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

class Link extends Element {
  constructor({ css = {}, props = {} } = {}) {
    // Expect props.href and props.textContent at minimum
    const { base, href, textContent } = props;

    super("a", {
      props: {
        href,
        textContent,
        onclick: (e) => {
          // Allow normal browser behavior for:
          // - middle click
          // - right click
          // - ctrl/cmd click (open in new tab)
          if (
            e.metaKey ||
            e.ctrlKey ||
            e.shiftKey ||
            e.altKey ||
            e.button !== 0
          ) {
            return;
          }

          e.preventDefault();
          this.navigate(href);
        }
      },
      css
    });
  }
  
  // Programmatic navigation
  navigate(path) {
    const full = this.metadata.base + path;
    window.history.pushState({}, "", full);
    window.dispatchEvent(new PopStateEvent("popstate"));
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
      props: { src: imagerelurl + "granite-raw-block-250x250.jpg" }
    }));

    this.addChild(new ImageBox({
      props: { src: imagerelurl + "granite-raw-block-250x250.jpg" }
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
        transform: "translateY(-50%)",
        background: "black",
        color: "white",
        border: "none",
        padding: "12px",
        cursor: "pointer",
        opacity: "0.7"
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
        transform: "translateY(-50%)",
        background: "black",
        color: "white",
        border: "none",
        padding: "12px",
        cursor: "pointer",
        opacity: "0.7"
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
    if (this.img && this.img.dom) {
      this.img.dom.src = images[index];
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

class ManualSlideshow extends Element {
  constructor(metadata = {}) {
    super("div", {
      css: {
        width: "100%",
        maxWidth: "800px",
        margin: "0 auto",
        position: "relative",
        fontFamily: "sans-serif"
      },
      images: metadata.images || [],
      ...metadata
    });

    const images = this.metadata.images;
    this.slideIndex = 0;

    // --- Build static DOMicile structure (no DOM access) ---

    this.title = new Element("h2", {
      props: { textContent: "Manual Slideshow" },
      css: {
        textAlign: "center",
        marginBottom: "16px"
      }
    });

    this.container = new Element("div", {
      css: {
        position: "relative",
        width: "100%"
      }
    });

    // Image elements (hidden until onMount)
    this.slideElements = images.map(src => {
      const img = new Element("img", {
        props: { src },
        css: {
          width: "100%",
          display: "none"
        }
      });
      this.container.addChild(img);
      return img;
    });

    // Left button
    this.leftBtn = new Element("button", {
      props: { textContent: "❮" },
      css: {
        position: "absolute",
        top: "50%",
        left: "0",
        transform: "translateY(-50%)",
        background: "black",
        color: "white",
        border: "none",
        padding: "12px",
        cursor: "pointer",
        opacity: "0.7"
      }
    });

    // Right button
    this.rightBtn = new Element("button", {
      props: { textContent: "❯" },
      css: {
        position: "absolute",
        top: "50%",
        right: "0",
        transform: "translateY(-50%)",
        background: "black",
        color: "white",
        border: "none",
        padding: "12px",
        cursor: "pointer",
        opacity: "0.7"
      }
    });

    this.container.addChild(this.leftBtn);
    this.container.addChild(this.rightBtn);

    this.addChild(this.title);
    this.addChild(this.container);

    // Event handler references for cleanup
    this._leftHandler = null;
    this._rightHandler = null;
  }

  onMount() {
    // Convert DOMicile Elements → real DOM references
    this.domSlides = this.slideElements.map(el => el.dom);

    // Show first slide
    this.showSlide(0);

    // Attach event listeners
    this._leftHandler = () => this.plusSlides(-1);
    this._rightHandler = () => this.plusSlides(1);

    this.leftBtn.dom.addEventListener("click", this._leftHandler);
    this.rightBtn.dom.addEventListener("click", this._rightHandler);
  }

  onUnmount() {
    // Clean up listeners
    this.leftBtn.dom.removeEventListener("click", this._leftHandler);
    this.rightBtn.dom.removeEventListener("click", this._rightHandler);
  }

  plusSlides(n) {
    this.showSlide(this.slideIndex + n);
  }

  showSlide(n) {
    const total = this.domSlides.length;

    // Wrap around
    if (n >= total) n = 0;
    if (n < 0) n = total - 1;

    this.slideIndex = n;

    // Hide all
    this.domSlides.forEach(img => {
      img.style.display = "none";
    });

    // Show current
    this.domSlides[this.slideIndex].style.display = "block";
  }
}

class AdvancedSlideshow extends Element {
  constructor(metadata = {}) {
    super("div", {
      css: {
        maxWidth: "1000px",
        margin: "0 auto",
        position: "relative",
        fontFamily: "Verdana, sans-serif"
      },
      images: metadata.images || [],
      ...metadata
    });

    const slides = this.metadata.images;
    this.slideIndex = 0;

    // --- Build static DOMicile structure (no DOM access) ---

    this.container = new Element("div", {
      css: {
        position: "relative",
        width: "100%"
      }
    });

    this.slideElements = slides.map((slide, i) => {
      const wrapper = new Element("div", {
        css: {
          display: "none",
          position: "relative",
          animationName: "fade",
          animationDuration: "1.5s"
        }
      });

      const numberText = new Element("div", {
        props: { textContent: `${i + 1} / ${slides.length}` },
        css: {
          color: "#f2f2f2",
          fontSize: "12px",
          padding: "8px 12px",
          position: "absolute",
          top: "0"
        }
      });

      const img = new Element("img", {
        props: { src: slide.src },
        css: {
          width: "100%",
          verticalAlign: "middle"
        }
      });

      const caption = new Element("div", {
        props: { textContent: slide.caption },
        css: {
          color: "#f2f2f2",
          fontSize: "15px",
          padding: "8px 12px",
          position: "absolute",
          bottom: "8px",
          width: "100%",
          textAlign: "center"
        }
      });

      wrapper.addChild(numberText);
      wrapper.addChild(img);
      wrapper.addChild(caption);

      this.container.addChild(wrapper);
      return wrapper;
    });

    // Prev button
    this.prevBtn = new Element("a", {
      props: { textContent: "❮" },
      css: {
        cursor: "pointer",
        position: "absolute",
        top: "50%",
        padding: "16px",
        marginTop: "-22px",
        color: "white",
        fontWeight: "bold",
        fontSize: "18px",
        transition: "0.6s ease",
        borderRadius: "0 3px 3px 0",
        userSelect: "none",
        left: "0"
      }
    });

    // Next button
    this.nextBtn = new Element("a", {
      props: { textContent: "❯" },
      css: {
        cursor: "pointer",
        position: "absolute",
        top: "50%",
        padding: "16px",
        marginTop: "-22px",
        color: "white",
        fontWeight: "bold",
        fontSize: "18px",
        transition: "0.6s ease",
        borderRadius: "3px 0 0 3px",
        userSelect: "none",
        right: "0"
      }
    });

    this.container.addChild(this.prevBtn);
    this.container.addChild(this.nextBtn);

    // Dot indicators
    this.dotsWrapper = new Element("div", {
      css: {
        textAlign: "center",
        marginTop: "12px"
      }
    });

    this.dotElements = slides.map((_, i) => {
      const dot = new Element("span", {
        css: {
          cursor: "pointer",
          height: "15px",
          width: "15px",
          margin: "0 2px",
          backgroundColor: "#bbb",
          borderRadius: "50%",
          display: "inline-block",
          transition: "background-color 0.6s ease"
        }
      });
      this.dotsWrapper.addChild(dot);
      return dot;
    });

    this.addChild(this.container);
    this.addChild(this.dotsWrapper);

    // Event handler references
    this._prevHandler = null;
    this._nextHandler = null;
    this._dotHandlers = [];
  }

  onMount() {
    this.domSlides = this.slideElements.map(el => el.dom);
    this.domDots = this.dotElements.map(el => el.dom);

    this.showSlide(0);

    // Attach prev/next handlers
    this._prevHandler = () => this.plusSlides(-1);
    this._nextHandler = () => this.plusSlides(1);

    this.prevBtn.dom.addEventListener("click", this._prevHandler);
    this.nextBtn.dom.addEventListener("click", this._nextHandler);

    // Attach dot handlers
    this.domDots.forEach((dot, i) => {
      const handler = () => this.currentSlide(i);
      dot.addEventListener("click", handler);
      this._dotHandlers.push(handler);
    });

    // Inject fade keyframes (DOMicile-safe)
    this.injectFadeAnimation();
  }

  onUnmount() {
    this.prevBtn.dom.removeEventListener("click", this._prevHandler);
    this.nextBtn.dom.removeEventListener("click", this._nextHandler);

    this.domDots.forEach((dot, i) => {
      dot.removeEventListener("click", this._dotHandlers[i]);
    });
  }

  plusSlides(n) {
    this.showSlide(this.slideIndex + n);
  }

  currentSlide(n) {
    this.showSlide(n);
  }

  showSlide(n) {
    const total = this.domSlides.length;

    if (n >= total) n = 0;
    if (n < 0) n = total - 1;

    this.slideIndex = n;

    // Hide all slides
    this.domSlides.forEach(slide => {
      slide.style.display = "none";
    });

    // Remove active from all dots
    this.domDots.forEach(dot => {
      dot.style.backgroundColor = "#bbb";
    });

    // Show current slide
    this.domSlides[n].style.display = "block";

    // Activate dot
    this.domDots[n].style.backgroundColor = "#717171";
  }

  injectFadeAnimation() {
    const style = document.createElement("style");
    style.textContent = `
      @keyframes fade {
        from { opacity: .4 }
        to { opacity: 1 }
      }
    `;
    document.head.appendChild(style);
  }
}

class ThumbnailSlideshow extends Element {
  constructor(metadata = {}) {
    super("div", {
      css: {
        fontFamily: "Arial",
        margin: "0",
        boxSizing: "border-box"
      },
      images: metadata.images || [],
      ...metadata
    });

    // Auto-generate thumbnails by filename convention
    // Example: img_woods_wide.jpg → img_woods.jpg
    this.slidesData = this.metadata.images.map(src => {
      const thumb = this.deriveThumbnail(src);
      const caption = this.deriveCaption(src);
      return { src, thumb, caption };
    });

    this.slideIndex = 0;

    // --- Build static DOMicile structure (no DOM access) ---

    this.title = new Element("h2", {
      props: { textContent: "Slideshow Gallery" },
      css: { textAlign: "center" }
    });

    this.container = new Element("div", {
      css: { position: "relative" }
    });

    // Main slides
    this.slideElements = this.slidesData.map((slide, i) => {
      const wrapper = new Element("div", {
        css: { display: "none", position: "relative" }
      });

      const numberText = new Element("div", {
        props: { textContent: `${i + 1} / ${this.slidesData.length}` },
        css: {
          color: "#f2f2f2",
          fontSize: "12px",
          padding: "8px 12px",
          position: "absolute",
          top: "0"
        }
      });

      const img = new Element("img", {
        props: { src: slide.src },
        css: {
          width: "100%",
          verticalAlign: "middle"
        }
      });

      wrapper.addChild(numberText);
      wrapper.addChild(img);

      this.container.addChild(wrapper);
      return wrapper;
    });

    // Prev button
    this.prevBtn = new Element("a", {
      props: { textContent: "❮" },
      css: {
        cursor: "pointer",
        position: "absolute",
        top: "40%",
        padding: "16px",
        marginTop: "-50px",
        color: "white",
        fontWeight: "bold",
        fontSize: "20px",
        borderRadius: "0 3px 3px 0",
        userSelect: "none",
        left: "0"
      }
    });

    // Next button
    this.nextBtn = new Element("a", {
      props: { textContent: "❯" },
      css: {
        cursor: "pointer",
        position: "absolute",
        top: "40%",
        padding: "16px",
        marginTop: "-50px",
        color: "white",
        fontWeight: "bold",
        fontSize: "20px",
        borderRadius: "3px 0 0 3px",
        userSelect: "none",
        right: "0"
      }
    });

    this.container.addChild(this.prevBtn);
    this.container.addChild(this.nextBtn);

    // Caption container
    this.captionContainer = new Element("div", {
      css: {
        textAlign: "center",
        backgroundColor: "#222",
        padding: "2px 16px",
        color: "white"
      }
    });

    this.captionText = new Element("p", {
      props: { textContent: "" }
    });

    this.captionContainer.addChild(this.captionText);

    // Thumbnail row
    this.row = new Element("div", {
      css: {
        display: "flex",
        flexWrap: "wrap",
        marginTop: "8px"
      }
    });

    this.thumbElements = this.slidesData.map((slide, i) => {
      const col = new Element("div", {
        css: {
          width: "16.66%",
          padding: "2px"
        }
      });

      const img = new Element("img", {
        props: { src: slide.thumb, alt: slide.caption },
        css: {
          width: "100%",
          opacity: "0.6",
          cursor: "pointer"
        }
      });

      col.addChild(img);
      this.row.addChild(col);

      return img;
    });

    this.addChild(this.title);
    this.addChild(this.container);
    this.addChild(this.captionContainer);
    this.addChild(this.row);

    // Event handler references
    this._prevHandler = null;
    this._nextHandler = null;
    this._thumbHandlers = [];
  }

  // --- Thumbnail derivation logic ---
  deriveThumbnail(src) {
    // Replace "_wide" with "" or fallback to same file
    return src.replace("_wide", "");
  }

  deriveCaption(src) {
    // Convert filename into readable caption
    return src
      .replace(/^.*[\\/]/, "")      // remove path
      .replace(/\.[^.]+$/, "")      // remove extension
      .replace(/_/g, " ")           // underscores → spaces
      .replace(/\b\w/g, c => c.toUpperCase()); // capitalize
  }

  // --- Lifecycle ---

  onMount() {
    this.domSlides = this.slideElements.map(el => el.dom);
    this.domThumbs = this.thumbElements.map(el => el.dom);
    this.domCaption = this.captionText.dom;

    this.showSlide(0);

    // Prev/next handlers
    this._prevHandler = () => this.plusSlides(-1);
    this._nextHandler = () => this.plusSlides(1);

    this.prevBtn.dom.addEventListener("click", this._prevHandler);
    this.nextBtn.dom.addEventListener("click", this._nextHandler);

    // Thumbnail handlers
    this.domThumbs.forEach((thumb, i) => {
      const handler = () => this.currentSlide(i);
      thumb.addEventListener("click", handler);
      this._thumbHandlers.push(handler);
    });
  }

  onUnmount() {
    this.prevBtn.dom.removeEventListener("click", this._prevHandler);
    this.nextBtn.dom.removeEventListener("click", this._nextHandler);

    this.domThumbs.forEach((thumb, i) => {
      thumb.removeEventListener("click", this._thumbHandlers[i]);
    });
  }

  // --- Slideshow logic ---

  plusSlides(n) {
    this.showSlide(this.slideIndex + n);
  }

  currentSlide(n) {
    this.showSlide(n);
  }

  showSlide(n) {
    const total = this.domSlides.length;

    if (n >= total) n = 0;
    if (n < 0) n = total - 1;

    this.slideIndex = n;

    // Hide all slides
    this.domSlides.forEach(slide => {
      slide.style.display = "none";
    });

    // Reset all thumbnails
    this.domThumbs.forEach(thumb => {
      thumb.style.opacity = "0.6";
    });

    // Show current slide
    this.domSlides[n].style.display = "block";

    // Highlight active thumbnail
    this.domThumbs[n].style.opacity = "1";

    // Update caption
    this.domCaption.textContent = this.domThumbs[n].alt;
  }
}

class ResponsiveImageGrid extends Element {
  constructor(columns = [], metadata = {}) {
    super("div", {
      css: {
        margin: "0",
        fontFamily: "Arial",
        boxSizing: "border-box"
      },
      ...metadata
    });

    // --- Header ---
    this.header = new Element("div", {
      css: {
        textAlign: "center",
        padding: "32px"
      }
    });

    this.header.addChild(
      new Element("h1", { props: { textContent: "Responsive Image Grid" } })
    );

    this.header.addChild(
      new Element("p", {
        props: { textContent: "Resize the browser window to see the responsive effect." }
      })
    );

    // --- Row container ---
    this.row = new Element("div", {
      css: {
        display: "flex",
        flexWrap: "wrap",
        padding: "0 4px",
        boxSizing: "border-box"
      }
    });

    // --- Columns + images ---
    this.columnElements = columns.map(colImages => {
      const col = new Element("div", {
        css: {
          flex: "25%",
          maxWidth: "25%",
          padding: "0 4px",
          boxSizing: "border-box"
        }
      });

      colImages.forEach(src => {
        col.addChild(
          new Element("img", {
            props: { src },
            css: {
              width: "100%",
              marginTop: "8px",
              verticalAlign: "middle"
            }
          })
        );
      });

      this.row.addChild(col);
      return col;
    });

    this.addChild(this.header);
    this.addChild(this.row);
  }

  onMount() {
    // Inject responsive CSS (media queries)
    const style = document.createElement("style");
    style.textContent = `
      @media screen and (max-width: 800px) {
        .domicile-responsive-column {
          flex: 50% !important;
          max-width: 50% !important;
        }
      }

      @media screen and (max-width: 600px) {
        .domicile-responsive-column {
          flex: 100% !important;
          max-width: 100% !important;
        }
      }
    `;
    document.head.appendChild(style);

    // Apply class to each column for media queries
    this.columnElements.forEach(col => {
      col.dom.classList.add("domicile-responsive-column");
    });
  }
}

class MasonryImageGrid extends Element {
  constructor(metadata = {}) {
    super("div", {
      css: {
        margin: "0",
        fontFamily: "Arial",
        boxSizing: "border-box",
        padding: "16px"
      },
      images: metadata.images || [],
      ...metadata
    });

    const images = this.metadata.images;

    // Header
    this.header = new Element("div", {
      css: {
        textAlign: "center",
        padding: "16px"
      }
    });

    this.header.addChild(
      new Element("h1", { props: { textContent: "Masonry Image Grid" } })
    );

    this.header.addChild(
      new Element("p", {
        props: { textContent: "Resize the browser window to see the masonry effect." }
      })
    );

    // Masonry container
    this.masonry = new Element("div", {
      css: {
        columnCount: "4",
        columnGap: "16px"
      }
    });

    // Add images (DOMicile nodes created before render)
    images.forEach(src => {
      this.masonry.addChild(
        new Element("img", {
          props: { src },
          css: {
            width: "100%",
            marginBottom: "16px",
            breakInside: "avoid",
            WebkitColumnBreakInside: "avoid",
            MozColumnBreakInside: "avoid"
          }
        })
      );
    });

    this.addChild(this.header);
    this.addChild(this.masonry);
  }

  onMount() {
    // Inject responsive CSS for column counts
    const style = document.createElement("style");
    style.textContent = `
      @media screen and (max-width: 1200px) {
        .domicile-masonry {
          column-count: 3 !important;
        }
      }

      @media screen and (max-width: 800px) {
        .domicile-masonry {
          column-count: 2 !important;
        }
      }

      @media screen and (max-width: 500px) {
        .domicile-masonry {
          column-count: 1 !important;
        }
      }
    `;
    document.head.appendChild(style);

    // Add class for media queries
    this.masonry.dom.classList.add("domicile-masonry");
  }
}

class LightboxViewer extends Element {
  constructor(metadata = {}) {
    super("div", {
      css: {
        fontFamily: "Arial",
        boxSizing: "border-box",
        padding: "16px"
      },
      images: metadata.images || [],
      ...metadata
    });

    const images = this.metadata.images;
    this.index = 0;

    // --- Thumbnail Grid (DOMicile nodes created BEFORE render) ---
    this.thumbGrid = new Element("div", {
      css: {
        display: "flex",
        flexWrap: "wrap",
        gap: "8px"
      }
    });
    
    this.addChild(
      new Element("h1", { props: { textContent: "Lightbox Viewer" } })
    );

    this.thumbnailElements = images.map((src, i) => {
      const thumb = new Element("img", {
        props: { src },
        css: {
          width: "150px",
          height: "auto",
          cursor: "pointer",
          borderRadius: "4px",
          boxShadow: "0 2px 6px rgba(0,0,0,0.2)"
        }
      });

      this.thumbGrid.addChild(thumb);
      return thumb;
    });

    // --- Lightbox Overlay (hidden until opened) ---
    this.overlay = new Element("div", {
      css: {
        display: "none",
        position: "fixed",
        top: "0",
        left: "0",
        width: "100vw",
        height: "100vh",
        backgroundColor: "rgba(0,0,0,0.9)",
        justifyContent: "center",
        alignItems: "center",
        zIndex: "9999"
      }
    });

    this.lightboxImg = new Element("img", {
      css: {
        maxWidth: "90%",
        maxHeight: "90%",
        borderRadius: "4px",
        boxShadow: "0 0 20px rgba(0,0,0,0.5)"
      }
    });

    this.prevBtn = new Element("div", {
      props: { textContent: "❮" },
      css: {
        position: "absolute",
        left: "20px",
        top: "50%",
        transform: "translateY(-50%)",
        fontSize: "48px",
        color: "white",
        cursor: "pointer",
        userSelect: "none"
      }
    });

    this.nextBtn = new Element("div", {
      props: { textContent: "❯" },
      css: {
        position: "absolute",
        right: "20px",
        top: "50%",
        transform: "translateY(-50%)",
        fontSize: "48px",
        color: "white",
        cursor: "pointer",
        userSelect: "none"
      }
    });

    this.closeBtn = new Element("div", {
      props: { textContent: "×" },
      css: {
        position: "absolute",
        top: "20px",
        right: "30px",
        fontSize: "48px",
        color: "white",
        cursor: "pointer",
        userSelect: "none"
      }
    });

    this.overlay.addChild(this.lightboxImg);
    this.overlay.addChild(this.prevBtn);
    this.overlay.addChild(this.nextBtn);
    this.overlay.addChild(this.closeBtn);

    // Add everything to root
    this.addChild(this.thumbGrid);
    this.addChild(this.overlay);

    // Event handler references
    this._thumbHandlers = [];
    this._prevHandler = null;
    this._nextHandler = null;
    this._closeHandler = null;
    this._backgroundHandler = null;
    this._keyHandler = null;
  }

  // --- Public API ---
  open(index) {
    this.index = index;
    this.updateImage();
    this.overlay.dom.style.display = "flex";
  }

  close() {
    this.overlay.dom.style.display = "none";
  }

  next() {
    this.index = (this.index + 1) % this.metadata.images.length;
    this.updateImage();
  }

  prev() {
    this.index = (this.index - 1 + this.metadata.images.length) % this.images.length;
    this.updateImage();
  }

  updateImage() {
    this.lightboxImg.dom.src = this.metadata.images[this.index];
  }

  // --- Lifecycle ---
  onMount() {
    // Wire up thumbnails
    this.thumbnailElements.forEach((thumb, i) => {
      const handler = () => this.open(i);
      thumb.dom.addEventListener("click", handler);
      this._thumbHandlers.push(handler);
    });

    // Prev/next
    this._prevHandler = () => this.prev();
    this._nextHandler = () => this.next();
    this.prevBtn.dom.addEventListener("click", this._prevHandler);
    this.nextBtn.dom.addEventListener("click", this._nextHandler);

    // Close
    this._closeHandler = () => this.close();
    this.closeBtn.dom.addEventListener("click", this._closeHandler);

    // Click background to close
    this._backgroundHandler = e => {
      if (e.target === this.overlay.dom) this.close();
    };
    this.overlay.dom.addEventListener("click", this._backgroundHandler);

    // Keyboard navigation
    this._keyHandler = e => {
      if (this.overlay.dom.style.display === "none") return;
      if (e.key === "Escape") this.close();
      if (e.key === "ArrowRight") this.next();
      if (e.key === "ArrowLeft") this.prev();
    };
    document.addEventListener("keydown", this._keyHandler);
  }

  onUnmount() {
    this.thumbnailElements.forEach((thumb, i) => {
      thumb.dom.removeEventListener("click", this._thumbHandlers[i]);
    });

    this.prevBtn.dom.removeEventListener("click", this._prevHandler);
    this.nextBtn.dom.removeEventListener("click", this._nextHandler);
    this.closeBtn.dom.removeEventListener("click", this._closeHandler);
    this.overlay.dom.removeEventListener("click", this._backgroundHandler);
    document.removeEventListener("keydown", this._keyHandler);
  }
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

// https://www.w3schools.com/howto/howto_js_navbar_sticky.asp
// https://www.w3schools.com/howto/howto_css_navbar_image.asp
// https://www.w3schools.com/howto/howto_css_dropdown.asp hover
class dep_NavBar extends Box {
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

class dep_NavBar2 extends Box {
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

class NavBarLink extends Box {
  static defaults = {
    css: {},
    props: {},
    base: "",
    logoText: "",
    logoImage: null,
    links: []
  };

  constructor(metadata = {}) {
    super(NavBarLink.applyDefaults(metadata));

    const { base, logoText, logoImage, links } = this.metadata;

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

    if (logoText) {
      logoWrapper.addChild(
        new Element("span", {
          css: {
          fontSize: "24px",
          margin: "0 10px",
        },
        props: {
          innerHTML: logoText,
        }
        })
      );
    }

    this.container.addChild(logoWrapper);

    // --- LINKS ---
    for (const link of links) {
      console.log("UREL Link:", base + link.href);
      this.container.addChild(
        new Element("a", {
          css: { marginRight: "10px" },
          props: {
            textContent: link.label,
            href: base + link.href
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
      base: metadata.base ?? "",
      logoText: metadata.logoText ?? this.defaults.logoText,
      logoImage: metadata.logoImage ?? this.defaults.logoImage,
      links: metadata.links ?? this.defaults.links,
    };
  }
}

class NavBarDropdown extends Box {
  static defaults = {
    css: {},
    props: {},
    base: "",
    logoText: "",
    logoImage: null,
    menus: [] // now supports links OR dropdowns OR nested dropdowns
  };

  constructor(metadata = {}) {
    super(NavBarDropdown.applyDefaults(metadata));

    const { base, logoText, logoImage, menus } = this.metadata;

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
          css: { height: "32px", width: "32px", objectFit: "contain" },
          props: { src: logoImage, alt: logoText || "Logo" }
        })
      );
    }

    const color = getRandomColor();

    if (logoText) {
      logoWrapper.addChild(
        new Element("span", {
          css: { fontSize: "24px", margin: "0 10px" },
          props: {
            innerHTML: `<span style="color:${color};"><b>DOM</b></span>icile`
          }
        })
      );
    }

    this.container.addChild(logoWrapper);

    // --- LINKS OR DROPDOWNS ---
    for (const item of menus) {
      if (item.options) {
        // Dropdown or cascading dropdown
        this.container.addChild(this.buildDropdown(item, base));
      } else {
        // Simple link
        this.container.addChild(
          new Element("a", {
            css: { marginRight: "10px" },
            props: {
              textContent: item.label,
              href: base + item.href
            }
          })
        );
      }
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
        css: { flexBasis: "100%", height: "1px" }
      })
    );
  }

  // --- Build dropdowns recursively ---
  buildDropdown(item, base) {
    const wrapper = new Box({
      css: { display: "flex", flexDirection: "column", marginRight: "10px" }
    });

    const select = new Element("select", {
      props: {
        onchange: (e) => {
          const selected = item.options[e.target.selectedIndex];
          if (selected.href) {
            window.location.href = base + selected.href;
          }
        }
      }
    });

    // Populate first-level options
    for (const opt of item.options) {
      select.addChild(
        new Element("option", {
          props: { textContent: opt.label }
        })
      );
    }

    wrapper.addChild(
      new Element("label", {
        props: { textContent: item.label }
      })
    );

    wrapper.addChild(select);

    // If cascading: build nested dropdowns
    for (const opt of item.options) {
      if (opt.options) {
        wrapper.addChild(this.buildDropdown(opt, base));
      }
    }

    return wrapper;
  }

  static applyDefaults(metadata) {
    return {
      css: { ...this.defaults.css, ...(metadata.css || {}) },
      props: { ...this.defaults.props, id: "nav-bar", className: "nav-bar-3" },
      base: metadata.base ?? "",
      logoText: metadata.logoText ?? this.defaults.logoText,
      logoImage: metadata.logoImage ?? this.defaults.logoImage,
      menus: metadata.menus ?? this.defaults.menus
    };
  }
}

class NavBarTopBase extends BoxBox {
  static defaults = {
    css: {
      display: "flex",
      alignItems: "center",
      gap: "20px",
      //padding: "10px 20px",
      //backgroundColor: "#f8f8f8",
      borderBottom: "1px solid #ddd",
      position: "relative",
      //zIndex: 1000
    },
    props: {},
    base: "",
    logoText: "",
    logoHTML: null,
    logoImage: null,
    menus: [] // now supports links OR dropdowns OR nested dropdowns
  };

  constructor(metadata = {}) {
    let innermeta = {
      css: {
        display: "flex",
        flexWrap: "wrap",
        alignItems: "center",
        width: "100%",
        gap: "10px",
        padding: "10px"
      }
    };
    super(innermeta, NavBarTopBase.applyDefaults(metadata));
    //this._inner = new Box(innermeta);
    //this.addChild(this._inner);
  }

  static applyDefaults(metadata) {
    return {
      css: { ...this.defaults.css, ...(metadata.css || {}) },
      props: { ...this.defaults.props, id: "nav-bar", className: "nav-bar-3" },
      base: metadata.base ?? "",
      logoText: metadata.logoText ?? this.defaults.logoText,
      logoHTML: metadata.logoHTML ?? this.defaults.logoHTML,
      logoImage: metadata.logoImage ?? this.defaults.logoImage,
      menus: metadata.menus ?? this.defaults.menus
    };
  }

  // --- Utility Methods ---
  sticky(on = true) {
    this.metadata.css.position = on ? "sticky" : "relative";
    this.metadata.css.top = on ? "0" : "";
    this.refresh();
    return this;
  }

  background(color) {
    this.metadata.css.backgroundColor = color;
    this.refresh();
    return this;
  }

  spacing(px) {
    this.metadata.css.padding = `${px}px`;
    this.refresh();
    return this;
  }

  addLeft(child) {
    this._inner.addChild(child);
    return this;
  }

  addRight(child) {
    child.metadata.css.marginLeft = "auto";
    this._inner.addChild(child);
    return this;
  }
}

class NavBarTopHoverDD1X extends NavBarTopBase {
  constructor(metadata = {}) {
    super(metadata);
    const { base, logoText, logoHTML, logoImage, menus = [] } = metadata;

    //NavBarTopHoverDD1X.injectCSSonce();
    
    // --- Logo ---
    if (logoText || logoImage || logoHTML) {
      const logo = new Box({
        css: { display: "flex", alignItems: "center", flexDirection: 'column', gap: "10px" }
      });

      if (logoImage) {
          logo.addChild(new Element('a', { props: { href: base + '/'}},
            new Element("img", {
              css: { height: "32px", width: "32px", objectFit: "contain" },
              props: { src: logoImage }
            })
          )
        );
      }

    if (logoText || logoHTML) {
        if (logoHTML) {
          logo.addChild(new Element('a', { props: { href: base + '/'}},
              new Element("div", {
                css: { fontSize: "22px", fontWeight: "bold" },
                props: { innerHTML: logoHTML }
              })
            )
          );
        } else {
          logo.addChild(new Element('a', { props: { href: base + '/'}},
              new Element("div", {
                css: { fontSize: "22px", fontWeight: "bold" },
                props: { textContent: logoText }
              })
            )
          );
        }
      }

      this.addLeft(logo);
    }

    // --- Mixed Menus ---
    for (const item of menus) {
      this.addLeft(this.buildMenuItem(item));
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

    this.addRight(clock);
  }

  // --- Decide what kind of menu item to build ---
  buildMenuItem(item, level=0) {
    console.log("[menu] Build Item:", item);
    if (item.items && Array.isArray(item.items)) {
      console.log("[menu] Goto Build Dropdown:", item);
      return this.buildDropdown(item, level);
    }

    if (item.href) {
      console.log("[menu] Goto Build Link:", item);
      return this.buildLink(item);
    }

    // fallback: label only
    console.log("[menu] Return Span:", item);
    return new Element("span", {
      css: { padding: "10px 16px" },
      props: { textContent: item.label }
    });
  }

  // --- Simple Link ---
  buildLink(item) {
    return new Element("a", {
      css: {
        //padding: "10px 16px",
        textDecoration: "none",
        //color: "#333",
        cursor: "pointer"
      },
      props: {
        textContent: item.label,
        href: this.metadata.base + item.href
      }
    });
  }

  // --- Hover Dropdown (recursive) ---
  buildDropdown(item, level=0) {
    console.log("[menu] Build Dropdown:", item);
    const dropdown = new Box({
      css: { position: "relative", display: "flex", flexDirection: "column" },
      props: { className: "dropdown" },
    });

    // Button
    const button = new Box({
      css: {
        //padding: "10px 16px",
        cursor: "pointer",
        userSelect: "none",
        //backgroundColor: "#eee",
        borderRadius: "4px",
        whiteSpace: "nowrap"
      },
      props: { textContent: item.label }
    });

    dropdown.addChild(button);

    // Dropdown content
    const content = new Box({
      css: {
        display: "none",
        position: "absolute",
        backgroundColor: "#111",
        minWidth: "160px",
        boxShadow: "0px 8px 16px rgba(0,0,0,0.2)",
        padding: `10px 16px 10px 10px`,
        zIndex: 1000,
        flexDirection: "column",
        left: level === 0 ? "0" : "100%", 
        top: level === 0 ? "100%" : "0"
      }
    });

    // Populate items (recursive)
    for (const sub of item.items) {
      console.log("[menu] SUB:", sub);
      if (sub.items) {
        content.addChild(this.buildMenuItem(sub, level + 1));
      } else {
        content.addChild(this.buildLink(sub));
      }
    }
    
    dropdown.addChild(content);
    
    // --- Interaction: click first, hover as enhancement ---
    const toggleOpen = () => {
      if (!dropdown.dom) return;
      //dropdown.dom.classList.toggle("open");
      if (content.dom.style.display === 'flex') {
        content.dom.style.display = 'none';
      } else {
        content.dom.style.display = 'flex';
      }
    };
    
    button.metadata.props.onclick = (e) => {
      e.stopPropagation();
      toggleOpen();
    };

    // Hover behavior
    button.metadata.props.onmouseenter = () => {
      console.log("[menu] On Mouse Enter");
      content.dom.style.display = 'flex';
      //content.metadata.css.display = "flex";
      //content.refresh();
    };
    
    dropdown.metadata.props.onmouseleave = () => {
      console.log("[menu] On Mouse Leave");
      content.dom.style.display = 'none';
      //content.metadata.css.display = "none";
      //content.refresh();
    };

    return dropdown;
  }
  
  static injectCSSonce() {
    if (this._cssInjected) return;
    this._cssInjected = true;

    const style = document.createElement("style");
    style.textContent = `
      .dropdown .dropdown-content {
        display: none;
      }
      .dropdown.open .dropdown-content {
        display: flex !important;
      }
      @media (max-width: 768px) {
        .dropdown .dropdown-content {
          position: static !important;
          display: none;
          box-shadow: none;
          min-width: 100%;
        }

        .dropdown.open .dropdown-content {
          display: flex !important;
        }
        
        { .dropbtn { width: 100%; } }
      }
    `;
    document.head.appendChild(style);
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
      new Element('button', {
        css: { background: '#111', color: 'lavender' },
        props: { textContent: "Scroll to Top", onclick: () => {
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
        props: { textContent: `© ${new Date().getFullYear()} Peter Joel Anderson. All rights reserved.`}
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

// WIP - this doesn't work yet
class Calendar extends Element {
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

    super("div", merged);

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
  Table,
  WideScreenSlideshow,
  DigitalClock,
  NavBarLink,
  NavBarDropdown,
  NavBarTopHoverDD1X,
  Footer,
  NotFound404,
  ListWithControls,
  Modal,
  GridLayout,
  TabbedWidget,
  Contact,
};
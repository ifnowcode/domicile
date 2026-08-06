function makePage(background, title, text) {
  const page = new Element("div", {
    css: {
      //background,
      padding: "20px",
      fontSize: "22px",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      height: "100%",
      overflow: "hidden",        // no scrolling
      boxSizing: "border-box"
    }
  });

  const content = new Element("div", {
    css: {
      maxWidth: "600px",
      textAlign: "center",
      overflow: "hidden",        // prevent scroll
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      flex: "1 1 auto",          // allow shrinking
      maxHeight: "100%",         // force fit
      boxSizing: "border-box"
    }
  });
  
  const bookTitleEl = new Element("div", {
    props: { textContent: "The Tale of Azurewing" },
    css: {
      fontWeight: "bold",
      marginBottom: "16px",
      fontSize: "24px",
      flexShrink: "0"
    }
  });
  
  const info = new Element('div', {
    props: { textContent: "< - swipe page left/right + >" },
    css: {
      fontWeight: "bold",
      marginBottom: "16px",
      fontSize: "16px",
      flexShrink: "0"
    }
  });

  const titleEl = new Element("div", {
    props: { textContent: title },
    css: {
      fontWeight: "bold",
      marginBottom: "16px",
      fontSize: "28px",
      flexShrink: "0"
    }
  });

  const textEl = new Element("div", {
    props: { textContent: text },
    css: {
      flexShrink: "1",           // allow text to wrap and shrink
      overflow: "hidden",
      textOverflow: "ellipsis"   // optional: prevent overflow
    }
  });

  
  content.addChild(titleEl);
  content.addChild(textEl);
  page.addChild(bookTitleEl);
  page.addChild(info);
  page.addChild(content);
  

  return page;
}


class BookViewer extends Layout {
  constructor(metadata = {}) {
    const defaults = {
      pages: [],
      currentPage: 0,
      css: {
        position: "relative",
        width: "100%",
        height: "100%",
        overflow: "hidden",
        touchAction: "pan-y"
      }
    };

    const merged = {
      ...defaults,
      ...metadata,
      css: { ...defaults.css, ...(metadata.css || {}) }
    };

    super("div", merged);

    this.pages = merged.pages;
    this.currentPage = merged.currentPage;

    this.pointerDownHandler = null;
    this.pointerMoveHandler = null;
    this.pointerUpHandler = null;

    this.build();
  }

  build() {
    this.strip = new Element("div", {
      css: {
        display: "flex",
        height: "100%",
        transition: "transform 0.4s ease"
      }
    });

    this.pages.forEach(page => {
      this.strip.addChild(page);
    });

    this.addChild(this.strip);
  }

  onMount() {
    super.onMount();
    // Now DOM exists — safe to size pages
    const width = this.dom.clientWidth;

    this.pages.forEach(page => {
      page.dom.style.flex = "0 0 " + width + "px";
      page.dom.style.height = "100%";
    });

    // Set strip width
    this.strip.dom.style.width = (width * this.pages.length) + "px";

    this.enableSwipe();
    this.updatePosition();
  }

  onUnmount() {
    super.onUnmount();
    this.dom.removeEventListener("pointerdown", this.pointerDownHandler);
    this.dom.removeEventListener("pointermove", this.pointerMoveHandler);
    this.dom.removeEventListener("pointerup", this.pointerUpHandler);
  }

  enableSwipe() {
    let startX = 0;
    let deltaX = 0;
    let dragging = false;

    this.pointerDownHandler = e => {
      dragging = true;
      startX = e.clientX;
      deltaX = 0;
      this.strip.dom.style.transition = "none";
    };

    this.pointerMoveHandler = e => {
      if (!dragging) return;
      deltaX = e.clientX - startX;
      const offset = -this.currentPage * this.dom.clientWidth + deltaX;
      this.strip.dom.style.transform = `translateX(${offset}px)`;
    };

    this.pointerUpHandler = () => {
      if (!dragging) return;
      dragging = false;

      this.strip.dom.style.transition = "transform 0.4s ease";

      if (deltaX > 80 && this.currentPage > 0) {
        this.currentPage--;
      } else if (deltaX < -80 && this.currentPage < this.pages.length - 1) {
        this.currentPage++;
      }

      this.updatePosition();
    };

    this.dom.addEventListener("pointerdown", this.pointerDownHandler);
    this.dom.addEventListener("pointermove", this.pointerMoveHandler);
    this.dom.addEventListener("pointerup", this.pointerUpHandler);
  }

  updatePosition() {
    const offset = -this.currentPage * this.dom.clientWidth;
    this.strip.dom.style.transform = `translateX(${offset}px)`;
  }

  onResize(width, height) {
    // Recompute page widths on resize
    this.pages.forEach(page => {
      page.dom.style.flex = "0 0 " + width + "px";
    });

    this.strip.dom.style.width = (width * this.pages.length) + "px";
    this.updatePosition();
  }
  
  
}

// Layouts should not be hard coded
class BookPage extends Layout {
  constructor(metadata = {}) {
    super("div", {
      css: {
        width: "100vw",
        height: "100vh",
        background: "#ddd",
        position: "relative",
        overflow: "hidden"
      },
      ...metadata
    });

    // Define pages
    const page1 = new Element("div", {
      css: { background: "#fff", padding: "40px", fontSize: "24px" },
      props: { textContent: "Page 1: Welcome to the Book" }
    });

    const page2 = new Element("div", {
      css: { background: "#f0f0f0", padding: "40px", fontSize: "24px" },
      props: { textContent: "Page 2: Chapter One" }
    });

    const page3 = new Element("div", {
      css: { background: "#fff", padding: "40px", fontSize: "24px" },
      props: { textContent: "Page 3: Chapter Two" }
    });

    // Create the book viewer
    this.book = new BookViewer({
      pages: [page1, page2, page3],
      css: {
        width: "100%",
        height: "100%"
      }
    });

    this.addChild(this.book);
  }

  onresize(width, height) {
    // Let the book recompute its strip offset
    this.book.updatePosition();
  }
}

// Usage:
//const app = new BookPage();
//app.render(document.body);

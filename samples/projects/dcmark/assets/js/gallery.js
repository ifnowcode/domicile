// custom slideshows components

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

class LightboxThumbnailViewer extends Element {
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

class PictureCarousel extends Element {
  constructor(images = [], metadata = {}) {
    super("div", {
      css: {
        position: "relative",
        overflow: "hidden",
        width: "100%",
        maxWidth: "800px",
        margin: "auto",
        borderRadius: "10px",
        boxSizing: "border-box",
        minHeight: "300px"     // ⭐ prevents collapse
      },
      ...metadata
    });

    this.images = images;
    this.index = 0;
    this.interval = null;

    // --- Track (slides container) ---
    this.track = new Element("div", {
      css: {
        display: "flex",
        transition: "transform 0.5s ease",
        //width: `${images.length * 100}%`,
        width: "100%",
        alignItems: "center",
      }
    });

    // Slides
    this.slides = images.map(src => {
      const slide = new Element("div", {
        css: {
          flex: "0 0 100%",
          width: "100%"
        }
      });

      slide.addChild(
        new Element("img", {
          props: { src },
          css: {
              width: "100%",
              height: "auto",
              maxWidth: "800px",     // or whatever size you want
              maxHeight: "450px",    // keeps aspect ratio intact
              objectFit: "contain",  // ensures no cropping
              margin: "0 auto",
              display: "block"
            }
        })
      );

      this.track.addChild(slide);
      return slide;
    });

    // --- Arrows ---
    this.prevBtn = new Element("div", {
      props: { textContent: "❮" },
      css: {
        position: "absolute",
        top: "50%",
        left: "10px",
        transform: "translateY(-50%)",
        fontSize: "40px",
        color: "white",
        cursor: "pointer",
        userSelect: "none",
        padding: "4px 8px",
        background: "rgba(0,0,0,0.3)",
        borderRadius: "4px"
      }
    });

    this.nextBtn = new Element("div", {
      props: { textContent: "❯" },
      css: {
        position: "absolute",
        top: "50%",
        right: "10px",
        transform: "translateY(-50%)",
        fontSize: "40px",
        color: "white",
        cursor: "pointer",
        userSelect: "none",
        padding: "4px 8px",
        background: "rgba(0,0,0,0.3)",
        borderRadius: "4px"
      }
    });

    // --- Dots ---
    this.dots = new Element("div", {
      css: {
        position: "absolute",
        bottom: "10px",
        left: "50%",
        transform: "translateX(-50%)",
        display: "flex",
        gap: "8px"
      }
    });

    this.dotElems = images.map((_, i) => {
      const dot = new Element("div", {
        css: {
          width: "12px",
          height: "12px",
          borderRadius: "50%",
          backgroundColor: i === 0 ? "white" : "rgba(255,255,255,0.5)",
          cursor: "pointer"
        }
      });
      this.dots.addChild(dot);
      return dot;
    });

    // Build structure
    this.addChild(this.track);
    this.addChild(this.prevBtn);
    this.addChild(this.nextBtn);
    this.addChild(this.dots);

    // Event handler refs
    this._prev = null;
    this._next = null;
    this._dotHandlers = [];
    this._touchStart = null;
    this._touchEnd = null;
  }

  update() {
    const offset = -(this.index * 100);
    this.track.dom.style.transform = `translateX(${offset}%)`;

    this.dotElems.forEach((dot, i) => {
      dot.dom.style.backgroundColor =
        i === this.index ? "white" : "rgba(255,255,255,0.5)";
    });
  }

  next() {
    this.index = (this.index + 1) % this.images.length;
    this.update();
  }

  prev() {
    this.index = (this.index - 1 + this.images.length) % this.images.length;
    this.update();
  }

  onMount() {
    // Arrows
    this._prev = () => this.prev();
    this._next = () => this.next();
    this.prevBtn.dom.addEventListener("click", this._prev);
    this.nextBtn.dom.addEventListener("click", this._next);

    // Dots
    this.dotElems.forEach((dot, i) => {
      const handler = () => {
        this.index = i;
        this.update();
      };
      dot.dom.addEventListener("click", handler);
      this._dotHandlers.push(handler);
    });

    // Autoplay
    this.interval = setInterval(() => this.next(), 4000);

    // Pause on hover
    this.dom.addEventListener("mouseenter", () => clearInterval(this.interval));
    this.dom.addEventListener("mouseleave", () => {
      this.interval = setInterval(() => this.next(), 4000);
    });

    // Touch swipe
    this._touchStart = e => (this.startX = e.touches[0].clientX);
    this._touchEnd = e => {
      const endX = e.changedTouches[0].clientX;
      if (endX - this.startX > 50) this.prev();
      if (this.startX - endX > 50) this.next();
    };

    this.dom.addEventListener("touchstart", this._touchStart);
    this.dom.addEventListener("touchend", this._touchEnd);
  }

  onUnmount() {
    this.prevBtn.dom.removeEventListener("click", this._prev);
    this.nextBtn.dom.removeEventListener("click", this._next);

    this.dotElems.forEach((dot, i) => {
      dot.dom.removeEventListener("click", this._dotHandlers[i]);
    });

    clearInterval(this.interval);

    this.dom.removeEventListener("touchstart", this._touchStart);
    this.dom.removeEventListener("touchend", this._touchEnd);
  }
}

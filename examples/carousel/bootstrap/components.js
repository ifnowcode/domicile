// 
class BootstrapCarousel extends Element {
  constructor(slides = [], metadata = {}) {
    super("div", {
      css: {
        boxSizing: "border-box",
        fontFamily: "Arial, Helvetica, sans-serif",
        padding: "16px"
      },
      ...metadata
    });
    
    this.wrap = true; // true = loop 0↔N, false = stop at ends

    this.slidesData = slides.length
      ? slides
      : [
          {
            src: "la.jpg",
            alt: "Los Angeles",
            title: "Los Angeles",
            text: "LA is always so much fun!"
          },
          {
            src: "chicago.jpg",
            alt: "Chicago",
            title: "Chicago",
            text: "Thank you, Chicago!"
          },
          {
            src: "ny.jpg",
            alt: "New York",
            title: "New York",
            text: "We love the Big Apple!"
          }
        ];

    this.index = 0;

    // Container
    this.container = new Element("div", {
      css: {
        maxWidth: "800px",
        margin: "0 auto"
      }
    });

    this.heading = new Element("h2", {
      props: { textContent: "Carousel Example" }
    });

    // Carousel root
    this.carousel = new Element("div", {
      css: {
        position: "relative",
        overflow: "hidden",
        width: "100%",
        borderRadius: "8px",
        backgroundColor: "#000"
      }
    });

    // Indicators
    this.indicators = new Element("ol", {
      css: {
        position: "absolute",
        bottom: "10px",
        left: "50%",
        transform: "translateX(-50%)",
        display: "flex",
        gap: "8px",
        listStyle: "none",
        margin: "0",
        padding: "0",
        zIndex: "10"
      }
    });

    this.indicatorElems = [];

    // Inner track
    this.inner = new Element("div", {
      css: {
        display: "flex",
        width: "100%",
        transition: "transform 0.6s ease"
      }
    });

    this.slideElems = [];

    this.slidesData.forEach((s, i) => {
      // Indicator
      const li = new Element("li", {
        css: {
          width: "12px",
          height: "12px",
          borderRadius: "50%",
          border: "1px solid #fff",
          backgroundColor: i === 0 ? "#fff" : "transparent",
          cursor: "pointer"
        }
      });
      this.indicators.addChild(li);
      this.indicatorElems.push(li);

      // Slide
      const item = new Element("div", {
        css: {
          flex: "0 0 100%",
          width: "100%",
          position: "relative",
          color: "#fff"
        }
      });

      const img = new Element("img", {
        props: { src: s.src, alt: s.alt },
        css: {
          width: "100%",
          height: "400px",
          objectFit: "cover",
          display: "block"
        }
      });

      const caption = new Element("div", {
        css: {
          position: "absolute",
          bottom: "20px",
          left: "50%",
          transform: "translateX(-50%)",
          textAlign: "center",
          backgroundColor: "rgba(0,0,0,0.5)",
          padding: "8px 16px",
          borderRadius: "4px"
        }
      });

      caption.addChild(
        new Element("h3", { props: { textContent: s.title } })
      );
      caption.addChild(
        new Element("p", { props: { textContent: s.text } })
      );

      item.addChild(img);
      item.addChild(caption);
      this.inner.addChild(item);
      this.slideElems.push(item);
    });

    // Controls
    this.prev = new Element("a", {
      props: { href: "javascript:void(0);" },
      css: {
        position: "absolute",
        top: "50%",
        left: "10px",
        transform: "translateY(-50%)",
        color: "#fff",
        fontSize: "30px",
        textDecoration: "none",
        cursor: "pointer",
        zIndex: "10",
        padding: "4px 8px",
        backgroundColor: "rgba(0,0,0,0.4)",
        borderRadius: "4px"
      }
    });
    this.prev.addChild(
      new Element("span", { props: { textContent: "‹" } })
    );

    this.next = new Element("a", {
      props: { href: "javascript:void(0);" },
      css: {
        position: "absolute",
        top: "50%",
        right: "10px",
        transform: "translateY(-50%)",
        color: "#fff",
        fontSize: "30px",
        textDecoration: "none",
        cursor: "pointer",
        zIndex: "10",
        padding: "4px 8px",
        backgroundColor: "rgba(0,0,0,0.4)",
        borderRadius: "4px"
      }
    });
    this.next.addChild(
      new Element("span", { props: { textContent: "›" } })
    );

    // Assemble
    this.carousel.addChild(this.inner);
    this.carousel.addChild(this.indicators);
    this.carousel.addChild(this.prev);
    this.carousel.addChild(this.next);

    this.container.addChild(this.heading);
    this.container.addChild(this.carousel);
    this.addChild(this.container);

    // handler refs
    this._prevHandler = null;
    this._nextHandler = null;
    this._indicatorHandlers = [];
  }

  goTo(index) {
    const len = this.slidesData.length;
    //this.index = (index + len) % len;
    if (this.wrap) {
      this.index = (index + len) % len;
    } else {
      this.index = Math.max(0, Math.min(index, len - 1));
    }
    const offset = -(this.index * 100);
    this.inner.dom.style.transform = `translateX(${offset}%)`;

    this.indicatorElems.forEach((li, i) => {
      li.dom.style.backgroundColor = i === this.index ? "#fff" : "transparent";
    });
  }

  onMount() {
    this._prevHandler = () => this.goTo(this.index - 1);
    this._nextHandler = () => this.goTo(this.index + 1);

    this.prev.dom.addEventListener("click", this._prevHandler);
    this.next.dom.addEventListener("click", this._nextHandler);

    this.indicatorElems.forEach((li, i) => {
      const h = () => this.goTo(i);
      li.dom.addEventListener("click", h);
      this._indicatorHandlers.push(h);
    });

    this.goTo(0);
  }

  onUnmount() {
    this.prev.dom.removeEventListener("click", this._prevHandler);
    this.next.dom.removeEventListener("click", this._nextHandler);
    this.indicatorElems.forEach((li, i) => {
      li.dom.removeEventListener("click", this._indicatorHandlers[i]);
    });
  }
}

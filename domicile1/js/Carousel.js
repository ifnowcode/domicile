class OverlayText extends Element {
  constructor(metadata = {}, ...children) {
    super(
      "label",
      {
        css: {
          position: "absolute",
          top: "10px",
          left: "0",
          width: "100%",
          textAlign: "center",
          fontSize: "14px",
          color: "white",
          zIndex: 10,
          textShadow: "2px 2px 6px rgba(0,0,0,0.6)",
          background: "rgba(0,0,0,0.3)",
          pointerEvents: "none"
        },
        props: {
          textContent: metadata.text
        }
      },
      ...children
    );
  }
}

function fnContentContainerByResource(metadata = {}) {
  console.log("fnContentContainerByResource", metadata);
  
  const resource = metadata.resource;
  const lower = resource.toLowerCase();
  
  console.log("[resource]", resource);
  
  if (resource === "tile") {
    return new UiContainer({ resource });
  } else if (lower.startsWith("http:")) {
    return new ErrorContainer({
      resource,
      html: "<b>This Resource is Insecure!</b><br>"
    });
  } else if (lower.startsWith("https:")) {
    const ext = getExtension(resource);

    if (ext.length > 0) {
      return fnContentContainerByExtension(metadata);
    } else if (resource.includes("youtube")) {
      return new IframeContainer({ resource });
    } else {
      return new ErrorContainer({
        resource,
        html: "<b>Browsing Blocked</b><br>"
      });
    }
  } 
  else {
    return fnContentContainerByExtension(metadata);
  }
}

function fnContentContainerByExtension(metadata = {}) {
  console.log("fnContentContainerByExtension", metadata);
  const resource = metadata.resource;
  const ext = getExtension(resource);
  console.log("[resource] PATH", ext, resource);

  if (["mp3", "wav", "wma"].includes(ext)) {
    return new AudioContainer({ resource });
  } 
  else if (["mp4", "wmv", "ogg"].includes(ext)) {
    return new VideoContainer({ resource });
  } 
  else if (["jpg", "png", "jpeg", "webp", "bmp"].includes(ext)) {
    return new ImageContainer({ resource });
  } 
  else if (ext === "html") {
    return new IframeContainer({ resource });
  } 
  else {
    console.log("[unknown] Extension [" + ext + "]: " + this.resource);
    return new ErrorContainer({
      resource,
      html:
        ext.length > 0
          ? `<b>Unknown Resource Extension</b><br><b>[.${ext.toUpperCase()}]</b><br>`
          : "<b>Resource has no Extension!</b><br>"
    });
  }
}

class ImageContainer extends Element {
  constructor(metadata = {}) {
    super("div", {
      props: { className: "image-container" },
      ...metadata
    });
    this.resource = metadata.resource;
    console.log("ImageContainer", this.resource);
    
    this.addChild(new OverlayText({ text: getFileName(this.resource) }));
    this.addChild(new Element(
      "a",
      { props: { target: "_blank", href: this.resource } },
      new Element("img", { props: { src: this.resource } })
    ));
  }
}

class VideoContainer extends Element {
  constructor(metadata = {}) {
    super("div", {
      props: { className: "video-container" },
      ...metadata
    });
    this.resource = metadata.resource;
    console.log("VideoContainer", this.resource);
    this.addChild(new OverlayText({ text: getFileName(this.resource) }));
    const ext = getExtension(this.resource);
    this.addChild(new Element(
      "video",
      { 
        props: { 
          controls: "", 
          //muted: "", 
          textContent: "Your browser does not support the video element." 
        } 
    }, new Element("source", {
      props: { type: "video/" + ext, src: this.resource }
    })));
  }
}

class AudioContainer extends Element {
  constructor(metadata = {}) {
    super("div", {
      props: { className: "audio-container" },
      ...metadata
    });
    this.resource = metadata.resource;
    console.log("AudioContainer", this.resource);
    this.addChild(new OverlayText({ text: getFileName(this.resource) }));
    this.addChild(new Element(
      "a",
      { props: { target: "_blank", href: this.resource } },
      new Element(
        "audio",
        {
          props: {
            src: this.resource,
            controls: "",
            //muted: "",
            preload: "none",
            textContent: "Your browser does not support the audio element."
          }
        },
        new Element("source", {
          props: { type: "audio/mpeg", src: this.resource }
        }),
      )
    ));
  }
}

class IframeContainer extends Element {
  constructor(metadata = {}) {
    super("div", {
      props: { className: "iframe-container" },
      ...metadata
    });
    this.resource = metadata.resource;
    console.log("IframeContainer");
    this.addChild(new OverlayText({ text: getFileName(this.resource) }));
    this.addChild(new Element("iframe", {
      props: {
        src: this.resource,
        frameborder: "0",
        allowfullscreen: ""
      }
    }));
  }

  dep_render(container) {
    super.render(container);

    new OverlayText({ text: getFileName(this.resource) }).render(this._dom);

    new Element("iframe", {
      props: {
        src: this.resource,
        frameborder: "0",
        allowfullscreen: ""
      }
    }).render(this._dom);
  }
}

class UiContainer extends Element {
  constructor(metadata = {}) {
    super("div", {
      props: { className: "ui-container" },
      ...metadata
    });
    console.log("UiContainer");
    this.addChild(new Element("label", {
      css: { fontSize: "64px", opacity: "0.1", pointerEvents: "none" },
      props: { textContent: "[i]" }
    }));
    this.addChild(new Element("hr"));
  }

  dep_render(container) {
    super.render(container);

    new Element("label", {
      css: { fontSize: "64px", opacity: "0.1", pointerEvents: "none" },
      props: { textContent: "[i]" }
    }).render(this._dom);

    new Element("hr").render(this._dom);
  }
}

class ErrorContainer extends Element {
  constructor(metadata = {}) {
    super("div", {
      props: { className: "error-container" },
      ...metadata
    });
    this.resource = metadata.resource;
    this.html = metadata.html;
    console.log("ErrorContainer");
    this.addChild(new OverlayText({ text: getFileName(this.resource) }));
    this.addChild(new Element(
      "label",
      {
        css: { textAlign: "center" },
        props: { innerHTML: this.html }
      },
      //createElementFromHTML(this.html + "<br>")
    ));
    this.addChild(new Element("hr"));
  }

  dep_render(container) {
    console.log("[error] UI -", this.resource, this.html);

    super.render(container);

    new OverlayText({ text: this.resource }).render(this._dom);

    new Element(
      "label",
      {
        css: { textAlign: "center" },
        props: { innerHTML: this.html }
      },
      //createElementFromHTML(this.html + "<br>")
    ).render(this._dom);

    new Element("hr").render(this._dom);
  }
}

class CarouselEx_copilotver extends Element {
  constructor(metadata = {}, ...children) {
    super("div", {
      css: {},
      props: { className: "carousel-container" },
      title: metadata.title,
      tracks: metadata.tracks || []
    }, ...children);
  }

  render(container) {
    super.render(container);

    // Build the internal structure
    this.buildCarousel();
  }

  buildCarousel() {
    const { title, tracks } = this.metadata;

    // Title
    const titleEl = new Element("h2", {
      css: { marginLeft: "100px" },
      props: { textContent: title }
    });
    titleEl.render(this._dom);

    // Carousel wrapper
    const wrapper = new Element("div", {
      css: { background: "black" },
      props: { className: "carousel" }
    });
    wrapper.render(this._dom);

    // Row container
    const row = new Element("div", {
      props: { className: "carousel-row" }
    });
    row.render(wrapper._dom);

    // Tiles
    for (const track of tracks) {
      const tile = new Element("div", {
        props: { className: "carousel-tile" },
        css: { background: getRandomColor() }
      });

      tile.render(row._dom);

      // Content inside tile
      const content = new ContentContainerByResource({
        resource: track.url
      });

      content.render(tile._dom);
    }
  }
}

// my updated version
class CarouselEx extends Element {
  constructor(metadata = {}, ...children) {
    super("div", {
      css: {},
      props: { className: "carousel-container" },
      title: metadata.title,
      tracks: metadata.tracks || []
    }, ...children);
    
    // Build the internal structure
    const { title, tracks } = this.metadata;
    
    // Title
    this.addChild(new Element("h2", {
      css: { marginLeft: "100px" },
      props: { textContent: title }
    }));

    // Carousel wrapper
    const wrapper = new Element("div", {
      css: { background: "black" },
      props: { className: "carousel" }
    });
    this.addChild(wrapper);

    // Row container
    const row = new Element("div", {
      props: { className: "carousel-row" }
    });
    wrapper.addChild(row);

    // Tiles
    for (const track of tracks) {
      const tile = new Element("div", {
        props: { className: "carousel-tile" },
        css: { background: getRandomColor() }
      });

      row.addChild(tile);

      // Content inside tile
      const content = fnContentContainerByResource({
        resource: track.url
      });

      tile.addChild(content);
    }
  }
}

class CarouselDemo extends Element {
  constructor(metadata = {}, ...children) {
    super("div", {}, 
      new CarouselEx({
        title: metadata.album.title,
        tracks: metadata.album.tracks
      })
    );
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
        alignItems: "center", // is this doing anything?
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

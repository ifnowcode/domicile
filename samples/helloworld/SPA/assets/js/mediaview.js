// This all is for one specific types of custom carousel that I created in mediaview

// dynamic lightbox mean to be created and removed when done so it can respond to events
// See ImageContainer for an example, loaded in a click event by creating a new Lightbox.
// this is done dynamically in the DOM to keep it simple
class Lightbox {
  constructor(srcList, startIndex = 0) {
    this.srcList = srcList;
    this.index = startIndex;
    this.el = null;
    this.onKeyDown = this.onKeyDown.bind(this);
  }

  open() {
    this.el = document.createElement("div");
    this.el.style.cssText = `
      position: fixed;
      inset: 0;
      background: rgba(0,0,0,0.9);
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 9999;
    `;

    const img = document.createElement("img");
    img.style.cssText = `
      max-width: 90vw;
      max-height: 90vh;
      object-fit: contain;
      box-shadow: 0 0 20px rgba(0,0,0,0.5);
    `;
    img.src = this.srcList[this.index];
    this.img = img;
    
    const prev = document.createElement("button");
    prev.textContent = "‹";
    prev.style.cssText = this.buttonStyle("left: 16px;");
    prev.onclick = () => this.show(this.index - 1);

    const next = document.createElement("button");
    next.textContent = "›";
    next.style.cssText = this.buttonStyle("right: 16px;");
    next.onclick = () => this.show(this.index + 1);

    const close = document.createElement("button");
    close.textContent = "×";
    close.style.cssText = this.buttonStyle("top: 16px; right: 16px; font-size: 32px;");
    close.onclick = () => this.close();
    
    console.log("SRC Length:", this.srcList.length);
    if (this.srcList.length === 1) {
      this.el.append(img, close);
    } else {
      this.el.append(prev, img, next, close);
    }
    document.body.appendChild(this.el);
    document.addEventListener("keydown", this.onKeyDown);
  }

  buttonStyle(extra = "") {
    return `
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      background: rgba(255,255,255,0.15);
      color: white;
      border: none;
      font-size: 40px;
      padding: 8px 14px;
      cursor: pointer;
      ${extra}
    `;
  }

  show(i) {
    this.index = (i + this.srcList.length) % this.srcList.length;
    this.img.src = this.srcList[this.index];
  }

  onKeyDown(e) {
    if (e.key === "Escape") this.close();
    if (e.key === "ArrowLeft") this.show(this.index - 1);
    if (e.key === "ArrowRight") this.show(this.index + 1);
  }

  close() {
    document.removeEventListener("keydown", this.onKeyDown);
    this.el?.remove();
    this.el = null;
  }
}

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

const supported_image_formats = ["jpg", "png", "jpeg", "webp", "bmp"];
const supported_audio_formats = ["mp4", "wmv", "ogg"];
const supported_video_formats = ["mp3", "wav", "wma"];

function fnContentContainerByExtension(metadata = {}) {
  console.log("fnContentContainerByExtension", metadata);
  const resource = metadata.resource;
  const ext = getExtension(resource);
  console.log("[resource] PATH", ext, resource);

  if (supported_video_formats.includes(ext)) {
    return new AudioContainer({ resource });
  } 
  else if (supported_audio_formats.includes(ext)) {
    return new VideoContainer({ resource });
  } 
  else if (supported_image_formats.includes(ext)) {
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
    this.img = null;
    console.log("ImageContainer", this.resource);
    
    this.addChild(new OverlayText({ text: getFileName(this.resource) }));
    // TODO: update to lightbox viewer instead of opening in a new tab
    // going to need a global handler for this I think
    if (false) {
      this.addChild(new Element(
        "a",
        { props: { target: "_blank", href: this.resource } },
        new Element("img", { props: { src: this.resource } })
      ));
    } else { // this won't work
      this.img = new Element("img", { props: { src: this.resource } });
      
      this.addChild(this.img);
    }
  }
  
  onMount() {
    this.img.dom.addEventListener("click", () => {
      const src = this.img.dom.getAttribute("src");
      console.log("SRC:", src);
      console.log("IndexOf", this._carousel.images.indexOf(src));
      new Lightbox(this._carousel.images, this._carousel.images.indexOf(src)).open();
    });
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
      props: { className: "mediaview-container" },
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
      props: { className: "mediaview" }
    });
    wrapper.render(this._dom);

    // Row container
    const row = new Element("div", {
      props: { className: "mediaview-row" }
    });
    row.render(wrapper._dom);

    // Tiles
    for (const track of tracks) {
      const tile = new Element("div", {
        props: { className: "mediaview-tile" },
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
  constructor(metadata = {}) {
    super("div", {
      css: {},
      props: { className: "mediaview-container" },
      title: metadata.title,
      tracks: metadata.tracks || []
    });
    
    // Build the internal structure
    const { title, tracks } = this.metadata;
    
    this.images = tracks
      .filter(t => supported_image_formats.includes(t.url.split(".").pop().toLowerCase()))
      .map(t => t.url);
    
    // Title
    this.addChild(new Element("h2", {
      css: { marginLeft: "100px" },
      props: { textContent: title }
    }));

    // Carousel wrapper
    const wrapper = new Element("div", {
      css: { background: "black" },
      props: { className: "mediaview" }
    });
    this.addChild(wrapper);

    // Row container
    const row = new Element("div", {
      css: { marginRight: "100px" }, // left works, doesn't work on the right for some reason
      props: { className: "mediaview-row" }
    });
    wrapper.addChild(row);

    // Tiles
    for (const track of tracks) {
      const tile = new Element("div", {
        props: { className: "mediaview-tile" },
        css: { background: getRandomColor() }
      });

      row.addChild(tile);

      // Content inside tile
      const content = fnContentContainerByResource({
        resource: track.url,
      });
      
      // for content to access this.images etc. without duplication (parent reference)
      content._carousel = this;

      tile.addChild(content);
    }
  }
}

// wrapper class for album abstraction
class Carousel extends Element {
  constructor(metadata = {}, ...children) {
    super("div", {}, 
      new CarouselEx({
        title: metadata.album.title,
        tracks: metadata.album.tracks
      })
    );
  }
}
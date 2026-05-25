
class FlexPage extends Box {
  static defaults = {
    css: {},
    props: {},
    base: "",
    logoText: "",
    logoImage: null,
    links: []
  };
  
  constructor(metadata = {}) {
    super(FlexPage.applyDefaults(metadata));
    const { base, logoText, logoImage, links } = this.metadata;
    console.log("Constructing FlexBar...", links);

    this.flexbar = new Element("div", {
      css: {},
      props: { className: "flexbar" }
    });
    
    // --- CLOCK ---
    /*
    const clock = new DigitalClock({
      css: {
        marginLeft: "auto",
        minWidth: "0",
        padding: "0 30px",
        fontFamily: "monospace",
        fontSize: "24px",
        color: "blacK"
      }
    });
    this.flexbar.addChild(clock);
    */
    for (const link of links) {
      console.log("UREL Link:", base + link.href);
      this.flexbar.addChild(
        new Element("a", {
          css: { marginRight: "10px" },
          props: {
            textContent: link.label,
            href: base + link.href,
            className: link.label === "Home" ? "active" : '',
          }
        })
      );
    }

    super.addChild(this.flexbar);
    
    this.content = new Element("div", {
      css: {},
      props: { className: "content" }
    });
    super.addChild(this.content);
    
  }
  
  addChild(elem) {
    this.content.addChild(elem);
    return elem;
  }

  removeChild(elem) {
    this.content.children = this.content.children.filter(c => c !== elem);
  }

  static applyDefaults(metadata) {
    return {
      css: { ...this.defaults.css, ...(metadata.css || {}) },
      props: { ...this.defaults.props, ...({id: 'flexbar-page', className: 'flexbar-page'}) },
      base: metadata.base ?? "",
      logoText: metadata.logoText ?? this.defaults.logoText,
      logoImage: metadata.logoImage ?? this.defaults.logoImage,
      links: metadata.links ?? this.defaults.links,
    };
  }
}

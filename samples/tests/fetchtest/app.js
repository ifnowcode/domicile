// testing ground for strings and numbers as children
const dcbase = "/domicile1";

(async () => {
  const text = await minFetch(
    "/src/pages/reviews.md", 
    { 
      base: "/js/rnd/domicile/domicile1",
      parse: "text",
    }
  );
  console.log("FETCH >>>>>>>>>>>>>>>>>>>>>", text);
})();

class SafeContentLoader extends HTMLBox {
  constructor(metadata = {}) {
    super(metadata);
    this.base = metadata.base || '';
    this.src = metadata.src;
    this.isMarkdown = metadata.isMarkdown || false;
    this.sanitize = metadata.sanitize || true;
    this.load(this.src);
  }
  
  async load(source) {
    let text = "";
    if (false) {
      text = await safeFetch(source, { base: this.base, parse: "text"});
    } else {
      // this works and also wraps safeFetch *******
      const api = new SafeFetch({ base: this.base });
      text = await api.get( source, { parse: "text" });
    }
    console.log("Fetch succeeded!", text);
    
    let html = text;
    if (this.isMarkdown) {
      html = marked.parse(html);
      if (this.sanitize) html = DOMPurify.sanitize(html);
    } else {
      if (this.sanitize) html = DOMPurify.sanitize(html);
    }

    this.setHTML(this.docify(html));
  }
}

// what I learned here I back-ported to 
// use SafeContentLoader for further fetch development
// currently it BVT's the SafeFetch class
// leave on ContentLoader for BVT testing
const content = new ContentLoader({
        base: dcbase,
        src: "/src/pages/reviews.md",
        isMarkdown: true,
        css: {margin: "20px"},
        props: {className: "markdown-box"}
      })
      
content.render(document.body);


document.body.style.color = "#eee";
document.body.style.backgroundColor = "#111";
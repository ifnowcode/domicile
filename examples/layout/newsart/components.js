
class NewsArticle extends Box {
  constructor({ title, article, image, direction = "row", imageFirst=true }) {
    super({ 
      css: {
        display: "flex",
        flexDirection: direction,
        alignItems: "flex-start",
        gap: "0",
        padding: "10px",
        margin: "0",
        borderBottom: "1px dashed #333",
        width: "100%",
        boxSizing: "border-box",
        background: "#F1E9D2",
        color: "black"
      }
    });
    
    let img = null;
    // Optional image
    if (image) {
      img = new ImageBox({
          props: { src: image, alt: title },
          css: {
            width: direction === "column" ? "280px" : "140px",
            height: direction === "column" ? "200px" : "100px",
            objectFit: "cover",
            marginRight: "12px",
            flexShrink: 0
          }
      })
    }

    // Text column
    const text = new Box({ css: {
      display: "flex",
      flexDirection: "column",
      padding: "0",
      margin: "0",
      gap: "4px",
      flex: "1"
    }});
    
    text.addChild(
      new Box({
        props: { textContent: title },
        css: {
          fontSize: "18px",
          fontWeight: "600",
          lineHeight: "1.2",
          margin: "0",
          padding: "0"
        }
      }),
      new Box({
        props: { textContent: article },
        css: {
          fontSize: "14px",
          lineHeight: "1.4",
          margin: "0",
          padding: "0"
        }
      })
    );
    
    if (imageFirst) {
      if (image) this.addChild(img);
      this.addChild(text);
    } else {
      this.addChild(text);
      if (image) this.addChild(img);
    }

    // Partial-width border (modern news look)
    this.afterRender = () => {
      this.dom.style.borderBottom = "none";

      const divider = document.createElement("div");
      divider.style.width = "70%";
      divider.style.height = "1px";
      divider.style.background = "#ddd";
      divider.style.margin = "20px auto 0 auto";

      this.dom.appendChild(divider);
    };
  }
}


class FlexibleColumnsPage extends Box {
  constructor({ columns }) {
    super({ css: {
      display: "flex",
      flexWrap: "wrap",
      gap: "0",
      padding: "0",
      margin: "0",
      width: "100%",
      boxSizing: "border-box",
      background: "#F1E9D2", // parchment
      color: "black",
    }});

    this.columns = columns;
    this.addColumns();
  }

  onMount() {
    const update = () => {
      const w = this.dom.clientWidth;

      if (w < 700) {
        this.dom.style.flexDirection = "column";
        this.children.forEach(col => col.dom.style.width = "100%");
      } else {
        this.dom.style.flexDirection = "row";
        this.children.forEach((col, i) => {
          col.dom.style.width = this.columns[i].width;
        });
      }
    };

    this._observer = new ResizeObserver(update);
    this._observer.observe(this.dom);
    update();
  }

  onUnmount() {
    if (this._observer) this._observer.disconnect();
  }

  addColumns() {
    for (const col of this.columns) {
      const colBox = new Box({ css: {
        display: "flex",
        flexDirection: "column",
        gap: "0",
        padding: "0",
        margin: "0"
      }});

      col.items.forEach(item => colBox.addChild(item));
      this.addChild(colBox);
    }
  }
}


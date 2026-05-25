class Element {
  constructor(token, children=[], {style={}, props={}}={}) {
    this.token = token;
    this.style = { ...this.constructor.defaultStyle, ...style };
    this.props = { ...this.constructor.defaultProps, ...props };
    this.children = children;
    this._dom = null;
  }
  
  static defaultStyle = {
    //display: "inline"
  };
  
  render(container) {
    this._dom = document.createElement(this.token);
    this._dom._comp = this;
    Object.assign(this._dom.style, this.style);
    Object.assign(this._dom, this.props);
    console.log("Render", this._dom, this.children);
    for (const child in this.children) {
      console.log("Render child", this.children[child]);
      this.children[child].render(this._dom);
    }
    container.appendChild(this._dom);
  }
}

class Box extends Element {
  constructor(children=[], {style={}, props={}}={}) {
    console.log("Children", children);
    super('div', children=children, {style: style, props:props});
  }
}

class Widget extends Box {
  constructor({style={}, props={}}={}) {
    super([], {style: style, props:props});
    console.log("Children", this.children);
    this.children.push(new Element('p', [], {style: {background: 'red'}, props: {id: 'frag', textContent: "Fubar", className: 'bitch'} }));
    this.children.push(new Element('img', [], {style: {display: 'inherit'}, props: {src: 'granite-raw-block-250x250.jpg'} }));
    this.children.push(new Element('img', [], {style: {display: 'inherit'}, props: {src: 'granite-raw-block-250x250.jpg'} }));
  }
  
  static defaultStyle = {
    display: "inline"
  };
}

if (false) {
  let p = new Element('p', [], {style: {background: 'red'}, props: {id: 'frag', textContent: "Fubar", className: 'bitch'} });
  let img1 = new Element('img', [], {style: {display: 'inherit'}, props: {src: 'granite-raw-block-250x250.jpg'} });
  let img2 = new Element('img', [], {style: {display: 'inherit'}, props: {src: 'granite-raw-block-250x250.jpg'} });

  let box = new Box([p, img1, img2], {style: {display: 'inline'}});
  box.render(document.body);
} else {
  let w = new Widget();
  w.render(document.body);
}


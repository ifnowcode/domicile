const layout = new ResponsiveSideNavLayout();

layout.addTo("sidebar", new Element("ul", {}, 
  new Element("li", {}, 
    new Element("a", { href: "#" }, 
      new Element("i", { className: "fa fa-home" }),
      new Element("span", { text: "Home" })
    )
  ),
  new Element("li", {}, 
    new Element("a", { href: "#" }, 
      new Element("i", { className: "fa fa-envelope" }),
      new Element("span", { text: "Messages" })
    )
  ),
  new Element("li", {}, 
    new Element("a", { href: "#" }, 
      new Element("i", { className: "fa fa-cog" }),
      new Element("span", { text: "Settings" })
    )
  )
));

layout.addTo("main", new Element("header", { className: "main-header" }, [
  new Element("h1", { text: "Welcome" })
]));

layout.addTo("main", new Element("div", { className: "main-content" }, [
  new Element("section", { text: "Lorem ipsum dolor sit amet..." }),
  new Element("section", { text: "Lorem ipsum dolor sit amet..." })
]));

const layout2 = new ResponsiveSideNavLayout();
layout2.render(document.getElementById("root"));


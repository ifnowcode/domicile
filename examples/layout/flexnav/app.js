const page = [];
const base = "/js/rnd/domicile/examples/layout/flexnav"

const flexpage = new FlexPage({
  base,
  logoText: "FlexPage",
  links: [
    { label: "Home", href: "/" },
    { label: "Articles", href: "/articles" },
    { label: "Contact", href: "/contact" },
    { label: "About", href: "/about" },
  ]
});

/*
flexpage.addChild(new Element("h2", { props: { textContent: "Responsive Sidebar Example"}}));
flexpage.addChild(new Element("p", { props: { textContent: "This example use media queries to transform the sidebar to a top navigation bar when the screen size is 700px or less."}}));
flexpage.addChild(new Element("p", { props: { textContent: "We have also added a media query for screens that are 400px or less, which will vertically stack and center the navigation links."}}));
flexpage.addChild(new Element("h3", { props: { textContent: "Resize the browser window to see the effect."}}));
*/
flexpage.addChild(
  new Box(
    {
      css: {
        margin: '10px',
        background: '#151515',
        boxShadow: "0px 8px 16px rgba(0,0,0,0.2)",
      },
      props: { id: "article-box", className: 'rescontainer'}
    },
      // LEFT COLUMN — Image
      new Box({
        props: {
          className: 'reschild50',
        }},
        new Element("a",
          { props: { href: "https://ifnowcode.github.io", target: "_blank" } },
          new ImageBox({
            css: { padding: '20px', display: 'block', margin: 'auto'},
            props: { src: "../../../domicile1/images/granite-raw-block-250x250.jpg" }
          })
        ),
      ),
      // RIGHT COLUMN — Markdown Content
      new Box( { css: { margin: '10px'}},
        new ContentLoader({
          base,
          src: "./reviews.md",
          isMarkdown: true
        })
      )
  )
);
page.push(flexpage);

Object.entries(page).forEach(([key, value]) => {
  console.log("Render", key, value);
  value.render(document.getElementById('root'));
});
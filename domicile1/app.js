const base = "/js/rnd/domicile/domicile1";
//const base = "/domicile1";
const imagerelurl = "./images/";
const cssrelurl = "./css/";
const jsrelpath = "./js/";
let navbar = null;

const PUBLIC_ENDPOINTS = [
  { name: "JSONPlaceholder Posts", url: "https://jsonplaceholder.typicode.com/posts" },
  { name: "JSONPlaceholder Users", url: "https://jsonplaceholder.typicode.com/users" },
  { name: "JSONPlaceholder Todos", url: "https://jsonplaceholder.typicode.com/todos" },
  { name: "Public APIs Directory", url: "https://api.publicapis.org/entries" },
  { name: "Public APIs Categories", url: "https://api.publicapis.org/categories" },
  { name: "Random Public API", url: "https://api.publicapis.org/random" }
];


function getFlowerImageAlbum() {
   return {'title': 'Flowers', 'tracks': [
      {'url': 'sources/imagesex/Gallery/Flowers/external-content.duckduckgo.com.jpg', 'category': '', 'title': '', 'creator': '', 'type': '', 'size': 0},
      {'url': 'sources/imagesex/Gallery/Flowers/220108_web.jpg', 'category': '', 'title': '', 'creator': '', 'type': '', 'size': 0},
      {'url': 'sources/imagesex/Gallery/Flowers/FRjE9VYUUAAkpFd.jpg', 'category': '', 'title': '', 'creator': '', 'type': '', 'size': 0},
      {'url': 'sources/imagesex/Gallery/Flowers/pexels-photo-1122626b.jpg', 'category': '', 'title': '', 'creator': '', 'type': '', 'size': 0},
      {'url': 'sources/imagesex/Gallery/Flowers/pexels-photo-133472.jpg', 'category': '', 'title': '', 'creator': '', 'type': '', 'size': 0},
      {'url': 'sources/imagesex/Gallery/Flowers/pexels-photo-3686216.jpg', 'category': '', 'title': '', 'creator': '', 'type': '', 'size': 0},
      {'url': 'sources/imagesex/Gallery/Flowers/pexels-photo-369433.jpg', 'category': '', 'title': '', 'creator': '', 'type': '', 'size': 0},
      {'url': 'sources/imagesex/Gallery/Flowers/pexels-photo-4041409.jpg', 'category': '', 'title': '', 'creator': '', 'type': '', 'size': 0},
      {'url': 'sources/imagesex/Gallery/Flowers/_117100719_flower_bloom_02.jpg', 'category': '', 'title': '', 'creator': '', 'type': '', 'size': 0},
   ]}
}

function getMiscVideoAlbum() {
   return {'title': 'Misc Videos', 'tracks': [
      {'url': 'sources/videosex/pCloud.mp4', 'category': '', 'title': '', 'creator': '', 'type': '', 'size': 0},
      {'url': 'sources/videosex/Sound – visualising sound waves — Science Learning Hub.mp4', 'category': '', 'title': '', 'creator': '', 'type': '', 'size': 0},
      {'url': 'sources/videosin/external/frog_drums_m2-res_480p.mp4', 'category': '', 'title': '', 'creator': '', 'type': '', 'size': 0},
      {'url': 'sources/videosin/external/Deep Layered Brown Noise ( 6 Hours ).mp4', 'category': '', 'title': '', 'creator': '', 'type': '', 'size': 0},
   ]}
}

function getTestMediaAlbum() {
   return {'title': 'Test Media', 'tracks': [
      {'url': 'sources/videosex/pCloud.mp4', 'category': '', 'title': '', 'creator': '', 'type': '', 'size': 0},
      {'url': 'https://repo01/personal/', 'category': '', 'title': '', 'creator': '', 'type': '', 'size': 0},
      {'url': 'sources/videosin/external/frog_drums_m2-res_480p.mp4', 'category': '', 'title': '', 'creator': '', 'type': '', 'size': 0},
      {'url': 'https://www.yahoo.com/', 'category': '', 'title': '', 'creator': '', 'type': '', 'size': 0},
      {'url': 'sources/imagesex/Gallery/Flowers/pexels-photo-1122626b.jpg', 'category': '', 'title': '', 'creator': '', 'type': '', 'size': 0},
      {'url': 'https://www.w3schools.com/html/movie.mp4', 'category': '', 'title': '', 'creator': '', 'type': '', 'size': 0},
      {'url': 'https://www.youtube.com/embed/Jodz2hUIYTg', 'category': '', 'title': '', 'creator': '', 'type': '', 'size': 0},
      {'url': 'sources/audioex/Microsoft_Jam/Jam Evolution Studios 01_09_09/Set 1_0506_01.mp3', 'category': '', 'title': '', 'creator': '', 'type': '', 'size': 0},
      {'url': 'sources/imagesin/pictures/CanonG11/20100112/20100112 001.jpg', 'category': '', 'title': '', 'creator': '', 'type': '', 'size': 0},
      {'url': 'sources/imagesin/foo/bar/temporary/file/that/is/too/long/for/the/tile/error', 'category': '', 'title': '', 'creator': '', 'type': '', 'size': 0},
      {'url': 'sources/imagesin/foo/foobarbaz.pis', 'category': '', 'title': '', 'creator': '', 'type': '', 'size': 0},
      {'url': 'itiles_ad_tile.html', 'category': '', 'title': '', 'creator': '', 'type': '', 'size': 0},
      {'url': 'tile', 'category': '', 'title': '', 'creator': '', 'type': '', 'size': 0},
   ]}
}

function getMasterTracksAlbum() {
   return {'title': 'Master Tracks', 'tracks': [
      {'url': 'sources/audioin/music/original/mastertracks/WinterNight.wav', 'category': '', 'title': '', 'creator': '', 'type': '', 'size': 0},
      {'url': 'sources/audioin/music/original/mastertracks/Sunset.wav', 'category': '', 'title': '', 'creator': '', 'type': '', 'size': 0},
      {'url': 'sources/audioin/music/original/mastertracks/Shift.wav', 'category': '', 'title': '', 'creator': '', 'type': '', 'size': 0},
      {'url': 'sources/audioin/music/original/mastertracks/Shredder.wav', 'category': '', 'title': '', 'creator': '', 'type': '', 'size': 0},
      {'url': 'sources/audioin/music/original/mastertracks/Star.wav', 'category': '', 'title': '', 'creator': '', 'type': '', 'size': 0},
      {'url': 'sources/audioin/music/original/mastertracks/Cry.wav', 'category': '', 'title': '', 'creator': '', 'type': '', 'size': 0},
      {'url': 'sources/audioin/music/original/mastertracks/Future.wav', 'category': '', 'title': '', 'creator': '', 'type': '', 'size': 0},
      {'url': 'sources/audioin/music/original/mastertracks/SlowYourRoll.wav', 'category': '', 'title': '', 'creator': '', 'type': '', 'size': 0},
      {'url': 'sources/audioin/music/original/mastertracks/IMissYou.wav', 'category': '', 'title': '', 'creator': '', 'type': '', 'size': 0},
      {'url': 'sources/audioin/music/original/mastertracks/Shuffle.wav', 'category': '', 'title': '', 'creator': '', 'type': '', 'size': 0},
      {'url': 'sources/audioin/music/original/mastertracks/S2.wav', 'category': '', 'title': '', 'creator': '', 'type': '', 'size': 0},
      {'url': 'sources/audioin/music/original/mastertracks/Phoenix.wav', 'category': '', 'title': '', 'creator': '', 'type': '', 'size': 0},
      {'url': 'sources/audioin/music/original/mastertracks/MoreBlues.wav', 'category': '', 'title': '', 'creator': '', 'type': '', 'size': 0},
      {'url': 'sources/audioin/music/original/mastertracks/BlueRoller.wav', 'category': '', 'title': '', 'creator': '', 'type': '', 'size': 0},
      {'url': 'sources/audioin/music/original/mastertracks/CantSay.wav', 'category': '', 'title': '', 'creator': '', 'type': '', 'size': 0},
      {'url': 'sources/audioin/music/original/mastertracks/BelieveMe.wav', 'category': '', 'title': '', 'creator': '', 'type': '', 'size': 0},
      {'url': 'sources/audioin/music/original/mastertracks/Halleluya.wav', 'category': '', 'title': '', 'creator': '', 'type': '', 'size': 0},
      {'url': 'sources/audioin/music/original/mastertracks/ImCommingHome.wav', 'category': '', 'title': '', 'creator': '', 'type': '', 'size': 0},
      {'url': 'sources/audioin/music/original/mastertracks/OnlyOne.wav', 'category': '', 'title': '', 'creator': '', 'type': '', 'size': 0},
      {'url': 'sources/audioin/music/original/mastertracks/OnMyMind.wav', 'category': '', 'title': '', 'creator': '', 'type': '', 'size': 0},
      {'url': 'sources/audioin/music/original/mastertracks/Reggae.wav', 'category': '', 'title': '', 'creator': '', 'type': '', 'size': 0},
      {'url': 'sources/audioin/music/original/mastertracks/StrengthEnough.wav', 'category': '', 'title': '', 'creator': '', 'type': '', 'size': 0},
      {'url': 'sources/audioin/music/original/mastertracks/TheRhythmOf.wav', 'category': '', 'title': '', 'creator': '', 'type': '', 'size': 0},
   ]}
}

async function loadAllBlogPosts() {
  // 1. Load index.json
  const indexRes = await fetch("./build/blog/index.json");
  console.log("${indexRes}", indexRes);
  const files = await indexRes.json();

  const posts = [];

  for (const file of files) {
    const url = `./build/blog/${file}`;

    // 2. Load HTML content
    const res = await fetch(url);
    const html = await res.text();

    // 3. Extract metadata from filename
    const match = file.match(/^(\d{14})-(.+)\.html$/);
    if (!match) continue;

    const timestamp = match[1];
    const rawTitle = match[2];
    const title = rawTitle.replace(/_/g, " ");

    // 4. Wrap in a DOMicile Box
    const box = new HTMLBox({ html });

    // 5. Push into array
    posts.push({
      timestamp,
      url,
      file,
      title,
      box
    });
  }

  // 6. Sort newest → oldest
  posts.sort((a, b) => b.timestamp.localeCompare(a.timestamp));

  return posts;
}

const runAsync = true;

let run_app = true; // false for scratch pad
let no_router = false; // true for no router (original pre-router structure)

if(run_app) {
  if (no_router) {
    const page = [];
    console.log("${window.location.origin}:", window.location.origin);
    console.log("${base}:", base);
    let fullpdir = window.location.origin + base;
    console.log("${fullpdir}:", fullpdir);
    let url = window.location.href;
    console.log("${url}:", url);
    let base = url.slice(0, fullpdir.length);
    let local = url.slice(fullpdir.length);
    console.log("${base}:", base);
    console.log("${local}:", local);
    if (local === '/') {
      page.push(new dep_NavBar());
      page.push(new DemoWidget());
      page.push(new ImageBox( {props: { src: "granite-raw-block-250x250.jpg" }}));
      page.push(new Element('br'));
      page.push(new Button( {props: {textContent: "Click Me!", onclick: () => console.log("Hello!")}} ));
      page.push(new Element('a', { css: {display: 'block'}, props: {target: '_blank', textContent: "github.ifnowcode", href: "https://github.com/ifnowcode"}}));
      page.push(new Element('a', { css: {display: 'block'}, props: {target: '_blank', textContent: "ifnowcode.github.io", href: "https://ifnowcode.github.io"}}));
    } else if (local === '/about') {
      page.push(new NavBar());
      data = {
        columns: [
          { key: "name", label: "Name" },
          { key: "mass", label: "Mass" }
        ],
        rows: [
          { name: "Alice", mass: 42 },
          { name: "Bob", mass: 55 },
          { name: "Jan", mass: 80 },
          { name: "Tyler", mass: 15 },
        ]
      }
      page.push(new Element('h1', { props: {textContent: "About Us"}}));
      let table = new Table(data);
      page.push(table);
      setTimeout(() => table.addRow({name: "Fred", mass:200 }), 2000);
      setTimeout(() => table.addRow({name: "John", mass:100 }), 4000);
    }

    Object.entries(page).forEach(([key, value]) => {
      console.log("Render", key, value);
      value.render(document.body);
    });

    Object.entries(page).forEach(([key, value]) => {
      console.log("Serialize", value.toJSON());
    });

  } else {

    function ApiBrowserPage() {
      const dropdown = new Element("select", {
        props: {
          onchange: (e) => loadEndpoint(e.target.value)
        }
      });

      // Populate dropdown
      PUBLIC_ENDPOINTS.forEach(ep => {
        dropdown.addChild(
          new Element("option", {
            props: { value: ep.url, textContent: ep.name }
          })
        );
      });

      const output = new Box({
        css: { padding: "20px", whiteSpace: "pre-wrap", fontFamily: "monospace" },
        props: { textContent: "Select an endpoint above." }
      });

      function loadEndpoint(url) {
        const loader = new RESTLoader(url);

        output.props.textContent = "Loading...";
        output.refresh();

        loader.onLoad = data => {
          output.props.textContent = JSON.stringify(data, null, 2);
          output.refresh();
        };
      }

      return [
        new Box({ css: { padding: "20px" } },
          new Element("h2", { props: { textContent: "Public API Browser" } }),
          dropdown,
          output
        )
      ];
    }

    async function BlogPageDLAsync() {
      console.log("** BlogPageDLAsync");
      const i = new IndexLoader(base + "/build/blog");
      const posts = await i.loadIndex();
      console.log("** DL Post", posts);
      /*
      const container = new Box({
        css: { display: "flex", flexDirection: "column", gap: "40px" }
      });

      posts.forEach(post => {
        console.log("[file] ** Add Loader", post);
        container.addChild(post.box);
      });
      return [container];
      */
      return posts.map(p => p.box);
    }

    async function BlogPageDLAsync2() {
      console.log("** BlogPageDLAsync");
      const loader = new IndexLoader(base + "/build/blog", true);
      console.log("** onLoad DL Post");
      loader.onLoad = posts => {
        console.log("Loader onLoad");
      };
      return []; // doesn't look like this was ever working
    }

    function PostsPage() {
      console.log("PostsPage loading...");
      const loader = new RESTLoader("http://localhost:3000/api/posts");

      const box = new Box({
        css: { padding: "20px" },
        props: { id: 'posts', className: 'post-office', textContent: "Loading posts..." }
      });

      loader.onLoad = posts => {
        console.log("Loader onload", posts);
        box.children = []; // clear
        posts.forEach(post => {
          box.addChild(
            new Box({
                css: { marginBottom: "20px" },
                props: { className: 'post-box' }
              },
              new Element("h2", { props: { textContent: post.title } }),
              new Element("p", { props: { textContent: post.body } })
            )
          );
          box.addChild(new Element('hr'));
        });
        box.refresh();
      };

      return [box];
    }

    function HomePage() {
      const layout = new TwoColumnResponsiveLayout({
        css: {
          margin: "10px",
          background: "#151515",
          boxShadow: "0px 8px 16px rgba(0,0,0,0.2)"
        },
        props: { id: "article-box", className: "rescontainer" }
      });

      layout.addTo(
        "left",
        new Element(
          "a",
          { props: { href: "https://ifnowcode.github.io", target: "_blank" } },
          new ImageBox({
            css: { padding: "20px", display: "block", margin: "auto" },
            props: { src: "./images/granite-raw-block-250x250.jpg" }
          })
        )
      );

      layout.addTo(
        "right",
        new ContentLoader({
          base: base,
          src: "/src/pages/reviews.md",
          isMarkdown: true,
          css: {margin: "20px"},
          props: {className: "markdown-box"}
        })
      );

      return [layout];
    }

    function HomePage1() {
        return [
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
                    props: { src: "./images/granite-raw-block-250x250.jpg" }
                  })
                ),
              ),
              // RIGHT COLUMN — Markdown Content
              new Box( { css: { margin: '10px'}, /*props: {className: 'reschild50'}*/},
                new ContentLoader({
                  base: base,
                  src: "/src/pages/reviews.md",
                  isMarkdown: true
                })
              )
          )
        ];
    }

    function SlidesPage() {
      const slideshow = new ManualSlideshow({ images: [
        'sources/imagesex/Gallery/Flowers/external-content.duckduckgo.com.jpg',
        'sources/imagesex/Gallery/Flowers/220108_web.jpg',
        'sources/imagesex/Gallery/Flowers/FRjE9VYUUAAkpFd.jpg',
        'sources/imagesex/Gallery/Flowers/pexels-photo-1122626b.jpg',
        'sources/imagesex/Gallery/Flowers/pexels-photo-133472.jpg',
        'sources/imagesex/Gallery/Flowers/pexels-photo-3686216.jpg',
        'sources/imagesex/Gallery/Flowers/pexels-photo-369433.jpg',
        'sources/imagesex/Gallery/Flowers/pexels-photo-4041409.jpg',
        'sources/imagesex/Gallery/Flowers/_117100719_flower_bloom_02.jpg',
      ]});

      const advshow = new AdvancedSlideshow({ images: [
        { src: 'sources/imagesex/Gallery/Flowers/external-content.duckduckgo.com.jpg', caption: "Caption Text" },
        { src: 'sources/imagesex/Gallery/Flowers/220108_web.jpg', caption: "Caption Two" },
        { src: 'sources/imagesex/Gallery/Flowers/FRjE9VYUUAAkpFd.jpg', caption: "Caption Three" }
      ]});

      const gallery = new ThumbnailSlideshow({ images: [
        'sources/imagesex/Gallery/Flowers/external-content.duckduckgo.com.jpg',
        'sources/imagesex/Gallery/Flowers/220108_web.jpg',
        'sources/imagesex/Gallery/Flowers/FRjE9VYUUAAkpFd.jpg',
        'sources/imagesex/Gallery/Flowers/pexels-photo-1122626b.jpg',
        'sources/imagesex/Gallery/Flowers/pexels-photo-133472.jpg',
        'sources/imagesex/Gallery/Flowers/pexels-photo-3686216.jpg',
        'sources/imagesex/Gallery/Flowers/pexels-photo-369433.jpg',
        'sources/imagesex/Gallery/Flowers/pexels-photo-4041409.jpg',
        'sources/imagesex/Gallery/Flowers/_117100719_flower_bloom_02.jpg',
      ]});

      const grid = new ResponsiveImageGrid([
        [
          'sources/imagesex/Gallery/Flowers/external-content.duckduckgo.com.jpg',
          'sources/imagesex/Gallery/Flowers/220108_web.jpg',
          'sources/imagesex/Gallery/Flowers/FRjE9VYUUAAkpFd.jpg',
        ],
        [
          'sources/imagesex/Gallery/Flowers/pexels-photo-1122626b.jpg',
          'sources/imagesex/Gallery/Flowers/pexels-photo-3686216.jpg',
        ],
        [
          'sources/imagesex/Gallery/Flowers/pexels-photo-133472.jpg',
          'sources/imagesex/Gallery/Flowers/pexels-photo-369433.jpg',
        ],
        [
          'sources/imagesex/Gallery/Flowers/pexels-photo-4041409.jpg',
          'sources/imagesex/Gallery/Flowers/_117100719_flower_bloom_02.jpg',
        ]
      ]);

      const magic = new MasonryImageGrid({ images: [
        'sources/imagesex/Gallery/Flowers/external-content.duckduckgo.com.jpg',
        'sources/imagesex/Gallery/Flowers/220108_web.jpg',
        'sources/imagesex/Gallery/Flowers/FRjE9VYUUAAkpFd.jpg',
        'sources/imagesex/Gallery/Flowers/pexels-photo-1122626b.jpg',
        'sources/imagesex/Gallery/Flowers/pexels-photo-133472.jpg',
        'sources/imagesex/Gallery/Flowers/pexels-photo-3686216.jpg',
        'sources/imagesex/Gallery/Flowers/pexels-photo-369433.jpg',
        'sources/imagesex/Gallery/Flowers/pexels-photo-4041409.jpg',
        'sources/imagesex/Gallery/Flowers/_117100719_flower_bloom_02.jpg',
      ]});

      const lightbox = new LightboxViewer({ images: [
        'sources/imagesex/Gallery/Flowers/external-content.duckduckgo.com.jpg',
        'sources/imagesex/Gallery/Flowers/220108_web.jpg',
        'sources/imagesex/Gallery/Flowers/FRjE9VYUUAAkpFd.jpg',
        'sources/imagesex/Gallery/Flowers/pexels-photo-1122626b.jpg',
        'sources/imagesex/Gallery/Flowers/pexels-photo-133472.jpg',
        'sources/imagesex/Gallery/Flowers/pexels-photo-3686216.jpg',
        'sources/imagesex/Gallery/Flowers/pexels-photo-369433.jpg',
        'sources/imagesex/Gallery/Flowers/pexels-photo-4041409.jpg',
        'sources/imagesex/Gallery/Flowers/_117100719_flower_bloom_02.jpg',
      ]});

      const carousel = new PictureCarousel([
        'sources/imagesex/Gallery/Flowers/external-content.duckduckgo.com.jpg',
        'sources/imagesex/Gallery/Flowers/220108_web.jpg',
        'sources/imagesex/Gallery/Flowers/FRjE9VYUUAAkpFd.jpg',
        'sources/imagesex/Gallery/Flowers/pexels-photo-1122626b.jpg',
        'sources/imagesex/Gallery/Flowers/pexels-photo-133472.jpg',
        'sources/imagesex/Gallery/Flowers/pexels-photo-3686216.jpg',
        'sources/imagesex/Gallery/Flowers/pexels-photo-369433.jpg',
        'sources/imagesex/Gallery/Flowers/pexels-photo-4041409.jpg',
        'sources/imagesex/Gallery/Flowers/_117100719_flower_bloom_02.jpg',
      ]);

      return [
          new SlideshowDemo(),
          carousel,
          slideshow,
          advshow,
          gallery,
          grid,
          magic,
          lightbox,
        ];
    }

    function CarouselPage() {
      return [
          new CarouselDemo({ album: getFlowerImageAlbum() }),
          new CarouselDemo({ album: getMiscVideoAlbum() }),
          new CarouselDemo({ album: getMasterTracksAlbum() }),
          new CarouselDemo({ album: getTestMediaAlbum() }),
        ];
    }

    function Test1Tab() {
      return [
          new DemoWidget(),
          new Element("a", { props: { href: "https://ifnowcode.github.io", target: "_blank" }}, new ImageBox({ props: { src: imagerelurl + "granite-raw-block-250x250.jpg" }})),
          new Element("br"),
          new Button({ props: { textContent: "Click Me!", onclick: `alert("Leave me alone!")` }}),
          new ButtonCounter({css: { background: 'red' }}),
          new Element("a", { css: { display: "block" }, props: { href: "https://github.com/ifnowcode", target: "_blank", textContent: "github.ifnowcode" }}),
          new Element("a", { css: { display: "block" }, props: { href: "https://ifnowcode.github.io", target: "_blank", textContent: "ifnowcode.github.io" }}),
        ]
    }

    function Test2Tab() {
      return [
        new ListWithControls({
          initialItems: ['First task', 'Second task', 'Third task']
        }),
        new ModalDemo(),
        new GridLayoutDemo(),
      ];
    }

    function Test3Tab() {
      const data = {
        columns: [
          { key: "name", label: "Name" },
          { key: "mass", label: "Mass" }
        ],
        rows: [
          { name: "Alice", mass: 42 },
          { name: "Bob", mass: 55 },
          { name: "Jan", mass: 80 },
          { name: "Tyler", mass: 15 }
        ]
      };

      const table = new Table(data);

      setTimeout(() => table.addRow({ name: "Fred", mass: 200 }), 2000);
      setTimeout(() => table.addRow({ name: "John", mass: 100 }), 4000);

      return [
        new DigitalClock(),
        new Element("p", { props: { textContent: "Test content" } }),
        new Box({}, table),
        new Element('br'),
        new Element('hr'),
        //new Table2(data),
      ];
    }

    function Test4Tab() {
      return [
        new HTMLBox({ html: "<h1>This is Test4</h1>" }),
        new Typewriter(),
        new Calendar({
          onSelect: ({ year, month, day }) => {
            console.log("Selected:", year, month + 1, day);
          }
        }),
      ];
    }

    function getTab(fnPageContents=Error404Page) {
      const tab = [];
      //tab.push(new NavBar());
      const contents = fnPageContents();
      contents.forEach((key,value) => {
        tab.push(key);
      });
      //tab.push(new Footer());
      return tab;
    }

    function TestPage() {
      const tabbed = new TabbedWidget({
        tabs: [
          { label: "Test1", content: getTab(Test1Tab)},
          { label: "Test2", content: getTab(Test2Tab)},
          { label: "Test3", content: getTab(Test3Tab)},
          { label: "Test4", content: getTab(Test4Tab)},
        ]
      });

      return [
          tabbed,
        ];
    }

    function AboutPage() {

      return [
        new Box( {},
          new ContentLoader({
            base: base,
            src: "/src/pages/about.md",
            isMarkdown: true
          })
        ),
      ];
    }

    function ContactPage() {

      return [
        new Box( {},
          new ContentLoader({
            base: base,
            src: "/src/pages/contact.md",
            isMarkdown: true
          })
        ),
        new Contact(),
      ];
    }

    function TBDPage() {
      return [
          new UnderConstruction(),
        ];
    }

    function Error404Page() {
      return [
          new NotFound404({ base: base }),
        ];
    }

    function BlogPage() {
      return [
        new ContentLoader({ base: base, src: "/src/pages/blog/20260130204559-D1_Wrestling_With_Async_and_the_Serial_Mindset.md", isMarkdown: true }),
        new ContentLoader({ base: base, src: "/build/blog/20260131002345-D2_Understanding_the_Browsers_Real_Limits.html", isMarkdown: false }),
        new ContentLoader({ base: base, src: "/src/pages/blog/20260131011300-D3_The_ContentLoader_Epiphany.md", isMarkdown: true }),
        new ContentLoader({ base: base, src: "/src/pages/blog/20260131011301-D4_Accepting_the_Frontends_Boundaries.md", isMarkdown: true }),
        new ContentLoader({ base: base, src: "/src/pages/blog/20260131011302-D5_The_Architecture_Finally_Clicks.md", isMarkdown: true }),
      ];
    }

    async function BlogPageAsync() {
      console.log("loadAllBlogPosts");
      const posts = await loadAllBlogPosts(); // async
      console.log("Posts", posts);
      return posts.map(p => p.box);
    }

    function BlogTemplate(contents = []) {
      let modcontent = [];
      for (const content of contents) {
        modcontent.push(content);
        modcontent.push(new Element('hr'));
      }
      return PageTemplate(modcontent);
    }

    function PageTemplate(contents = []) {
      const page = [];

      const color = getRandomColor();

      console.log("UREL:", base, color);

      navbar = new NavBarTopHoverDD1X({
        base: base,
        logoText: "DOMicile",
        logoHTML: `<span style="color:${color};"><b>DOM</b></span>icile`,
        //logoImage: imagerelurl + '/house-9131573_1920.png',
        menus: [
          { label: "Home", href: "/" },
          { label: "Media", items: [
            { label: "Slides", href: "/slides" },
            { label: "Carousel", href: "/carousel" },
           ] },
          { label: "Pages", items: [
            { label: "Blog", href: "/blog" },
            { label: "Blog1", href: "/blog1" },
            { label: "Blog2", href: "/blog2" },
            { label: "Blog3", href: "/blog3" },
            { label: "Posts", href: "/posts" },
            { label: "API Browser", href: "/api-browser" },
           ] },
          { label: "Tests", items: [
            { label: "Test", href: "/test" },
            { label: "More", items: [
              { label: "Test1", href: "/test" },
              { label: "And More", items: [
                { label: "Test1", href: "/test" },
              ] },
            ] },
            { label: "Test2", href: "/test" },
            { label: "Yet More", items: [
              { label: "And More", items: [
                { label: "Test1", href: "/test" },
              ] },
              { label: "Test1", href: "/test" },
            ] },
            { label: "Still More", items: [
              { label: "Test1", href: "/test" },
            ] },
           ] },
          { label: "About Us", items: [
            { label: "Contact", href: "/contact" },
            { label: "About", href: "/about" },
           ] },
        ]
      });
      page.push(navbar);

      contents.forEach(widget => page.push(widget));

      page.push(new Footer());

      return page;
    }

    function getPage(fnPageContents=Error404Page) {
      const page = [];
      //page.push(new NavBar());
      //page.push(new NavBar2());
      page.push(new NavBarLink({
        base: base,
        logoText: "DOMicile",
        logoImage: null, // "/assets/logo.png" or null if no image
        links: [
          { label: "Home", href: "/" },
          { label: "Slides", href: "/slides" },
          { label: "Carousel", href: "/carousel" },
          { label: "Blog", href: "/blog" },
          { label: "Test", href: "/test" },
          { label: "About", href: "/about" }
        ]
      }));
      const contents = fnPageContents(); // <-- FIXED
      contents.forEach((key, value) => {
        //console.log("Push", key, value);
        page.push(key);
      });
      page.push(new Footer());
      return page;
    }

    let router = null;

    if (!runAsync) {
      router = new Router({
        base: base,
        routes: {
          "/": () => getPage(HomePage),
          "/slides": () => getPage(SlidesPage),
          "/carousel": () => getPage(CarouselPage),
          "/blog": () => getPage(BlogPage),
          "/tbd": () => getPage(TBDPage),
          "/test": () => getPage(TestPage),
          "/about": () => getPage(AboutPage),
          "/404": () => getPage(Error404Page),
        }
      });

      // Initial render
      console.log("[render] Initial");
      let page = router.resolve();
      page.forEach(widget => widget.render(document.body));

      // Re-render on navigation
      router.listen(newPage => {
        document.body.innerHTML = "";
        newPage.forEach(widget => widget.render(document.body));
      });

      //Object.entries(router.resolve()).forEach(([key, value]) => {
      //  console.log("Serialize", key, value.toJSON());
      //});
    } else {
      console.log("Running Async");

      class Security {
        static check(path, route) {
          console.group("SECURITY FIREWALL");
          console.log("PATH:", path);
          console.log("ROUTES:", route);
          console.log("BASE:", base);
          console.log("HREF:", window.location.href);
          console.log("ORIGIN:", window.location.origin);
          console.log("COOKIE:", document.cookie);
          console.log("USERAGENT:", navigator.userAgent);
          console.log("WINDOW:", window);
          console.log("LOCATION:", location);
          console.log("HISTORY:", history);
          console.log("PERFORMANCE:", performance);
          console.groupEnd();
        }
      };

      router = new RouterAsync({
        base: base,
        firewall: Security.check,
        template: PageTemplate,
        page404: Error404Page,
        template404: PageTemplate,
        routes: {
          "/":        { contents: HomePage },
          "/slides":  { contents: SlidesPage },
          "/carousel":{ contents: CarouselPage },
          "/blog":    { contents: BlogPage, template: BlogTemplate },
          "/blog1":   { contents: BlogPageAsync, template: BlogTemplate },
          "/blog2":   { contents: BlogPageDLAsync, template: BlogTemplate },
          "/blog3":   { contents: BlogPageDLAsync2, template: BlogTemplate },
          "/posts":   { contents: PostsPage },
          "/api-browser":{ contents: ApiBrowserPage },
          "/tbd":     { contents: TBDPage, template: PageTemplate },
          "/test":    { contents: TestPage },
          "/contact": { contents: ContactPage, template: PageTemplate },
          "/about":   { contents: AboutPage, template: PageTemplate },
        },
        runAsync: true,
      });

      function applyLayout(components) {
        const layout = new CollapsableSidebarFlexLayout();

        layout.addTo("sidebar", new Link({
            props: { href: "/about", textContent: "About Us" },
            css: { color: "blue", cursor: "pointer" }
          })
        );
        layout.addTo("main", components);
        return [layout];
      }
      
      // Initial render (sync caller)
      console.log("[render] Initial");
      router.resolve(function({ contents, template }) {
        //document.body.innerHTML = "";

        const components = template             // if local template
          ? template(contents)                  // use local template
          : this.metadata?.template             // if global template
            ? this.metadata.template(contents)  // use global template
            : contents;                         // no template just return contents

        const page = applyLayout(components);

        page.forEach(widget => {
          widget.render(document.body);

          console.log("HTML>", beautifyHTML(widget.toHTML()));
          console.log("Serialize>", widget.toJSON());
        });
      });

      // Initialize the GUI
      //console.log("DatGui Initialization", navbar);
      //initNavBarGUI(navbar);

      // Re-render on navigation (sync caller)
      router.listen(function({ contents, template }) {
        //document.body.innerHTML = "";
        alert("LISTEN UP!");
        //let page = applyPageTemplate(contents);
        const page = template                   // local template
          ? template(contents)                  // use local template
          : this.metadata?.template             // global template
            ? this.metadata.template(contents)  // use global template
            : contents;                         // no template just return contents
        page.forEach(widget => {
          widget.render(document.body);
          console.log("Serialize", widget.toJSON());
        });
      });
      
      const effect = new LavaGlow();
      effect.render(document.body);
      effect.dom.style.zIndex = -1;
      effect.start();

    }
  }
} else {

  testFlexNavLayout();

}

function testNavWithLayout() {

  const page = [];

  const nav = new NavBarLink({
        base: base,
        logoText: "DOMicile",
        logoImage: null, // "/assets/logo.png" or null if no image
        links: [
          { label: "Home", href: "/" },
          { label: "Slides", href: "/slides" },
          { label: "Carousel", href: "/carousel" },
          { label: "Blog", href: "/blog" },
          { label: "Test", href: "/test" },
          { label: "About", href: "/about" }
        ]
      })
  page.push(nav);
  const layout = new FixedSidebarFlexLayout();

  layout.addTo("sidebar", new Link({
      props: { href: "/about", textContent: "About Us" },
      css: { color: "blue", cursor: "pointer" }
    })
  );
  layout.addTo("main", new Box( {},
        new ContentLoader({
          base: base,
          src: "/src/pages/about.md",
          isMarkdown: true
        })
      )
  );

  const box = new Box({}, layout);
  page.push(box);

  page.forEach(widget => widget.render(document.body));
}

function testStorageLoader() {
  const settings = new StorageLoader("CMS", "settings", "theme");
  const box = new HTMLBox({ html: "Loading..." });
  //settings.save('Blue Ocean');
  //settings.load();
  settings.onLoad = value => {
    box.setHTML("Theme: " +  value);
  };
  box.render(document.body);
}

function testBoxTwo() {
  let navbar = new NavBarTopHoverDD1X({
      base: base,
      logoText: "DOMicile",
      logoHTML: `<span style="color:${getRandomColor()};"><b>DOM</b></span>icile`,
      //logoImage: imagerelurl + '/house-9131573_1920.png',
      menus: [
        { label: "Home", href: "/" },
        ]
  });

  navbar.render(document.body);
  console.log("To HTML", navbar.toHTML());
}

function testSidebarFlexLayout() {

  const page = new FixedSidebarFlexLayout();

  page.addTo("sidebar", new Link({
      props: { href: "/about", textContent: "About Us" },
      css: { color: "blue", cursor: "pointer" }
    })
  );
  page.addTo("main", new NavBarLink({
        base: base,
        logoText: "DOMicile",
        logoImage: null, // "/assets/logo.png" or null if no image
        links: [
          { label: "Home", href: "/" },
          { label: "Slides", href: "/slides" },
          { label: "Carousel", href: "/carousel" },
          { label: "Blog", href: "/blog" },
          { label: "Test", href: "/test" },
          { label: "About", href: "/about" }
        ]
      })
  );
  page.addTo("main", new Box( {},
        new ContentLoader({
          base: base,
          src: "/src/pages/about.md",
          isMarkdown: true
        })
      )
  );

  page.render(document.body);
}

function testCollapsableSidebarFlexLayout() {

  const page = new CollapsableSidebarFlexLayout();

  page.addTo("sidebar", new Link({
      props: { href: "/about", textContent: "About Us" },
      css: { color: "blue", cursor: "pointer" }
    })
  );
  page.addTo("main", new NavBarLink({
        base: base,
        logoText: "DOMicile",
        logoImage: null, // "/assets/logo.png" or null if no image
        links: [
          { label: "Home", href: "/" },
          { label: "Slides", href: "/slides" },
          { label: "Carousel", href: "/carousel" },
          { label: "Blog", href: "/blog" },
          { label: "Test", href: "/test" },
          { label: "About", href: "/about" }
        ]
      })
  );
  page.addTo("main", new Box( {},
        new ContentLoader({
          base: base,
          src: "/src/pages/reviews.md",
          isMarkdown: true,
          css: {margin: "20px"},
          props: {className: "markdown-box"}
        })
      )
  );

  page.render(document.body);
}

function testFlexNavLayout() {
  const page = new FlexNavLayout({
    base,
    logoText: "FlexPage",
    links: [
      { label: "Home", href: "/" },
      { label: "Test", href: "/test" },
      { label: "Contact", href: "/contact" },
      { label: "About", href: "/about" },
    ]
  });

  page.addTo("main", new Box( {},
        new ContentLoader({
          base: base,
          src: "/src/pages/reviews.md",
          isMarkdown: true
        })
      )
  );

  console.log("REEEEEENNNNNNNNDDDDDEEEEERRRRRRRRRRRRRRRRRRRRR");
  page.render(document.body);
}
//const base = "/js/rnd/domicile/domicile1";
const base = "/domicile1";
const imagerelurl = base + "/assets/images/";
const cssrelurl = base + "/assets/css/";
const jsrelpath = base + "/assets/js/";
let navbar = null;

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
      {'url': 'tile', 'category': '', 'title': '', 'creator': '', 'type': '', 'size': 0},
   ]}
}

function getMiscVideoAlbum() {
   return {'title': 'Misc Videos', 'tracks': [
      {'url': 'sources/videosex/pCloud.mp4', 'category': '', 'title': '', 'creator': '', 'type': '', 'size': 0},
      {'url': 'sources/videosex/Sound – visualising sound waves — Science Learning Hub.mp4', 'category': '', 'title': '', 'creator': '', 'type': '', 'size': 0},
      {'url': 'sources/videosin/external/frog_drums_m2-res_480p.mp4', 'category': '', 'title': '', 'creator': '', 'type': '', 'size': 0},
      {'url': 'sources/videosin/external/Deep Layered Brown Noise ( 6 Hours ).mp4', 'category': '', 'title': '', 'creator': '', 'type': '', 'size': 0},
      {'url': 'sources/imagesex/Gallery/Flowers/pexels-photo-1122626b.jpg', 'category': '', 'title': '', 'creator': '', 'type': '', 'size': 0},
      {'url': 'tile', 'category': '', 'title': '', 'creator': '', 'type': '', 'size': 0},
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
      {'url': 'tile', 'category': '', 'title': '', 'creator': '', 'type': '', 'size': 0},
   ]}
}

async function loadAllBlogPosts() {
  // 1. Load index.json
  const indexRes = await fetch(base + "/build/blog/index.json");
  //console.log("${indexRes}", indexRes);
  const files = await indexRes.json();

  const posts = [];

  for (const file of files) {
    const url = `./build/blog/${file}`;

    // 2. Load HTML content
    const res = await fetch(url);
    if (!res.ok) continue;
    const html = await res.text();

    // 3. Extract metadata from filename
    const match = file.match(/^(\d{14})-(.+)\.html$/);
    if (!match) continue;

    const timestamp = match[1];
    const rawTitle = match[2];
    const title = rawTitle.replace(/_/g, " ");

    // 4. Wrap in a DOMicile Box
    //const box = new HTMLBox({ html });

    // 5. Push into array
    posts.push({
      timestamp,
      url,
      file,
      title,
      html
    });
  }

  return posts;
}

function runApp(config={}, theme={}) {
  const runAsync = true;

  function HomePage() {
    const layout = new TwoColumnResponsiveLayout({
      css: {
        margin: "10px",
        background: "#151515",
        boxShadow: "0px 8px 16px rgba(0,0,0,0.2)"
      },
      props: { id: "article-box", className: "clearfix" }
    });

    layout.addTo(
      "left",
      new Element(
        "a",
        { props: { href: "https://ifnowcode.github.io", target: "_blank" } },
        new ImageBox({
          css: { padding: "20px", display: "block", margin: "auto" },
          props: { src: imagerelurl + "granite-raw-block-250x250.jpg" }
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
            props: { id: "article-box", className: 'clearfix'}
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
                  props: { src: imagerelurl + "granite-raw-block-250x250.jpg" }
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
      //'sources/imagesex/Gallery/Flowers/FRjE9VYUUAAkpFd.jpg',
      //'sources/imagesex/Gallery/Flowers/pexels-photo-1122626b.jpg',
      //'sources/imagesex/Gallery/Flowers/pexels-photo-133472.jpg',
      //'sources/imagesex/Gallery/Flowers/pexels-photo-3686216.jpg',
      'sources/imagesex/Gallery/Flowers/pexels-photo-369433.jpg',
      //'sources/imagesex/Gallery/Flowers/pexels-photo-4041409.jpg',
      //'sources/imagesex/Gallery/Flowers/_117100719_flower_bloom_02.jpg',
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

    const lightbox = new LightboxThumbnailViewer({ images: [
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
        new Carousel({ album: getFlowerImageAlbum() }),
        new Carousel({ album: getMiscVideoAlbum() }),
        new Carousel({ album: getMasterTracksAlbum() }),
        new Carousel({ album: getTestMediaAlbum() }),
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

    navbar = new NavBarTopClickerSticker({
      base: base,
      logoText: "DOMicile",
      logoHTML: `<span style="color:${color};"><b>DOM</b></span>icile`,
      logoImage: imagerelurl + 'granite-raw-block-250x250.jpg',
      menus: [
        //{ label: "Home", href: "/" },
        { label: "Show", items: [
            { label: "Gallery", href: "/gallery" },
            { label: "Media", href: "/mediaview" },
         ]
        },
        { label: "Pages", items: [
            { label: "Blog", href: "/blog" },
            { label: "Blog1", href: "/blog1" },
            { label: "Blog2", href: "/blog2" },
            { label: "Blog3", href: "/blog3" },
            { label: "Posts", href: "/posts" },
            { label: "API Browser", href: "/api-browser" },
         ]
        },
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
         ]
        },
        { label: "Help", items: [
            { label: "Contact", href: "/contact" },
            { label: "About", href: "/about" },
         ] 
        },
      ]
    });
    page.push(navbar);

    contents.forEach(widget => page.push(widget));

    page.push(new Footer(config));
    page.push(new ScrollToTop());

    return page;
  }

  function getPage(fnPageContents=Error404Page) {
    const page = [];
    //page.push(new NavBar());
    //page.push(new NavBar2());
    page.push(new NavBarHLink({
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

  //let router = null;
  if (!runAsync) {
    router = new Router({
      base: base,
      routes: {
        "/": () => getPage(HomePage1),
        "/gallery": () => getPage(SlidesPage),
        "/mediaview": () => getPage(CarouselPage),
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
      static check(path, routes) {
        console.groupCollapsed("SECURITY FIREWALL");
        console.log("PATH:", path);
        console.log("ROUTES:", routes);
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
        return true;
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
        "/gallery":  { contents: SlidesPage },
        "/mediaview":{ contents: CarouselPage },
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

      // this invoked RouterAsync.listen
      /*layout.addTo("sidebar", new Navigator({
          props: { href: "/about", textContent: "About Us" },
          css: { color: "white", cursor: "pointer" }
        })
      );
      */

      layout.addTo("sidebar", new NavBarVLink({
          base: base,
          //logoText: "DOMicile",
          //logoImage: null, // "/assets/images/logo.png" or null if no image
          links: [
            { label: "Home", href: "/" },
            { label: "Gallery", href: "/gallery" },
            { label: "Media", href: "/mediaview" },
            { label: "Blog", href: "/blog1" },
            { label: "Test", href: "/test" },
            { label: "About", href: "/about" },
            { label: "Contact", href: "/contact" }
          ]
        })
      );
      layout.addTo("main", components);
      return [layout];
    }

    function render({contents, template}) {
      /* deprecate if not needed, I believe the router handles this cleanly
      const components = template             // if local template
        ? template(contents)                  // use local template
        : this.metadata?.template             // if global template
          ? this.metadata.template(contents)  // use global template
          : contents;                         // no template just return contents
      */
      const components = template(contents); 

      const page = applyLayout(components);
      
      page.forEach(widget => {
        widget.render(document.body);

        console.log("HTML>", beautifyHTML(widget.toHTML()));
        console.log("Serialize>", widget.toJSON());
      });
      
      applyJSONTheme(theme);

      const effect = new LavaGlow();
      effect.render(document.body);
      effect.dom.style.zIndex = -1;
      effect.start();
    }

    router.resolve(function({ contents, template }) {
      console.log("[render] Initial");
      document.body.innerHTML = "";
      render({contents, template});
    });

    // Re-render on navigation (sync caller)
    router.listen(function({ contents, template }) {
      document.body.innerHTML = "";
      //alert("router.listener was invoked!");
      render({contents, template});
    });
  }
};

function testNavWithLayout(config={}) {

  const page = [];

  const nav = new NavBarHLink({
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

  layout.addTo("sidebar", new Navigator({
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

function testStorageLoader(config={}) {
  const settings = new StorageLoader("CMS", "settings", "theme");
  const box = new HTMLBox({ html: "Loading..." });
  //settings.save('Blue Ocean');
  //settings.load();
  settings.onLoad = value => {
    box.setHTML("Theme: " +  value);
  };
  box.render(document.body);
}

function testBoxTwo(config={}) {
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

function testSidebarFlexLayout(config={}) {

  const page = new FixedSidebarFlexLayout();

  page.addTo("sidebar", new Navigator({
      props: { href: "/about", textContent: "About Us" },
      css: { color: "blue", cursor: "pointer" }
    })
  );
  page.addTo("main", new NavBarHLink({
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

function testCollapsableSidebarFlexLayout(config={}) {

  const page = new CollapsableSidebarFlexLayout();

  page.addTo("sidebar", new Navigator({
      props: { href: "/about", textContent: "About Us" },
      css: { color: "blue", cursor: "pointer" }
    })
  );
  page.addTo("main", new NavBarHLink({
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

function testFlexNavLayout(config={}) {
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

function testNoRouterOriginal(config={}) {
  const page = [];
  console.log("${window.location.origin}:", window.location.origin);
  console.log("${base}:", base);
  let fullpdir = window.location.origin + base;
  console.log("${fullpdir}:", fullpdir);
  let url = window.location.href;
  console.log("${url}:", url);
  let b = url.slice(0, fullpdir.length);
  let local = url.slice(fullpdir.length);
  console.log("${b}:", b);
  console.log("${local}:", local);
  if (local === '/') {
    page.push(new dep_NavBar({base}));
    page.push(new DemoWidget()); // deprecated
    page.push(new ImageBox( {props: { src: imagerelurl + "granite-raw-block-250x250.jpg" }}));
    page.push(new Element('br'));
    page.push(new Button( {props: {textContent: "Click Me!", onclick: () => console.log("Hello!")}} ));
    page.push(new Element('a', { css: {display: 'block'}, props: {target: '_blank', textContent: "github.ifnowcode", href: "https://github.com/ifnowcode"}}));
    page.push(new Element('a', { css: {display: 'block'}, props: {target: '_blank', textContent: "ifnowcode.github.io", href: "https://ifnowcode.github.io"}}));
  } else if (local === '/about') {
    page.push(new dep_NavBar({base}));
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
    page.push(new Table(data));
    page.push(new Table(data));
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
}

async function main() {
  const config = await loadJsonFile(base + "/config.json");
  const theme = await loadJSONTheme(base + "/assets/themes/domicile.json");
  if (true) {
    runApp(config ?? {}, theme ?? {});
  } else {
    testNoRouterOriginal(config ?? {});
  }
}
main().catch(console.error);


console.groupCollapsed("Registered classes (" + Object.keys(widgetRegistry).length + ")");
Object.keys(widgetRegistry).forEach(name => {
  console.log(name, widgetRegistry[name]);
});
console.groupEnd();

console.groupCollapsed("Registered effects (" + Object.keys(fxRegistry).length + ")");
Object.keys(fxRegistry).forEach(name => {
  console.log(name, fxRegistry[name]);
});
console.groupEnd();
//blog and posts
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
  //const posts = await loader.loadIndex();
  console.log("** onLoad DL Post");
  
  const box = new Box({
    css: { padding: "20px" },
    props: { id: 'posts-box', className: 'post-office', textContent: "Loading posts..." }
  });
  
  loader.onLoad = posts => {
    console.log("Loader onload", posts);
    if (!posts) {
      box.dom.textContent="Failed to load posts";
      return [box];
    }
    box.children = []; // clear
    posts.items.forEach(post => {
      box.addChild(
        new Box({
            css: { marginBottom: "20px" },
            props: { className: 'post-box' }
          },
          post.box
        )
      );
      
      box.addChild(new Element('hr'));
    });
    box.refresh();
  };

  return [box];
}

function PostsPage() {
  console.log("PostsPage loading...");
  const loader = new RESTLoader("http://localhost:3000/api/posts");

  const box = new Box({
    css: { padding: "20px" },
    props: { id: 'posts-box', className: 'post-office', textContent: "Loading posts..." }
  });
  
  loader.onLoad = posts => {
    console.log("Loader onload", posts);
    if (!posts) {
      box.dom.textContent="Failed to load posts";
      return [box];
    }
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
  const posts = await loadAllBlogPosts();
  console.log("Posts", posts);
  posts.sort((a, b) => b.timestamp.localeCompare(a.timestamp));
  return posts.map(p => new HTMLBox({ html: p.html }));
}

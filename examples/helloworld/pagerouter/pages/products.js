console.log("Checking Products", pageCount = pageCount + 1);

//if (window.location.href === baseurl + "/products") {
if (window.location.href.startsWith(baseurl + "/products")) {
  const rest = window.location.href.slice((baseurl + "/products").length);
  //protocol://subDomain.domainName.topLevelDomain<path, query, fragment>
  const args = parseRoute(window.location.href, baseurl + "/products");
  console.log("defining /products GetPage", args);
  
  function GetPage() {    
    console.log("GetPage /products*");
    let _loader = null;
    // ContentLoader, IFrameLoader, SandboxedIFrameLoader,  InjectHTMLLoader
    // no css       , isolated css, isolated css + security,too much css (global)
    if (args.value && (args.value === "0" || args.extra === "0")) {
      console.log("Testing ContentLoader", args.value);
      _loader = ContentLoader;
    } else if (args.value && (args.value === "1" || args.extra === "1")) {
      console.log("Testing IFrameLoader", args.value);
      _loader = IFrameLoader;
    } else if (args.value && (args.value === "2" || args.extra === "2")) {
      console.log("Testing SandboxedIFrameLoader", args.value);
      _loader = SandboxedIFrameLoader;
    } else if (args.value && (args.value === "3" || args.extra === "3")) {
      console.log("Testing InjectHTMLLoader", args.value);
      _loader = InjectHTMLLoader;
    } else {
      console.log("Testing SandboxedIFrameLoader", args.value);
      _loader = SandboxedIFrameLoader;
    }
    return [
      new Box( {},
        new _loader({
          base: base,
          src: "/pages/products.html",
          isMarkdown: false,
          //sandbox: ""
        })
      )
    ];
    
  }
  
  function ProcessEffects() {
    const effect = new ItsRainingMoney();
    effect.render(document.body);
    effect.dom.style.zIndex = -1;
    effect.start();
    //setTimeout(() => effect.stop(), 4000);
    //setTimeout(() => effect.clear(), 7000);
  }
}
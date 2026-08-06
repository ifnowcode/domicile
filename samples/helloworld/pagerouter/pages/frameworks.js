console.log("Checking Frameworks", pageCount = pageCount + 1);

if (window.location.href === baseurl + "/frameworks") {
  
  console.log("defining /frameworks GetPage");
  
  function GetPage() {    
    console.log("GetPage /frameworks");
    return [
      new Box( {},
          new InjectHTMLLoader({
            base: base,
            src: "/pages/frameworks.md",
            isMarkdown: true
          })
        )
    ];
  }
  
  function ProcessEffects() {
    const effect = new GlowClick();
    effect.render(document.body);
    effect.dom.style.zIndex = -1;
    effect.start();

    //setTimeout(() => effect.stop(), 4000);
    //setTimeout(() => effect.clear(), 7000);
  }
}
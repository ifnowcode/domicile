console.log("Checking Downloads", pageCount = pageCount + 1);

if (window.location.href === baseurl + "/downloads") {
  
  console.log("defining /downloads GetPage");
  
  function GetPage() {    
    console.log("GetPage /downloads");
    return [
      new Box( {},
          new ContentLoader({
            base: base,
            src: "/pages/downloads.html",
            isMarkdown: false
          })
        )
    ];
  }
  
  function ProcessEffects() {
    const effect = new BlueNeonRain();
    effect.render(document.body);
    effect.dom.style.zIndex = -1;
    effect.start();

    //setTimeout(() => effect.stop(), 4000);
    //setTimeout(() => effect.clear(), 7000);
  }
}
console.log("Checking HOME", pageCount = pageCount + 1);

if (window.location.href === baseurl + "/") {

  function GetPage() {
    console.log("GetPage /");
    const text = "This is a hello world demonstration of DOMicile page-router!";
    return [
      new Element("h1", {css: {textAlign: "center"}, props: {textContent: "Home Page"}}),
      new Element("p", {css: {textAlign: "center"}, props: {textContent: text}}),
      //new Element("img", { css: { display: "block", marginLeft: "auto", marginRight: "auto" }, props: { src: base + '/assets/images/granite-raw-block-250x250.jpg' }})
      new AnalogClockSample({size: '300', showNumbers: true, css: { display: "block", marginLeft: "auto", marginRight: "auto" }})
      /*new SnakeGame({
        fps: 10,
        props: { width: 400, height: 400 },
        css: { border: "5px solid red" },
        autoStart: true
      })*/
    ];
  }
  
  /*
  GetPage().forEach(widget => {
      widget.render(document.getElementById("root"));
  });
  */
  
  function ProcessEffects() {
    //const effect1 = new FloatingHearts(20);
    //effect1.render(document.body);
    //effect1.dom.style.zIndex = -1;
    //effect1.start();
    //setTimeout(() => effect1.stop(), 4000);
    //setTimeout(() => effect1.clear(), 5000);
    //setTimeout(() => effect1.start(), 8000);
    //setTimeout(() => effect1.stop(), 10000);
    //setTimeout(() => effect1.start(), 14000);
    /*
    setInterval(() => {
      effect1.stop();
      effect1.clear();
      effect1.start();
    }, 30000);
    /*
    const stop = startToggleLoop(
      12000,
      20000,
      () => effect1.start(),
      () => {
        effect1.stop();
        effect1.clear();
      }
    );
    */
    
    const fx = new FloatingNeonWord({words: ["So", "much", "to", "say"], css: {zIndex: "-1"}});
    fx.render(document.body);
    //fx.dom.style.zIndex = -1;
    //fx.start();
    //setTimeout(() => fx.stop(), 4000);
    //setTimeout(() => fx.clear(), 5000);
    //setTimeout(() => fx.start(), 8000);
    setTimeout(() => {
      //fx.stop();
      //fx.clear();
      fx.words = ["So", "little", "time"];
      //fx.start();
    }, 30000);
  }
} 
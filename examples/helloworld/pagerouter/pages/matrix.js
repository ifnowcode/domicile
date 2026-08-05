console.log("Checking the Matrix", pageCount = pageCount + 1);

if (window.location.href === baseurl + "/matrix") {
  
  console.log("defining /matrix GetPage");
  
  function GetPage() {    
    console.log("GetPage /matrix ...001010101010100101010");
    return [
      new NeonTubeSign({
        text: "The Matrix 3000",
        color: "#00ee66",
        glow: "#000000",
        size: 114,
        pulse: true,
        flicker: true,
        css: { marginTop: "100px", textAlign: "center" }
      }),
      new NeonTubeSign({
        text: "Coming Soon ...",
        color: "#ee0000",
        glow: "#ff0000",
        size: 76,
        pulse: true,
        flicker: true,
        css: { textAlign: "center" }
      }),
      new Element('h1', {
        css: { textAlign: "center" },
        props: { textContent: "To a theater near you!" }
      })
    ];
  }
  
  function ProcessEffects() {
    console.log("Processing .......");
    //const effect = new FloatingNeonWord({count: 3, words: ["Neo"]});
    const effect = new MatrixCodeRain({ count: "40" });
    console.log("Done Processing");
    effect.render(document.body);
    effect.dom.style.zIndex = -1;
    effect.start();
    //setTimeout(() => effect.stop(), 4000);
    //setTimeout(() => effect.clear(), 7000);
  }
}
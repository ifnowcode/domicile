console.log("Checking Contacts", pageCount = pageCount + 1);
/*
if (window.location.href === baseurl + "/contactsraw") {
  window.location.href = baseurl + "/pages/contacts.html"
}
*/
if (window.location.href === baseurl + "/contacts") {
  
  console.log("defining /contacts GetPage");
  
  function GetPage() {    
    console.log("GetPage /contacts");
    return [
      new Box( {},
          // ContentLoader, IFrameLoader, SandboxedIFrameLoader,  InjectHTMLLoader
          // no css       , isolated css, isolated css, more sec, too much css (global)
          new SandboxedIFrameLoader({ 
            base: base,
            src: "/pages/contacts.html",
            isMarkdown: false,
            sanitize: true,
            //sandbox: "", // clears and display resize needs 'allow-scripts'
          })
        )
    ];
  }
  
  function ProcessEffects() {
    const effect = new RainDropsOnGlass();
    effect.render(document.body);
    effect.dom.style.zIndex = -1;
    effect.start();

    //setTimeout(() => effect.stop(), 4000);
    //setTimeout(() => effect.clear(), 7000);
  }
}
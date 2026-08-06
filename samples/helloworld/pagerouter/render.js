
try {
  console.log("Rendering header ...");
  GetHeader().forEach(widget => {
      widget.render(document.getElementById("header"));
  });
} catch {
  console.log("[No Header] GetHeader function not defined.");
}

try {
  console.log("Rendering left sidebar ...");
  GetSidebarLeft().forEach(widget => {
      widget.render(document.getElementById("sidebar-left"));
  });
} catch {
  console.log("[No Left Sidebar] GetSidebarLeft function not defined.");
}

try {
  console.log("Rendering page ...");
  GetPage().forEach(widget => {
      widget.render(document.getElementById("main"));
  });
} catch {
  try {
    Get404().forEach(widget => {
        widget.render(document.getElementById("main"));
    });
  } catch {
    //alert("404 - Page Not Found!");
  } finally {
    console.warn("[No Content] 404 - Page Not Found!");
  }
}

try {
  console.log("Rendering right sidebar ...");
  GetSidebarRight().forEach(widget => {
      widget.render(document.getElementById("sidebar-right"));
  });
} catch {
  console.log("[No Right Sidebar] GetSidebarRight function not defined.");
}

try {
  console.log("Rendering footer ...");
  GetFooter().forEach(widget => {
      widget.render(document.getElementById("footer"));
  });
} catch {
  console.log("[No Footer] GetFooter function not defined.");
}

try {
  ProcessEffects();
} catch {
  console.log("[No Effects] ProcessEffects function not defined.");
}


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
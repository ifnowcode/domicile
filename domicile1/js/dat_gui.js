// dat_gui.js

function initNavBarGUI(navbar) {
  console.log("DatGui Initialization", navbar);
  // Safety check
  if (!navbar || typeof navbar.sticky !== "function") {
    console.warn("initNavBarGUI: navbar instance missing or has no sticky() method");
    return;
  }

  // GUI state object
  const settings = {
    sticky: false
  };

  // Create GUI
  const gui = new dat.GUI();

  // Checkbox controller
  gui.add(settings, "sticky")
    .name("Sticky NavBar")
    .onChange((value) => {
      // Call your framework's sticky method
      navbar.sticky(value);
    });
}

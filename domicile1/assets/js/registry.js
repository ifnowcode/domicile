/////////////////////////////////////////////////////////////////////
//
// Registry
//
// Add when needed. fromJSON() is an untested function, here are enough definitions to test.
// Personally I don't like having to maintain a registry. I need to find a better way like self registration or auto registration from base class would be best.
/////////////////////////////////////////////////////////////////////
const widgetRegistry_dep = {
  Element,
  Box,
  Button,
  ImageBox,
  DemoWidget,
  Table,
  WideScreenSlideshow,
  DigitalClock,
  NavBarLink,
  NavBarDropdown,
  NavBarTopHoverDD1X,
  Footer,
  NotFound404,
  ListWithControls,
  Modal,
  GridLayout,
  TabbedWidget,
  Contact,
};

const REGISTRY_STORAGE_KEY = "widgetRegistry";

function loadWidgetRegistry() {
  try {
    const saved = JSON.parse(localStorage.getItem(REGISTRY_STORAGE_KEY) || "{}");
    return saved;
  } catch {
    return {};
  }
}

function saveWidgetRegistry(registry) {
  const serializable = Object.fromEntries(
    Object.entries(registry).map(([name, cls]) => [name, true])
  );
  localStorage.setItem(REGISTRY_STORAGE_KEY, JSON.stringify(serializable));
}

const widgetRegistry = loadWidgetRegistry();

function registerWidget(cls) {
  widgetRegistry[cls.name] = cls;
  saveWidgetRegistry(widgetRegistry);
  return cls;
}

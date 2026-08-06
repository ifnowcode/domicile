// Big loud green sign
const neon1 = new NeonText({
  text: "LIVE",
  color: "#39ff14",
  size: "4rem",
  intensity: 1.2
});

// Hot pink, slightly smaller
const neon2 = new NeonText({
  text: "GIRLS",
  color: "#ff2fd4",
  size: "2.5rem",
  intensity: 1.0
});

// Drop into a layout region
//layout.addTo("main", neon1);
//layout.addTo("main", neon2);
neon1.render(document.getElementById("root"));
neon2.render(document.getElementById("root"));

// classic sign
const classic = new Neon({
  text: "OPEN",
  color: "#39ff14",
  size: "4rem",
  intensity: 1.2
});

// broken sign
const flickering = new Neon({
  text: "BAR",
  color: "#ff2fd4",
  flicker: 1.0
});

// breathing glow
const pulsing = new Neon({
  text: "LIVE",
  color: "#00eaff",
  pulse: 1.0
});

// retro neon tubing
const tube = new Neon({
  text: "TATTOO",
  color: "#ff0000",
  tube: true,
  intensity: 1.0
});

// everything combined
const demo = new Neon2({
  text: "NIGHT CLUB",
  color: "#ff00ff",
  size: "5rem",
  intensity: 1.3,
  flicker: 0.8,
  pulse: 1.2,
  tube: true
});

classic.render(document.getElementById("root"));
flickering.render(document.getElementById("root"));
pulsing.render(document.getElementById("root"));
tube.render(document.getElementById("root"));
demo.render(document.getElementById("root"));

const svgdemo1 = new NeonSvgSign3({
  text: "NIGHT CLUB",
  color: "#ff00ff",
  size: 64,
  flicker: 0.5,
  pulse: 1.2
});

const svgdemo2 = new NeonSvgSign3({
  text: "OPEN",
  color: "#39ff14",
  size: 72,
  flicker: 0.8,
  pulse: 1.0
});

svgdemo1.render(document.getElementById("root"));
svgdemo2.render(document.getElementById("root"));

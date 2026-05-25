//const canvas = document.getElementById("game");
//canvas.width = 400;
//canvas.height = 400;

new Element("style", {
  props: {
    textContent: `
      html, body {
        margin: 0;
        padding: 0;
        overflow: hidden;
      }
    `
  }
}).render(document.head);

const title = new Element('h2', { css: {textAlign: "center"}, props: {textContent: "DOMicile Snake Game"}});

const score = new Score({
  label: "Score",
  value: 0,
  onUpdate: (v) => console.log("Level updated:", v)
});

// Create scoreboard
const board = new Scoreboard();

// Add scores to scoreboard
board.addScore(score);

function callback(v) {
  console.log("Score Callback", v);
  score.update(v);
}

const snake = new SnakeGame({
  fps: 10,
  props: { width: 700, height: 500 },
  css: { border: "5px solid red" },
  events: { onScore: callback}
});

title.render(document.getElementById("root"));
board.render(document.getElementById("root"));
snake.render(document.getElementById("root"));

console.log("************* Start Game *************");
snake.start();

class Score extends Element {
  constructor(metadata = {}) {
    const defaults = {
      label: "Score",
      value: 0,
      onUpdate: null,
      css: {
        display: "inline-flex",
        flexDirection: "row",
        alignItems: "center",
        gap: "6px",
        fontFamily: "sans-serif",
        fontSize: "16px",
        padding: "4px 8px",
        border: "1px solid #ccc",
        borderRadius: "4px",
      }
    };

    const merged = {
      ...defaults,
      ...metadata,
      css: { ...defaults.css, ...(metadata.css || {}) }
    };

    super("div", merged);

    this.labelBox = new Element("span", {
      props: { textContent: merged.label }
    });

    this.valueBox = new Element("span", {
      props: { textContent: merged.value }
    });

    this.onUpdate = merged.onUpdate;

    this.addChild(this.labelBox);
    this.addChild(this.valueBox);
  }

  update(newValue) {
    if (this.mounted) {
      this.valueBox.dom.textContent = newValue;
      if (this.onUpdate) this.onUpdate(newValue);
    }
  }
}

class Scoreboard extends Element {
  constructor(metadata = {}) {
    const defaults = {
      css: {
        width: "100%",
        display: "flex",
        justifyContent: "center",
        position: "relative",
        top: "0",
        left: "0",
        paddingTop: "10px",
        pointerEvents: "none", // lets clicks pass through if needed
        //background: "blue",
      }
    };

    const merged = {
      ...defaults,
      ...metadata,
      css: { ...defaults.css, ...(metadata.css || {}) }
    };

    // This is the inner scoreboard UI
    super("div", merged);

    // Create the top bar wrapper
    this.topBar = new Element("div", {
      css: {
        display: "inline-flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        gap: "10px",
        padding: "6px",
        border: "1px solid #aaa",
        borderRadius: "6px",
        background: "red",
      }
    });

    this.addChild(this.topBar);
  }
  
  onMount() {
    // The scoreboard itself should accept pointer events
    this.dom.style.pointerEvents = "auto";
  }

  // Override render so the topBar is what gets rendered
  //render(target) {
  //  this.topBar.render(target);
  //}

  addScore(scoreElement) {
    this.topBar.addChild(scoreElement);
  }
}


class Game extends Element {
  constructor(metadata = {}) {
    const defaults = {
      fps: 60,
      props: { width: 400, height: 400 },
      css: {
        display: "block",
        marginLeft: "auto",
        marginRight: "auto"
      }
    };

    // deep merge (DOMicile-friendly)
    const merged = {
      ...defaults,
      ...metadata,
      props: { ...defaults.props, ...(metadata.props || {}) },
      css: { ...defaults.css, ...(metadata.css || {}) }
    };

    super("canvas", merged);
    
    this.fps = merged.fps;
    console.log("FPS:", this.fps);
    this.frameDuration = 1000 / this.fps;

    this.lastTime = 0;
    this.running = false;
  }
  
  onMount() {
    console.log("On Mount:", this.dom);
    this.canvas = this.dom;
    this.ctx = this.canvas.getContext("2d");
  }

  start() {
    if (this.running) return;
    console.trace("Starting...")
    this.running = true;
    this.lastTime = performance.now();
    requestAnimationFrame(this.run.bind(this));
  }

  stop() {
    this.running = false;
  }

  run(now) {
    if (!this.running) return;
    //console.trace("Running...")
    const dt = now - this.lastTime;
    if (dt >= this.frameDuration) {
      //console.log("Running");
      this._update(dt); // miliseconds
      this._render();
      this.lastTime = now;
    }
    requestAnimationFrame(this.run.bind(this));
  }
  
  _update(dt) {}
  _render() {}
}

class SnakeGame extends Game {
  constructor(metadata = {}) {
    const defaults = {
      fps: 10,
      props: { width: 500, height: 500 },
      css: {
        border: "20px solid black"
      },
      events: { onScore: null }
    };

    const merged = {
      ...defaults,
      ...metadata,
      props: { ...defaults.props, ...(metadata.props || {}) },
      css: { ...defaults.css, ...(metadata.css || {}) },
      events: { ...defaults.events, ...(metadata.events || {}) }
    };

    super(merged);
    this.gridSize = 20;
    const { events } = merged;
    this.events = events;
    this.score = 0;
    if (this.events.onScore) this.events.onScore(this.score);
  }
  
  onMount() {
    super.onMount();
    this.cols = Math.floor(this.canvas.width / this.gridSize);
    this.rows = Math.floor(this.canvas.height / this.gridSize);

    this.reset();

    window.addEventListener("keydown", (e) => {
      //e.preventDefault();
      if (e.key === "ArrowUp" && this.dir.y !== 1) this.dir = { x: 0, y: -1 };
      if (e.key === "ArrowDown" && this.dir.y !== -1) this.dir = { x: 0, y: 1 };
      if (e.key === "ArrowLeft" && this.dir.x !== 1) this.dir = { x: -1, y: 0 };
      if (e.key === "ArrowRight" && this.dir.x !== -1) this.dir = { x: 1, y: 0 };
    });
  }

  reset() {
    console.log("Reset");
    this.snake = [
      { x: 5, y: 5 },
      { x: 4, y: 5 },
      { x: 3, y: 5 }
    ];
    this.dir = { x: 1, y: 0 };
    this.score = 0;
    if (this.events.onScore) this.events.onScore(this.score);
    this.spawnFood();
  }

  spawnFood() {
    this.food = {
      x: Math.floor(Math.random() * this.cols),
      y: Math.floor(Math.random() * this.rows)
    };
  }

  _update(dt) {
    //console.log("Update");
    const head = this.snake[0];
    const newHead = {
      x: head.x + this.dir.x,
      y: head.y + this.dir.y
    };

    // wall collision
    if (
      newHead.x < 0 || newHead.x >= this.cols ||
      newHead.y < 0 || newHead.y >= this.rows
    ) {
      console.log("Wall Collision");
      this.reset();
      return;
    }

    // self collision
    if (this.snake.some(seg => seg.x === newHead.x && seg.y === newHead.y)) {
      console.log("Self Collision");
      this.reset();
      return;
    }

    this.snake.unshift(newHead);

    // food
    if (newHead.x === this.food.x && newHead.y === this.food.y) {
      this.score++;
      if (this.events.onScore) this.events.onScore(this.score);
      console.log("Score:", this.score);
      this.spawnFood();
    } else {
      this.snake.pop();
    }
  }

  _render() {
    const ctx = this.ctx;
    //console.trace("Rendering...")
    ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    // snake
    ctx.fillStyle = "#2ecc71";
    for (const seg of this.snake) {
      ctx.fillRect(
        seg.x * this.gridSize,
        seg.y * this.gridSize,
        this.gridSize,
        this.gridSize
      );
    }

    // food
    ctx.fillStyle = "#e74c3c";
    ctx.fillRect(
      this.food.x * this.gridSize,
      this.food.y * this.gridSize,
      this.gridSize,
      this.gridSize
    );
  }
}


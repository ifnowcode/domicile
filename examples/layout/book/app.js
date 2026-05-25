// --- STORY PAGES ---

if (false) {
  const welcomePage = new Element("div", {
    css: {
      //background: "#e0f7ff",
      padding: "40px",
      fontSize: "32px",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center"
    }
  });

  welcomePage.addChild(
    new Element("div", {
      props: { textContent: "Welcome to the Tale of Azurewing" },
      css: { fontWeight: "bold", marginBottom: "20px" }
    })
  );

  welcomePage.addChild(
    new Element("div", {
      props: {
        textContent:
          "A gentle blue dragon and its tiny pet fish begin a journey across the sky‑lakes."
      },
      css: { maxWidth: "600px", textAlign: "center" }
    })
  );


  // --- CHAPTER ONE ---

  const chapterOne = new Element("div", {
    css: {
      //background: "#fff8e1",
      padding: "40px",
      fontSize: "28px",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center"
    }
  });

  chapterOne.addChild(
    new Element("div", {
      props: { textContent: "Chapter One: The Sky‑Lake" },
      css: { fontWeight: "bold", marginBottom: "20px" }
    })
  );

  chapterOne.addChild(
    new Element("div", {
      props: {
        textContent:
          "Azurewing glided over the shimmering sky‑lake, its scales glowing like morning frost. " +
          "In a tiny bubble‑bowl strapped to its horn, Ripple the fish peeked out, amazed at the floating islands below."
      },
      css: { maxWidth: "600px", textAlign: "center" }
    })
  );


  // --- CHAPTER TWO ---

  const chapterTwo = new Element("div", {
    css: {
      //background: "#f3e5f5",
      padding: "40px",
      fontSize: "28px",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center"
    }
  });

  chapterTwo.addChild(
    new Element("div", {
      props: { textContent: "Chapter Two: The Storm of Whispers" },
      css: { fontWeight: "bold", marginBottom: "20px" }
    })
  );

  chapterTwo.addChild(
    new Element("div", {
      props: {
        textContent:
          "A soft rumble echoed across the clouds. Azurewing felt the winds twist strangely. " +
          "Ripple swirled in its bowl, sensing something ancient stirring beneath the sky‑lake’s surface. " +
          "Together, they flew toward the whispering storm, unaware of the secret waiting inside."
      },
      css: { maxWidth: "600px", textAlign: "center" }
    })
  );

  // --- CREATE THE BOOK VIEWER ---

  const book = new BookViewer({
    pages: [welcomePage, chapterOne, chapterTwo],
    css: {
      width: "100vw",
      height: "100vh",
      //background: "#ddd"
    }
  });

  // --- RENDER THE STORYBOOK ---

  book.render(document.body);

} else {

  const welcomePage = makePage(
    "#e0f7ff",
    "Welcome to the Tale of Azurewing",
    "A gentle blue dragon and its tiny pet fish begin a journey across the sky‑lakes of Evermore."
  );

  const chapterOne = makePage(
    "#fff8e1",
    "Chapter One: The Sky‑Lake",
    "Azurewing glided under the shimmering sky‑lake, its scales glowing like morning frost. " +
    "In a tiny bubble‑bowl strapped to its horn, Ripple the fish peeked out, amazed at the floating islands below. His rainbow colors glinting in the mid-day sun. This particular sky‑lake was burgeoning with water and hanging lower than most usually do, they would have avoided it by it stretched as far as the eye could see. Asurewing eyeballed it expecting deluges of water to begin spilling out from it at any minute."
  );

  const chapterTwo = makePage(
    "#f3e5f5",
    "Chapter Two: The Storm of Whispers",
    "A soft rumble echoed across the clouds. Azurewing felt the winds twist strangely. " +
    "Ripple swirled in its bowl, sensing something ancient stirring beneath the sky‑lake’s under surface. " +
    "Together, they flew toward the whispering storm as it grew increasingly ominous as if filled with portent. It's voices were getting louder, in fact they could almost make out the words they were trying to say. 'Beware' they heard the cold warning too late, the wind picked up ferociously and Azurewing was struggling to fly. Rivers of water started pouring off of the dark lake to the earth far below. Ripple's water was sloshing in his bowl and he tried to hide in his little castle but it kept tumbling around. The lake kept getting lower pushing Azurewing down, he was getting very tired. This was untenable so he took a deep breath and dove up into the lake. It was the only way, the lake was about to take him anyway. He swam up and up and soon he struggled less as bouancy pulled him up to the surface. The sun was out and shining. The blue dragon checked his fish as he floated on the surface padding gently. 'Are you OK?' He asked Ripple? 'Define OK! Ripple grumbled. 'At least my bowl is clean.'"
  );


  // --- CREATE THE BOOK VIEWER ---

  const book = new BookViewer({
    pages: [welcomePage, chapterOne, chapterTwo],
    css: {
      width: "100vw",
      height: "100vh",
      //background: "#ddd"
    }
  });

  // --- RENDER THE STORYBOOK ---

  book.render(document.body);
}


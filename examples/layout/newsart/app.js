function NewsDemoPage() {
   
  const a1 = new NewsArticle({
    title: "New Modular UI Standard Emerges",
    article: "Developers are shifting toward deterministic, metadata-driven UI systems that eliminate layout work. 'I didn't have to do a thing?' one developer was quoted as saying. 'I'm can't believe I have a job' unsurprisingly later that developer was fired.",
    image: "wEU_Kqmp3j-QaL_R7HxWzLZhDv0IoA1yE19pCFCwUfQ.jpg",
    direction: "row"
  });

  const a2 = new NewsArticle({
    title: "Container-Relative Design Gains Traction",
    article: "Teams are abandoning viewport-bound CSS in favor of container-aware patterns for predictable rendering. It's as if when CSS was designed only simple pages were ever envisioned but today's web pages have a lot going on. I mean just the other day I saw a website that literally exploded, that's going all out. I've heard of flash but that loaded with a bang! Needless to say I shit my pants.",
    image: "WelcomeScan.jpg",
    direction: "row",
    imageFirst: false,
  });

  const a3 = new NewsArticle({
    title: "AI-Assisted Architecture Becomes Mainstream",
    article: "Engineers now routinely collaborate with AI to design APIs, debug layouts, and document workflows. They've even gone so far as to hangout and have beers. Some folks have worried they are trying to make love to the AI's but being geeks they haven't figured out how to do this yet.",
    image: "na6pi19286v11.jpg",
    direction: "column"
  });

  const a4 = new NewsArticle({
    title: "Composable Layouts Replace Framework Magic",
    article: "A new wave of UI frameworks emphasizes transparency, composability, and explicitness over hidden rules. That and zero documentation, fuck documentation. That is the most boring shit ever in a universe of boring shit and who thought up hidden rules? If they are hidden you can't follow them, duh!",
    image: "pexels-photo-633437.jpeg",
    direction: "column",
    imageFirst: false,
  });
  
  const a5 = new NewsArticle({
    title: "Usually Blind Squirrels Just Fall Out of Trees",
    article: "The main take away from our research is turns out it's hard to find blind squirrels. When we finally did encounter one it promptly ran off of a tree limb and broke it's neck. In desperation we blinded a squirrel and released it and it bit me and scratched my face then ran off and got hit by a car. We didn't find any more blind squirrels after that and the Police said if we blind any he will arrest us and kick our asses. We all headed home after that, never once haven't seen a blind squirrel find a nut.",
    image: "pexels-photo-824161.jpeg"
  });
  
  const a6 = new NewsArticle({
    title: "Cat's Steal Car and Just Hangout",
    article: "A distraught man called 911 to report that cat's had stolen his car. Apparently they had started to gather around 11pm and by midnight had mostly covered the hood of his car and showed no inclinations to move even when attempting to motivate them with some food.",
    image: "weekend-afternoon-randomness-37-photos-10.jpg",
    direction: "row",
    imageFirst: false,
  });
  
  const a7 = new NewsArticle({
    title: "Contributions and Submissions",
    article: "If you'd like to contribute to this publication dream on, seriously, who needs your help I can mess this up all by myself. Truth is I'm still trying to figure out how to use my email. I have so much content I can't go through it all. What's that you have a video? Step right this way.",
    image: null,
    direction: "row"
  });

  const page = new FlexibleColumnsPage({
    columns: [
      { width: "65%", items: [a1, a2, a5, a6, a7] },
      { width: "35%", items: [a3, a4] }
    ]
  });

  //page.addColumns();
  return page;
}

const base = "/js/rnd/domicile/examples/layout/newsart";
const color = getRandomColor();

new NavBarHLink({
  base: base,
  logoText: "DOMicile",
  logoHTML: `<span style="color:${color};"><b>DOM</b></span>icile Tribune`,
  logoImage: null, // "/assets/logo.png" or null if no image
  links: [
    { label: "Home", href: "/" },
    { label: "Blog", href: "/blog" },
    { label: "Test", href: "/contact" },
    { label: "About", href: "/about" }
  ]
}).render(document.getElementById("root"));
  
const lead = new Box({css: {background: '#F1E9D2', color: 'black'}},   
  new ImageBox({
      props: { src: 'img9.jpg', alt: "Bad" },
      css: {
        width: "100%",
        height: "200px",
        objectFit: "cover",
        marginRight: "12px",
        flexShrink: 0
      }
  }),
  new Element('h1', { props: {textContent: "Something Bad Happened Today"}}),
  new Element('p', { props: {textContent: "Someone pissed off a rich person so this time something will be done. This is what we call Justice or Just Us. Want to molest some little girls? What is your economic status sir? Poor? Please go straight to jail, you are rich you say? Just hand in your get out of jail free card and be right on your way. Oligarchs who just want to keep having way more then is good for anyone keep going unchecked in a democratic system to cowardly and neutered to do anything about it."}}),
  new Element('p', { props: {textContent: "Nepotism, racism, bigotry. Those words used to mean something but have been minimized and gas-lighted until they are just differences of opinion. Ask yourself who wins when the public is divided? Are they dividing us on purpose? If so that would indicate the news is indeed fake and ironically the only time it is called fake is when it it being truthful by the liars that are being called out. It's all just lies because that is all that is acceptable. You have to take responsibility for the truth. Lies, that was just a parody, I was just joking around, you don't have to take responsibility for lies."}}),
  new Element('p', { props: {textContent: "Something bad happened today. As it did yesterday and it will again tomorrow. It's a bad world. News is good, 24 Hour news is not. Espessially since you don't get more news just more hashing over that same news, day after day, month after month, year after year. Try an experiment. Put down the news for 3 months then pick it back up again and ask yourself what did you really miss?"}}),
  new Element('p', { props: {textContent: "It made me feel like I had been whipped up intentionally and my emotions manipulated. That a lost of news was trying to engage me through negative means. I've also noticed the quality of news has dropped dramatically. In school we learned to ask who, what, when, where, why and how and almost never are all these questions answered. I struggle a lot with finding out simply where something happened. I'll get a town but no state. Many missing dates which is critical for timely information."}}),
  new Element('p', { props: {textContent: "We'll now I'm rambling, anyhoo welcome and enjoy the articles."}}),
  new Element('br'),
  new Element('hr')
);
lead.render(document.getElementById("root"));
NewsDemoPage().render(document.getElementById("root"));
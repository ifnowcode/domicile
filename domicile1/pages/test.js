function Test1Tab() {
  return [
      new DemoWidget(), // deprecated
      new Element("a", { props: { href: "https://ifnowcode.github.io", target: "_blank" }}, new ImageBox({ props: { src: imagerelurl + "granite-raw-block-250x250.jpg" }})),
      new Element("br"),
      new Button({ props: { textContent: "Click Me!", onclick: `alert("Leave me alone!")` }}),
      new ButtonCounter({css: { background: 'red' }}),
      new Element("a", { css: { display: "block" }, props: { href: "https://github.com/ifnowcode", target: "_blank", textContent: "github.ifnowcode" }}),
      new Element("a", { css: { display: "block" }, props: { href: "https://ifnowcode.github.io", target: "_blank", textContent: "ifnowcode.github.io" }}),
    ]
}

function Test2Tab() {
  return [
    new ListWithControls({
      initialItems: ['First task', 'Second task', 'Third task']
    }),
    new ModalDemo(),
    new GridLayoutDemo(),
  ];
}

function Test3Tab() {
  const data = {
    columns: [
      { key: "name", label: "Name" },
      { key: "mass", label: "Mass" }
    ],
    rows: [
      { name: "Alice", mass: 42 },
      { name: "Bob", mass: 55 },
      { name: "Jan", mass: 80 },
      { name: "Tyler", mass: 15 }
    ]
  };

  const table = new Table(data);

  setTimeout(() => table.addRow({ name: "Fred", mass: 200 }), 2000);
  setTimeout(() => table.addRow({ name: "John", mass: 100 }), 4000);

  return [
    new DigitalClock(),
    new Element("p", { props: { textContent: "Test content" } }),
    new Box({}, table),
    new Element('br'),
    new Element('hr'),
    //new Table2(data),
  ];
}

function Test4Tab() {
  return [
    new HTMLBox({ html: "<h1>This is Test4</h1>" }),
    new Typewriter({ text: "This is a test, but is it the only test?!" }),
    new Typewriter({ delay: 1000 * 4, text: "Well I hope this answers your question." }),
    new Calendar({
      onSelect: ({ year, month, day }) => {
        console.log("Selected:", year, month + 1, day);
      }
    }),
  ];
}

function getTab(fnPageContents=Error404Page) {
  const tab = [];
  //tab.push(new NavBar());
  const contents = fnPageContents();
  contents.forEach((key,value) => {
    tab.push(key);
  });
  //tab.push(new Footer());
  return tab;
}

function TestPage() {
  const tabbed = new TabbedWidget({
    tabs: [
      { label: "Test1", content: getTab(Test1Tab)},
      { label: "Test2", content: getTab(Test2Tab)},
      { label: "Test3", content: getTab(Test3Tab)},
      { label: "Test4", content: getTab(Test4Tab)},
    ]
  });

  return [
      tabbed,
    ];
}
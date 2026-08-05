const PUBLIC_ENDPOINTS = [
  { name: "JSONPlaceholder Posts", url: "https://jsonplaceholder.typicode.com/posts" },
  { name: "JSONPlaceholder Users", url: "https://jsonplaceholder.typicode.com/users" },
  { name: "JSONPlaceholder Todos", url: "https://jsonplaceholder.typicode.com/todos" },
  //{ name: "Public APIs Directory", url: "https://api.publicapis.org/entries" },
  //{ name: "Public APIs Categories", url: "https://api.publicapis.org/categories" },
  //{ name: "Random Public API", url: "https://api.publicapis.org/random" }
];

function ApiBrowserPage() {
  const dropdown = new Element("select", {
    props: {
      onchange: (e) => loadEndpoint(e.target.value)
    }
  });

  dropdown.addChild(
    new Element("option", {
      props: { value: "", textContent: "--- SELECT ---", disabled: true, selected: true  }
    })
  );

  // Populate dropdown
  PUBLIC_ENDPOINTS.forEach(ep => {
    dropdown.addChild(
      new Element("option", {
        props: { value: ep.url, textContent: ep.name }
      })
    );
  });

  const viewer = new JSONViewer({
    css: { marginTop: "2em", background: "#222" }
  });

  const output = new Box({
    css: { padding: "20px", whiteSpace: "pre-wrap", fontFamily: "monospace" },
    props: { textContent: "Select an endpoint above." }
  });

  function loadEndpoint(url) {
    const loader = new RESTLoader(url);
    //console.log("0utput:", output);
    output.dom.textContent = "Loading...";
    //output.refresh();

    loader.onLoad = data => {
      viewer.renderJSON(data);
      //console.log("0n L0a@d:", JSON.stringify(data, null, 2));
      output.dom.textContent = JSON.stringify(data, null, 2);
      //output.refresh();
    };
  }

  return [
    new Box({ css: { padding: "20px" } },
      new Element("h2", { props: { textContent: "Public API Browser" } }),
      dropdown,
      viewer,
      new Element("h3", { props: { textContent: "Raw Data" } }),
      output
    )
  ];
}
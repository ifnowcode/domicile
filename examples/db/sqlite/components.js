class ContactList extends Element {
  constructor(metadata = {}) {
    super("div", {
      css: {
        padding: "20px",
        fontFamily: "sans-serif"
      },
      ...metadata
    });

    // Shell container for rows
    this.listContainer = new Element("div");
    this.addChild(this.listContainer);
  }

  onMount() {
    this.loadContacts();
  }
  
  async loadContacts() {
    const res = await fetch("http://localhost:3000/api/contacts");
    const contacts = await res.json();
    this.renderList(contacts);
  }

  renderList(contacts) {
    const container = this.listContainer.dom;

    // Clear DOM children directly
    container.innerHTML = "";

    contacts.forEach(contact => {
      const row = document.createElement("div");
      row.style.padding = "12px";
      row.style.marginBottom = "8px";
      //row.style.background = "#f0f0f0";
      row.style.borderRadius = "6px";

      row.innerHTML = `
        <div style="font-weight:bold">${contact.name}</div>
        <div>${contact.email}</div>
        <div>${contact.phone}</div>
      `;

      container.appendChild(row);
    });
  }
}


class ContactPage extends Layout {
  constructor() {
    super("div", {
      css: {
        width: "100vw",
        height: "100vh",
        //background: "#ffffff",
        overflow: "auto"
      }
    });

    this.list = new ContactList();
    this.addChild(this.list);
  }

  onResize(width, height) {
    // No special behavior needed yet
  }
}

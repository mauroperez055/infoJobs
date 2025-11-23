class DevJobsAvatar extends HTMLElement {
  constructor() {
    super();
    // encapsula el elemento para que los estilos de afuera no le afecten
    this.attachShadow({ mode: "open" });
  }

  createUrl(service, username) {
    return `https://unavatar.io/${service}/${username}`
  }

  render() {

    const service = this.getAttribute('service') ?? 'github';
    const username = this.getAttribute('username') ?? 'midudev';
    const size = this.getAttribute('size') ?? '40';
    
    const url = this.createUrl(service, username);

    //con shadow DOM ya no se escribe this.innerHTML
    this.shadowRoot.innerHTML = `
    <style>
      img {
        width: ${size}px;
        height: ${size}px;
        border-radius: 999px;
      }
    </style>

      <img 
        src="${url}" 
        alt="Avatar de ${username}" 
        class="avatar" 
      />
    `;
  }

  connectedCallback() {
    this.render();
  }
}

customElements.define("devjobs-avatar", DevJobsAvatar);

export interface IComponentMetadata {
  tag: string,
  template: Node,
  style?: string,
  useShadow?: boolean,
}

type Constructor<T = any> = new (...args: any[]) => T;

export function Component<T extends Constructor>(metadata: IComponentMetadata) {
  return (cls: T) => {
    metadata = Object.assign({
      useShadow: true,
    }, metadata);

    if (metadata.tag.indexOf('-') <= 0)
      throw new Error('Custom element tags require atleast on hyphen');

    let style: HTMLStyleElement;
    if (metadata.style) {
      style = document.createElement('style');
      style.textContent = metadata.style;
    }

    const connectedCallback = cls.prototype.connectedCallback;
    cls.prototype.connectedCallback = function() {
      if (metadata.useShadow) {
        this.attachShadow({ mode: 'open' });
        if (style) this.shadowRoot.appendChild(style);
        if (metadata.template) this.shadowRoot.appendChild(metadata.template);
      } else {
        if (style) this.appendChild(style);
        if (metadata.template) this.appendChild(metadata.template);
      }
      if (connectedCallback) connectedCallback.call(this);
    };

    customElements.define(metadata.tag, cls);
    return cls;
  };
}

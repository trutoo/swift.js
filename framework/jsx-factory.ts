/**
 * React-like createElement function so we can use JSX in our TypeScript/JavaScript code.
 */
export function createElement(tag: string, attrs: { [attr: string]: any }): HTMLElement {
  let element: HTMLElement = document.createElement(tag);
  for (let name in attrs) {
    if (name && attrs.hasOwnProperty(name)) {
      let value: string | null | boolean = attrs[name];
      if (value === true) {
        element.setAttribute(name, name);
      } else if (value !== false && value != null) {
        element.setAttribute(name, value.toString());
      }
    }
  }
  for (let i: number = 2; i < arguments.length; i++) {
    let child: any = arguments[i];
    element.appendChild(
      child.nodeType == null ?
        document.createTextNode(child.toString()) : child);
  }
  return element;
}

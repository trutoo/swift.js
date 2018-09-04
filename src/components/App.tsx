import { Component } from '../../framework/index';

@Component({
  tag: 'x-app',
  template: (
    <main>
      <h1>Hello world!</h1>
      <h2>This is a first test</h2>
    </main>
  ),
  style: `
  :host {
    color: green;
  }
  `,
})
export class App extends HTMLElement {
}

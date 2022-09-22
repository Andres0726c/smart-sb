import { Component } from '@angular/core';

@Component({
  selector: 'policy-issuer-entry',
  template: `<div class="remote-entry">
    <h2>policy-issuer's Remote Entry Component</h2>
  </div>`,
  styles: [
    `
      .remote-entry {
        background-color: #143055;
        color: white;
        padding: 5px;
      }
    `,
  ],
})
export class RemoteEntryComponent {}

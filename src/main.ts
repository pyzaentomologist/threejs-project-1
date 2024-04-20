import './style.css'
import { setupCounter } from './counter'

document.querySelector<HTMLDivElement>("#app")!.innerHTML = `
  <div>
    <p>New project!</p>
  </div>
`;

setupCounter(document.querySelector<HTMLButtonElement>('#counter')!)
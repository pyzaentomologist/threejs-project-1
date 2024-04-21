import './style.css'
import { scene } from './scene'

document.querySelector<HTMLDivElement>("#app")!.innerHTML = `
  <canvas id="canvas">
  </canvas>
`;

scene(document.querySelector<HTMLButtonElement>('#canvas')!)
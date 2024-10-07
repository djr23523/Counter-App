import { LitElement, html, css } from "lit";
import { DDDSuper } from "@haxtheweb/d-d-d/d-d-d.js";

export class counterApp extends DDDSuper(LitElement) {

  static get tag() {
    return "counter-app";
  }

  constructor() {
    super();
    this.title = "";
    this.counter=0;
    this.min=0;
    this.max=0;
    this.color1=false;
    this.color2=false;
  }

  static get properties() {
    return {
      title: { type: String },
      counter: { type : Number },
      min: { type : Number },
      max: { type : Number },
      color1: { type : Boolean, reflect : true},
      color2: { type : Boolean, reflect : true}
    };
  }

  static get styles() {
    return [super.styles,
    css`
      :host {
        display: block;
        color: var(--ddd-theme-primary);
        background-color: var(--red-theme-accent);
        font-family: var(--ddd-font-navigation);
        font-size: var(--my-element-font-size, var(--ddd-font-size-s));
        font-size:2.5rem;
      }
      .wrapper {
        margin: var(--ddd-spacing-2);
        padding: var(--ddd-spacing-4);
      }
      div {
        padding: 0;
        margin: 0;
      }
      button:focus{
        padding:9px;
        border-radius:10px;
        background-color:purple;
      }
      button:hover{
        color:pink;
        background-color:dark green;
        padding:6px;
        width:10wh;
        height:6vh;
      }
      .color1{
        margin: var(--ddd-spacing-2);
        padding: var(--ddd-spacing-4);
        color:orange;
      }
      .color2{
        margin: var(--ddd-spacing-2);
        padding: var(--ddd-spacing-4);
        color:green;
      }
      .color3{
        margin: var(--ddd-spacing-2);
        padding: var(--ddd-spacing-4);
        color:blue;
      }
      .color4{
        margin: var(--ddd-spacing-2);
        padding: var(--ddd-spacing-4);
        color:red;
      }
      
      
    `];
  }
  increment(){
    if(this.counter<this.max){
      this.counter++;
    }
  }
  decrement(){
    if(this.counter>this.min){
      this.counter--;
    }
  }
  colorClass(){
    if(this.counter==18){
      return "color1"
    }
    else if(this.counter==21){
      return "color2"
    }
    else if(this.counter==this.min){
      return "color3"
    }
    else if(this.counter==this.max){
      return "color4"
    }
    else{
      return "wrapper"
    }
  }
  updated(changedProperties) {
    if (changedProperties.has('counter')) {
      this.makeItRain
    }
  }
  
  makeItRain() {
    // this is called a dynamic import. It means it won't import the code for confetti until this method is called
    // the .then() syntax after is because dynamic imports return a Promise object. Meaning the then() code
    // will only run AFTER the code is imported and available to us
    import("@haxtheweb/multiple-choice/lib/confetti-container.js").then(
      (module) => {
        // This is a minor timing 'hack'. We know the code library above will import prior to this running
        // The "set timeout 0" means "wait 1 microtask and run it on the next cycle.
        // this "hack" ensures the element has had time to process in the DOM so that when we set popped
        // it's listening for changes so it can react
        setTimeout(() => {
          // forcibly set the poppped attribute on something with id confetti
          // while I've said in general NOT to do this, the confetti container element will reset this
          // after the animation runs so it's a simple way to generate the effect over and over again
          this.shadowRoot.querySelector("#confetti").setAttribute("popped", "");
        }, 0);
      }
    );
  }
  render() {
    return html`
<div class="${this.colorClass()}">
  <div id="confetti">${this.title}</div>
  
    <span>${this.counter} </span><br>
    <button @click="${this.increment}" ?disabled="${this.max === this.counter}" >+</button>
    <button @click="${this.decrement}" ?disabled="${this.min === this.counter}">-</button>
</div>`;
  }

  /**
   * haxProperties integration via file reference
   */
  static get haxProperties() {
    return new URL(`./lib/${this.tag}.haxProperties.json`, import.meta.url)
      .href;
  }
}

globalThis.customElements.define(counterApp.tag, counterApp);
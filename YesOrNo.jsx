class YesOrNo extends HTMLElement{
  constructor(){
    super();
    let shadowRoot = this.attachShadow({mode: 'closed'});
    shadowRoot.innerHTML = '<style>:host([hidden]) { display: none;}:host{ display: block;}p{text-align:centered;vertical-align: middle;background-size: contain;font-size:10vw;color:white;background-repeat: no-repeat;}</style>';
    this.text = document.createElement('p');
    shadowRoot.appendChild(this.text);
    this.url = "https://yesno.wtf/api";
  }
  connectedCallback(){
    this.getAnswer();
  }
  display(data){
    this.text.style.backgroundImage = "url('"+data.image+"')";
    this.text.innerText = data.answer;
  }
  get answer(){
    if(this.hasAttribute('answer')){
      return this.getAttribute('answer');
    }else{
      return null;
    }
  }
  set answer(value){
    if(value && value === 'yes' || value === 'maybe' || value === 'no'){
      this.setAttribute('answer', value);
    }else{
      this.removeAttribute('answer');
    }
  }
  async getAnswer(){
    try{
      let response = await fetch(this.url);
      let data = await response.json();
      console.log(data);
      this.display(data);
    }catch(error){
      console.error(error.message, error);
    }
  }
}

customElements.define('yes-or-no', YesOrNo);
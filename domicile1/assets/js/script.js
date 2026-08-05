function createElement(token, {style={}, props={}}={}) {
  let el = document.createElement(token);
  if (!el) return null;
  Object.assign(el.style, style);
  Object.assign(el, props);
  return el;
}

let display='inline block';
let div = createElement('div');
let p = createElement('p', {style: {background: 'red'}, props: {id: 'frag', textContent: "Fubar", className: 'bitch'} });
div.appendChild(p);
let img = createElement('img', {style: {display: display}, props: {src: 'granite-raw-block-250x250.jpg'} });
div.appendChild(img);
img = createElement('img', {style: {display: display}, props: {src: 'granite-raw-block-250x250.jpg'} });
div.appendChild(img);
document.body.appendChild(div);

document.addEventListener("DOMContentLoaded", () => {
  let body = document.getElementById('body');
  console.log("Body", body);
});
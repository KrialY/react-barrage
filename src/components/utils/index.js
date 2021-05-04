export function addClass(dom, name) {
  const preClassNameArr = dom.className.split(' ');
  if(!preClassNameArr.includes(name)) {
    dom.className += ' ' + name;
  }
}

export function removeClass(dom, name) {
  const preClassNameArr = dom.className.split(' ');
  const index = preClassNameArr.indexOf(name);
  if(index >= 0) {
    preClassNameArr.splice(index, 1);
    dom.className = preClassNameArr.join(" ");
  }
}

export function addStyle(dom, key, value) {
  dom.style[key] = value;
}

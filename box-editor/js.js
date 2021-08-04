document.querySelectorAll('input').forEach((input) => {
  input.addEventListener('input', inputChanged);
});
function inputChanged(e) {
  document
    .getElementById('box')
    .style.setProperty(`--${e.target.name}`, e.target.value);
}

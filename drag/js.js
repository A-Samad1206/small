const drags = document.querySelectorAll('.drag');
const containers = document.querySelectorAll('.container');

drags.forEach((drag) => {
  drag.addEventListener('dragstart', () => {
    drag.classList.add('dragging');
  });
  drag.addEventListener('dragend', () => {
    drag.classList.remove('dragging');
  });
});

containers.forEach((container) => {
  container.addEventListener('dragover', (e) => {
    e.preventDefault();
    const afterElement = getDragAfterPos(container, e.clientY);
    const crtDrag = document.querySelector('.dragging ');
    if (afterElement == null) {
      container.appendChild(crtDrag);
    } else {
      container.insertBefore(crtDrag, afterElement);
    }
  });
});
function getDragAfterPos(container, y) {
  const draggableElements = [
    ...container.querySelectorAll('.drag:not(.dragging)'),
  ];
  return draggableElements.reduce(
    (closest, child) => {
      const box = child.getBoundingClientRect();

      const offset = y - box.top - box.height / 2;

      if (offset < 0 && offset > closest.offset) {
        return { offset, element: child };
      } else {
        return closest;
      }
    },
    { offset: Number.NEGATIVE_INFINITY }
  ).element;
}

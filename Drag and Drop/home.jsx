const items = document.querySelectorAll(".item");
const columns = document.querySelectorAll(".column");

let draggedItem = null;

items.forEach((item) => {
  item.addEventListener("dragstart", () => {
    draggedItem = item;
    setTimeout(() => (item.style.display = "none"), 0);
  });

  item.addEventListener("dragend", () => {
    setTimeout(() => {
      draggedItem.style.display = "block";
      draggedItem = null;
    }, 0);
  });
});

columns.forEach((column) => {
  column.addEventListener("dragover", (e) => {
    e.preventDefault();
    column.classList.add("highlight");
  });

  column.addEventListener("dragleave", () => {
    column.classList.remove("highlight");
  });

  column.addEventListener("drop", () => {
    column.classList.remove("highlight");
    if (draggedItem) {
      column.appendChild(draggedItem);
    }
  });
});

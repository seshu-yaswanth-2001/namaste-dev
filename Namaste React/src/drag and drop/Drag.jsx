import { useState } from "react";
import "./drag.css";

const Drag = () => {
  const [columns, setColumns] = useState({
    task: ["task1", "task2", "task3"],
    inProgress: ["task0"],
    done: [],
  });

  const [draggedItem, setDraggedItem] = useState(null);

  const handleDragStart = (item, fromColumn) => {
    setDraggedItem({ item, fromColumn });
  };

  const handleDrop = (toColumn) => {
    if (!draggedItem) return;

    
    if (draggedItem.fromColumn === toColumn) {
      setDraggedItem(null);
      return;
    }

    setColumns((prev) => {
      const fromItems = prev[draggedItem.fromColumn].filter(
        (task) => task !== draggedItem.item
      );
      const toItems = [...prev[toColumn], draggedItem.item];

      return {
        ...prev,
        [draggedItem.fromColumn]: fromItems,
        [toColumn]: toItems,
      };
    });

    setDraggedItem(null);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleAddTask = () => {
    const taskName = prompt("Enter new task name:");
    if (!taskName) return;

    setColumns((prev) => ({
      ...prev,
      task: [...prev.task, taskName],
    }));
  };

  return (
    <div className="divContainer">
      {Object.keys(columns).map((columnKey) => (
        <div
          key={columnKey}
          className="column"
          onDragOver={handleDragOver}
          onDrop={() => handleDrop(columnKey)}
        >
          <h3>{columnKey}</h3>
          {columns[columnKey].map((task) => (
            <div
              className="item"
              key={task}
              draggable
              onDragStart={() => handleDragStart(task, columnKey)}
            >
              {task}
            </div>
          ))}
          {columnKey === "task" && (
            <span className="addTask" onClick={handleAddTask}>
              + Add a Task
            </span>
          )}
        </div>
      ))}
    </div>
  );
};

export default Drag;

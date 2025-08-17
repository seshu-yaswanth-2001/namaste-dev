import React, { useState } from "react";
import "./drag.css";

// Sample initial data
const initialData = {
  todo: [
    { id: "task-1", label: "Task 1" },
    { id: "task-2", label: "Task 2" },
  ],
  "in progress": [{ id: "task-3", label: "Task 3" }],
  done: [{ id: "task-4", label: "Task 4" }],
};

export default function KanbanBoard() {
  const [columns, setColumns] = useState(initialData);
  const [draggedItem, setDraggedItem] = useState(null);

  const [editingTask, setEditingTask] = useState(null);
  const [editValue, setEditValue] = useState("");

  const [newTask, setNewTask] = useState("");
  const [taskOpen, setTaskOpen] = useState(false);

  const handleDragStart = (task, fromColumn) => {
    setDraggedItem({ task, fromColumn });
  };

  const handleDrop = (toColumn) => {
    if (!draggedItem) return;

    if (draggedItem.fromColumn === toColumn) {
      setDraggedItem(null);
      return;
    }

    setColumns((prev) => {
      const fromItems = prev[draggedItem.fromColumn].filter(
        (task) => task.id !== draggedItem.task.id
      );
      const toItems = [...prev[toColumn], draggedItem.task];

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

  const handleLabelClick = (task) => {
    setEditingTask(task.id);
    setEditValue(task.label);
  };

  const saveEditedTask = (taskId, columnId) => {
    if (!editValue.trim()) {
      setEditingTask(null);
      return;
    }
    setColumns((prev) => {
      return {
        ...prev,
        [columnId]: prev[columnId].map((t) =>
          t.id === taskId ? { ...t, label: editValue.trim() } : t
        ),
      };
    });
    setEditingTask(null);
  };

  const handleEditKeyPress = (e, taskId, columnId) => {
    if (e.key === "Enter") {
      saveEditedTask(taskId, columnId);
    }
  };

  const deleteTask = (taskId, columnId) => {
    setColumns((prev) => {
      return {
        ...prev,
        [columnId]: prev[columnId].filter((t) => t.id !== taskId),
      };
    });
  };

  const addNewTaskInline = () => {
    if (newTask.trim()) {
      const newTaskObj = {
        id: `task-${Date.now()}`,
        label: newTask.trim(),
      };
      setColumns((prev) => ({
        ...prev,
        todo: [...prev.todo, newTaskObj],
      }));
      setNewTask("");
      setTaskOpen(false);
    }
  };

  return (
    <div>
      <h2 style={{ textAlign: "center" }}>Drag & Drop</h2>
      <div className="board">
        {["todo", "in progress", "done"].map((col) => (
          <div
            key={col}
            className="column"
            onDragOver={handleDragOver}
            onDrop={() => handleDrop(col)}
          >
            <h4>
              {col === "todo"
                ? "To Do"
                : col === "in progress"
                ? "In Progress"
                : "Done"}
            </h4>

            {columns[col].map((task) => (
              <div
                key={task.id}
                className="task"
                draggable
                onDragStart={() => handleDragStart(task, col)}
              >
                {editingTask === task.id ? (
                  <input
                    className="task-edit-input"
                    type="text"
                    value={editValue}
                    autoFocus
                    onChange={(e) => setEditValue(e.target.value)}
                    onBlur={() => saveEditedTask(task.id, col)}
                    onKeyDown={(e) => handleEditKeyPress(e, task.id, col)}
                  />
                ) : (
                  <span
                    className="task-label"
                    onClick={() => handleLabelClick(task)}
                  >
                    {task.label}
                  </span>
                )}
                <span
                  className="icon-button"
                  onClick={() => deleteTask(task.id, col)}
                >
                  🗑️
                </span>
              </div>
            ))}

            {col === "todo" && (
              <div className="add-task-inline">
                {taskOpen ? (
                  <input
                    className="add-task-input-inline"
                    type="text"
                    placeholder="Enter new task..."
                    value={newTask}
                    autoFocus
                    onChange={(e) => setNewTask(e.target.value)}
                    onKeyDown={(e) =>
                      e.key === "Enter" ? addNewTaskInline() : null
                    }
                    onBlur={() => setTaskOpen(false)}
                  />
                ) : (
                  <span
                    className="add-task-placeholder"
                    onClick={() => setTaskOpen(true)}
                  >
                    + Add a Task
                  </span>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

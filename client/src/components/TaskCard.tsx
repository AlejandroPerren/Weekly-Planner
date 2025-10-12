import type { Task } from "../types/task.types";

interface CardProps {
  task: Task;
}
const TaskCard = ({ task }: CardProps) => {
  return (
    <div className="bg-gray-200 text-black p-2 rounded shadow-sm">
      {task.content}
    </div>
  );
};

export default TaskCard;

import { createHashRouter } from "react-router-dom";
import App from "./App";
import KanbanBoard from "./pages/KanbanBoard";
import NotFound from "./pages/404";


export const router = createHashRouter([
  {
    path: "/",
    element: <App/>,
    children: [
      { path: "kanban", element: <KanbanBoard /> },
      { path: "*", element: <NotFound /> },
    ],
  },
]);

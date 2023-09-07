import { Routes, Route, Navigate } from "react-router-dom";
import { Dashboard } from "@/layouts";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

function App() {
  return (
    <DndProvider backend={HTML5Backend}>
      <Routes>
        <Route path="/dashboard/*" element={<Dashboard />} />
        <Route path="*" element={<Navigate to="/dashboard/home" replace />} />
      </Routes>
    </DndProvider>
  );
}

export default App;

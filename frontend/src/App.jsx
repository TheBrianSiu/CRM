import { Routes, Route, Navigate} from 'react-router-dom';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { useAuth0 } from '@auth0/auth0-react';
import { Dashboard } from '@/layouts';
import Auth from './layouts/auth';
import { useAccessToken } from './data';

function App() {
  const { isLoading, isAuthenticated } = useAuth0();
  useAccessToken();
  return (
    <DndProvider backend={HTML5Backend}>
      <Routes>
        {!isLoading && !isAuthenticated && (
          <>
            <Route path="/sign-in" element={<Auth />} />
            <Route path="/*" element={<Navigate to="/sign-in" replace />} />
          </>
        )}
        {isAuthenticated && <Route path="/*" element={<Dashboard />} />}
      </Routes>
    </DndProvider>
  );
}

export default App;

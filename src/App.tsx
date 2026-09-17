import { HashRouter, Routes, Route } from 'react-router-dom';
import { AppShell } from './components/layout/AppShell';
import { Today } from './routes/Today';
import { Exercises } from './routes/Exercises';
import { ExerciseDetail } from './routes/ExerciseDetail';
import { Progress } from './routes/Progress';

function App() {
  return (
    <HashRouter>
      <Routes>
        <Route element={<AppShell />}>
          <Route index element={<Today />} />
          <Route path="exercises" element={<Exercises />} />
          <Route path="exercises/:id" element={<ExerciseDetail />} />
          <Route path="progress" element={<Progress />} />
        </Route>
      </Routes>
    </HashRouter>
  );
}

export default App;

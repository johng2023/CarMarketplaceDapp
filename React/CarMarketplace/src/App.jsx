import { BrowserRouter, Routes, Route } from "react-router-dom";
import CarGrid from "./components/CarGrid";
import ListCarForm from "./components/ListCarForm";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<CarGrid></CarGrid>} />
        <Route path="/list" element={<ListCarForm></ListCarForm>} />
      </Routes>
    </BrowserRouter>
  );
}

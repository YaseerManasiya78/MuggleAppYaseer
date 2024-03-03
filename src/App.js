import Loader from "./components/Loader";
import React, { Suspense, lazy } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./index.css";
const PaymentForm = lazy(() => import("./pages/PaymentForm"));
const Success = lazy(() => import("./pages/Success"));

function App() {
  return (
    <Router>
      <Suspense fallback={<Loader />}>
        <Routes>
          <Route path="/" element={<PaymentForm />} />
          <Route path="/success" element={<Success />} />
        </Routes>
      </Suspense>
    </Router>
  );
}

export default App;

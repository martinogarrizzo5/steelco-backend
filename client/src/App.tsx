import { useEffect } from "react";
import { Route, Routes, useNavigate, useLocation } from "react-router-dom";
import SnackBar from "./components/SnackBar";
import AppLayout from "./layout/AppLayout";
import AddFactory from "./pages/AddFactory";
import EditFactory from "./pages/EditFactory";
import EditInjury from "./pages/EditInjury";
import FactoriesScreen from "./pages/Factories";
import InitialLoading from "./pages/InitialLoading";
import ReportScreen from "./pages/Report";
import AddInjury from "./pages/AddInjury";
import LoginScreen from "./pages/Login";
import { useAuth } from "./store/authStore";
import { useSnackBar } from "./store/snackBarStore";
import axios from "axios";
import { setupAuthRefreshInterceptor } from "./utils/axiosAuthInterceptor";

function App() {
  const auth = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const snackBar = useSnackBar();

  useEffect(() => {
    setupAuthRefreshInterceptor(axios, () => auth.logout());
    auth.fetchUser();
  }, []);

  useEffect(() => {
    const path = location.pathname;

    // auth guards
    if (auth.isUserLoading) return;
    if (auth.user === null && path === "/login") return;
    if (auth.user === null) return navigate("/login", { replace: true });

    // redirect to dashboard if user is logged in
    if (path === "/" || path === "/login" || path === "/app") {
      return navigate("/app/factory", { replace: true });
    }
  }, [auth]);

  if (auth.isUserLoading) return <InitialLoading />;

  return (
    <>
      <Routes>
        <Route path="/app/*" element={<AppLayout />}>
          <Route path="factory" element={<FactoriesScreen />} />
          <Route path="factory/add" element={<AddFactory />} />
          <Route path="factory/:id" element={<EditFactory />} />
          <Route path="factory/:id/report" element={<ReportScreen />} />
          <Route path="injury/add" element={<AddInjury />} />
          <Route path="injury/:id" element={<EditInjury />} />
        </Route>
        <Route path="/login" element={<LoginScreen />} />
      </Routes>
      {snackBar.isShown && <SnackBar />}
    </>
  );
}

export default App;

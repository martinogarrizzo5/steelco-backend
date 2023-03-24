import { useEffect } from "react";
import { MdSmartScreen } from "react-icons/md";
import {
  Route,
  Routes,
  useNavigate,
  useLocation,
  Navigate,
} from "react-router-dom";
import SnackBar from "./components/SnackBar";
import AppLayout from "./layout/AppLayout";
import AddFactory from "./pages/AddFactory";
import EditFactory from "./pages/EditFactory";
import FactoriesScreen from "./pages/Factories";
import InitialLoading from "./pages/InitialLoading";
import InjuriesScreen from "./pages/Injuries";
import AddInjury from "./pages/AddInjury";
import LoginScreen from "./pages/Login";
import { useAuth } from "./store/authStore";
import { useSnackBar } from "./store/snackBarStore";

function App() {
  const auth = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const snackBar = useSnackBar();

  useEffect(() => {
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
          <Route path="factory/:id/report" element={<InjuriesScreen />} />
          <Route path="injury/add" element={<AddInjury />} />
        </Route>
        <Route path="/login" element={<LoginScreen />} />
      </Routes>
      {snackBar.isShown && <SnackBar />}
    </>
  );
}

export default App;

import { useEffect } from "react";
import {
  Route,
  Routes,
  useNavigate,
  useLocation,
  Outlet,
  Navigate,
} from "react-router-dom";
import SnackBar from "./components/SnackBar";
import FactoriesScreen from "./pages/Factories";
import Loading from "./pages/Loading";
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
      return navigate("/app", { replace: true });
    }
  }, [auth]);

  if (auth.isUserLoading) return <Loading />;

  return (
    <>
      <Routes>
        <Route path="/app/*" element={<Outlet />}>
          <Route path="" element={<FactoriesScreen />} />
        </Route>
        <Route path="/login" element={<LoginScreen />} />
        <Route path="*" element={<Navigate to="/app/factories" />} />
      </Routes>
      {snackBar.isShown && <SnackBar />}
    </>
  );
}

export default App;

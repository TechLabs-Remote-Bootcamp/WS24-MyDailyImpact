import { useAuth } from "../../../hooks/useAuth";
import HeaderLoggedIn from "./HeaderLoggedIn";
import HeaderNotLoggedIn from "./HeaderNotLoggedIn";

const Header = () => {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return null;
  }
  return isAuthenticated ? <HeaderLoggedIn /> : <HeaderNotLoggedIn />;
};

export default Header;

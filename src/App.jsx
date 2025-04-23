import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Navigate,
  Route,
  Routes,
} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Signup from "./pages/Signup";
import Signin from "./pages/Signin";
import Home from "./pages/Home";
import { onAuthStateChanged } from "firebase/auth";
import { loginSuccess, logout } from "./redux/actions/authActions";
import { auth } from "./firebase";
import Profile from "./pages/Profile";
import Loading from "./components/layout/Loading";
import MyNetwork from "./components/mynetwork/MyNetwork";
import Jobs from "./components/jobs/Jobs";
import Messaging from "./components/messaging/Messaging";
import Notifications from "./components/notifications/Notifications";
import Header from "./components/layout/Header";
import SearchPage from "./pages/SearchPage";

const PrivateRoute = ({ children }) => {
  const { user } = useSelector((state) => state.auth);
  if (!user) {
    return <Navigate to="/signin" />;
  }
  return children;
};

const Layout = ({ children }) => {
  return (
    <div className="min-h-screen" style={{ backgroundColor: "#008990" }}>
      <Header />
      <div className="max-w-[1200px] mx-auto pt-16 pb-14 md:px-4 md:pt-20 md:pb-4">
        {children}
      </div>
    </div>
  );
}

const App = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const userData = {
          uid: user.uid,
          displayName: user.displayName,
          email: user.email,
          photoURL: user.photoURL,
        };
        dispatch(loginSuccess(userData));
      } else {
        dispatch(logout());
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, [dispatch]);

  if (loading) {
    return <Loading />;
  }

  return (
    <Router>
      <Routes>
        <Route
          exact
          path="/"
          element={
            <PrivateRoute>
              <Layout>
                <Home />
              </Layout>
            </PrivateRoute>
          }
        />
        <Route
          path="/profile/:uid"
          element={
            <PrivateRoute>
              <Layout>
                <Profile />
              </Layout>
            </PrivateRoute>
          }
        />
        <Route
          path="/mynetwork"
          element={
            <PrivateRoute>
              <Layout>
                <MyNetwork />
              </Layout>
            </PrivateRoute>
          }
        />
        <Route
          path="/jobs"
          element={
            <PrivateRoute>
              <Layout>
                <Jobs />
              </Layout>
            </PrivateRoute>
          }
        />
        <Route
          path="/messaging"
          element={
            <PrivateRoute>
              <Layout>
                <Messaging />
              </Layout>
            </PrivateRoute>
          }
        />
        <Route
          path="/notifications"
          element={
            <PrivateRoute>
              <Layout>
                <Notifications />
              </Layout>
            </PrivateRoute>
          }
        />
        <Route path="/search" element={
          <PrivateRoute>
            <Layout>
              <SearchPage />
            </Layout>
          </PrivateRoute>
        } />
        <Route exact path="/signup" element={<Signup />} />
        <Route exact path="/signin" element={<Signin />} />
        <Route
          path="*"
          element={
            <PrivateRoute>
              <Navigate to="/" />
            </PrivateRoute>
          }
        />
      </Routes>
    </Router>
  );
};

export default App;

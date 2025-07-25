import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setSetting } from './store/setting/actions';
import { initAuthFromLocalStorage } from './store/auth/actions';
import * as SettingSelectors from './store/setting/selectors'
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App({ children }) {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initialize = async () => {
      dispatch(setSetting());
      await dispatch(initAuthFromLocalStorage());
      setLoading(false);
    };
    initialize();
  }, [dispatch]);

  const themeScheme = useSelector(SettingSelectors.theme_scheme);
  const theme = themeScheme === "light" ? "light" : "dark";

  if (loading) return <div></div>;

  return (
    <div className="app">
      {children}
      <ToastContainer
        position="bottom-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme={theme}
      />
    </div>
  );
}

export default App;

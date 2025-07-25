import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { setSetting } from './store/setting/actions';
import { initAuthFromLocalStorage } from './store/auth/actions';

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

  if (loading) return <div></div>;

  return <div className="app">{children}</div>;
}

export default App;

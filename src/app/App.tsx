import { classNames } from 'shared/lib/classNames/classNames';
import { useTheme } from './providers/ThemeProvider';
import { AppRouter } from './providers/router';
import { Navbar } from 'widgetes/Navbar';

import './styles/index.scss';

const App = () => {
   const { theme, toggleTheme } = useTheme()

  return (
    <div className={classNames('App', {}, [theme])}>
        <Navbar />
        <AppRouter />
        <button onClick={toggleTheme}>TOGGLE</button>
    </div>
  )
}

export default App;
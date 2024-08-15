import { classNames } from 'shared/lib/classNames/classNames';
import { useTheme } from './providers/ThemeProvider';
import { AppRouter } from './providers/router';
import { Navbar } from 'widgetes/Navbar';

import './styles/index.scss';
import { Sidebar } from 'widgetes/Sidebar';

const App = () => {
   const { theme } = useTheme()

  return (
    <div className={classNames('App', {}, [theme])}>
        <Navbar />
        <div className='content-page'>
          <Sidebar />
          <AppRouter />
        </div>
    </div>
  )
}

export default App;
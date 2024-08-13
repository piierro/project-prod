import { Link, Route, Routes } from 'react-router-dom';
import './styles/index.scss';
import { AboutPageAsync } from './pages/AboutPage/AboutPage.async';
import { MainPageAsync } from './pages/MainPage/MainPage.async';
import { Suspense } from 'react';
import { useTheme } from './theme/useTheme';
import { classNames } from './helpers/classNames/classNames';


const App = () => {
   const { theme, toggleTheme } = useTheme()

  return (
    <div className={classNames('App', {}, [theme])}>
        <button onClick={toggleTheme}>TOGGLE</button>
        <Link to={'/'}>Главная</Link>
        <Link to={'/about'}>О сайте</Link>
        <Suspense fallback={<div>Loading...</div>}>
        <Routes>
                <Route path={'/about'} element={<AboutPageAsync />}></Route>
                <Route path={'/'} element={<MainPageAsync />}></Route>
        </Routes>
        </Suspense>
    </div>
  )
}

export default App;
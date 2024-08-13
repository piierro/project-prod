import { createRoot } from 'react-dom/client';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import ThemeProvider from './theme/ThemeProvider';

const domNode = document.getElementById('root') as HTMLDivElement;
const root = createRoot(domNode);

root.render(
  <BrowserRouter>
    <ThemeProvider>
        <App />
    </ThemeProvider>
  </BrowserRouter>
);
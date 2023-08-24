import ReactDOM from 'react-dom/client';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { CartContextProvider } from './contexts/cart-context';
import { AuthContextProvider } from './contexts/auth-context';
import { DropdownContextProvider} from './contexts/dropdown-context';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <AuthContextProvider>
      <CartContextProvider>
        <DropdownContextProvider>
          <App />
        </DropdownContextProvider>
      </CartContextProvider>  
    </AuthContextProvider>
  </BrowserRouter> 
);
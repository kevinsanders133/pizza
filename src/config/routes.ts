import IRoute from '../interfaces/route';
import Cart from '../pages/Cart';
import Home from '../pages/Home';
import Hello from '../components/Hello';
import ClientsList from '../components/ClientsList';
import AboutUs from '../pages/AboutUs';
import WorkingHours from '../pages/WorkingHours';
import Clicker from '../pages/Clicker';
import Form from '../pages/Form';

const routes: IRoute[] = [
    {
        path: '/home',
        name: 'Home',
        element: Home,
    },
    {
        path: '/cart',
        name: 'Cart',
        element: Cart,
    },
    {
        path: '/hello',
        name: 'Hello',
        element: Hello,
    },
    {
        path: '/clients-list',
        name: 'ClientsList',
        element: ClientsList,
    },
    {
        path: '/about',
        name: 'AboutUs',
        element: AboutUs,
    },
    {
        path: '/working-hours',
        name: 'WorkingHours',
        element: WorkingHours,
    },
    {
        path: '/clicker',
        name: 'Clicker',
        element: Clicker,
    },
    {
        path: '/form',
        name: 'Form',
        element: Form,
    },
];

export default routes;
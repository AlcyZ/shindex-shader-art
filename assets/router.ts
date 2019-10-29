import Router from 'vue-router';
// @ts-ignore
import Home from './pages/Home';
// @ts-ignore
import VertexShaderArt from './pages/VertexShaderArt';
// @ts-ignore
import FragmentShaderArt from './pages/FragmentShaderArt';

const routes = [
    {
        path: '/',
        component: Home
    },
    {
        path: '/va',
        component: VertexShaderArt
    },
    {
        path: '/fa',
        component: FragmentShaderArt
    }
];

export default new Router({
    routes
});

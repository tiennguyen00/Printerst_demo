import map from 'lodash/map'
const pinterserScreens = [
    {
        name: 'HOME',
        path: '/home',
        component: 'HomePage'
    },
    {
        name: 'PROFILE',
        path: '/profile',
        component: 'Profile'
    },
    {
        name: 'VERIFY',
        path: '/verify',
        component: 'Verify'
    },
    {
        name: 'PROFILE',
        path: '/profile',
        component: 'Profile'
    },
    {
        name: 'DETAIL',
        path: '/detail',
        component: 'Detail'
    }
]

const pinterestScreenRight = [
    {
        name: 'Setting',
        path: '/setting',
        component: 'Setting'
    },
    {
        name: 'Help',
        path: '/help',
        component: 'Help'
    },
    {
        name: 'Sign out',
        path: '/signout',
        component: ''
    }
]

const pagesHasPermission = [
    ...pinterserScreens
];
const pagesNotHasPermission = [

]

const routesWithRoles = {
    admin: map(pinterserScreens, 'path'),
};

export {
    pagesHasPermission,
    pagesNotHasPermission,
    routesWithRoles,
    pinterestScreenRight
}
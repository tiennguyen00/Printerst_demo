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
    routesWithRoles
}
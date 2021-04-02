import map from 'lodash/map'
const pinterestScreens = [
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
    }
]
const pagesHasPermission = [
    ...pinterestScreens
];
const pagesNotHasPermission = [

]

const routesWithRoles = {
    admin: map(pinterestScreens, 'path'),
};

export {
    pagesHasPermission,
    pagesNotHasPermission,
    routesWithRoles
}
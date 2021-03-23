
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
    }
]
const pagesHasPermission = [
    ...pinterserScreens
];
const pagesNotHasPermission = [

]

export {
    pagesHasPermission,
    pagesNotHasPermission
}
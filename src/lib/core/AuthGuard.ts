import { isAuthed } from '$lib/stores/SessionStore';
import type { LoadInput, LoadOutput } from '@sveltejs/kit/types.internal';

let auth;

isAuthed.subscribe(authState => auth = authState);

let nonProtectedRoutes: string[]  = 
    [   
        '/login',
        '/register',
        '/about'
    ]

export async function authGuard({ page }: LoadInput): Promise<LoadOutput> {

    if(nonProtectedRoutes.includes(page.path)) {
        console.log(page.path)
        return {}
    } else {
        console.log(page.path)
    }

    if (auth && page.path === '/login') {
        // console.log("scenario 1:")
        // console.log("is authed AND page path is login")
        // console.log("logged in: " + auth)
        // console.log("redirect to /")
        return { status: 302, redirect: '/' };
    } else
    if (auth || page.path === '/login') {
        // console.log("scenario 2:")
        // console.log("is authed or page path is login")
        // console.log("logged in: " + auth)
        // console.log("redirect to /login")
        return {};
    } else {
        // console.log("page 3")
        return { status: 302, redirect: '/login' }
    }
}

export default { authGuard }
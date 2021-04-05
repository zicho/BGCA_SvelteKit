import { browser } from '$app/env';

export let toastr: Toastr;

export async function loadToastr() {
    if (browser) {
        toastr = await import('toastr');
        toastr.options.closeButton = true;
        toastr.options.positionClass = "toast-bottom-right";        
    }
}
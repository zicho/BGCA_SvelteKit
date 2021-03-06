import { writable } from 'svelte/store';
import { AuthUserModel, LoginUserModel, ServiceResponse, UserService, CreateUserModel } from 'library'
import { BaseStore } from './BaseStore';
import { NotificationService } from 'library'
import { connect, disconnect } from '$lib/core/SignalR';
import { browser } from '$app/env';
import { toastr } from "$lib/core/Toastr"
import { goto } from '$app/navigation';

export const isAuthed = writable(false);
export const notifications = writable(0);

class SessionStore extends BaseStore<AuthUserModel> {

    // get userAuthed(): boolean { return this.getData != null; }

    public async login(model: LoginUserModel) {

        let serviceResponse: ServiceResponse<AuthUserModel> = await UserService.login(model);

        if (serviceResponse.success) {
            toastr.success("yo");
            setCookie("userToken", serviceResponse.data.jwt);
            isAuthed.set(true)
            this.store.set(serviceResponse.data);
            await this.getUnreadNotifications(serviceResponse.data.username);
            connect(serviceResponse.data.jwt);
            goto("/")
        }

        return serviceResponse;
    }

    public async register(model: CreateUserModel): Promise<ServiceResponse<AuthUserModel>> {

        let serviceResponse: ServiceResponse<AuthUserModel> = await UserService.register(model);

        if (serviceResponse.success) {
            toastr.success("yo");
            setCookie("userToken", serviceResponse.data.jwt);
            isAuthed.set(true)
            this.store.set(serviceResponse.data);
            await this.getUnreadNotifications(serviceResponse.data.username);
            connect(serviceResponse.data.jwt);
        }

        return serviceResponse;
    }

    public async getUnreadNotifications(username: string = null): Promise<ServiceResponse<number>> {
        let response = await NotificationService.getUnreadNotifications(username == null ? super.getData.username : username);
        notifications.set(response.data);
        return response;
    }

    public logout(): void {
        isAuthed.set(false)
        this.store.set(null);
        deleteCookie("userToken");
        goto("/login")
        disconnect();
    }
}

export const sessionStore = new SessionStore();

// cookie handler

function setCookie(token: string, jwt: string) {

    if (!browser) return; // runs only on client
    const date = new Date();

    // Set it expire in 1 day
    date.setTime(date.getTime() + (1 * 24 * 60 * 60 * 1000));

    // Set it
    document.cookie = `${token}=${jwt}; expires=${date.toUTCString()}; path=/; SameSite=Lax`;
}

function getCookie(token: string) {
    if (!browser) return; // runs only on client

    const value = "; " + document.cookie;
    const parts = value.split("; " + token + "=");

    if (parts.length == 2) {
        return parts.pop().split(";").shift();
    }
}

function deleteCookie(token: string) {
    if (!browser) return; // runs only on client

    const date = new Date();

    // Set it expire in -1 days
    date.setTime(date.getTime() + (-1 * 24 * 60 * 60 * 1000));

    // Set it
    document.cookie = `${token}=''; expires=${date.toUTCString()}; path=/`;
}
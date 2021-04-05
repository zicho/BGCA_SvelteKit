import { HubConnection, HubConnectionBuilder, HubConnectionState } from "@microsoft/signalr";
import type * as signalR from "@microsoft/signalr";
import type { NotificationModel, PrivateMessageModel } from 'library'
// import { sessionStore } from '../../stores/SessionStore'
import { toastr } from './Toastr'


let connection: HubConnection

export async function connect(jwt: string) {

    connection = new HubConnectionBuilder()
        .withUrl("https://localhost:44361/notifications", {
            accessTokenFactory: () => jwt,
        })
        .build();

    connection.on("SendNotice", (model: NotificationModel) => {

        // sessionStore.getUnreadNotifications();

        if (model.subject != null) {
            toastr.success(model.content, model.subject);
        }
        else {
            toastr.success(model.content);
        }

    });

    connection.on("SendPrivateMessage", async (model: PrivateMessageModel) => {

        if (model.subject != null) {
            toastr.success(model.content, model.subject);
        }
        else {
            toastr.success(model.content);
        }
    });

    connection.start()
        .then(() => {
            console.log("connected: " + (connection.state == HubConnectionState.Connected))
        });
}

export async function disconnect() {
    connection.stop();
}
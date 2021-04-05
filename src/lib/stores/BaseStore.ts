import { writable } from "svelte/store";

export abstract class BaseStore<T> {

    store = writable<T>(null);

    get getData(): T {
        let $val
        this.store.subscribe($ => $val = $)()
        return $val
    }
}

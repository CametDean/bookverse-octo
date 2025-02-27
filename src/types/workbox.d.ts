interface ExtendableEvent extends Event {
  waitUntil(promise: Promise<any>): void;
}

interface ExtendableMessageEvent extends ExtendableEvent {
  data: any;
  source: Client | ServiceWorker | MessagePort | null;
  ports: readonly MessagePort[];
}

interface FetchEvent extends ExtendableEvent {
  request: Request;
  respondWith(response: Promise<Response> | Response): void;
}

interface InstallEvent extends ExtendableEvent {
  registerForeignFetch(options: { scopes: Array<string>; origins: Array<string> }): void;
}

interface ActivateEvent extends ExtendableEvent {
  waitUntil(promise: Promise<any>): void;
} 
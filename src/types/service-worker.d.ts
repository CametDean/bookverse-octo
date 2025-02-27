interface ExtendableEvent extends Event {
  waitUntil(fn: Promise<any>): void;
}

interface ExtendableMessageEvent extends ExtendableEvent {
  data: any;
  source: Client | ServiceWorker | MessagePort | null;
  ports: readonly MessagePort[];
}

interface FetchEvent extends ExtendableEvent {
  request: Request;
  respondWith(response: Response | Promise<Response>): void;
}

interface InstallEvent extends ExtendableEvent {
  registerForeignFetch(options: {
    scopes: string[];
    origins: string[];
  }): void;
}

interface ActivateEvent extends ExtendableEvent {
  waitUntil(fn: Promise<any>): void;
}

declare global {
  interface ServiceWorkerGlobalScope {
    addEventListener(type: 'install', listener: (event: InstallEvent) => void): void;
    addEventListener(type: 'activate', listener: (event: ActivateEvent) => void): void;
    addEventListener(type: 'fetch', listener: (event: FetchEvent) => void): void;
    addEventListener(type: 'message', listener: (event: ExtendableMessageEvent) => void): void;
  }
} 
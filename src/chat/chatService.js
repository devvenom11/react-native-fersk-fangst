/** @module src/auth/chatService */

const WSBaseURL = 'wss://labert.asuscomm.com:30080/chat';
// const WSBaseURL = 'wss://ff.multimedianordic.no:30080/chat'
const WSEventsListeners = {
  onopen: new Set(),
  onmessage: new Set(),
  onerror: new Set(),
  onclose: new Set()
};

let timeout = 0;
let socket = null;
let toSend = null;

function isSocket() {
  return socket instanceof WebSocket;
}

export function checkSocketState(state) {
  return isSocket() && socket.readyState === socket[state];
}

class ChatService {
  authToken = '';
  fcmToken = '';

  isConnected = checkSocketState.bind(this, 'OPEN');
  isClosed = () => checkSocketState('CLOSING') || checkSocketState('CLOSED');

  connect = (authToken = this.authToken, fcmToken = this.fcmToken) => {
    if (isSocket()) return;

    socket = new WebSocket(`${WSBaseURL}?token=${authToken}&fcmtoken=${fcmToken}`);

    socket.onopen = toSend == null ? this.onWSEvent.bind(this, 'onopen') : () => {
      socket.send(toSend);
    };
    socket.onmessage = this.onWSEvent.bind(this, 'onmessage');
    socket.onerror = this.onWSEvent.bind(this, 'onerror');

    this.authToken = authToken;
    this.fcmToken = fcmToken;
  };

  close = () => {
    if (!isSocket()) return;

    socket.close();
    socket.onopen = null;
    socket.onmessage = null;
    socket.onerror = null;
    socket = null;
  };

  clear = () => {
    this.close();
    Object.values(WSEventsListeners).forEach(listeners => listeners.clear());
  }

  send = (data) => {
    if (this.isConnected()) {
      clearTimeout(timeout);

      toSend = null;
      timeout = setTimeout(this.onWSTimeout, 60000);

      socket.send(JSON.stringify(data));
    } else {
      toSend = JSON.stringify(data);
      this.onWSEvent(this.onError);
      this.close();
      this.connect();
    }
  };

  dispatch = (data) => {
    if (!this.isConnected()) return;

    socket.send(JSON.stringify(data));
  };

  onWSEvent = (event, data) => {
    clearTimeout(timeout);

    const listener = [...WSEventsListeners[event]].pop();    
    if (typeof listener === 'function') listener(data);
  };

  onWSTimeout = () => {
    this.onWSEvent(this.onError);
    this.close();
  };

  onUserChange = (isLogged) => {
    if (isLogged) this.connect(); else this.clear();
  };

  onConnect = 'onopen';
  onReceive = 'onmessage';
  onError = 'onerror';
  onClose = 'onclose';

  addEventListener = (event, listener) => {
    switch (true) {
      case event === this.onConnect && this.isConnected():
      case event === this.onClose && this.isClosed():
        listener();

        break;
      default:
        break;
    }    
    WSEventsListeners[event].add(listener);
  };

  removeEventListener = (event, listener) => {
    WSEventsListeners[event].delete(listener);
  }
}

export default new ChatService();

import type { EventCall } from '../event/types';

declare module './ModalObject' {
  interface ModalObject {
    addEventListener: (name: string, call: EventCall) => void;
    removeEventListener: (name: string, call: EventCall) => void;
    removeAllEventListeners: () => void;
  }
}

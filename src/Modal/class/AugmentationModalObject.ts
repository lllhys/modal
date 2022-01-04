import type { EventCall } from '../types';

declare module './ModalObject' {
  interface ModalObject {
    addEventListener: (name: string, call: EventCall) => void;
    removeEventListener: (name: string, call: EventCall) => void;
    removeAllEventListeners: () => void;
  }
}

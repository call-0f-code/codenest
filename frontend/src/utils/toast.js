// interface ToastEvent {
//   type: 'success' | 'error' | 'info' | 'warning';
//   message: string;
//   duration?: number;
// }

class GlobalToast {
   eventTarget = new EventTarget();

  // Methods to trigger toasts from anywhere
  success(message, duration) {
    this.emit({ type: 'success', message, duration });
  }

  error(message, duration) {
    this.emit({ type: 'error', message, duration });
  }

  info(message, duration) {
    this.emit({ type: 'info', message, duration });
  }

  warning(message, duration) {
    this.emit({ type: 'warning', message, duration });
  }

  // Internal methods
   emit(toast) {
    const event = new CustomEvent('toast', { detail: toast });
    this.eventTarget.dispatchEvent(event);
  }

  // Subscribe to toast events (used by ToastProvider)
  subscribe(callback) {
    const handler = (event) => {
      callback(event.detail);
    };
    
    this.eventTarget.addEventListener('toast', handler);
    
    // Return cleanup function
    return () => {
      this.eventTarget.removeEventListener('toast', handler);
    };
  }
}

export const globalToast = new GlobalToast();
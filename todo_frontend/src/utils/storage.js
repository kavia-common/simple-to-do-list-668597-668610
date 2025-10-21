/**
 * Safe localStorage helpers with namespacing and versioning.
 */
const NAMESPACE = "todo:ocean";
const VERSION = 1;

// PUBLIC_INTERFACE
export function getItem(key) {
  /** Retrieve a value from localStorage inside the app namespace. */
  try {
    const raw = window.localStorage.getItem(NAMESPACE);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    if (!parsed || typeof parsed !== "object") return null;
    if (parsed.v !== VERSION) return null;
    return parsed.data?.[key] ?? null;
  } catch {
    return null;
  }
}

// PUBLIC_INTERFACE
export function setItem(key, value) {
  /** Set a value in localStorage inside the app namespace. */
  try {
    const raw = window.localStorage.getItem(NAMESPACE);
    let payload = { v: VERSION, data: {} };
    if (raw) {
      try {
        const parsed = JSON.parse(raw);
        if (parsed && parsed.v === VERSION && typeof parsed.data === "object") {
          payload = parsed;
        }
      } catch {
        // ignore and overwrite with fresh payload
      }
    }
    payload.data[key] = value;
    window.localStorage.setItem(NAMESPACE, JSON.stringify(payload));
    return true;
  } catch {
    return false;
  }
}

// PUBLIC_INTERFACE
export function removeItem(key) {
  /** Remove a value from localStorage inside the app namespace. */
  try {
    const raw = window.localStorage.getItem(NAMESPACE);
    if (!raw) return true;
    const parsed = JSON.parse(raw);
    if (!parsed || parsed.v !== VERSION || typeof parsed.data !== "object") {
      return true;
    }
    delete parsed.data[key];
    window.localStorage.setItem(NAMESPACE, JSON.stringify(parsed));
    return true;
  } catch {
    return false;
  }
}

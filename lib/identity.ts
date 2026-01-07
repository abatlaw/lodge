export type Identity =
  | { type: "guest"; id: string }
  | { type: "owner"; id: string };

const STORAGE_KEY = "lodge_identity";

export function getIdentity(): Identity {
  if (typeof window === "undefined") {
    // SSR safety — return a placeholder
    return { type: "owner", id: "arnesh" };
  }

  const raw = localStorage.getItem(STORAGE_KEY);

  if (raw) {
    try {
      return JSON.parse(raw) as Identity;
    } catch {
      // fall through
    }
  }

  // 👇 DEFAULT: owner (you)
  const owner: Identity = { type: "owner", id: "arnesh" };
  localStorage.setItem(STORAGE_KEY, JSON.stringify(owner));
  return owner;
}

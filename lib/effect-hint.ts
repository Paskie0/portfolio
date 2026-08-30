export const EFFECT_HINT_STORAGE_KEY = "effect-hint-dismissed";
export const EFFECT_HINT_DISMISSED_EVENT = "effect-hint-dismissed";

export function dismissEffectHint() {
  localStorage.setItem(EFFECT_HINT_STORAGE_KEY, "1");
  window.dispatchEvent(new Event(EFFECT_HINT_DISMISSED_EVENT));
}

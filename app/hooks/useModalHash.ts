import { useCallback, useState } from "react";
import { useLifecycles } from "react-use";

declare global {
  interface Window {
    openModalDirectly: typeof openModalDirectly;
    MODAL_HASH_MAP: typeof MODAL_HASH_MAP;
  }
}

/**
 * read and write url hash, response to url hash change
 */
export default function useModalHash(addToHistory = false) {
  const [modalHash, setModalHash] = useState<ModalHashValues>(
    MODAL_HASH_MAP.empty
  );

  const [payload, setPayload] = useState<any>(null);

  const onHashChange = useCallback((e: CustomEvent) => {
    setModalHash(window.location.hash as ModalHashValues);
    setPayload(e.detail);
  }, []);

  useLifecycles(
    () => {
      setModalHash(
        (window.location.hash as ModalHashValues) || MODAL_HASH_MAP.empty
      );
      window["MODAL_HASH_MAP"] = MODAL_HASH_MAP;
      window["openModalDirectly"] = openModalDirectly;
      window.addEventListener("hashchange", onHashChange);
    },
    () => {
      window.removeEventListener("hashchange", onHashChange);
    }
  );

  const _setHash = useCallback(
    (newHash: ModalHashValues, payload?: any) => {
      if (!addToHistory) {
        history.replaceState(null, "", newHash);
        const event = new CustomEvent("hashchange", { detail: payload });
        window.dispatchEvent(event);
      } else {
        window.location.hash = newHash;
      }
    },
    [addToHistory]
  );

  const closeModal = useCallback(() => {
    _setHash(MODAL_HASH_MAP.empty);
  }, [_setHash]);

  return {
    modalHash,
    openModal: _setHash,
    closeModal,
    payload
  };
}

export const MODAL_HASH_MAP = {
  empty: "#",
  walletConnect: "#/modal/walletConnect",
  whitelist: "#/modal/whitelist"
} as const;

export type ModalHashValues =
  (typeof MODAL_HASH_MAP)[keyof typeof MODAL_HASH_MAP];

export function openModalDirectly(hash: ModalHashValues, payload?: any) {
  history.replaceState(null, "", hash);
  const event = new CustomEvent("hashchange", { detail: payload });
  window.dispatchEvent(event);
}

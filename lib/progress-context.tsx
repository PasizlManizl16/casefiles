"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { VALID_CONNECTIONS, connectionKey } from "./case-data";

type ProgressContextValue = {
  discoveredEvidence: string[];
  unlockedDocuments: string[];
  validConnections: string[];
  importantDocuments: string[];
  addDiscoveredEvidence: (id: string) => void;
  unlockDocument: (id: string) => void;
  addConnection: (a: string, b: string) => boolean;
  isConnectionValid: (a: string, b: string) => boolean;
  isConnectionMade: (a: string, b: string) => boolean;
  markDocumentImportant: (id: string) => void;
  isDocumentImportant: (id: string) => boolean;
  getClueForConnection: (a: string, b: string) => (typeof VALID_CONNECTIONS)[0] | undefined;
};

const ProgressContext = createContext<ProgressContextValue | null>(null);

export function ProgressProvider({ children }: { children: ReactNode }) {
  const [discoveredEvidence, setDiscoveredEvidence] = useState<string[]>([]);
  const [unlockedDocuments, setUnlockedDocuments] = useState<string[]>([]);
  const [validConnections, setValidConnections] = useState<string[]>([]);
  const [importantDocuments, setImportantDocuments] = useState<string[]>([]);

  const addDiscoveredEvidence = useCallback((id: string) => {
    setDiscoveredEvidence((prev) => (prev.includes(id) ? prev : [...prev, id]));
  }, []);

  const unlockDocument = useCallback((id: string) => {
    setUnlockedDocuments((prev) => (prev.includes(id) ? prev : [...prev, id]));
  }, []);

  const isConnectionValid = useCallback((a: string, b: string) => {
    const key = connectionKey(a, b);
    return VALID_CONNECTIONS.some((c) => connectionKey(c.a, c.b) === key);
  }, []);

  const isConnectionMade = useCallback(
    (a: string, b: string) => validConnections.includes(connectionKey(a, b)),
    [validConnections],
  );

  const getClueForConnection = useCallback((a: string, b: string) => {
    const key = connectionKey(a, b);
    return VALID_CONNECTIONS.find((c) => connectionKey(c.a, c.b) === key);
  }, []);

  const addConnection = useCallback(
    (a: string, b: string) => {
      const key = connectionKey(a, b);
      if (!isConnectionValid(a, b) || validConnections.includes(key)) return false;
      setValidConnections((prev) => [...prev, key]);
      const clue = getClueForConnection(a, b);
      if (clue) addDiscoveredEvidence(clue.clueId);
      return true;
    },
    [isConnectionValid, validConnections, getClueForConnection, addDiscoveredEvidence],
  );

  const markDocumentImportant = useCallback((id: string) => {
    setImportantDocuments((prev) => (prev.includes(id) ? prev : [...prev, id]));
  }, []);

  const isDocumentImportant = useCallback(
    (id: string) => importantDocuments.includes(id),
    [importantDocuments],
  );

  const value = useMemo(
    () => ({
      discoveredEvidence,
      unlockedDocuments,
      validConnections,
      importantDocuments,
      addDiscoveredEvidence,
      unlockDocument,
      addConnection,
      isConnectionValid,
      isConnectionMade,
      markDocumentImportant,
      isDocumentImportant,
      getClueForConnection,
    }),
    [
      discoveredEvidence,
      unlockedDocuments,
      validConnections,
      importantDocuments,
      addDiscoveredEvidence,
      unlockDocument,
      addConnection,
      isConnectionValid,
      isConnectionMade,
      markDocumentImportant,
      isDocumentImportant,
      getClueForConnection,
    ],
  );

  return <ProgressContext.Provider value={value}>{children}</ProgressContext.Provider>;
}

export function useProgress() {
  const ctx = useContext(ProgressContext);
  if (!ctx) throw new Error("useProgress must be used within ProgressProvider");
  return ctx;
}

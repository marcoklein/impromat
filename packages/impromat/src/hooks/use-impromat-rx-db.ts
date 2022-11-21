import { useRxDB } from "rxdb-hooks";

export function useImpromatRxDb() {
  const db = useRxDB();
  return db;
}

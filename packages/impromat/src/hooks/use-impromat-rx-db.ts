import { useRxDB } from "rxdb-hooks";
import { AppDatabase } from "../database/database-type";

export function useImpromatRxDb() {
  const db = useRxDB();
  return db as any as AppDatabase;
}

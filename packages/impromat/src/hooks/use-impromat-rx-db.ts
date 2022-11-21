import { useRxDB } from "rxdb-hooks";
import { ImpromatRxDatabase } from "../store/initialize";

export function useImpromatRxDb() {
  const db = useRxDB();
  return db as any as ImpromatRxDatabase;
}

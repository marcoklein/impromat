import { useMemo } from "react";
import { useRxDB } from "rxdb-hooks";
import { AppDatabase } from "./database-type";
import { RxMutations } from "./rxdb-mutations";

export function useRxdbMutations() {
  const db = useRxDB() as any as AppDatabase;

  return useMemo(() => (db ? new RxMutations(db) : undefined), [db]);
}

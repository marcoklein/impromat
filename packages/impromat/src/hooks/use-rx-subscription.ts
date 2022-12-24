import { useState } from "react";
import { Observable } from "rxjs";

export function useRxSubscription<T>(observable: Observable<T>) {
  const [state, setState] = useState<T>();
  observable.subscribe((value) => setState(value));
  return state;
}

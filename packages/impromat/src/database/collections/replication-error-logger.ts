import { Debugger } from "debug";
import { RxError, RxTypeError } from "rxdb";

export function replicationErrorLogger(
  error: RxTypeError | RxError,
  logger: Debugger,
) {
  if (
    error.parameters.errors?.find((error) =>
      error.message.includes("NetworkError"),
    )
  ) {
    logger("Replication network error");
  } else if (
    error.parameters.errors?.find((error) =>
      error.message.includes("Unauthorized"),
    )
  ) {
    logger("Unauthorized error");
  } else {
    logger("Unhandled replication error", error);
    logger("Unhandled replication errors:", error.parameters.errors);
  }
}

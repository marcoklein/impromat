/**
 * Usage
 * ```
 * const token = getBearerToken(context.req.headers.authorization);
 * if (!token) throw new GraphQLYogaError("Unauthorized");
 * ```
 *
 * @param bearerToken
 * @returns
 */
export function getBearerToken(bearerToken: string | undefined) {
  if (bearerToken) {
    const parts = bearerToken.split(" ");
    const schema = parts.shift()!.toLowerCase();
    if (schema.toLowerCase() === "bearer") {
      const token = parts.join();
      return token;
    }
  }
  return undefined;
}

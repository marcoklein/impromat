/**
 * Source: https://github.com/dotansimha/graphql-code-generator/discussions/8554#discussioncomment-4131776
 */

type Primitive = null | undefined | string | number | boolean | symbol | bigint;

/**
 * Utility type to create the full type of a GraphQL fragment.
 *
 * Currently, the function is an alternative to the `makeFragmentData` function from the graphql codegen package.
 */
export type UnmaskedDocument<TDoc> = TDoc extends {
  " $fragmentRefs"?: infer FragmentRefs;
}
  ? FragmentRefs extends Record<string, infer FragmentRef>
    ? UnmaskedDocument<
        FragmentRef & Omit<TDoc, " $fragmentRefs" | " $fragmentName">
      >
    : never
  : TDoc extends Primitive
  ? TDoc
  : { [key in keyof TDoc]: UnmaskedDocument<TDoc[key]> };

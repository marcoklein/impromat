export function getGraphqlFields(
  fieldNodes: readonly any[],
  fragments: Record<string, any>,
): Record<string, any> {
  let fields: Record<string, any> = {};
  fieldNodes.forEach((fieldNode: any) => {
    const fieldName = fieldNode.name.value;
    if (fieldNode.selectionSet) {
      fields[fieldName] = getGraphqlFields(
        fieldNode.selectionSet.selections,
        fragments,
      );
    } else if (fieldNode.kind === 'FragmentSpread') {
      const fragment = fragments[fieldNode.name.value];
      if (fragment) {
        fields = {
          ...fields,
          ...getGraphqlFields(fragment.selectionSet.selections, fragments),
        };
      }
    } else {
      fields[fieldName] = true;
    }
  });
  return fields;
}

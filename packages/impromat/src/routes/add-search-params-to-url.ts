export const addSearchParamsToUrl = (
  url: string,
  params: Record<string, string>,
) => {
  if (!Object.entries(params).length) return url;
  const searchParams = new URLSearchParams();
  Object.entries(params).forEach(([key, value]) => {
    if (value) {
      searchParams.append(key, value);
    }
  });
  return url + "?" + searchParams.toString();
};

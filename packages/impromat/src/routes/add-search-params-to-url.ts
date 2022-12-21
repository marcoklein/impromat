export const addSearchParamsToUrl = (
  url: string,
  params: Record<string, string>,
) => {
  if (!Object.entries(params).length) return url;
  const searchParams = new URLSearchParams();
  console.log("search params = ", params);
  Object.entries(params).forEach(([key, value]) => {
    if (value) {
      searchParams.append(key, value);
    }
  });
  console.log("search params after = ", searchParams);
  return url + "?" + searchParams.toString();
};

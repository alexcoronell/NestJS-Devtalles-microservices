const getSkip = (
  page: number,
  limit: number | undefined,
): number | undefined => {
  if (limit === undefined) {
    return undefined;
  }
  return (page - 1) * limit;
};

export const normalizePagination = (page?: number, limit?: number) => {
  const normalizePage = Math.max(1, page ?? 1);
  const normalizedLimit =
    limit === undefined ? undefined : Math.min(100, Math.max(1, limit || 10));

  return {
    page: normalizePage,
    limit: normalizedLimit,
    skip: getSkip(normalizePage, normalizedLimit),
  };
};

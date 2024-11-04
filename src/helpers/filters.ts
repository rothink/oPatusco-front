interface SortBy {
  order: string;
  key: string;
}

interface Params {
  page: number;
  itemsPerPage: number;
  sortBy: Array<SortBy>;
}

export default {
  formatFilterAndOrderBy(params: Params, formFilter: object) {
    const requestParams: { page: number; itemsPerPage: number } & Record<string, any> = {
      page: params.page,
      itemsPerPage: params.itemsPerPage,
      ...formFilter,
    };

    return requestParams;
  }
};

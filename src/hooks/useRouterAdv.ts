import { OrderBy, SearchType } from "@/types/util.types";
import { useRouter } from "next/router";

export const useRouterAdv = () => {
  const { push, back, query, asPath } = useRouter();

  const id = query.id as string;

  const keyword = typeof query.keyword === "string" ? query.keyword : "";
  const orderBy = typeof query.orderBy === "string" ? (query.orderBy as OrderBy) : "createdAt";
  const searchType = typeof query.searchType === "string" ? (query.searchType as SearchType) : "report";

  const location = asPath.split("?")[0];

  return { push, back, asPath, location, query, id, keyword, orderBy, searchType };
};

import { GetReport, GetReportList } from "@/types/report.types";
import { QueryFn } from "./QueryFn";
import { OrderBy, SearchType } from "@/types/util.types";

export class ReportQuery extends QueryFn {
  constructor() {
    super();
  }

  queryKey = ["report"];

  getReport(reviewId: string) {
    return {
      queryKey: [...this.queryKey, reviewId],
      queryFn: this.queryFn<GetReport>(`/report/${reviewId}`),
      enabled: !!reviewId,
    };
  }

  getReportListBySearch({
    keyword,
    orderBy,
    searchType,
  }: {
    keyword: string;
    orderBy: OrderBy;
    searchType: SearchType;
  }) {
    return {
      queryKey: ["report", orderBy, keyword ? keyword : "all"],
      queryFn: this.infiniteQueryFn<GetReportList>(
        `/report/search?take=12&searchType=${searchType}&keyword=${keyword}&orderBy=${orderBy}`
      ),
      initialPageParam: 0,
      getNextPageParam: (lastPage: GetReportList, allPages: any, lastPageParam: number) =>
        lastPage.hasNext ? lastPageParam + 12 : undefined,
    };
  }

  getUserLatestReportList(userId: string) {
    return {
      queryKey: [...this.queryKey, "user", "latest"],
      queryFn: this.queryFn<GetReportList>(`/report/search?take=4&searchType=user&keyword=${userId}&orderBy=createdAt`),
    };
  }

  checkReportLike(reportId: string) {
    return {
      queryKey: [...this.queryKey, reportId, "like"],
      queryFn: this.queryFn<{ isLiked: boolean }>(`/report/${reportId}/like`),
    };
  }
}

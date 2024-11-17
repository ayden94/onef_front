import { GetReportList } from "@/types/report.types";
import { QueryFn } from "./QueryFn";
import { OrderBy, SearchType } from "@/types/util.types";
import { gql } from "graphql-request";
import { ALL_BOOK } from "./BookQuery";
import { GetReportQuery, GetReportQueryVariables } from "@/types/graphql.types";

const GET_REPORT = gql`
  query getReport($reportId: String!) {
    report: getReport(reportId: $reportId) {
      id
      title
      content
      tags
      createdAt
      updatedAt
      user {
        id
        nickname
      }
      _count {
        userLiked
      }
      book {
        ...AllBook
        subInfo {
          itemPage
        }
      }
    }
  }
  ${ALL_BOOK}
`;

export class ReportQuery extends QueryFn {
  constructor() {
    super();
  }

  queryKey = ["report"];

  getReport(reviewId: string) {
    return {
      queryKey: [...this.queryKey, reviewId],
      queryFn: () =>
        this.graphql<GetReportQuery, GetReportQueryVariables>(GET_REPORT, { variables: { reportId: reviewId } }),
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
      queryKey: [...this.queryKey, orderBy, keyword ? keyword : "all", searchType],
      queryFn: this.infiniteQueryFn<GetReportList>(
        `/report/search?take=12&searchType=${searchType}&keyword=${keyword}&orderBy=${orderBy}`,
      ),
      initialPageParam: 0,
      getNextPageParam: (lastPage: GetReportList, allPages: any, lastPageParam: number) =>
        lastPage.hasNext ? lastPageParam + 12 : undefined,
    };
  }

  getUserLatestReportList(userId: string) {
    return {
      queryKey: [...this.queryKey, userId, "user", "latest"],
      queryFn: this.queryFn<GetReportList>(
        `/report/search?take=5&skip=0&searchType=user&keyword=${userId}&orderBy=createdAt`,
      ),
    };
  }

  checkReportLike(reportId: string) {
    return {
      queryKey: [...this.queryKey, reportId, "like"],
      queryFn: this.queryFn<{ isLiked: boolean }>(`/report/${reportId}/like`),
    };
  }

  getMostLikedReportList() {
    return {
      queryKey: [...this.queryKey, "mostLiked"],
      queryFn: this.queryFn<GetReportList>("/report/most-liked"),
    };
  }

  getRecentReportList() {
    return {
      queryKey: [...this.queryKey, "recent"],
      queryFn: this.queryFn<GetReportList>("/report/recent"),
    };
  }
}

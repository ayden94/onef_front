import { ReportMutation } from "@/apis/reactQuery/Mutation/ReportMutation";
import { useReportTagList } from "@/hooks/useCaroKann/useReportTagList";
import { useRouterAdv } from "@/hooks/useRouterAdv";
import { initValue, setForm } from "@/hooks/useSicilian/report";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

export const usePutReportMutation = () => {
  const { id: reportId, push } = useRouterAdv();

  const [tagList, setTagList] = useReportTagList();

  const queryClient = useQueryClient();
  const reportMutation = new ReportMutation();
  const { mutate } = useMutation({
    mutationFn: reportMutation.putReport(reportId),
    onSuccess: () => {
      toast.success("리뷰가 수정되었습니다.");
      setTagList([]);
      setForm(initValue);
      queryClient.invalidateQueries({ queryKey: ["report"], refetchType: "all" });
      push(`/report/${reportId}`);
    },
  });

  return { mutate };
};

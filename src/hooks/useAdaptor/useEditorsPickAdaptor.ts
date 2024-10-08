import { EditorsPickQuery } from "@/apis/reactQuery/Query/EditorsPickQuery";
import { useQuery } from "@tanstack/react-query";

export const useEditorsPickAdaptor = () => {
  const editorsPickQuery = new EditorsPickQuery();
  const { data } = useQuery(editorsPickQuery.getEditorsPick());

  return {
    editorsPick: {
      description: data?.description ?? "",
      reportId: data?.report.id ?? "",
      title: data?.report.title ?? "",
      cover: data?.report.book.cover ?? "",
      nickname: data?.report.user.nickname ?? "",
    },
  };
};

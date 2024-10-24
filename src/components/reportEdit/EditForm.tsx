import styles from "./EditForm.module.css";
import toast from "react-hot-toast";
import Form from "@/components/forms/Form";
import Clickable from "../clickable/Clickable";
import { FormState, handleSubmit, initValue, register, setForm } from "@/hooks/useSicilian/report";
import { useReportTagList } from "@/hooks/useCaroKann/useReportTagList";
import { useContext } from "react";
import { MutationContext } from "@/hooks/useContext/useMutationContext";
import { useRouterAdv } from "@/hooks/useRouterAdv";

export default function EditForm() {
  const [tagList, setTagList] = useReportTagList();
  const { back } = useRouterAdv();
  const mutate = useContext(MutationContext);
  const formState = FormState();

  return (
    <Form
      className={styles.form}
      onSubmit={handleSubmit((data) => {
        if (data.content.length > 1984) return toast.error("내용은 1984자 이하로 입력해주세요.");
        if (data.content.length < 84) return toast.error("내용은 84자 이상 입력해주세요.");
        if (data.title.length > 19) return toast.error("제목은 19자 이하로 입력해주세요.");
        if (data.title.length < 4) return toast.error("제목은 4자 이상 입력해주세요.");

        mutate({ ...data, tags: tagList });
      })}
    >
      <Form.Input {...register("title")} placeholder={"제목을 입력해 주세요"} className={styles.titleInput} />

      <Form.MDEditor {...register("content")} />

      <Form.TagInputWrapper
        tagList={tagList}
        setTagList={setTagList}
        value={formState.tags}
        setValue={setForm}
        input={({ onKeyDown, onKeyUp }) =>
          Form.Input({
            ...register("tags"),
            onKeyUp,
            onKeyDown,
            placeholder: "태그 입력 후 엔터를 눌러주세요",
            className: styles.tagInput,
          })
        }
      />

      <Clickable.Container>
        <Clickable
          type="button"
          color="white"
          onClick={() => {
            back();
            setTagList([]);
            setForm(initValue);
          }}
        >
          취소
        </Clickable>

        <Clickable>저장</Clickable>
      </Clickable.Container>
    </Form>
  );
}

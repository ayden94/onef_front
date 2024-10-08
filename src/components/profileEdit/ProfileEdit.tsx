import ImageInput from "../forms/ImageInput";
import InputWrapper from "../forms/InputWrapper";
import Input from "@/components/forms/Input";
import { register, setValue, handleSubmit, ErrorState, FormState } from "@/hooks/useSicilian/profileEdit";
import Form from "@/components/forms/Form";
import { useEffect, useState } from "react";
import { useWhoAmIAdaptor } from "@/hooks/useAdaptor/user/useWhoAmIAdaptor";
import { usePatchProfileMutation } from "@/hooks/useMutation/usePatchProfileMutation";
import Textarea from "../forms/Textarea";
import styles from "./ProfileEdit.module.css";
import toast from "react-hot-toast";
import Clickable from "../clickable/Clickable";

export default function ProfileEdit() {
  const [files, setFiles] = useState<FileList>();
  const { user, isPending } = useWhoAmIAdaptor();
  const { mutate } = usePatchProfileMutation();
  const errorState = ErrorState();
  const formState = FormState();

  useEffect(() => {
    setValue({ email: user.email, nickname: user.nickname, bio: user.bio });
  }, [isPending]);

  const onSubmit = ({ files, nickname, bio }: { files: FileList | undefined; nickname: string; bio: string }) => {
    const formData = new FormData();

    if (files) {
      Array.from(files).forEach((file) => {
        formData.append("images", file);
      });
    }

    if (user.bio === formState.bio.replace(/\n\s*\n/g, "\n") && user.nickname === formState.nickname && !files)
      return toast.error("변경사항이 없습니다.");

    mutate({ formData, nickname, bio });
  };

  return (
    <Form
      className={styles.root}
      onSubmit={handleSubmit((data) =>
        onSubmit({ files, nickname: data.nickname, bio: data.bio.replace(/\n\s*\n/g, "\n") }),
      )}
      inputWrapper={
        <>
          <div className={styles.inputContainer}>
            <div className={styles.imageContainer}>
              <ImageInput setFiles={setFiles} initialValue={user.profileImage} file={files?.[0]} />
            </div>

            <div className={styles.emailNicknameContainer}>
              <InputWrapper inputName={"이메일"} htmlFor="email">
                <Input {...register("email")} disabled={true} />
              </InputWrapper>

              <InputWrapper inputName={"닉네임"} htmlFor="nickname">
                <Input {...register("nickname")} />
              </InputWrapper>
            </div>
          </div>

          <InputWrapper inputName={"소개"} errorMessage={errorState.bio} htmlFor="bio">
            <Textarea
              {...register("bio", {
                maxLength: { number: 150, message: "소개글은 150자를 넘길 수 없습니다." },
              })}
              className={styles.textarea}
            />
          </InputWrapper>
        </>
      }
      button={<Clickable className={styles.button}>저장</Clickable>}
    />
  );
}

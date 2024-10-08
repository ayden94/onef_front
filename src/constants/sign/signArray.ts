const email = {
  inputName: "이메일",
  htmlFor: "email",
  type: "text",
  placeholder: "이메일을 입력해 주세요",
} as const;

const password = {
  inputName: "비밀번호",
  htmlFor: "password",
  type: "password",
  placeholder: "비밀번호를 입력해 주세요",
} as const;

const passwordCheck = {
  inputName: "비밀번호 확인",
  htmlFor: "passwordCheck",
  type: "password",
  placeholder: "비밀번호를 다시 입력해 주세요",
} as const;

const nickname = {
  inputName: "닉네임",
  htmlFor: "nickname",
  type: "text",
  placeholder: "닉네임을 입력해 주세요",
} as const;

export const signUpArray = [email, nickname, password, passwordCheck];
export const signInArray = [email, password];

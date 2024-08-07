export const SignValidate = () => {
  const email = {
    required: { required: true, message: "이메일을 입력해주세요" },
    RegExp: {
      RegExp: new RegExp("^[a-zA-Z0-9+-_.]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$"),
      message: "이메일 형식과 맞지 않습니다",
    },
  };

  const password = {
    required: { required: true, message: "비밀번호를 입력해주세요" },
    minLength: { number: 8, message: "비밀번호는 8자 이상이어야 합니다" },
    maxLength: { number: 16, message: "비밀번호는 16자 이하여야 합니다" },
    RegExp: [
      {
        RegExp: new RegExp("^[^\\s]+$"),
        message: "비밀번호는 공백을 포함할 수 없습니다.",
      },
      {
        RegExp: new RegExp("^(?=.*[a-z])(?=.*\\d)(?=.*[@$!%*?&])[a-z\\d@$!%*?&]+$"),
        message: "비밀번호는 소문자, 숫자, 특수문자를 모두 포함해야 합니다",
      },
    ],
  };

  const passwordCheck = {
    ...password,
    customChecker: {
      checkFn: (value: string, store: { password: string }) => value !== store.password,
      message: "비밀번호가 일치하지 않습니다",
    },
  };

  const nickname = {
    required: { required: true, message: "닉네임을 입력해주세요" },
    minLength: { number: 2, message: "닉네임은 2자 이상이어야 합니다" },
    maxLength: { number: 10, message: "닉네임은 10자 이하여야 합니다" },
  };

  return { email, nickname, password, passwordCheck };
};

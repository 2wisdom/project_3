//이메일(id), 비밀번호 regex를 이용해 형태 확인.
export const validateEmail = (email: string) => {
  return email
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
};

export const validatePassword = (password: string) => {
  return password.match(/^(?=.*[a-zA-Z])(?=.*\d)(?=.*\W)(?=.\S+$).{8,20}$/);
};

export const validateName = (name: string) => {
  return name.match(/^(?=.[a-z0-9가-힣])[a-z0-9가-힣]{2,6}$/);
};

export const isInputStart = (target: string) => {
  return target.length >= 1;
};

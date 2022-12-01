//이메일(id), 비밀번호 regex를 이용해 형태 확인.
export const validateEmail = (email: string) => {
    return email
        .toLowerCase()
        .match(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        );
};

export const validatePassword = (password: string) => {
    return password.match(/^(?=.*\d)(?=.*[a-zA-Z]).{8,10}$/gm);
};

export const isInputStart = (target: string) => {
    return target.length >= 1;
  };
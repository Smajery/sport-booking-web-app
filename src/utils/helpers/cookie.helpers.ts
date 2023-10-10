export const setCookie = (name: string, value: string, lifetime: number) => {
  const date = new Date();
  date.setTime(date.getTime() + lifetime * 1000);
  const expires = "expires=" + date.toUTCString();
  document.cookie = name + "=" + value + "; " + expires + "; path=/";
};

export const getCookie = (name: string) => {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(";").shift();
};

export const deleteCookie = (name: string) => {
  const pastDate = new Date(0).toUTCString();
  document.cookie = name + "=; expires=" + pastDate + "; path=/";
};

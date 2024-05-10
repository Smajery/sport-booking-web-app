export const setCookie = (
  name: string,
  value: string,
  expiresTimestamp?: number,
) => {
  if (name === "undefined" || value === "undefined") return null;
  if (expiresTimestamp) {
    const date = new Date(expiresTimestamp * 1000);
    const expires = "expires=" + date.toUTCString();
    document.cookie = name + "=" + value + "; " + expires + "; path=/";
  } else {
    document.cookie = name + "=" + value + "; " + "; path=/";
  }
};

export const getCookie = (name: string) => {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) {
    const lastPart = parts.pop();
    if (lastPart !== undefined) {
      return lastPart.split(";").shift();
    }
  }
  return undefined;
};

export const deleteCookie = (name: string) => {
  const pastDate = new Date(0).toUTCString();
  document.cookie = name + "=; expires=" + pastDate + "; path=/";
};

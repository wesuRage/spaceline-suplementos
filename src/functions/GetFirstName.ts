export const GetFirstName = (s: string) => {
  return s.replace(/./, (c) => c.toUpperCase()).split(" ")[0];
};

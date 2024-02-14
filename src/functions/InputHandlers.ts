export const handlePhoneInput = (event: any) => {
  let input = event.target;
  input.value = phoneMask(input.value);
};

const phoneMask = (value: string) => {
  if (!value) return "";
  value = value.replace(/\D/g, "");
  value = value.replace(/(\d{2})(\d)/, "($1) $2");
  value = value.replace(/(\d)(\d{4})$/, "$1-$2");
  return value;
};

export const handleCepInput = (event: any) => {
  let input = event.target;
  input.value = cepInput(input.value);
};

const cepInput = (value: string) => {
  if (!value) return "";
  value = value.replace(/\D/g, "");
  value = value.replace(/(\d{5})(\d)/, "$1-$2");
  return value;
};

export const handleValidade = (event: any) => {
  let input = event.target;
  input.value = validade(input.value);
};

const validade = (value: string) => {
  if (!value) return "";
  value = value.replace(/\D/g, "");
  value = value.replace(/(\d{2})(\d)/, "$1/$2");
  return value;
};

export const handleCvv = (event: any) => {
  let input = event.target;
  input.value = cvv(input.value);
};

const cvv = (value: string) => {
  if (!value) return "";
  value = value.replace(/\D/g, "");
  return value;
};

export const handleCartao = (event: any) => {
  let input = event.target;
  input.value = cartaoInput(input.value);
};

const cartaoInput = (value: string) => {
  if (!value) return "";
  value = value.replace(/\D/g, "");
  value = value.replace(/^(\d{4})(\d)/g, "$1 $2");
  value = value.replace(/^(\d{4})\s(\d{4})(\d)/g, "$1 $2 $3");
  value = value.replace(/^(\d{4})\s(\d{4})\s(\d{4})(\d)/g, "$1 $2 $3 $4");
  return value;
};

export const handleNomeCartao = (event: any) => {
  let input = event.target;
  input.value = nomeCartao(input.value);
};

const nomeCartao = (value: string) => {
  if (!value) return "";
  value = value.replace(/[0-9.]/g, "");
  return value;
};

export const handleCpf = (event: any) => {
  let input = event.target;
  input.value = cpfInput(input.value);
};

const cpfInput = (value: string) => {
  if (!value) return "";
  value = value.replace(/\D/g, "");

  if (value.length < 4) {
    return value;
  } else if (value.length < 7) {
    return value.replace(/^(\d{3})(\d{1})/, "$1.$2");
  } else if (value.length < 10) {
    return value.replace(/^(\d{3})(\d{3})(\d{1})/, "$1.$2.$3");
  } else if (value.length < 12) {
    return value.replace(/^(\d{3})(\d{3})(\d{3})(\d{1})/, "$1.$2.$3-$4");
  } else {
    return value.replace(/^(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");
  }
};

export const getfield = (texto: string): string | null => {
  const regex = /\((.*?)\)/;
  const match = regex.exec(texto);
  if (match && match.length > 1) {
    return match[1];
  } else {
    return '';
  }
};

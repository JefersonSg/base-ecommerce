export function convertNumberInReal(number: number) {
  const formatoNumero = new Intl.NumberFormat('pt-BR');
  const numeroFormatado = formatoNumero.format(number);

  const realInteiro = numeroFormatado?.split(',')?.[0]
    ? numeroFormatado?.split(',')?.[0] + ','
    : '0,';

  const centavos = numeroFormatado?.split(',')?.[1]
    ? numeroFormatado?.split(',')?.[1].length > 2
      ? numeroFormatado?.split(',')?.[1].slice(0, 2)
      : numeroFormatado?.split(',')?.[1].length > 1 &&
          numeroFormatado?.split(',')?.[1].length < 3
        ? numeroFormatado?.split(',')?.[1]
        : numeroFormatado?.split(',')?.[1] + '0'
    : '00';

  return realInteiro + centavos;
}

const colors = {
  primary: '#6200ee',
  primaryHeavy: '#3700b3',
  primaryLight: '#985eff',
  secondary: '#faee1c',
  error: '#b00020',
  white: '#fff',
  black: '#000',
  imgPlaceholder: '#e3e3e3',
};

export default colors;

export function transparentize(hex, opacity) {
  let r, g, b;

  // 3 digits
  if (hex.length === 4) {
    r = '0x' + hex[1] + hex[1];
    g = '0x' + hex[2] + hex[2];
    b = '0x' + hex[3] + hex[3];

    // 6 digits
  } else if (hex.length === 7) {
    r = '0x' + hex[1] + hex[2];
    g = '0x' + hex[3] + hex[4];
    b = '0x' + hex[5] + hex[6];
  }

  return `rgba(${+r}, ${+g}, ${+b}, ${1 - opacity})`;
}

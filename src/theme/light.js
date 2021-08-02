import defaultColors from './colors';

const colors = {
  ...defaultColors,

  primary: defaultColors.blue,
  primaryDark: defaultColors.blueDark,
  font: '#333334',
  fontDark: '#121213',
  background: '#ffffff',
  searchHighlight: '#a3d3ff',
  mainBackground: '#fefefe',
  border: '#DBDDDF',
  hover: defaultColors.blue,
  shadow: defaultColors.gray + '33',
};

export default {
  colors: colors,
};

import defaultColors from './colors';

const colors = {
  ...defaultColors,

  primary: '#4193EC',
  primaryDark: defaultColors.blueDark,
  font: '#dddddd',
  fontDark: '#8a8a8a',
  background: '#1B1A19',
  searchHighlight: defaultColors.red,
  mainBackground: '#1E1E1F',
  border: '#323234',
  hover: defaultColors.red,
  shadow: defaultColors.gray + '33',
  backgroundHover: '#252423',
  backgroundActive: '#292827',
  divider: '#252423'
};

export default {
  colors: colors,
};

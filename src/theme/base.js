import defaultColors from './colors';
import colorfn from 'color';
import { increaseIntensivity, decreaseIntensivity, grayscaleCompatible } from '../utils/colors';

const colors = {
  ...defaultColors,

  primary: defaultColors.red,
  primaryDark: defaultColors.blueDark,
  fontLight: '#efefef',
  font: '#dddddd',
  fontDark: '#8a8a8a',
  background: '#29282A',
  mainBackground: '#1E1E1F',
  border: '#323234',
  hover: defaultColors.red,
  shadow: defaultColors.gray + '33',
  backgroundHover: '#f3f2f1',
  backgroundActive: '#F3F2F1',
  divider: '#edebe9'
};

const pageLayout = {
  leftWidth: '318px',
  leftMargin: '30px',
  rightWidth: '',
  rightMargin: '',
};

const transitions = {
  hover: 'all .5s cubic-bezier(0.25, 0.8, 0.25, 1) 0s',
  hoverFast: 'all .3s cubic-bezier(0.25, 0.8, 0.25, 1) 0s',
  hoverColor: 'color .5s cubic-bezier(0.25, 0.8, 0.25, 1) 0s',
};

const content = (colors) => ({
  background: colors.mainBackground,
  border: colors.border,
  font: colors.font,
  titleFont: increaseIntensivity(colors.font, 0.15),
  code: {
    border: colors.border,
    font: colors.fontDark,
    background: colors.background,
  },
});

const navigationSidebar = (colors) => ({
  backgroundSecondary: colors.background,
  backgroundPrimary: colors.background,
  backgroundHover: colors.backgroundHover,
  backgroundActive: colors.backgroundActive,
  border: colors.border,
  divider: colors.divider,
  font: {
    base: colors.font,
    hover: colors.primary,
  },
  poweredBy: {
    font: colors.grayLight,
    background: colors.border,
    hover: colors.primary,
  },
});

const header = (colors) => ({
  background: colors.background,
  shadow: colors.shadow,
  font: {
    base: colors.primary,
    hover: colorfn(colors.primary).negate().hex(),
  },
  border: colors.border,
  icons: {
    background: colors.background,
    shadow: colors.shadow,
    fill: decreaseIntensivity(colors.background, 0.4),
    stroke: decreaseIntensivity(colors.background, 0.4),
    hover: colors.primary,
  },
});

const search = (colors) => ({
  background: colors.background,
  mark: {
    font: colors.font,
    background: colors.searchHighlight,
  },
  font: {
    base: colors.font,
    hover: colors.font,
    highlight: colors.fontDark,
  },
  hover: colors.border,
  border: colors.border,
  pagination: {
    background: colors.mainBackground,
    border: colors.border,
    font: colors.font,
    hover: colors.border,
    current: {
      background: colors.primary,
      font: grayscaleCompatible(colors.primary),
    },
  },
});

const editOnRepo = (colors) => ({
  background: colors.background,
  border: colors.border,
  hover: colors.hover,
  font: {
    base: colors.font,
    hover: grayscaleCompatible(colors.hover),
  },
});

const jargon = (colors) => ({
  background: colors.background,
  border: colors.border,
  font: colors.font,
  shadow: colors.shadow,
});

const highlights = (colors) => ({
  warning: {
    border: colors.orange,
    background: colors.orangeLight,
    font: colors.fontDark,
  },
  error: {
    border: colors.red,
    background: colors.redLight,
    font: colors.fontDark,
  },
  info: {
    border: colors.blue,
    background: colors.blueLight,
    font: colors.fontDark,
  },
  tip: {
    border: colors.green,
    background: colors.greenLight,
    font: colors.fontDark,
  },
});

const table = (colors) => ({
  header: {
    background: colors.primary,
    font: increaseIntensivity(colorfn(colors.primary).negate().grayscale(), 0.5),
  },
  oddRow: colors.mainBackground,
  evenRow: colors.background,
  rowHover: colors.hover + '3d',
  border: colors.border,
});

const tableOfContents = (colors) => ({
  background: colors.mainBackground,
  font: {
    base: decreaseIntensivity(colors.font, 0.15),
    hover: colors.primary,
    current: colors.primary,
  },
  border: colors.border,
});

const previousNext = (colors) => ({
  background: colors.mainBackground,
  hover: colors.primary,
  font: colors.font,
  fontLabel: decreaseIntensivity(colors.font, 0.45),
  border: colors.border,
  shadow: colors.shadow,
});

const scrollTop = (colors) => ({
  background: colors.primary,
  hover: increaseIntensivity(colors.primary, 0.15),
  arrow: colorfn(colors.primary).negate().grayscale().lighten(0.4).rgb().string(),
});

export default {
  colors: colors,
  layout: pageLayout,
  transitions: transitions,
  header: header,
  search: search,
  navigationSidebar: navigationSidebar,
  content: content,
  editOnRepo: editOnRepo,
  jargon: jargon,
  highlights: highlights,
  table: table,
  tableOfContents: tableOfContents,
  previousNext: previousNext,
  scrollTop: scrollTop,
};

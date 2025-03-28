/* eslint-disable react/display-name */
import React from 'react';
import Accordion from './accordion';
import AnchorTag from './anchor';
import Badge from './badge';
import Card from './card';
import CodeBlock from './codeBlock';
import DownloadCard from './fileDownloadCard';
import Highlights from './highlights';
import Icon from './icon';
import ImageCard from './imageCard';
import Jargon from './jargon';
import Layout from './layout';
import LinkCard from './linkCard';
import { blockquote, pre, table, list } from '../../../backup-gatsby/src/styles';
import { useTheme } from 'emotion-theming';
import emoji from '../../../backup-gatsby/src/utils/emoji';
import CheckListItem from './CheckListItem';
import FeatureAsColumnComparisonTable from './FeatureAsColumnComparisonTable';
import Contributors from './Contributors';
import FriendsWebsites from './FriendsWebsites';
import FeatureAsRowComparisonTable from './FeatureAsRowComparisonTable';
import LimitTextToNumberOfLines from './LimitTextToNumberOfLines';
import FixingFloatingFooterToBottom from './FixingFloatingFooterToBottom';
import TextTransformExample from './TextTransformExample'
import FallingSnow from './FallingSnow';

const idFromHeader = (props) => {
  let name = props.children;
  if (Array.isArray(name)) {
    name = props.children[0];
  }
  return emoji.clean(name).replace(/\s+/g, '').toLowerCase();
};
const Header = (level, props) => {
  let name = idFromHeader(props);
  return React.createElement('h' + level, {
    className: 'heading' + level,
    id: 'h-' + name,
    ...props,
  });
};

const Table = ({ ...props }) => (
  <div css={{ display: 'grid' }}>
    <div css={{ overflowX: 'auto' }}>
      <table css={table(useTheme())} {...props} />
    </div>
  </div>
);

const Section = (props) => {
  let header = '';
  if (Array.isArray(props.children)) {
    header = props.children[0].props;
  } else {
    header = props.children.props;
  }
  const name = idFromHeader(header);
  return <section id={name} {...props} />;
};

const emphasis = (props) => {
  const useJargon = !(typeof props.children === 'string');
  if (useJargon) {
    return <Jargon {...props} />;
  }
  return <em {...props} />;
};

// Export components to be available in MDX page without explicitly import
export default {
  h1: (props) => Header(1, props),
  h2: (props) => Header(2, props),
  h3: (props) => Header(3, props),
  h4: (props) => Header(4, props),
  h5: (props) => Header(5, props),
  h6: (props) => Header(6, props),
  section: (props) => Section(props),
  blockquote: (props) => <blockquote css={blockquote(useTheme())} {...props} />,
  p: (props) => <p className="paragraph" {...props} />,
  pre: (props) => <pre css={pre} {...props} />,
  table: (props) => <Table {...props} />,
  em: emphasis,
  img: (props) => (
    <a href={props.src} target="_blank" rel="noopener noreferrer">
      <img alt='' loading={'lazy'} {...props} />
    </a>
  ),
  code: CodeBlock,
  ul: (props) => <ul css={list} {...props} />,
  ol: (props) => <ol css={list} {...props} />,
  a: AnchorTag,
  Badge,
  Layout,
  Icon,
  Accordion,
  Card,
  LinkCard,
  ImageCard,
  DownloadCard,
  CheckListItem,
  FeatureAsColumnComparisonTable,
  Contributors,
  FriendsWebsites,
  FeatureAsRowComparisonTable,
  LimitTextToNumberOfLines,
  FixingFloatingFooterToBottom,
  TextTransformExample,
  FallingSnow,
  ...Highlights,
};

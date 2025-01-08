import 'katex/dist/katex.min.css';

import 'react-quill/dist/quill.snow.css';

import {
  CollapsibleText,
  type CollapsibleTextProps,
} from '../common/CollapsibleText/CollapsibleText';

type Props = {
  content: string;
  collapsed?: CollapsibleTextProps['collapsed'];
  numberOfLinesToShow?: CollapsibleTextProps['numberOfLinesToShow'];
};
const ContentDescription = ({
  content,
  collapsed = true,
  numberOfLinesToShow,
}: Props): JSX.Element => (
  <CollapsibleText
    content={content}
    collapsed={collapsed}
    numberOfLinesToShow={numberOfLinesToShow}
  />
);
export default ContentDescription;

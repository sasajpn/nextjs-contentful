import { INLINES } from "@contentful/rich-text-types";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";

const options = {
  renderNode: {
    [INLINES.HYPERLINK]: (node, children) => {
      return (
        <a target="_blank" rel="noopener noreferrer" href={node.data.uri}>
          {children}
        </a>
      );
    },
  },
};

function RichText({ document }) {
  if (!document) {
    return null;
  }

  return <>{documentToReactComponents(document, options)}</>;
}

export default RichText;

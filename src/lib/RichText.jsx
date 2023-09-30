import { documentToReactComponents } from '@contentful/rich-text-react-renderer'

function RichText({ document }) {
	if (!document) {
		return null
	}

	return <>{documentToReactComponents(document)}</>
}

export default RichText
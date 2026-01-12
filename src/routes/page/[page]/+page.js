const modules = import.meta.glob('$lib/content/*.svx');

export async function load({ params }) {
	const { page } = params;
	const path = `/src/lib/content/${page}.svx`;
	
	if (modules[path]) {
		const content = await modules[path]();
		return {
			Content: content.default,
			page
		};
	}
	
	return {
		Content: null,
		page,
		error: 'Page not found'
	};
}

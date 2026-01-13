const modules = import.meta.glob('../../../lib/content/*.svx', { eager: true });

export async function load({ params }) {
	const { page } = params;
	
	for (const path in modules) {
		const fileName = path.split('/').pop().replace('.svx', '');
		if (fileName === page) {
			return {
				Content: modules[path].default,
				page
			};
		}
	}
	
	return {
		Content: null,
		page,
		error: 'Page not found'
	};
}

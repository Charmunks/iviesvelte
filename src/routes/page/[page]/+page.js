export async function load({ params }) {
	const { page } = params;
	
	try {
		const content = await import(`$lib/content/${page}.svx`);
		return {
			Content: content.default,
			page
		};
	} catch (e) {
		return {
			Content: null,
			page,
			error: 'Page not found'
		};
	}
}

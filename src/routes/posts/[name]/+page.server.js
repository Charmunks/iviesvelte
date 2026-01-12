import { redirect } from '@sveltejs/kit';

export function load({ params }) {
	throw redirect(301, `/page/${params.name}`);
}

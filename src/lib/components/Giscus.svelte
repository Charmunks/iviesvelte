<script>
	import { onMount } from 'svelte';
	import { browser } from '$app/environment';

	export let name = '';

	let container;

	onMount(() => {
		if (!browser) return;

		const script = document.createElement('script');
		script.src = 'https://giscus.app/client.js';
		script.setAttribute('data-repo', 'charmunks/iviedotcodes');
		script.setAttribute('data-repo-id', 'R_kgDOQttuTg');
		script.setAttribute('data-category', 'Announcements');
		script.setAttribute('data-category-id', 'DIC_kwDOQttuTs4C0kpj');
		script.setAttribute('data-mapping', 'specific');
		script.setAttribute('data-term', name);
		script.setAttribute('data-strict', '0');
		script.setAttribute('data-reactions-enabled', '1');
		script.setAttribute('data-emit-metadata', '0');
		script.setAttribute('data-input-position', 'bottom');
		script.setAttribute('data-theme', 'preferred_color_scheme');
		script.setAttribute('data-lang', 'en');
		script.crossOrigin = 'anonymous';
		script.async = true;

		container.appendChild(script);
	});
</script>

<div bind:this={container} class="giscus-container"></div>

<style>
	.giscus-container {
		width: 100%;
		margin-top: 2rem;
	}
</style>

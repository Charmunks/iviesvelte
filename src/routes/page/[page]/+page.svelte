<script>
	import Mew from '$lib/components/Mew.svelte';
	import { mewVisible } from '$lib/stores/mewVisible.js';

	export let data;
</script>

<div class="container">
	{#if $mewVisible}
		<div class="mew-panel">
			<Mew />
		</div>
	{/if}
	<div class="content" class:centered={!$mewVisible}>
		{#if data.Content}
			<svelte:component this={data.Content} />
		{:else}
			<h1>Page not found</h1>
			<p>The page "{data.page}" doesn't exist.</p>
		{/if}
	</div>
</div>

<style>
	.container {
		display: flex;
		min-height: 100vh;
		width: 100%;
	}

	.mew-panel {
		height: 100vh;
		position: fixed;
		left: 0;
		top: 0;
	}

	.content {
		width: 60%;
		margin-left: 37%;
		margin-right: 14%;
		padding: 0rem 2rem;
		overflow-y: auto;
		min-height: 100vh;
		margin-top: 10px;
		color: #f2eecf;
		margin-bottom: 1%;
	}

	.content.centered {
		width: 60%;
		margin-left: auto;
		margin-right: auto;
	}

	@media (max-width: 768px) {
		.mew-panel {
			display: none;
		}

		.content,
		.content.centered {
			width: 100%;
			margin-left: 0;
			margin-right: 0;
		}
	}
</style>

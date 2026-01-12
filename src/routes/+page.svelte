<script>
	import Mew from '$lib/components/Mew.svelte';
	import HomeContent from '$lib/content/home.svx';
</script>

<div class="container">
	<div class="mew-panel">
		<Mew />
	</div>
	<div class="content">
		<HomeContent />
	</div>
</div>

<style>
	:global(body) {
		margin: 0;
		padding: 0;
		background-color: #585062;
		color: #cdd6f4;
		font-family: system-ui, -apple-system, sans-serif;
		min-height: 100vh;
	}

	:global(a) {
		color: #89b4fa;
		text-decoration: none;
		transition: color 0.2s ease;
	}

	:global(a:hover) {
		color: #b4befe;
		text-decoration: underline;
	}

	:global(a:visited) {
		color: #cba6f7;
	}

	.container {
		display: flex;
		min-height: 100vh;
		width: 100%;
	}

	.mew-panel {
		width: 40%;
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
		color: #fbf1f2;
		margin-bottom: 1%;
	}

	@media (max-width: 768px) {
		.mew-panel {
			display: none;
		}

		.content {
			width: 100%;
			margin-left: 0;
		}
	}
</style>

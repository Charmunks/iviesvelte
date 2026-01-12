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
		background-color: #110d31;
		color: #d6c996;
		font-family: system-ui, -apple-system, sans-serif;
		min-height: 100vh;
	}

	:global(a) {
		color: #db4e6f;
		text-decoration: none;
		transition: color 0.2s ease;
	}

	:global(a:hover) {
		color: #ff4d76;
		text-decoration: underline;
	}

	:global(a:visited) {
		color: #9a355a;
	}

	.container {
		display: flex;
		min-height: 100vh;
		width: 100%;
	}

	.mew-panel {
		width: 45%;
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

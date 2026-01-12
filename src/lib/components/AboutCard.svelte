<script>
	export let title = "";
	export let description = "";
</script>

<div class="about-card">
	<div class="card-content">
		<h3 class="title">{title}</h3>
		<p class="description">{@html description}</p>
	</div>
</div>

<style>
	.about-card {
		display: flex;
		flex-direction: column;
		position: relative;
		width: 100%;
		padding: 1.5rem;
		border: 2px solid #f58782;
		border-radius: 12px;
		overflow: hidden;
		box-sizing: border-box;
		margin-bottom: 10px;
	}

	.card-content {
		position: relative;
		z-index: 1;
	}

	.title {
		margin: 0 0 0.75rem 0;
		font-size: 1.25rem;
		font-weight: 600;
		color: #f2eecf;
	}

	.description {
		margin: 0;
		font-size: 0.9rem;
		color: #f2eecf;
		line-height: 1.5;
	}
</style>

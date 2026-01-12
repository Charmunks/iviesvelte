<script>
	export let name = "Project Name";
	export let link = "#";
	export let description = "Project description goes here.";
</script>

<a 
	href={link}
	class="project-card"
>
	<div class="card-content">
		<h3 class="project-name">{name}</h3>
		<p class="project-description">{description}</p>
	</div>
</a>

<style>
	.project-card {
		display: flex;
		flex-direction: column;
		position: relative;
		flex: 0 0 calc(33.333% - 0.5rem);
		min-width: 300px;
		padding: 1.5rem;
		border: 2px solid #f58782;
		border-radius: 12px;
		text-decoration: none;
		overflow: hidden;
		transition: transform 0.2s ease-out, border-color 0.3s ease;
		box-sizing: border-box;
	}

	.project-card:hover {
		transform: scale(1.05);
	}

	.card-content {
		position: relative;
		z-index: 1;
	}

	.project-name {
		margin: 0 0 0.75rem 0;
		font-size: 1.25rem;
		font-weight: 600;
		color: #f2eecf;
		transition: color 0.3s ease;
	}



	.project-description {
		font-size: 0.9rem;
		color: #f2eecf;
		line-height: 1.5;
	}

	@media (max-width: 768px) {
		.project-card {
			width: 100%;
			margin: 0.5rem 0;
		}
	}
</style>

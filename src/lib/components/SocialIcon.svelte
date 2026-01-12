<script>
	export let icon = '';
	export let link;
	export let image = '';
</script>

<a href={link} target="_blank" rel="noopener noreferrer">
	<img
		src={image || `https://cdn.simpleicons.org/${icon}`}
		alt={icon || 'social icon'}
		class="social-icon"
	/>
</a>

<style>
	.social-icon {
		width: 24px;
		height: 24px;
		transition: transform 0.2s ease;
		filter: grayscale(100%) brightness(0) invert(1);
		margin-right: 6px;
	}

	.social-icon:hover {
		transform: scale(1.2);
	}

	a {
		display: inline-block;
	}
</style>

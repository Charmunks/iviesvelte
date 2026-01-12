<script>
	let x = 0;
	let y = 0;
	let hovering = false;
	let expanded = false;

	function handleMouseMove(event) {
		const rect = event.currentTarget.getBoundingClientRect();
		x = event.clientX - rect.left;
		y = event.clientY - rect.top;
	}

	function handleClick() {
		expanded = true;
		setTimeout(() => {
			expanded = false;
		}, 2000);
	}
</script>

<div
	class="flashlight-container"
	role="button"
	tabindex="0"
	aria-label="Click to expand flashlight"
	on:mousemove={handleMouseMove}
	on:mouseenter={() => (hovering = true)}
	on:mouseleave={() => (hovering = false)}
	on:click={handleClick}
	on:keydown={(e) => e.key === 'Enter' && handleClick()}
>
	<img src="/mew.png" alt="Mew" />
	{#if hovering}
		<div class="overlay" class:expanded style="--x: {x}px; --y: {y}px;"></div>
	{/if}
</div>

<style>
	.flashlight-container {
		position: fixed;
		top: 0;
		left: 0;
		width: 35%;
		height: 100vh;
		overflow: hidden;
		border-right: 4px solid #000;
	}

	img {
		display: block;
		width: 100%;
		height: 100%;
		object-fit: cover;
	}

	.overlay {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background: radial-gradient(
			circle 100px at var(--x) var(--y),
			transparent 0%,
			rgba(0, 0, 0, 0.85) 100%
		);
		pointer-events: none;
		transition: background 0.3s ease;
	}

	.overlay.expanded {
		background: radial-gradient(
			circle 150px at var(--x) var(--y),
			transparent 0%,
			rgba(0, 0, 0, 0.85) 100%
		);
	}
</style>

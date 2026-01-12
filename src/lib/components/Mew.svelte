<script>
	let hovering = false;
</script>

<div
	class="image-container"
	on:mouseenter={() => (hovering = true)}
	on:mouseleave={() => (hovering = false)}
>
	<img src="/mew.png" alt="Mew" class:hovering />
	<div class="glow"></div>
</div>

<style>
	.image-container {
		position: fixed;
		top: 0;
		left: 0;
		width: 35%;
		height: 100vh;
		overflow: hidden;
	}

	.image-container::after {
		content: '';
		position: absolute;
		top: 0;
		right: 0;
		width: 40px;
		height: 100%;
		background: linear-gradient(to right, transparent, #110d31);
		pointer-events: none;
	}

	img {
		display: block;
		width: 100%;
		height: 100%;
		object-fit: cover;
		transition: transform 0.4s ease, filter 0.4s ease;
	}

	img.hovering {
		transform: scale(1.02);
		filter: brightness(1.1) saturate(1.1);
	}

	.glow {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		pointer-events: none;
		background: radial-gradient(
			ellipse 60% 40% at 50% 80%,
			rgba(219, 78, 111, 0.15) 0%,
			rgba(214, 201, 150, 0.05) 40%,
			transparent 70%
		);
		animation: pulse 4s ease-in-out infinite;
	}

	@keyframes pulse {
		0%, 100% {
			opacity: 0.6;
		}
		50% {
			opacity: 1;
		}
	}
</style>

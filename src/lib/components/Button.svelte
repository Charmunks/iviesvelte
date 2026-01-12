<script>
	export let text = "Button";
	export let url = "#";

	let isHovered = false;
	let mouseX = 0.5;
	let mouseY = 0.5;

	function handleMouseMove(e) {
		const rect = e.currentTarget.getBoundingClientRect();
		mouseX = (e.clientX - rect.left) / rect.width;
		mouseY = (e.clientY - rect.top) / rect.height;
	}

	$: rotateX = isHovered ? (mouseY - 0.5) * -25 : 0;
	$: rotateY = isHovered ? (mouseX - 0.5) * 25 : 0;
</script>

<a 
	href={url}
	class="button"
	on:mousemove={handleMouseMove}
	on:mouseenter={() => isHovered = true}
	on:mouseleave={() => isHovered = false}
	style="
		--rotate-x: {rotateX}deg;
		--rotate-y: {rotateY}deg;
	"
>
	{text}
</a>

<style>
	.button {
		display: inline-block;
		padding: 0.75rem 1.5rem;
		background: #110d31;
		border: 2px solid #5d3259;
		border-radius: 8px;
		text-decoration: none;
		font-size: 1rem;
		font-weight: 600;
		color: #d6c996;
		transform-style: preserve-3d;
		transform: perspective(1000px) rotateX(var(--rotate-x)) rotateY(var(--rotate-y));
		transition: transform 0.2s ease-out, border-color 0.3s ease, color 0.3s ease;
		margin-right: 5px;
	}

	.button:hover {
		border-color: #db4e6f;
		color: #db4e6f;
	}

	@media (max-width: 768px) {
		.button {
			transform: none;
			margin-bottom: 5px;
		}
	}
</style>

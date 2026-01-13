<script>
	import { tick, onMount } from 'svelte';
	import favicon from '$lib/assets/favicon.svg';

	let { children } = $props();

	onMount(() => {
		currentSongIndex = Math.floor(Math.random() * songs.length);
	});

	const songs = [
		{ title: 'Have you heard the news today', artist: 'Earth to Eve', src: '/heardthenews.mp3' },
		{ title: 'We had a good run', artist: 'Emerson Brophy', src: '/hadagoodrun.mp3' },
		{ title: 'Bloodline', artist: 'Alex Warren, Jelly Roll', src: '/bloodline.mp3' },
		{ title: 'Girl eraser', artist: 'Maretu', src: '/girleraser.mp3' },
		{ title: 'Hard Times', artist: 'Paramore', src: '/hardtime.mp3' },
		{ title: 'City of Angels', artist: 'Em Beihold', src: '/cityofangels.mp3' }
	];

	let musicPlaying = $state(false);
	let volume = $state(25);
	let currentSongIndex = $state(0);
	let audio = $state();

	let currentSong = $derived(songs[currentSongIndex]);

	function toggleMusic() {
		if (!audio) return;
		if (musicPlaying) {
			audio.pause();
			musicPlaying = false;
		} else {
			audio.volume = volume / 100;
			audio.play();
			musicPlaying = true;
		}
	}

	function handleVolumeChange() {
		if (audio) {
			audio.volume = volume / 100;
		}
	}

	async function prevSong() {
		currentSongIndex = (currentSongIndex - 1 + songs.length) % songs.length;
		await tick();
		if (audio) {
			audio.volume = volume / 100;
			audio.play();
			musicPlaying = true;
		}
	}

	async function nextSong() {
		currentSongIndex = (currentSongIndex + 1) % songs.length;
		await tick();
		if (audio) {
			audio.volume = volume / 100;
			audio.play();
			musicPlaying = true;
		}
	}
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

<audio bind:this={audio} src={currentSong.src} loop></audio>
	<div class="music-wrapper">
		<div class="music-menu">
			<div class="song-title">{currentSong.title}</div>
			<div class="song-artist">{currentSong.artist}</div>
			<div class="track-controls">
				<button class="track-btn" onclick={prevSong} title="Previous">
					<svg viewBox="0 0 24 24" fill="currentColor" width="14" height="14">
						<path d="M6 6h2v12H6V6zm3.5 6l8.5 6V6l-8.5 6z"/>
					</svg>
				</button>
				<button class="track-btn play-btn" onclick={toggleMusic} title={musicPlaying ? 'Pause' : 'Play'}>
					{#if musicPlaying}
						<svg viewBox="0 0 24 24" fill="currentColor" width="14" height="14">
							<path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/>
						</svg>
					{:else}
						<svg viewBox="0 0 24 24" fill="currentColor" width="14" height="14">
							<path d="M8 5v14l11-7z"/>
						</svg>
					{/if}
				</button>
				<button class="track-btn" onclick={nextSong} title="Next">
					<svg viewBox="0 0 24 24" fill="currentColor" width="14" height="14">
						<path d="M6 18l8.5-6L6 6v12zM16 6v12h2V6h-2z"/>
					</svg>
				</button>
			</div>
			<div class="volume-control">
				<span class="volume-label">Volume</span>
				<input
					type="range"
					min="0"
					max="25"
					bind:value={volume}
					oninput={handleVolumeChange}
					class="volume-slider"
				/>
				<span class="volume-value">{Math.round(volume * 4)}%</span>
			</div>
		</div>
		<button class="music-control" onclick={toggleMusic} title={musicPlaying ? 'Pause' : 'Play'}>
			{#if musicPlaying}
				<svg viewBox="0 0 24 24" fill="currentColor" width="24" height="24">
					<path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/>
				</svg>
			{:else}
				<svg viewBox="0 0 24 24" fill="currentColor" width="24" height="24">
					<path d="M8 5v14l11-7z"/>
				</svg>
			{/if}
		</button>
	</div>

{@render children()}

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

	.music-wrapper {
		position: fixed;
		bottom: 1.5rem;
		right: 1.5rem;
		z-index: 999;
	}

	.music-menu {
		position: absolute;
		bottom: 60px;
		right: 0;
		background-color: #1a1445;
		border: 2px solid #db4e6f;
		border-radius: 12px;
		padding: 1rem;
		min-width: 200px;
		opacity: 0;
		visibility: hidden;
		transform: translateY(10px);
		transition: all 0.2s ease;
	}

	.music-wrapper:hover .music-menu {
		opacity: 1;
		visibility: visible;
		transform: translateY(0);
	}

	.song-title {
		color: #f2eecf;
		font-weight: 600;
		font-size: 0.95rem;
		margin-bottom: 0.25rem;
	}

	.song-artist {
		color: #db4e6f;
		font-size: 0.85rem;
		margin-bottom: 0.75rem;
	}

	.track-controls {
		display: flex;
		justify-content: center;
		gap: 0.5rem;
		margin-bottom: 0.75rem;
	}

	.track-btn {
		background-color: transparent;
		border: 1px solid #db4e6f;
		color: #db4e6f;
		width: 32px;
		height: 32px;
		border-radius: 50%;
		cursor: pointer;
		display: flex;
		align-items: center;
		justify-content: center;
		transition: all 0.2s ease;
	}

	.track-btn:hover {
		background-color: #db4e6f;
		color: #110d31;
	}

	.volume-control {
		display: flex;
		align-items: center;
		gap: 0.5rem;
	}

	.volume-label {
		color: #d6c996;
		font-size: 0.8rem;
	}

	.volume-slider {
		flex: 1;
		height: 4px;
		appearance: none;
		background: #2a2060;
		border-radius: 2px;
		cursor: pointer;
	}

	.volume-slider::-webkit-slider-thumb {
		appearance: none;
		width: 12px;
		height: 12px;
		background: #db4e6f;
		border-radius: 50%;
		cursor: pointer;
	}

	.volume-slider::-moz-range-thumb {
		width: 12px;
		height: 12px;
		background: #db4e6f;
		border-radius: 50%;
		border: none;
		cursor: pointer;
	}

	.volume-value {
		color: #d6c996;
		font-size: 0.8rem;
		min-width: 32px;
		text-align: right;
	}

	.music-control {
		width: 48px;
		height: 48px;
		border-radius: 50%;
		background-color: #1a1445;
		border: 2px solid #db4e6f;
		color: #db4e6f;
		cursor: pointer;
		transition: all 0.2s ease;
		z-index: 999;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.music-control:hover {
		background-color: #db4e6f;
		color: #110d31;
	}
</style>

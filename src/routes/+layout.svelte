<script>
	import { tick, onMount } from 'svelte';
	import favicon from '$lib/assets/favicon.svg';
	import { confirmed } from '$lib/stores/music.js';

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

	let disableMusic = $state(false);
	let musicPlaying = $state(false);
	let volume = $state(25);
	let currentSongIndex = $state(0);
	let audio = $state();

	let currentSong = $derived(songs[currentSongIndex]);

	function handleConfirm() {
		confirmed.set(true);
		if (!disableMusic && audio) {
			audio.volume = volume / 100;
			audio.play();
			musicPlaying = true;
		}
	}

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

{#if !$confirmed}
	<!-- svelte-ignore a11y_click_events_have_key_events -->
	<!-- svelte-ignore a11y_no_static_element_interactions -->
	<div class="splash" onclick={handleConfirm}>
		<div class="splash-content" onclick={(e) => e.stopPropagation()}>
			<div class="splash-icon">♪</div>
			<h1>Click anywhere to enter</h1>
			<label class="music-toggle">
				<input type="checkbox" bind:checked={disableMusic} />
				<span class="checkbox-custom"></span>
				<span>Enter without music</span>
			</label>
		</div>
	</div>
{/if}

<audio bind:this={audio} src={currentSong.src} loop></audio>

{#if $confirmed}
	<div class="music-wrapper">
		<div class="music-menu">
			<div class="song-title">{currentSong.title}</div>
			<div class="song-artist">{currentSong.artist}</div>
			<div class="track-controls">
				<button class="track-btn" onclick={prevSong} title="Previous">◀</button>
				<button class="track-btn play-btn" onclick={toggleMusic} title={musicPlaying ? 'Pause' : 'Play'}>
					{#if musicPlaying}❚❚{:else}►{/if}
				</button>
				<button class="track-btn" onclick={nextSong} title="Next">▶</button>
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
		<button class="music-control" onclick={toggleMusic} title={musicPlaying ? 'Mute' : 'Unmute'}>
			{#if musicPlaying}
				♪
			{:else}
				♪̸
			{/if}
		</button>
	</div>
{/if}

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

	.splash {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background-color: rgba(17, 13, 49, 0.85);
		display: flex;
		align-items: center;
		justify-content: center;
		z-index: 1000;
		cursor: pointer;
	}

	.splash-content {
		text-align: center;
		color: #d6c996;
		padding: 3rem;
		border: 2px solid #db4e6f;
		border-radius: 16px;
		background-color: rgba(17, 13, 49, 0.95);
		max-width: 400px;
		cursor: default;
	}

	.splash-icon {
		font-size: 3rem;
		margin-bottom: 1rem;
		color: #db4e6f;
	}

	.splash-content h1 {
		font-size: 2rem;
		margin: 0 0 0.5rem 0;
		color: #f2eecf;
		margin-bottom: 20px;
	}

	.music-toggle {
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 0.75rem;
		margin-bottom: 2rem;
		cursor: pointer;
		font-size: 0.95rem;
	}

	.music-toggle input {
		display: none;
	}

	.checkbox-custom {
		width: 20px;
		height: 20px;
		border: 2px solid #db4e6f;
		border-radius: 4px;
		display: inline-block;
		position: relative;
		transition: all 0.2s ease;
	}

	.music-toggle input:checked + .checkbox-custom {
		background-color: #db4e6f;
	}

	.music-toggle input:checked + .checkbox-custom::after {
		content: '✓';
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		color: #110d31;
		font-size: 14px;
		font-weight: bold;
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
		font-size: 0.75rem;
		display: flex;
		align-items: center;
		justify-content: center;
		transition: all 0.2s ease;
	}

	.track-btn:hover {
		background-color: #db4e6f;
		color: #110d31;
	}

	.play-btn {
		font-size: 0.6rem;
		letter-spacing: -2px;
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
		font-size: 1.5rem;
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

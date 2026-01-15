<script>

	export let title = "";
	export let author = "";
	export let authorAvatarPath = "";
	export let date = "";
	export let description = "";
	export let readTime = false;
	export let toc = false;
	export let content = null;

	let headings = [];
	let estimatedReadTime = 0;
	let initialized = false;

	$: if (content && !initialized) {
		initialized = true;
		setTimeout(() => {
			if (toc && content) {
				const headingElements = content.querySelectorAll('h1, h2, h3, h4, h5, h6');
				headings = Array.from(headingElements).map((el, i) => ({
					id: el.id || `heading-${i}`,
					text: el.textContent,
					level: parseInt(el.tagName.charAt(1))
				}));
				headingElements.forEach((el, i) => {
					if (!el.id) el.id = `heading-${i}`;
				});
			}

			if (readTime && content) {
				const text = content.textContent || '';
				const wordCount = text.split(/\s+/).filter(word => word.length > 0).length;
				estimatedReadTime = Math.ceil(wordCount / 200);
			}
		}, 0);
	}

	function formatDate(dateStr) {
		const d = new Date(dateStr);
		return d.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
	}
</script>

<svelte:head>
	<title>{title}</title>
	<meta name="description" content={description} />
	<meta property="og:title" content={title} />
	<meta property="og:description" content={description} />
	<meta name="twitter:title" content={title} />
	<meta name="twitter:description" content={description} />
</svelte:head>

<header class="article-header">
	<h1 class="title">{title}</h1>
	<div class="meta">
		<div class="author">
			{#if authorAvatarPath}
				<img src={authorAvatarPath} alt={author} class="avatar" />
			{/if}
			<span class="author-name">{author}</span>
		</div>
		<span class="date">{formatDate(date)}</span>
		{#if readTime && estimatedReadTime > 0}
			<span class="read-time">{estimatedReadTime} min read</span>
		{/if}
	</div>
	<p class="description">{description}</p>
</header>

{#if toc && headings.length > 0}
	<nav class="toc">
		<h2>Table of Contents</h2>
		<ul>
			{#each headings as heading}
				<li style="margin-left: {(heading.level - 1) * 1}rem">
					<a href="#{heading.id}">{heading.text}</a>
				</li>
			{/each}
		</ul>
	</nav>
{/if}

<style>
	.article-header {
		margin-bottom: 1.5rem;
	}

	.title {
		margin: 0.5rem 0 1rem 0;
		font-size: 1.75rem;
		font-weight: 700;
		color: #f2eecf;
	}

	.meta {
		display: flex;
		align-items: center;
		gap: 1rem;
		margin-bottom: 0.5rem;
		color: #f2eecf;
		font-size: 0.9rem;
	}

	.author {
		display: flex;
		align-items: center;
		gap: 0.5rem;
	}

	.avatar {
		width: 32px;
		height: 32px;
		border-radius: 50%;
	}

	.author-name {
		color: #f2eecf;
		font-weight: 500;
	}

	.description {
		font-size: 1.1rem;
		color: #a28d88;
		margin: 0;
		line-height: 1.6;
	}

	.toc {
		margin-bottom: 2rem;
		padding: 1rem 1.5rem;
		border: 2px solid #5d3259;
		border-radius: 12px;
	}

	.toc h2 {
		margin: 0 0 0.75rem 0;
		font-size: 1.1rem;
		color: #f2eecf;
	}

	.toc ul {
		margin: 0;
		padding: 0;
		list-style: none;
	}

	.toc li {
		margin: 0.5rem 0;
	}

	.toc a {
		color: #db4e6f;
		text-decoration: none;
	}

	.toc a:hover {
		text-decoration: underline;
	}
</style>

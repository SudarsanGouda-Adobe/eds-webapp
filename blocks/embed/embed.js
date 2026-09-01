
export default function decorate(block) {
  const link = block.querySelector('a');

  if (!link) {
    console.log('Embed: No link found');
    return;
  }

  const url = link.href;

  // YouTube
  if (url.includes('youtube.com') || url.includes('youtu.be')) {
    let videoId = '';

    try {
      const parsedUrl = new URL(url);

      if (parsedUrl.hostname.includes('youtu.be')) {
        videoId = parsedUrl.pathname.substring(1);
      } else if (parsedUrl.pathname.includes('/shorts/')) {
        videoId = parsedUrl.pathname.split('/shorts/')[1];
      } else if (parsedUrl.pathname.includes('/embed/')) {
        videoId = parsedUrl.pathname.split('/embed/')[1];
      } else {
        videoId = parsedUrl.searchParams.get('v');
      }

      videoId = videoId?.split(/[?&#]/)[0];
    } catch (error) {
      console.error('Invalid YouTube URL:', error);
      return;
    }

    if (!videoId) return;

    const iframe = document.createElement('iframe');

    iframe.src = `https://www.youtube.com/embed/${videoId}`;
    iframe.title = 'YouTube video';
    iframe.loading = 'lazy';
    iframe.allow =
      'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share';
    iframe.allowFullscreen = true;

    block.innerHTML = '';
    block.append(iframe);

    return;
  }

  // Twitter / X
  if (url.includes('twitter.com') || url.includes('x.com')) {
    const blockquote = document.createElement('blockquote');

    blockquote.className = 'twitter-tweet';

    const tweetLink = document.createElement('a');
    tweetLink.href = url;
    tweetLink.target = '_blank';
    tweetLink.rel = 'noopener noreferrer';
    tweetLink.textContent = 'View this post on X';

    blockquote.append(tweetLink);

    block.innerHTML = '';
    block.append(blockquote);

    const loadTwitterWidget = () => {
      if (window.twttr && window.twttr.widgets) {
        window.twttr.widgets.load(block);
      }
    };

    if (window.twttr && window.twttr.widgets) {
      loadTwitterWidget();
    } else {
      const existingScript = document.querySelector(
        'script[src="https://platform.twitter.com/widgets.js"]',
      );

      if (existingScript) {
        existingScript.addEventListener('load', loadTwitterWidget);
      } else {
        const script = document.createElement('script');

        script.src = 'https://platform.twitter.com/widgets.js';
        script.async = true;

        script.onload = loadTwitterWidget;

        document.body.append(script);
      }
    }
  }
}

export default function decorate(block) {
  const link = block.querySelector('a');

  if (!link) return;

  const url = link.href;

  // YouTube
  if (url.includes('youtube.com') || url.includes('youtu.be')) {
    let videoId = '';

    try {
      const parsedUrl = new URL(url);

      if (parsedUrl.hostname.includes('youtu.be')) {
        videoId = parsedUrl.pathname.substring(1);
      } else {
        videoId = parsedUrl.searchParams.get('v');
      }
    } catch (error) {
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

    blockquote.append(tweetLink);

    block.innerHTML = '';
    block.append(blockquote);

    const script = document.createElement('script');

    script.src = 'https://platform.twitter.com/widgets.js';
    script.async = true;

    script.onload = () => {
      if (window.twttr) {
        window.twttr.widgets.load(block);
      }
    };

    document.body.append(script);
  }
}

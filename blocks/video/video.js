export default function decorate(block) {
  const link = block.querySelector('a');

  if (!link) {
    return;
  }

  const url = link.href;
  const videoId = new URL(url).searchParams.get('v');

  if (!videoId) {
    return;
  }

  const iframe = document.createElement('iframe');

  iframe.src = `https://www.youtube.com/embed/${videoId}`;
  iframe.title = 'YouTube video';
  iframe.setAttribute('frameborder', '0');
  iframe.setAttribute('allowfullscreen', '');
  iframe.setAttribute(
    'allow',
    'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share',
  );

  block.innerHTML = '';
  block.append(iframe);
}

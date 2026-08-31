import { createOptimizedPicture } from '../../scripts/aem.js';

export default function decorate(block) {debugger;
  const img = block.querySelector('img');
  const heading = block.querySelector('h1');
  const description = block.querySelectorAll('p')[0];
  const cta = block.querySelector('a');

  const banner = document.createElement('div');
  banner.className = 'banner';

  banner.innerHTML = `
    <div class="banner-media"></div>
    <div class="banner-content"></div>
  `;

  const media = banner.querySelector('.banner-media');
  const content = banner.querySelector('.banner-content');

  if (img) {
    media.append(
      createOptimizedPicture(
        img.src,
        img.alt,
        false,
        [
          { width: '750' },
          { width: '1200' },
          { width: '2000' },
        ],
      ),
    );
  }

  if (heading) content.append(heading);
  if (description) content.append(description);
  if (cta) content.append(cta);

  block.replaceChildren(banner);
}
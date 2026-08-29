import { createOptimizedPicture } from '../../scripts/aem.js';

// export default function decorate(block) {
//   const picture = block.querySelector('picture');
//   const heading = block.querySelector('h1');
//   const description = block.querySelectorAll('p')[0];
//   const cta = block.querySelector('a');

//   block.innerHTML = `
//     <div class="banner">
//       <div class="banner-media"></div>
//       <div class="banner-content"></div>
//     </div>
//   `;

//   const media = block.querySelector('.banner-media');
//   const content = block.querySelector('.banner-content');

//   if (picture) media.append(picture);
//   if (heading) content.append(heading);
//   if (description) content.append(description);
//   if (cta) content.append(cta);
// }
export default function decorate(block) {
  const picture = block.querySelector('picture');
  const heading = block.querySelector('h1');
  const description = block.querySelectorAll('p')[0];
  const cta = block.querySelector('a');

  const template = document.createElement('div');
  template.className = 'banner';

  template.innerHTML = `
    <div class="banner-media"></div>
    <div class="banner-content"></div>
  `;

  const media = template.querySelector('.banner-media');
  const content = template.querySelector('.banner-content');

  // Bind content
  if (picture) media.append(picture);

  if (heading) content.append(heading);

  if (description) content.append(description);

  if (cta) content.append(cta);

  block.replaceChildren(template);
}
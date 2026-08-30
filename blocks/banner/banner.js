import { createOptimizedPicture } from '../../scripts/aem.js';

export default function decorate(block) {
  const img = block.querySelector('img');
  const heading = block.querySelector('h1');
  const description = block.querySelectorAll('p')[0];
  const cta = block.querySelector('a');



  const img1= block.querySelector('img');
  const heading1=block.querySelector('h1');
  const desc_=block.querySelectorAll('p')[0];
  const banenr_ = document.createElement('div');
  banenr_.className='banner';
  banenr_.innerHTML=`<div class="banner-media">
        <div class="banner-content"></div>
    </div>`


const media_=banenr_.querySelector('.banner-media');
const content_=banenr_.querySelector('.banner-content');
if(img1){
    media_.append(createOptimizedPicture(
        img.src,
        img.alt,
        false,
        [{width:'750px'},{width:'1200px'},{with:'2000px'}]
    ))
}







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
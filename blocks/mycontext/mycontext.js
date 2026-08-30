/**
 * @param {HTMLElement} block
 */
import { createOptimizedPicture } from "../../scripts/aem.js";

export default function decorate(block){
    const p = block.querySelector('p');
    const picture=block.querySelector('picture');

    const blockdiv = document.createElement('div');
    blockdiv.className='context_div';
    blockdiv.innerHTML='';
    blockdiv.innerHTML=`
    <div class="block_para"></div>
    <div class='block_img'></div>
    `

    const media = blockdiv.querySelector('.block_img');
    const content =blockdiv.querySelector('.block_para');

    if(p) content.append(p)
    if(picture) media.append(picture)
    block.append(blockdiv)

}
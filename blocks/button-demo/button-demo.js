import { createButton } from "../../scripts/components/button.js";

export default function decorate(block){
    const btngrp=document.createElement('div');
    btngrp.className='btnGrp';
    const normalButton=createButton({
        text:'Go go product',
        href:'/shop',
        variant:"primary",
        size:'sm'
    });
     const danderButton=createButton({
        text:"Learn More",
        variant:"secondary",
        size:'sm',
        icon:'cart',
    });
    const iconButton = createButton({
    text: 'Add to cart',
    variant: 'primary',
    size: 'sm',
    icon: 'star',
  });
  block.textContent = '';
  btngrp.append(normalButton, iconButton,danderButton);
  block.append(btngrp);
}
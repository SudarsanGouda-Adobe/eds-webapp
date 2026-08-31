
import { createProductTeaser } from "../../scripts/components/product-teaser.js";
const APP_URL="https://fakestoreapi.com/products";
export default async function decorate(block){
    
    try{
        const response = await fetch(APP_URL);
        if(!response.ok){
            throw new Error(`Failed to fetch prodcts:${response.status}`);
        }
        const products = await response.json();
        
        block.textContent ='';

        const productList = document.createElement('div');

        products.forEach((product)=>{
            const teaser = createProductTeaser({
                    id:product.id,
                    name:product.title,
                    image: product.image,
                    imageAlt:product.title,
                    price: `$${Number(product.price).toFixed(2)}`,
                    description:product.description,
                    rating:product.rating?
                    {
                        value:product.rating.rate,
                        count:product.rating.count,
                    }:null,
                    dataset:{
                        productid:product.id
                    },
                    
                    attributes:{
                        'arial-lable':product.title
                    },

                    cta:{
                        text:'Add to cart',
                        variant:'primary',
                        size:'sm',
                        icon:'cart',
                        dataset:{
                            productid:product.id
                        },
                        attributes:{
                            type:'button',
                            'aria-label':`Add ${product.title} to cart`
                        },
                        onclick:(event)=>{
                            event.preventDefault();
                            console.log(`Add product ${product.id} to cart`);
                        },
                    },
            });
            productList.append(teaser)
        });
        block.append(productList)

    }catch(err){
        console.log('Products block: failed to load products' ,err.message);
        block.textContent = 'Unable to load products at this time.';
    }
}
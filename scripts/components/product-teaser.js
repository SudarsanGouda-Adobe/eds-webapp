import { createButton } from './button.js';

/**
 * Creates a reusable Product Teaser / Product Card.
 *
 * Supports:
 * - SEO-friendly semantic HTML
 * - Accessible image alt text
 * - Heading + product link
 * - Price
 * - Description
 * - Optional rating
 * - Optional badge
 * - Optional CTA
 * - Arbitrary data-* attributes
 * - Arbitrary HTML/ARIA attributes
 * - Future extensibility
 */

export function createProductTeaser({
  id,
  name,
  url,
  image,
  imageAlt = '',
  price,
  description = '',
  rating = null,
  badge = null,
  cta = null,
  dataset = {},
  attributes = {},
  className = '',
} = {}) {
  const article = document.createElement('article');

  article.className = [
    'product-teaser',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  // Product data attributes
  Object.entries(dataset).forEach(([key, value]) => {
    if (value !== undefined && value !== null) {
      article.dataset[key] = value;
    }
  });

  // Other HTML / ARIA attributes
  Object.entries(attributes).forEach(([name, value]) => {
    if (value !== undefined && value !== null) {
      article.setAttribute(name, value);
    }
  });

  /*
   * Product image
   */
  if (image) {
    const imageElement = document.createElement('img');

    imageElement.src = image;
    imageElement.alt = imageAlt || name || '';

    article.append(imageElement);
  }

  /*
   * Product badge
   */
  if (badge) {
    const badgeElement = document.createElement('span');

    badgeElement.className = 'product-teaser__badge';
    badgeElement.textContent = badge;

    article.append(badgeElement);
  }

  /*
   * Product title
   */
  if (name) {
    const heading = document.createElement('h3');

    if (url) {
      const titleLink = document.createElement('a');

      titleLink.href = url;
      titleLink.textContent = name;

      heading.append(titleLink);
    } else {
      heading.textContent = name;
    }

    article.append(heading);
  }

  /*
   * Description
   */
  if (description) {
    const descriptionElement = document.createElement('p');

    descriptionElement.className = 'product-teaser__description';
    descriptionElement.textContent = description;

    article.append(descriptionElement);
  }

  /*
   * Price
   */
  if (price !== undefined && price !== null) {
    const priceElement = document.createElement('p');

    priceElement.className = 'product-teaser__price';
    priceElement.textContent = price;

    article.append(priceElement);
  }

  /*
   * Rating
   */
  if (rating) {
    const ratingElement = document.createElement('div');

    ratingElement.className = 'product-teaser__rating';

    const ratingValue = rating.value ?? '';
    const ratingCount = rating.count ?? '';

    ratingElement.setAttribute(
      'aria-label',
      `Rating ${ratingValue} out of 5${
        ratingCount ? `, ${ratingCount} reviews` : ''
      }`,
    );

    ratingElement.textContent = `★ ${ratingValue}`;

    if (ratingCount) {
      const countElement = document.createElement('span');

      countElement.textContent = ` (${ratingCount} reviews)`;

      ratingElement.append(countElement);
    }

    article.append(ratingElement);
  }

  /*
   * CTA
   */
  if (cta) {
    const button = createButton({
      text: cta.text,
      href: cta.href,
      variant: cta.variant || 'primary',
      size: cta.size || 'sm',
      icon:cta.icon || null,
      dataset: cta.dataset || {},
      attributes: cta.attributes || {},
      onClick: cta.onClick || null,
    });

    article.append(button);
  }

  return article;
}


//basice product
// createProductTeaser({
//   id: 'running-shoe',
//   name: 'Running Shoe',
//   url: '/product/running-shoe',
//   image: '/images/running-shoe.jpg',
//   imageAlt: 'Black running shoe',
//   price: '$99',
// });

//Product + Rating + Badge
// createProductTeaser({
//   id: 'running-shoe',
//   name: 'Running Shoe',
//   url: '/product/running-shoe',
//   image: '/images/running-shoe.jpg',
//   imageAlt: 'Black running shoe',
//   price: '$99',

//   rating: {
//     value: 4.5,
//     count: 120,
//   },

//   badge: 'Best Seller',
// });



// Product + Add to Cart
// And this is where your earlier data-product-id approach fits:
// createProductTeaser({
//   id: 'running-shoe',
//   name: 'Running Shoe',
//   url: '/product/running-shoe',
//   image: '/images/running-shoe.jpg',
//   imageAlt: 'Black running shoe',
//   price: '$99',

//   dataset: {
//     productId: 'running-shoe',
//   },

//   cta: {
//     text: 'Add to cart',

//     dataset: {
//       productId: 'running-shoe',
//       action: 'add-to-cart',
//     },

//     onClick: (event) => {
//       const productId = event.currentTarget.dataset.productId;

//       addItem(productId);
//     },
//   },
// });


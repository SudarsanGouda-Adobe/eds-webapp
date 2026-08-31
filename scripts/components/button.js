export function createButton({
  text,
  href = null,
  variant = 'primary',
  size = 'sm',
  className = '',
  icon = null,
  dataset = {},
  attributes = {},
  onClick = null,
} = {}) {
  const element = href
    ? document.createElement('a')
    : document.createElement('button');

  // Semantic classes
  element.className = [
    'btn',
    `btn-${variant}`,
    `btn-${size}`,
    className,
  ]
    .filter(Boolean)
    .join(' ');

  // Navigation vs action
  if (href) {
    element.href = href;
  } else {
    element.type = 'button';
  }

  
   //*Icon + text
   
  if (icon) {
    const iconElement = document.createElement('span');
    iconElement.className = `icon icon-${icon}`;
    iconElement.setAttribute('aria-hidden', 'true');
    const textElement = document.createElement('span');
    textElement.textContent = text;
    element.append(iconElement, textElement);
  } else {    
    element.textContent = text;
  }

  // data-* attributes
  Object.entries(dataset).forEach(([key, value]) => {
    if (value !== undefined && value !== null) {
      element.dataset[key] = value;
    }
  });

  // Other HTML / ARIA attributes
  Object.entries(attributes).forEach(([name, value]) => {
    if (value !== undefined && value !== null) {
      element.setAttribute(name, value);
    }
  });

  // Click event
  if (typeof onClick === 'function') {
    element.addEventListener('click', onClick);
  }

  return element;
}

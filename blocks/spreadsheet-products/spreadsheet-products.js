const APP_URL = '/workshop4/products.json';
const ITEMS_PER_PAGE = 20;

function createPagination(currentPage, totalPages, totalRecords, onPrevious, onNext) {
  const pagination = document.createElement('div');

  pagination.className = 'spreadsheet-products-pagination';

  pagination.innerHTML = `
    <button class="previous">Previous</button>
    <span>Page ${currentPage} of ${totalPages}</span>
    <button class="next">Next</button>
    <span>Total Pages: ${totalPages}</span>
    <span>Total Records: ${totalRecords}</span>
  `;

  const previousButton = pagination.querySelector('.previous');
  const nextButton = pagination.querySelector('.next');

  previousButton.disabled = currentPage === 1;
  nextButton.disabled = currentPage === totalPages;

  previousButton.addEventListener('click', onPrevious);
  nextButton.addEventListener('click', onNext);

  return pagination;
}

export default async function decorate(block) {
  try {
    const response = await fetch(APP_URL);

    if (!response.ok) {
      throw new Error(`Failed to fetch data: ${response.status}`);
    }

    const data = await response.json();
    const items = data.data || [];

    const totalRecords = items.length;
    const totalPages = Math.ceil(totalRecords / ITEMS_PER_PAGE);

    let currentPage = 1;

    block.textContent = '';

    const table = document.createElement('table');

    const thead = document.createElement('thead');

    thead.innerHTML = `
      <tr>
        <th>ID</th>
        <th>Title</th>
        <th>Image URL</th>
        <th>Thumbnail URL</th>
      </tr>
    `;

    const tbody = document.createElement('tbody');

    table.append(thead, tbody);

    function renderTable() {
      tbody.textContent = '';

      const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
      const endIndex = startIndex + ITEMS_PER_PAGE;

      const currentItems = items.slice(startIndex, endIndex);

      currentItems.forEach((item) => {
        const row = document.createElement('tr');

        row.innerHTML = `
          <td>${item.id}</td>
          <td>${item.title}</td>
          <td>${item.url}</td>
          <td>${item.thumbnailUrl}</td>
        `;

        tbody.append(row);
      });

      const oldPagination = block.querySelector(
        '.spreadsheet-products-pagination',
      );

      if (oldPagination) {
        oldPagination.remove();
      }

      const pagination = createPagination(
        currentPage,
        totalPages,
        totalRecords,
        () => {
          if (currentPage > 1) {
            currentPage -= 1;
            renderTable();
          }
        },
        () => {
          if (currentPage < totalPages) {
            currentPage += 1;
            renderTable();
          }
        },
      );

      block.prepend(pagination);
    }

    block.append(table);

    renderTable();
  } catch (error) {
    console.error('Error loading spreadsheet data:', error);

    block.innerHTML = `
      <p>Unable to load spreadsheet data.</p>
    `;
  }
}

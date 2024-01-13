# Shipping Label Creator

This web application allows users to create shipping labels by filling out a form. It uses PDFMake to generate PDF labels based on the entered information.

## Getting Started

1. **Clone the repository:**

   ```bash
   git clone https://github.com/your-username/your-repository.git
   ```

# Shipping Label Creator

This web application enables users to create shipping labels by following these simple steps:

1. **Open the `index.html` File:**

   - Open the `index.html` file in your preferred web browser.

2. **Fill Out the Form:**

   - Fill out the form with customer and shipment information.

3. **Create Label:**

   - Click on the "Create Label" button to add the label to the table.

4. **Print Labels:**
   - To print the labels, click on the "Print Labels" button.

## File Structure

- **date-initialization.js:**

  - Initializes the date input field on page load.

- **form-handling.js:**

  - Handles the form submission, performs validation, and updates the table with added entries.

- **label-printing.js:**

  - Contains functions to print labels using PDFMake. It formats the label data and creates a PDF for printing.

- **styles.css:**

  - Contains styles for PDF labels.

- **index.html:**
  - The main HTML file with the form, table, and scripts.

## Dependencies

- **Bootstrap 4.5.2:**

  - Included via CDN for styling.

- **PDFMake 0.1.68:**
  - Included via CDN for generating PDFs.

## Contributing

Feel free to contribute to the project by submitting issues or pull requests. Your feedback and contributions are welcome!

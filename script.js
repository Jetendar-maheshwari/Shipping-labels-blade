document.addEventListener("DOMContentLoaded", function () {
  var dateElement = document.getElementById("date");
  if (dateElement) {
    dateElement.value = new Date().toISOString().substring(0, 10);
  } else {
    console.error("Element with id 'date' not found.");
  }
});

// Define your PDFMake definition (dd) here as you provided earlier

// Initialize an array to store label data
var labels = [];
function deleteLabel(r, position) {
  console.log("position " + position);
  labels.splice(position, 1);
  // delete row from table
  deleteRow(r);
}

function deleteRow(r) {
  var i = r.parentNode.parentNode.rowIndex;
  document.getElementById("shippingTable").deleteRow(i);
}

// Handle form submission
document
  .getElementById("shippingLabelForm")
  .addEventListener("submit", function (e) {
    e.preventDefault();

    // Get form values
    var customerName = document.getElementById("customerName").value;
    var address = document.getElementById("address").value;
    var city = document.getElementById("city").value;
    var mobileNo = document.getElementById("mobileNo").value;
    var pieces = document.getElementById("pieces").value;
    var orderRef = document.getElementById("orderRef").value;
    var amount = document.getElementById("amount").value;
    var date = document.getElementById("date").value;
    var shipperName = document.getElementById("shipperName").value;
    var orderDetails = document.getElementById("orderDetails").value;

    // Validate form data (you can add more validation logic)
    if (
      !customerName ||
      !address ||
      !city ||
      !mobileNo ||
      !pieces ||
      isNaN(pieces) ||
      pieces < 0 ||
      !orderRef ||
      !amount ||
      amount < 0 ||
      !date ||
      !shipperName ||
      !orderDetails
    ) {
      alert("Please fill all required fields and negative number not allowed");
      return;
    }

    // Add label data to the array
    var label = {
      customerName,
      address,
      city,
      mobileNo,
      pieces,
      orderRef,
      amount,
      date,
      shipperName,
      orderDetails,
    };
    labels.push(label);

    // Clear the form
    document.getElementById("shippingLabelForm").reset();
    document.getElementById("date").value = new Date()
      .toISOString()
      .substring(0, 10);

    // Update the table to display added entries
    var labelTableBody = document.getElementById("labelTableBody");
    var row = document.createElement("tr");
    var srNo = labels.length;
    row.innerHTML = `<td>${srNo}</td><td>${label.customerName}</td><td>${
      label.address
    }</td><td>${label.city}</td><td>${label.mobileNo}</td><td>${
      label.pieces
    }</td><td>${label.orderRef}</td><td>${label.amount}</td><td>${
      label.date
    }</td><td>${label.shipperName}</td><td>${
      label.orderDetails
    }</td><td><button class="btn btn-danger btn-sm" onclick="deleteLabel(this,${labels.indexOf(
      label
    )})">Delete</button></td>`;

    labelTableBody.appendChild(row);
  });

// Function to print labels using PDFMake
document.getElementById("printLabels").addEventListener("click", function () {
  if (labels.length === 0) {
    alert("No labels to print.");
    return;
  }

  // Create PDF labels using PDFMake and labels array
  // Example code for creating PDF labels should be placed here
  printShippingLabels(labels);
});
//        });
function printShippingLabels(labels) {
  var content = [];
  var maxPage = 0;
  for (var i = 0; i < labels.length; i++) {
    var label = labels[i];
    var formattedLabel = {
      style: "tableExample",
      table: {
        body: [
          [
            { text: "Consignee Information ", style: "tableHeader" },
            { text: "Shipment Information", style: "tableHeader" },
            { text: "Shipper Information", style: "tableHeader" },
          ],

          [
            [
              {
                table: {
                  body: [
                    [
                      { text: "Name", style: "tableHeader" },
                      label.customerName,
                    ],
                    [{ text: "Address", style: "tableHeader" }, label.address],
                    [{ text: "City", style: "tableHeader" }, label.city],
                    [
                      { text: "Mobile No", style: "tableHeader" },
                      label.mobileNo,
                    ],
                  ],
                },
              },
            ],
            [
              {
                table: {
                  body: [
                    [{ text: "Pieces", style: "tableHeader" }, label.pieces],
                    [
                      { text: "Order Ref", style: "tableHeader" },
                      label.orderRef,
                    ],
                    [{ text: "Amount", style: "tableHeader" }, label.amount],
                    [{ text: "Date", style: "tableHeader" }, label.date],
                  ],
                },
              },
            ],
            [
              {
                table: {
                  body: [
                    [{ text: "Name", style: "tableHeader" }, label.shipperName],
                    [
                      { text: "Order Details", style: "tableHeader" },
                      label.orderDetails,
                    ],
                  ],
                },
              },
            ],
          ],
        ],
      },
    };
    if (maxPage === 3) {
      console.log("page>=3");
      formattedLabel["pageBreak"] = "before";
      maxPage = 0;
    }
    ++maxPage;
    console.log("page " + maxPage);
    content.push(formattedLabel);
  }
  var dd = {
    content: content,
    styles: {
      header: {
        fontSize: 18,
        bold: true,
        margin: [0, 0, 0, 10],
      },
      subheader: {
        fontSize: 16,
        bold: true,
        margin: [0, 10, 0, 5],
      },
      tableExample: {
        margin: [0, 5, 0, 15],
      },
      tableHeader: {
        bold: true,
        fontSize: 13,
        color: "black",
      },
    },
  };
  pdfMake.createPdf(dd).print();
}

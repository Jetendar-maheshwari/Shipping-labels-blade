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
      header: "header",
      subheader: "subheader",
      tableExample: "table-example",
      tableHeader: "table-header",
    },
  };
  pdfMake.createPdf(dd).print();
}

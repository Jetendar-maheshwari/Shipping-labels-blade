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

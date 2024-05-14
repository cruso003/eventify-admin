export const orderColumns = [
  { field: "id", headerName: "ID", width: 70 },
  {
    field: "product",
    headerName: "Product",
    width: 260,
    renderCell: (params) => {
      return (
        <div className="cellWithImg">
          {params.row.product.map((product, index) => (
            <div key={index}>
              <img className="cellImg" src={product.img} alt="avatar" />
              {product.name}
            </div>
          ))}
        </div>
      );
    },
  },

  {
    field: "customer",
    headerName: "Customer",
    width: 200,
  },

  {
    field: "date",
    headerName: "Date",
    width: 100,
  },
  {
    field: "amount",
    headerName: "Amount",
    width: 180,
    renderCell: (params) => {
      return (
        <div className={`cellWithStatus ${params.row.amount}`}>
          ${params.row.amount}
        </div>
      );
    },
  },
  {
    field: "payment",
    headerName: "Payment Method",
    width: 180,
    renderCell: (params) => {
      return (
        <div className="cellWithImg">
          {params.row.payment.map((payment, index) => (
            <div key={index}>
              {payment.paymentMethod ? payment.paymentMethod : "N/A, "}
            </div>
          ))}
        </div>
      );
    },
  },

  {
    field: "status",
    headerName: "Status",
    width: 180,
    renderCell: (params) => {
      return (
        <div className={`cellWithStatus ${params.row.status}`}>
          {params.row.status}
        </div>
      );
    },
  },
];

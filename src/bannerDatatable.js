export const bannerColumns = [
  { field: "id", headerName: "ID", width: 70 },
  {
    field: "banner",
    headerName: "Banners",
    width: 250,
    renderCell: (params) => {
      return (
        <div className="cellWithImg">
          <img className="cellImg" src={params.row.img} alt="avatar" />
          {params.row.banner}
        </div>
      );
    },
  },
  {
    field: "product",
    headerName: "Link Products",
    width: 300,
    renderCell: (params) => {
      return (
        <div style={{ height: "150px", overflowY: "auto" }}>
          {params.row.linkProducts.map((product, index) => (
            <div key={index} className="cellWithImg">
              <img
                className="cellImg"
                src={product.imageUrl}
                alt={`Product ${index + 1}`}
              />
              {product.title}
            </div>
          ))}
        </div>
      );
    },
  },
];

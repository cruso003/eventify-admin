export const eventTypeColumns = [
  { field: "id", headerName: "ID", width: 70 },
  {
    field: "eventType",
    headerName: "Event Types",
    width: 250,
    renderCell: (params) => {
      return <div className="cellWithStatus">{params.row.eventType}</div>;
    },
  },
  {
    field: "categories",
    headerName: "Categories",
    width: 300,
    renderCell: (params) => {
      return (
        <div style={{ height: "150px", overflowY: "auto" }}>
          {params.row.categories.map((category, index) => (
            <div key={index} className="cellWithImg">
              {category.title}
            </div>
          ))}
        </div>
      );
    },
  },
];

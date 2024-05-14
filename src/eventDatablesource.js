export const eventColumns = [
  { field: "id", headerName: "ID", width: 70 },
  {
    field: "event",
    headerName: "Event",
    width: 230,
    renderCell: (params) => {
      return (
        <div className="cellWithImg">
          <img className="cellImg" src={params.row.img} alt="avatar" />
          {params.row.name}
        </div>
      );
    },
  },
  {
    field: "description",
    headerName: "Description",
    width: 230,
  },

  {
    field: "price",
    headerName: "Price",
    width: 100,
    renderCell: (params) => {
      return (
        <div>
          ${params.row.price.toFixed(2)}{" "}
          {/* Displaying price with 2 decimal places */}
        </div>
      );
    },
  },
  {
    field: "organizer",
    headerName: "Organizer",
    width: 160,
    renderCell: (params) => {
      return (
        <div className={`cellWithStatus ${params.row.organizer}`}>
          {params.row.organizer}
        </div>
      );
    },
  },
];

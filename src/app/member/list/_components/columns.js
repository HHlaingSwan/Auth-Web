import ActionColumn from "./ActionColumn";
import ImageView from "./ImageView";

const { createColumnHelper } = require("@tanstack/react-table");

const columnHelper = createColumnHelper();
export const columns = [
  columnHelper.accessor("customer_name", {
    cell: (info) => info.getValue(),
    header: () => "Member Name",
  }),
  columnHelper.accessor("vip_code", {
    header: () => <span>VIP Code</span>,
  }),
  columnHelper.accessor("_id", {
    header: () => "Image",
    cell: (info) => <ImageView member_id={info.getValue()} />,
  }),
  columnHelper.accessor("createdBy", {
    header: () => "Created By",
  }),
  columnHelper.accessor("updatedBy", {
    header: () => <span>Updated By</span>,
  }),
  columnHelper.accessor("updatedAt", {
    header: "Updated At",
    cell: (info) => {
      const date = new Date(info.getValue());
      return (
        <p>
          {date.getDate()}/{date.getMonth()}/{date.getFullYear()}
        </p>
      );
    },
  }),
  {
    id: "action",
    header: "#",
    cell: ({ row }) => <ActionColumn member={row.original} />,
  },
];

interface UmkmStatusBadgeProps {
  status: string;
}

const statusStyles: Record<string, string> = {
  PENDING: "bg-yellow-100 text-yellow-800 border-yellow-300",
  APPROVED: "bg-green-100 text-green-800 border-green-300",
  REJECTED: "bg-red-100 text-red-800 border-red-300",
};

const statusLabels: Record<string, string> = {
  PENDING: "Pending",
  APPROVED: "Disetujui",
  REJECTED: "Ditolak",
};

export function UmkmStatusBadge({ status }: UmkmStatusBadgeProps) {
  return (
    <span
      className={`inline-block px-2 py-0.5 text-[10px] font-medium border rounded ${
        statusStyles[status] || "bg-gray-100 text-gray-800 border-gray-300"
      }`}
    >
      {statusLabels[status] || status}
    </span>
  );
}

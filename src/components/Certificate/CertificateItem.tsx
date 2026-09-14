const CertificateItem = ({
  name,
  date,
  organizer,
}: {
  name: string;
  date: string;
  organizer: string;
}) => {
  return (
    <div className="page-break-avoid text-sm flex flex-wrap items-baseline gap-x-2">
      <span className="font-semibold">{name}</span>
      <span className="text-GRAY_HEAVY">{`${organizer} · ${date}`}</span>
    </div>
  );
};

export default CertificateItem;

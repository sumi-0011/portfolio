const EducationItem = ({
  name,
  description,
  period,
}: {
  name: string;
  description: string;
  period: string[];
}) => {
  return (
    <div className="page-break-avoid text-sm">
      <div className="flex flex-wrap items-baseline gap-x-2">
        <span className="font-semibold">{name}</span>
        <span className="text-GRAY_HEAVY">{`${period[0]}${period[1] ? " - " + period[1] : ""}`}</span>
      </div>
      <p className="text-GRAY_HEAVY">{description}</p>
    </div>
  );
};

export default EducationItem;

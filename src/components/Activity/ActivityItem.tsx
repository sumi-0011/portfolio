const ActivityItem = ({
  name,
  period,
  description,
}: {
  name: string;
  period: string[];
  description: string;
}) => {
  return (
    // 경력 위주 이력서라 한 줄 제목 + 작은 설명으로 간추림
    <div className="page-break-avoid text-sm">
      <div className="flex flex-wrap items-baseline gap-x-2">
        <span className="font-semibold">{name}</span>
        <span className="text-GRAY_HEAVY">{`${period[0]}${period[1] ? " - " + period[1] : ""}`}</span>
      </div>
      <p className="text-GRAY_HEAVY">{description.replace(/\s*\n\s*/g, " · ")}</p>
    </div>
  );
};

export default ActivityItem;

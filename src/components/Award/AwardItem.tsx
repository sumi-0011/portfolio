import { AwardProps } from "@/types";

const AwardItem = ({ name, date, organizer, description }: AwardProps) => {
  return (
    <div className="page-break-avoid text-sm">
      <div className="flex flex-wrap items-baseline gap-x-2">
        <span className="font-semibold">{name}</span>
        <span className="text-GRAY_HEAVY">{`${organizer} · ${date}`}</span>
      </div>
      <p className="text-GRAY_HEAVY">{description.replace(/\s*\n\s*/g, " · ")}</p>
    </div>
  );
};

export default AwardItem;

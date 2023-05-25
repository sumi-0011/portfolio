import { AwardProps } from "@/types";

const AwardItem = ({ name, date, organizer, description }: AwardProps) => {
  return (
    <div className="flex flex-col md:flex-row gap-6 md:gap-0">
      <div className="flex flex-col gap-2">
        <div className="flex flex-col">
          <h3>{name}</h3>
          <div>
            <span>{organizer}</span> / <span>{date}</span>
          </div>
        </div>

        <span className="whitespace-pre-wrap">{`${description}`}</span>
      </div>
    </div>
  );
};

export default AwardItem;

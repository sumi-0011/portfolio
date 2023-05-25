import SectionTitle from "../SectionTitle";
import CertificateItem from "./CertificateItem";

import { DataProps } from "@/types";

const Certificate = ({ certificate }: Pick<DataProps, "certificate">) => {
  return (
    <div>
      <SectionTitle>Certificates</SectionTitle>
      <div className="flex flex-col gap-12">
        {[...certificate].reverse().map((certificate) => (
          <CertificateItem key={certificate.id} {...certificate} />
        ))}
      </div>
    </div>
  );
};

export default Certificate;

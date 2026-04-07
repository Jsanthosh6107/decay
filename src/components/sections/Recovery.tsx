import {
  Highlight,
  SectionStatus,
  type SectionStatusItem,
} from "@/components/ui";

const sectionClassName = "relative w-screen overflow-x-clip";
const glowTopSoftClassName =
  "pointer-events-none absolute inset-x-0 top-0 bg-gradient-to-b from-ars-accent-soft/25 to-transparent";

const recoveryStatuses: SectionStatusItem[] = [
  {
    key: "nausea",
    label: <>Nausea</>,
    value: <>Easing</>,
    tone: "stable",
  },
  {
    key: "headache",
    label: <>Head pressure</>,
    value: <>Easing</>,
    tone: "stable",
  },
  {
    key: "vitals",
    label: <>Vital signs</>,
    value: <>Easing</>,
    tone: "stable",
  },
  {
    key: "appetite",
    label: <>Appetite</>,
    value: <>Easing</>,
    tone: "stable",
  },
  {
    key: "renewal",
    label: <>Cell renewal capacity</>,
    value: <>Critical failure</>,
    tone: "failure",
  },
];

export default function Recovery() {
  return (
    <section id="recovery" className={sectionClassName}>
      <SectionStatus
        eyebrow={<>Recovery window</>}
        title={
          <>
            False <Highlight>Stabilization</Highlight>
          </>
        }
        description={
          <>
            Hours to days after the initial symptoms, things appear to improve.
            Vomiting stops. Headaches ease. Vital signs calm. Appetite returns.
            On the surface, it <Highlight>feels like recovery</Highlight>.
          </>
        }
        statuses={recoveryStatuses}
        glowClassName={`${glowTopSoftClassName} h-24`}
      />
    </section>
  );
}

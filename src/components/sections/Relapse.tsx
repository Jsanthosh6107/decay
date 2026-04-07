import {
  Highlight,
  SectionStatus,
  type SectionStatusItem,
} from "@/components/ui";

const sectionClassName = "relative w-screen overflow-x-clip";
const glowTopSoftClassName =
  "pointer-events-none absolute inset-x-0 top-0 bg-gradient-to-b from-ars-accent-soft/25 to-transparent";

const relapseStatuses: SectionStatusItem[] = [
  {
    key: "white-blood-cells",
    label: <>White blood cells</>,
    value: <>Production failing</>,
    tone: "critical",
  },
  {
    key: "platelets",
    label: <>Platelets</>,
    value: <>Production failing</>,
    tone: "critical",
  },
  {
    key: "intestinal-lining",
    label: <>Intestinal lining</>,
    value: <>Barrier breakdown</>,
    tone: "failure",
  },
  {
    key: "symptom-pattern",
    label: <>Symptoms</>,
    value: <>Re-emerging</>,
    tone: "failure",
  },
  {
    key: "systemic-state",
    label: <>Body condition</>,
    value: <>Systemic decline</>,
    tone: "failure",
  },
];

export default function Relapse() {
  return (
    <section id="relapse" className={sectionClassName}>
      <SectionStatus
        eyebrow={<>Relapse phase</>}
        title={
          <>
            Running <Highlight>Dry</Highlight>
          </>
        }
        description={
          <>
            Regenerative systems are no longer sustaining output. Blood cell
            production is failing, platelet recovery is absent, and barrier tissues
            are breaking down. Symptoms return as the body loses the ability to
            maintain itself.
          </>
        }
        statuses={relapseStatuses}
        glowClassName={`${glowTopSoftClassName} h-24`}
      />
    </section>
  );
}

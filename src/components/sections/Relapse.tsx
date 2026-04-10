import {
  Highlight,
  SectionStatus,
  type SectionStatusItem,
} from "@/components/ui";

const sectionClassName = "relative w-screen overflow-x-clip";
const snapSectionClassName = `${sectionClassName} min-h-screen snap-start`;
const glowTopSoftClassName =
  "pointer-events-none absolute inset-x-0 top-0 bg-gradient-to-b from-ars-accent-soft/25 to-transparent";

const relapseStatuses: SectionStatusItem[] = [
  {
    key: "white-blood-cells",
    label: <>White blood cells</>,
    value: <>Critical failure</>,
    tone: "critical",
  },
  {
    key: "platelets",
    label: <>Platelets</>,
    value: <>Critical failure</>,
    tone: "critical",
  },
  {
    key: "intestinal-lining",
    label: <>Intestinal lining</>,
    value: <>Barrier failure</>,
    tone: "failure",
  },
  {
    key: "symptom-pattern",
    label: <>Symptoms</>,
    value: <>Re-emergent</>,
    tone: "failure",
  },
  {
    key: "systemic-state",
    label: <>Body condition</>,
    value: <>System collapse</>,
    tone: "failure",
  },
];

export default function Relapse() {
  return (
    <section id="relapse" className={snapSectionClassName}>
      <SectionStatus
        eyebrow={<>Relapse phase</>}
        title={
          <>
            Running <Highlight>Dry</Highlight>
          </>
        }
        description={
          <>
            The systems that kept you alive are no longer <Highlight>keeping up</Highlight>.
            Blood cell production is failing, platelets are not returning, and
            protective tissues are starting to break apart.
          </>
        }
        statuses={relapseStatuses}
        glowClassName={`${glowTopSoftClassName} h-24`}
      />
    </section>
  );
}
import AtomLogo from "../icons/AtomLogo";

export default function Homeostasis() {
  return (
    <section
      id="homeostasis"
      className="min-h-screen flex items-center justify-center"
    >
      <div className="relative h-screen w-screen flex items-center justify-center overflow-x-clip">

        <div className="relative flex flex-col items-center justify-center gap-4 p-20 rounded-lg">
          <div className="flex gap-2 text-9xl font-bold text-shadow-md">
            <div className="bobbing">
              <AtomLogo className="h-[1em] w-[1em]" />
            </div>
            <h1>ARS</h1>
          </div>

          <div className="text-xl font-semibold text-shadow-md">
            <p>
              The <span className="text-highlight">development</span> of{" "}
              <span className="text-accent-soft">Acute Radiation Syndrome</span>
            </p>
          </div>
        </div>

        <div>
          <div>
            <h2>Homeostasis</h2>
            <h3>A stable condition</h3>
            <p>Every healthy human exists in a narrow range. Small infections are dealt with swiftly. Old cells die. New cells replace them. Your internal environment is not stable because nothing goes wrong. It's because damaged or worn out parts are constantly replaced</p>
          </div>
          <div>{/* image */}</div>
        </div>

        <div>
          <div>
            <h2>Organ systems</h2>
            <h3>stable factories</h3>
            <p>Organs are like infrastructure in a city. they silently manufacture blood cells, hormones, immune defenses, and structural tissue constantly. as you shed cells, they replace them, maintaining a narrow but stable balance.</p>
          </div>
          <div>{/* image */}</div>
        </div>

        <div>
          <div>
            <h2>What's about to happen</h2>
            <p>ARS doesn't immediately destroy your organs. it destroys the cells responsible for replacing them. Your body can repair damage, but what repairs the repairers?</p>
          </div>
        </div>
    
      </div>
    </section>
  );
}

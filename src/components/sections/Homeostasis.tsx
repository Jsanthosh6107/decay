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
      </div>
    </section>
  );
}

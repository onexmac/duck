// GoPato — "More services" bottom panel
// Faithful to Figma "serviceup" node 7486:7391
//
// - Gray (#f4f4f4) icon backgrounds
// - Price + "+" pill: bordered pill with price text + plus icon
// - "What's New" section below the list
// Figma MCP asset URLs (valid 7 days from 2026-03-17)
const imgUnion = "https://www.figma.com/api/mcp/asset/8e11c633-605c-4546-a288-0234be780977";
const imgUnion1 = "https://www.figma.com/api/mcp/asset/3972499a-d568-40b0-b02b-c0ce167fbad7";
const imgUnion2 = "https://www.figma.com/api/mcp/asset/0949ae4f-5077-4247-b29f-f2c1f9482d33";

interface Service {
  icon: string;
  name: string;
  description: string;
  price: string;
}

const SERVICES: Service[] = [
  { icon: imgUnion,  name: "Dry cleaning", description: "Description", price: "¢17,000" },
  { icon: imgUnion1, name: "Fresh bread",  description: "Description", price: "¢17,000" },
  { icon: imgUnion2, name: "Dog Walk",     description: "Description", price: "¢17,000" },
];

function PricePill({ price }: { price: string }) {
  return (
    <div className="flex items-center gap-1 shrink-0">
      {/* Price bordered pill */}
      <div
        className="flex items-center px-2.5 h-8 rounded-full"
        style={{
          border: "1px solid #d2d4e4",
          background: "#ffffff",
          fontFamily: "Roboto, sans-serif",
          color: "#9494ad",
          fontSize: 12,
          fontWeight: 500,
          letterSpacing: "0.6px",
        }}
      >
        {price}
      </div>
      {/* Add button */}
      <button
        className="w-8 h-8 rounded-full flex items-center justify-center shrink-0"
        style={{ border: "1px solid #d2d4e4", background: "#ffffff" }}
      >
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
          <line x1="7" y1="2" x2="7" y2="12" stroke="#9494ad" strokeWidth="1.5" strokeLinecap="round" />
          <line x1="2" y1="7" x2="12" y2="7" stroke="#9494ad" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      </button>
    </div>
  );
}

export function ServiceList() {
  return (
    <div
      className="rounded-t-[20px] pt-4 pb-24 flex-1"
      style={{
        background: "#ffffff",
        boxShadow: "0px 1px 6px 0px rgba(180,184,210,0.3)",
      }}
    >
      {/* Drag handle */}
      <div className="flex justify-center mb-3">
        <div className="w-8 h-1 rounded-full bg-[#d2d4e4]" />
      </div>

      {/* Header: "More services" + "More" link */}
      <div className="px-5 flex items-center justify-between mb-1">
        <h2
          className="text-[24px] font-black tracking-[0.72px]"
          style={{ fontFamily: "Roboto, sans-serif", color: "#2f3644" }}
        >
          More services
        </h2>
        <button
          className="text-[16px] font-black"
          style={{ color: "#4c82ee", fontFamily: "Roboto, sans-serif" }}
        >
          More
        </button>
      </div>

      {/* Tabs: Recents | Popular */}
      <div className="px-5 mb-3">
        <div
          className="flex rounded-[20px] p-1"
          style={{ background: "#ebedf2" }}
        >
          <div
            className="flex-1 flex items-center justify-center h-8 rounded-[16px] text-[14px] font-bold tracking-wide"
            style={{
              background: "#ffffff",
              color: "#2f3644",
              fontFamily: "Roboto, sans-serif",
              boxShadow: "0px 1px 2px rgba(0,0,0,0.08), 0px 2px 8px rgba(0,0,0,0.08)",
            }}
          >
            Recents
          </div>
          <div
            className="flex-1 flex items-center justify-center h-8 text-[14px] font-bold tracking-wide"
            style={{ color: "#9494ad", fontFamily: "Roboto, sans-serif" }}
          >
            Popular
          </div>
        </div>
      </div>

      {/* Recommended row */}
      <div className="px-5 mb-2">
        <span
          className="text-[16px] font-bold tracking-wide"
          style={{ fontFamily: "Roboto, sans-serif", color: "#2f3644" }}
        >
          Recommended for you
        </span>
      </div>

      {/* Service rows */}
      <div className="flex flex-col">
        {SERVICES.map((svc) => (
          <div
            key={svc.name}
            className="flex items-center gap-3 px-5 py-3 border-b border-[#f2f2f6]"
          >
            {/* Icon — gray background */}
            <div
              className="w-12 h-12 rounded-[14px] flex items-center justify-center shrink-0"
              style={{ backgroundColor: "#f4f4f4" }}
            >
              <img src={svc.icon} alt={svc.name} className="w-6 h-6 object-contain" style={{ opacity: 0.6 }} />
            </div>

            {/* Text */}
            <div className="flex-1 min-w-0">
              <p
                className="text-[16px] font-bold leading-tight tracking-wide"
                style={{ fontFamily: "Roboto, sans-serif", color: "#2f3644" }}
              >
                {svc.name}
              </p>
              <p
                className="text-[14px] mt-0.5 tracking-wide"
                style={{ fontFamily: "Roboto, sans-serif", color: "#9494AD" }}
              >
                {svc.description}
              </p>
            </div>

            {/* Price + add */}
            <PricePill price={svc.price} />
          </div>
        ))}
      </div>

      {/* What's New */}
      <div className="px-5 mt-4 mb-2">
        <span
          className="text-[16px] font-bold tracking-wide"
          style={{ fontFamily: "Roboto, sans-serif", color: "#2f3644" }}
        >
          What&apos;s New
        </span>
      </div>
      <div
        className="mx-5 h-[180px] rounded-[16px]"
        style={{ background: "#ebedf2" }}
      />
    </div>
  );
}

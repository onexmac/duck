// GoPato — "More services" bottom sheet / list
// Faithful to Figma "serviceup" component
// Colors: bg #F2F6F8 gradient, card white, shadow rgba(180,184,210,0.3)

// Figma MCP asset URLs
const imgClean = "https://www.figma.com/api/mcp/asset/9af5d98b-b171-4ed3-a5c7-9adcd58fa6ca";
const imgMilk  = "https://www.figma.com/api/mcp/asset/bd38a565-a2c7-4ad8-b2f4-407edbba7e5f";
const imgDog   = "https://www.figma.com/api/mcp/asset/d250f46a-42b0-404f-b3c9-ad4fa89d4da4";

interface Service {
  img: string;
  bg: string;
  name: string;
  description: string;
  price: string;
}

const SERVICES: Service[] = [
  { img: imgClean, bg: "#FFC736", name: "Dry cleaning",  description: "Description", price: "$17.000" },
  { img: imgMilk,  bg: "#f0776f", name: "Fresh bread",   description: "Description", price: "$17.000" },
  { img: imgDog,   bg: "#8ad1e1", name: "Dog Walk",       description: "Description", price: "$17.000" },
];

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

      {/* Section header */}
      <div className="px-5 mb-3">
        <h2
          className="text-[24px] font-black tracking-[0.72px]"
          style={{ fontFamily: "Roboto, sans-serif", color: "#2f3644" }}
        >
          More services
        </h2>
      </div>

      {/* Recommended row */}
      <div className="px-5 flex items-center justify-between mb-3">
        <span
          className="text-[14px] font-medium"
          style={{ fontFamily: "Roboto, sans-serif", color: "#2f3644" }}
        >
          Recommended for you
        </span>
        <button
          className="text-[14px] font-medium"
          style={{ color: "#4c82ee", fontFamily: "Roboto, sans-serif" }}
        >
          More
        </button>
      </div>

      {/* Service rows */}
      <div className="flex flex-col">
        {SERVICES.map((svc) => (
          <div
            key={svc.name}
            className="flex items-center gap-4 px-5 py-3 border-b border-[#f2f2f6]"
          >
            {/* Icon */}
            <div
              className="w-11 h-11 rounded-2xl flex items-center justify-center shrink-0"
              style={{
                backgroundColor: svc.bg,
                boxShadow: "0px 1px 2px rgba(0,0,0,0.08)",
              }}
            >
              <img src={svc.img} alt={svc.name} className="w-6 h-6 object-contain" />
            </div>

            {/* Text */}
            <div className="flex-1 min-w-0">
              <p
                className="text-[14px] font-medium leading-tight"
                style={{ fontFamily: "Roboto, sans-serif", color: "#2f3644" }}
              >
                {svc.name}
              </p>
              <p
                className="text-[12px] mt-0.5"
                style={{ fontFamily: "Roboto, sans-serif", color: "#9494AD" }}
              >
                {svc.description}
              </p>
            </div>

            {/* Price */}
            <div
              className="text-[13px] font-medium shrink-0 px-2.5 py-1 rounded-full"
              style={{
                backgroundColor: "#FFF3CC",
                color: "#2f3644",
                fontFamily: "Roboto, sans-serif",
              }}
            >
              {svc.price}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

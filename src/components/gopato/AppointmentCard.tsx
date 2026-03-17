// GoPato — "Limpieza pro" appointment card
// Colors from Figma: card #fdfdfd, shadow rgba(180,184,210,0.3)
// Service icon backgrounds: Clean #FFC736, Refill #f0776f, Pets #8ad1e1, Bolt #7c83f5

// Figma MCP asset URLs (valid 7 days from 2026-03-17)
const imgClean  = "https://www.figma.com/api/mcp/asset/4fc57afd-fd39-4d95-bd79-1d92b20f4a64";
const imgRefill = "https://www.figma.com/api/mcp/asset/f4008ec8-c946-463b-9775-ddf49770cf2b";
const imgPaw    = "https://www.figma.com/api/mcp/asset/990b2c20-508f-49cb-9e5e-e0e06c2c10b4";
const imgBolt   = "https://www.figma.com/api/mcp/asset/ec56c831-c360-48f5-a4d3-94cdadb1d222";

const SERVICES = [
  { img: imgClean,  bg: "#FFC736", label: "Clean"   },
  { img: imgRefill, bg: "#f0776f", label: "Refill"  },
  { img: imgPaw,    bg: "#8ad1e1", label: "Pets"    },
  { img: imgBolt,   bg: "#7c83f5", label: "Bolt"    },
];

interface AppointmentCardProps {
  onConfirm?: () => void;
}

export function AppointmentCard({ onConfirm }: AppointmentCardProps) {
  return (
    <div
      className="mx-3 rounded-2xl p-4 relative"
      style={{
        background: "#fdfdfd",
        boxShadow: "0px 1px 6px 0px rgba(180,184,210,0.3)",
      }}
    >
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <p
            className="text-[20px] font-black tracking-tight leading-tight"
            style={{ fontFamily: "Roboto, sans-serif", color: "#2f3644" }}
          >
            Home Appointment
          </p>
          <p
            className="text-[13px] mt-0.5 tracking-wide"
            style={{ fontFamily: "Roboto, sans-serif", color: "#9494AD" }}
          >
            Monday February 11th, Morning
          </p>
        </div>

        {/* Confirm button */}
        <button
          onClick={onConfirm}
          className="rounded-full px-4 h-9 text-white text-[12px] font-medium tracking-wider shrink-0 ml-2"
          style={{
            background: "#FFC736",
            fontFamily: "Roboto, sans-serif",
            boxShadow: "0px 2px 8px rgba(0,0,0,0.08)",
          }}
        >
          Confirm
        </button>
      </div>

      {/* Service icons */}
      <div className="flex gap-3 mt-4">
        {SERVICES.map(({ img, bg, label }) => (
          <div key={label} className="flex flex-col items-center gap-1">
            <div
              className="w-12 h-12 rounded-[14px] flex items-center justify-center"
              style={{
                backgroundColor: bg,
                boxShadow: "0px 1px 2px rgba(0,0,0,0.08), 0px 2px 8px rgba(0,0,0,0.08)",
              }}
            >
              <img src={img} alt={label} className="w-6 h-6 object-contain" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

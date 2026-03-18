// GoPato — iOS-style status bar (faithful to Figma: "9:41", battery, wifi, signal)
export function StatusBar() {
  return (
    <div className="flex items-center justify-between px-5 pt-3 pb-1 h-[34px]">
      <span
        className="text-[15px] font-semibold text-text-primary"
        style={{ fontFamily: "var(--font-family-sans)" }}
      >
        9:41
      </span>
      <div className="flex items-center gap-1.5">
        {/* Signal */}
        <svg width="17" height="11" viewBox="0 0 17 11" fill="none">
          <rect x="0"  y="7" width="3" height="4"  rx="0.5" fill="var(--color-text-primary)" />
          <rect x="4"  y="5" width="3" height="6"  rx="0.5" fill="var(--color-text-primary)" />
          <rect x="8"  y="3" width="3" height="8"  rx="0.5" fill="var(--color-text-primary)" />
          <rect x="12" y="0" width="3" height="11" rx="0.5" fill="var(--color-text-primary)" />
        </svg>
        {/* Wifi */}
        <svg width="16" height="11" viewBox="0 0 16 11" fill="none">
          <path d="M8 8.5a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3z" fill="var(--color-text-primary)" />
          <path d="M8 5C9.8 5 11.4 5.7 12.6 6.9L11.2 8.3C10.3 7.5 9.2 7 8 7s-2.3.5-3.2 1.3L3.4 6.9C4.6 5.7 6.2 5 8 5z" fill="var(--color-text-primary)" />
          <path d="M8 1C11.3 1 14.2 2.3 16.3 4.4L14.9 5.8C13.1 4 10.7 3 8 3S2.9 4 1.1 5.8L-.3 4.4C1.8 2.3 4.7 1 8 1z" fill="var(--color-text-primary)" />
        </svg>
        {/* Battery */}
        <div className="flex items-center gap-0.5">
          <div className="relative w-[22px] h-[11px] border border-text-primary rounded-[2px]">
            <div className="absolute inset-[1px] right-[3px] bg-text-primary rounded-[1px]" />
          </div>
          <div className="w-[1.5px] h-[5px] bg-text-primary rounded-r-sm" />
        </div>
      </div>
    </div>
  );
}

"use client";

export function FooterMap() {
  return (
    <div className="w-full aspect-[4/3] rounded-xl border border-border overflow-hidden">
      <iframe
        src="https://www.google.com/maps?q=-7.0023286,110.4723865&output=embed&z=15"
        width="100%"
        height="100%"
        style={{ border: 0 }}
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        title="Pedurungan Tengah, Semarang"
        className="w-full h-full"
      />
    </div>
  );
}

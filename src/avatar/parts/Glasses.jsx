// Verres rectangulaires (origine) ou ronds. Le clip sert aux reflets (éclat qui passe,
// code qui se reflète) : ils ne dépassent jamais des verres.

export function LensClip({ id, kind }) {
  return (
    <clipPath id={id}>
      {kind === "rondes" ? (
        <>
          <circle cx="166" cy="173" r="24" />
          <circle cx="234" cy="173" r="24" />
        </>
      ) : (
        <>
          <rect x="136" y="152" width="60" height="42" rx="11" />
          <rect x="204" y="152" width="60" height="42" rx="11" />
        </>
      )}
    </clipPath>
  );
}

export function Glasses({ kind, color, lensId }) {
  if (kind === "aucune") return null;
  const round = kind === "rondes";
  const sun = kind === "soleil";
  const lensFill = sun ? "#16171B" : "#F4F1EA";
  const lensOpacity = sun ? 0.86 : 0.08;

  return (
    <>
      {/* monture + verres */}
      <g fill={lensFill} fillOpacity={lensOpacity} stroke={color} strokeWidth="5">
        {round ? (
          <>
            <circle cx="166" cy="173" r="24" />
            <circle cx="234" cy="173" r="24" />
          </>
        ) : (
          <>
            <rect x="136" y="152" width="60" height="42" rx="11" />
            <rect x="204" y="152" width="60" height="42" rx="11" />
          </>
        )}
      </g>
      {/* pont et branches */}
      <path d={round ? "M190 170 Q200 162 210 170" : "M196 166 Q200 160 204 166"} fill="none" stroke={color} strokeWidth="4.5" strokeLinecap="round" />
      <path d={round ? "M142 168 L130 170 M258 168 L270 170" : "M136 164 L128 168 M264 164 L272 168"} fill="none" stroke={color} strokeWidth="4.5" strokeLinecap="round" />
      {/* éclat qui traverse les verres de temps en temps */}
      <g clipPath={`url(#${lensId})`}>
        <polygon className="av-glint" points="0,150 14,150 -6,196 -20,196" fill="#fff" />
      </g>
      {/* reflet du code dans les verres clairs (disparaît quand elle te regarde) */}
      {!sun && (
        <g className="av-reflect" clipPath={`url(#${lensId})`} fill="#E4F3EA">
          <rect x="146" y="184" width="30" height="2.6" rx="1.3" opacity=".45" />
          <rect x="150" y="189" width="18" height="2.6" rx="1.3" opacity=".4" style={{ animationDelay: ".5s" }} />
          <rect x="214" y="184" width="30" height="2.6" rx="1.3" opacity=".55" style={{ animationDelay: ".25s" }} />
          <rect x="218" y="189" width="18" height="2.6" rx="1.3" opacity=".4" style={{ animationDelay: ".75s" }} />
        </g>
      )}
      {/* petits reflets sur la monture */}
      <g stroke="#fff" strokeOpacity={sun ? 0.28 : 0.4} strokeWidth="3" strokeLinecap="round" fill="none">
        {round ? (
          <>
            <path d="M149 163 Q153 155 161 152" />
            <path d="M217 163 Q221 155 229 152" />
          </>
        ) : (
          <>
            <path d="M148 188 L160 160" /><path d="M156 190 L163 174" />
            <path d="M216 188 L228 160" /><path d="M224 190 L231 174" />
          </>
        )}
      </g>
    </>
  );
}

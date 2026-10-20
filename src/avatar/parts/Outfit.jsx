import { clothTones } from "../color";

// Silhouette d'origine (sweat) : épaules basses.
const BODY_LOW =
  "M50 376 C48 346 68 326 102 316 C126 308 146 304 162 302 L238 302 C254 304 274 308 298 316 C332 326 352 346 350 376 Z";
// T-shirt, chemise, blazer : le col monte plus haut autour du cou.
const BODY_HIGH =
  "M50 376 C48 346 68 326 102 316 C126 308 146 292 164 270 L236 270 C254 292 274 308 298 316 C332 326 352 346 350 376 Z";

const NECK_LOW =
  "M178 238 L222 238 C224 268 232 288 238 302 C234 322 218 332 200 332 C182 332 166 322 162 302 C168 288 176 268 178 238 Z";

const Folds = ({ t }) => (
  <>
    <path d="M86 338 C82 352 84 366 90 376" fill="none" stroke={t.shade} strokeOpacity=".55" strokeWidth="2.4" strokeLinecap="round" />
    <path d="M314 338 C318 352 316 366 310 376" fill="none" stroke={t.shade} strokeOpacity=".55" strokeWidth="2.4" strokeLinecap="round" />
    <path d="M112 318 C108 334 106 352 106 376" fill="none" stroke={t.shade} strokeOpacity=".4" strokeWidth="1.8" strokeLinecap="round" />
    <path d="M288 318 C292 334 294 352 294 376" fill="none" stroke={t.shade} strokeOpacity=".4" strokeWidth="1.8" strokeLinecap="round" />
    <path d="M70 336 C84 326 104 320 124 314" fill="none" stroke="#fff" strokeOpacity=".12" strokeWidth="3" strokeLinecap="round" />
    <path d="M330 336 C316 326 296 320 276 314" fill="none" stroke="#fff" strokeOpacity=".07" strokeWidth="3" strokeLinecap="round" />
  </>
);

const NeckShadow = ({ skin, cy = 262 }) => <ellipse cx="200" cy={cy} rx="27" ry="9" fill={skin.shade} opacity=".3" />;

/** Torse + cou. Tout est dessiné dans le groupe « respiration ». */
export function Torso({ kind, color, skin }) {
  const t = clothTones(color);

  if (kind === "tee") {
    return (
      <>
        <path d={BODY_HIGH} fill={t.base} />
        <Folds t={t} />
        <path d="M178 238 L222 238 C224 252 230 262 236 272 C230 292 216 300 200 300 C184 300 170 292 164 272 C170 262 176 252 178 238 Z" fill={skin.neck} />
        <NeckShadow skin={skin} cy={256} />
        <path d="M163 270 C168 292 184 302 200 302 C216 302 232 292 237 270" fill="none" stroke={t.ring} strokeWidth="8" strokeLinecap="round" />
        <path d="M167 272 C172 290 186 298 200 298 C214 298 228 290 233 272" fill="none" stroke={t.light} strokeOpacity=".5" strokeWidth="1.6" strokeLinecap="round" />
      </>
    );
  }

  if (kind === "chemise") {
    return (
      <>
        <path d={BODY_HIGH} fill={t.base} />
        <Folds t={t} />
        <path d="M200 304 V376" stroke={t.shade} strokeOpacity=".6" strokeWidth="2" />
        <g fill={t.light}>
          <circle cx="200" cy="324" r="2.4" /><circle cx="200" cy="346" r="2.4" /><circle cx="200" cy="366" r="2.4" />
        </g>
        <path d="M178 238 L222 238 C223 252 220 262 214 272 L200 298 L186 272 C180 262 177 252 178 238 Z" fill={skin.neck} />
        <NeckShadow skin={skin} cy={254} />
        {/* col : deux pointes qui se rejoignent au bouton du haut */}
        <g fill={t.collar} stroke={t.shade} strokeOpacity=".45" strokeWidth="1.4" strokeLinejoin="round">
          <path d="M160 268 L176 248 L206 302 L184 310 Z" />
          <path d="M240 268 L224 248 L194 302 L216 310 Z" />
        </g>
      </>
    );
  }

  if (kind === "blazer") {
    return (
      <>
        <path d={BODY_HIGH} fill={t.base} />
        <Folds t={t} />
        {/* chemise blanche dans l'ouverture */}
        <path d="M168 266 L232 266 L200 344 Z" fill="#F3F0E8" />
        <path d="M178 238 L222 238 C224 252 224 262 226 268 L200 304 L174 268 C176 262 176 252 178 238 Z" fill={skin.neck} />
        <NeckShadow skin={skin} cy={254} />
        {/* revers */}
        <g fill={t.ring} stroke={t.light} strokeOpacity=".35" strokeWidth="1.4" strokeLinejoin="round">
          <path d="M150 292 L164 268 L174 268 L200 344 L178 360 L146 322 Z" />
          <path d="M250 292 L236 268 L226 268 L200 344 L222 360 L254 322 Z" />
        </g>
        <circle cx="200" cy="360" r="3.4" fill={t.light} />
      </>
    );
  }

  const WHITE = "#F4F1EA";
  const crewNeck = (c, shade, light, cy = 256) => (
    <>
      <path d="M178 238 L222 238 C224 252 230 262 236 272 C230 292 216 300 200 300 C184 300 170 292 164 272 C170 262 176 252 178 238 Z" fill={skin.neck} />
      <NeckShadow skin={skin} cy={cy} />
      <path d="M163 270 C168 292 184 302 200 302 C216 302 232 292 237 270" fill="none" stroke={shade} strokeWidth="8" strokeLinecap="round" />
      <path d="M167 272 C172 290 186 298 200 298 C214 298 228 290 233 272" fill="none" stroke={light} strokeOpacity=".5" strokeWidth="1.6" strokeLinecap="round" />
    </>
  );

  if (kind === "pull") {
    return (
      <>
        <path d={BODY_HIGH} fill={t.base} />
        <g stroke={t.shade} strokeOpacity=".35" strokeWidth="1.8" strokeLinecap="round">
          {[96, 112, 128, 144, 256, 272, 288, 304].map((x) => <path key={x} d={`M${x} ${x < 200 ? 330 : 330} V376`} />)}
        </g>
        <path d="M54 366 H346" stroke={t.ring} strokeWidth="6" strokeLinecap="round" />
        <Folds t={t} />
        {crewNeck(t.base, t.ring, t.light)}
      </>
    );
  }

  if (kind === "col") {
    return (
      <>
        <path d={BODY_HIGH} fill={t.base} />
        <Folds t={t} />
        <path d="M178 232 L222 232 L224 270 L176 270 Z" fill={skin.neck} />
        <path d="M166 232 C166 252 168 266 164 284 C176 296 224 296 236 284 C232 266 234 252 234 232 Z" fill={t.base} stroke={t.ring} strokeWidth="1.6" strokeLinejoin="round" />
        <g fill="none" stroke={t.shade} strokeOpacity=".5" strokeWidth="2" strokeLinecap="round">
          <path d="M168 244 C186 252 214 252 232 244" /><path d="M166 258 C186 266 214 266 234 258" /><path d="M165 272 C186 281 214 281 235 272" />
        </g>
      </>
    );
  }

  if (kind === "blouse") {
    return (
      <>
        <path d={BODY_HIGH} fill={t.base} />
        <Folds t={t} />
        <path d="M186 296 V376" stroke={t.shade} strokeOpacity=".5" strokeWidth="2" />
        <path d="M112 336 H146 V362 H112 Z" fill="none" stroke={t.shade} strokeOpacity=".5" strokeWidth="2" strokeLinejoin="round" />
        <path d="M178 238 L222 238 C224 252 224 262 226 268 L200 304 L174 268 C176 262 176 252 178 238 Z" fill={skin.neck} />
        <NeckShadow skin={skin} cy={254} />
        <g fill={t.collar} stroke={t.shade} strokeOpacity=".5" strokeWidth="1.6" strokeLinejoin="round">
          <path d="M148 296 L164 262 L178 262 L202 340 L180 352 Z" />
          <path d="M252 296 L236 262 L222 262 L198 340 L220 352 Z" />
        </g>
        <path d="M180 352 L186 376 M220 352 L214 376" stroke={t.shade} strokeOpacity=".4" strokeWidth="1.6" />
      </>
    );
  }

  if (kind === "tablier") {
    return (
      <>
        <path d={BODY_HIGH} fill={WHITE} />
        <Folds t={clothTones("#CFC8B8")} />
        {crewNeck(WHITE, "#D8D1C0", "#FFFFFF")}
        <path d="M172 300 L160 268 M228 300 L240 268" stroke={t.base} strokeWidth="7" strokeLinecap="round" />
        <path d="M168 300 H232 L242 376 H158 Z" fill={t.base} stroke={t.ring} strokeWidth="1.6" strokeLinejoin="round" />
        <path d="M178 336 H222 V362 H178 Z" fill="none" stroke={t.ring} strokeOpacity=".7" strokeWidth="2" strokeLinejoin="round" />
      </>
    );
  }

  if (kind === "uniforme") {
    return (
      <>
        <path d={BODY_HIGH} fill={WHITE} />
        <Folds t={clothTones("#CFC8B8")} />
        <path d="M150 300 L176 266 L200 330 L224 266 L250 300 L262 376 H138 Z" fill={t.base} stroke={t.ring} strokeWidth="1.6" strokeLinejoin="round" />
        <path d="M178 238 L222 238 C223 252 220 262 214 272 L200 296 L186 272 C180 262 177 252 178 238 Z" fill={skin.neck} />
        <NeckShadow skin={skin} cy={254} />
        <g fill={WHITE} stroke="#CFC8B8" strokeWidth="1.4" strokeLinejoin="round">
          <path d="M160 268 L176 248 L204 300 L184 308 Z" />
          <path d="M240 268 L224 248 L196 300 L216 308 Z" />
        </g>
        <path d="M184 346 H216 M184 358 H216" stroke={t.ring} strokeOpacity=".5" strokeWidth="2" strokeLinecap="round" />
      </>
    );
  }

  if (kind === "salopette") {
    return (
      <>
        <path d={BODY_HIGH} fill={WHITE} />
        <Folds t={clothTones("#CFC8B8")} />
        {crewNeck(WHITE, "#D8D1C0", "#FFFFFF")}
        <path d="M172 306 L158 270 M228 306 L242 270" stroke={t.base} strokeWidth="9" strokeLinecap="round" />
        <path d="M166 304 H234 L246 376 H154 Z" fill={t.base} stroke={t.ring} strokeWidth="1.6" strokeLinejoin="round" />
        <rect x="180" y="326" width="40" height="26" rx="4" fill="none" stroke={t.ring} strokeOpacity=".7" strokeWidth="2" />
        <circle cx="172" cy="308" r="4.4" fill="#D9B26A" stroke="#B58F46" strokeWidth="1" /><circle cx="228" cy="308" r="4.4" fill="#D9B26A" stroke="#B58F46" strokeWidth="1" />
      </>
    );
  }

  // Sweat à capuche (origine)
  return (
    <>
      <path d={BODY_LOW} fill={t.base} />
      <Folds t={t} />
      {/* capuche posée autour du cou */}
      <path d="M134 304 C130 268 164 250 200 250 C236 250 270 268 266 304 C260 336 232 348 200 348 C168 348 140 336 134 304 Z" fill={t.ring} />
      <path d={NECK_LOW} fill={skin.neck} />
      <NeckShadow skin={skin} />
      {/* bord avant de la capuche */}
      <path d="M160 300 C164 322 182 333 200 333 C218 333 236 322 240 300" fill="none" stroke={t.ring} strokeWidth="9" strokeLinecap="round" />
      <path d="M164 303 C168 320 184 328 200 328 C216 328 232 320 236 303" fill="none" stroke={t.light} strokeOpacity=".7" strokeWidth="2.2" strokeLinecap="round" />
      {/* cordons */}
      <path d="M189 332 C187 337 188 340 187 344" fill="none" stroke="#F1ECE0" strokeWidth="2.8" strokeLinecap="round" />
      <path d="M211 332 C213 337 212 340 213 344" fill="none" stroke="#F1ECE0" strokeWidth="2.8" strokeLinecap="round" />
    </>
  );
}

/** Manche du bras qui salue. `under` passe derrière la main, `over` devant (poignets). */
export function Sleeve({ kind, color, skin }) {
  const t = clothTones(color);

  if (kind === "tee") {
    return {
      under: (
        <>
          <path d="M326 262 L354 262 L358 346 L322 346 Z" fill={skin.face} />
          <path d="M318 330 L362 330 L366 392 L314 392 Z" fill={t.base} />
          <path d="M318 330 L362 330" stroke={t.ring} strokeWidth="5" strokeLinecap="round" />
        </>
      ),
      over: null,
    };
  }

  if (kind === "chemise") {
    return {
      under: <path d="M326 268 L354 268 L360 392 L320 392 Z" fill={t.base} />,
      over: (
        <>
          <rect x="323" y="262" width="34" height="14" rx="4" fill={t.collar} stroke={t.shade} strokeOpacity=".45" strokeWidth="1.2" />
          <circle cx="350" cy="269" r="1.8" fill={t.shade} fillOpacity=".7" />
        </>
      ),
    };
  }

  if (kind === "blazer") {
    return {
      under: (
        <>
          <path d="M326 268 L354 268 L360 392 L320 392 Z" fill={t.base} />
          <path d="M326 268 L334 268 L336 392 L320 392 Z" fill={t.shade} opacity=".35" />
        </>
      ),
      over: (
        <>
          <rect x="324" y="262" width="32" height="8" rx="2.5" fill="#F3F0E8" />
          <rect x="322" y="270" width="36" height="12" rx="4" fill={t.ring} />
          <circle cx="332" cy="276" r="1.8" fill={t.light} />
          <circle cx="348" cy="276" r="1.8" fill={t.light} />
        </>
      ),
    };
  }

  const ribCuff = (
    <>
      <rect x="323" y="262" width="34" height="15" rx="5" fill={t.shade} />
      <path d="M329 264 V275 M335 264 V275 M341 264 V275 M347 264 V275 M353 264 V275" stroke={t.deep} strokeWidth="1.4" strokeLinecap="round" />
    </>
  );
  const longSleeve = (c) => (
    <>
      <path d="M326 268 L354 268 L360 392 L320 392 Z" fill={c} />
      <path d="M326 268 L334 268 L336 392 L320 392 Z" fill="#000" opacity=".12" />
    </>
  );

  if (kind === "pull" || kind === "col") return { under: longSleeve(t.base), over: ribCuff };
  if (kind === "blouse") {
    return {
      under: longSleeve(t.base),
      over: <rect x="322" y="262" width="36" height="13" rx="4" fill={t.collar} stroke={t.shade} strokeOpacity=".5" strokeWidth="1.2" />,
    };
  }
  if (kind === "uniforme") {
    return {
      under: longSleeve("#F4F1EA"),
      over: <rect x="323" y="262" width="34" height="13" rx="4" fill="#F4F1EA" stroke="#CFC8B8" strokeWidth="1.2" />,
    };
  }
  if (kind === "tablier" || kind === "salopette") {
    return {
      under: (
        <>
          <path d="M326 262 L354 262 L358 346 L322 346 Z" fill={skin.face} />
          <path d="M318 330 L362 330 L366 392 L314 392 Z" fill="#F4F1EA" />
          <path d="M318 330 L362 330" stroke="#D8D1C0" strokeWidth="5" strokeLinecap="round" />
        </>
      ),
      over: null,
    };
  }

  // Sweat à capuche (origine) : manche + poignet côtelé
  return {
    under: (
      <>
        <path d="M326 268 L354 268 L360 392 L320 392 Z" fill={t.base} />
        <path d="M326 268 L334 268 L336 392 L320 392 Z" fill={t.shade} opacity=".35" />
      </>
    ),
    over: (
      <>
        <rect x="323" y="262" width="34" height="15" rx="5" fill={t.shade} />
        <path d="M329 264 V275 M335 264 V275 M341 264 V275 M347 264 V275 M353 264 V275" stroke={t.deep} strokeWidth="1.4" strokeLinecap="round" />
      </>
    ),
  };
}

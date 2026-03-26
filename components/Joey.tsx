type Mood = "happy" | "excited" | "sad";

export function Joey({ mood = "happy", size = 180 }: { mood?: Mood; size?: number }) {
  const h = size * 1.25;
  const id = `joey-${size}`; // unique gradient ids per instance size

  return (
    <svg width={size} height={h} viewBox="0 0 200 250" xmlns="http://www.w3.org/2000/svg">
      <defs>
        {/* Body gradient */}
        <radialGradient id={`${id}-body`} cx="42%" cy="35%" r="60%">
          <stop offset="0%"   stopColor="#F0A355"/>
          <stop offset="100%" stopColor="#C26A20"/>
        </radialGradient>
        {/* Belly gradient */}
        <radialGradient id={`${id}-belly`} cx="50%" cy="40%" r="60%">
          <stop offset="0%"   stopColor="#FDE8CB"/>
          <stop offset="100%" stopColor="#F0C080"/>
        </radialGradient>
        {/* Ear inner */}
        <radialGradient id={`${id}-ear`} cx="50%" cy="50%" r="60%">
          <stop offset="0%"   stopColor="#FFD4A8"/>
          <stop offset="100%" stopColor="#E8956A"/>
        </radialGradient>
        {/* Eye gradient */}
        <radialGradient id={`${id}-eye`} cx="35%" cy="30%" r="65%">
          <stop offset="0%"   stopColor="#4A2800"/>
          <stop offset="100%" stopColor="#1A0800"/>
        </radialGradient>
        {/* Nose gradient */}
        <radialGradient id={`${id}-nose`} cx="40%" cy="35%" r="65%">
          <stop offset="0%"   stopColor="#C0623A"/>
          <stop offset="100%" stopColor="#8B3A20"/>
        </radialGradient>
        {/* Cheek */}
        <radialGradient id={`${id}-cheek`} cx="50%" cy="50%" r="50%">
          <stop offset="0%"   stopColor="#FF9999" stopOpacity="0.7"/>
          <stop offset="100%" stopColor="#FF6666" stopOpacity="0"/>
        </radialGradient>
        {/* Shadow */}
        <filter id={`${id}-shadow`} x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="3" stdDeviation="4" floodColor="#00000030"/>
        </filter>
      </defs>

      {/* ── TAIL ───────────────────────────────────────────────────── */}
      {/* Tail base (thick) */}
      <path d="M 128 185 C 162 175 172 148 165 122 C 160 104 146 100 136 110"
        stroke={`url(#${id}-body)`} strokeWidth="18" fill="none"
        strokeLinecap="round" strokeLinejoin="round"/>
      {/* Tail highlight */}
      <path d="M 128 185 C 160 176 168 150 162 126 C 158 110 148 106 140 114"
        stroke="#F0A355" strokeWidth="7" fill="none"
        strokeLinecap="round" strokeOpacity="0.5"/>

      {/* ── BODY ───────────────────────────────────────────────────── */}
      <path d="M 48 118 C 34 132 34 172 52 192 C 64 204 96 210 118 202
               C 140 194 148 174 146 158 C 144 140 138 118 128 108
               C 118 98 100 94 84 96 C 68 98 56 108 48 118 Z"
        fill={`url(#${id}-body)`} filter={`url(#${id}-shadow)`}/>

      {/* ── BELLY / POUCH AREA ─────────────────────────────────────── */}
      <path d="M 62 128 C 56 144 58 172 70 186 C 80 196 102 198 114 190
               C 124 182 126 164 122 148 C 118 132 108 120 96 118
               C 84 116 68 118 62 128 Z"
        fill={`url(#${id}-belly)`}/>

      {/* Pouch pocket */}
      <path d="M 72 160 C 72 178 92 186 108 178 C 116 174 120 164 118 156"
        fill="none" stroke="#D4884A" strokeWidth="2.5" strokeLinecap="round"/>
      <path d="M 72 160 C 74 156 80 154 88 156 C 96 158 106 158 112 154"
        fill="#EAB87A" opacity="0.35"/>

      {/* ── LEFT ARM ───────────────────────────────────────────────── */}
      <path d="M 54 122 C 40 120 30 130 32 144 C 34 154 44 160 50 154
               C 58 146 60 132 54 122 Z"
        fill={`url(#${id}-body)`}/>
      {/* Left hand */}
      <circle cx="36" cy="148" r="7" fill="#E09050"/>

      {/* ── RIGHT ARM ──────────────────────────────────────────────── */}
      <path d="M 136 118 C 150 114 162 122 162 136 C 162 146 154 154 148 150
               C 140 144 136 130 136 118 Z"
        fill={`url(#${id}-body)`}/>
      {/* Right hand */}
      <circle cx="160" cy="140" r="7" fill="#E09050"/>

      {/* ── LEFT LEG ───────────────────────────────────────────────── */}
      <path d="M 60 188 C 54 196 50 210 56 222 C 60 230 74 232 80 224
               C 84 218 82 206 76 198 C 72 192 66 188 60 188 Z"
        fill={`url(#${id}-body)`}/>
      {/* Left foot */}
      <path d="M 48 226 C 48 232 64 236 76 232 C 84 228 84 220 76 218
               C 68 220 52 218 48 226 Z"
        fill="#C06828"/>

      {/* ── RIGHT LEG ──────────────────────────────────────────────── */}
      <path d="M 120 188 C 118 196 118 210 124 222 C 128 230 142 232 148 222
               C 152 214 150 200 144 192 C 138 184 124 184 120 188 Z"
        fill={`url(#${id}-body)`}/>
      {/* Right foot */}
      <path d="M 116 224 C 116 232 132 236 144 232 C 152 228 154 220 144 218
               C 136 220 118 218 116 224 Z"
        fill="#C06828"/>

      {/* ── HEAD ───────────────────────────────────────────────────── */}
      {/* Head shadow/base */}
      <ellipse cx="100" cy="76" rx="44" ry="42" fill="#C87030" opacity="0.3"/>
      {/* Main head */}
      <path d="M 58 76 C 58 50 68 34 100 34 C 132 34 142 50 142 76
               C 142 102 124 112 100 114 C 76 112 58 102 58 76 Z"
        fill={`url(#${id}-body)`} filter={`url(#${id}-shadow)`}/>

      {/* ── EARS ───────────────────────────────────────────────────── */}
      {/* Left ear outer */}
      <path d="M 66 54 C 60 36 56 18 62 8 C 66 2 74 2 78 10 C 82 20 80 40 74 54 Z"
        fill={`url(#${id}-body)`}/>
      {/* Left ear inner */}
      <path d="M 68 50 C 64 36 62 22 66 14 C 68 10 73 10 75 16 C 77 24 76 40 72 50 Z"
        fill={`url(#${id}-ear)`}/>
      {/* Right ear outer */}
      <path d="M 134 54 C 140 36 144 18 138 8 C 134 2 126 2 122 10 C 118 20 120 40 126 54 Z"
        fill={`url(#${id}-body)`}/>
      {/* Right ear inner */}
      <path d="M 132 50 C 136 36 138 22 134 14 C 132 10 127 10 125 16 C 123 24 124 40 128 50 Z"
        fill={`url(#${id}-ear)`}/>

      {/* ── FACE ───────────────────────────────────────────────────── */}
      {/* Muzzle */}
      <ellipse cx="100" cy="90" rx="18" ry="13" fill={`url(#${id}-belly)`}/>

      {/* Nose */}
      <path d="M 92 84 C 92 80 108 80 108 84 C 108 88 104 90 100 90 C 96 90 92 88 92 84 Z"
        fill={`url(#${id}-nose)`}/>
      {/* Nose shine */}
      <circle cx="95" cy="83" r="2" fill="white" opacity="0.6"/>

      {/* ── EYES ───────────────────────────────────────────────────── */}
      {mood === "sad" ? (
        <>
          {/* Sad eyes — oval, droopy */}
          <ellipse cx="80" cy="70" rx="9" ry="8" fill="white"/>
          <ellipse cx="120" cy="70" rx="9" ry="8" fill="white"/>
          <circle cx="80" cy="72" r="5.5" fill={`url(#${id}-eye)`}/>
          <circle cx="120" cy="72" r="5.5" fill={`url(#${id}-eye)`}/>
          <circle cx="78" cy="70" r="2" fill="white" opacity="0.8"/>
          <circle cx="118" cy="70" r="2" fill="white" opacity="0.8"/>
          {/* Sad eyebrows — angled down center */}
          <path d="M72 61 Q80 58 88 62" stroke="#9B5520" strokeWidth="2.5" fill="none" strokeLinecap="round"/>
          <path d="M112 62 Q120 58 128 61" stroke="#9B5520" strokeWidth="2.5" fill="none" strokeLinecap="round"/>
          {/* Tear */}
          <ellipse cx="74" cy="78" rx="2" ry="3" fill="#88CCFF" opacity="0.7"/>
        </>
      ) : (
        <>
          {/* Happy/Excited eyes — big, round, shiny */}
          <circle cx="80" cy="70" r="10" fill="white" filter={`url(#${id}-shadow)`}/>
          <circle cx="120" cy="70" r="10" fill="white" filter={`url(#${id}-shadow)`}/>
          {/* Iris */}
          <circle cx="81" cy="71" r="6.5" fill={`url(#${id}-eye)`}/>
          <circle cx="121" cy="71" r="6.5" fill={`url(#${id}-eye)`}/>
          {/* Pupil highlight large */}
          <circle cx="78" cy="68" r="2.8" fill="white"/>
          <circle cx="118" cy="68" r="2.8" fill="white"/>
          {/* Pupil highlight small */}
          <circle cx="84" cy="74" r="1.2" fill="white" opacity="0.6"/>
          <circle cx="124" cy="74" r="1.2" fill="white" opacity="0.6"/>
          {/* Excited eyebrows — arched up */}
          {mood === "excited" && (
            <>
              <path d="M71 58 Q80 53 89 58" stroke="#C06828" strokeWidth="3" fill="none" strokeLinecap="round"/>
              <path d="M111 58 Q120 53 129 58" stroke="#C06828" strokeWidth="3" fill="none" strokeLinecap="round"/>
              {/* Extra sparkle */}
              <circle cx="140" cy="50" r="3" fill="#FFD700"/>
              <circle cx="145" cy="44" r="2" fill="#FFD700" opacity="0.6"/>
              <circle cx="152" cy="50" r="2.5" fill="#FFD700" opacity="0.8"/>
            </>
          )}
          {/* Normal eyebrows */}
          {mood === "happy" && (
            <>
              <path d="M71 60 Q80 56 89 60" stroke="#C06828" strokeWidth="2.5" fill="none" strokeLinecap="round"/>
              <path d="M111 60 Q120 56 129 60" stroke="#C06828" strokeWidth="2.5" fill="none" strokeLinecap="round"/>
            </>
          )}
        </>
      )}

      {/* Cheeks */}
      <circle cx="65" cy="82" r="12" fill={`url(#${id}-cheek)`}/>
      <circle cx="135" cy="82" r="12" fill={`url(#${id}-cheek)`}/>

      {/* Mouth */}
      {mood === "sad" ? (
        <path d="M 90 98 C 90 94 110 94 110 98"
          stroke="#9B5520" strokeWidth="2.5" fill="none" strokeLinecap="round"/>
      ) : mood === "excited" ? (
        /* Big open smile */
        <>
          <path d="M 88 96 C 90 106 110 106 112 96"
            stroke="#9B5520" strokeWidth="2.5" fill="none" strokeLinecap="round"/>
          <path d="M 90 97 C 92 104 108 104 110 97"
            fill="#FF8866" opacity="0.4"/>
          {/* Teeth */}
          <path d="M 92 100 L 92 104 M 100 101 L 100 105 M 108 100 L 108 104"
            stroke="white" strokeWidth="2" strokeLinecap="round" opacity="0.7"/>
        </>
      ) : (
        /* Normal smile */
        <path d="M 88 96 C 90 104 110 104 112 96"
          stroke="#9B5520" strokeWidth="2.5" fill="none" strokeLinecap="round"/>
      )}

      {/* ── DECORATIONS BY MOOD ────────────────────────────────────── */}
      {mood === "excited" && (
        <>
          {/* Stars */}
          <text x="20"  y="55" fontSize="18" opacity="0.9">⭐</text>
          <text x="160" y="45" fontSize="14" opacity="0.8">✨</text>
          <text x="155" y="70" fontSize="12" opacity="0.6">🌟</text>
        </>
      )}
    </svg>
  );
}

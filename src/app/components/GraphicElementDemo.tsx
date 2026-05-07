interface GraphicElementDemoProps {
  conceptName: string;
  gradient: string;
  palette: Array<{ color: string; name: string }>;
}

export function GraphicElementDemo({ conceptName, gradient, palette }: GraphicElementDemoProps) {
  if (conceptName === "Atlantic Waves") {
    return (
      <div className="grid grid-cols-2 gap-4">
        {/* Vagues Fluides */}
        <div className="aspect-square bg-neutral-900 rounded-xl p-4 overflow-hidden relative">
          <svg viewBox="0 0 200 200" className="w-full h-full">
            <path
              d="M0,100 Q25,80 50,100 T100,100 T150,100 T200,100 L200,200 L0,200 Z"
              fill={palette[1].color}
              opacity="0.8"
            />
            <path
              d="M0,120 Q25,100 50,120 T100,120 T150,120 T200,120 L200,200 L0,200 Z"
              fill={palette[2].color}
              opacity="0.6"
            />
            <path
              d="M0,140 Q25,120 50,140 T100,140 T150,140 T200,140 L200,200 L0,200 Z"
              fill={palette[0].color}
              opacity="0.4"
            />
          </svg>
          <p className="absolute bottom-2 left-2 text-xs text-neutral-400">Vagues Fluides</p>
        </div>

        {/* Cercles Concentriques */}
        <div className="aspect-square bg-neutral-900 rounded-xl p-4 overflow-hidden relative">
          <svg viewBox="0 0 200 200" className="w-full h-full">
            <circle cx="100" cy="100" r="80" fill="none" stroke={palette[2].color} strokeWidth="2" opacity="0.3" />
            <circle cx="100" cy="100" r="60" fill="none" stroke={palette[1].color} strokeWidth="2" opacity="0.5" />
            <circle cx="100" cy="100" r="40" fill="none" stroke={palette[0].color} strokeWidth="2" opacity="0.7" />
            <circle cx="100" cy="100" r="20" fill={palette[3].color} opacity="0.9" />
          </svg>
          <p className="absolute bottom-2 left-2 text-xs text-neutral-400">Cercles Concentriques</p>
        </div>

        {/* Dégradé Animé */}
        <div className="aspect-square bg-neutral-900 rounded-xl p-4 overflow-hidden relative">
          <div className="w-full h-full rounded-lg" style={{ background: gradient }} />
          <p className="absolute bottom-2 left-2 text-xs text-white">Dégradé Animé</p>
        </div>

        {/* Lignes Horizontales */}
        <div className="aspect-square bg-neutral-900 rounded-xl p-4 overflow-hidden relative">
          <svg viewBox="0 0 200 200" className="w-full h-full">
            <line x1="0" y1="40" x2="200" y2="40" stroke={palette[0].color} strokeWidth="3" opacity="0.8" />
            <line x1="0" y1="80" x2="200" y2="80" stroke={palette[1].color} strokeWidth="3" opacity="0.6" />
            <line x1="0" y1="120" x2="200" y2="120" stroke={palette[2].color} strokeWidth="3" opacity="0.4" />
            <line x1="0" y1="160" x2="200" y2="160" stroke={palette[3].color} strokeWidth="3" opacity="0.2" />
          </svg>
          <p className="absolute bottom-2 left-2 text-xs text-neutral-400">Lignes Horizontales</p>
        </div>
      </div>
    );
  }

  if (conceptName === "Sunset Session") {
    return (
      <div className="grid grid-cols-2 gap-4">
        {/* Rayons Solaires */}
        <div className="aspect-square bg-neutral-900 rounded-xl p-4 overflow-hidden relative">
          <svg viewBox="0 0 200 200" className="w-full h-full">
            {[...Array(12)].map((_, i) => {
              const angle = (i * 30 * Math.PI) / 180;
              const x2 = 100 + Math.cos(angle) * 90;
              const y2 = 100 + Math.sin(angle) * 90;
              return (
                <line
                  key={i}
                  x1="100"
                  y1="100"
                  x2={x2}
                  y2={y2}
                  stroke={palette[2 + (i % 3)].color}
                  strokeWidth="2"
                  opacity="0.6"
                />
              );
            })}
            <circle cx="100" cy="100" r="20" fill={palette[3].color} />
          </svg>
          <p className="absolute bottom-2 left-2 text-xs text-neutral-400">Rayons Solaires</p>
        </div>

        {/* Halos Lumineux */}
        <div className="aspect-square bg-neutral-900 rounded-xl p-4 overflow-hidden relative">
          <svg viewBox="0 0 200 200" className="w-full h-full">
            <circle cx="100" cy="100" r="70" fill={palette[2].color} opacity="0.1" />
            <circle cx="100" cy="100" r="50" fill={palette[3].color} opacity="0.2" />
            <circle cx="100" cy="100" r="30" fill={palette[4].color} opacity="0.4" />
          </svg>
          <p className="absolute bottom-2 left-2 text-xs text-neutral-400">Halos Lumineux</p>
        </div>

        {/* Grain Rétro */}
        <div className="aspect-square bg-neutral-900 rounded-xl p-4 overflow-hidden relative">
          <div
            className="w-full h-full rounded-lg"
            style={{
              background: gradient,
              backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 400 400\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noiseFilter\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\' /%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noiseFilter)\' opacity=\'0.3\'/%3E%3C/svg%3E")',
            }}
          />
          <p className="absolute bottom-2 left-2 text-xs text-white">Grain Rétro</p>
        </div>

        {/* Formes Arrondies */}
        <div className="aspect-square bg-neutral-900 rounded-xl p-4 overflow-hidden relative">
          <svg viewBox="0 0 200 200" className="w-full h-full">
            <circle cx="60" cy="60" r="30" fill={palette[2].color} opacity="0.6" />
            <circle cx="140" cy="80" r="40" fill={palette[3].color} opacity="0.5" />
            <circle cx="100" cy="140" r="35" fill={palette[4].color} opacity="0.7" />
          </svg>
          <p className="absolute bottom-2 left-2 text-xs text-neutral-400">Formes Arrondies</p>
        </div>
      </div>
    );
  }

  if (conceptName === "Breizh Nights") {
    return (
      <div className="grid grid-cols-2 gap-4">
        {/* Glitch Effects */}
        <div className="aspect-square bg-neutral-900 rounded-xl p-4 overflow-hidden relative">
          <div className="w-full h-full flex items-center justify-center">
            <div className="text-4xl font-black relative">
              <span className="absolute text-red-500 opacity-70" style={{ transform: 'translate(-2px, 0)' }}>FEST</span>
              <span className="absolute text-blue-500 opacity-70" style={{ transform: 'translate(2px, 0)' }}>FEST</span>
              <span className="relative text-white">FEST</span>
            </div>
          </div>
          <p className="absolute bottom-2 left-2 text-xs text-neutral-400">Glitch Effects</p>
        </div>

        {/* Éclairs Néon */}
        <div className="aspect-square bg-neutral-900 rounded-xl p-4 overflow-hidden relative">
          <svg viewBox="0 0 200 200" className="w-full h-full">
            <path d="M100,20 L80,100 L120,100 L100,180" stroke={palette[3].color} strokeWidth="4" fill="none" opacity="0.8" />
            <path d="M100,20 L80,100 L120,100 L100,180" stroke={palette[3].color} strokeWidth="8" fill="none" opacity="0.3" filter="blur(4px)" />
            <path d="M140,40 L130,90 L150,90 L140,140" stroke={palette[4].color} strokeWidth="3" fill="none" opacity="0.6" />
          </svg>
          <p className="absolute bottom-2 left-2 text-xs text-neutral-400">Éclairs Néon</p>
        </div>

        {/* Grilles Cyberpunk */}
        <div className="aspect-square bg-neutral-900 rounded-xl p-4 overflow-hidden relative">
          <svg viewBox="0 0 200 200" className="w-full h-full">
            {[...Array(10)].map((_, i) => (
              <line
                key={`h-${i}`}
                x1="0"
                y1={i * 20}
                x2="200"
                y2={i * 20}
                stroke={palette[2].color}
                strokeWidth="1"
                opacity="0.3"
              />
            ))}
            {[...Array(10)].map((_, i) => (
              <line
                key={`v-${i}`}
                x1={i * 20}
                y1="0"
                x2={i * 20}
                y2="200"
                stroke={palette[2].color}
                strokeWidth="1"
                opacity="0.3"
              />
            ))}
          </svg>
          <p className="absolute bottom-2 left-2 text-xs text-neutral-400">Grilles Cyberpunk</p>
        </div>

        {/* Halos Flous */}
        <div className="aspect-square bg-neutral-900 rounded-xl p-4 overflow-hidden relative">
          <svg viewBox="0 0 200 200" className="w-full h-full">
            <circle cx="80" cy="80" r="40" fill={palette[2].color} opacity="0.4" filter="blur(20px)" />
            <circle cx="120" cy="120" r="50" fill={palette[3].color} opacity="0.3" filter="blur(25px)" />
          </svg>
          <p className="absolute bottom-2 left-2 text-xs text-neutral-400">Halos Flous</p>
        </div>
      </div>
    );
  }

  if (conceptName === "Coastal Beats") {
    return (
      <div className="grid grid-cols-2 gap-4">
        {/* Formes Organiques */}
        <div className="aspect-square bg-neutral-900 rounded-xl p-4 overflow-hidden relative">
          <svg viewBox="0 0 200 200" className="w-full h-full">
            <path
              d="M50,100 Q70,60 100,80 T140,100 Q160,120 140,140 T80,140 Q60,120 50,100"
              fill={palette[1].color}
              opacity="0.6"
            />
            <path
              d="M120,50 Q140,30 160,50 T180,90 Q170,110 150,100 T120,50"
              fill={palette[3].color}
              opacity="0.5"
            />
          </svg>
          <p className="absolute bottom-2 left-2 text-xs text-neutral-400">Formes Organiques</p>
        </div>

        {/* Textures Granuleuses */}
        <div className="aspect-square bg-neutral-900 rounded-xl p-4 overflow-hidden relative">
          <div
            className="w-full h-full rounded-lg"
            style={{
              backgroundColor: palette[2].color,
              backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 200 200\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noiseFilter\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.65\' numOctaves=\'3\' /%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noiseFilter)\' opacity=\'0.5\'/%3E%3C/svg%3E")',
            }}
          />
          <p className="absolute bottom-2 left-2 text-xs text-neutral-900">Textures Granuleuses</p>
        </div>

        {/* Lignes Ondulées Douces */}
        <div className="aspect-square bg-neutral-900 rounded-xl p-4 overflow-hidden relative">
          <svg viewBox="0 0 200 200" className="w-full h-full">
            <path
              d="M0,60 Q50,50 100,60 T200,60"
              stroke={palette[0].color}
              strokeWidth="3"
              fill="none"
              opacity="0.7"
            />
            <path
              d="M0,100 Q50,90 100,100 T200,100"
              stroke={palette[1].color}
              strokeWidth="3"
              fill="none"
              opacity="0.6"
            />
            <path
              d="M0,140 Q50,130 100,140 T200,140"
              stroke={palette[3].color}
              strokeWidth="3"
              fill="none"
              opacity="0.5"
            />
          </svg>
          <p className="absolute bottom-2 left-2 text-xs text-neutral-400">Lignes Ondulées</p>
        </div>

        {/* Motifs Végétaux */}
        <div className="aspect-square bg-neutral-900 rounded-xl p-4 overflow-hidden relative flex items-end justify-center">
          <svg viewBox="0 0 200 100" className="w-full h-3/4">
            {[30, 60, 90, 120, 150].map((x, i) => (
              <g key={i}>
                <line
                  x1={x}
                  y1="100"
                  x2={x}
                  y2={70 - i * 5}
                  stroke={palette[1].color}
                  strokeWidth="2"
                  opacity="0.6"
                />
                <ellipse
                  cx={x}
                  cy={65 - i * 5}
                  rx="8"
                  ry="15"
                  fill={palette[1].color}
                  opacity="0.4"
                />
              </g>
            ))}
          </svg>
          <p className="absolute bottom-2 left-2 text-xs text-neutral-400">Motifs Végétaux</p>
        </div>
      </div>
    );
  }

  return null;
}

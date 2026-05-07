import { useEffect, useState } from 'react'
import { createClient } from '@supabase/supabase-js'

const sb = createClient(
  'https://swsdacpfnuyhbhkbopmp.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InN3c2RhY3BmbnV5aGJoa2JvcG1wIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzgxNTE0ODMsImV4cCI6MjA5MzcyNzQ4M30.KQD735o1cmdJdzgGLu2gV8coRc41IlfEYsMdhGFQrfE'
)

type Trajet = {
  id: number
  nom: string
  prenom: string
  instagram: string
  telephone: string
  depart_date: string
  depart_heure: string
  depart_lieu: string
  arrivee_date: string
  arrivee_heure: string
  arrivee_lieu: string
  places_dispo: number
}

type Passager = {
  id: number
  trajet_id: number
  nom: string
  prenom: string
  instagram: string
  telephone: string
}

export default function Covoiturage() {
  const [tab, setTab] = useState<'liste' | 'proposer'>('liste')
  const [trajets, setTrajets] = useState<Trajet[]>([])
  const [passagers, setPassagers] = useState<Passager[]>([])
  const [loading, setLoading] = useState(true)
  const [modal, setModal] = useState<{ open: boolean; trajetId: number | null; info: string }>({ open: false, trajetId: null, info: '' })
  const [toast, setToast] = useState<{ msg: string; type: string } | null>(null)

  // Form conducteur
  const [cNom, setCNom] = useState('')
  const [cPrenom, setCPrenom] = useState('')
  const [cInstagram, setCInstagram] = useState('')
  const [cTel, setCTel] = useState('')
  const [cDepDate, setCDepDate] = useState('')
  const [cDepHeure, setCDepHeure] = useState('')
  const [cDepLieu, setCDepLieu] = useState('')
  const [cArrDate, setCArrDate] = useState('')
  const [cArrHeure, setCArrHeure] = useState('')
  const [cArrLieu, setCArrLieu] = useState('')
  const [cPlaces, setCPlaces] = useState('')

  // Form passager
  const [pNom, setPNom] = useState('')
  const [pPrenom, setPPrenom] = useState('')
  const [pInstagram, setPInstagram] = useState('')
  const [pTel, setPTel] = useState('')

  const showToast = (msg: string, type = 'success') => {
    setToast({ msg, type })
    setTimeout(() => setToast(null), 4000)
  }

  const loadData = async () => {
    setLoading(true)
    const { data: t } = await sb.from('Covoiturage_conducteur').select('*').order('depart_date', { ascending: true })
    const { data: p } = await sb.from('Covoiturage_passagers').select('*')
    setTrajets(t || [])
    setPassagers(p || [])
    setLoading(false)
  }

  useEffect(() => { loadData() }, [])

  const formatDate = (d: string) => {
    if (!d) return '—'
    const [y, m, day] = d.split('-')
    return `${day}/${m}/${y}`
  }

  const proposerTrajet = async () => {
    if (!cNom || !cPrenom || !cInstagram || !cTel || !cDepDate || !cDepHeure || !cDepLieu || !cArrDate || !cArrHeure || !cArrLieu || !cPlaces) {
      showToast('Tous les champs sont obligatoires', 'error'); return
    }
    const { error } = await sb.from('Covoiturage_conducteur').insert([{
      nom: cNom, prenom: cPrenom, instagram: cInstagram, telephone: cTel,
      depart_date: cDepDate, depart_heure: cDepHeure, depart_lieu: cDepLieu,
      arrivee_date: cArrDate, arrivee_heure: cArrHeure, arrivee_lieu: cArrLieu,
      places_dispo: parseInt(cPlaces)
    }])
    if (error) { showToast('Erreur : ' + error.message, 'error'); return }
    showToast('Trajet proposé ! 🌊')
    setCNom(''); setCPrenom(''); setCInstagram(''); setCTel('')
    setCDepDate(''); setCDepHeure(''); setCDepLieu('')
    setCArrDate(''); setCArrHeure(''); setCArrLieu(''); setCPlaces('')
    setTab('liste'); loadData()
  }

  const sInscrire = async () => {
    if (!pNom || !pPrenom || !pInstagram || !pTel) {
      showToast('Tous les champs sont obligatoires', 'error'); return
    }
    const { error } = await sb.from('Covoiturage_passagers').insert([{
      trajet_id: modal.trajetId, nom: pNom, prenom: pPrenom,
      instagram: pInstagram, telephone: pTel
    }])
    if (error) { showToast('Erreur : ' + error.message, 'error'); return }
    showToast('Inscription confirmée ! 🚗')
    setModal({ open: false, trajetId: null, info: '' })
    setPNom(''); setPPrenom(''); setPInstagram(''); setPTel('')
    loadData()
  }

  const s: Record<string, React.CSSProperties> = {
    wrap: { fontFamily: "'Jost', sans-serif", background: '#071824', minHeight: '100vh', color: '#E0F4F8', paddingBottom: 60 },
    stripes: { display: 'flex', height: 5 },
    header: { padding: '28px 48px 0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' },
    logo: { fontFamily: 'serif', fontSize: 13, fontWeight: 700, letterSpacing: 6, color: '#00C8D8', textTransform: 'uppercase' as const },
    hero: { padding: '48px 48px 0' },
    heroLabel: { fontSize: 11, letterSpacing: 5, color: '#007A8A', fontWeight: 500, display: 'block', marginBottom: 12 },
    heroTitle: { fontFamily: 'serif', fontSize: 56, fontWeight: 700, lineHeight: 1, marginBottom: 6 },
    heroSub: { fontFamily: 'serif', fontSize: 18, fontStyle: 'italic', color: '#4A8898', marginBottom: 32 },
    tabs: { display: 'flex', padding: '24px 48px 0', borderBottom: '1px solid #1A3A4A' },
    tab: (active: boolean, rose = false) => ({
      padding: '10px 24px 12px', fontSize: 11, letterSpacing: 4, fontWeight: 500,
      color: active ? (rose ? '#FF4D8F' : '#00C8D8') : '#4A8898',
      background: 'none', border: 'none', borderBottom: active ? `2px solid ${rose ? '#FF4D8F' : '#00C8D8'}` : '2px solid transparent',
      cursor: 'pointer', fontFamily: "'Jost', sans-serif", textTransform: 'uppercase' as const,
      position: 'relative' as const, bottom: -1
    }),
    content: { padding: '40px 48px', maxWidth: 860 },
    card: { background: '#091F2E', padding: '24px 20px', borderLeft: '3px solid #00C8D8', marginBottom: 2 },
    label: { fontSize: 10, letterSpacing: 3, color: '#4A8898', fontWeight: 500, textTransform: 'uppercase' as const, marginBottom: 6 },
    input: { background: '#0A2A42', border: '1px solid #1A3A4A', color: '#E0F4F8', fontFamily: "'Jost', sans-serif", fontSize: 14, padding: '10px 12px', outline: 'none', width: '100%' },
    btnCyan: { width: '100%', padding: 14, fontSize: 12, letterSpacing: 5, fontWeight: 600, color: '#071824', background: '#00C8D8', border: 'none', cursor: 'pointer', fontFamily: "'Jost', sans-serif", marginTop: 20 },
    btnRose: { width: '100%', padding: 14, fontSize: 12, letterSpacing: 5, fontWeight: 600, color: '#fff', background: '#FF4D8F', border: 'none', cursor: 'pointer', fontFamily: "'Jost', sans-serif", marginTop: 20 },
    btnSmall: (full: boolean) => ({ padding: '7px 16px', fontSize: 11, letterSpacing: 2, fontWeight: 600, color: full ? '#4A8898' : '#071824', background: full ? '#1A3A4A' : '#FF4D8F', border: 'none', cursor: full ? 'not-allowed' : 'pointer', fontFamily: "'Jost', sans-serif" }),
    row: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14, marginBottom: 14 },
    row3: { display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 14, marginBottom: 14 },
    secTitle: { fontSize: 10, letterSpacing: 4, color: '#00C8D8', fontWeight: 600, textTransform: 'uppercase' as const, marginBottom: 14, marginTop: 20, paddingBottom: 6, borderBottom: '1px solid #1A3A4A' },
    infoBox: (rose = false) => ({ background: rose ? 'rgba(255,77,143,0.06)' : 'rgba(0,200,216,0.06)', borderLeft: `3px solid ${rose ? '#FF4D8F' : '#00C8D8'}`, padding: '14px 18px', marginBottom: 24, fontSize: 13, lineHeight: 1.6 }),
    modal: { position: 'fixed' as const, inset: 0, background: 'rgba(7,24,36,0.95)', zIndex: 50, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24 },
    modalBox: { background: '#091F2E', padding: 32, maxWidth: 480, width: '100%', borderTop: '3px solid #FF4D8F', position: 'relative' as const },
    toast: (type: string) => ({ position: 'fixed' as const, bottom: 28, right: 28, zIndex: 100, padding: '12px 20px', fontSize: 13, fontWeight: 500, background: '#091F2E', color: '#E0F4F8', borderLeft: `3px solid ${type === 'error' ? '#FF4D8F' : '#00C8D8'}` }),
    badge: (full: boolean) => ({ display: 'inline-block', padding: '4px 12px', fontSize: 11, fontWeight: 500, letterSpacing: 1, color: full ? '#FF4D8F' : '#00C8D8', background: full ? 'rgba(255,77,143,0.1)' : 'rgba(0,200,216,0.1)', border: `0.5px solid ${full ? '#FF4D8F' : '#00C8D8'}`, marginRight: 10 }),
  }

  return (
    <div style={s.wrap}>
      {/* Stripes */}
      <div style={s.stripes}>
        <div style={{ flex: 1, background: '#007A8A' }}/>
        <div style={{ flex: 1, background: '#00C8D8' }}/>
        <div style={{ flex: 1, background: '#FF4D8F' }}/>
      </div>

      {/* Header */}
      <div style={s.header}>
        <div style={s.logo}>Atlantic Waves</div>
        <div style={{ fontSize: 11, letterSpacing: 3, color: '#4A8898' }}>17-19 Juillet 2026 · Plufur</div>
      </div>

      {/* Hero */}
      <div style={s.hero}>
        <span style={s.heroLabel}>✦ Plufur · 17-19 Juillet 2026</span>
        <h1 style={s.heroTitle}>Covoi<em style={{ color: '#00C8D8' }}>turage</em></h1>
        <p style={s.heroSub}>Trouve ta place ou propose un trajet</p>
      </div>

      {/* Tabs */}
      <div style={s.tabs}>
        <button style={s.tab(tab === 'liste')} onClick={() => { setTab('liste'); loadData() }}>Voir les trajets</button>
        <button style={s.tab(tab === 'proposer')} onClick={() => setTab('proposer')}>Proposer un trajet</button>
      </div>

      <div style={s.content}>

        {/* LISTE */}
        {tab === 'liste' && (
          <div>
            <div style={{ fontSize: 10, letterSpacing: 5, color: '#007A8A', fontWeight: 500, textTransform: 'uppercase', marginBottom: 24 }}>✦ Trajets disponibles</div>
            {loading && <div style={{ color: '#4A8898', textAlign: 'center', padding: 48 }}>Chargement...</div>}
            {!loading && trajets.length === 0 && (
              <div style={{ textAlign: 'center', padding: 60 }}>
                <p style={{ fontFamily: 'serif', fontSize: 26, marginBottom: 8 }}>Aucun trajet pour l'instant</p>
                <p style={{ color: '#4A8898', fontSize: 13 }}>Sois le·la premier·e à proposer un trajet !</p>
              </div>
            )}
            {!loading && trajets.map(t => {
              const pTrajet = passagers.filter(p => p.trajet_id === t.id)
              const restantes = t.places_dispo - pTrajet.length
              const full = restantes <= 0
              return (
                <div key={t.id} style={s.card}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 10, flexWrap: 'wrap' as const }}>
                    <span style={{ fontFamily: 'serif', fontSize: 22, fontWeight: 700 }}>{t.depart_lieu}</span>
                    <span style={{ color: '#00C8D8', fontSize: 18 }}>→</span>
                    <span style={{ fontFamily: 'serif', fontSize: 22, fontWeight: 700 }}>{t.arrivee_lieu}</span>
                  </div>
                  <div style={{ display: 'flex', gap: 20, marginBottom: 14, flexWrap: 'wrap' as const }}>
                    <span style={{ fontSize: 11, letterSpacing: 2, color: '#4A8898' }}>DÉPART <span style={{ color: '#E0F4F8' }}>{formatDate(t.depart_date)} à {t.depart_heure?.substring(0,5)}</span></span>
                    <span style={{ fontSize: 11, letterSpacing: 2, color: '#4A8898' }}>ARRIVÉE <span style={{ color: '#E0F4F8' }}>{formatDate(t.arrivee_date)} à {t.arrivee_heure?.substring(0,5)}</span></span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap' as const, gap: 10 }}>
                    <div>
                      <div style={{ fontSize: 13, fontWeight: 500 }}>{t.prenom} {t.nom}</div>
                      <div style={{ fontSize: 11, color: '#4A8898' }}>{t.instagram} {t.telephone ? '· ' + t.telephone : ''}</div>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                      <span style={s.badge(full)}>{full ? 'COMPLET' : `${restantes} PLACE${restantes > 1 ? 'S' : ''}`}</span>
                      <button
                        disabled={full}
                        style={s.btnSmall(full)}
                        onClick={() => { setModal({ open: true, trajetId: t.id, info: `${t.depart_lieu} → ${t.arrivee_lieu} · ${formatDate(t.depart_date)}` }); setPNom(''); setPPrenom(''); setPInstagram(''); setPTel('') }}
                      >
                        {full ? 'COMPLET' : "M'INSCRIRE"}
                      </button>
                    </div>
                  </div>
                  {pTrajet.length > 0 && (
                    <div style={{ marginTop: 14, paddingTop: 14, borderTop: '1px solid #1A3A4A' }}>
                      <div style={{ fontSize: 10, letterSpacing: 3, color: '#4A8898', marginBottom: 8 }}>PASSAGERS ({pTrajet.length}/{t.places_dispo})</div>
                      {pTrajet.map(p => (
                        <div key={p.id} style={{ display: 'flex', gap: 12, padding: '5px 0', fontSize: 12, borderBottom: '1px solid rgba(255,255,255,0.03)' }}>
                          <span>{p.prenom} {p.nom}</span>
                          <span style={{ color: '#4A8898' }}>{p.instagram}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        )}

        {/* PROPOSER */}
        {tab === 'proposer' && (
          <div style={{ background: '#091F2E', padding: 32 }}>
            <div style={s.infoBox()}>
              <strong style={{ color: '#00C8D8' }}>Pourquoi Instagram et téléphone ?</strong> Pour faciliter la création d'une conversation de groupe avec tous les membres de la voiture.
            </div>
            <div style={s.row}>
              <div><div style={s.label}>Nom *</div><input style={s.input} value={cNom} onChange={e => setCNom(e.target.value)} placeholder="Dupont"/></div>
              <div><div style={s.label}>Prénom *</div><input style={s.input} value={cPrenom} onChange={e => setCPrenom(e.target.value)} placeholder="Marie"/></div>
            </div>
            <div style={s.row}>
              <div><div style={s.label}>Instagram *</div><input style={s.input} value={cInstagram} onChange={e => setCInstagram(e.target.value)} placeholder="@pseudo"/></div>
              <div><div style={s.label}>Téléphone *</div><input style={s.input} value={cTel} onChange={e => setCTel(e.target.value)} placeholder="06 12 34 56 78"/></div>
            </div>
            <div style={{ ...s.secTitle }}>Départ</div>
            <div style={s.row3}>
              <div><div style={s.label}>Date *</div><input type="date" style={s.input} value={cDepDate} onChange={e => setCDepDate(e.target.value)}/></div>
              <div><div style={s.label}>Heure *</div><input type="time" style={s.input} value={cDepHeure} onChange={e => setCDepHeure(e.target.value)}/></div>
              <div><div style={s.label}>Lieu *</div><input style={s.input} value={cDepLieu} onChange={e => setCDepLieu(e.target.value)} placeholder="Paris Gare Montparnasse"/></div>
            </div>
            <div style={{ ...s.secTitle, color: '#FF4D8F', borderBottomColor: '#FF4D8F' }}>Arrivée</div>
            <div style={s.row3}>
              <div><div style={s.label}>Date *</div><input type="date" style={s.input} value={cArrDate} onChange={e => setCArrDate(e.target.value)}/></div>
              <div><div style={s.label}>Heure *</div><input type="time" style={s.input} value={cArrHeure} onChange={e => setCArrHeure(e.target.value)}/></div>
              <div><div style={s.label}>Lieu *</div><input style={s.input} value={cArrLieu} onChange={e => setCArrLieu(e.target.value)} placeholder="Plufur"/></div>
            </div>
            <div style={{ marginTop: 8 }}>
              <div style={s.label}>Nombre de places disponibles (sans le conducteur) *</div>
              <input type="number" min={1} max={7} style={{ ...s.input, maxWidth: 120 }} value={cPlaces} onChange={e => setCPlaces(e.target.value)} placeholder="3"/>
            </div>
            <button style={s.btnCyan} onClick={proposerTrajet}>PROPOSER CE TRAJET</button>
          </div>
        )}
      </div>

      {/* MODAL PASSAGER */}
      {modal.open && (
        <div style={s.modal} onClick={e => { if (e.target === e.currentTarget) setModal({ open: false, trajetId: null, info: '' }) }}>
          <div style={s.modalBox}>
            <button onClick={() => setModal({ open: false, trajetId: null, info: '' })} style={{ position: 'absolute', top: 14, right: 14, background: 'none', border: 'none', color: '#4A8898', fontSize: 18, cursor: 'pointer' }}>✕</button>
            <h3 style={{ fontFamily: 'serif', fontSize: 22, marginBottom: 4 }}>S'inscrire comme passager</h3>
            <p style={{ fontSize: 12, color: '#4A8898', marginBottom: 24 }}>{modal.info}</p>
            <div style={s.infoBox(true)}>
              <strong style={{ color: '#FF4D8F' }}>Pourquoi Instagram et téléphone ?</strong> Pour organiser le trajet ensemble.
            </div>
            <div style={s.row}>
              <div><div style={s.label}>Nom *</div><input style={s.input} value={pNom} onChange={e => setPNom(e.target.value)} placeholder="Dupont"/></div>
              <div><div style={s.label}>Prénom *</div><input style={s.input} value={pPrenom} onChange={e => setPPrenom(e.target.value)} placeholder="Marie"/></div>
            </div>
            <div style={s.row}>
              <div><div style={s.label}>Instagram *</div><input style={s.input} value={pInstagram} onChange={e => setPInstagram(e.target.value)} placeholder="@pseudo"/></div>
              <div><div style={s.label}>Téléphone *</div><input style={s.input} value={pTel} onChange={e => setPTel(e.target.value)} placeholder="06 12 34 56 78"/></div>
            </div>
            <button style={s.btnRose} onClick={sInscrire}>M'INSCRIRE COMME PASSAGER</button>
          </div>
        </div>
      )}

      {/* TOAST */}
      {toast && <div style={s.toast(toast.type)}>{toast.msg}</div>}
    </div>
  )
}

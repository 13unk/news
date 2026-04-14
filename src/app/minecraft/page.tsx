"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  FaChevronDown, FaCalendarDays, FaArrowLeft, FaCrown, FaHeart, FaCopy 
} from "react-icons/fa6";

// --- LLUVIA TOTAL DE OBJETOS ---
function PortalParticles() {
  const [mounted, setMounted] = useState(false);
  const [sparkles] = useState(() => [...Array(25)].map((_, i) => ({
    id: `sp-${i}`,
    l: Math.random() * 100 + "%",
    t: Math.random() * 100 + "%",
    d: Math.random() * 4 + 3
  })));

  const [items, setItems] = useState(() => [
    ...[...Array(12)].map((_, i) => ({ 
      id: `c-${i}`, type: 'candy', l: Math.random() * 100 + "%", 
      d: Math.random() * 6 + 4, s: Math.random() * 0.4 + 0.7, 
      r: Math.random() * 360, popped: false 
    })),
    ...[...Array(10)].map((_, i) => ({ 
      id: `b-${i}`, type: 'ball', l: Math.random() * 100 + "%", 
      d: Math.random() * 7 + 5, s: Math.random() * 0.3 + 0.6, 
      r: Math.random() * 360, popped: false 
    }))
  ]);

  useEffect(() => { setMounted(true); }, []);

  const handlePop = (id: string) => {
    setItems(prev => prev.map(item => 
      item.id === id ? { ...item, popped: true } : item
    ));
    setTimeout(() => {
      setItems(prev => prev.map(item => 
        item.id === id ? { 
          ...item, 
          popped: false, 
          l: Math.random() * 95 + "%", 
          d: Math.random() * 5 + 5 
        } : item
      ));
    }, 2000);
  };

  if (!mounted) return null;

  return (
    <div className="fixed inset-0 w-full h-full z-0 pointer-events-none overflow-hidden">
      {sparkles.map(p => (
        <motion.div 
          key={p.id} 
          className="absolute bg-purple-500 w-[2px] h-[2px] rounded-full shadow-[0_0_8px_#a855f7]"
          style={{ left: p.l, top: p.t }} 
          animate={{ y: [0, -100], opacity: [0, 0.7, 0] }}
          transition={{ duration: p.d, repeat: Infinity, ease: "linear" }} 
        />
      ))}
      {items.map((item) => (
        <motion.div
          key={item.id}
          className="absolute pointer-events-auto" 
          style={{ left: item.l, top: "-10%" }}
          animate={item.popped 
            ? { scale: [1, 2.5, 0], opacity: 0 } 
            : { y: ["0vh", "110vh"], rotate: item.r + 360, x: [0, 25, -25, 0] }
          }
          transition={item.popped 
            ? { duration: 0.25, ease: "easeOut" } 
            : { duration: item.d, repeat: Infinity, ease: "linear" }
          }
          onMouseEnter={() => { if (!item.popped) handlePop(item.id); }}
        >
          <img 
            src={item.type === 'candy' 
              ? "https://i.postimg.cc/ZqT5pTCB/Caramelo-raro-EP.png" 
              : "https://i.postimg.cc/BZ1PqnDf/pixelated-master-ball-h0dseurkeiqh5xr7-h0dseurkeiqh5xr7.png"
            } 
            className={`pixelated transition-opacity duration-300 ${item.type === 'ball' ? 'w-8 h-8' : 'w-9 h-9'} ${item.popped ? 'opacity-0' : 'opacity-40 hover:opacity-100'}`}
            style={{ transform: `scale(${item.s})` }}
            alt="collectible"
          />
        </motion.div>
      ))}
    </div>
  );
}

// --- VISTA DE LORE ---
function LoreView({ onBack }: { onBack: () => void }) {
  const chapters = [
    {
      title: "El Origen",
      content: "En el principio, el Cobbleverso era un vacío de píxeles. De la colisión entre un Caramelo Raro y una Master Ball fallida, nació la primera isla flotante.",
      icon: "📜"
    },
    {
      title: "La Gran Cacería",
      content: "Cada ciclo lunar, las leyes de la física se alteran. Los entrenadores descienden para capturar anomalías que caen del cielo, buscando el poder definitivo.",
      icon: "⚔️"
    },
    {
      title: "El Vacío Púrpura",
      content: "Más allá del bedrock existe una grieta. Se dice que quien logre entrar, podrá controlar el destino del spawn del mundo.",
      icon: "🌌"
    }
  ];

  return (
    <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="w-full max-w-4xl mx-auto py-10 px-6 relative z-10">
      <button onClick={onBack} className="flex items-center gap-3 text-zinc-500 hover:text-white transition-colors mb-12 uppercase text-[0.6rem] tracking-widest">
        <FaArrowLeft /> Volver
      </button>
      <div className="text-center mb-16">
        <h2 className="text-4xl font-black uppercase text-glow mb-4 italic text-white">HISTORIA DEL <span className="text-purple-500">MUNDO</span></h2>
      </div>
      <div className="grid gap-8">
        {chapters.map((chapter, i) => (
          <motion.div key={i} initial={{ x: -20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: i * 0.1 }} className="bg-zinc-900/60 border-2 border-white/5 p-8 rounded-[40px] backdrop-blur-md relative overflow-hidden group hover:border-purple-500/30 transition-all">
            <h3 className="text-purple-400 font-black uppercase text-sm mb-4 flex items-center gap-3">
              <span className="text-2xl">{chapter.icon}</span> {chapter.title}
            </h3>
            <p className="text-zinc-400 text-[0.65rem] leading-[1.8] tracking-wide">{chapter.content}</p>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}

// --- VISTA DE RANKINGS ---
function RankingsView({ onBack }: { onBack: () => void }) {
  const rankedData = [
    { name: "Sollleonart", score: 98, color: "text-red-400" },
    { name: "Herobrine", score: 85, color: "text-purple-400" },
    { name: "Tresillo", score: 72, color: "text-green-400" },
    { name: "KrizRnk", score: 64, color: "text-blue-400" },
  ].sort((a, b) => b.score - a.score);

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-4xl mx-auto py-10 px-6 relative z-10">
      <button onClick={onBack} className="flex items-center gap-3 text-zinc-500 hover:text-white transition-colors mb-12 uppercase text-[0.6rem] tracking-widest"><FaArrowLeft /> Volver</button>
      <div className="text-center mb-16">
        <h2 className="text-4xl font-black uppercase text-glow mb-4 italic text-white">HALL OF <span className="text-purple-500">FAME</span></h2>
      </div>
      <div className="space-y-4">
        {rankedData.map((player, index) => (
          <div key={player.name} className={`flex items-center justify-between p-6 rounded-[30px] border-2 bg-zinc-900/40 backdrop-blur-md ${index === 0 ? 'border-yellow-500/50 shadow-[0_0_20px_rgba(234,179,8,0.1)]' : 'border-white/5'}`}>
            <div className="flex items-center gap-6">
              <div className="w-10 text-center">
                {index === 0 ? <FaCrown className="text-yellow-500 text-3xl" /> : <span className="text-zinc-600 font-black">#{index + 1}</span>}
              </div>
              <img src={`https://minotar.net/armor/bust/${player.name}/60.png`} className="w-12 h-12 pixelated" alt={player.name} />
              <h4 className={`text-[0.7rem] font-black uppercase ${player.color}`}>{player.name}</h4>
            </div>
            <div className="text-right">
              <span className={`text-2xl font-black ${index === 0 ? 'text-yellow-500' : 'text-white'}`}>{player.score}</span>
              <span className="text-[0.6rem] text-zinc-600 ml-2">pts</span>
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
}

// --- VISTA DE MECENAZGO ---
function PatronageView({ onBack, players, playerKarma, onApplyPower }: { 
  onBack: () => void, players: any[], playerKarma: Record<string, number>, onApplyPower: (name: string, val: number) => void 
}) {
  const [targetPlayer, setTargetPlayer] = useState<string | null>(null);
  const [amounts, setAmounts] = useState<Record<string, number>>({});

  const perks = [
    { id: "p1", name: "Lluvia de Experiencia", price: 0.99, icon: "✨", desc: "96x Caramelos Raros", value: 1 },
    { id: "p2", name: "Captura 100%", price: 0.99, icon: "📦", desc: "1x MasterBall", value: 2 },
  ];

  const curses = [
    { id: "c1", name: "Explosivo", price: 2.49, icon: "🌑", desc: "Llueven 24 Dinamitas", value: -1 },
    { id: "c2", name: "Cena explosiva", price: 4.50, icon: "🧟", desc: "Horda de 40 creapers", value: -2 },
  ];

  const updateAmount = (id: string, delta: number) => {
    setAmounts(prev => ({ ...prev, [id]: Math.min(10, Math.max(1, (prev[id] || 1) + delta)) }));
  };

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-6xl mx-auto py-10 px-6 relative z-10">
      <button onClick={onBack} className="flex items-center gap-3 text-zinc-500 hover:text-white mb-12 uppercase text-[0.6rem] tracking-widest"><FaArrowLeft /> Volver</button>
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
        {players.map((p) => {
            const karma = playerKarma[p.name] || 0;
            return (
                <button key={p.name} onClick={() => setTargetPlayer(p.name)} className={`relative p-8 rounded-[40px] border-2 transition-all ${targetPlayer === p.name ? 'border-purple-500 bg-purple-500/20' : 'border-white/5 bg-zinc-900/40 hover:border-white/20'}`}>
                  <img src={`https://minotar.net/armor/bust/${p.name}/100.png`} className="w-20 h-20 mx-auto mb-4 pixelated" alt={p.name} />
                  <p className="text-[0.6rem] font-black uppercase tracking-tighter">{p.name}</p>
                  <div className={`absolute bottom-4 right-4 w-8 h-8 rounded-lg flex items-center justify-center ${karma >= 0 ? 'bg-green-500' : 'bg-red-500'}`}>
                    <span className="text-[10px] font-bold text-white">{karma}</span>
                  </div>
                </button>
            )
        })}
      </div>

      <AnimatePresence mode="wait">
        {targetPlayer && (
          <motion.div key={targetPlayer} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="grid grid-cols-1 lg:grid-cols-2 gap-12 bg-black/40 p-8 rounded-[50px] border border-white/5 backdrop-blur-md">
            <div className="space-y-6">
              <h3 className="text-green-400 font-black uppercase text-xs mb-6 border-b border-green-500/20 pb-4">Bendiciones para {targetPlayer}</h3>
              {perks.map((perk) => (
                <div key={perk.id} className="bg-zinc-900/60 p-6 rounded-3xl flex items-center justify-between gap-4 border border-white/5">
                  <div className="flex gap-4 items-center">
                    <span className="text-3xl">{perk.icon}</span>
                    <div className="text-left">
                      <h4 className="text-[0.65rem] font-black uppercase">{perk.name}</h4>
                      <p className="text-[0.45rem] text-zinc-500">{perk.desc}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 bg-black/40 p-2 rounded-2xl">
                    <div className="flex items-center gap-3 px-2">
                      <button onClick={() => updateAmount(perk.id, -1)} className="w-6 h-6 rounded-lg bg-zinc-800">-</button>
                      <span className="text-[0.7rem] font-black">{amounts[perk.id] || 1}</span>
                      <button onClick={() => updateAmount(perk.id, 1)} className="w-6 h-6 rounded-lg bg-zinc-800">+</button>
                    </div>
                    <button onClick={() => onApplyPower(targetPlayer, perk.value * (amounts[perk.id] || 1))} className="bg-green-500 text-black font-black px-4 py-3 rounded-xl text-[0.55rem]">{(perk.price * (amounts[perk.id] || 1)).toFixed(2)}€</button>
                  </div>
                </div>
              ))}
            </div>
            <div className="space-y-6">
              <h3 className="text-red-500 font-black uppercase text-xs mb-6 border-b border-red-500/20 pb-4">Maldiciones para {targetPlayer}</h3>
              {curses.map((curse) => (
                <div key={curse.id} className="bg-zinc-900/60 p-6 rounded-3xl flex items-center justify-between gap-4 border border-white/5">
                  <div className="flex gap-4 items-center">
                    <span className="text-3xl">{curse.icon}</span>
                    <div className="text-left">
                      <h4 className="text-[0.65rem] font-black uppercase">{curse.name}</h4>
                      <p className="text-[0.45rem] text-zinc-500">{curse.desc}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 bg-black/40 p-2 rounded-2xl">
                    <div className="flex items-center gap-3 px-2">
                      <button onClick={() => updateAmount(curse.id, -1)} className="w-6 h-6 rounded-lg bg-zinc-800">-</button>
                      <span className="text-[0.7rem] font-black">{amounts[curse.id] || 1}</span>
                      <button onClick={() => updateAmount(curse.id, 1)} className="w-6 h-6 rounded-lg bg-zinc-800">+</button>
                    </div>
                    <button onClick={() => onApplyPower(targetPlayer, curse.value * (amounts[curse.id] || 1))} className="bg-red-500 text-white font-black px-4 py-3 rounded-xl text-[0.55rem]">{(curse.price * (amounts[curse.id] || 1)).toFixed(2)}€</button>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

// --- VISTA DE TIENDA ---
function ShopView({ onBack }: { onBack: () => void }) {
  const [selectedItem, setSelectedItem] = useState<any>(null);
  const ranks = [
    { name: "Rango Ash", price: "4.99€", img: "https://i.postimg.cc/8z4pm281/ezgif-6e85c7d3480666d7.gif", color: "border-yellow-500/50", text: "text-yellow-400", content: ["Prioridad de entrada", "Proteccion 20 x 20", "1x MasterBall ", "Prefijo [ASH]", "Acceso a /fly", "32x Caramelos Raros", "Kit semanal Ash"] },
    { name: "Rango Rojo", price: "9.99€", img: "https://i.postimg.cc/1zTZWPvs/13940.gif", color: "border-red-500/50", text: "text-red-400", content: ["Todo lo de Ash", "Prefijo [ROJO]", "4x MasterBalls", "Proteccion 70 x 70", "24x Revivir Maximo", "124x Caramelos Raros", "Kit semanal Rojo"] },
    { name: "Rango Unk", price: "19.99€", img: "https://i.postimg.cc/d0ZfVC91/df58a91e6a90c5722d1a4a77f2d0b44b.gif", color: "border-purple-500/50", text: "text-purple-400", content: ["Todo lo de Rojo","Proteccion 130 x 130", "Prefijo [UNK]", "Comando /heal", "Comando /repair", "Comando /invisible"] },
  ];
  const kits = [
    { name: "Kit Fly", price: "0.99€", img: "https://minecraft.wiki/images/Feather_JE3_BE2.png", desc: "Volar por el mapa.", color: "border-white-500/30", content: ["Permiso /fly activo"] },
    { name: "Kit Azul", price: "4.99€", img: "https://i.postimg.cc/J7jSVjTJ/nounish-nouns-dao.gif", desc: "El hijo pródigo", color: "border-white-500/30", content: ["2x Masterball", "64x Caramelos", "5x Revivir", "2x PokeCenter", "1x Pc"] },
    { name: "Kit Professor", price: "6,99€", img: "https://i.postimg.cc/FsWZ2RQs/08f2d06c78721ab6d522b02222b057d3-ezgif-com-gif-maker.gif", desc: "Alto rendimiento.", color: "border-white-500/30", content: ["Proteccion 40 x 40","6x Masterball", "256x Caramelos", "12x Revivir", "4x PokeCenter", "2x Pc"] }
  ];

  return (
    <motion.div initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} className="w-full max-w-6xl mx-auto py-10 px-6 relative z-10">
      {!selectedItem && <button onClick={onBack} className="flex items-center gap-3 text-zinc-500 hover:text-white mb-12 uppercase text-[0.6rem] tracking-widest"><FaArrowLeft /> Volver</button>}
      <AnimatePresence mode="wait">
        {!selectedItem ? (
          <motion.div key="list" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <div className="mb-20 text-center">
              <h2 className="text-2xl font-black uppercase italic mb-10 tracking-tighter">MEMBRESÍAS <span className="text-purple-500">VIP</span></h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {ranks.map((rank, i) => (
                  <div key={i} onClick={() => setSelectedItem(rank)} className={`bg-zinc-900/40 border-2 ${rank.color} rounded-[40px] p-8 flex flex-col items-center cursor-pointer hover:scale-105 transition-all group`}>
                    <img src={rank.img} className="w-16 h-16 mb-6" alt={rank.name} />
                    <h3 className={`text-lg font-black uppercase mb-2 ${rank.text}`}>{rank.name}</h3>
                    <p className="text-xl font-black mb-6">{rank.price}</p>
                    <button className="w-full bg-white text-black py-4 rounded-2xl text-[0.6rem] font-bold uppercase group-hover:bg-purple-500 group-hover:text-white transition-all">Detalles</button>
                  </div>
                ))}
              </div>
            </div>
            <div className="mb-20 text-center">
              <h2 className="text-2xl font-black uppercase italic mb-10 tracking-tighter">KITS</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {kits.map((kit, i) => (
                  <div key={i} onClick={() => setSelectedItem(kit)} className={`bg-black/40 border ${kit.color} rounded-[30px] p-6 flex flex-col items-center group cursor-pointer hover:bg-zinc-900/50 transition-all`}>
                    <img src={kit.img} className="w-12 h-12 mb-4 pixelated" alt={kit.name} />
                    <h4 className="text-[0.65rem] font-black uppercase text-white mb-1">{kit.name}</h4>
                    <p className="text-green-400 font-black text-sm mb-4">{kit.price}</p>
                    <button className="w-full bg-zinc-800 group-hover:bg-green-600 text-[0.5rem] py-3 rounded-xl font-bold transition-colors">VER</button>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        ) : (
          <motion.div key="detail" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} className="bg-zinc-900/90 border-2 border-purple-500/30 rounded-[50px] p-8 md:p-12 max-w-3xl mx-auto shadow-2xl">
            <button onClick={() => setSelectedItem(null)} className="flex items-center gap-2 text-zinc-500 hover:text-white mb-10 text-[0.6rem] uppercase tracking-widest transition-colors"><FaArrowLeft /> Volver</button>
            <div className="flex flex-col md:flex-row gap-12 items-center">
              <div className="bg-black/60 p-12 rounded-[50px] border border-white/10"><img src={selectedItem.img} className="w-32 h-32 md:w-40 md:h-40" alt={selectedItem.name} /></div>
              <div className="flex-1">
                <h2 className="text-3xl font-black text-white uppercase mb-2 italic tracking-tighter">{selectedItem.name}</h2>
                <p className="text-green-400 font-black text-2xl mb-8">{selectedItem.price}</p>
                <ul className="space-y-4 bg-black/40 p-6 rounded-3xl border border-white/5 mb-8">
                  {selectedItem.content?.map((item: string, idx: number) => (
                    <li key={idx} className="flex items-start gap-3 text-[0.65rem] text-zinc-300"><span className="text-green-500">✔</span> {item}</li>
                  ))}
                </ul>
                <button className="w-full bg-gradient-to-r from-purple-600 to-purple-800 text-white py-5 rounded-2xl font-black uppercase text-[0.7rem] hover:from-green-500 transition-all">Comprar</button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

// --- PÁGINA PRINCIPAL ---
export default function MinecraftPage() {
  const [mounted, setMounted] = useState(false);
  const [currentView, setCurrentView] = useState("home"); 
  const [selectedPlayer, setSelectedPlayer] = useState<any>(null);
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [serverData, setServerData] = useState({ online: false, players: 0 });
  const [playerKarma] = useState<Record<string, number>>({ Sollleonart: 0, Tresillo: 0, KrizRnk: 0, Herobrine: 0 });
  const [showToast, setShowToast] = useState(false);

  const IP_SERVER = "141.145.200.211";
  const EVENT_IMAGE = "https://cdn.pixabay.com/photo/2022/11/15/15/28/minecraft-7594212_1280.jpg"; 

  const copyToClipboard = () => {
    navigator.clipboard.writeText(IP_SERVER);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 2500);
  };

  const players = [
    { name: "Sollleonart", rank: "VIP", color: "text-red-400", description: "Arquitecto del Cobbleverso." },
    { name: "Tresillo", rank: "ADMIN", color: "text-green-400", description: "Guardián de la justicia." },
    { name: "KrizRnk", rank: "VIP", color: "text-blue-400", description: "Explorador del Nether." },
    { name: "Herobrine", rank: "LEYENDA", color: "text-purple-400", description: "Entidad misteriosa." },
  ];

  const menuItems = [
    { name: "Lore", img: "https://minecraft.wiki/images/Book_and_Quill_JE2_BE2.png", action: () => { setCurrentView("lore"); setIsNavOpen(false); }, special: false },
    { name: "Rangos & Kits", img: "https://minecraft.wiki/images/Emerald_JE3_BE3.png", action: () => { setCurrentView("shop"); setIsNavOpen(false); }, special: false },
    { name: "Mecenazgo", img: "https://minecraft.wiki/images/Totem_of_Undying_JE2_BE2.png", action: () => { setCurrentView("patronage"); setIsNavOpen(false); }, special: false },
    { name: "Rankings", img: "https://minecraft.wiki/images/Nether_Star_JE3_BE2.png", action: () => { setCurrentView("rankings"); setIsNavOpen(false); }, special: false },
    { name: "Discord", img: "https://minecraft-api.com/api/items/ender_pearl/64.png", action: () => { window.open("#", "_blank"); setIsNavOpen(false); }, special: false },
    { name: "Donar", img: "https://minecraft.wiki/images/Gold_Ingot_JE4_BE2.png", action: () => { alert("Próximamente"); setIsNavOpen(false); }, special: true },
  ];

  useEffect(() => { 
    setMounted(true);
    fetch(`https://api.mcstatus.io/v2/status/java/${IP_SERVER}`)
      .then(res => res.json())
      .then(data => setServerData({ online: data.online, players: data.players?.online || 0 }))
      .catch(() => {});
  }, []);

  if (!mounted) return <div className="min-h-screen bg-[#05000a]" />;

  return (
    <main className="minecraft-font min-h-screen text-white relative bg-[#05000a] overflow-x-hidden pb-20">
      <PortalParticles />
      
      <AnimatePresence mode="wait">
        {currentView === "home" ? (
          <motion.div key="home" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="max-w-4xl mx-auto relative z-10 py-20 px-6 text-center">
            <header className="mb-12">
              <h1 className="text-3xl md:text-5xl font-black italic uppercase text-glow tracking-tighter">COBBLE<span className="text-purple-500">VERSO</span></h1>
              <p className="text-zinc-600 mt-6 text-[0.6rem] tracking-[0.3em] uppercase">Status: {serverData.online ? 'Online' : 'Offline'} | {serverData.players} Jugadores</p>
            </header>

            <motion.div 
              whileHover={{ scale: 1.01 }} 
              onClick={copyToClipboard} 
              className="bg-zinc-900/50 border-2 border-purple-500/20 p-6 rounded-[30px] mb-6 cursor-pointer group active:scale-95 transition-all"
            >
              <div className="flex flex-col gap-2">
                <p className="text-lg md:text-xl tracking-[0.2em] text-white bg-black/40 py-4 rounded-2xl border border-white/5 group-hover:border-purple-500/40 transition-colors">
                  {IP_SERVER}
                </p>
                <p className="text-[0.4rem] uppercase text-zinc-500 group-hover:text-purple-400 transition-colors">Haz click para copiar la dirección</p>
              </div>
            </motion.div>

            <motion.div className="group relative w-full h-[320px] rounded-[40px] mb-8 overflow-hidden border-2 border-purple-500/40 shadow-2xl bg-purple-900/20">
              <img src={EVENT_IMAGE} className="w-full h-full object-cover absolute inset-0 opacity-70" alt="Evento" />
              <div className="absolute inset-0 z-10 p-10 flex flex-col items-center justify-center">
                  <div className="bg-purple-600 p-3 rounded-full mb-4 shadow-[0_0_15px_#a855f7]"><FaCalendarDays /></div>
                  <h2 className="text-xl md:text-2xl font-black uppercase text-white tracking-tighter mb-4">La Gran Cacería</h2>
                  <div className="bg-black/80 px-8 py-4 rounded-2xl border border-purple-500/50 text-[0.6rem] uppercase tracking-widest text-zinc-300">Viernes 16 de enero</div>
              </div>
            </motion.div>

            <div className="mb-12 flex flex-col gap-2 relative">
              <button onClick={() => setIsNavOpen(!isNavOpen)} className="w-full bg-zinc-900/50 border-2 border-purple-500/20 py-8 rounded-[30px] flex items-center justify-center gap-6 px-10 hover:border-purple-500/50 transition-all">
                <img src="https://minecraft.wiki/images/Crafting_Table_JE4_BE3.png" className="w-8 h-8 pixelated" alt="Menu" />
                <span className="text-[0.7rem] font-bold uppercase tracking-[0.2em]">INICIO</span>
                <FaChevronDown className={`transition-transform ${isNavOpen ? 'rotate-180' : ''}`} />
              </button>
              <AnimatePresence>
                {isNavOpen && (
                  <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="bg-zinc-900/50 border-2 border-purple-500/20 rounded-[30px] p-4 flex flex-col gap-2 overflow-hidden">
                    {menuItems.map((item, idx) => (
                      <motion.button key={idx} onClick={item.action} className={`flex items-center justify-between p-6 rounded-2xl border transition-all text-left ${item.special ? 'bg-gradient-to-r from-yellow-500 to-amber-600 border-yellow-400 shadow-lg' : 'bg-black/40 border-white/5 hover:bg-purple-500/10'}`}>
                        <div className="flex items-center gap-6">
                          <img src={item.img} className="w-8 h-8 pixelated" alt={item.name} />
                          <span className={`text-[0.55rem] uppercase tracking-wider font-black ${item.special ? 'text-black' : 'text-zinc-300'}`}>{item.name}</span>
                        </div>
                      </motion.button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <section>
              <h2 className="mb-12 text-[0.7rem] uppercase tracking-tighter text-zinc-500">Integrantes Activos</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {players.map((p) => (
                  <motion.div 
                    key={p.name} 
                    whileHover={{ scale: 1.05 }}
                    onClick={() => setSelectedPlayer(p)}
                    className="bg-zinc-900/40 border border-white/5 p-6 rounded-[32px] text-center cursor-pointer hover:border-purple-500/50 transition-all"
                  >
                    <img src={`https://minotar.net/armor/bust/${p.name}/80.png`} className="w-16 h-16 mx-auto mb-4 pixelated" alt={p.name} />
                    <p className="text-[0.5rem] font-bold text-white mb-1">{p.name}</p>
                    <p className={`${p.color} text-[0.4rem] font-black uppercase tracking-tighter`}>{p.rank}</p>
                  </motion.div>
                ))}
              </div>
            </section>
          </motion.div>
        ) : currentView === "shop" ? (
          <ShopView key="shop" onBack={() => setCurrentView("home")} />
        ) : currentView === "rankings" ? (
          <RankingsView key="rankings" onBack={() => setCurrentView("home")} />
        ) : currentView === "lore" ? (
          <LoreView key="lore" onBack={() => setCurrentView("home")} />
        ) : currentView === "patronage" ? (
          <PatronageView key="patronage" players={players} playerKarma={playerKarma} onApplyPower={()=>{}} onBack={() => setCurrentView("home")} />
        ) : (
          <div className="w-full text-center py-20 relative z-10">
              <button onClick={() => setCurrentView("home")} className="text-zinc-500 uppercase text-[0.6rem] mb-10"><FaArrowLeft className="inline mr-2"/> Volver</button>
              <h2 className="text-2xl font-black uppercase italic italic">PRÓXIMAMENTE</h2>
          </div>
        )}
      </AnimatePresence>

      {/* TOAST DE COPIADO */}
      <AnimatePresence>
        {showToast && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="fixed bottom-10 left-1/2 -translate-x-1/2 z-[200] pointer-events-none"
          >
            <div className="bg-zinc-900/90 border border-purple-500/50 backdrop-blur-xl px-8 py-4 rounded-full shadow-[0_10px_40px_rgba(168,85,247,0.3)] flex items-center gap-4">
              <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse" />
              <span className="text-[0.55rem] uppercase tracking-[0.2em] font-black text-white">
                IP COPIADA <span className="text-purple-400 ml-2">CON ÉXITO</span>
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* MODAL DE JUGADOR */}
      <AnimatePresence>
        {selectedPlayer && (
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-black/90 backdrop-blur-md"
            onClick={() => setSelectedPlayer(null)}
          >
            <motion.div 
              initial={{ scale: 0.85, y: 30 }} animate={{ scale: 1, y: 0 }}
              className="bg-zinc-900 border-2 border-purple-500/50 p-8 md:p-12 rounded-[50px] max-w-md w-full text-center relative"
              onClick={(e) => e.stopPropagation()}
            >
              <img src={`https://visage.surgeplay.com/full/320/${selectedPlayer.name}`} className="h-64 mx-auto mb-8 skin-shadow pixelated object-contain" alt={selectedPlayer.name} />
              <h3 className="text-xl font-black uppercase mb-2 italic tracking-tighter">{selectedPlayer.name}</h3>
              <p className={`${selectedPlayer.color} text-[0.6rem] font-black uppercase mb-6`}>{selectedPlayer.rank}</p>
              <div className="bg-black/40 p-6 rounded-3xl border border-white/5 mb-8">
                <p className="text-zinc-400 text-[0.55rem] italic">"{selectedPlayer.description}"</p>
              </div>
              <button onClick={() => setSelectedPlayer(null)} className="w-full bg-purple-600 py-5 rounded-2xl text-[0.6rem] font-black uppercase tracking-widest">Cerrar</button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
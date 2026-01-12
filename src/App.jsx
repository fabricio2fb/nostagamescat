import React, { useState, useMemo, useEffect } from 'react';
import {
  Gamepad2,
  Search,
  Plus,
  Trash2,
  Share2,
  CheckCircle,
  Download,
  Layout,
  X,
  ChevronUp,
  Link as LinkIcon,
  Save,
  Copy,
  Edit2,
  ImageOff
} from 'lucide-react';

// Plataformas disponíveis
const PLATFORMS = ["Todos", "PSP", "PS2", "PS3", "PS4", "Xbox 360"];

// Base de dados fornecida pelo usuário
const INITIAL_DATABASE = {
  psp: {
    name: "PSP / PPSSPP",
    fifa: [
      { id: "psp_fs2", name: "FIFA STREET 2", img: "./psp/fifa street 2.jpeg", link: "https://mega.nz/file/BJlWXL4L#9uNh6Bvsar1MHm8C17RTwiknMHA-bq1THO3Q92Re40c" },
      { id: "psp_f06", name: "FIFA 06", img: "./psp/FIFA 06.jpg", link: "https://mega.nz/file/4RMnDJhD#a_Soqt1yEgfwNi5Gsbh97UULrbOxWM4z3J7gYXtBbLY" },
      { id: "psp_f07", name: "FIFA 07", img: "./psp/FIFA 07.jpg", link: "https://mega.nz/file/gZNgxQ7K#ASbi1FXoSJZhzQUadXWGPLksqzGuKbHYyX5B8xkP_xc" },
      { id: "psp_f08", name: "FIFA 08", img: "./psp/FIFA 08.jpg", link: "https://mega.nz/file/QVVCkRAC#Kf0sM9EVDSZH8O5VthMuiLzpK0fkjlbJMDNKTh7IaJo" },
      { id: "psp_f09", name: "FIFA 09", img: "./psp/FIFA 09.jpg", link: "https://mega.nz/file/wMUhUbwI#DPQ9yC1wSyb-paHjsWZBo4fZZFmBZ0SVIBjkPsPO-O0" },
      { id: "psp_f10", name: "FIFA 10", img: "./psp/FIFA 10.jpg", link: "https://mega.nz/file/1NFyTbaR#RAN_SVr4VcvtGWchOo2u1k90-WiE57h28mtJcZipKJ4" },
      { id: "psp_f11", name: "FIFA 11", img: "./psp/FIFA 11.jpg", link: "https://mega.nz/file/pY0jnDrZ#jvqGcamQK5QGTse24Ziwt6jrkI3qH_aYgFNCieuo3Rk" },
      { id: "psp_f12", name: "FIFA 12", img: "./psp/fifa 12.jpeg", link: "https://mega.nz/file/dAtBRJrZ#NyWf8Q0GehGjoZSK2DBrk7TK67jOt9842UfVkuc0o5M" },
      { id: "psp_f13", name: "FIFA 13", img: "./psp/fifa 13.jpeg", link: "https://mega.nz/file/EBN1gSLK#l5TdkH3MDoMqt55ZNmAxbQx3yezEFPlbyho6BVGP6RM" },
      { id: "psp_f14", name: "FIFA 14", img: "./psp/fifa 14.jpg", link: "https://mega.nz/file/VFMgjQpI#sh3fgtF9bHoxdmbMT3gfkFfp7uOPH183JbpB_w6dxiY" },
      { id: "psp_f14w", name: "FIFA 14 WORLD CLASS", img: "./psp/fifa 14 word class.jpg", link: "https://mega.nz/file/tcchjJrR#JjX9To6ia_AJHa_SLDs0kyJMgW--qLqc9p5ZYS8_CdU" }
    ],
    pes: [
      { id: "psp_p06", name: "PES 2006", img: "./psp/pes 6.jpeg", link: "https://mega.nz/file/IY83nbAD#pR0684Dgb-oKhSUhccdzch2EGfdmLPrj3cwPtsxi3ZY" },
      { id: "psp_p07", name: "PES 2007", img: "./psp/PES 2007.jpg", link: "https://mega.nz/file/QE0RCRxR#RrxM8Ec-mTR_xFWg9p3F2jEqkGB9x6yJyNmk3FxEr7Y" },
      { id: "psp_p08", name: "PES 2008", img: "./psp/pes 2008.jpeg", link: "https://mega.nz/file/NNcQ2bRb#zD_VCE05bB2knfXtcGXaWRSxAefaQ026NrOrc2XFRBs" },
      { id: "psp_p09", name: "PES 2009", img: "./psp/pes 2009.webp", link: "https://mega.nz/file/EdVjSCgJ#h0_whYQJ4PT93o7tbePSDmt1hq8_uqki87GSXz9Ahds" },
      { id: "psp_p10", name: "PES 2010", img: "./psp/pes 2010.jpg", link: "https://mega.nz/file/FMUlAJJY#mI_OyKidimXK6z2taAlGOybqUQPWRRmuQIEJ6zkRX2s" },
      { id: "psp_p11", name: "PES 2011", img: "./psp/pes 2011.jpg", link: "https://mega.nz/file/5ZMnSapQ#jFOH60mwV8yLDqivDkEHFm0XSHaO7Lyh2ol4-VQLNV4" },
      { id: "psp_p12", name: "PES 2012", img: "./psp/PES 2012.jpg", link: "https://mega.nz/file/hYdhRBxD#e6xm7rxRRbtK9wMIDkylvAXuS_IqjiAN4GcTutJ58Y4" },
      { id: "psp_p13", name: "PES 2013", img: "./psp/PES 2013.jpg", link: "https://mega.nz/file/1A9n3LiK#ntoXgKR_2v5uZ3pQzzPyByITRVbQ1o0GZ89q4BnO7PI" },
      { id: "psp_p14", name: "PES 2014", img: "./psp/PES 2014.jpg", link: "https://mega.nz/file/hIlDWRRQ#pQsQ7cE69hylT_HWmnwhAA8Qodvv_elCPxCmUHxoTZU" }
    ]
  },
  ps2: {
    name: "PlayStation 2",
    fifa: [
      { id: "ps2_fs2", name: "FIFA STREET 2", img: "./ps2/fifa street 2.jpg", link: "https://mega.nz/file/MNlmgD7Z#G-iX5qzLRDPpREpJ6eWSbTuMpjGQBsASFeMTwXAnosI" },
      { id: "ps2_f06", name: "FIFA 06", img: "./ps2/fifa 06.jpg", link: "https://mega.nz/file/5UVxXZAY#wA-wQG-MaE1ArZ72txdF1_iwJcmITm6YZxfF9AEcM6A" },
      { id: "ps2_f07", name: "FIFA 07", img: "./ps2/fifa 07.jpg", link: "https://mega.nz/file/0Y8FTKKT#SFig6rexFjc-7A4dApfySlq93LiYsR3BkTt8qWi2H9c" },
      { id: "ps2_f08", name: "FIFA 08", img: "./ps2/fifa 08.jpg", link: "https://mega.nz/file/ld1RTKIa#M9LezhphlQtzBZmDfpqVgDI8LJ2-8WlOddLdYse0Q1s" },
      { id: "ps2_f09", name: "FIFA 09", img: "./ps2/fifa 09.jpg", link: "https://mega.nz/file/4FE2ADxb#J79xBiMjM1KJBByANOgk6EKYzup5wYzDo_nXreM9vfg" },
      { id: "ps2_f11", name: "FIFA 11", img: "./ps2/fifa 11.jpg", link: "https://mega.nz/file/FZV3wZDQ#pp0J_ZspxV71QTrhS-bA4ZBCCl0gL9Q3Om3yH81-3H0" },
      { id: "ps2_f13", name: "FIFA 13", img: "./ps2/fifa 13.jpg", link: "https://mega.nz/file/gZMATb4R#yn2mupKvt3Hl8OdsG2X0EbmDsefLRnapfmrW7lvXzto" },
      { id: "ps2_f14", name: "FIFA 14", img: "./ps2/fifa 14.jpg", link: "https://mega.nz/file/RQ9GADRB#Ba43YlM_Zam5S-YRPupVFsMOyQ-Dv1n2ggpLDooVL4E" }
    ],
    pes: [
      { id: "ps2_p06", name: "PES 2006", img: "./ps2/pes 2006.jpg", link: "https://mega.nz/file/EVtyRKSY#sTmj_aIu-7yWXF3bWvmVoCZxcBpUptHHiyU3VT-sTNo" },
      { id: "ps2_p08", name: "PES 2008", img: "./ps2/pes 2008.jpg", link: "https://mega.nz/file/ZYMD3SYY#Dzqjg1OE0c4wEZrfVX1WtNz44x3yPwV77qJaF7gfSEA" },
      { id: "ps2_p09", name: "PES 2009", img: "./ps2/pes 2009.jpg", link: "https://mega.nz/file/odk3nILI#N4hDokDTBMcgCZjLGVW8TMjt0-obx0vxRSlsh_narAE" },
      { id: "ps2_p10", name: "PES 2010", img: "./ps2/pes 2010.jpg", link: "https://mega.nz/file/VBdSVBAZ#z-a8hx7Tlh6jXiPlk2bTrUud1RRt0MoQbezKEO5V34E" },
      { id: "ps2_p11", name: "PES 2011", img: "./ps2/pes 2011.jpg", link: "https://mega.nz/file/ZYsUwAba#aY16FAxtWj58Q9tTwk_VOEJYq-vgP1XR2oLhmPxVCRk" },
      { id: "ps2_p12", name: "PES 2012", img: "./ps2/pes 2012.jpg", link: "https://mega.nz/file/sB9wXQzA#9Zf2_QEivonR2W_sHx-pA6TPApMjL3Rsof8QQeDvO6A" },
      { id: "ps2_p13", name: "PES 2013", img: "./ps2/pes 2013.jpg", link: "https://mega.nz/file/gI1wGThA#hZThgawAACwNCsgN-cA9FtY1XRaNwYOEDzmcpDe3YFQ" },
      { id: "ps2_p14", name: "PES 2014", img: "./ps2/pes 2014.jpg", link: "https://mega.nz/file/0AdiSaCA#ZtmQD5_y8hYKW_dvtcpJWgUYRscdtz8-hM0yH0Pin5g" }
    ]
  },
  ps3: {
    name: "PlayStation 3",
    fifa: [
      { id: "ps3_fs", name: "FIFA STREET", img: "./ps3/FIFA STREET.jpg", link: "https://mega.nz/file/1Ec2XSrC#cPoIRzUrJV7sQutpgGI9Q1sUZPFjONslhOxq9RQJT60" },
      { id: "ps3_f15", name: "FIFA 15", img: "./ps3/FIFA 15.jpg", link: "https://mega.nz/file/tdNDURTQ#065s5m5YCoX4mPsF3yNGguNQ8X8L7miHAVv1edsmGRo" },
      { id: "ps3_f18", name: "FIFA 18", img: "./ps3/FIFA 18.jpg", link: "https://mega.nz/file/pMsUUBRB#xioxXJwM8-A3qCcMlUt6_NnyYFRqPEIR006C615Ajp0" },
    ],
    pes: [
      { id: "ps3_p08", name: "PES 2008", img: "./ps3/PES 2008.png", link: "https://mega.nz/file/NA91GZIR#Sc-Yw89sxMik01P2rIdxSTOROdqxSJDIu-48TFzuDX8" },
      { id: "ps3_p09", name: "PES 2009", img: "./ps3/PES 2009.jpg", link: "https://mega.nz/file/wU9TDL7K#PmD6LXptfhQGznWM6bojOnSzIvXKQo6KcgvpQZ8WCik" },
      { id: "ps3_p10", name: "PES 2010", img: "./ps3/PES 2010.png", link: "https://mega.nz/file/kBVhSIJJ#tAGH_tDiRMA_Izo5AIGaoMhTvgA08-Uz25JXu7wj5oc" },
      { id: "ps3_p11", name: "PES 2011", img: "./ps3/PES 2011.png", link: "https://mega.nz/file/9U9iXIpD#DybgPqcdnHTfED1Tb85TXZrGs1fqLdFW6Jh6okGorbI" },
      { id: "ps3_p12", name: "PES 2012", img: "./ps3/PES 2012.jpg", link: "https://mega.nz/file/AA9ymSII#kZSXBZ3zy_Tibel-5Yz_Wue-dV-LQPry6Hhb6BuVDHU" },
      { id: "ps3_p13", name: "PES 2013", img: "./ps3/PES 2013.png", link: "https://mega.nz/file/tB1jTT4S#VbIQY2aX4imhtipB3khp7wsdp2BvVo6I9BGfGDkjUVs" },
      { id: "ps3_p14", name: "PES 2014", img: "./ps3/PES 2014.jpg", link: "https://mega.nz/file/oNkhRAhZ#Qh65kwxFY1fAfiGoAUU2N2H8YoEzULiAi2beBNl-UFA" },
      { id: "ps3_p15", name: "PES 2015", img: "./ps3/PES 2015.jpg", link: "https://mega.nz/file/YRNSmDhC#cPVWRi6Aiye4xng7L6IYvsqy1aavWoCGyj0YFHMqNiY" },
      { id: "ps3_p16", name: "PES 2016", img: "./ps3/PES 2016.jpg", link: "https://mega.nz/file/9VVwSJAK#k5rQRv-9AMt8N1U_ZvVgcwJviguzMvtTctsRFK4YMqU" },
      { id: "ps3_p17", name: "PES 2017", img: "./ps3/PES 2017.jpg", link: "https://mega.nz/file/YIdVjS7S#gZmZsfA6fGYVT-hiM6Ib4FgZF3y-m7zvIjbfAFHI3Cw" },
      { id: "ps3_p18", name: "PES 2018", img: "./ps3/PES 2018.png", link: "https://mega.nz/file/kZ0imTKI#H-izlNeN_iswl2NdXRvtBSzBFl8Uod2sxVFMsHxYiQ8" },
      { id: "ps3_p21", name: "eFootball PES 2021", img: "./ps3/PES 2020.jpg", link: "https://mega.nz/file/EFcizb7Y#GZPYbctBSOmux47CumXTqM0FYYLmFAjv2ZUemaWU9Lo" }
    ]
  },
  ps4: {
    name: "PlayStation 4",
    fifa: [
      { id: "ps4_f01", name: "FIFA EM BREVE", img: "./EMBREVE.png" },
    ],
    pes: [
      { id: "ps4_p01", name: "PES EM BREVE", img: "./EMBREVE.png" },
    ]
  },
  xbox360: {
    name: "Xbox 360",
    fifa: [
      { id: "x360_f12", name: "FIFA 12", img: "./xbox360/FIFA 12.jpg" },
      { id: "x360_f14", name: "FIFA 14", img: "./xbox360/FIFA 14.jpg", link: "https://mega.nz/file/FVV3EQ6Q#jzYyEGpTIxKREikU0ncMMjWYGKUpM5WWisiJadqY9fk" },
      { id: "x360_f15", name: "FIFA 15", img: "./xbox360/FIFA 15.jpg", link: "https://mega.nz/file/kZtExTZA#aeMj5tdaBKY-SWPEFUQTB8OOwN6lyUCPoUshe4ASFWg" },
      { id: "x360_f16", name: "FIFA 16", img: "./xbox360/FIFA 16.jpg", link: "https://mega.nz/file/UYkhAbgQ#H-QThqqIRUGI1ZaJIr0OKfOenGEMOBDNb9U9E1KG4Mc" },
      { id: "x360_f17", name: "FIFA 17", img: "./xbox360/FIFA 17.jpg", link: "https://mega.nz/file/kU8QERLL#B6bQ0wyfaNhIXqk9g7IzV8is9aZqIDjY1fi62E5cm-0" },
      { id: "x360_f18", name: "FIFA 18", img: "./xbox360/FIFA 18.jpg", link: "https://mega.nz/file/wcFBgJIb#4iPBHOJt3jlYbmMqgasCV1t39zxEPesXK-BPQ-9twvA" },
      { id: "x360_f19", name: "FIFA 19 – Legacy Edition", img: "./xbox360/FIFA 19.jpg", link: "https://mega.nz/file/wQsmlCIZ#bf9kqw2vq30aIR7GvlgZJphq_rso6ROZocUfU4M8FkI" }
    ],
    pes: [
      { id: "x360_p08", name: "PES 2008", img: "./xbox360/PES 2008.jpg", link: "https://mega.nz/file/1YVTlJxB#b_5r38FH6y0yExSaawGg8nKVutuc0LOQ0aE_nXT9ph8" },
      { id: "x360_p09", name: "PES 2009", img: "./xbox360/PES 2009.jpg", link: "https://mega.nz/file/JEUxBbKA#UWVmKnEh67DQ4D7RX6oH4RKu64OcrtQW2SaewyPCsO4" },
      { id: "x360_p10", name: "PES 2010", img: "./xbox360/PES 2010.jpg", link: "https://mega.nz/file/sFkQzYKb#fGn7IV4V1V4C5BUa-YMbqAcNmTgZAURrPFugFpMSg9Q" },
      { id: "x360_p11", name: "PES 2011", img: "./xbox360/PES 2011.jpg", link: "https://mega.nz/file/JdV1xY5J#oX-9sb02s4r0lKy2BUlFFY4_uziZ9CSm3YoJSpWQ95w" },
      { id: "x360_p12", name: "PES 2012", img: "./xbox360/PES 2012.jpg", link: "https://mega.nz/file/JEMSzS5L#tEIMCWdCl15G3B4W7UZZ-euNGQ5rwU2Uf3bp1kdNJRU" },
      { id: "x360_p13", name: "PES 2013", img: "./xbox360/PES 2013.jpg", link: "https://mega.nz/file/xNE3iIbD#X7wOZy11CLmaNC8OdtxbBBMMCHOma3jG-tRE2d48-Lw" },
      { id: "x360_p14", name: "PES 2014", img: "./xbox360/PES 2014.jpg", link: "https://mega.nz/file/5ZdByIoI#8mBQXeErfgR5K53KisL6WqsayeQGQ9foj-E5ZQcc06s" },
      { id: "x360_p15", name: "PES 2015", img: "./xbox360/PES 2015.jpg", link: "https://mega.nz/file/EIEiga6S#zTz0GtM2sWZIZVD4-jffmPYLxuYIONze0sSr_PAsRN0" },
      { id: "x360_p17", name: "PES 2017", img: "./xbox360/PES 2017.jpg", link: "https://mega.nz/file/RRFQWLrT#kuiTdFzy7UGzh4ZMmm2a3T_Q43hDUT1fIvhV801f058" },
      { id: "x360_p18", name: "PES 2018", img: "./xbox360/PES 2018.jpg", link: "https://mega.nz/file/MEVhkALC#h-T0kg0_4AFVIU4yPh6uIrXP9v-kppBL2mDtQZeC5Dg" }
    ]
  }
};

// Função helper para transformar o objeto 'database' em um array plano de jogos
function flattenDatabase(db) {
  let games = [];
  Object.keys(db).forEach(key => {
    const platformData = db[key];
    // Mapear nome da chave para o nome usado nos filtros
    let platformName = "Outros";
    if (key === 'psp') platformName = "PSP";
    if (key === 'ps2') platformName = "PS2";
    if (key === 'ps3') platformName = "PS3";
    if (key === 'ps4') platformName = "PS4";
    if (key === 'xbox360') platformName = "Xbox 360";

    const allGames = [...(platformData.fifa || []), ...(platformData.pes || [])];

    allGames.forEach(g => {
      if (!g.id) return; // Pular placeholders vazios se não tiverem ID
      games.push({
        id: g.id,
        name: g.name,
        platform: platformName,
        link: g.link || "", // Usa o link do banco de dados se existir
        img: g.img
      });
    });
  });
  return games;
}

export default function App() {
  const [clientMode, setClientMode] = useState(false);
  const [clientGames, setClientGames] = useState([]);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const data = params.get('data');
    if (data) {
      try {
        const decoded = JSON.parse(atob(data));
        setClientGames(decoded);
        setClientMode(true);
      } catch (e) {
        console.error("Erro ao decodificar dados", e);
      }
    }
  }, []);

  if (clientMode) {
    return <ClientView games={clientGames} />;
  }

  return <AdminView />;
}

// --- MODO ADMINISTRADOR ---
function AdminView() {
  const [games, setGames] = useState(() => {
    const saved = localStorage.getItem('my_game_catalog_v2');
    if (saved) return JSON.parse(saved);
    // Se não tiver salvo, carrega o database inicial
    return flattenDatabase(INITIAL_DATABASE);
  });

  const [selectedGames, setSelectedGames] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [activePlatform, setActivePlatform] = useState("Todos");
  const [copied, setCopied] = useState(false);

  // Modais e Edição
  const [showAddModal, setShowAddModal] = useState(false);
  const [gameToEdit, setGameToEdit] = useState(null); // Jogo sendo editado
  const [showMobileCart, setShowMobileCart] = useState(false);

  // Estado para novo jogo (adicionado manualmente)
  const [newGame, setNewGame] = useState({ name: '', platform: 'PSP', link: '', img: '' });

  // Salvar alterações
  useEffect(() => {
    localStorage.setItem('my_game_catalog_v2', JSON.stringify(games));
  }, [games]);

  const filteredGames = useMemo(() => {
    return games.filter(game => {
      const matchesSearch = game.name.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesPlatform = activePlatform === "Todos" || game.platform === activePlatform;
      return matchesSearch && matchesPlatform;
    });
  }, [games, searchTerm, activePlatform]);

  const toggleGameSelection = (game) => {
    // Se o jogo não tiver link, avisar
    if (!game.link) {
      if (window.confirm(`O jogo ${game.name} ainda não tem link de download. Deseja editar agora?`)) {
        openEditModal(game);
      }
      return;
    }

    if (selectedGames.find(g => g.id === game.id)) {
      setSelectedGames(selectedGames.filter(g => g.id !== game.id));
    } else {
      setSelectedGames([...selectedGames, game]);
    }
  };

  const openEditModal = (game) => {
    setGameToEdit({ ...game }); // Copia o objeto para edição
  };

  const handleSaveEdit = (e) => {
    e.preventDefault();
    if (!gameToEdit) return;

    // Atualiza a lista principal de jogos
    setGames(games.map(g => g.id === gameToEdit.id ? gameToEdit : g));

    // Atualiza também se estiver selecionado
    if (selectedGames.find(g => g.id === gameToEdit.id)) {
      setSelectedGames(selectedGames.map(g => g.id === gameToEdit.id ? gameToEdit : g));
    }

    setGameToEdit(null);
  };

  const handleAddGame = (e) => {
    e.preventDefault();
    if (!newGame.name || !newGame.link) return;
    const gameToAdd = { ...newGame, id: Date.now().toString() };
    setGames([...games, gameToAdd]);
    setNewGame({ name: '', platform: 'PSP', link: '', img: '' });
    setShowAddModal(false);
  };

  const deleteFromLibrary = (id) => {
    if (window.confirm("Deseja eliminar este jogo da sua biblioteca permanentemente?")) {
      setGames(games.filter(g => g.id !== id));
      setSelectedGames(selectedGames.filter(g => g.id !== id));
    }
  };

  const shortenUrl = async (longUrl) => {
    try {
      const response = await fetch(`https://tinyurl.com/api-create.php?url=${encodeURIComponent(longUrl)}`);
      if (response.ok) {
        return await response.text();
      }
    } catch (error) {
      console.error("Erro ao encurtar link:", error);
    }
    return longUrl; // Fallback se falhar
  };

  const handleGenerateLink = async () => {
    if (selectedGames.length === 0) return;
    const jsonString = JSON.stringify(selectedGames);
    const encodedData = btoa(jsonString);
    const shareUrl = `${window.location.origin}/?data=${encodedData}`;

    // Tenta encurtar o link para "camuflar"
    const finalLink = await shortenUrl(shareUrl);

    const message = `✅ Acesso liberado

Os arquivos referentes à sua compra já estão disponíveis.

🔗 Clique no link abaixo para acessar o conteúdo:
${finalLink}

Em caso de dúvidas, fale com o suporte.`;

    try {
      await navigator.clipboard.writeText(message);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Erro ao copiar', err);
      prompt("Copie a mensagem abaixo:", message);
    }
  };

  // Reset database (útil para debug ou atualizar lista inicial)
  const resetDatabase = () => {
    if (window.confirm("Isso irá resetar todos os links editados para o padrão. Tem certeza?")) {
      setGames(flattenDatabase(INITIAL_DATABASE));
      setSelectedGames([]);
    }
  }

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans">
      {/* Header Admin */}
      <header className="sticky top-0 z-30 bg-white border-b border-slate-200 px-4 py-3 md:px-8 md:py-6 shadow-sm">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center justify-between w-full sm:w-auto">
            <div className="flex items-center gap-2">
              <img src="/logo.png" alt="Logo" className="h-10 sm:h-12 w-auto object-contain" />
            </div>
            <button onClick={() => setShowAddModal(true)} className="sm:hidden bg-indigo-600 text-white p-3 rounded-xl shadow-lg active:scale-95 transition-transform">
              <Plus size={24} />
            </button>
          </div>

          <div className="relative w-full sm:max-w-xs">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
            <input
              type="text" placeholder="Procurar jogo..."
              className="w-full pl-10 pr-4 py-3.5 bg-slate-100 border-none rounded-2xl focus:ring-2 focus:ring-indigo-500 transition-all text-base"
              value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="hidden sm:flex items-center gap-2">
            <button onClick={resetDatabase} className="text-xs text-slate-400 hover:text-red-500 underline mr-2">Resetar DB</button>
            <button onClick={() => setShowAddModal(true)} className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-3 rounded-xl font-bold text-sm shadow-md transition-all active:scale-95">
              <Plus size={18} /> Adicionar
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto p-4 md:p-8 pb-32">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-8">
            <div className="flex gap-2 mb-6 overflow-x-auto pb-2 no-scrollbar px-1">
              {PLATFORMS.map(p => (
                <button key={p} onClick={() => setActivePlatform(p)}
                  className={`px-6 py-3 rounded-2xl text-sm font-bold whitespace-nowrap transition-all border-2 flex-shrink-0 ${activePlatform === p ? 'bg-indigo-600 border-indigo-600 text-white shadow-lg transform scale-105' : 'bg-white border-slate-200 text-slate-500 hover:border-indigo-300 shadow-sm'}`}>
                  {p}
                </button>
              ))}
            </div>

            {/* GRID MOVEL OTIMIZADO: 2 Colunas no Mobile */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4">
              {filteredGames.map(game => {
                const isSelected = selectedGames.find(g => g.id === game.id);
                return (
                  <div key={game.id} onClick={() => toggleGameSelection(game)}
                    className={`relative group rounded-2xl border-2 transition-all cursor-pointer overflow-hidden ${isSelected ? 'bg-indigo-50 border-indigo-500 shadow-md ring-2 ring-indigo-200' : 'bg-white border-white shadow-sm'}`}>

                    {/* Capa do Jogo */}
                    <div className="aspect-[3/4] bg-slate-200 w-full relative">
                      {game.img && game.img !== "EMBREVE.png" ? (
                        <img src={game.img} alt={game.name} className="w-full h-full object-cover"
                          onError={(e) => { e.target.onerror = null; e.target.style.display = 'none'; e.target.nextSibling.style.display = 'flex' }} />
                      ) : null}
                      <div className="absolute inset-0 flex items-center justify-center bg-slate-200 text-slate-400" style={{ display: (game.img && game.img !== "EMBREVE.png") ? 'none' : 'flex' }}>
                        <ImageOff size={24} />
                      </div>
                      {/* Gradiente para texto */}
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/40 to-transparent flex flex-col justify-end p-3">
                        <span className={`self-start text-[8px] sm:text-[10px] font-black px-1.5 py-0.5 rounded-md uppercase mb-1 shadow-sm ${game.platform === 'PS4' ? 'bg-blue-600 text-white' :
                          game.platform === 'PS3' ? 'bg-blue-400 text-white' :
                            game.platform === 'PS2' ? 'bg-slate-800 text-white' :
                              game.platform === 'Xbox 360' ? 'bg-green-600 text-white' : 'bg-orange-500 text-white'
                          }`}>{game.platform}</span>
                        <h3 className="font-bold text-white text-xs sm:text-sm leading-tight drop-shadow-md line-clamp-2">{game.name}</h3>
                      </div>
                    </div>

                    {/* Ações */}
                    <div className="p-2 sm:p-3 flex items-center justify-between bg-white text-xs">
                      <div className="flex flex-col">
                        <span className={`font-black ${game.link ? 'text-emerald-500' : 'text-red-400'}`}>
                          {game.link ? 'LINK OK' : 'SEM LINK'}
                        </span>
                      </div>
                      <div className="flex gap-1 sm:gap-2">
                        <button onClick={(e) => { e.stopPropagation(); openEditModal(game); }}
                          className="p-1.5 sm:p-2 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-full transition-colors" title="Editar Link">
                          <Edit2 size={16} />
                        </button>
                        {isSelected ? (
                          <div className="p-1.5 sm:p-2 bg-indigo-600 rounded-full text-white shadow-md">
                            <CheckCircle size={16} />
                          </div>
                        ) : (
                          <div className="p-1.5 sm:p-2 border border-slate-200 rounded-full text-transparent group-hover:border-slate-300">
                            <CheckCircle size={16} />
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="hidden lg:block lg:col-span-4">
            <div className="bg-slate-900 rounded-3xl p-6 text-white sticky top-28 border border-slate-800 shadow-xl">
              <SelectionPanel selectedGames={selectedGames} removeGame={(id) => setSelectedGames(selectedGames.filter(g => g.id !== id))} handleGenerateLink={handleGenerateLink} copied={copied} />
            </div>
          </div>
        </div>
      </main>

      {/* Modal Mobile */}
      {selectedGames.length > 0 && (
        <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 px-4 pb-6 pt-4 bg-gradient-to-t from-slate-50 to-transparent">
          <button onClick={() => setShowMobileCart(true)} className="w-full bg-slate-900 text-white rounded-2xl py-5 px-6 flex items-center justify-between shadow-2xl active:scale-95 transition-transform">
            <div className="flex items-center gap-3">
              <div className="bg-indigo-500 text-white w-8 h-8 rounded-full flex items-center justify-center font-black text-sm">{selectedGames.length}</div>
              <span className="font-bold text-base">Gerar Link ({selectedGames.length})</span>
            </div>
            <ChevronUp size={24} className="animate-bounce" />
          </button>
        </div>
      )}

      {/* Modal Edição de Link (Simples e Rápido) */}
      {gameToEdit && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-slate-900/80 backdrop-blur-sm" onClick={() => setGameToEdit(null)} />
          <form onSubmit={handleSaveEdit} className="relative bg-white w-full max-w-sm sm:max-w-md rounded-3xl p-6 shadow-2xl animate-in fade-in zoom-in duration-200">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-black text-slate-800">EDITAR LINK</h2>
              <button type="button" onClick={() => setGameToEdit(null)} className="p-3 bg-slate-100 rounded-full active:bg-slate-200"><X size={24} /></button>
            </div>
            <div className="mb-6">
              <p className="text-sm font-bold text-slate-500 mb-1">Jogo:</p>
              <p className="text-lg font-black text-slate-800 leading-tight">{gameToEdit.name} ({gameToEdit.platform})</p>
            </div>
            <div className="space-y-4">
              <input autoFocus required type="text" placeholder="Cole o Link de Download aqui..."
                className="w-full p-4 bg-indigo-50 border-2 border-indigo-100 rounded-2xl outline-none font-mono text-base focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/20 transition-all"
                value={gameToEdit.link} onChange={e => setGameToEdit({ ...gameToEdit, link: e.target.value })} />
            </div>
            <button type="submit" className="w-full bg-indigo-600 text-white font-black py-4 rounded-2xl mt-8 flex items-center justify-center gap-2 hover:bg-indigo-700 active:scale-95 transition-all text-lg shadow-lg shadow-indigo-200">
              <Save size={24} /> SALVAR LINK
            </button>
            <button type="button" onClick={() => {
              if (window.confirm("Apagar este jogo?")) { deleteFromLibrary(gameToEdit.id); setGameToEdit(null); }
            }} className="w-full text-red-500 font-bold py-4 mt-2 text-sm active:bg-red-50 rounded-xl">Excluir Jogo da Lista</button>
          </form>
        </div>
      )}

      {/* Modal Novo Jogo */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-slate-900/80 backdrop-blur-sm" onClick={() => setShowAddModal(false)} />
          <form onSubmit={handleAddGame} className="relative bg-white w-full max-w-sm sm:max-w-md rounded-3xl p-6 shadow-2xl animate-in fade-in zoom-in duration-200 text-slate-900">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-black text-slate-800">Adicionar Jogo</h2>
              <button type="button" onClick={() => setShowAddModal(false)} className="p-3 bg-slate-100 rounded-full active:bg-slate-200"><X size={24} /></button>
            </div>
            <div className="space-y-4">
              <input required type="text" placeholder="Nome do Jogo" className="w-full p-4 bg-slate-50 border rounded-2xl outline-none focus:ring-2 focus:ring-indigo-500" value={newGame.name} onChange={e => setNewGame({ ...newGame, name: e.target.value })} />
              <select className="w-full p-4 bg-slate-50 border rounded-2xl outline-none focus:ring-2 focus:ring-indigo-500" value={newGame.platform} onChange={e => setNewGame({ ...newGame, platform: e.target.value })}>
                {PLATFORMS.filter(p => p !== "Todos").map(p => <option key={p} value={p}>{p}</option>)}
              </select>
              <input type="text" placeholder="Link da Capa (Opcional)" className="w-full p-4 bg-slate-50 border rounded-2xl outline-none focus:ring-2 focus:ring-indigo-500" value={newGame.img} onChange={e => setNewGame({ ...newGame, img: e.target.value })} />
              <input required type="text" placeholder="Link Download" className="w-full p-4 bg-slate-50 border rounded-2xl outline-none font-mono focus:ring-2 focus:ring-indigo-500" value={newGame.link} onChange={e => setNewGame({ ...newGame, link: e.target.value })} />
            </div>
            <button type="submit" className="w-full bg-indigo-600 text-white font-black py-4 rounded-2xl mt-8 flex items-center justify-center gap-2 hover:bg-indigo-700 active:scale-95 transition-all text-lg shadow-lg">
              <Save size={24} /> SALVAR JOGO
            </button>
          </form>
        </div>
      )}

      {showMobileCart && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={() => setShowMobileCart(false)} />
          <div className="absolute bottom-0 left-0 right-0 bg-slate-900 rounded-t-[2.5rem] p-6 text-white max-h-[90vh] overflow-y-auto shadow-2xl animate-in slide-in-from-bottom duration-300">
            <SelectionPanel selectedGames={selectedGames} removeGame={(id) => setSelectedGames(selectedGames.filter(g => g.id !== id))} handleGenerateLink={handleGenerateLink} copied={copied} isMobile={true} />
          </div>
        </div>
      )}
    </div>
  );
}

function SelectionPanel({ selectedGames, removeGame, handleGenerateLink, copied, isMobile = false }) {
  return (
    <div className="flex flex-col h-full">
      <div className={`space-y-3 mb-6 overflow-y-auto custom-scrollbar ${isMobile ? 'max-h-[50vh]' : 'max-h-[400px]'}`}>
        {selectedGames.map(game => (
          <div key={game.id} className="flex items-center justify-between bg-slate-800/50 p-3 rounded-2xl border border-slate-700">
            <div className="flex items-center gap-3 overflow-hidden">
              {/* Mini Capa */}
              <div className="w-12 h-12 bg-slate-700 rounded-lg flex-shrink-0 overflow-hidden">
                {game.img ? <img src={game.img} className="w-full h-full object-cover" onError={(e) => e.target.style.display = 'none'} /> : null}
              </div>
              <div className="truncate pr-2">
                <p className="font-bold text-sm truncate uppercase tracking-tight">{game.name}</p>
                <p className={`text-[10px] font-black uppercase tracking-wider ${game.platform === 'Xbox 360' ? 'text-green-400' : 'text-indigo-400'}`}>{game.platform}</p>
              </div>
            </div>
            <button onClick={() => removeGame(game.id)} className="text-slate-500 p-3 hover:text-red-400 transition-colors active:bg-slate-700 rounded-full"><Trash2 size={20} /></button>
          </div>
        ))}
        {selectedGames.length === 0 && <div className="text-center text-slate-500 py-10 opacity-50">Nenhum jogo selecionado</div>}
      </div>
      <button onClick={handleGenerateLink}
        className={`w-full font-black py-5 rounded-2xl flex items-center justify-center gap-3 transition-all active:scale-95 shadow-xl text-lg ${copied ? 'bg-emerald-500 text-white shadow-emerald-500/20' : 'bg-indigo-500 text-white shadow-indigo-500/20'}`}>
        {copied ? <CheckCircle size={24} /> : <LinkIcon size={24} />}
        {copied ? "LINK COPIADO!" : "GERAR LINK P/ CLIENTE"}
      </button>
    </div>
  );
}

// --- MODO CLIENTE ---
function ClientView({ games }) {
  return (
    <div className="min-h-screen bg-slate-100 font-sans pb-20">
      <header className="bg-indigo-600 text-white p-6 shadow-lg mb-8 text-center sticky top-0 z-30">
        <h1 className="text-2xl font-black tracking-tight mb-2">SEUS JOGOS CHEGARAM! 🎮</h1>
        <p className="text-indigo-100 text-sm">Clique abaixo para baixar cada jogo.</p>
      </header>
      <main className="max-w-md mx-auto px-4 space-y-4">
        {games.map((game, index) => (
          <div key={index} className="bg-white rounded-3xl shadow-md border-b-4 border-indigo-100 hover:border-indigo-200 transition-all transform hover:-translate-y-1 overflow-hidden">
            {/* Capa Cliente */}
            <div className="h-48 bg-slate-200 w-full relative">
              {game.img && game.img !== "EMBREVE.png" ? (
                <img src={game.img} alt={game.name} className="w-full h-full object-cover" />
              ) : (
                <div className="flex items-center justify-center h-full text-slate-400"><Gamepad2 size={48} /></div>
              )}
              <div className="absolute top-3 left-3">
                <span className={`text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-wider shadow-sm ${game.platform === 'Xbox 360' ? 'bg-green-100 text-green-700' : 'bg-indigo-100 text-indigo-700'
                  }`}>
                  {game.platform}
                </span>
              </div>
            </div>

            <div className="p-6">
              <h2 className="text-xl font-black text-slate-800 mb-6 leading-tight">{game.name.toUpperCase()}</h2>
              <a href={game.link} target="_blank" rel="noopener noreferrer"
                className="block w-full bg-indigo-600 hover:bg-indigo-700 text-white font-black text-center py-4 rounded-2xl shadow-lg shadow-indigo-200 active:scale-95 transition-all text-base flex items-center justify-center gap-2">
                <Download size={24} />
                BAIXAR JOGO AGORA
              </a>
            </div>
          </div>
        ))}
        <div className="text-center mt-12 opacity-50">
          <p className="text-xs font-bold text-slate-400">JOGOS SELECIONADOS PELO VENDEDOR</p>
        </div>
      </main>
    </div>
  );
}

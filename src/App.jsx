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
  ImageOff,
  ShoppingCart,
  CreditCard,
  Lock,
  Settings,

  ArrowLeft,
  MessageCircle,
  ChevronDown,
  Loader2,
  Check
} from 'lucide-react';

import pspImg from './PSP.png';
import ps2Img from './PS2.png';
import ps3Img from './PS3.png';
import emBreveImg from './EMBREVE.png';
import xbox360Img from './xbox360.png';

// Plataformas disponíveis
const PLATFORMS = ["Todos", "PSP", "PS2", "PS3", "PS4", "Xbox 360"];
const GAME_PRICE = 20;

const PLATFORM_LOGOS = {
  PSP: { color: "from-blue-400 to-blue-600", accent: "bg-blue-600", text: "text-blue-600", border: "border-blue-600", icon: Gamepad2, label: "HANDHELD" },
  PS2: { color: "from-blue-600 to-blue-900", accent: "bg-blue-800", text: "text-blue-800", border: "border-blue-800", icon: Gamepad2, label: "LEGENDARY" },
  PS3: { color: "from-slate-700 to-slate-900", accent: "bg-slate-800", text: "text-slate-800", border: "border-slate-800", icon: Gamepad2, label: "HD ERA" },
  PS4: { color: "from-indigo-600 to-indigo-900", accent: "bg-indigo-800", text: "text-indigo-800", border: "border-indigo-800", icon: Gamepad2, label: "MODERN" },
  "Xbox 360": { color: "from-green-500 to-green-700", accent: "bg-green-600", text: "text-green-600", border: "border-green-600", icon: Gamepad2, label: "MICROSOFT" },
  "Todos": { color: "from-indigo-600 to-indigo-900", accent: "bg-indigo-600", text: "text-indigo-600", border: "border-indigo-600", icon: Gamepad2, label: "ALL" }
};

const DEFAULT_CHECKOUT_LINKS = {
  20: "https://www.ggcheckout.com/checkout/v2/EG4XxmScaufriyPctuhN",
  40: "https://www.ggcheckout.com/checkout/v2/zTK2wNRv0zci9GVLtMk2",
  60: "https://www.ggcheckout.com/checkout/v2/WHs4aCNV0dsqlxPWZGZj",
  80: "",
  100: ""
};

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
      { id: "x360_f12", name: "FIFA 12", img: "./xbox360/FIFA 12.jpg", link: "https://mega.nz/file/0Ed0kLAJ#nUEaKo4WByzkFRi9_EHRA1R6zT0_3FeQevIt43Xob8Y" },
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

// --- FUNÇÕES HELPER ---
function flattenDatabase(db) {
  let games = [];
  Object.keys(db).forEach(key => {
    const platformData = db[key];
    let platformName = "Outros";
    if (key === 'psp') platformName = "PSP";
    if (key === 'ps2') platformName = "PS2";
    if (key === 'ps3') platformName = "PS3";
    if (key === 'ps4') platformName = "PS4";
    if (key === 'xbox360') platformName = "Xbox 360";

    const allGames = [...(platformData.fifa || []), ...(platformData.pes || [])];

    allGames.forEach(g => {
      if (!g.id) return;
      games.push({
        id: g.id,
        name: g.name,
        platform: platformName,
        link: g.link || "",
        img: g.img,
        price: GAME_PRICE
      });
    });
  });
  return games;
}

const EMAIL_HASH = "6c1d162092e4828cb7abb1d6e802a47b693d79185e5b63022128f5e1be95ff42";
const PASS_HASH = "bb3abc9277e6bb56f44ff114d3fabb6fc9e2f5cfaacef38b30809d2a43cc8b5c";

async function sha256(message) {
  const msgBuffer = new TextEncoder().encode(message);
  const hashBuffer = await crypto.subtle.digest('SHA-256', msgBuffer);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}

// --- APP ---
export default function App() {
  const [clientGames, setClientGames] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState('store');
  const [selectedPlatform, setSelectedPlatform] = useState(null);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const data = params.get('data');
    const admin = params.get('admin');

    if (data) {
      try {
        const jsonString = atob(data);
        const parsedGames = JSON.parse(jsonString);
        setClientGames(parsedGames);
        setViewMode('client');
      } catch (err) {
        console.error("Erro ao decodificar dados", err);
      }
    } else if (admin !== null) {
      const token = localStorage.getItem('admin_token');
      if (token === 'LOGGED_IN') {
        setIsAuthenticated(true);
      } else {
        setIsAuthenticated(false);
      }
      setViewMode('admin');
    } else {
      setViewMode('store');
    }
    setLoading(false);
  }, []);

  if (loading) return <div className="min-h-screen bg-slate-50 flex items-center justify-center">Carregando...</div>;

  if (viewMode === 'client' && clientGames) {
    return <ClientView games={clientGames} />;
  }

  if (viewMode === 'admin') {
    if (isAuthenticated) {
      return <AdminView onLogout={() => {
        localStorage.removeItem('admin_token');
        setIsAuthenticated(false);
        window.location.search = '';
      }} />;
    } else {
      return <Login onLogin={() => setIsAuthenticated(true)} />;
    }
  }

  if (viewMode === 'store') {
    if (!selectedPlatform) {
      return <LandingPage onSelectPlatform={setSelectedPlatform} />;
    }
    return <StoreView initialPlatform={selectedPlatform} onBack={() => setSelectedPlatform(null)} />;
  }

  return <StoreView />;
}

// --- PROCESSING VIEW ---
function ProcessingView({ onBack }) {
  return (
    <div className="min-h-screen bg-slate-900 flex flex-col items-center justify-center p-6 text-center">
      <div className="bg-slate-800 p-8 rounded-3xl shadow-2xl max-w-md w-full border border-slate-700">
        <div className="w-20 h-20 bg-indigo-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
          <Loader2 size={40} className="text-indigo-400 animate-spin" />
        </div>

        <h2 className="text-3xl font-black text-white mb-2">Aguardando Pagamento...</h2>
        <p className="text-slate-400 mb-8">
          Abrimos a página de pagamento em uma nova aba.
          <br />
          Conclua o pagamento para receber seus jogos.
        </p>

        <div className="space-y-3">
          <div className="p-4 bg-indigo-900/30 rounded-xl border border-indigo-500/30 flex items-center gap-3 text-left">
            <div className="bg-indigo-500/20 p-2 rounded-lg">
              <Check className="text-indigo-400" size={20} />
            </div>
            <div>
              <p className="text-white font-bold text-sm">Status do Pedido</p>
              <p className="text-indigo-300 text-xs">Aguardando confirmação...</p>
            </div>
          </div>

          <button
            onClick={onBack}
            className="w-full py-4 bg-white text-slate-900 rounded-xl font-bold hover:bg-slate-200 transition-colors mt-4"
          >
            Já realizei o pagamento
          </button>
        </div>
      </div>
    </div>
  );
}

// --- LANDING PAGE (OLD WAY) ---
function LandingPage({ onSelectPlatform }) {
  const platforms = [
    { id: "PSP", name: "PSP", subtitle: "HANDHELD", img: pspImg },
    { id: "ps2", name: "PlayStation 2", subtitle: "LEGENDARY", label: "PS2", img: ps2Img },
    { id: "ps3", name: "PS3", subtitle: "HD ERA", img: ps3Img },
    { id: "ps4", name: "PS4", subtitle: "MODERN", extra: "EM BREVE", img: emBreveImg },
    { id: "xbox360", name: "Xbox 360", subtitle: "MICROSOFT", img: xbox360Img }
  ];

  return (
    <div className="min-h-screen bg-slate-900 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-900 via-slate-900 to-black flex flex-col items-center justify-center p-4">

      <header className="absolute top-0 left-0 w-full p-6 flex justify-between items-center z-10">
        <img src="/logo.png" alt="Nostalgia Fut" className="h-12 w-auto object-contain" />
        <a href="?admin=true" className="text-white/20 hover:text-white transition-colors">
          <Lock size={20} />
        </a>
      </header>

      <div className="text-center mb-12 mt-20 md:mt-0">
        <h1 className="text-4xl md:text-6xl font-black text-white tracking-tighter mb-2">ESCOLHA A SUA</h1>
        <h2 className="text-4xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-500 italic transform -skew-x-12">PLATAFORMA</h2>
        <div className="w-24 h-1.5 bg-blue-500 mx-auto mt-4 rounded-full shadow-[0_0_15px_rgba(59,130,246,0.5)]"></div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 max-w-7xl mx-auto w-full px-4">
        {platforms.map((p) => (
          <button
            key={p.id}
            onClick={() => onSelectPlatform(p.label || p.name)}
            className="group relative w-full aspect-[9/16] bg-black/40 border-0 rounded-2xl overflow-hidden hover:shadow-[0_0_30px_rgba(59,130,246,0.3)] transition-all duration-300 transform hover:-translate-y-2"
          >
            {/* Background Image */}
            <div className="absolute inset-0">
              <img src={p.img} alt={p.name} className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
            </div>

            <div className="absolute bottom-0 left-0 w-full p-4 text-center z-10 flex flex-col items-center">
              {p.extra && (
                <span className="text-xl font-black text-white/90 mb-1 block shadow-black drop-shadow-md">{p.extra}</span>
              )}
              {!p.extra && (
                <>
                  <span className="text-[10px] font-bold tracking-[0.2em] text-blue-400 uppercase mb-1 drop-shadow-md">{p.subtitle}</span>
                  <span className="text-2xl font-black text-white italic leading-none drop-shadow-md">{p.name}</span>
                </>
              )}
            </div>
          </button>
        ))}
      </div>

      <footer className="absolute bottom-6 text-[10px] font-bold text-white/20 tracking-widest">
        INSTAGRAM / TIKTOK @NOSTALGIAFUTP8 © 2026
      </footer>
    </div>
  );
}

// --- LOJA ---
function StoreView({ initialPlatform = "Todos", onBack }) {
  const [games] = useState(() => {
    const saved = localStorage.getItem('my_game_catalog_v2');
    if (saved) return JSON.parse(saved);
    return flattenDatabase(INITIAL_DATABASE);
  });

  const [checkoutLinks] = useState(() => {
    const saved = localStorage.getItem('checkout_links_config');
    if (saved) return JSON.parse(saved);
    return DEFAULT_CHECKOUT_LINKS;
  });

  const [cart, setCart] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedPlatform, setSelectedPlatform] = useState(null);
  const [activePlatform, setActivePlatform] = useState(initialPlatform);
  const [showCartMobile, setShowCartMobile] = useState(false);
  const [isCheckoutLoading, setIsCheckoutLoading] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  const isSinglePlatform = initialPlatform !== "Todos";
  const theme = PLATFORM_LOGOS[activePlatform] || PLATFORM_LOGOS["Todos"];

  const filteredGames = useMemo(() => {
    return games.filter(game => {
      const matchesSearch = game.name.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesPlatform = activePlatform === "Todos" || game.platform === activePlatform;
      return matchesSearch && matchesPlatform;
    });
  }, [games, searchTerm, activePlatform]);

  const toggleCart = (game) => {
    if (cart.find(g => g.id === game.id)) {
      setCart(cart.filter(g => g.id !== game.id));
    } else {
      setCart([...cart, game]);
      // Auto open remove - User prefers manual control
    }
  };

  const handleCheckout = async () => {
    if (cart.length === 0) return;
    setIsCheckoutLoading(true);

    const total = cart.length * GAME_PRICE;

    try {
      // 1. Prepare payload
      const payload = {
        cart: cart.map(item => ({ id: item.id, name: item.name, platform: item.platform, price: item.price })),
        total: total,
        platform: activePlatform,
        timestamp: new Date().toISOString()
      };

      // 2. Send to Webhook
      const response = await fetch("https://www.nostalgia.shop/webhook", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
      });

      if (response.ok) {
        const data = await response.json();
        // If webhook returns a specific payment URL, use it
        if (data && data.url) {
          setIsCheckoutLoading(false);
          setIsProcessing(true);
          window.open(data.url, '_blank');
          return;
        }
      }
    } catch (error) {
      console.error("Webhook error:", error);
      // Fall through to default behavior on error
    }

    // 3. Fallback to existing logic if webhook doesn't provide URL or fails
    const link = checkoutLinks[total];
    setIsCheckoutLoading(false);

    if (link) {
      setIsProcessing(true);
      window.open(link, '_blank');
    } else {
      alert(`Não existe um link configurado para o valor total de R$ ${total},00 (${cart.length} jogos).\n\nPor favor, contate o admin ou adicione mais jogos.`);
    }
  };

  if (isProcessing) {
    return <ProcessingView onBack={() => setIsProcessing(false)} />;
  }

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans">
      <header className={`sticky top-0 z-30 bg-gradient-to-r ${theme.color} text-white shadow-md border-b border-white/10 px-4 py-3 md:px-8 md:py-4 transition-all duration-500`}>
        <div className="max-w-6xl mx-auto flex items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            {onBack && (
              <button onClick={onBack} className="group flex items-center gap-2 text-white/80 hover:text-white font-bold text-sm bg-white/10 hover:bg-white/20 px-4 py-2 rounded-full transition-all backdrop-blur-sm">
                <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
                <span className="hidden sm:inline">VOLTAR</span>
              </button>
            )}
            <div className="flex items-center gap-2">
              {/* Logo Filter fallback to separate visual if needed, but keeping main logo for now */}
              <img src="/logo.png" alt="Logo" className="h-10 sm:h-12 w-auto object-contain brightness-0 invert" />
            </div>
            {isSinglePlatform && (
              <span className="hidden md:inline-block px-3 py-1 bg-white/20 rounded-lg text-xs font-black tracking-widest uppercase text-white/90">
                {activePlatform}
              </span>
            )}
          </div>

          <div className="relative w-full max-w-md hidden sm:block">
            <Search className={`absolute left-3 top-1/2 -translate-y-1/2 ${theme.text}`} size={20} />
            <input
              type="text" placeholder={`Buscar jogos de ${activePlatform}...`}
              className="w-full pl-10 pr-4 py-2.5 bg-white text-slate-900 border-none rounded-2xl focus:ring-2 focus:ring-white/50 transition-all font-medium"
              value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="flex items-center gap-4">
            <a href="?admin=true" className="text-white/60 hover:text-white transition-colors" title="Admin">
              <Lock size={16} />
            </a>

            <button onClick={() => setShowCartMobile(true)} className={`relative p-2 bg-white/10 text-white rounded-xl hover:bg-white/20 transition-colors`}>
              <ShoppingCart size={24} />
              {cart.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-white text-indigo-900 text-[10px] font-bold w-5 h-5 flex items-center justify-center rounded-full shadow-sm">
                  {cart.length}
                </span>
              )}
            </button>
          </div>
        </div>
        <div className="sm:hidden mt-3">
          <div className="relative w-full">
            <Search className={`absolute left-3 top-1/2 -translate-y-1/2 ${theme.text}`} size={18} />
            <input
              type="text" placeholder="Buscar..."
              className="w-full pl-10 pr-4 py-2.5 bg-white text-slate-800 border-none rounded-xl focus:ring-2 focus:ring-white/50 transition-all text-sm font-medium"
              value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto p-4 md:p-8 pb-32">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-8">

            {/* Show tabs ONLY if we are in 'Todos' mode */}
            {!isSinglePlatform && (
              <div className="flex gap-2 mb-8 overflow-x-auto pb-2 no-scrollbar px-1">
                {PLATFORMS.map(p => (
                  <button key={p} onClick={() => setActivePlatform(p)}
                    className={`px-5 py-2.5 rounded-2xl text-sm font-bold whitespace-nowrap transition-all border ${activePlatform === p ? 'bg-indigo-600 border-indigo-600 text-white shadow-lg' : 'bg-white border-slate-200 text-slate-600 hover:border-indigo-300 shadow-sm'}`}>
                    {p}
                  </button>
                ))}
              </div>
            )}

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 gap-4">
              {filteredGames.map(game => {
                const inCart = cart.find(g => g.id === game.id);
                return (
                  <div key={game.id}
                    className={`group relative bg-white rounded-2xl border-2 overflow-hidden transition-all hover:shadow-xl ${inCart ? `${theme.border} ring-2 ring-indigo-100` : 'border-slate-100 hover:border-slate-300'}`}>

                    <div className="aspect-[3/4] bg-slate-100 relative overflow-hidden">
                      {game.img && game.img !== "EMBREVE.png" ? (
                        <img src={game.img} alt={game.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                      ) : (
                        <div className="flex items-center justify-center h-full text-slate-300"><Gamepad2 size={32} /></div>
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60" />
                      <div className="absolute top-2 right-2 bg-yellow-400 text-yellow-900 text-xs font-black px-2 py-0.5 rounded shadow-sm">
                        R$ {GAME_PRICE}
                      </div>
                      <div className="absolute bottom-3 left-3 right-3 text-white">
                        <span className="text-[10px] font-black uppercase bg-white/20 backdrop-blur-md px-2 py-0.5 rounded-md mb-1 inline-block">{game.platform}</span>
                        <h3 className="font-bold leading-tight text-sm drop-shadow-sm">{game.name}</h3>
                      </div>
                    </div>

                    <div className="p-3">
                      <button onClick={() => toggleCart(game)}
                        className={`w-full py-3 rounded-xl font-bold text-sm transition-all flex items-center justify-center gap-2 ${inCart ? 'bg-red-50 text-red-500 hover:bg-red-100' : `${theme.accent} text-white hover:opacity-90 shadow-lg`}`}>
                        {inCart ? (
                          <>Remover <Trash2 size={16} /></>
                        ) : (
                          <>Adicionar <Plus size={16} /></>
                        )}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="hidden lg:block lg:col-span-4 ps-4">
            <div className={`sticky top-28`}>
              <CartPanel cart={cart} toggleCart={toggleCart} handleCheckout={handleCheckout} isCheckoutLoading={isCheckoutLoading} theme={theme} />
            </div>
          </div>
        </div>
      </main>

      {/* Floating WhatsApp Button */}
      <a
        href="https://wa.me/5521996567301" // TODO: Add real number
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-24 right-4 z-40 bg-green-500 text-white p-4 rounded-full shadow-lg hover:bg-green-600 transition-all hover:scale-110 flex items-center justify-center"
      >
        <MessageCircle size={28} />
      </a>

      {/* Mobile Cart Scenarios */}
      {/* 1. Minimized Bar (visible when NOT expanded but User has items) */}
      {!showCartMobile && cart.length > 0 && (
        <div
          onClick={() => setShowCartMobile(true)}
          className={`fixed bottom-0 left-0 right-0 z-40 ${theme.accent} text-white p-4 rounded-t-2xl shadow-[0_-5px_20px_rgba(0,0,0,0.1)] cursor-pointer flex items-center justify-between lg:hidden animate-in slide-in-from-bottom duration-300 border-t border-white/20`}
        >
          <div className="flex items-center gap-3">
            <div className="bg-white/20 p-2 rounded-lg">
              <ShoppingCart size={20} />
            </div>
            <div>
              <p className="text-xs font-medium text-white/80">Total ({cart.length} itens)</p>
              <p className="font-black text-lg">R$ {cart.length * GAME_PRICE}</p>
            </div>
          </div>
          <div className="flex items-center gap-2 text-xs font-bold bg-white/20 px-3 py-1.5 rounded-full">
            VER CARRINHO <ChevronUp size={16} />
          </div>
        </div>
      )}

      {showCartMobile && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={() => setShowCartMobile(false)} />
          <div className="absolute bottom-0 left-0 right-0 bg-white rounded-t-[2rem] p-6 max-h-[85vh] overflow-y-auto shadow-2xl animate-in slide-in-from-bottom duration-300">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-black text-slate-800">Seu Carrinho ({cart.length})</h2>
              <button onClick={() => setShowCartMobile(false)} className="p-2 bg-slate-100 rounded-full"><ChevronUp size={24} className="rotate-180" /></button>
            </div>
            <CartPanel cart={cart} toggleCart={toggleCart} handleCheckout={handleCheckout} isMobile isCheckoutLoading={isCheckoutLoading} theme={theme} />
          </div>
        </div>
      )}
    </div>
  );
}

function CartPanel({ cart, toggleCart, handleCheckout, isMobile, theme, isCheckoutLoading }) {
  const total = cart.length * GAME_PRICE;
  // Fallback theme if not provided
  const t = theme || { accent: "bg-indigo-600", color: "from-indigo-600 to-indigo-900" };

  return (
    <div className={`bg-white rounded-3xl p-6 border border-slate-100 shadow-xl ${!isMobile && 'min-h-[400px]'}`}>
      <div className="flex items-center gap-3 mb-6">
        <ShoppingCart className="text-indigo-600" size={24} />
        <h2 className="text-xl font-black text-slate-800">Carrinho</h2>
      </div>

      <div className="space-y-4 mb-8 max-h-[400px] overflow-y-auto custom-scrollbar pr-1">
        {cart.length === 0 ? (
          <div className="text-center py-12 text-slate-400 border-2 border-dashed border-slate-100 rounded-2xl">
            <p>Seu carrinho está vazio.</p>
            <p className="text-sm mt-2">Adicione jogos para começar!</p>
          </div>
        ) : (
          cart.map(game => (
            <div key={game.id} className="flex gap-3 items-center bg-slate-50 p-3 rounded-2xl group">
              <div className="w-12 h-12 bg-white rounded-lg flex-shrink-0 overflow-hidden shadow-sm">
                {game.img ? <img src={game.img} className="w-full h-full object-cover" /> : null}
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-bold text-sm text-slate-700 truncate">{game.name}</p>
                <div className="flex justify-between items-center">
                  <p className="text-[10px] uppercase font-bold text-slate-400">{game.platform}</p>
                  <p className="text-xs font-bold text-indigo-600">R$ {GAME_PRICE}</p>
                </div>
              </div>
              <button onClick={() => toggleCart(game)} className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-full transition-colors">
                <Trash2 size={18} />
              </button>
            </div>
          ))
        )}
      </div>

      <div className="border-t border-slate-100 pt-6">
        <div className="flex justify-between items-end mb-6">
          <span className="text-sm font-medium text-slate-500">Total ({cart.length} itens)</span>
          <span className="text-3xl font-black text-slate-800">R$ {total}</span>
        </div>
        <button onClick={handleCheckout} disabled={cart.length === 0 || isCheckoutLoading}
          className={`w-full py-4 ${t.accent} text-white rounded-2xl font-black text-lg shadow-lg hover:opacity-90 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2`}>
          {isCheckoutLoading ? (
            <>
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              PROCESSANDO...
            </>
          ) : (
            <>
              <CreditCard size={20} />
              PAGAR AGORA
            </>
          )}
        </button>
        <p className="text-xs text-center text-slate-400 mt-4">Entrega via link automático</p>
      </div>
    </div>
  );
}

// --- ADMIN ---
function AdminView({ onLogout }) {
  const [games, setGames] = useState(() => {
    const saved = localStorage.getItem('my_game_catalog_v2');
    if (saved) return JSON.parse(saved);
    return flattenDatabase(INITIAL_DATABASE);
  });

  // Links de checkout globais (chave = preço total)
  const [checkoutLinks, setCheckoutLinks] = useState(() => {
    const saved = localStorage.getItem('checkout_links_config');
    if (saved) return JSON.parse(saved);
    return DEFAULT_CHECKOUT_LINKS;
  });

  const [searchTerm, setSearchTerm] = useState("");
  const [activePlatform, setActivePlatform] = useState("Todos");
  const [currentTab, setCurrentTab] = useState("jogos"); // jogos | config

  const [showAddModal, setShowAddModal] = useState(false);
  const [gameToEdit, setGameToEdit] = useState(null);
  const [newGame, setNewGame] = useState({ name: '', platform: 'PSP', link: '', img: '' });

  useEffect(() => {
    localStorage.setItem('my_game_catalog_v2', JSON.stringify(games));
  }, [games]);

  useEffect(() => {
    localStorage.setItem('checkout_links_config', JSON.stringify(checkoutLinks));
  }, [checkoutLinks]);

  const filteredGames = useMemo(() => {
    return games.filter(game => {
      const matchesSearch = game.name.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesPlatform = activePlatform === "Todos" || game.platform === activePlatform;
      return matchesSearch && matchesPlatform;
    });
  }, [games, searchTerm, activePlatform]);

  const handleSaveEdit = (e) => {
    e.preventDefault();
    if (!gameToEdit) return;
    setGames(games.map(g => g.id === gameToEdit.id ? gameToEdit : g));
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
      setGameToEdit(null);
    }
  };

  const resetDatabase = () => {
    if (window.confirm("Isso irá resetar todos os links editados para o padrão. Tem certeza?")) {
      setGames(flattenDatabase(INITIAL_DATABASE));
    }
  }

  return (
    <div className="min-h-screen bg-slate-100 text-slate-900 font-sans">
      <header className="bg-slate-900 text-white px-8 py-6 shadow-lg">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <h1 className="text-xl font-bold">Painel Administrativo</h1>
            <div className="flex bg-slate-800 rounded-lg p-1">
              <button onClick={() => setCurrentTab("jogos")} className={`px-4 py-1.5 rounded-md text-sm font-bold transition-all ${currentTab === "jogos" ? "bg-indigo-600 text-white shadow" : "text-slate-400 hover:text-white"}`}>Jogos</button>
              <button onClick={() => setCurrentTab("config")} className={`px-4 py-1.5 rounded-md text-sm font-bold transition-all ${currentTab === "config" ? "bg-indigo-600 text-white shadow" : "text-slate-400 hover:text-white"}`}>Pagamentos</button>
            </div>
          </div>
          <div className="flex gap-4">
            <button onClick={resetDatabase} className="text-xs text-slate-400 hover:text-red-400">Resetar DB</button>
            <button onClick={onLogout} className="text-sm bg-slate-700 px-4 py-2 rounded-lg hover:bg-slate-600">Sair</button>
            <button onClick={() => setShowAddModal(true)} className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 px-4 py-2 rounded-lg font-bold text-sm">
              <Plus size={18} /> Adicionar Jogo
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto p-8">

        {/* ABA JOGOS */}
        {currentTab === "jogos" && (
          <>
            <div className="flex items-center justify-between mb-8">
              <div className="flex gap-2 overflow-x-auto">
                {PLATFORMS.map(p => (
                  <button key={p} onClick={() => setActivePlatform(p)}
                    className={`px-4 py-2 rounded-xl text-sm font-bold transition-all border ${activePlatform === p ? 'bg-indigo-600 border-indigo-600 text-white' : 'bg-white border-slate-300 text-slate-500'}`}>
                    {p}
                  </button>
                ))}
              </div>
              <div className="w-64">
                <input type="text" placeholder="Buscar..."
                  className="w-full px-4 py-2 rounded-xl border border-slate-300"
                  value={searchTerm} onChange={e => setSearchTerm(e.target.value)} />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {filteredGames.map(game => (
                <div key={game.id} onClick={() => setGameToEdit({ ...game })}
                  className="bg-white rounded-xl shadow-sm border border-slate-200 p-4 cursor-pointer hover:border-indigo-400 transition-all">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-12 h-12 bg-slate-100 rounded-lg overflow-hidden">
                      {game.img && <img src={game.img} className="w-full h-full object-cover" />}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-bold text-sm truncate">{game.name}</h3>
                      <p className="text-xs text-slate-500">{game.platform}</p>
                    </div>
                  </div>
                  <div className="space-y-1">
                    <div className={`text-xs px-2 py-1 rounded-md truncate font-mono ${game.link ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'}`}>
                      {game.link ? 'Download: Configurado' : 'Download: Pendente'}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}

        {/* ABA CONFIGURAÇÃO DE PAGAMENTO */}
        {currentTab === "config" && (
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8 max-w-3xl mx-auto">
            <div className="flex items-center gap-4 mb-6">
              <div className="p-3 bg-indigo-50 text-indigo-600 rounded-xl">
                <CreditCard size={32} />
              </div>
              <div>
                <h2 className="text-2xl font-black text-slate-800">Links de Pagamento por Valor</h2>
                <p className="text-slate-500">Configure um link específico para cada faixa de preço.</p>
              </div>
            </div>

            <div className="space-y-4">
              {[20, 40, 60, 80, 100, 120, 140, 160, 180, 200].map(price => (
                <div key={price} className="flex items-center gap-4 p-4 bg-slate-50 rounded-xl border border-slate-100">
                  <div className="w-24 font-bold text-slate-700 text-lg">R$ {price},00</div>
                  <input
                    type="text"
                    placeholder="Cole o link do MercadoPago/Stripe aqui..."
                    className="flex-1 p-3 border rounded-lg active:ring-2 focus:ring-2 focus:ring-indigo-500 outline-none"
                    value={checkoutLinks[price] || ""}
                    onChange={(e) => setCheckoutLinks({ ...checkoutLinks, [price]: e.target.value })}
                  />
                </div>
              ))}
              <p className="text-center text-slate-400 text-sm mt-4">Adicione valores adicionais editando o código se necessário.</p>
            </div>
          </div>
        )}

      </main>

      {/* Modal Edit (Admin) - Somente Download agora */}
      {gameToEdit && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-slate-900/80 backdrop-blur-sm" onClick={() => setGameToEdit(null)} />
          <form onSubmit={handleSaveEdit} className="relative bg-white w-full max-w-lg rounded-3xl p-8 shadow-2xl overflow-y-auto max-h-[90vh]">
            <h2 className="text-2xl font-black text-slate-800 mb-6">Editar Jogo</h2>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-1">Nome</label>
                <input className="w-full p-3 bg-slate-50 border rounded-xl" value={gameToEdit.name} onChange={e => setGameToEdit({ ...gameToEdit, name: e.target.value })} />
              </div>
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-1">Link de Download (Pós-compra)</label>
                <input className="w-full p-3 bg-slate-50 border rounded-xl font-mono text-sm" value={gameToEdit.link} onChange={e => setGameToEdit({ ...gameToEdit, link: e.target.value })} placeholder="https://mega.nz/..." />
                <p className="text-xs text-slate-500 mt-1">Este é o link que o cliente receberá após pagar.</p>
              </div>
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-1">Capa (URL)</label>
                <input className="w-full p-3 bg-slate-50 border rounded-xl font-mono text-sm" value={gameToEdit.img} onChange={e => setGameToEdit({ ...gameToEdit, img: e.target.value })} />
              </div>
            </div>

            <div className="flex gap-3 mt-8">
              <button type="button" onClick={() => { if (window.confirm("Excluir jogo?")) deleteFromLibrary(gameToEdit.id); }} className="px-6 py-3 bg-red-100 text-red-600 font-bold rounded-xl hover:bg-red-200">Excluir</button>
              <button type="submit" className="flex-1 py-3 bg-indigo-600 text-white font-bold rounded-xl hover:bg-indigo-700 shadow-lg">Salvar Alterações</button>
            </div>
          </form>
        </div>
      )}

      {/* Modal Add (Admin) */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-slate-900/80" onClick={() => setShowAddModal(false)} />
          <form onSubmit={handleAddGame} className="relative bg-white w-full max-w-lg rounded-3xl p-8 shadow-2xl">
            <h2 className="text-xl font-black mb-4">Adicionar Novo Jogo</h2>
            <div className="space-y-3">
              <input required placeholder="Nome" className="w-full p-3 border rounded-xl" value={newGame.name} onChange={e => setNewGame({ ...newGame, name: e.target.value })} />
              <select className="w-full p-3 border rounded-xl" value={newGame.platform} onChange={e => setNewGame({ ...newGame, platform: e.target.value })}>
                {PLATFORMS.filter(p => p !== "Todos").map(p => <option key={p} value={p}>{p}</option>)}
              </select>
              <input placeholder="Link Download" className="w-full p-3 border rounded-xl" value={newGame.link} onChange={e => setNewGame({ ...newGame, link: e.target.value })} />
              <input placeholder="Link Imagem" className="w-full p-3 border rounded-xl" value={newGame.img} onChange={e => setNewGame({ ...newGame, img: e.target.value })} />
            </div>
            <button type="submit" className="w-full mt-6 bg-indigo-600 text-white font-bold py-3 rounded-xl">Criar Jogo</button>
          </form>
        </div>
      )}
    </div>
  );
}

// --- CLIENT VIEW ---
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
            <div className="h-48 bg-slate-200 w-full relative">
              {game.img && game.img !== "EMBREVE.png" ? (
                <img src={game.img} alt={game.name} className="w-full h-full object-cover" />
              ) : (
                <div className="flex items-center justify-center h-full text-slate-400"><Gamepad2 size={48} /></div>
              )}
              <div className="absolute top-3 left-3">
                <span className="text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-wider shadow-sm bg-indigo-100 text-indigo-700">
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
      </main>
    </div>
  );
}

function Login({ onLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    const emailHash = await sha256(email);
    const passHash = await sha256(password);

    if (emailHash === EMAIL_HASH && passHash === PASS_HASH) {
      localStorage.setItem('admin_token', 'LOGGED_IN');
      onLogin();
    } else {
      setError('Credenciais incorretas.');
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center p-4">
      <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-sm">
        <div className="flex justify-center mb-6">
          <img src="/logo.png" alt="Logo" className="h-16 w-auto object-contain" />
        </div>
        <h2 className="text-2xl font-bold text-center text-slate-800 mb-6">Área Administrativa</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-600 mb-1">Email</label>
            <input type="email" required className="w-full px-4 py-2 border rounded-xl" value={email} onChange={e => setEmail(e.target.value)} />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-600 mb-1">Senha</label>
            <input type="password" required className="w-full px-4 py-2 border rounded-xl" value={password} onChange={e => setPassword(e.target.value)} />
          </div>
          {error && <p className="text-red-500 text-sm text-center">{error}</p>}
          <button type="submit" className="w-full bg-indigo-600 text-white font-bold py-3 rounded-xl hover:bg-indigo-700 transition">
            Entrar
          </button>
        </form>
      </div>
    </div>
  );
}

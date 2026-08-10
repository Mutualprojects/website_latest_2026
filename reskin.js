const fs = require('fs');
const path = '/opt/btl-website-11feb26/app/mmr/page.tsx';
let content = fs.readFileSync(path, 'utf8');

// 1. Update GlassPanel
content = content.replace(
    /border-white\/60 bg-white\/90 backdrop-blur-xl shadow-\[0_20px_60px_-15px_rgba\(7,81,138,0\.25\)\]/,
    'border-white/15 bg-black/40 backdrop-blur-2xl shadow-2xl'
);

// 2. Update Eyebrow
content = content.replace(
    /bg-\[#07518a\]\/10 border border-\[#07518a\]\/20 text-\[#07518a\]/g,
    'bg-amber-500/10 border border-amber-500/20 text-amber-400'
);

// We only want to apply these text/bg changes to the GlassPanel sections.
// Those start around line 595 (About the Product) and go to the end of the sections.
// Let's replace globally for certain text colors inside the GlassPanel sections.
// A safe way is to split the file at the start of the Stack content.

const parts = content.split('id="about-section"');
if(parts.length === 2) {
    let panels = parts[1];
    
    // Backgrounds & Borders
    panels = panels.replace(/bg-white/g, 'bg-black/40');
    panels = panels.replace(/bg-slate-50/g, 'bg-white/5');
    panels = panels.replace(/border-slate-200/g, 'border-white/10');
    panels = panels.replace(/border-slate-100/g, 'border-white/5');
    panels = panels.replace(/border-\[#07518a\]/g, 'border-amber-500/50');
    panels = panels.replace(/bg-slate-100/g, 'bg-white/10');
    
    // Text colors
    panels = panels.replace(/text-slate-900/g, 'text-white');
    panels = panels.replace(/text-slate-800/g, 'text-white/90');
    panels = panels.replace(/text-slate-700/g, 'text-white/80');
    panels = panels.replace(/text-slate-600/g, 'text-white/70');
    panels = panels.replace(/text-slate-500/g, 'text-white/60');
    panels = panels.replace(/text-slate-400/g, 'text-white/50');
    
    // Accents
    panels = panels.replace(/group-hover:text-\[#07518a\]/g, 'group-hover:text-amber-400');
    panels = panels.replace(/text-\[#07518a\]/g, 'text-amber-400');
    panels = panels.replace(/bg-\[#07518a\]\/\[0\.08\]/g, 'bg-amber-500/10');
    panels = panels.replace(/bg-\[#07518a\]/g, 'bg-amber-500');
    panels = panels.replace(/hover:border-\[#07518a\]\/40/g, 'hover:border-amber-500/40');
    panels = panels.replace(/via-\[#07518a\]/g, 'via-amber-500');
    panels = panels.replace(/hover:bg-\[#07518a\]/g, 'hover:bg-amber-500');
    panels = panels.replace(/hover:bg-\[#063f6d\]/g, 'hover:bg-amber-600');
    panels = panels.replace(/shadow-\[#07518a\]\/20/g, 'shadow-amber-500/20');
    
    // Specific fixes
    panels = panels.replace(/bg-slate-900/g, 'bg-black/60');
    panels = panels.replace(/divide-slate-100/g, 'divide-white/10');
    panels = panels.replace(/text-emerald-700 bg-emerald-50 border-emerald-200/g, 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20');
    
    content = parts[0] + 'id="about-section"' + panels;
}

fs.writeFileSync(path, content);
console.log("Updated page.tsx");

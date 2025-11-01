// components/theme/ThemeInitScript.tsx
import { DAISY_THEMES, DAISY_FALLBACK } from "../../daisyThemes";

export default function ThemeInitScript() {
  // Runs before hydration; reads cookie/localStorage and applies theme instantly.
  const script = `
  (function() {
    var THEMES = ${JSON.stringify(DAISY_THEMES)};
  var FALLBACK_CDN = ${JSON.stringify(DAISY_FALLBACK)};
    var canvas = document.createElement('canvas');
    var ctx = canvas.getContext('2d');
    function ensureFallbackStyles(cb) {
      var existing = document.querySelector('link[data-daisyui-fallback]');
      if (existing) {
        if (cb) {
          if (existing.sheet) cb();
          else existing.addEventListener('load', cb, { once: true });
        }
        return;
      }
      var link = document.createElement('link');
      link.rel = 'stylesheet';
      link.href = FALLBACK_CDN;
      link.setAttribute('data-daisyui-fallback','');
      if (cb) link.addEventListener('load', cb, { once: true });
      document.head.appendChild(link);
    }
    function isTheme(v){ return THEMES.indexOf(v) !== -1; }
    function parseColor(input){
      if (!ctx) return null;
      try {
        ctx.fillStyle = '#000';
        ctx.fillStyle = input;
        var value = ctx.fillStyle;
        var match = value.match(/\\d+(\\.\\d+)?/g);
        if (!match) return null;
        return [Number(match[0]), Number(match[1]), Number(match[2])];
      } catch (e) { return null; }
    }
    function mixColors(a,b,amount){
      var ca = parseColor(a);
      var cb = parseColor(b);
      if (!ca || !cb) return a;
      var ratio = Math.min(Math.max(amount,0),1);
      var r = Math.round(ca[0]*(1-ratio)+cb[0]*ratio);
      var g = Math.round(ca[1]*(1-ratio)+cb[1]*ratio);
      var bl = Math.round(ca[2]*(1-ratio)+cb[2]*ratio);
      return 'rgb(' + r + ',' + g + ',' + bl + ')';
    }
    function luminance(rgb){
      var arr = rgb.map(function(v){
        var c = v/255;
        return c <= 0.03928 ? c/12.92 : Math.pow((c+0.055)/1.055, 2.4);
      });
      return 0.2126*arr[0] + 0.7152*arr[1] + 0.0722*arr[2];
    }
    function resolve(styles,name,fallback){
      var val = styles.getPropertyValue(name).trim();
      return val || fallback;
    }
    function syncTokens(){
      var root = document.documentElement;
      var styles = getComputedStyle(root);
      var colorScheme = styles.colorScheme || styles.getPropertyValue("color-scheme");
      if (colorScheme && colorScheme.indexOf("dark") !== -1) root.classList.add("dark");
      else root.classList.remove("dark");
      var surfaceRaw = (styles.getPropertyValue('--color-base-100') || '').trim();
      if (!surfaceRaw) {
        ensureFallbackStyles(function(){ requestAnimationFrame(syncTokens); });
        return;
      }
      var surface = surfaceRaw || '#ffffff';
      var surfaceSoft = (styles.getPropertyValue('--color-base-200') || '').trim() || surface;
      var border = (styles.getPropertyValue('--color-base-300') || '').trim() || surfaceSoft;
      var foreground = (styles.getPropertyValue('--color-base-content') || '').trim() || '#0f172a';
      var muted = (styles.getPropertyValue('--color-neutral-content') || '').trim() || '#64748b';
      root.style.setProperty('--gaia-surface', surface);
      root.style.setProperty('--gaia-surface-soft', surfaceSoft);
      root.style.setProperty('--gaia-border', border);
      root.style.setProperty('--gaia-foreground', foreground);
      root.style.setProperty('--gaia-muted', muted);
      var surfRGB = parseColor(surface) || [255,255,255];
      var fgRGB = parseColor(foreground) || [15,23,42];
      var mtRGB = parseColor(muted) || [100,116,139];
      var isDark = luminance(surfRGB) < 0.45;
      var strong = mixColors('rgb('+fgRGB.join(',')+')', isDark ? '#ffffff' : '#000000', isDark ? 0.35 : 0.08);
      var def = mixColors('rgb('+fgRGB.join(',')+')', isDark ? '#ffffff' : surface, isDark ? 0.45 : 0.2);
      var mut = mixColors('rgb('+mtRGB.join(',')+')', isDark ? '#ffffff' : surface, isDark ? 0.55 : 0.25);
      root.style.setProperty('--gaia-text-strong', strong);
      root.style.setProperty('--gaia-text-default', def);
      root.style.setProperty('--gaia-text-muted', mut);
    }
    try {
      var cookieMatch = document.cookie.match(/(?:^|; )gaia\\.theme=([^;]+)/);
      var t = cookieMatch ? decodeURIComponent(cookieMatch[1]) : null;
      if (!t && typeof localStorage !== 'undefined') {
        t = localStorage.getItem('gaia.theme');
      }
      t = isTheme(t) ? t : 'light';
      var root = document.documentElement;
      root.setAttribute('data-theme', t);
      ensureFallbackStyles(syncTokens);
      syncTokens();
    } catch (e) { /* silent */ }
  })();
  `.trim();

  return <script dangerouslySetInnerHTML={{ __html: script }} />;
}

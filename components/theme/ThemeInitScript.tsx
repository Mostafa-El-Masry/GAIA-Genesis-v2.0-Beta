// components/theme/ThemeInitScript.tsx
export default function ThemeInitScript() {
  // Runs before hydration; reads cookie/localStorage and applies theme instantly.
  const script = `
  (function() {
    try {
      var cookieMatch = document.cookie.match(/(?:^|; )gaia\\.theme=([^;]+)/);
      var t = cookieMatch ? decodeURIComponent(cookieMatch[1]) : null;
      if (!t && typeof localStorage !== 'undefined') {
        t = localStorage.getItem('gaia.theme');
      }
      var allowed = { light: true, dark: true, cupcake: true };
      t = allowed[t] ? t : 'light';
      var root = document.documentElement;
      root.setAttribute('data-theme', t);
      if (t === 'dark') root.classList.add('dark'); else root.classList.remove('dark');
    } catch (e) { /* silent */ }
  })();
  `.trim();

  return <script dangerouslySetInnerHTML={{ __html: script }} />;
}

// Tiny dependency-free Python syntax highlighter — minimal but pretty.
const KW = new Set([
  "and","as","assert","async","await","break","class","continue","def","del","elif","else","except",
  "finally","for","from","global","if","import","in","is","lambda","None","nonlocal","not","or","pass",
  "raise","return","True","False","try","while","with","yield","self",
]);
const BUILTINS = new Set([
  "print","len","range","int","str","list","dict","set","tuple","min","max","sum","map","filter",
  "sorted","enumerate","zip","abs","input","open","next","iter","type",
]);

function escape(s: string) {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

export function highlightPython(src: string): string {
  // Tokenize line-by-line so we can colour comments at end-of-line.
  return src
    .split("\n")
    .map((line) => {
      // Strip + remember trailing comment
      let comment = "";
      const cIdx = (() => {
        let inStr: string | null = null;
        for (let i = 0; i < line.length; i++) {
          const ch = line[i];
          if (inStr) {
            if (ch === inStr && line[i - 1] !== "\\") inStr = null;
          } else if (ch === '"' || ch === "'") inStr = ch;
          else if (ch === "#") return i;
        }
        return -1;
      })();
      if (cIdx >= 0) {
        comment = line.slice(cIdx);
        line = line.slice(0, cIdx);
      }

      let html = "";
      const re = /("(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])*'|\b\d+(?:\.\d+)?\b|\b[A-Za-z_][A-Za-z0-9_]*\b|[^\s])/g;
      let last = 0;
      let m: RegExpExecArray | null;
      while ((m = re.exec(line))) {
        html += escape(line.slice(last, m.index));
        const tok = m[0];
        if (/^["']/.test(tok)) {
          html += `<span class="text-[var(--blossom)]">${escape(tok)}</span>`;
        } else if (/^\d/.test(tok)) {
          html += `<span class="text-[var(--sky)]">${escape(tok)}</span>`;
        } else if (KW.has(tok)) {
          html += `<span class="text-[var(--lantern)] font-semibold">${escape(tok)}</span>`;
        } else if (BUILTINS.has(tok)) {
          html += `<span class="text-[var(--sky)]">${escape(tok)}</span>`;
        } else {
          html += escape(tok);
        }
        last = m.index + tok.length;
      }
      html += escape(line.slice(last));
      if (comment) html += `<span class="text-muted-foreground italic">${escape(comment)}</span>`;
      return html;
    })
    .join("\n");
}

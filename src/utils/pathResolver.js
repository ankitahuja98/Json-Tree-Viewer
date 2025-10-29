// simple path resolver that supports $ root, dot notation and bracket indices
export function tokenizePath(path) {
  // remove whitespace
  if (!path) return [];
  let p = path.trim();
  if (p.startsWith("$")) p = p.slice(1);
  // convert [index] to .index form
  p = p.replace(/\[(\d+)\]/g, ".$1");
  // remove leading dot if exists
  if (p.startsWith(".")) p = p.slice(1);
  if (p === "") return [];
  return p.split(".").map((token) => token);
}

export function resolvePath(obj, path) {
  const tokens = tokenizePath(path);
  let cur = obj;
  for (let t of tokens) {
    if (cur === undefined || cur === null)
      return { found: false, value: undefined };
    // numeric index?
    if (/^\d+$/.test(t)) {
      const idx = parseInt(t, 10);
      if (!Array.isArray(cur) || idx >= cur.length)
        return { found: false, value: undefined };
      cur = cur[idx];
    } else {
      if (typeof cur !== "object") return { found: false, value: undefined };
      if (!(t in cur)) return { found: false, value: undefined };
      cur = cur[t];
    }
  }
  return { found: true, value: cur };
}

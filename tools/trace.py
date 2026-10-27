# Turns a raster line drawing into SVG line segments (for the stroke "draw-on" animation).
import cv2, numpy as np, json, sys
src, dst = sys.argv[1], sys.argv[2]
img = cv2.imread(src, cv2.IMREAD_GRAYSCALE)
h, w = img.shape
bw = (img < 150).astype(np.uint8) * 255
lsd = cv2.createLineSegmentDetector(cv2.LSD_REFINE_STD)
lines = lsd.detect(255 - bw)[0].reshape(-1, 4)
# LSD returns both edges of a stroke: merge near-duplicate parallel segments
segs = []
for x1, y1, x2, y2 in lines:
    L = np.hypot(x2 - x1, y2 - y1)
    if L < 14: continue
    segs.append([x1, y1, x2, y2, L])
segs.sort(key=lambda s: -s[4])
kept = []
def close(a, b):
    ax, ay = (a[0]+a[2])/2, (a[1]+a[3])/2
    da = np.array([a[2]-a[0], a[3]-a[1]]) / a[4]
    db = np.array([b[2]-b[0], b[3]-b[1]]) / b[4]
    if abs(da @ db) < 0.995: return False
    # distance of b's midpoint to line a
    bx, by = (b[0]+b[2])/2, (b[1]+b[3])/2
    n = np.array([-da[1], da[0]])
    if abs((np.array([bx-a[0], by-a[1]])) @ n) > 4: return False
    t = (np.array([bx-a[0], by-a[1]]) @ da)
    return -b[4]/2 <= t <= a[4] + b[4]/2
for s in segs:
    if not any(close(k, s) for k in kept): kept.append(s)
# join collinear pieces separated by small gaps into one long line
def merge(a, b, gap=26):
    da = np.array([a[2]-a[0], a[3]-a[1]]) / a[4]
    db = np.array([b[2]-b[0], b[3]-b[1]]) / b[4]
    if abs(da @ db) < 0.998: return None
    n = np.array([-da[1], da[0]]); p0 = np.array([a[0], a[1]])
    pts = [np.array([b[0], b[1]]), np.array([b[2], b[3]])]
    if max(abs((q - p0) @ n) for q in pts) > 3.5: return None
    ts = [0, a[4]] + [(q - p0) @ da for q in pts]
    lo, hi = min(ts[2:]), max(ts[2:])
    if lo > a[4] + gap or hi < -gap: return None
    t0, t1 = min(ts), max(ts)
    e0, e1 = p0 + da * t0, p0 + da * t1
    return [e0[0], e0[1], e1[0], e1[1], t1 - t0]
changed = True
while changed:
    changed = False
    kept.sort(key=lambda s: -s[4])
    out = []
    for s in kept:
        for i, k in enumerate(out):
            m = merge(k, s)
            if m: out[i] = m; changed = True; break
        else: out.append(s)
    kept = out
MIN = float(sys.argv[3]) if len(sys.argv) > 3 else 18
kept = [k for k in kept if k[4] >= MIN]
# draw order: ground/long lines first, then by height from bottom up
kept.sort(key=lambda s: (-(max(s[1], s[3])) + (0 if s[4] > 300 else 2000)))
data = [[round(float(v), 1) for v in s[:4]] for s in kept]
json.dump({"w": w, "h": h, "lines": data}, open(dst, "w"))
print(src, len(lines), "->", len(data))

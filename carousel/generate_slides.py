#!/usr/bin/env python3
"""
Generate 5 Instagram carousel slides (1080x1350px) from Palm Central brochure screenshots.
All phone chrome, page-counter badges and UI elements are removed.
Full-bleed property photo + elegant gold/dark branded frame.
"""

from PIL import Image, ImageDraw, ImageFont, ImageFilter
import os, math

# ─── Paths ───────────────────────────────────────────────────────────────────
SRC   = "/root/.claude/uploads/1c520c0c-5c99-55a0-8af6-53bb340199b7/"
OUT   = "/home/user/mohamedkamel-ae/carousel/output/"
FONTS = {
    "serif_bold":  "/usr/share/fonts/truetype/liberation/LiberationSerif-Bold.ttf",
    "serif_reg":   "/usr/share/fonts/truetype/liberation/LiberationSerif-Regular.ttf",
    "sans_bold":   "/usr/share/fonts/truetype/liberation/LiberationSans-Bold.ttf",
    "sans_reg":    "/usr/share/fonts/truetype/liberation/LiberationSans-Regular.ttf",
}
os.makedirs(OUT, exist_ok=True)

GOLD       = (200, 151, 42)
GOLD_LIGHT = (240, 200, 78)
WHITE      = (255, 255, 255)
DARK       = (12,  20,  32)

# ─── Slide definitions ───────────────────────────────────────────────────────
# crop_y: (top, bottom) in ORIGINAL 1179×2556 screenshot.
#   • Chosen to start AFTER the iOS page-counter badge (badge ends ~y=640)
#     and stay within a single brochure page's photo content.
# tagline: upper text line in the bottom branding section.
# detail:  smaller detail line in the bottom branding section.

SLIDES = [
    dict(
        src_file = "834cfee1-IMG_2987.png",
        crop_y   = (660, 1350),   # IMG_2987 p40 – panoramic balcony / turquoise water
        tagline  = "PANORAMIC OCEAN VIEWS",
        detail   = "3-BEDROOM RESIDENCE",
        out      = "slide1_balcony.png",
    ),
    dict(
        src_file = "f7015bca-IMG_2986.png",
        crop_y   = (660, 1360),   # IMG_2986 p38 – bright living / dining room
        tagline  = "BRIGHT & AIRY INTERIORS",
        detail   = "OPEN-PLAN LIVING",
        out      = "slide2_interiors.png",
    ),
    dict(
        src_file = "fba04067-IMG_2984.png",
        crop_y   = (600, 1430),   # IMG_2984 p17 – aerial development overview
        tagline  = "DESIGNED IN HARMONY WITH THE SHORE",
        detail   = "PALM JEBEL ALI DEVELOPMENT",
        out      = "slide3_aerial.png",
    ),
    dict(
        src_file = "bc419fbf-IMG_2982.png",
        crop_y   = (720, 1490),   # IMG_2982 p9  – Palm Jebel Ali aerial / location
        tagline  = "PALM JEBEL ALI · DUBAI",
        detail   = "ICONIC PALM ISLAND ADDRESS",
        out      = "slide4_location.png",
    ),
    dict(
        src_file = "3e840026-IMG_2980.png",
        crop_y   = (600, 970),    # IMG_2980 p6  – building exterior on beach
        tagline  = "LUXURY BEACHFRONT LIVING",
        detail   = "NAKHEEL · PALM CENTRAL",
        out      = "slide5_exterior.png",
    ),
]

W, H = 1080, 1350


def font(key, size):
    try:
        return ImageFont.truetype(FONTS[key], size)
    except Exception:
        return ImageFont.load_default()


def scale_cover(img, w, h):
    """Resize img to fill w×h (no black bars), center-crop."""
    sw, sh = img.size
    s  = max(w / sw, h / sh)
    nw = math.ceil(sw * s)
    nh = math.ceil(sh * s)
    img = img.resize((nw, nh), Image.LANCZOS)
    x  = (nw - w) // 2
    y  = (nh - h) // 2
    return img.crop((x, y, x + w, y + h))


def vgradient(w, h, top_a, bot_a, color=DARK):
    """Vertical RGBA gradient layer."""
    layer = Image.new("RGBA", (w, h), (0, 0, 0, 0))
    draw  = ImageDraw.Draw(layer)
    for y in range(h):
        t   = y / max(h - 1, 1)
        a   = int(top_a + (bot_a - top_a) * t)
        r, g, b = color
        draw.line([(0, y), (w - 1, y)], fill=(r, g, b, a))
    return layer


def draw_centered(draw, text, fnt, y, fill, spacing=0):
    """Horizontally centered text with optional letter-spacing. Returns text height."""
    if spacing == 0:
        bb  = draw.textbbox((0, 0), text, font=fnt)
        tw  = bb[2] - bb[0]
        draw.text(((W - tw) // 2, y), text, font=fnt, fill=fill)
        return bb[3] - bb[1]
    chars  = list(text)
    widths = [draw.textbbox((0, 0), c, font=fnt)[2] for c in chars]
    total  = sum(widths) + spacing * (len(chars) - 1)
    x      = (W - total) // 2
    for c, cw in zip(chars, widths):
        draw.text((x, y), c, font=fnt, fill=fill)
        x += cw + spacing
    bb = draw.textbbox((0, 0), chars[0], font=fnt)
    return bb[3] - bb[1]


def make_slide(cfg):
    print(f"  {cfg['src_file']}  crop_y={cfg['crop_y']}")

    # 1. Open & crop to clean photo zone (no badge, no phone chrome)
    src   = Image.open(SRC + cfg["src_file"]).convert("RGB")
    y0, y1 = cfg["crop_y"]
    photo  = src.crop((0, y0, src.width, y1))

    # 2. Scale photo to fill the full 1080×1350 canvas (cover crop)
    canvas = scale_cover(photo, W, H).convert("RGBA")

    # ── Gradient overlays ────────────────────────────────────────────────────
    # Top: transparent → solid (protects any stray caption text or edge)
    top_fade = vgradient(W, 120, 180, 0, color=DARK)
    canvas.alpha_composite(top_fade, (0, 0))

    # Bottom: large dark zone for branding  (480px)
    bot_fade = vgradient(W, 480, 0, 245, color=DARK)
    canvas.alpha_composite(bot_fade, (0, H - 480))

    draw = ImageDraw.Draw(canvas)

    # ── Gold corner accents ──────────────────────────────────────────────────
    AL, AW = 38, 2   # accent length, width
    M = 26            # margin
    corners = [
        # top-left
        [(M, M), (M + AL, M)],
        [(M, M), (M, M + AL)],
        # top-right
        [(W - M, M), (W - M - AL, M)],
        [(W - M, M), (W - M, M + AL)],
        # bottom-left
        [(M, H - M), (M + AL, H - M)],
        [(M, H - M), (M, H - M - AL)],
        # bottom-right
        [(W - M, H - M), (W - M - AL, H - M)],
        [(W - M, H - M), (W - M, H - M - AL)],
    ]
    for seg in corners:
        draw.line(seg, fill=GOLD, width=AW)

    # ── Bottom branding section ──────────────────────────────────────────────
    brand_top = H - 430

    # thin gold separator line
    line_y = brand_top + 18
    draw.line([(56, line_y), (W - 56, line_y)], fill=GOLD, width=1)
    # three dots on the line
    for xd in (56, W // 2, W - 56):
        r = 4
        draw.ellipse([(xd - r, line_y - r), (xd + r, line_y + r)], fill=GOLD_LIGHT)

    # "PALM CENTRAL" — large serif title
    y = line_y + 20
    h = draw_centered(draw, "PALM CENTRAL",
                      font("serif_bold", 88), y,
                      fill=(255, 255, 255, 255), spacing=7)

    # "PRIVATE RESIDENCES" — spaced sans subtitle in gold
    y += h + 12
    h = draw_centered(draw, "PRIVATE RESIDENCES",
                      font("sans_bold", 22), y,
                      fill=GOLD_LIGHT + (230,), spacing=8)

    # Tagline
    y += h + 16
    h = draw_centered(draw, cfg["tagline"],
                      font("sans_reg", 19), y,
                      fill=(215, 215, 215, 215), spacing=3)

    # Detail line
    y += h + 10
    draw_centered(draw, cfg["detail"],
                  font("sans_reg", 16), y,
                  fill=(165, 165, 165, 180), spacing=2)

    # Thin separator
    sep_y = H - 72
    draw.line([(W // 2 - 70, sep_y), (W // 2 + 70, sep_y)],
              fill=(180, 180, 180, 100), width=1)

    # Developer credit
    draw_centered(draw, "NAKHEEL  ·  PALM JEBEL ALI",
                  font("sans_bold", 17), sep_y + 10,
                  fill=(160, 160, 160, 200), spacing=4)

    # 3. Save as full-quality RGB PNG
    out_path = OUT + cfg["out"]
    canvas.convert("RGB").save(out_path, "PNG", optimize=False)
    sz = os.path.getsize(out_path) // 1024
    print(f"    → {out_path}  {W}×{H}px  {sz} KB")


if __name__ == "__main__":
    print(f"\nGenerating {len(SLIDES)} slides → {OUT}\n")
    for cfg in SLIDES:
        make_slide(cfg)
    print("\n✓ Done.")

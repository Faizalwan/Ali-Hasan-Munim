param(
  [string]$In,
  [string]$Out,
  [string]$Preview,
  [int]$Threshold = 238,   # min(r,g,b) agar dianggap latar putih
  [int]$MaxChroma = 14,    # selisih max-min kanal agar dianggap netral
  [int]$Width = 1000
)
Add-Type -AssemblyName PresentationCore, WindowsBase
Add-Type -TypeDefinition @"
using System;
using System.Collections.Generic;
public static class Cutout {
  public static int Run(byte[] px, int w, int h, int thr, int maxChroma) {
    int n = w * h;
    bool[] bg = new bool[n];
    Func<int, bool> cand = i => {
      int b = px[i*4], g = px[i*4+1], r = px[i*4+2];
      int mn = Math.Min(r, Math.Min(g, b)), mx = Math.Max(r, Math.Max(g, b));
      return mn >= thr && (mx - mn) <= maxChroma;
    };
    var q = new Queue<int>();
    for (int x = 0; x < w; x++) { foreach (int y in new[]{0, h-1}) { int i = y*w+x; if (!bg[i] && cand(i)) { bg[i] = true; q.Enqueue(i); } } }
    for (int y = 0; y < h; y++) { foreach (int x in new[]{0, w-1}) { int i = y*w+x; if (!bg[i] && cand(i)) { bg[i] = true; q.Enqueue(i); } } }
    while (q.Count > 0) {
      int i = q.Dequeue(); int x = i % w, y = i / w;
      int[] nb = { x>0?i-1:-1, x<w-1?i+1:-1, y>0?i-w:-1, y<h-1?i+w:-1 };
      foreach (int j in nb) if (j >= 0 && !bg[j] && cand(j)) { bg[j] = true; q.Enqueue(j); }
    }
    // simpan hanya objek (non-latar) terbesar: bintik-bintik kecil di latar ikut dihapus
    int[] label = new int[n]; int best = 0, bestSize = 0, cur = 0;
    for (int s0 = 0; s0 < n; s0++) {
      if (bg[s0] || label[s0] != 0) continue;
      cur++; int size = 0; q.Enqueue(s0); label[s0] = cur;
      while (q.Count > 0) {
        int i = q.Dequeue(); size++; int x = i % w, y = i / w;
        int[] nb = { x>0?i-1:-1, x<w-1?i+1:-1, y>0?i-w:-1, y<h-1?i+w:-1 };
        foreach (int j in nb) if (j >= 0 && !bg[j] && label[j] == 0) { label[j] = cur; q.Enqueue(j); }
      }
      if (size > bestSize) { bestSize = size; best = cur; }
    }
    for (int i = 0; i < n; i++) if (!bg[i] && label[i] != best) bg[i] = true;
    // jarak (maks 6px) dari latar untuk menghaluskan tepi
    int[] dist = new int[n];
    for (int i = 0; i < n; i++) dist[i] = bg[i] ? 0 : 99;
    for (int pass = 1; pass <= 14; pass++)
      for (int y = 0; y < h; y++) for (int x = 0; x < w; x++) {
        int i = y*w+x; if (dist[i] != 99) continue;
        bool near = (x>0 && dist[i-1]==pass-1) || (x<w-1 && dist[i+1]==pass-1) || (y>0 && dist[i-w]==pass-1) || (y<h-1 && dist[i+w]==pass-1);
        if (near) dist[i] = pass;
      }
    int bgCount = 0;
    const double BG = 254.0;
    byte[] orig = (byte[])px.Clone();
    Func<int, double> lum = k => Math.Min(orig[k*4+2], Math.Min(orig[k*4+1], orig[k*4]));
    for (int i = 0; i < n; i++) {
      int b = px[i*4], g = px[i*4+1], r = px[i*4+2];
      double a;
      if (bg[i]) { a = 0; bgCount++; }
      else if (dist[i] <= 5) {
        // piksel tepi = campuran subjek + latar putih. Perkirakan warna subjek dari piksel
        // dalam (jarak 6+) di sekitarnya, lalu hitung alpha dari seberapa "putih" piksel ini.
        int x = i % w, y = i / w; double sum = 0; int cnt = 0;
        for (int dy = -7; dy <= 7; dy++) for (int dx = -7; dx <= 7; dx++) {
          int xx = x + dx, yy = y + dy; if (xx < 0 || yy < 0 || xx >= w || yy >= h) continue;
          int k = yy*w+xx; if (dist[k] >= 6) { sum += lum(k); cnt++; }
        }
        double fg = cnt > 0 ? sum / cnt : 0;
        double l = lum(i);
        a = BG - fg < 6 ? 1 : Math.Min(1.0, Math.Max(0.0, (BG - l) / (BG - fg)));
      } else if (dist[i] <= 14 && lum(i) >= 215) {
        // sorot/helai putih di dalam rambut: terang tapi dikelilingi area gelap → transparankan.
        // Kemeja putih tidak kena karena sekelilingnya juga terang.
        int x = i % w, y = i / w; double sum = 0; int cnt = 0;
        for (int dy = -7; dy <= 7; dy++) for (int dx = -7; dx <= 7; dx++) {
          int xx = x + dx, yy = y + dy; if (xx < 0 || yy < 0 || xx >= w || yy >= h) continue;
          int k = yy*w+xx; if (dist[k] >= 6 && lum(k) < 200) { sum += lum(k); cnt++; }
        }
        double fg = cnt > 0 ? sum / cnt : 255;
        a = (cnt > 40 && fg < 150) ? Math.Min(1.0, Math.Max(0.0, (BG - lum(i)) / (BG - fg))) : 1;
      } else a = 1;
      if (a > 0 && a < 1) {
        // hilangkan campuran putih dari warna (un-premultiply terhadap putih)
        r = (int)Math.Max(0, Math.Min(255, (r - 255 * (1 - a)) / a));
        g = (int)Math.Max(0, Math.Min(255, (g - 255 * (1 - a)) / a));
        b = (int)Math.Max(0, Math.Min(255, (b - 255 * (1 - a)) / a));
      }
      px[i*4] = (byte)b; px[i*4+1] = (byte)g; px[i*4+2] = (byte)r; px[i*4+3] = (byte)Math.Round(a * 255);
    }
    // pengikisan sisa pinggiran putih: piksel hampir putih yang bertetangga dengan area transparan
    for (int iter = 0; iter < 3; iter++) {
      var clear = new List<int>();
      for (int y = 1; y < h - 1; y++) for (int x = 1; x < w - 1; x++) {
        int i = y*w+x; if (px[i*4+3] == 0 || lum(i) < 248) continue;
        int open = 0;
        for (int dy = -1; dy <= 1; dy++) for (int dx = -1; dx <= 1; dx++) if (px[((y+dy)*w+x+dx)*4+3] < 128) open++;
        if (open >= 3) clear.Add(i);
      }
      foreach (int i in clear) px[i*4+3] = 0;
    }
    return bgCount;
  }
}
"@

$fs = [IO.File]::OpenRead($In)
$frame = [System.Windows.Media.Imaging.BitmapDecoder]::Create($fs, 'PreservePixelFormat', 'OnLoad').Frames[0]
$fs.Close()
$scale = $Width / $frame.PixelWidth
$scaled = New-Object System.Windows.Media.Imaging.TransformedBitmap($frame, (New-Object System.Windows.Media.ScaleTransform($scale, $scale)))
$bgra = New-Object System.Windows.Media.Imaging.FormatConvertedBitmap($scaled, [System.Windows.Media.PixelFormats]::Bgra32, $null, 0)
$w = $bgra.PixelWidth; $h = $bgra.PixelHeight; $stride = $w * 4
$px = New-Object byte[] ($stride * $h)
$bgra.CopyPixels($px, $stride, 0)

$bgCount = [Cutout]::Run($px, $w, $h, $Threshold, $MaxChroma)
"latar: {0:P1} dari {1}x{2}" -f ($bgCount / ($w * $h)), $w, $h

function Save-Png($bytes, $path) {
  $bmp = [System.Windows.Media.Imaging.BitmapSource]::Create($w, $h, 96, 96, [System.Windows.Media.PixelFormats]::Bgra32, $null, $bytes, $stride)
  $enc = New-Object System.Windows.Media.Imaging.PngBitmapEncoder
  $enc.Frames.Add([System.Windows.Media.Imaging.BitmapFrame]::Create($bmp))
  $o = [IO.File]::Create($path); $enc.Save($o); $o.Close()
}
Save-Png $px $Out

if ($Preview) {
  # komposit di atas merah brand untuk memeriksa bocor/halo
  $pv = New-Object byte[] ($px.Length)
  for ($i = 0; $i -lt $px.Length; $i += 4) {
    $a = $px[$i+3] / 255.0
    $pv[$i]   = [byte]($px[$i]   * $a + 0x2E * (1 - $a))
    $pv[$i+1] = [byte]($px[$i+1] * $a + 0x10 * (1 - $a))
    $pv[$i+2] = [byte]($px[$i+2] * $a + 0xC8 * (1 - $a))
    $pv[$i+3] = 255
  }
  Save-Png $pv $Preview
  # potongan zoom area kepala untuk memeriksa tepi rambut
  $pvBmp = [System.Windows.Media.Imaging.BitmapSource]::Create($w, $h, 96, 96, [System.Windows.Media.PixelFormats]::Bgra32, $null, $pv, $stride)
  $crop = New-Object System.Windows.Media.Imaging.CroppedBitmap($pvBmp, (New-Object System.Windows.Int32Rect([int]($w*0.33), [int]($h*0.05), [int]($w*0.34), [int]($h*0.30))))
  $enc = New-Object System.Windows.Media.Imaging.PngBitmapEncoder
  $enc.Frames.Add([System.Windows.Media.Imaging.BitmapFrame]::Create($crop))
  $o = [IO.File]::Create($Preview.Replace('.png', '-head.png')); $enc.Save($o); $o.Close()
}
(Get-Item $Out).Length

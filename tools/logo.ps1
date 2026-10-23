# Mengubah logo satu warna di atas latar putih menjadi PNG transparan (versi warna asli & putih).
# Alpha dihitung dari seberapa jauh piksel dari putih, jadi tepi huruf tetap halus dan
# lubang di dalam huruf (a, k, A) ikut transparan.
param(
  [string]$In,
  [string]$OutColor,
  [string]$OutWhite,
  [int]$Width = 600,       # lebar akhir setelah dipotong rapat
  [int]$Pad = 8            # ruang kosong di sekeliling logo (px, setelah skala)
)
Add-Type -AssemblyName PresentationCore, WindowsBase

$fs = [IO.File]::OpenRead($In)
$frame = [System.Windows.Media.Imaging.BitmapDecoder]::Create($fs, 'PreservePixelFormat', 'OnLoad').Frames[0]
$fs.Close()
$src = New-Object System.Windows.Media.Imaging.FormatConvertedBitmap($frame, [System.Windows.Media.PixelFormats]::Bgra32, $null, 0)
$w = $src.PixelWidth; $h = $src.PixelHeight; $stride = $w * 4
$px = New-Object byte[] ($stride * $h); $src.CopyPixels($px, $stride, 0)

# warna tinta = piksel paling gelap pada kanal hijau (merah brand punya G rendah)
$minG = 255; $ink = @(0, 0, 0)
for ($i = 0; $i -lt $px.Length; $i += 4) { if ($px[$i+1] -lt $minG) { $minG = $px[$i+1]; $ink = @($px[$i], $px[$i+1], $px[$i+2]) } }

# kotak pembatas tinta untuk dipotong rapat
$x0 = $w; $y0 = $h; $x1 = 0; $y1 = 0
for ($y = 0; $y -lt $h; $y++) { for ($x = 0; $x -lt $w; $x++) {
  if ($px[($y * $w + $x) * 4 + 1] -lt 235) { if ($x -lt $x0) { $x0 = $x }; if ($x -gt $x1) { $x1 = $x }; if ($y -lt $y0) { $y0 = $y }; if ($y -gt $y1) { $y1 = $y } }
} }
"tinta BGR=$($ink -join ','), kotak=($x0,$y0)-($x1,$y1)"

function Build($rgb) {
  $out = New-Object byte[] ($px.Length)
  for ($i = 0; $i -lt $px.Length; $i += 4) {
    $a = (255 - $px[$i+1]) / (255 - $minG)
    if ($a -lt 0) { $a = 0 } elseif ($a -gt 1) { $a = 1 }
    $out[$i] = $rgb[0]; $out[$i+1] = $rgb[1]; $out[$i+2] = $rgb[2]; $out[$i+3] = [byte][Math]::Round($a * 255)
  }
  $bmp = [System.Windows.Media.Imaging.BitmapSource]::Create($w, $h, 96, 96, [System.Windows.Media.PixelFormats]::Bgra32, $null, $out, $stride)
  $crop = New-Object System.Windows.Media.Imaging.CroppedBitmap($bmp, (New-Object System.Windows.Int32Rect($x0, $y0, ($x1 - $x0 + 1), ($y1 - $y0 + 1))))
  $s = ($Width - 2 * $Pad) / $crop.PixelWidth
  $scaled = New-Object System.Windows.Media.Imaging.TransformedBitmap($crop, (New-Object System.Windows.Media.ScaleTransform($s, $s)))
  # bingkai transparan dengan padding
  $cw = $scaled.PixelWidth + 2 * $Pad; $ch = $scaled.PixelHeight + 2 * $Pad
  $sp = New-Object byte[] ($scaled.PixelWidth * 4 * $scaled.PixelHeight)
  (New-Object System.Windows.Media.Imaging.FormatConvertedBitmap($scaled, [System.Windows.Media.PixelFormats]::Bgra32, $null, 0)).CopyPixels($sp, $scaled.PixelWidth * 4, 0)
  $canvas = New-Object byte[] ($cw * 4 * $ch)
  for ($y = 0; $y -lt $scaled.PixelHeight; $y++) {
    [Array]::Copy($sp, $y * $scaled.PixelWidth * 4, $canvas, (($y + $Pad) * $cw + $Pad) * 4, $scaled.PixelWidth * 4)
  }
  [System.Windows.Media.Imaging.BitmapSource]::Create($cw, $ch, 96, 96, [System.Windows.Media.PixelFormats]::Bgra32, $null, $canvas, $cw * 4)
}
function Save($bmp, $path) {
  $enc = New-Object System.Windows.Media.Imaging.PngBitmapEncoder
  $enc.Frames.Add([System.Windows.Media.Imaging.BitmapFrame]::Create($bmp))
  $o = [IO.File]::Create($path); $enc.Save($o); $o.Close()
  "$path  $($bmp.PixelWidth)x$($bmp.PixelHeight)  $((Get-Item $path).Length) byte"
}
Save (Build $ink) $OutColor
Save (Build @(255, 255, 255)) $OutWhite

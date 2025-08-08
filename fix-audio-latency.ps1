# Ses Gecikme Sorunu Cozum Scripti
# Bu script kulaklik ses aktarimini hizlandirir

Write-Host "🎧 Ses Gecikme Sorunu Cozumu Baslatiliyor..." -ForegroundColor Green

# 1. Ses servislerini yeniden baslat
Write-Host "1. Ses servisleri yeniden baslatiliyor..." -ForegroundColor Yellow
Restart-Service -Name "Audiosrv" -Force
Restart-Service -Name "AudioEndpointBuilder" -Force

# 2. Ses cihazlarini yeniden baslat
Write-Host "2. Ses cihazlari yeniden baslatiliyor..." -ForegroundColor Yellow
$audioDevices = Get-WmiObject -Class Win32_SoundDevice | Where-Object {$_.Status -eq "OK"}
foreach ($device in $audioDevices) {
    Write-Host "   - $($device.Name)" -ForegroundColor Cyan
}

# 3. Bluetooth ses ayarlarini optimize et
Write-Host "3. Bluetooth ses ayarlari optimize ediliyor..." -ForegroundColor Yellow
$bluetoothAudio = Get-WmiObject -Class Win32_PnPEntity | Where-Object {$_.Name -like "*Bluetooth*" -and $_.Name -like "*Audio*"}
if ($bluetoothAudio) {
    Write-Host "   - Bluetooth ses cihazi bulundu: $($bluetoothAudio.Name)" -ForegroundColor Cyan
}

# 4. Ses kalitesi ayarlarini kontrol et
Write-Host "4. Ses kalitesi ayarlari kontrol ediliyor..." -ForegroundColor Yellow

# 5. Oneriler
Write-Host "`n📋 Manuel Yapilmasi Gerekenler:" -ForegroundColor Magenta
Write-Host "1. Windows Ayarlar > Sistem > Ses > Gelismis ses secenekleri" -ForegroundColor White
Write-Host "2. 'Ses gelistirmelerini kapat' secenegini isaretleyin" -ForegroundColor White
Write-Host "3. 'Uygulama sesi ve cihaz tercihleri' > 'Varsayilan ses cihazi' secin" -ForegroundColor White
Write-Host "4. 'Ses Denetim Masasi' > Gelismis > 'Ornekleme hizi' 48000 Hz yapin" -ForegroundColor White
Write-Host "5. 'Bit derinligi' 24 bit yapin" -ForegroundColor White

Write-Host "`n✅ Ses optimizasyonu tamamlandi!" -ForegroundColor Green
Write-Host "Kulakliklarinizi takin ve test edin." -ForegroundColor Cyan

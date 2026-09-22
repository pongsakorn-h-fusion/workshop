<#
.SYNOPSIS
    แก้ไขปัญหา Windows Update ไม่สามารถอัปเดตได้บน Windows Server 2022

.DESCRIPTION
    สคริปต์นี้รวมขั้นตอนแก้ไขปัญหา Windows Update ที่พบบ่อย:
    - ตรวจสอบและซ่อม system image (DISM) และไฟล์ระบบ (SFC)
    - เคลียร์ Windows Update cache (SoftwareDistribution, catroot2)
    - รีสตาร์ท service ที่เกี่ยวข้อง
    - ตรวจสอบพื้นที่ว่างบน system drive
    - บังคับให้ตรวจสอบอัปเดตใหม่ (รวม WSUS ถ้ามี)

.NOTES
    ต้องรันด้วยสิทธิ์ Administrator
    ทดสอบบน Windows Server 2022

.EXAMPLE
    .\Fix-WindowsUpdate.ps1
#>

[CmdletBinding()]
param(
    [switch]$SkipDiskCheck
)

$ErrorActionPreference = 'Stop'

function Assert-Administrator {
    $currentPrincipal = New-Object Security.Principal.WindowsPrincipal(
        [Security.Principal.WindowsIdentity]::GetCurrent()
    )
    if (-not $currentPrincipal.IsInRole([Security.Principal.WindowsBuiltInRole]::Administrator)) {
        Write-Error "กรุณารันสคริปต์นี้ด้วยสิทธิ์ Administrator (Run as Administrator)"
        exit 1
    }
}

function Test-SystemDriveSpace {
    $systemDrive = $env:SystemDrive
    $drive = Get-PSDrive -Name $systemDrive.TrimEnd(':')
    $freeGB = [math]::Round($drive.Free / 1GB, 2)
    Write-Host "พื้นที่ว่างบน $systemDrive : $freeGB GB" -ForegroundColor Cyan
    if ($freeGB -lt 10) {
        Write-Warning "พื้นที่ว่างเหลือน้อยกว่า 10 GB อาจทำให้ Windows Update ล้มเหลว"
    }
}

function Repair-SystemImage {
    Write-Host "`n=== ตรวจสอบและซ่อม System Image (DISM) ===" -ForegroundColor Yellow
    DISM /Online /Cleanup-Image /CheckHealth
    DISM /Online /Cleanup-Image /ScanHealth
    DISM /Online /Cleanup-Image /RestoreHealth

    Write-Host "`n=== ตรวจสอบไฟล์ระบบ (SFC) ===" -ForegroundColor Yellow
    sfc /scannow
}

function Clear-WindowsUpdateCache {
    Write-Host "`n=== เคลียร์ Windows Update Cache ===" -ForegroundColor Yellow

    $services = 'wuauserv', 'bits', 'cryptsvc'
    foreach ($svc in $services) {
        Write-Host "หยุด service: $svc"
        Stop-Service -Name $svc -Force -ErrorAction SilentlyContinue
    }

    $softwareDistribution = "$env:WINDIR\SoftwareDistribution"
    $catroot2 = "$env:WINDIR\System32\catroot2"
    $timestamp = Get-Date -Format 'yyyyMMdd-HHmmss'

    if (Test-Path $softwareDistribution) {
        Rename-Item -Path $softwareDistribution -NewName "SoftwareDistribution.bak-$timestamp"
        Write-Host "เปลี่ยนชื่อ SoftwareDistribution เป็น backup แล้ว"
    }
    if (Test-Path $catroot2) {
        Rename-Item -Path $catroot2 -NewName "catroot2.bak-$timestamp"
        Write-Host "เปลี่ยนชื่อ catroot2 เป็น backup แล้ว"
    }

    foreach ($svc in $services) {
        Write-Host "เริ่ม service: $svc"
        Start-Service -Name $svc -ErrorAction SilentlyContinue
    }
}

function Get-WindowsUpdateErrors {
    Write-Host "`n=== ดึง Windows Update Log ล่าสุด ===" -ForegroundColor Yellow
    $logPath = "$env:USERPROFILE\Desktop\WindowsUpdate.log"
    try {
        Get-WindowsUpdateLog -LogPath $logPath
        Write-Host "บันทึก log ไว้ที่: $logPath" -ForegroundColor Green
    }
    catch {
        Write-Warning "ไม่สามารถสร้าง Windows Update log ได้: $_"
    }
}

function Invoke-WsusResync {
    Write-Host "`n=== บังคับตรวจสอบอัปเดตใหม่ (WSUS/Windows Update) ===" -ForegroundColor Yellow
    wuauclt /resetauthorization /detectnow
    gpupdate /force
    UsoClient StartScan
}

# ---- Main ----
Assert-Administrator

if (-not $SkipDiskCheck) {
    Test-SystemDriveSpace
}

Repair-SystemImage
Clear-WindowsUpdateCache
Invoke-WsusResync
Get-WindowsUpdateErrors

Write-Host "`nเสร็จสิ้น กรุณารีสตาร์ทเครื่องแล้วลองอัปเดตอีกครั้ง" -ForegroundColor Green
Write-Host "หากยังไม่สำเร็จ ให้ตรวจสอบ error code ใน Settings > Windows Update และดู log ที่บันทึกไว้" -ForegroundColor Green

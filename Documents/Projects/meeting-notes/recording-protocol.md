# Recording Protocol — Zoom Meetings & Article Sessions

**Last updated:** 9 October 2026
**Purpose:** Step-by-step technical guide for recording Thomas/Isak Zoom meetings at higher quality than Zoom's built-in recording. Covers OBS setup, ATEM ISO recording, audio routing, and post-production.

---

## Equipment Inventory

### Thomas (Montana — Windows, i9-14900K)

| Item | Model | Connection | Notes |
|------|-------|------------|-------|
| Camera (primary) | Canon R50 (mirrorless, APS-C) | USB-C (webcam utility) or micro-HDMI (clean output) | Dummy battery on order — needed for sessions >30 min |
| Camera (backup) | Canon T8i (DSLR) | USB (webcam utility) or mini-HDMI | Different HDMI cable than R50 |
| Switcher/recorder | ATEM Mini Pro ISO | 4× HDMI in, USB-C (drive OR webcam), HDMI out | Cannot use USB for drive recording AND webcam simultaneously |
| Audio interface | Focusrite Scarlett | USB | Connect mic here for best audio quality |
| Teleprompter | Elgato 15" + 9" | Sits in front of camera lens | Beam splitter — read while looking at camera |
| Green screen | Already set up | Behind Thomas | Presidential seal composited in OBS/Zoom |
| Computer | Windows, i9-14900K, 24-core | — | Known Intel chip defect — BIOS microcode fix pending |

### Isak (California — macOS)

| Item | Model | Connection | Notes |
|------|-------|------------|-------|
| Camera | USB webcam (or future Canon) | USB | Standard webcam for now |
| Audio | USB mic or built-in | USB | Separate audio track in OBS |
| Teleprompter | Elgato 9" | In front of camera | For reading prepared content |
| Computer | Mac | — | OBS + Zoom |

---

## Recording Architecture

### Why Not Just Zoom's Recording?

Zoom compresses video heavily (~1-2 GB/hr at 1080p). For article recordings that become polished content, we want:
- Full 1080p at high bitrate (~6-10 GB/hr)
- Separate audio tracks (each person isolated for post-processing)
- Multiple camera angles recorded independently
- Crash-safe file format (MKV, not MP4)

### What Records What

| System | What it captures | Quality | Purpose |
|--------|-----------------|---------|---------|
| **OBS** (both stations) | Local camera + remote Zoom video + separate audio tracks | High (CRF 18-20, 1080p) | Primary recording |
| **ATEM Mini Pro ISO** (Thomas only) | Each HDMI input as separate file + switched program | High (H.264, ~35 Mbps) | Multi-angle ISO recording |
| **Zoom local recording** (both) | Combined call | Low-medium | Backup / quick reference |

---

## Setup A: Standard Zoom Meeting Recording (Both Stations)

This is the everyday setup for recording article discussions and meetings.

### Isak's Setup (macOS + OBS)

#### One-Time OBS Configuration

1. **Install required software:**
   - OBS Studio (free, obsproject.com)
   - BlackHole (free virtual audio driver — github.com/ExistentialAudio/BlackHole) — needed on macOS to capture Zoom's audio in OBS

2. **Set up BlackHole audio routing (one-time):**
   - Open **Audio MIDI Setup** (Applications → Utilities)
   - Click "+" → Create Multi-Output Device
   - Check both your headphones/speakers AND "BlackHole 2ch"
   - Set this Multi-Output Device as your system output (System Preferences → Sound → Output)
   - This sends audio to your ears AND to BlackHole simultaneously

3. **Configure OBS settings:**
   - Settings → Output → Output Mode: **Advanced**
   - Recording tab:
     - Recording Format: **MKV** (crash-safe — remux to MP4 after)
     - Encoder: **Apple VideoToolbox H.264** (hardware-accelerated)
     - Rate Control: leave default or set CBR ~20,000 Kbps
     - Audio Tracks: check **1, 2, 3**
   - Settings → Video:
     - Base Resolution: 1920×1080
     - Output Resolution: 1920×1080
     - FPS: 30
   - Settings → Audio:
     - Sample Rate: 48 kHz

4. **Add OBS sources (save as a Scene called "Zoom Meeting"):**
   - **Source 1 — "My Camera":** Video Capture Device → select your webcam
   - **Source 2 — "Zoom Remote":** Window Capture → select the Zoom window (pin Thomas's video in Zoom first, or pop it out to its own window for a clean capture)
   - **Source 3 — "My Mic":** Audio Input Capture → select your USB mic
   - **Source 4 — "Zoom Audio":** Audio Input Capture → select "BlackHole 2ch"
   - Arrange sources on the canvas however you want (side by side, picture-in-picture, etc.)

5. **Set up audio tracks (Advanced Audio Properties):**
   - In the Audio Mixer, click the gear icon → Advanced Audio Properties
   - **My Mic:** Track 1 ✓, Track 2 ✓, Track 3 ✗
   - **Zoom Audio:** Track 1 ✓, Track 2 ✗, Track 3 ✓
   - Track 1 = mixed audio (both), Track 2 = your mic only, Track 3 = Zoom/Thomas only

6. **Set up OBS Virtual Camera for Zoom:**
   - In OBS, your camera source feeds both OBS recording and Zoom
   - Click **Start Virtual Camera** in OBS
   - In Zoom → Settings → Video → select **"OBS Virtual Camera"**
   - This sends your camera to Zoom through OBS

#### Per-Session Steps

1. Open OBS. Verify the "Zoom Meeting" scene is loaded.
2. Check all sources are active (camera preview showing, audio meters moving).
3. **Start OBS recording** (click "Start Recording").
4. Open Zoom, join the meeting.
5. In Zoom: verify video source is "OBS Virtual Camera" and audio input is your mic.
6. **Also start Zoom local recording** (Record → Record on This Computer) as backup.
7. Do a **3-second countdown clap** at the start — this creates an audio spike for syncing in post.
8. Conduct the meeting.
9. When done: Stop Zoom recording first, then stop OBS recording.
10. **Remux the MKV:** In OBS → File → Remux Recordings → select the .mkv → Remux. Creates an .mp4 in seconds, no quality loss.
11. Verify all files are intact before closing anything.

---

### Thomas's Setup (Windows + OBS + ATEM)

Thomas has two configuration options depending on whether the ATEM is used for recording.

#### Option 1: ATEM Records ISOs, Camera Goes Direct to Zoom (Recommended)

This is the simplest high-quality setup. The ATEM handles multi-angle recording while the Canon feeds Zoom directly.

**Signal flow:**
```
Canon R50 ──HDMI──→ ATEM Input 1 ──records ISO to SSD
                                  ──HDMI Out──→ (monitor, optional)

Canon R50 ──USB-C──→ Computer (via Canon Webcam Utility)
                         │
                         ├──→ Zoom (as camera source)
                         └──→ OBS (as video source, for composite recording)

Focusrite Scarlett ──USB──→ Computer
                              ├──→ OBS Audio Track 2 (mic only)
                              └──→ Zoom (as mic source)

Zoom desktop audio ──→ OBS Audio Track 3 (remote participant)
```

**One-time setup:**

1. **Install Canon EOS Webcam Utility** (free from Canon — supports R50 on Windows).
2. Connect Canon R50 via **both** micro-HDMI (to ATEM Input 1) and USB-C (to computer for Webcam Utility). The R50 can output on both simultaneously.
3. **ATEM setup:**
   - Connect a fast USB-C SSD (Samsung T7 or similar, ExFAT formatted) to the ATEM's USB-C port.
   - In ATEM Software Control → Recording palette → verify drive is recognized.
   - Set project video standard to 1080p 29.97.
4. **OBS setup** (same as Isak's, with Windows differences):
   - Encoder: **NVENC H.264** (if NVIDIA GPU) or **x264** with "veryfast" preset
   - On Windows, OBS captures desktop audio natively — no BlackHole needed
   - Add sources: "Canon Webcam" as video, Focusrite as mic, Desktop Audio for Zoom's sound
   - Set up audio tracks same as Isak (Track 1 = mix, Track 2 = local mic, Track 3 = Zoom audio)
5. **Zoom:** Settings → Video → select "Canon Webcam." Audio → select Focusrite Scarlett.

**Per-session steps:**

1. Power on Canon R50 (use dummy battery for long sessions).
2. Open ATEM Software Control. Verify SSD is connected and has space.
3. **Press REC on the ATEM** — starts ISO recording to SSD.
4. Open OBS. Verify sources. **Start OBS recording.**
5. Join Zoom. Start Zoom local recording as backup.
6. **3-second countdown clap** for sync.
7. Conduct meeting.
8. Stop Zoom → Stop OBS → Stop ATEM (press REC again).
9. Remux OBS MKV → MP4.
10. Verify all files.

**What you get:**
- ATEM SSD: Camera 1 ISO (.mp4) + program output (.mp4) + DaVinci Resolve project file (.drp)
- OBS: Composite MKV with 3 audio tracks
- Zoom: Backup recording

#### Option 2: ATEM as Webcam for Zoom (No ISO Recording)

Use this if the SSD isn't available or you only need one camera angle recorded.

**Signal flow:**
```
Canon R50 ──HDMI──→ ATEM Input 1
                         │
                         └──USB-C──→ Computer (ATEM acts as webcam)
                                        │
                                        ├──→ Zoom (as camera)
                                        └──→ OBS (as video source)
```

- ATEM's USB-C port acts as a webcam — Zoom and OBS see "Blackmagic Design" as a camera.
- No ISO recording (USB port is occupied).
- OBS records the composite at high quality.
- Simpler but no separate angle files.

#### Option 3: Multi-Camera (Future)

When Thomas has multiple cameras:
```
Camera 1 ──HDMI──→ ATEM Input 1
Camera 2 ──HDMI──→ ATEM Input 2
Camera 3 ──HDMI──→ ATEM Input 3
                         │
                    ATEM records all ISOs to SSD
                    ATEM HDMI Out → capture card → Zoom/OBS
```

Each camera gets its own ISO file. Switch angles in DaVinci Resolve in post using the auto-generated .drp project file.

---

## OBS Recording Settings (Both Stations)

| Setting | Value | Why |
|---------|-------|-----|
| Output Mode | Advanced | Full control over codec/quality |
| Recording Format | **MKV** | Crash-safe. Remux to MP4 after. |
| Encoder (Mac) | Apple VideoToolbox H.264 | Hardware-accelerated, low CPU |
| Encoder (Windows/NVIDIA) | NVENC H.264 | Hardware-accelerated, low CPU |
| Encoder (Windows/no GPU) | x264, "veryfast" preset | CPU-based fallback |
| Rate Control | CRF 18-20 | 18 = near-lossless, 20 = very good. Lower = bigger files |
| Resolution | 1920×1080 | Full HD |
| FPS | 30 | Standard for talking-head content |
| Keyframe Interval | 2 seconds | Good for editing compatibility |
| Audio Sample Rate | 48 kHz | Video standard |
| Audio Bitrate | 320 kbps AAC per track | High quality |
| Audio Tracks | 3 minimum | Track 1 = mix, Track 2 = local mic, Track 3 = remote audio |

---

## Audio Routing Summary

### Isak (macOS)

| What | How | OBS Track |
|------|-----|-----------|
| Your mic | USB mic → Audio Input Capture in OBS | Track 2 |
| Thomas's voice | Zoom → system audio → BlackHole → Audio Input Capture "BlackHole 2ch" | Track 3 |
| Mixed | Both routed to Track 1 | Track 1 |
| Zoom hears you | USB mic selected directly in Zoom audio settings | — |

### Thomas (Windows)

| What | How | OBS Track |
|------|-----|-----------|
| Your mic | Focusrite Scarlett → Audio Input Capture in OBS | Track 2 |
| Isak's voice | Zoom → Desktop Audio (captured natively on Windows) | Track 3 |
| Mixed | Both routed to Track 1 | Track 1 |
| Zoom hears you | Focusrite selected in Zoom audio settings | — |

---

## Post-Production in DaVinci Resolve

### Importing Files

1. **OBS recordings:** Remux MKV → MP4 first (OBS → File → Remux). Import MP4 into Resolve's Media Pool.
2. **ATEM ISO files:** Open the `.drp` file from the SSD directly in Resolve — all ISOs are pre-synced on a multicam timeline. Or import individual MP4s manually.
3. **Zoom backup:** Import if needed for reference.

### Syncing OBS + ATEM Files

OBS and the ATEM have no shared timecode, so sync in post:

1. **Audio waveform sync (best):** Select all clips → right-click → Auto Sync Audio → Based on Waveform. Works if both recordings captured the same audio.
2. **Clap sync:** Find the clap spike at the start of the session on each recording's waveform. Align manually.

### Editing Workflow

1. **Media page:** Organize into bins (Thomas Camera, ATEM ISOs, Isak OBS, Audio).
2. **Edit page:** Build multicam clip if multiple angles exist (select synced clips → right-click → Create Multicam Clip → sync by Audio).
3. **Cut between angles** in multicam mode during playback.
4. **Fairlight page:** Mix audio tracks — EQ, compression, noise reduction per track.
5. **Deliver page:** Export H.264 for web, ProRes for archival.

---

## File Sizes Per Hour

| Source | Approx. Size/Hour |
|--------|--------------------|
| OBS H.264 CRF 18, 1080p30 | 6–10 GB |
| OBS H.264 CRF 20, 1080p30 | 4–7 GB |
| ATEM ISO per input (H.264 ~35 Mbps) | 15–16 GB |
| ATEM all 4 ISOs + program | 75–80 GB |
| Zoom local recording (1080p) | 1–2 GB |

**Typical 2-hour session (Thomas: 1 ATEM input + OBS + Zoom backup):** ~50–60 GB
**Typical 2-hour session (Isak: OBS + Zoom backup):** ~15–25 GB

---

## Pre-Session Checklist

### Both Stations

- [ ] Verify storage space (check OBS recording path + ATEM SSD if applicable)
- [ ] Open OBS, confirm "Zoom Meeting" scene is loaded
- [ ] Verify camera preview is showing in OBS
- [ ] Verify audio meters are moving when you speak
- [ ] Start OBS recording BEFORE joining Zoom
- [ ] Start ATEM recording BEFORE joining Zoom (Thomas only)
- [ ] Join Zoom, verify camera and mic sources are correct
- [ ] Start Zoom local recording (Record → Record on This Computer)
- [ ] 3-second countdown clap for sync reference
- [ ] Confirm Thomas and Isak can see and hear each other

### Post-Session

- [ ] Stop Zoom recording
- [ ] Stop OBS recording
- [ ] Stop ATEM recording (Thomas)
- [ ] Remux OBS MKV → MP4 (File → Remux Recordings)
- [ ] Verify all files exist and are playable
- [ ] Copy ATEM SSD files to archive drive (Thomas)
- [ ] Note session date/time and file locations

---

## Zoom Settings (Both Stations)

These Zoom settings should be configured once:

- Settings → Recording → **Record on This Computer** (not cloud)
- Settings → Recording → ✓ Record a separate audio file for each participant
- Settings → Recording → ✓ Record video during screen sharing
- Settings → Video → Camera: OBS Virtual Camera (Isak) or Canon Webcam (Thomas)
- Settings → Video → ✓ HD (enable 1080p if available on your plan)
- Settings → Audio → Microphone: your primary mic (USB mic or Focusrite)
- Settings → Audio → ✓ Automatically adjust microphone volume: OFF (control levels manually)

---

## Troubleshooting

| Problem | Solution |
|---------|----------|
| OBS Virtual Camera not showing in Zoom | Restart Zoom after starting OBS Virtual Camera |
| Canon Webcam Utility not detected | Reconnect USB, ensure camera is ON and in photo/video mode |
| BlackHole not capturing Zoom audio (Mac) | Check Audio MIDI Setup — Multi-Output Device must be system default |
| ATEM not recognizing SSD | Reformat SSD as ExFAT, use a fast USB-C SSD (not spinning drive) |
| OBS dropping frames | Lower encoder preset (use "veryfast"), reduce resolution, or close other apps |
| Audio echo in recording | Wear headphones during call. Ensure Zoom speaker output goes to headphones, not speakers |
| MKV file won't open | Remux to MP4 in OBS (File → Remux). MKV is crash-safe but some players don't handle it |
| Canon R50 overheats | Use dummy battery (Canon DR-E12 + AC adapter). Don't record internally on the camera — only output via HDMI/USB |

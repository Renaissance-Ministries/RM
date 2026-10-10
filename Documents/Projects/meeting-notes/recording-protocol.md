# Recording Protocol — Zoom Meetings & Article Sessions

**Last updated:** 9 October 2026
**Purpose:** Step-by-step technical guide for producing high-quality video from Thomas/Isak Zoom meetings. Each person records their own camera locally at full quality. Zoom is only the communication layer — never the recording source. The two local recordings are synced and combined in post-production.

---

## Equipment Inventory

### Thomas (Montana — Windows, i9-14900K)

| Item | Model | Connection | Notes |
|------|-------|------------|-------|
| Camera (primary) | Canon R50 (mirrorless, APS-C) | micro-HDMI → ATEM (recording), USB-C → computer (Zoom only) | Dummy battery on order — needed for sessions >30 min. **Always use HDMI for recording — never Webcam Utility (720p compressed).** |
| Camera (backup) | Canon T8i (DSLR) | mini-HDMI → ATEM Input 2 | Different HDMI cable than R50. Second angle. |
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

## Recording Architecture — Dual Local Recording

### The Core Principle

**Zoom is the telephone, not the camera.** Zoom video is heavily compressed (~1-2 Mbps, artifacts, resolution drops). It's fine for live conversation but unusable for polished video content.

Instead: **each person records their own camera locally at full quality.** The two high-quality local recordings are synced and combined in post-production. The final video has broadcast-quality footage of both participants — no Zoom compression anywhere in the final product.

### What Records What

| System | What it captures | Quality | Purpose |
|--------|-----------------|---------|---------|
| **OBS** (both stations) | **Own camera only** + own mic (local, full quality) | High (CRF 16, 1080p, ~10-15 GB/hr) | **Primary recording — this is the final product source** |
| **ATEM Mini Pro ISO** (Thomas only) | Each HDMI camera input as separate file | High (H.264, ~35 Mbps, 1080p) | Multi-angle ISO recording (redundant to OBS, higher bitrate) |
| **Zoom local recording** (both) | Combined call (both sides, compressed) | Low-medium | Backup / sync reference only — never used in final edit |

### Why This Works

- Thomas's face: recorded by Thomas's ATEM (via HDMI, 1080p, ~35 Mbps) AND Thomas's OBS (full quality)
- Isak's face: recorded by Isak's OBS (full quality, 1080p)
- Both audio tracks: recorded locally through each person's mic, separate OBS tracks
- Zoom carries the conversation but contributes nothing to the final video
- In post: sync the two local recordings by audio waveform (3-second clap at start), combine into a polished two-person video

### Quality Hierarchy

The biggest factors in video quality, in order:

1. **Lighting** — A $500 camera with good lighting beats a $5,000 camera in a dark room
2. **Audio** — Viewers tolerate mediocre video but leave immediately for bad audio
3. **Lens/glass** — Determines sharpness, depth of field, color
4. **Sensor/camera** — Resolution, low-light performance, dynamic range
5. **Recording settings** — Bitrate, codec, format (assuming you're recording locally, this is the easy part)
6. **Framing/composition** — Rule of thirds, eye-level camera, clean background

---

## Production Quality Guide

### Lighting (Most Important)

Good lighting is the single biggest quality upgrade. A $200 light setup transforms the image more than a $3,000 camera upgrade.

#### Minimum Setup (~$150-300)

- **1 key light:** LED panel or softbox, positioned 45° to the side at eye level or slightly above. This is the main light on your face. A large, diffused source (softbox, umbrella, or panel with diffusion) eliminates harsh shadows.
- **1 fill light or bounce:** Either a second, dimmer light on the opposite side, or a white foam board / reflector to bounce the key light. This fills in shadows without creating a second set of shadows.
- **No overhead room lights.** Ceiling lights cast downward shadows under the eyes and nose ("raccoon eyes"). Turn them off and use only your key/fill.

#### Upgrade Setup (~$500)

- Key light + fill light + backlight (hair light). The backlight separates you from the background and adds depth.
- Color temperature: All lights should match — either all daylight (5600K) or all tungsten (3200K). Mixed color temperatures look amateur.
- If using green screen: light the green screen separately and evenly. Shadows on the green screen cause bad keying.

#### Quick Fixes If You Have No Lights

- Face a window. Natural window light is soft and flattering. The window is your key light.
- Put a white sheet of paper or foam board on the opposite side of the window to bounce fill.
- Never sit with a window behind you — that makes you a silhouette.

### Audio (Second Most Important)

Viewers tolerate mediocre video but leave for bad audio within seconds.

#### Thomas

- **Focusrite Scarlett + a condenser or dynamic mic** is the correct setup. This is already miles ahead of a camera-mounted or built-in mic.
- Mic placement: 6-12 inches from mouth, slightly off-axis (not directly in front — reduces plosives).
- Room treatment: If the room echoes, hang blankets or heavy curtains on the walls behind and beside the mic. Even a few blankets make a dramatic difference.
- Pop filter: A $10 pop filter or foam windscreen eliminates plosive bursts on P/B sounds.

#### Isak

- **Minimum:** A decent USB mic (Audio-Technica AT2020 USB, Blue Yeti, or similar). Not the built-in MacBook mic — it picks up fan noise, keyboard, and room echo.
- **Better:** An audio interface (Focusrite Scarlett Solo, ~$80) + a condenser mic (AT2020, ~$100). XLR connection, cleaner signal, proper gain control.
- Same room treatment advice applies.

#### Audio Settings in OBS

- Monitor levels: peaks at **-12 dB to -6 dB**. Never hitting 0 dB (clipping).
- OBS Filters (right-click mic source → Filters):
  - **Noise Gate:** Close threshold -32 dB, Open threshold -26 dB. Cuts background noise when you're not speaking.
  - **Compressor:** Ratio 3:1, Threshold -18 dB. Evens out loud/quiet moments.
  - **Noise Suppression:** RNNoise (built into OBS). Removes constant background hum/fan noise.
- Turn off Zoom's "Automatically adjust microphone volume" — you want manual control.

### Framing & Composition

- **Camera at eye level.** Not looking up from a laptop angle (unflattering, up-the-nose shot). Stack the laptop on books, or use an external camera on a tripod at eye level.
- **Rule of thirds:** Your eyes should be roughly on the top third line of the frame, not dead center.
- **Headroom:** Small gap between the top of your head and the top of frame. Not too much (floating head), not too little (cropped forehead).
- **Background:** Clean and uncluttered. Green screen with composited background, or a real background that's intentional (bookshelf, office). Avoid visible clutter, open doors, bright windows behind you.
- **Tight framing for teleprompter:** Head and shoulders. Not a wide shot showing the desk. Viewers connect with faces.

### Green Screen (Thomas)

- Light the green screen **separately** from yourself. Two small lights angled at the screen from each side, creating even coverage with no hot spots or shadows.
- Stand/sit at least 3-4 feet away from the green screen to avoid green spill on your skin/clothes.
- Don't wear green.
- In OBS: Add a Chroma Key filter to the camera source (right-click → Filters → Chroma Key). Adjust Similarity and Smoothness until the edges look clean.

---

## Setup: Dual Local Recording (Both Stations)

**Zoom is only the telephone.** Each person records their own camera locally. The two recordings are combined in post.

### Isak's Setup (macOS + OBS)

#### One-Time OBS Configuration

1. **Install required software:**
   - OBS Studio (free, obsproject.com)
   - BlackHole 2ch (free virtual audio driver — github.com/ExistentialAudio/BlackHole) — needed on macOS to capture Zoom's audio for the backup/reference track

2. **Set up BlackHole audio routing (one-time):**
   - Open **Audio MIDI Setup** (Applications → Utilities)
   - Click "+" → Create Multi-Output Device
   - Check both your headphones/speakers AND "BlackHole 2ch"
   - Set this Multi-Output Device as your system output (System Settings → Sound → Output)
   - This sends audio to your ears AND to BlackHole simultaneously

3. **Configure OBS settings:**
   - Settings → Output → Output Mode: **Advanced**
   - Recording tab:
     - Recording Format: **MKV** (crash-safe — remux to MP4 after)
     - Encoder: **Apple VideoToolbox H.264** (hardware-accelerated)
     - Rate Control: **CRF 16** (high quality — visually lossless for talking-head content)
     - Audio Tracks: check **1, 2**
   - Settings → Video:
     - Base Resolution: 1920×1080
     - Output Resolution: 1920×1080
     - FPS: 30
   - Settings → Audio:
     - Sample Rate: 48 kHz

4. **Create OBS Scene — "My Camera Only":**
   - **Source 1 — "My Camera":** Video Capture Device → select your webcam. **Make this fill the entire canvas (1920×1080).** This is the only video source — no Zoom window capture.
   - **Source 2 — "My Mic":** Audio Input Capture → select your USB mic
   - **Source 3 — "Zoom Audio (reference)":** Audio Input Capture → select "BlackHole 2ch" — this captures Thomas's voice as a reference track for syncing in post, but it will NOT be used in the final video's audio

5. **Set up audio tracks (Advanced Audio Properties):**
   - In the Audio Mixer, click the gear icon → Advanced Audio Properties
   - **My Mic:** Track 1 ✓, Track 2 ✗ — your voice, high quality, locally recorded
   - **Zoom Audio:** Track 1 ✗, Track 2 ✓ — Thomas's voice (Zoom-compressed), reference/sync only
   - Track 1 = your clean local mic. Track 2 = Zoom reference for syncing.

6. **Set up OBS Virtual Camera for Zoom:**
   - Click **Start Virtual Camera** in OBS
   - In Zoom → Settings → Video → select **"OBS Virtual Camera"**
   - This sends your camera to Zoom for the live conversation

7. **Add OBS Filters to mic source** (right-click "My Mic" → Filters):
   - Noise Suppression (RNNoise)
   - Noise Gate (Close: -32 dB, Open: -26 dB)
   - Compressor (Ratio: 3:1, Threshold: -18 dB)

#### Per-Session Steps

1. Set up lighting (key light on, room lights off).
2. Open OBS. Verify "My Camera Only" scene is loaded.
3. Check: camera preview fills the canvas at 1080p, audio meters moving when you speak.
4. **Start OBS recording.**
5. Open Zoom, join the meeting.
6. In Zoom: verify video is "OBS Virtual Camera," mic is your USB mic.
7. **Start Zoom local recording** (Record → Record on This Computer) as backup/reference.
8. **3-second countdown clap** for sync — both Thomas and Isak clap simultaneously.
9. Conduct the meeting.
10. Stop Zoom recording, then stop OBS recording.
11. **Remux MKV:** OBS → File → Remux Recordings → select .mkv → Remux.
12. Verify file is playable.
13. **Send your OBS file to Thomas** (via Syncthing, Google Drive, or Parsec file transfer) for post-production. Only Track 1 (your mic) will be used in the final edit.

**What you get:** A single 1080p MKV of your face + your clean local audio. This is your half of the final video.

---

### Thomas's Setup (Windows + OBS + ATEM)

#### Signal Flow

```
Canon R50 ──micro-HDMI──→ ATEM Input 1 ──records ISO to SSD (1080p, ~35 Mbps)
(Canon T8i ──mini-HDMI──→ ATEM Input 2, if second angle desired)

                          ATEM USB-C ──→ SSD (ExFAT, Samsung T7 or similar)

Canon R50 ──USB-C──→ Computer (Canon Webcam Utility — 720p)
                         └──→ Zoom ONLY (for live conversation — NOT for recording)

Focusrite Scarlett + mic ──USB──→ Computer
                                    ├──→ OBS Audio Track 1 (local mic, high quality)
                                    └──→ Zoom (mic source for conversation)

Zoom desktop audio ──→ OBS Audio Track 2 (Isak's voice, reference/sync only)
```

**Key point:** The Canon Webcam Utility (720p, compressed) is ONLY used for Zoom — so Isak can see Thomas during the conversation. The actual recording comes from the HDMI clean output (1080p, uncompressed) going to the ATEM. **Never use the Webcam Utility feed for the final video.**

#### One-Time Setup

1. **Install Canon EOS Webcam Utility** (free from Canon).
2. Connect Canon R50 via **both:**
   - micro-HDMI → ATEM Input 1 (for high-quality recording)
   - USB-C → computer (for Webcam Utility → Zoom only)
3. **ATEM setup:**
   - Connect fast USB-C SSD (Samsung T7 or similar, ExFAT) to ATEM USB-C port.
   - ATEM Software Control → Recording palette → verify drive recognized.
   - Project video standard: **1080p 29.97**.
4. **OBS setup:**
   - Settings → Output → Advanced → Recording Format: **MKV**
   - Encoder: **NVENC H.264** (NVIDIA GPU) or **x264** "veryfast" preset
   - Rate Control: **CRF 16**
   - Audio Tracks: check **1, 2**
   - Video: 1920×1080, 30 FPS
   - Audio: 48 kHz
5. **OBS Scene — "My Camera Only":**
   - If Thomas has a capture card (e.g., Elgato Cam Link): ATEM HDMI Out → capture card → OBS Video Capture Device. This gives OBS the same 1080p HDMI feed as the ATEM for a redundant local recording.
   - If no capture card: OBS records Canon Webcam Utility feed as a lower-quality backup. The ATEM ISOs on SSD are the primary high-quality recording.
   - Audio: Focusrite Scarlett on Track 1, Desktop Audio (Zoom/Isak) on Track 2 (reference only).
6. **OBS Filters on Focusrite mic source:**
   - Noise Suppression (RNNoise)
   - Noise Gate (Close: -32 dB, Open: -26 dB)
   - Compressor (Ratio: 3:1, Threshold: -18 dB)
7. **Zoom:** Video → "Canon Webcam" (720p, for conversation only). Audio → Focusrite Scarlett.

#### Per-Session Steps

1. Set up lighting (key light, fill, green screen lights if using).
2. Power on Canon R50 (dummy battery for sessions >30 min).
3. Open ATEM Software Control. Verify SSD connected and has space.
4. **Press REC on the ATEM** — ISO recording starts.
5. Open OBS. Verify scene. **Start OBS recording.**
6. Join Zoom. Verify camera is "Canon Webcam," mic is Focusrite.
7. **Start Zoom local recording** as backup.
8. **3-second countdown clap** — both participants clap simultaneously.
9. Conduct meeting.
10. Stop Zoom → Stop OBS → Stop ATEM.
11. Remux OBS MKV → MP4.
12. Verify all files.

**What you get:**
- **ATEM SSD:** Camera 1 ISO (1080p, ~35 Mbps H.264) + program output + DaVinci Resolve project file (.drp). **This is the primary high-quality recording of Thomas.**
- **OBS:** Backup MKV with local audio tracks.
- **Zoom:** Low-quality backup/reference.

#### Multi-Camera Option (When Available)

```
Canon R50 ──HDMI──→ ATEM Input 1 (tight/medium shot)
Canon T8i ──HDMI──→ ATEM Input 2 (wide shot or alternate angle)
                         │
                    ATEM records all ISOs to SSD
                    Each camera = separate file, synced, switchable in Resolve
```

The ATEM auto-generates a `.drp` project file with all ISOs on a multicam timeline. Open in DaVinci Resolve and switch angles in post as if you were live-switching.

---

## Guest Recording — NDI Capture via Zoom Business

When guests join a Zoom meeting (fellowship members, Joelle, collaborators, interviewees), they won't have an OBS setup. Their video comes through Zoom. To get the cleanest possible capture of their feed, use Zoom's NDI output — it sends each participant as a separate, isolated video stream directly to OBS on Isak's machine.

**The guest does nothing special.** They join Zoom normally. All the capture happens on Isak's end.

### Requirements (Isak's Machine Only)

| Requirement | Details |
|-------------|---------|
| Zoom plan | **Business** or higher (NDI is not available on Free or Pro) |
| Zoom version | 6.0+ |
| Zoom setting | Settings → General → ✓ "Use NDI for broadcasting" (may need admin to enable in web portal first) |
| OBS plugin | **obs-ndi** — install from github.com/obs-ndi/obs-ndi (includes NDI runtime) |

### One-Time Setup

1. **Upgrade Zoom to Business** (zoom.us → account → billing).
2. **Enable NDI in Zoom admin portal:**
   - Sign in at zoom.us → Settings → In Meeting (Advanced) → "Allow use of NDI for broadcasting" → **On**
   - This is an account-level setting, not per-meeting.
3. **Install obs-ndi plugin:**
   - Download from github.com/obs-ndi/obs-ndi/releases
   - Install (includes the NDI runtime library)
   - Restart OBS

### Per-Session Setup (Guest Meetings)

1. Start the Zoom meeting.
2. **Enable NDI broadcasting in the meeting:** Click "..." (More) at the bottom of the Zoom window → select **"Allow NDI Broadcasting"** (or it may auto-enable based on your settings).
3. In OBS, create a new Scene called **"Guest Meeting":**

   **Sources:**
   - **"My Camera"** — Video Capture Device → your webcam (local, high quality — same as always)
   - **"Thomas NDI"** — NDI Source → select "ZOOM - Thomas Abshier" (each Zoom participant appears as a named NDI source)
   - **"Guest NDI"** — NDI Source → select "ZOOM - [Guest Name]"
   - **"My Mic"** — Audio Input Capture → your USB mic
   - Add additional NDI sources for each guest

4. **Layout the sources on the canvas:**
   - Your camera: full 1080p, positioned however you want
   - NDI feeds: sized and positioned as needed (side by side, grid, picture-in-picture)
   - Each NDI source can be individually cropped, scaled, and color-corrected

5. **Audio routing:**
   - Track 1: Your mic (clean, local)
   - Track 2: NDI audio from each guest (comes embedded in the NDI stream — each NDI source carries its own audio, which you can separate in Advanced Audio Properties)
   - Note: NDI audio from Zoom is still Zoom-compressed, but it's isolated per participant — much better for post-processing than a single mixed Zoom audio track

6. **Record in OBS** with the Source Record plugin (or record the composite). Each NDI source can also be recorded as its own file using Source Record filters.

### What NDI Gives You vs. Regular Zoom Capture

| | Window Capture (old method) | NDI Capture |
|---|---|---|
| Video quality | Zoom-compressed, same | Zoom-compressed, same |
| Isolation | One big window — all participants mixed | **Each participant is a separate source** |
| UI chrome | Zoom name tags, borders, reactions visible | **Clean video only — no UI** |
| Audio | One mixed audio track | **Separate audio per participant** |
| Scaling/cropping | Awkward — depends on Zoom window layout | **Full control per source** |
| Color correction | Applied to entire window | **Per-participant in Resolve** |

**The video resolution is still limited by what Zoom transmits** (typically 720p, up to 1080p on Business plan with good bandwidth). NDI doesn't magically make it sharper — but it gives you a clean, isolated, UI-free feed that you can work with professionally in post.

### Guest Quality Tiers

| Tier | Guest does... | Video quality | When to use |
|------|--------------|---------------|-------------|
| **Tier 1 — Local OBS** | Records locally in OBS, sends file after | Full 1080p, studio quality | Repeat guests, team members (Thomas, Joelle) |
| **Tier 2 — NDI** | Nothing — just joins Zoom | 720p-1080p, clean isolated feed | Most guests — default approach |
| **Tier 3 — Zoom backup** | Nothing — just joins Zoom | 720p-1080p, mixed with UI | Emergency fallback if NDI fails |

### Guest Instruction Sheet (Tier 1 — For Repeat Guests)

Send this to guests who will appear multiple times and are willing to record locally:

> **Quick Recording Setup (5 minutes)**
>
> To help us get the best video quality, please record your camera locally during our Zoom call:
>
> 1. Download OBS Studio (free): obsproject.com
> 2. Open OBS. You'll see a black canvas.
> 3. Click "+" under Sources → Video Capture Device → select your webcam. It should fill the screen.
> 4. Click "+" under Sources → Audio Input Capture → select your microphone.
> 5. Settings → Output → Recording Format: MKV. Everything else can stay default.
> 6. Click **"Start Recording"** before joining the Zoom call.
> 7. Join Zoom normally — use your regular camera and mic in Zoom (OBS records separately in the background).
> 8. At the start of the call, we'll do a **3-second countdown clap** together — please clap along. This helps us sync the recordings in editing.
> 9. When the call ends, click **"Stop Recording"** in OBS.
> 10. Send us the file: OBS → File → Remux Recordings (converts to MP4). Then share via Google Drive, Dropbox, or email.
>
> That's it! The file will be ~5-10 GB per hour. If you have any trouble, don't worry — we have a backup recording on our end.

---

## OBS Recording Settings (Both Stations)

| Setting | Value | Why |
|---------|-------|-----|
| Output Mode | Advanced | Full control over codec/quality |
| Recording Format | **MKV** | Crash-safe. Remux to MP4 after. |
| Encoder (Mac) | Apple VideoToolbox H.264 | Hardware-accelerated, low CPU |
| Encoder (Windows/NVIDIA) | NVENC H.264 | Hardware-accelerated, low CPU |
| Encoder (Windows/no GPU) | x264, "veryfast" preset | CPU-based fallback |
| Rate Control | **CRF 16** | High quality. Visually lossless for talking-head content. ~10-15 GB/hr. |
| Resolution | 1920×1080 | Full HD |
| FPS | 30 | Standard for talking-head content |
| Keyframe Interval | 2 seconds | Good for editing compatibility |
| Audio Sample Rate | 48 kHz | Video standard |
| Audio Bitrate | 320 kbps AAC per track | High quality |
| Audio Tracks | 2 | Track 1 = **local mic only** (clean), Track 2 = Zoom reference (sync only) |

**Why CRF 16 instead of 18-20?** For video that will be color graded, edited, and re-encoded for final delivery, starting with higher quality gives more headroom. CRF 16 is visually lossless — you cannot see the compression. The file size increase (~50% larger than CRF 20) is worth it for content meant to be polished.

---

## Audio Routing Summary

In the dual local recording model, each person's clean audio is recorded locally. The remote participant's audio is captured only as a low-quality reference for syncing in post — it is never used in the final product.

### Isak (macOS)

| What | How | OBS Track | Used in final video? |
|------|-----|-----------|---------------------|
| **Your mic** | USB mic → Audio Input Capture in OBS | **Track 1** | **YES — this is your final audio** |
| Thomas's voice (reference) | Zoom → BlackHole → Audio Input Capture | Track 2 | No — sync reference only |
| Zoom hears you | USB mic selected directly in Zoom audio settings | — | — |

### Thomas (Windows)

| What | How | OBS Track | Used in final video? |
|------|-----|-----------|---------------------|
| **Your mic** | Focusrite Scarlett → Audio Input Capture in OBS | **Track 1** | **YES — this is your final audio** |
| Isak's voice (reference) | Zoom → Desktop Audio (captured natively on Windows) | Track 2 | No — sync reference only |
| Zoom hears you | Focusrite selected in Zoom audio settings | — | — |

### Why This Matters

In the old model, Thomas's audio on Isak's recording was Zoom-compressed (low bitrate, artifacts, network jitter). In this model, Thomas's final audio comes from Thomas's own Focusrite/mic recording — studio quality. Same for Isak's audio on Thomas's end.

---

## Post-Production in DaVinci Resolve

### What You're Working With

After a session, you have:

| File | Source | Contains | Quality |
|------|--------|----------|---------|
| `Thomas_ATEM_Cam1.mp4` | ATEM SSD | Thomas's face (HDMI clean output) + Thomas's audio | **1080p, ~35 Mbps** — primary Thomas video |
| `Thomas_OBS.mkv` → `.mp4` | Thomas's OBS | Thomas's face (backup) + Thomas mic (Track 1) + Isak ref (Track 2) | 1080p CRF 16 — backup video, primary audio |
| `Isak_OBS.mkv` → `.mp4` | Isak's OBS | Isak's face + Isak mic (Track 1) + Thomas ref (Track 2) | **1080p CRF 16** — primary Isak video + audio |
| `Zoom_backup.mp4` | Zoom | Both sides, compressed | Low — emergency backup only |
| `.drp` project file | ATEM SSD | Pre-synced multicam timeline | — |

### Step 1: Get All Files in One Place

Isak sends his OBS MP4 to Thomas's PC (via Syncthing, Google Drive, or Parsec drag-and-drop). Or Isak remotes into Thomas's PC via Parsec and pulls it directly.

### Step 2: Import and Organize

1. Remux all MKV files to MP4 (OBS → File → Remux Recordings).
2. Open DaVinci Resolve. Create a new project (or open the ATEM's `.drp` file as a starting point).
3. Create bins in Media Pool:
   - **Thomas Video** — ATEM ISO(s)
   - **Isak Video** — Isak's OBS MP4
   - **Audio** — Extract Track 1 from each OBS recording (each person's clean mic)
   - **Reference** — Zoom backup (only if needed)

### Step 3: Sync the Two Local Recordings

The two OBS recordings and the ATEM ISOs have no shared timecode. Sync them using the 3-second clap:

**Method 1 — Audio waveform sync (recommended):**
1. Both recordings contain both voices (local clean + Zoom reference). The shared audio content lets Resolve align them automatically.
2. Select all clips → right-click → **Auto Sync Audio → Based on Waveform.**
3. Resolve matches the waveforms and aligns everything within a few frames.

**Method 2 — Manual clap sync:**
1. Find the clap transient at the start of each recording's waveform.
2. Place a marker on each clap. Align the markers on the timeline.

### Step 4: Build the Timeline

1. **Two-person layout:** Place Thomas's ATEM ISO on Video Track 1, Isak's OBS on Video Track 2.
2. **Audio:** Use Track 1 from Thomas's OBS (his clean Focusrite audio) on Audio Track 1. Use Track 1 from Isak's OBS (his clean mic audio) on Audio Track 2. Discard the Zoom reference tracks.
3. **Switching:** For a conversation video, cut between the two camera angles based on who's speaking. Or use a side-by-side split-screen layout.
4. **If Thomas has multiple ATEM ISOs** (multi-camera): use Resolve's multicam feature — right-click synced clips → Create Multicam Clip → switch angles in real-time playback on the Cut page.

### Step 5: Color and Audio

1. **Color page:** Grade each camera angle to match. The Canon R50 and Isak's webcam will have different color profiles, white balance, and exposure. Use Resolve's Color Match feature or manually adjust.
2. **Fairlight page:** Per-track EQ, compression, noise reduction. Thomas's Focusrite audio will likely need less processing than Isak's USB mic.
3. **Subtitles (optional):** Resolve can auto-generate subtitles from audio (Edit page → Timeline → Create Subtitles from Audio, or use Whisper externally).

### Step 6: Export

| Destination | Settings |
|-------------|----------|
| YouTube / web | H.264, 1080p, 15-20 Mbps CBR, AAC 320 kbps |
| Archival master | ProRes 422 or DNxHR HQ (large but lossless for future re-edits) |
| Quick share | H.264, 1080p, 8-10 Mbps (smaller file, still good quality) |

---

## File Sizes Per Hour

| Source | Approx. Size/Hour |
|--------|--------------------|
| OBS H.264 CRF 16, 1080p30 | 10–15 GB |
| ATEM ISO per input (H.264 ~35 Mbps) | 15–16 GB |
| ATEM 2 ISOs + program | 45–48 GB |
| Zoom local recording (1080p) | 1–2 GB |
| Final export H.264 web (15 Mbps) | ~7 GB |
| Final export ProRes 422 archival | 40–60 GB |

**Typical 2-hour session:**
- **Thomas (1 ATEM ISO + OBS + Zoom):** ~55–65 GB
- **Isak (OBS + Zoom):** ~22–32 GB
- **Transfer to combine:** Isak sends ~22-32 GB to Thomas (or edits remotely via Parsec)

---

## Pre-Session Checklist

### Environment (Both Stations)

- [ ] **Lighting on** — key light positioned, room lights OFF
- [ ] **Camera at eye level** — not laptop angle
- [ ] **Background clean** — green screen lit evenly (Thomas), or tidy background (Isak)
- [ ] **Headphones on** — prevents echo in recording
- [ ] **Quiet environment** — close windows, silence phone, shut door
- [ ] **Dummy battery connected** (Thomas — Canon R50, sessions >30 min)

### Technical (Both Stations)

- [ ] Verify storage space (check OBS recording path + ATEM SSD)
- [ ] Open OBS, confirm **"My Camera Only"** scene is loaded
- [ ] Verify camera preview fills the canvas at 1080p
- [ ] Verify audio meters are moving when you speak (peaks -12 to -6 dB)
- [ ] Check OBS recording settings: MKV, CRF 16, 1080p, 30 FPS
- [ ] **Start ATEM recording** BEFORE joining Zoom (Thomas only)
- [ ] **Start OBS recording** BEFORE joining Zoom
- [ ] Join Zoom, verify camera and mic sources are correct
- [ ] Start Zoom local recording (Record → Record on This Computer) as backup
- [ ] **3-second countdown clap** — both participants clap simultaneously for sync
- [ ] Confirm both can see and hear each other

### Post-Session

- [ ] Stop Zoom recording
- [ ] Stop OBS recording
- [ ] Stop ATEM recording (Thomas)
- [ ] Remux OBS MKV → MP4 (OBS → File → Remux Recordings)
- [ ] Verify all files exist and are playable
- [ ] Copy ATEM SSD files to archive drive (Thomas)
- [ ] **Isak: send OBS MP4 to Thomas** (Syncthing, Drive, or Parsec)
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

## Remote Access — Editing & File Transfer

### The Problem

The ATEM records ISO files to a USB SSD physically connected to the ATEM, not to Thomas's computer. After the meeting, Thomas plugs the SSD into his PC (or it stays connected via a USB hub). The files sit on that drive — Isak has no access unless remote access is set up.

### Option A: Parsec — Remote Desktop (Recommended)

Edit on Thomas's machine remotely. His i9 (24-core, once the chip defect is patched) is more powerful than most editing machines. Parsec was built for remote GPU workloads — it streams Thomas's desktop to Isak's Mac at low latency with hardware-accelerated encoding.

**What you can do with Parsec:**
- Browse the ATEM SSD folders
- Open the `.drp` project file in DaVinci Resolve on Thomas's PC
- Do the full multicam edit (switch angles, color grade, mix audio)
- Export the final cut
- Transfer only the finished video (~1-2 GB) instead of the raw ISOs (~30-60 GB)
- Start/stop OBS, manage files, troubleshoot — full desktop control

#### Thomas Setup (One-Time — Windows)

1. Download Parsec from parsec.app (free for personal use).
2. Install and create a Parsec account.
3. Sign in and leave Parsec running (it starts with Windows by default).
4. In Parsec settings:
   - Hosting → Hosting Enabled: **On**
   - Hosting → Resolution: **1920×1080** (match his monitor)
   - Hosting → Bandwidth Limit: **50 Mbps** (Thomas has gigabit fiber — this is fine)
   - Hosting → H.265: **On** (better quality at lower bandwidth, i9 supports it)
5. Share the Parsec account credentials with Isak, or add Isak as an approved user.

#### Isak Setup (One-Time — macOS)

1. Download Parsec from parsec.app.
2. Install and sign in (same account, or Isak's own account if Thomas approved him).
3. Thomas's PC will appear in the Computers list.
4. Click to connect. Full desktop access.

#### Using Parsec for Post-Production

1. Connect to Thomas's PC via Parsec.
2. Open the ATEM SSD in File Explorer — files are in `Video ISO Files/`, `Program/`, and `Project Files/`.
3. Double-click the `.drp` file → opens in DaVinci Resolve with all ISOs pre-synced.
4. Edit: Cut page for multicam switching, Edit page for detailed timeline work, Fairlight for audio.
5. Import Isak's OBS recording if needed (transfer Isak's MP4 to Thomas's PC via Google Drive, Syncthing, or Parsec's file transfer — drag and drop files between machines).
6. Export final video: Deliver page → H.264 for web (~1-2 GB/hr), ProRes for archival.
7. Transfer finished video back to Isak's Mac (Parsec drag-and-drop, or Syncthing/Drive).

#### Parsec During a Live Meeting

Parsec can also run during a Zoom call — Isak can remotely control Thomas's OBS or ATEM Software Control while both are on Zoom. However, this uses significant bandwidth. On Thomas's gigabit fiber this should be fine, but test it first. If there's interference with Zoom quality, use the OBS WebSocket method instead (see below).

### Option B: Syncthing — Automatic File Sync

Syncthing is free, open-source, peer-to-peer file sync. No cloud, no monthly fee, encrypted. Files in a shared folder on Thomas's PC automatically appear on Isak's Mac.

**Best for:** Getting raw files transferred without manual effort. Set it and forget it.

**Trade-off:** Large files take time. A 2-hour session with 1 ATEM input + program (~30-35 GB) over typical fiber upload speeds (~35 Mbps) takes ~2+ hours to transfer. Gigabit symmetric fiber would be much faster, but most residential fiber is asymmetric.

#### Thomas Setup (One-Time — Windows)

1. Download Syncthing from syncthing.net (or install via `winget install Syncthing.Syncthing`).
2. Open the Syncthing web UI (http://localhost:8384).
3. Add a folder to share:
   - Folder Label: "Recordings"
   - Folder Path: Point to the location where ATEM SSD files get copied (e.g., `D:\Recordings\` — a folder on the internal drive, not the SSD itself)
   - Or point directly to the OBS recording output folder (e.g., `C:\Users\Thomas\Videos\OBS\`)
4. Under "Sharing" tab, share with Isak's device (add Isak's device ID — see below).

#### Isak Setup (One-Time — macOS)

1. Install Syncthing: `brew install syncthing` then `brew services start syncthing`.
2. Open http://localhost:8384.
3. Add Thomas's device (Actions → Add Remote Device → paste Thomas's Device ID).
4. Accept the shared "Recordings" folder. Choose a local path (e.g., `~/Documents/Projects/recordings-sync/`).
5. Files will automatically sync whenever both machines are online.

#### Workflow with Syncthing

1. After a meeting, Thomas copies ATEM SSD files to the shared `D:\Recordings\` folder.
2. Syncthing detects new files and begins transferring to Isak's Mac.
3. Isak gets a notification when sync is complete.
4. Isak edits locally in DaVinci Resolve on his own machine.
5. Optional: Isak puts the finished export in a "Finished" subfolder that syncs back to Thomas.

### Option C: OBS Remote Control (Live Meeting Only)

Control Thomas's OBS during a meeting without full desktop access. Lightweight — uses OBS's built-in WebSocket server.

#### Thomas Setup (One-Time)

1. In OBS: Tools → WebSocket Server Settings.
2. Enable WebSocket Server: **On**.
3. Server Port: **4455** (default).
4. Set a password.
5. If Thomas's router allows port forwarding: forward port 4455 to his PC's local IP. (If not, use Parsec or a Zoom screen share as fallback.)

#### Isak Control

1. Open a web-based OBS controller in your browser — e.g., **obs-web** (github.com/obsproject/obs-web) or **Streamer.bot** web UI.
2. Enter Thomas's public IP + port 4455 + password.
3. You can: start/stop recording, switch scenes, monitor audio levels, toggle sources — all from your browser during the Zoom call.

### Recommendation

| Need | Use |
|------|-----|
| Edit ATEM ISOs in Resolve remotely | **Parsec** — edit on Thomas's hardware |
| Auto-transfer raw files to your Mac | **Syncthing** — set and forget |
| Control OBS during a live meeting | **OBS WebSocket** — browser control panel |
| Quick one-off file transfer | **Parsec drag-and-drop** or Google Drive |

**Start with Parsec** — it solves remote editing AND is already on the action list for the i9 chip fix (g13). Syncthing is a nice add-on once you want automated transfers.

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
| Parsec laggy or choppy | Lower hosting resolution to 1080p, enable H.265, check Thomas's upload speed (need 15+ Mbps) |
| Parsec can't connect | Ensure Parsec is running on Thomas's PC (check system tray). Check firewall isn't blocking it |
| Syncthing not syncing | Both machines must be online. Check web UI (localhost:8384) for errors. Verify shared folder paths |
| OBS WebSocket won't connect | Verify port 4455 is forwarded on Thomas's router, or use Parsec as fallback |

# Call recording

`demo-call.mp4` is the recording played by the Voice AI card in the Platform
section (`components/mockups/CallPlayer.tsx`, rendered from
`components/sections/Platform.tsx`).

**The file is not in the repo yet.** Until it lands, the player detects the
missing file on first press, disables itself, and shows "Recording coming
soon" — nothing looks broken on load.

## Adding it

Drop the file in this directory as `demo-call.mp4`. No code change needed;
that is the default `src`. If you name it something else, pass it through:
`<CallPlayer src="/audio/whatever.m4a" />`.

## Format

| | |
|---|---|
| **Container** | MP4/M4A with an AAC audio track |
| **Bitrate** | 128 kbps (96 kbps is fine for voice) |
| **Sample rate** | 44.1 kHz |
| **Channels** | Mono, or stereo if the two speakers are panned |
| **Length** | 15-30 seconds |
| **Target size** | Under 500 KB |

`.mp4` and `.m4a` are the same ISO-BMFF container and both play in `<audio>`
across Chrome, Edge, Safari and Firefox. `.m4a` is marginally safer: some
servers send `.mp4` as `video/mp4`, which is legal but has been known to
confuse older Safari's `<audio>` element. MP3 also works everywhere if that
is what you have.

If the source is a video file, strip the video track — `<audio>` ignores it
but the visitor still downloads it:

```sh
ffmpeg -i source.mp4 -vn -c:a aac -b:a 128k -ar 44100 -af loudnorm=I=-16:TP=-1.5 demo-call.mp4
```

The `loudnorm` filter levels it to about -16 LUFS so it is not jarringly
louder or quieter than whatever else the visitor has open.

## What to record

A real exchange between a caller and Mango, ideally the burst-pipe scenario
already shown in the hero mockup so audio and visuals match.

Record **both** sides. Just the AI half sounds like a voicemail greeting; the
turn-taking is what actually demonstrates it holds a conversation.

## Keep the copy honest

The card labels this "Real call". If what you upload is a scripted demo
rather than a genuine customer call, change that label in `CallPlayer.tsx`
to match what it actually is.

from moviepy import VideoFileClip, ImageSequenceClip
from pathlib import Path

FRAME_COUNT = 33
KEEP_EDGE_DUPLICATES = False

def make_pingpong(video_path: Path):
    clip = VideoFileClip(str(video_path))
    fps = clip.fps

    frames = []
    for i, frame in enumerate(clip.iter_frames()):
        if i >= FRAME_COUNT:
            break
        frames.append(frame)

    clip.close()

    if len(frames) != FRAME_COUNT:
        print(f"skip {video_path.name}: expected {FRAME_COUNT}, got {len(frames)}")
        return

    if KEEP_EDGE_DUPLICATES:
        reverse_frames = frames[::-1]
    else:
        reverse_frames = frames[-2:0:-1]

    output_frames = frames + reverse_frames
    output_path = video_path.with_name(video_path.stem + "_pingpong.mp4")

    new_clip = ImageSequenceClip(output_frames, fps=fps)
    new_clip.write_videofile(
        str(output_path),
        codec="libx264",
        audio=False,
        preset="slow",
        ffmpeg_params=["-crf", "12", "-pix_fmt", "yuv420p"]
    )
    new_clip.close()

    print(f"done: {output_path.name}")

def main():
    base_dir = Path(__file__).resolve().parent
    for prefix in ("s", "t"):
        for idx in range(1, 9):
            video_path = base_dir / f"{prefix}_{idx}.mp4"
            if video_path.exists():
                make_pingpong(video_path)
            else:
                print(f"missing: {video_path.name}")

if __name__ == "__main__":
    main()

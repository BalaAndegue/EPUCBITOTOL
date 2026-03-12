export function getEmbeddedVideoUrl(url: string | null | undefined): string | null {
  if (!url) return null;

  try {
    const rawUrl = new URL(url);
    const hostname = rawUrl.hostname.toLowerCase();

    // YouTube handling (youtu.be or youtube.com)
    if (hostname.includes('youtube.com') || hostname.includes('youtu.be')) {
      let videoId = '';
      if (hostname.includes('youtu.be')) {
        videoId = rawUrl.pathname.slice(1);
      } else if (rawUrl.searchParams.has('v')) {
        videoId = rawUrl.searchParams.get('v')!;
      } else if (rawUrl.pathname.startsWith('/embed/')) {
        videoId = rawUrl.pathname.split('/')[2];
      }
      return videoId ? `https://www.youtube.com/embed/${videoId}` : null;
    }

    // Facebook handling (facebook.com/watch ou facebook.com/.../videos/...)
    if (hostname.includes('facebook.com')) {
      // Facebook's official iframe construct requires the encoded URL of the video
      return `https://www.facebook.com/plugins/video.php?href=${encodeURIComponent(url)}&show_text=false&width=auto`;
    }

    return null; // Not supported
  } catch (e) {
    return null;
  }
}

// Helper function to decode base64 string to Uint8Array
function decode(base64: string): Uint8Array {
  const binaryString = atob(base64);
  const len = binaryString.length;
  const bytes = new Uint8Array(len);
  for (let i = 0; i < len; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }
  return bytes;
}

// Custom function to decode raw PCM data into an AudioBuffer
export async function decodeAudioData(
  base64: string,
  ctx: AudioContext,
): Promise<AudioBuffer> {
  const rawData = decode(base64);
  const dataInt16 = new Int16Array(rawData.buffer);
  const frameCount = dataInt16.length; // Assuming mono (1 channel)
  const numChannels = 1;
  const sampleRate = 24000; // As specified by the Gemini TTS model
  const buffer = ctx.createBuffer(numChannels, frameCount, sampleRate);

  const channelData = buffer.getChannelData(0);
  for (let i = 0; i < frameCount; i++) {
    channelData[i] = dataInt16[i] / 32768.0;
  }
  return buffer;
}

// Function to play an AudioBuffer
export function playAudio(
  audioBuffer: AudioBuffer,
  ctx: AudioContext,
): Promise<void> {
  return new Promise((resolve) => {
    const source = ctx.createBufferSource();
    source.buffer = audioBuffer;
    source.connect(ctx.destination);
    source.onended = () => resolve();
    source.start();
  });
}

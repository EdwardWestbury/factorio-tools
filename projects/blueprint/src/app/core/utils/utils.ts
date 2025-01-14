import pako from 'pako';
import { Buffer } from 'buffer';

export function decodeBlueprint(blueprintString: string) {
  const compressedBytes = Buffer.from(blueprintString.substring(1), 'base64');
  const jsonBytes = pako.inflate(compressedBytes)
  return JSON.parse(new TextDecoder("utf-8").decode(jsonBytes));
}

export function encodeBlueprint(blueprintObject: unknown): string {
  // Convert object to UTF-8 string
  const jsonString = JSON.stringify(blueprintObject);
  const textEncoder = new TextEncoder();
  const jsonBytes = textEncoder.encode(jsonString);

  // Compress using pako
  const compressedBytes = pako.deflate(jsonBytes);

  // Convert to base64 and prepend version byte
  return '0' + Buffer.from(compressedBytes).toString('base64');
}

export function convertFactorioVersionToString(versionNumber: number): string {
  // Convert to BigInt for precise handling
  const bigVersion = BigInt(versionNumber);

  // Extract 2-byte chunks in little-endian order
  const build = Number(bigVersion & BigInt(0xFFFF));
  const patch = Number((bigVersion >> BigInt(16)) & BigInt(0xFFFF));
  const minor = Number((bigVersion >> BigInt(32)) & BigInt(0xFFFF));
  const major = Number((bigVersion >> BigInt(48)) & BigInt(0xFFFF));

  // Return version string
  return `${major}.${minor}.${patch}.${build}`;
}

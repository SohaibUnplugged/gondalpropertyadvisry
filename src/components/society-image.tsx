import Image, { type ImageProps } from "next/image";

// Keep architectural detail consistent wherever a society photograph appears.
export function SocietyImage({ alt, ...props }: Omit<ImageProps, "quality">) {
  return <Image {...props} alt={alt} quality={90} />;
}

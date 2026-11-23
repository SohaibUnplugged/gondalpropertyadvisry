import { getImageProps } from "next/image";

export function HeroImage() {
  const common = {
    alt: "Usman Ali of Gondal Property Advisory, seated at his desk",
    sizes: "100vw",
    loading: "eager" as const,
    fetchPriority: "high" as const,
    className: "hero-image",
  };
  const { props: desktop } = getImageProps({
    ...common,
    src: "/images/gondal/desktop-banner.webp",
    width: 1860,
    height: 845,
  });
  const { props: mobile } = getImageProps({
    ...common,
    src: "/images/gondal/mobile-banner.webp",
    width: 1086,
    height: 1448,
  });
  return (
    <picture>
      <source media="(max-width: 700px)" srcSet={mobile.srcSet} sizes="100vw" />
      {/* Next's art-direction API supplies optimized sources to this native picture. */}
      <img {...desktop} alt={common.alt} />
    </picture>
  );
}

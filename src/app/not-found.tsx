import Link from "next/link";
export default function NotFound() {
  return (
    <main id="main" className="not-found">
      <p className="eyebrow">A DIFFERENT DIRECTION</p>
      <h1>
        This isn’t the
        <br />
        place you’re looking for.
      </h1>
      <p>The page may have moved, or the address may be incorrect.</p>
      <Link href="/" className="button button-copper">
        Return to home
      </Link>
    </main>
  );
}

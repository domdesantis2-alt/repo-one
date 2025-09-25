import Link from 'next/link';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="py-4 px-4 sm:px-6 md:px-8 text-center">
      <div className="container mx-auto text-sm text-muted-foreground">
        <p>
          © {currentYear} Daily Scripture Spark. All Rights Reserved. |{' '}
          <Link href="/privacy" className="hover:text-primary hover:underline">
            Privacy Policy
          </Link>
        </p>
      </div>
    </footer>
  );
}

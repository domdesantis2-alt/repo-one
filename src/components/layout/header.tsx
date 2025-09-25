import { Sparkles } from 'lucide-react';

export default function Header() {
  return (
    <header className="py-4 px-4 sm:px-6 md:px-8">
      <div className="container mx-auto flex items-center gap-2 justify-center">
        <Sparkles className="w-6 h-6 text-accent" />
        <h1 className="font-headline text-2xl font-bold text-center text-primary">
          Daily Scripture Spark
        </h1>
      </div>
    </header>
  );
}

'use client';

import { useState, useTransition, useEffect } from 'react';
import { RefreshCw, Share2, Sparkles, Loader2, BookText } from 'lucide-react';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/hooks/use-toast';
import { getInspirationAction } from '@/app/actions';
import { Textarea } from '@/components/ui/textarea';
import type { Verse } from '@/lib/verses';
import { Skeleton } from './ui/skeleton';

interface VerseCardProps {
  allVerses: Verse[];
}

export function VerseCard({ allVerses }: VerseCardProps) {
  const [currentVerse, setCurrentVerse] = useState<Verse | null>(null);
  const [inspiration, setInspiration] = useState<string | null>(null);
  const [notes, setNotes] = useState('');
  const [isPending, startTransition] = useTransition();
  const [isLoadingInspiration, setIsLoadingInspiration] = useState(false);
  const [accordionValue, setAccordionValue] = useState<string>('');

  const { toast } = useToast();

  useEffect(() => {
    const getDailyVerse = () => {
      const now = new Date();
      const startOfYear = new Date(now.getFullYear(), 0, 0);
      const diff = now.getTime() - startOfYear.getTime();
      const oneDay = 1000 * 60 * 60 * 24;
      const dayOfYear = Math.floor(diff / oneDay);
      return allVerses[dayOfYear % allVerses.length];
    };
    setCurrentVerse(getDailyVerse());
  }, [allVerses]);

  useEffect(() => {
    if (!currentVerse) return;
    try {
      const savedNotes = localStorage.getItem(`notes_${currentVerse.reference}`);
      if (savedNotes) {
        setNotes(savedNotes);
      } else {
        setNotes('');
      }
    } catch (error) {
      console.error('Failed to read from localStorage', error);
      setNotes('');
    }
    // Reset inspiration when verse changes
    setInspiration(null);
    setAccordionValue('');
  }, [currentVerse]);

  const handleNotesChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (!currentVerse) return;
    const newNotes = e.target.value;
    setNotes(newNotes);
    try {
      localStorage.setItem(`notes_${currentVerse.reference}`, newNotes);
    } catch (error) {
      console.error('Failed to save to localStorage', error);
      toast({
        variant: 'destructive',
        title: 'Error saving notes',
        description: 'Your notes could not be saved to the browser.',
      });
    }
  };

  const handleRefresh = () => {
    startTransition(() => {
      let newVerse;
      do {
        newVerse = allVerses[Math.floor(Math.random() * allVerses.length)];
      } while (newVerse.reference === currentVerse?.reference);
      setCurrentVerse(newVerse);
    });
  };

  const handleShare = async () => {
    if (!currentVerse) return;
    const shareData = {
      title: 'Daily Scripture Spark',
      text: `"${currentVerse.text}" - ${currentVerse.reference}`,
      url: window.location.href,
    };
    try {
      if (navigator.share) {
        await navigator.share(shareData);
      } else {
        await navigator.clipboard.writeText(shareData.text);
        toast({
          title: 'Copied to clipboard!',
          description: 'Verse copied. You can now paste it to share.',
        });
      }
    } catch (error) {
      console.error('Error sharing:', error);
      toast({
        variant: 'destructive',
        title: 'Sharing failed',
        description: 'Could not share the verse at this time.',
      });
    }
  };

  const handleGetInspiration = async () => {
    if (!currentVerse) return;
    if (inspiration) {
      // If inspiration is already loaded, just open the accordion
      setAccordionValue('inspiration-item');
      return;
    }
    setIsLoadingInspiration(true);
    setInspiration(null);
    const result = await getInspirationAction(
      `"${currentVerse.text}" - ${currentVerse.reference}`
    );
    if (result.success) {
      setInspiration(result.message);
    } else {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: result.error,
      });
      setAccordionValue(''); // Close accordion on error
    }
    setIsLoadingInspiration(false);
  };
  
  const onAccordionChange = (value: string) => {
    setAccordionValue(value);
    if (value === 'inspiration-item' && !inspiration && !isLoadingInspiration) {
      handleGetInspiration();
    }
  }

  return (
    <Card className="w-full max-w-2xl shadow-lg border-2 border-primary/10 bg-card">
      <CardContent className="p-6 md:p-10 text-center min-h-[170px]">
        {currentVerse ? (
          <div
            key={currentVerse.reference}
            className="animate-in fade-in duration-700"
          >
            <blockquote className="space-y-4">
              <p className="font-body text-xl md:text-2xl leading-relaxed text-foreground">
                “{currentVerse.text}”
              </p>
              <figcaption className="font-headline text-lg text-primary font-semibold">
                — {currentVerse.reference}
              </figcaption>
            </blockquote>
          </div>
        ) : (
          <div className="space-y-4">
            <Skeleton className="h-16 w-full" />
            <Skeleton className="h-6 w-1/3 mx-auto" />
          </div>
        )}
      </CardContent>
      <Separator />
      <CardFooter className="flex-col items-stretch p-0">
        <div className="flex justify-center items-center gap-2 p-4">
          <Button
            variant="ghost"
            size="lg"
            onClick={handleRefresh}
            aria-label="Get a new verse"
            disabled={isPending || !currentVerse}
            className="flex-1"
          >
            {isPending ? <Loader2 className="h-5 w-5 animate-spin" /> : <RefreshCw className="h-5 w-5" />}
            <span className="ml-2 hidden sm:inline">New Verse</span>
          </Button>
          <Button
            variant="ghost"
            size="lg"
            onClick={handleShare}
            aria-label="Share this verse"
            disabled={!currentVerse}
            className="flex-1"
          >
            <Share2 className="h-5 w-5" />
            <span className="ml-2 hidden sm:inline">Share</span>
          </Button>
        </div>
        <Accordion type="single" collapsible className="w-full" value={accordionValue} onValueChange={onAccordionChange} disabled={!currentVerse}>
          <AccordionItem value="inspiration-item" className="border-t">
            <AccordionTrigger className="w-full p-4 justify-center hover:no-underline text-primary hover:bg-accent/50 text-base font-medium disabled:text-muted-foreground disabled:no-underline">
              <div className="flex items-center">
                <Sparkles className="mr-2 h-5 w-5 text-accent"/>
                Get an Inspirational Message
              </div>
            </AccordionTrigger>
            <AccordionContent className="p-6 text-left bg-background/50">
              {isLoadingInspiration && (
                <div className="flex items-center justify-center gap-2 text-muted-foreground">
                    <Loader2 className="h-5 w-5 animate-spin" />
                    <span>Generating wisdom...</span>
                </div>
              )}
              {inspiration && (
                <p className="font-body text-base whitespace-pre-wrap leading-loose">
                  {inspiration}
                </p>
              )}
            </AccordionContent>
          </AccordionItem>
           <AccordionItem value="notes-item" className="border-t">
            <AccordionTrigger className="w-full p-4 justify-center hover:no-underline text-primary hover:bg-accent/50 text-base font-medium disabled:text-muted-foreground disabled:no-underline">
                <div className="flex items-center">
                    <BookText className="mr-2 h-5 w-5 text-accent" />
                    My Notes
                </div>
            </AccordionTrigger>
            <AccordionContent className="p-4 bg-background/50">
              <Textarea
                placeholder="Write your thoughts and reflections here..."
                value={notes}
                onChange={handleNotesChange}
                className="w-full h-32 text-base"
              />
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </CardFooter>
    </Card>
  );
}

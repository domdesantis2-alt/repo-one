import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';

export default function PrivacyPolicy() {
  return (
    <div className="flex flex-col min-h-dvh bg-background">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <Link href="/" className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:underline mb-6">
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Link>
          <h1 className="font-headline text-4xl font-bold mb-4 text-primary">Privacy Policy</h1>
          <p className="text-muted-foreground mb-6">Last updated: {new Date().toLocaleDateString()}</p>

          <div className="prose prose-lg max-w-none text-foreground">
            <p>
              Welcome to Daily Scripture Spark. We are committed to protecting your privacy. This Privacy Policy explains how we collect, use, and safeguard your information when you use our application.
            </p>

            <h2 className="font-headline text-2xl font-bold mt-8 mb-2">Information We Collect</h2>
            <p>
              Our application is designed to be simple and privacy-focused. We do not collect any personally identifiable information (PII) from you. The app does not require you to create an account or provide any personal data.
            </p>

            <h2 className="font-headline text-2xl font-bold mt-8 mb-2">AI-Generated Content</h2>
            <p>
              Our "Inspirational Message" feature uses a third-party Generative AI model to provide content based on the displayed Bible verse. The verse text is sent to the AI service to generate the message. This data is not associated with any user and is processed ephemerally. No personal data is sent or stored during this process.
            </p>

            <h2 className="font-headline text-2xl font-bold mt-8 mb-2">Usage Data</h2>
            <p>
              We may collect anonymous usage data to help us improve the application. This data is aggregated and cannot be used to identify individual users. It includes information such as which features are used most frequently, but not who is using them.
            </p>

            <h2 className="font-headline text-2xl font-bold mt-8 mb-2">Sharing Feature</h2>
            <p>
              The app's sharing feature utilizes your device's native sharing capabilities. We do not track what you share or with whom you share it. Your sharing activities are subject to the privacy policies of the platforms you share to.
            </p>
            
            <h2 className="font-headline text-2xl font-bold mt-8 mb-2">Changes to This Policy</h2>
            <p>
              We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page. You are advised to review this Privacy Policy periodically for any changes.
            </p>

            <h2 className="font-headline text-2xl font-bold mt-8 mb-2">Contact Us</h2>
            <p>
              If you have any questions about this Privacy Policy, please contact us at privacy@dailyscripturespark.com.
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

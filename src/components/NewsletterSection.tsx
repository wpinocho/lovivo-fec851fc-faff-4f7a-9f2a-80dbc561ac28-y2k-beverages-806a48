import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { HeadlessNewsletter } from '@/components/headless/HeadlessNewsletter';
import { Mail, Sparkles } from 'lucide-react';

/**
 * EDITABLE UI COMPONENT - NewsletterSection
 * Y2K Theme Newsletter
 */

export const NewsletterSection = () => {
  return (
    <HeadlessNewsletter>
      {(logic) => (
        <section className="relative py-20 border-t-2 border-border overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-primary rounded-full blur-3xl" />
            <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-secondary rounded-full blur-3xl" />
          </div>
          
          <div className="relative max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            {logic.success ? (
              <div className="space-y-6">
                <div className="flex justify-center">
                  <div className="y2k-gradient rounded-full p-4 y2k-glow">
                    <Mail className="h-10 w-10 text-primary-foreground" />
                  </div>
                </div>
                <h3 className="text-3xl md:text-4xl font-black uppercase tracking-tight">
                  <span className="y2k-gradient bg-clip-text text-transparent">You're In!</span>
                </h3>
                <p className="text-lg text-muted-foreground">
                  Get ready for exclusive zero-proof recipes and special offers
                </p>
              </div>
            ) : (
              <div className="space-y-8">
                <div className="space-y-4">
                  <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-morphism mb-4">
                    <Sparkles className="h-4 w-4 text-primary" />
                    <span className="text-sm font-bold uppercase tracking-wide">Join the Club</span>
                  </div>
                  
                  <h3 className="text-3xl md:text-5xl font-black uppercase tracking-tight">
                    <span className="y2k-gradient bg-clip-text text-transparent">
                      Get Exclusive Offers
                    </span>
                  </h3>
                  <p className="text-lg text-muted-foreground max-w-xl mx-auto">
                    Subscribe for zero-proof recipes, mixology tips, and special deals on premium NA spirits
                  </p>
                </div>
                
                <form 
                  onSubmit={(e) => {
                    e.preventDefault();
                    logic.handleSubscribe();
                  }}
                  className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto"
                >
                  <Input 
                    type="email"
                    placeholder="your@email.com"
                    value={logic.email}
                    onChange={(e) => logic.setEmail(e.target.value)}
                    disabled={logic.isSubmitting}
                    className="flex-1 h-12 border-2 border-border focus:border-primary bg-card text-foreground font-medium"
                    required
                  />
                  <Button 
                    type="submit"
                    disabled={logic.isSubmitting}
                    className="sm:w-auto h-12 px-8 y2k-gradient font-black uppercase hover:y2k-glow transition-all"
                  >
                    {logic.isSubmitting ? 'Subscribing...' : 'Subscribe'}
                  </Button>
                </form>
                
                {logic.error && (
                  <p className="text-sm text-destructive font-medium">
                    {logic.error}
                  </p>
                )}
              </div>
            )}
          </div>
        </section>
      )}
    </HeadlessNewsletter>
  );
};
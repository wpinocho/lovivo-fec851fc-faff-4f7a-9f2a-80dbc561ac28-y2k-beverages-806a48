import { Button } from '@/components/ui/button';
import { ProductCard } from '@/components/ProductCard';
import { CollectionCard } from '@/components/CollectionCard';
import { FloatingCart } from '@/components/FloatingCart';
import { NewsletterSection } from '@/components/NewsletterSection';
import { EcommerceTemplate } from '@/templates/EcommerceTemplate';
import type { UseIndexLogicReturn } from '@/components/headless/HeadlessIndex';
import { Sparkles } from 'lucide-react';

/**
 * EDITABLE UI - IndexUI
 * 
 * Y2K Zero-Proof Bar Homepage
 */

interface IndexUIProps {
  logic: UseIndexLogicReturn;
}

export const IndexUI = ({ logic }: IndexUIProps) => {
  const {
    collections,
    loading,
    loadingCollections,
    selectedCollectionId,
    filteredProducts,
    handleViewCollectionProducts,
    handleShowAllProducts,
  } = logic;

  return (
    <EcommerceTemplate 
      showCart={true}
    >
      {/* Hero Section - Mocktails */}
      <section className="relative min-h-[600px] flex items-center justify-center overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: 'url(/src/assets/hero-mocktails.jpg)' }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/50 to-background" />
        </div>
        
        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center py-20">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-morphism mb-6">
            <Sparkles className="h-4 w-4 text-primary" />
            <span className="text-sm font-medium text-foreground">Zero Alcohol, Full Flavor</span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-black mb-6 y2k-text-glow uppercase tracking-tight">
            Discover<br />
            <span className="y2k-gradient bg-clip-text text-transparent">Flavors</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-secondary mb-8 max-w-2xl mx-auto font-light">
            Premium non-alcoholic spirits for the modern mixologist. Craft sophisticated zero-proof cocktails at home.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              className="y2k-gradient text-lg font-bold py-6 px-8 hover:y2k-glow transition-all"
              onClick={() => {
                document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              Discover Flavors
            </Button>
            <Button 
              size="lg" 
              variant="outline"
              className="text-lg font-bold py-6 px-8 border-2 border-primary text-foreground hover:bg-primary/10"
              onClick={() => {
                document.getElementById('bundles')?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              View Bundles
            </Button>
          </div>
        </div>
      </section>

      {/* Collections Section - Starter Bundles & Recipes */}
      {!loadingCollections && collections.length > 0 && (
        <section id="bundles" className="py-20 border-t border-border">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-4xl md:text-5xl font-black mb-4 uppercase tracking-tight">
                <span className="y2k-gradient bg-clip-text text-transparent">Featured Collections</span>
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Curated bundles and recipe collections to kickstart your zero-proof journey
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              {collections.map((collection) => (
                <div key={collection.id} className="group">
                  <CollectionCard 
                    collection={collection} 
                    onViewProducts={handleViewCollectionProducts} 
                  />
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Products Section - NA Spirits Grid */}
      <section id="products" className="py-20 border-t border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-black mb-4 uppercase tracking-tight">
              {selectedCollectionId 
                ? collections.find(c => c.id === selectedCollectionId)?.name || 'Products'
                : <span className="y2k-gradient bg-clip-text text-transparent">NA Spirits</span>
              }
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Premium non-alcoholic alternatives crafted with real botanicals and natural ingredients
            </p>
          </div>

          {selectedCollectionId && (
            <div className="flex justify-center mb-8">
              <Button 
                variant="outline" 
                onClick={handleShowAllProducts}
                className="border-2 border-primary text-foreground hover:bg-primary/10"
              >
                ← Back to All Spirits
              </Button>
            </div>
          )}
          
          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {[...Array(8)].map((_, i) => (
                <div key={i} className="bg-card rounded-xl h-96 animate-pulse y2k-border-glow" />
              ))}
            </div>
          ) : filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredProducts.map((product) => (
                <div key={product.id} className="transform transition-all hover:scale-105">
                  <ProductCard product={product} />
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full glass-morphism mb-4">
                <Sparkles className="h-5 w-5 text-primary" />
                <p className="text-lg text-muted-foreground">
                  No spirits available in this collection
                </p>
              </div>
              <Button 
                variant="outline" 
                onClick={handleShowAllProducts}
                className="mt-4 border-2 border-primary"
              >
                View All Products
              </Button>
            </div>
          )}
        </div>
      </section>

      {/* Newsletter Section */}
      <NewsletterSection />

      <FloatingCart />
    </EcommerceTemplate>
  );
};
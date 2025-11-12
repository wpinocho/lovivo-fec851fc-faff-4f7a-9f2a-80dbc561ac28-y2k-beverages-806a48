import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { type Collection } from '@/lib/supabase'
import { ArrowRight } from 'lucide-react'

interface CollectionCardProps {
  collection: Collection
  onViewProducts: (collectionId: string) => void
}

export const CollectionCard = ({ collection, onViewProducts }: CollectionCardProps) => {
  return (
    <Card className="group overflow-hidden border-2 border-border hover:border-primary transition-all hover:y2k-glow bg-card">
      <CardContent className="p-0">
        <div className="aspect-[16/10] bg-muted overflow-hidden relative">
          {collection.image ? (
            <>
              <img 
                src={collection.image} 
                alt={collection.name}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />
            </>
          ) : (
            <div className="w-full h-full flex items-center justify-center text-muted-foreground text-sm">
              No image
            </div>
          )}
          
          {collection.featured && (
            <span className="absolute top-4 right-4 bg-primary text-primary-foreground text-xs font-black px-3 py-1 rounded-full uppercase">
              Featured
            </span>
          )}
        </div>
        
        <div className="p-6 relative">
          <h3 className="font-black text-2xl mb-3 text-foreground group-hover:text-primary transition-colors uppercase">
            {collection.name}
          </h3>
          
          {collection.description && (
            <p className="text-muted-foreground mb-6 line-clamp-2">
              {collection.description}
            </p>
          )}
          
          <Button 
            className="w-full y2k-gradient font-bold uppercase group/btn hover:y2k-glow transition-all"
            onClick={() => onViewProducts(collection.id)}
          >
            <span>Explore Collection</span>
            <ArrowRight className="ml-2 h-4 w-4 group-hover/btn:translate-x-1 transition-transform" />
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
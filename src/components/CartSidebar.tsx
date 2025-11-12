import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import { useCart } from "@/contexts/CartContext"
import { useCheckout } from "@/hooks/useCheckout"
import { useSettings } from "@/contexts/SettingsContext"
import { Minus, Plus, Trash2 } from "lucide-react"
import { useNavigate } from "react-router-dom"

interface CartSidebarProps {
  isOpen: boolean
  onClose: () => void
}

export const CartSidebar = ({ isOpen, onClose }: CartSidebarProps) => {
  const { state, updateQuantity, removeItem, clearCart } = useCart()
  const navigate = useNavigate()
  const { checkout, isLoading: isCreatingOrder } = useCheckout()
  const { currencyCode } = useSettings()

  const handleCreateCheckout = async () => {
    try {
      console.log('Starting checkout process...')

      // Snapshot del carrito antes de crear la orden (el hook limpia el carrito)
      try {
        sessionStorage.setItem('checkout_cart', JSON.stringify({ items: state.items, total: state.total }))
      } catch {}

      console.log('Calling checkout function...')
      const order = await checkout({
        currencyCode: currencyCode
      })

      console.log('Order created:', order)
      console.log('About to save order to sessionStorage...')
      
      // Guardar orden en sessionStorage para la página de checkout
      try {
        sessionStorage.setItem('checkout_order', JSON.stringify(order))
        sessionStorage.setItem('checkout_order_id', String(order.order_id))
        console.log('Order saved to sessionStorage')
      } catch (e) {
        console.error('Error saving to sessionStorage:', e)
      }

      console.log('Closing sidebar...')
      onClose()
      
      console.log('Navigating to /checkout...')
      navigate('/checkout')
      console.log('Navigation call completed')
    } catch (error) {
      // El error ya es manejado por el hook useCheckout
      console.error('Error in handleCreateCheckout:', error)
    }
  }

  const finalTotal = state.total

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent side="right" className="w-full sm:w-96 p-0 bg-background border-l-2 border-primary" aria-describedby="cart-description">
        <div className="flex flex-col h-full">
          <SheetHeader className="p-6 border-b-2 border-border">
            <div className="flex items-center justify-between">
              <SheetTitle className="text-2xl font-black uppercase tracking-tight text-primary">Cart</SheetTitle>
            </div>
            <div id="cart-description" className="sr-only">
              Review and modify the products in your shopping cart
            </div>
          </SheetHeader>

          {state.items.length === 0 ? (
            <div className="flex-1 flex items-center justify-center p-6">
              <div className="text-center">
                <h3 className="text-xl font-bold text-foreground mb-2 uppercase">
                  Your cart is empty
                </h3>
                <p className="text-muted-foreground mb-6">
                  Add some spirits to start mixing
                </p>
                <Button onClick={onClose} className="y2k-gradient font-bold uppercase">
                  Continue Shopping
                </Button>
              </div>
            </div>
          ) : (
            <>
              {/* Cart Items */}
              <div className="flex-1 overflow-y-auto p-6 space-y-4">
                {state.items.map((item) => (
                  <Card key={item.key} className="border-2 border-border hover:border-primary transition-all">
                    <CardContent className="p-4">
                      <div className="flex items-start space-x-4">
                        <div className="w-20 h-20 bg-muted rounded-lg overflow-hidden flex-shrink-0 border-2 border-border">
                          {item.product.images && item.product.images.length > 0 || item.variant?.image ? (
                            <img
                              src={item.variant?.image || item.product.images![0]}
                              alt={item.product.title}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center text-muted-foreground text-xs">
                              No image
                            </div>
                          )}
                        </div>
                        
                        <div className="flex-1 min-w-0">
                          <h4 className="font-bold text-sm text-foreground line-clamp-2 uppercase">
                            {item.product.title}{item.variant?.title ? ` - ${item.variant.title}` : ''}
                          </h4>
                          
                          <div className="flex items-center justify-between mt-4">
                            <div className="flex items-center space-x-2 glass-morphism rounded-lg p-1">
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => updateQuantity(item.key, item.quantity - 1)}
                                className="h-7 w-7 hover:bg-primary/20"
                              >
                                <Minus className="h-3 w-3" />
                              </Button>
                              <span className="font-black px-2 text-sm min-w-[2rem] text-center">
                                {item.quantity}
                              </span>
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => updateQuantity(item.key, item.quantity + 1)}
                                className="h-7 w-7 hover:bg-primary/20"
                              >
                                <Plus className="h-3 w-3" />
                              </Button>
                            </div>
                            
                            <div className="text-right flex items-center gap-3">
                              <div className="font-black text-base text-primary">
                                ${(((item.variant?.price ?? item.product.price) || 0) * item.quantity).toFixed(2)}
                              </div>
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => removeItem(item.key)}
                                className="text-destructive hover:text-destructive hover:bg-destructive/10 h-8 w-8"
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Order Summary */}
              <div className="border-t-2 border-border p-6 glass-morphism">
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="font-black text-lg uppercase tracking-wide">Total</span>
                    <span className="font-black text-2xl text-primary">${finalTotal.toFixed(2)}</span>
                  </div>
                </div>

                <Button 
                  className="w-full mt-6 py-6 y2k-gradient font-black uppercase text-lg hover:y2k-glow transition-all" 
                  onClick={handleCreateCheckout} 
                  disabled={isCreatingOrder}
                >
                  {isCreatingOrder ? 'Processing...' : 'Checkout'}
                </Button>
              </div>
            </>
          )}
        </div>
      </SheetContent>
    </Sheet>
  )
}
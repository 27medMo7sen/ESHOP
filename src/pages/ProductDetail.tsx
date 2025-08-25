import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Star, Heart, Share2, ShoppingCart, Plus, Minus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { getProductById, getCategoryById } from '@/data/products';
import { useCart } from '@/contexts/CartContext';
import { toast } from '@/hooks/use-toast';

const ProductDetail: React.FC = () => {
  const { productId } = useParams<{ productId: string }>();
  const { addItem, state } = useCart();
  
  if (!productId) {
    return <div>Product not found</div>;
  }

  const product = getProductById(productId);
  
  if (!product) {
    return (
      <div className="text-center py-16">
        <h1 className="text-2xl font-bold mb-4">Product Not Found</h1>
        <Button asChild>
          <Link to="/">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Products
          </Link>
        </Button>
      </div>
    );
  }

  const category = getCategoryById(product.category);
  const existingItem = state.items.find(item => item.id === product.id);
  const isInCart = !!existingItem;

  const handleAddToCart = () => {
    addItem(product);
    toast({
      title: "Added to cart!",
      description: `${product.name} has been added to your cart.`,
      duration: 2000,
    });
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`h-4 w-4 ${
          i < Math.floor(rating)
            ? 'fill-yellow-400 text-yellow-400'
            : 'text-muted-foreground'
        }`}
      />
    ));
  };

  return (
    <div className="space-y-8">
      {/* Breadcrumb */}
      <div className="flex items-center space-x-2 text-sm text-muted-foreground">
        <Link to="/" className="hover:text-primary transition-smooth">Home</Link>
        <span>/</span>
        <Link to="/categories" className="hover:text-primary transition-smooth">Categories</Link>
        <span>/</span>
        <Link to={`/category/${product.category}`} className="hover:text-primary transition-smooth">
          {category?.name}
        </Link>
        <span>/</span>
        <span className="text-foreground">{product.name}</span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Product Image */}
        <div className="space-y-4">
          <Card className="overflow-hidden border-0 shadow-elegant bg-gradient-subtle">
            <CardContent className="p-8">
              <div className="aspect-square overflow-hidden rounded-2xl bg-background/50">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover hover:scale-105 transition-spring duration-700"
                />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Product Info */}
        <div className="space-y-6">
          {/* Category Badge */}
          <div className="flex items-center space-x-2">
            <Badge variant="secondary" className="gradient-accent text-accent-foreground">
              <span className="mr-1">{category?.icon}</span>
              {category?.name}
            </Badge>
          </div>

          {/* Title and Rating */}
          <div className="space-y-4">
            <h1 className="text-4xl font-bold leading-tight">{product.name}</h1>
            
            {product.rating && product.reviews && (
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-1">
                  {renderStars(product.rating)}
                </div>
                <span className="font-medium">{product.rating}</span>
                <span className="text-muted-foreground">({product.reviews} reviews)</span>
              </div>
            )}
          </div>

          {/* Price */}
          <div className="py-4">
            <div className="text-4xl font-bold gradient-primary bg-clip-text text-transparent">
              ${product.price.toFixed(2)}
            </div>
          </div>

          {/* Description */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Description</h3>
            <p className="text-muted-foreground leading-relaxed">
              {product.description}
            </p>
          </div>

          {/* Actions */}
          <div className="space-y-4 pt-4">
            <div className="flex items-center space-x-4">
              <Button
                onClick={handleAddToCart}
                size="lg"
                className="flex-1 gradient-primary hover:shadow-glow transition-spring group/btn"
              >
                <ShoppingCart className="mr-2 h-4 w-4 group-hover/btn:scale-110 transition-spring" />
                {isInCart ? `Add More (${existingItem?.quantity} in cart)` : 'Add to Cart'}
              </Button>
              
              <Button variant="outline" size="lg">
                <Heart className="h-4 w-4" />
              </Button>
              
              <Button variant="outline" size="lg">
                <Share2 className="h-4 w-4" />
              </Button>
            </div>

            {/* Quick Actions */}
            <div className="grid grid-cols-2 gap-4">
              <Button variant="outline" className="justify-start" asChild>
                <Link to="/cart">
                  View Cart ({state.items.reduce((sum, item) => sum + item.quantity, 0)})
                </Link>
              </Button>
              <Button variant="outline" className="justify-start">
                Buy Now
              </Button>
            </div>
          </div>

          {/* Features */}
          <div className="pt-6 space-y-4">
            <h3 className="text-lg font-semibold">Product Features</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center space-x-2 text-sm">
                <div className="w-2 h-2 bg-primary rounded-full"></div>
                <span>Premium Quality</span>
              </div>
              <div className="flex items-center space-x-2 text-sm">
                <div className="w-2 h-2 bg-primary rounded-full"></div>
                <span>Fast Shipping</span>
              </div>
              <div className="flex items-center space-x-2 text-sm">
                <div className="w-2 h-2 bg-primary rounded-full"></div>
                <span>30-Day Returns</span>
              </div>
              <div className="flex items-center space-x-2 text-sm">
                <div className="w-2 h-2 bg-primary rounded-full"></div>
                <span>Warranty Included</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Related Products */}
      <section className="py-12">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-bold">Related Products</h2>
          <Button variant="outline" asChild>
            <Link to={`/category/${product.category}`}>
              View All {category?.name}
            </Link>
          </Button>
        </div>
        
        <div className="text-center py-8 text-muted-foreground">
          <p>Related products feature coming soon...</p>
        </div>
      </section>
    </div>
  );
};

export default ProductDetail;
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Product, useCart } from "@/contexts/CartContext";
import { ShoppingCart, Plus, Star, Eye } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { ProductWithCategory, getCategoryById } from "@/data/products";

interface ProductCardProps {
  product: ProductWithCategory;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addItem, state } = useCart();

  const existingItem = state.items.find((item) => item.id === product.id);
  const isInCart = !!existingItem;
  const category = getCategoryById(product.category);

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
        className={`h-3 w-3 ${
          i < Math.floor(rating)
            ? "fill-yellow-400 text-yellow-400"
            : "text-muted-foreground"
        }`}
      />
    ));
  };

  return (
    <Card className="group overflow-hidden border-0 shadow-card hover:shadow-elegant transition-spring bg-card/50 backdrop-blur-sm">
      <CardContent className="p-0">
        <div className="relative aspect-square overflow-hidden bg-gradient-subtle">
          <Link to={`/product/${product.id}`}>
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover group-hover:scale-105 transition-spring cursor-pointer"
            />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300 flex items-center justify-center">
              <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="bg-white/90 backdrop-blur-sm rounded-full p-2">
                  <Eye className="h-5 w-5 text-primary" />
                </div>
              </div>
            </div>
          </Link>

          {category && (
            <Badge
              variant="secondary"
              className="absolute top-3 left-3 gradient-accent text-accent-foreground text-xs"
            >
              <span className="mr-1">{category.icon}</span>
              {category.name}
            </Badge>
          )}
        </div>

        <div className="p-6">
          <Link to={`/product/${product.id}`} className="group/link">
            <h3 className="font-semibold text-lg mb-2 group-hover/link:text-primary transition-smooth">
              {product.name}
            </h3>
          </Link>

          {product.rating && product.reviews && (
            <div className="flex items-center space-x-2 mb-2">
              <div className="flex items-center space-x-1">
                {renderStars(product.rating)}
              </div>
              <span className="text-sm text-muted-foreground">
                {product.rating} ({product.reviews})
              </span>
            </div>
          )}

          <p className="text-2xl font-bold gradient-primary bg-clip-text text-transparent">
            ${product.price.toFixed(2)}
          </p>
          {product.description && (
            <p className="text-muted-foreground text-sm mt-2 line-clamp-2">
              {product.description}
            </p>
          )}
        </div>
      </CardContent>

      <CardFooter className="p-6 pt-0 space-y-2">
        <Button
          onClick={handleAddToCart}
          className="w-full gradient-primary hover:shadow-glow transition-spring group/btn"
          size="lg"
        >
          <div className="flex items-center justify-center space-x-2">
            {isInCart ? (
              <>
                <Plus className="h-4 w-4 group-hover/btn:rotate-90 transition-spring" />
                <span>Add More ({existingItem?.quantity})</span>
              </>
            ) : (
              <>
                <ShoppingCart className="h-4 w-4 group-hover/btn:scale-110 transition-spring" />
                <span>Add to Cart</span>
              </>
            )}
          </div>
        </Button>

        <Button variant="outline" size="sm" className="w-full" asChild>
          <Link to={`/product/${product.id}`}>
            <Eye className="h-4 w-4 mr-2" />
            View Details
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
};

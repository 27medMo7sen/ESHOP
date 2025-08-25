import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { categories, getProductsByCategory } from '@/data/products';
import { ArrowRight } from 'lucide-react';

const Categories: React.FC = () => {
  return (
    <div className="space-y-8">
      {/* Header */}
      <section className="text-center py-8">
        <h1 className="text-4xl md:text-5xl font-bold gradient-primary bg-clip-text text-transparent mb-4">
          Shop by Category
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Explore our curated collections of premium products across different categories.
        </p>
      </section>

      {/* Categories Grid */}
      <section>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {categories.map((category) => {
            const categoryProducts = getProductsByCategory(category.id);
            
            return (
              <Card
                key={category.id}
                className="group overflow-hidden border-0 shadow-card hover:shadow-elegant transition-spring bg-card/50 backdrop-blur-sm"
              >
                <CardHeader className="pb-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="text-4xl">{category.icon}</div>
                      <div>
                        <CardTitle className="text-2xl group-hover:text-primary transition-smooth">
                          {category.name}
                        </CardTitle>
                        <p className="text-muted-foreground mt-1">
                          {category.description}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm text-muted-foreground">
                        {categoryProducts.length} products
                      </div>
                    </div>
                  </div>
                </CardHeader>

                <CardContent className="space-y-4">
                  <div className="grid grid-cols-3 gap-3">
                    {categoryProducts.slice(0, 3).map((product) => (
                      <div
                        key={product.id}
                        className="aspect-square rounded-lg overflow-hidden bg-gradient-subtle"
                      >
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-spring"
                        />
                      </div>
                    ))}
                  </div>

                  <Button
                    asChild
                    className="w-full gradient-primary hover:shadow-glow transition-spring group/btn"
                  >
                    <Link to={`/category/${category.id}`}>
                      <span>Browse {category.name}</span>
                      <ArrowRight className="h-4 w-4 group-hover/btn:translate-x-1 transition-spring" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </section>

      <section className="py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {categories.map((category) => {
            const categoryProducts = getProductsByCategory(category.id);
            const avgRating = categoryProducts.reduce((sum, p) => sum + (p.rating || 0), 0) / categoryProducts.length;
            
            return (
              <div key={category.id} className="text-center space-y-2">
                <div className="text-3xl font-bold gradient-primary bg-clip-text text-transparent">
                  {categoryProducts.length}
                </div>
                <div className="text-sm text-muted-foreground">
                  {category.name} Products
                </div>
                <div className="text-xs text-muted-foreground">
                  Avg. Rating: {avgRating.toFixed(1)} ⭐
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
};

export default Categories;
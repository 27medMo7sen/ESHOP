import React from "react";
import { Link } from "react-router-dom";
import { ProductCard } from "@/components/ProductCard";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { products, categories } from "@/data/products";
import { ArrowRight } from "lucide-react";

const Home: React.FC = () => {
  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <section className="text-center py-16">
        <div className="max-w-3xl mx-auto space-y-6">
          <h1 className="text-5xl md:text-6xl font-bold gradient-primary bg-clip-text text-transparent leading-tight">
            Modern Shopping Experience
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Discover premium products crafted with attention to detail and
            designed for the modern lifestyle.
          </p>
          <div className="pt-4">
            <div className="inline-block gradient-accent rounded-full px-6 py-2 text-accent-foreground font-medium shadow-glow">
              ✨ New arrivals every week
            </div>
          </div>
        </div>
      </section>

      <section>
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-bold">Shop by Category</h2>
          <Button variant="outline" asChild>
            <Link to="/categories">
              View All Categories
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
          {categories.map((category) => (
            <Card
              key={category.id}
              className="group overflow-hidden border-0 shadow-card hover:shadow-elegant transition-spring bg-card/50 backdrop-blur-sm cursor-pointer"
            >
              <Link to={`/category/${category.id}`}>
                <CardContent className="p-6 text-center space-y-4">
                  <div className="text-4xl group-hover:scale-110 transition-spring">
                    {category.icon}
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg group-hover:text-primary transition-smooth">
                      {category.name}
                    </h3>
                    <p className="text-muted-foreground text-sm mt-1">
                      {category.description}
                    </p>
                  </div>
                </CardContent>
              </Link>
            </Card>
          ))}
        </div>
      </section>

      <section>
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-bold">Featured Products</h2>
          <div className="text-muted-foreground">
            {products.length} products available
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.slice(0, 6).map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        <div className="text-center mt-8">
          <Button size="lg" variant="outline" asChild>
            <Link to="/categories">
              View All Products
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </section>

      <section className="py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center space-y-4 p-6 rounded-2xl bg-card/50 shadow-card">
            <div className="gradient-primary rounded-full p-3 w-12 h-12 mx-auto flex items-center justify-center">
              <span className="text-primary-foreground text-xl">🚚</span>
            </div>
            <h3 className="font-semibold text-lg">Free Shipping</h3>
            <p className="text-muted-foreground">
              Free shipping on orders over $100
            </p>
          </div>

          <div className="text-center space-y-4 p-6 rounded-2xl bg-card/50 shadow-card">
            <div className="gradient-accent rounded-full p-3 w-12 h-12 mx-auto flex items-center justify-center">
              <span className="text-accent-foreground text-xl">🔒</span>
            </div>
            <h3 className="font-semibold text-lg">Secure Payment</h3>
            <p className="text-muted-foreground">
              Your payment information is safe
            </p>
          </div>

          <div className="text-center space-y-4 p-6 rounded-2xl bg-card/50 shadow-card">
            <div className="gradient-primary rounded-full p-3 w-12 h-12 mx-auto flex items-center justify-center">
              <span className="text-primary-foreground text-xl">↩️</span>
            </div>
            <h3 className="font-semibold text-lg">Easy Returns</h3>
            <p className="text-muted-foreground">30-day return policy</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;

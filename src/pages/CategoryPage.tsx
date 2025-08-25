import React from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ProductCard } from "@/components/ProductCard";
import { getProductsByCategory, getCategoryById } from "@/data/products";

const CategoryPage: React.FC = () => {
  const { categoryId } = useParams<{ categoryId: string }>();

  if (!categoryId) {
    return <div>Category not found</div>;
  }

  const category = getCategoryById(categoryId);
  const products = getProductsByCategory(categoryId);

  if (!category) {
    return (
      <div className="text-center py-16">
        <h1 className="text-2xl font-bold mb-4">Category Not Found</h1>
        <Button asChild>
          <Link to="/categories">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Categories
          </Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <section>
        <div className="flex items-center space-x-4 mb-6">
          <Button variant="ghost" asChild>
            <Link to="/categories">
              <ArrowLeft className="h-4 w-4 mr-2" />
              All Categories
            </Link>
          </Button>
        </div>

        <div className="text-center py-8 space-y-4">
          <div className="text-6xl mb-4">{category.icon}</div>
          <h1 className="text-4xl md:text-5xl font-bold gradient-primary bg-clip-text text-transparent">
            {category.name}
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            {category.description}
          </p>
          <div className="inline-block gradient-accent rounded-full px-6 py-2 text-accent-foreground font-medium shadow-glow">
            {products.length} products available
          </div>
        </div>
      </section>

      <section>
        {products.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-muted-foreground text-lg mb-4">
              No products found in this category yet.
            </p>
            <Button asChild>
              <Link to="/">Browse All Products</Link>
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </section>

      <section className="py-12">
        <div className="bg-card/50 rounded-2xl p-8 shadow-card">
          <h3 className="text-2xl font-bold mb-6 text-center">
            Why Choose Our {category.name}?
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center space-y-2">
              <div className="gradient-primary rounded-full p-3 w-12 h-12 mx-auto flex items-center justify-center">
                <span className="text-primary-foreground">✨</span>
              </div>
              <h4 className="font-semibold">Premium Quality</h4>
              <p className="text-muted-foreground text-sm">
                Carefully curated products from trusted brands
              </p>
            </div>

            <div className="text-center space-y-2">
              <div className="gradient-accent rounded-full p-3 w-12 h-12 mx-auto flex items-center justify-center">
                <span className="text-accent-foreground">🚀</span>
              </div>
              <h4 className="font-semibold">Fast Shipping</h4>
              <p className="text-muted-foreground text-sm">
                Quick delivery to get your products when you need them
              </p>
            </div>

            <div className="text-center space-y-2">
              <div className="gradient-primary rounded-full p-3 w-12 h-12 mx-auto flex items-center justify-center">
                <span className="text-primary-foreground">💯</span>
              </div>
              <h4 className="font-semibold">Satisfaction Guaranteed</h4>
              <p className="text-muted-foreground text-sm">
                30-day return policy and excellent customer support
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default CategoryPage;

import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const About: React.FC = () => {
  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <section className="text-center py-16">
        <div className="max-w-4xl mx-auto space-y-6">
          <h1 className="text-5xl md:text-6xl font-bold gradient-primary bg-clip-text text-transparent leading-tight">
            About ModernShop
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            We're passionate about bringing you the latest in technology and design. 
            Our curated collection features premium products that enhance your digital lifestyle.
          </p>
        </div>
      </section>

      {/* Mission Section */}
      <section>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h2 className="text-4xl font-bold">Our Mission</h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              At ModernShop, we believe that great design and cutting-edge technology should be accessible to everyone. 
              We carefully select each product in our catalog to ensure it meets our high standards for quality, 
              innovation, and user experience.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              From premium audio equipment to the latest wearables and essential accessories, 
              we're here to help you discover products that truly make a difference in your daily life.
            </p>
          </div>
          
          <Card className="shadow-elegant border-0 bg-gradient-subtle">
            <CardContent className="p-8 text-center space-y-4">
              <div className="text-6xl gradient-primary bg-clip-text text-transparent font-bold">
                2024
              </div>
              <h3 className="text-xl font-semibold">Founded</h3>
              <p className="text-muted-foreground">
                Started with a vision to revolutionize online shopping
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Values Section */}
      <section>
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4">Our Values</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            The principles that guide everything we do
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <Card className="text-center shadow-card border-0 bg-card/50">
            <CardContent className="p-8 space-y-4">
              <div className="gradient-primary rounded-full p-4 w-16 h-16 mx-auto flex items-center justify-center">
                <span className="text-primary-foreground text-2xl">🎯</span>
              </div>
              <h3 className="text-xl font-semibold">Quality First</h3>
              <p className="text-muted-foreground">
                We only offer products that we would use ourselves. Every item is tested and verified.
              </p>
            </CardContent>
          </Card>
          
          <Card className="text-center shadow-card border-0 bg-card/50">
            <CardContent className="p-8 space-y-4">
              <div className="gradient-accent rounded-full p-4 w-16 h-16 mx-auto flex items-center justify-center">
                <span className="text-accent-foreground text-2xl">💡</span>
              </div>
              <h3 className="text-xl font-semibold">Innovation</h3>
              <p className="text-muted-foreground">
                We stay ahead of trends to bring you the most innovative products on the market.
              </p>
            </CardContent>
          </Card>
          
          <Card className="text-center shadow-card border-0 bg-card/50">
            <CardContent className="p-8 space-y-4">
              <div className="gradient-primary rounded-full p-4 w-16 h-16 mx-auto flex items-center justify-center">
                <span className="text-primary-foreground text-2xl">🤝</span>
              </div>
              <h3 className="text-xl font-semibool">Customer Care</h3>
              <p className="text-muted-foreground">
                Your satisfaction is our priority. We provide excellent support every step of the way.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16">
        <Card className="shadow-elegant border-0 bg-gradient-subtle">
          <CardContent className="p-12">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              <div className="space-y-2">
                <div className="text-4xl font-bold gradient-primary bg-clip-text text-transparent">
                  10K+
                </div>
                <div className="text-muted-foreground">Happy Customers</div>
              </div>
              
              <div className="space-y-2">
                <div className="text-4xl font-bold gradient-accent bg-clip-text text-transparent">
                  500+
                </div>
                <div className="text-muted-foreground">Products</div>
              </div>
              
              <div className="space-y-2">
                <div className="text-4xl font-bold gradient-primary bg-clip-text text-transparent">
                  50+
                </div>
                <div className="text-muted-foreground">Brand Partners</div>
              </div>
              
              <div className="space-y-2">
                <div className="text-4xl font-bold gradient-accent bg-clip-text text-transparent">
                  4.8★
                </div>
                <div className="text-muted-foreground">Average Rating</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Team Section */}
      <section>
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4">Meet Our Team</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            The passionate people behind ModernShop
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { name: 'Sarah Chen', role: 'Founder & CEO', emoji: '👩‍💼' },
            { name: 'Mike Johnson', role: 'Head of Product', emoji: '👨‍💻' },
            { name: 'Emma Davis', role: 'Customer Success', emoji: '👩‍🎨' }
          ].map((member, index) => (
            <Card key={index} className="text-center shadow-card border-0 bg-card/50">
              <CardContent className="p-6 space-y-4">
                <div className="text-6xl mx-auto">{member.emoji}</div>
                <div>
                  <h3 className="text-xl font-semibold">{member.name}</h3>
                  <p className="text-muted-foreground">{member.role}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="text-center py-16">
        <div className="space-y-6">
          <h2 className="text-4xl font-bold">Ready to Shop?</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Discover our curated collection of premium products and experience the ModernShop difference.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="gradient-primary hover:shadow-glow transition-spring" asChild>
              <Link to="/">Explore Products</Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link to="/categories">Browse Categories</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
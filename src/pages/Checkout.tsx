import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useCart } from '@/contexts/CartContext';
import { useAuth } from '@/contexts/AuthContext';
import { db } from '@/lib/db';
import { CreditCard, MapPin, Mail, User, ShoppingBag } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

const Checkout: React.FC = () => {
    const { state, clearCart } = useCart();
    const { user } = useAuth();
    const navigate = useNavigate();
    const [isProcessing, setIsProcessing] = useState(false);

    const [billingInfo, setBillingInfo] = useState({
        fullName: user?.name || '',
        email: user?.email || '',
        address: '',
        city: '',
        postalCode: '',
        country: 'United States',
        paymentMethod: 'credit-card',
    });

    const handleInputChange = (field: string, value: string) => {
        setBillingInfo(prev => ({ ...prev, [field]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsProcessing(true);

        try {
            // Create order in database
            const order = await db.createOrder({
                userId: user!.id,
                items: state.items,
                total: state.total,
                billingInfo,
                status: 'completed',
            });

            // Clear cart
            clearCart();

            toast({
                title: "Order placed successfully!",
                description: `Order #${order.id.slice(0, 8)} has been confirmed.`,
            });

            // Navigate to order confirmation
            navigate(`/order-confirmation/${order.id}`);
        } catch (error) {
            console.error('Order creation failed:', error);
            toast({
                title: "Order failed",
                description: "There was an error processing your order. Please try again.",
                variant: "destructive",
            });
        } finally {
            setIsProcessing(false);
        }
    };

    if (state.items.length === 0) {
        return (
            <div className="max-w-2xl mx-auto text-center py-16">
                <div className="space-y-6">
                    <div className="gradient-primary rounded-full p-6 w-24 h-24 mx-auto flex items-center justify-center shadow-glow">
                        <ShoppingBag className="h-12 w-12 text-primary-foreground" />
                    </div>
                    <h2 className="text-3xl font-bold">Your cart is empty</h2>
                    <p className="text-muted-foreground text-lg">
                        Add some items to your cart before checking out.
                    </p>
                    <Button asChild size="lg" className="gradient-primary hover:shadow-glow transition-spring">
                        <a href="/">Continue Shopping</a>
                    </Button>
                </div>
            </div>
        );
    }

    return (
        <div className="max-w-6xl mx-auto space-y-8">
            <h1 className="text-3xl font-bold">Checkout</h1>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Billing Form */}
                <div className="lg:col-span-2">
                    <Card className="shadow-elegant border-0 bg-card/50">
                        <CardHeader>
                            <CardTitle>Billing Information</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <form onSubmit={handleSubmit} className="space-y-6">
                                {/* Personal Information */}
                                <div className="space-y-4">
                                    <h3 className="font-semibold flex items-center gap-2">
                                        <User className="h-4 w-4" />
                                        Personal Details
                                    </h3>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <Label htmlFor="fullName">Full Name</Label>
                                            <Input
                                                id="fullName"
                                                value={billingInfo.fullName}
                                                onChange={(e) => handleInputChange('fullName', e.target.value)}
                                                required
                                            />
                                        </div>

                                        <div className="space-y-2">
                                            <Label htmlFor="email">Email</Label>
                                            <Input
                                                id="email"
                                                type="email"
                                                value={billingInfo.email}
                                                onChange={(e) => handleInputChange('email', e.target.value)}
                                                required
                                            />
                                        </div>
                                    </div>
                                </div>

                                {/* Shipping Address */}
                                <div className="space-y-4">
                                    <h3 className="font-semibold flex items-center gap-2">
                                        <MapPin className="h-4 w-4" />
                                        Shipping Address
                                    </h3>

                                    <div className="space-y-2">
                                        <Label htmlFor="address">Street Address</Label>
                                        <Input
                                            id="address"
                                            value={billingInfo.address}
                                            onChange={(e) => handleInputChange('address', e.target.value)}
                                            placeholder="123 Main St, Apt 4B"
                                            required
                                        />
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                        <div className="space-y-2">
                                            <Label htmlFor="city">City</Label>
                                            <Input
                                                id="city"
                                                value={billingInfo.city}
                                                onChange={(e) => handleInputChange('city', e.target.value)}
                                                required
                                            />
                                        </div>

                                        <div className="space-y-2">
                                            <Label htmlFor="postalCode">Postal Code</Label>
                                            <Input
                                                id="postalCode"
                                                value={billingInfo.postalCode}
                                                onChange={(e) => handleInputChange('postalCode', e.target.value)}
                                                required
                                            />
                                        </div>

                                        <div className="space-y-2">
                                            <Label htmlFor="country">Country</Label>
                                            <Select
                                                value={billingInfo.country}
                                                onValueChange={(value) => handleInputChange('country', value)}
                                            >
                                                <SelectTrigger id="country">
                                                    <SelectValue />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="United States">United States</SelectItem>
                                                    <SelectItem value="Canada">Canada</SelectItem>
                                                    <SelectItem value="United Kingdom">United Kingdom</SelectItem>
                                                    <SelectItem value="Germany">Germany</SelectItem>
                                                    <SelectItem value="France">France</SelectItem>
                                                    <SelectItem value="Australia">Australia</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </div>
                                    </div>
                                </div>

                                {/* Payment Method */}
                                <div className="space-y-4">
                                    <h3 className="font-semibold flex items-center gap-2">
                                        <CreditCard className="h-4 w-4" />
                                        Payment Method
                                    </h3>

                                    <Select
                                        value={billingInfo.paymentMethod}
                                        onValueChange={(value) => handleInputChange('paymentMethod', value)}
                                    >
                                        <SelectTrigger>
                                            <SelectValue />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="credit-card">Credit Card</SelectItem>
                                            <SelectItem value="debit-card">Debit Card</SelectItem>
                                            <SelectItem value="paypal">PayPal</SelectItem>
                                            <SelectItem value="apple-pay">Apple Pay</SelectItem>
                                            <SelectItem value="google-pay">Google Pay</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>

                                <Button
                                    type="submit"
                                    className="w-full gradient-primary hover:shadow-glow transition-spring"
                                    size="lg"
                                    disabled={isProcessing}
                                >
                                    {isProcessing ? (
                                        <>
                                            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                                            Processing...
                                        </>
                                    ) : (
                                        `Place Order - $${state.total.toFixed(2)}`
                                    )}
                                </Button>
                            </form>
                        </CardContent>
                    </Card>
                </div>

                {/* Order Summary */}
                <div className="lg:col-span-1">
                    <Card className="shadow-elegant border-0 bg-card/50 sticky top-24">
                        <CardHeader>
                            <CardTitle>Order Summary</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            {/* Items */}
                            <div className="space-y-3 max-h-64 overflow-y-auto">
                                {state.items.map((item) => (
                                    <div key={item.id} className="flex items-center space-x-3">
                                        <div className="w-12 h-12 rounded-lg overflow-hidden bg-gradient-subtle flex-shrink-0">
                                            <img
                                                src={item.image}
                                                alt={item.name}
                                                className="w-full h-full object-cover"
                                            />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <p className="text-sm font-medium truncate">{item.name}</p>
                                            <p className="text-xs text-muted-foreground">Qty: {item.quantity}</p>
                                        </div>
                                        <p className="text-sm font-semibold">${(item.price * item.quantity).toFixed(2)}</p>
                                    </div>
                                ))}
                            </div>

                            <div className="border-t pt-4 space-y-2">
                                <div className="flex justify-between text-sm">
                                    <span>Subtotal</span>
                                    <span>${state.total.toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span>Shipping</span>
                                    <span className="text-green-600 font-medium">Free</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span>Tax</span>
                                    <span>${(state.total * 0.1).toFixed(2)}</span>
                                </div>
                            </div>

                            <div className="border-t pt-4">
                                <div className="flex justify-between font-bold text-lg">
                                    <span>Total</span>
                                    <span className="gradient-primary bg-clip-text text-transparent">
                                        ${(state.total * 1.1).toFixed(2)}
                                    </span>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
};

export default Checkout;

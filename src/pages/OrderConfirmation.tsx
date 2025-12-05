import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { db, Order } from '@/lib/db';
import { CheckCircle, Package, Home } from 'lucide-react';

const OrderConfirmation: React.FC = () => {
    const { orderId } = useParams<{ orderId: string }>();
    const [order, setOrder] = useState<Order | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const loadOrder = async () => {
            if (orderId) {
                try {
                    const orderData = await db.getOrderById(orderId);
                    setOrder(orderData);
                } catch (error) {
                    console.error('Failed to load order:', error);
                } finally {
                    setIsLoading(false);
                }
            }
        };

        loadOrder();
    }, [orderId]);

    if (isLoading) {
        return (
            <div className="flex items-center justify-center min-h-[60vh]">
                <div className="text-center space-y-4">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
                    <p className="text-muted-foreground">Loading order details...</p>
                </div>
            </div>
        );
    }

    if (!order) {
        return (
            <div className="max-w-2xl mx-auto text-center py-16">
                <h2 className="text-2xl font-bold mb-4">Order not found</h2>
                <Button asChild>
                    <Link to="/">Return to Home</Link>
                </Button>
            </div>
        );
    }

    return (
        <div className="max-w-4xl mx-auto space-y-8">
            {/* Success Header */}
            <div className="text-center space-y-4">
                <div className="gradient-primary rounded-full p-6 w-24 h-24 mx-auto flex items-center justify-center shadow-glow">
                    <CheckCircle className="h-12 w-12 text-primary-foreground" />
                </div>
                <h1 className="text-3xl font-bold">Order Confirmed!</h1>
                <p className="text-muted-foreground text-lg">
                    Thank you for your purchase. Your order has been successfully placed.
                </p>
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-muted rounded-lg">
                    <Package className="h-4 w-4" />
                    <span className="font-mono font-semibold">Order #{order.id.slice(0, 8).toUpperCase()}</span>
                </div>
            </div>

            {/* Order Details */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Order Items */}
                <div className="lg:col-span-2 space-y-4">
                    <Card className="shadow-elegant border-0 bg-card/50">
                        <CardHeader>
                            <CardTitle>Order Items</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            {order.items.map((item) => (
                                <div key={item.id} className="flex items-center space-x-4 pb-4 border-b last:border-0 last:pb-0">
                                    <div className="w-16 h-16 rounded-lg overflow-hidden bg-gradient-subtle flex-shrink-0">
                                        <img
                                            src={item.image}
                                            alt={item.name}
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                    <div className="flex-1">
                                        <h3 className="font-semibold">{item.name}</h3>
                                        <p className="text-sm text-muted-foreground">Quantity: {item.quantity}</p>
                                    </div>
                                    <p className="font-semibold">${(item.price * item.quantity).toFixed(2)}</p>
                                </div>
                            ))}
                        </CardContent>
                    </Card>

                    {/* Billing Information */}
                    <Card className="shadow-elegant border-0 bg-card/50">
                        <CardHeader>
                            <CardTitle>Billing & Shipping</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-3">
                            <div>
                                <p className="text-sm text-muted-foreground">Name</p>
                                <p className="font-medium">{order.billingInfo.fullName}</p>
                            </div>
                            <div>
                                <p className="text-sm text-muted-foreground">Email</p>
                                <p className="font-medium">{order.billingInfo.email}</p>
                            </div>
                            <div>
                                <p className="text-sm text-muted-foreground">Shipping Address</p>
                                <p className="font-medium">
                                    {order.billingInfo.address}<br />
                                    {order.billingInfo.city}, {order.billingInfo.postalCode}<br />
                                    {order.billingInfo.country}
                                </p>
                            </div>
                            <div>
                                <p className="text-sm text-muted-foreground">Payment Method</p>
                                <p className="font-medium capitalize">{order.billingInfo.paymentMethod.replace('-', ' ')}</p>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Order Summary */}
                <div className="lg:col-span-1">
                    <Card className="shadow-elegant border-0 bg-card/50 sticky top-24">
                        <CardHeader>
                            <CardTitle>Summary</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="space-y-2">
                                <div className="flex justify-between text-sm">
                                    <span>Subtotal</span>
                                    <span>${order.total.toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span>Shipping</span>
                                    <span className="text-green-600 font-medium">Free</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span>Tax</span>
                                    <span>${(order.total * 0.1).toFixed(2)}</span>
                                </div>
                            </div>

                            <div className="border-t pt-4">
                                <div className="flex justify-between font-bold text-lg">
                                    <span>Total</span>
                                    <span className="gradient-primary bg-clip-text text-transparent">
                                        ${(order.total * 1.1).toFixed(2)}
                                    </span>
                                </div>
                            </div>

                            <div className="pt-4 space-y-2">
                                <p className="text-sm text-muted-foreground">
                                    Order Date: {new Date(order.createdAt).toLocaleDateString()}
                                </p>
                                <p className="text-sm text-muted-foreground">
                                    Status: <span className="text-green-600 font-medium capitalize">{order.status}</span>
                                </p>
                            </div>

                            <div className="pt-4 space-y-2">
                                <Button asChild className="w-full gradient-primary hover:shadow-glow transition-spring">
                                    <Link to="/orders">
                                        <Package className="mr-2 h-4 w-4" />
                                        View All Orders
                                    </Link>
                                </Button>
                                <Button asChild variant="outline" className="w-full">
                                    <Link to="/">
                                        <Home className="mr-2 h-4 w-4" />
                                        Continue Shopping
                                    </Link>
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
};

export default OrderConfirmation;

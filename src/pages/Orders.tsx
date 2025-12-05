import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuth } from '@/contexts/AuthContext';
import { db, Order } from '@/lib/db';
import { Package, ShoppingBag, Calendar, DollarSign } from 'lucide-react';

const Orders: React.FC = () => {
    const { user } = useAuth();
    const [orders, setOrders] = useState<Order[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const loadOrders = async () => {
            if (user) {
                try {
                    const userOrders = await db.getOrdersByUserId(user.id);
                    // Sort by date, newest first
                    const sortedOrders = userOrders.sort((a, b) =>
                        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
                    );
                    setOrders(sortedOrders);
                } catch (error) {
                    console.error('Failed to load orders:', error);
                } finally {
                    setIsLoading(false);
                }
            }
        };

        loadOrders();
    }, [user]);

    if (isLoading) {
        return (
            <div className="flex items-center justify-center min-h-[60vh]">
                <div className="text-center space-y-4">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
                    <p className="text-muted-foreground">Loading your orders...</p>
                </div>
            </div>
        );
    }

    if (orders.length === 0) {
        return (
            <div className="max-w-2xl mx-auto text-center py-16">
                <div className="space-y-6">
                    <div className="gradient-primary rounded-full p-6 w-24 h-24 mx-auto flex items-center justify-center shadow-glow">
                        <Package className="h-12 w-12 text-primary-foreground" />
                    </div>
                    <h2 className="text-3xl font-bold">No orders yet</h2>
                    <p className="text-muted-foreground text-lg">
                        You haven't placed any orders yet. Start shopping to see your orders here!
                    </p>
                    <Button asChild size="lg" className="gradient-primary hover:shadow-glow transition-spring">
                        <Link to="/">
                            <ShoppingBag className="mr-2 h-4 w-4" />
                            Start Shopping
                        </Link>
                    </Button>
                </div>
            </div>
        );
    }

    return (
        <div className="max-w-6xl mx-auto space-y-8">
            <div className="flex items-center justify-between">
                <h1 className="text-3xl font-bold">My Orders</h1>
                <p className="text-muted-foreground">{orders.length} order{orders.length !== 1 ? 's' : ''}</p>
            </div>

            <div className="space-y-4">
                {orders.map((order) => (
                    <Card key={order.id} className="shadow-card border-0 bg-card/50 hover:shadow-elegant transition-all">
                        <CardHeader>
                            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                                <div className="space-y-1">
                                    <CardTitle className="flex items-center gap-2">
                                        <Package className="h-5 w-5" />
                                        Order #{order.id.slice(0, 8).toUpperCase()}
                                    </CardTitle>
                                    <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                                        <span className="flex items-center gap-1">
                                            <Calendar className="h-3 w-3" />
                                            {new Date(order.createdAt).toLocaleDateString('en-US', {
                                                year: 'numeric',
                                                month: 'long',
                                                day: 'numeric'
                                            })}
                                        </span>
                                        <span className="flex items-center gap-1">
                                            <DollarSign className="h-3 w-3" />
                                            ${(order.total * 1.1).toFixed(2)}
                                        </span>
                                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${order.status === 'completed' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' :
                                                order.status === 'processing' ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200' :
                                                    order.status === 'pending' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200' :
                                                        'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                                            }`}>
                                            {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                                        </span>
                                    </div>
                                </div>
                                <Button asChild variant="outline">
                                    <Link to={`/order-confirmation/${order.id}`}>
                                        View Details
                                    </Link>
                                </Button>
                            </div>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-3">
                                <p className="text-sm font-medium">Items ({order.items.length})</p>
                                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3">
                                    {order.items.slice(0, 6).map((item) => (
                                        <div key={item.id} className="space-y-1">
                                            <div className="aspect-square rounded-lg overflow-hidden bg-gradient-subtle">
                                                <img
                                                    src={item.image}
                                                    alt={item.name}
                                                    className="w-full h-full object-cover"
                                                />
                                            </div>
                                            <p className="text-xs truncate">{item.name}</p>
                                            <p className="text-xs text-muted-foreground">Qty: {item.quantity}</p>
                                        </div>
                                    ))}
                                    {order.items.length > 6 && (
                                        <div className="aspect-square rounded-lg bg-muted flex items-center justify-center">
                                            <p className="text-sm font-medium">+{order.items.length - 6} more</p>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    );
};

export default Orders;

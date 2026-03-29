import { useParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { CheckCircle } from "lucide-react";

const OrderConfirmation = () => {
  const { orderId } = useParams();

  return (
    <div className="max-w-[700px] mx-auto px-4 py-16 text-center">
      <CheckCircle className="w-16 h-16 text-amazon-success mx-auto mb-4" />
      <h1 className="text-2xl font-bold mb-2">Order Placed, thank you!</h1>
      <p className="text-muted-foreground mb-1">
        Your order has been confirmed and will be shipped soon.
      </p>
      <p className="text-sm mb-6">
        Order ID: <span className="font-bold">{orderId}</span>
      </p>
      <Link to="/">
        <Button variant="amazon" size="lg">
          Continue Shopping
        </Button>
      </Link>
    </div>
  );
};

export default OrderConfirmation;

import { useCurrency } from "@/context/CurrencyContext";

interface PriceDisplayProps {
  price: number;
  originalPrice?: number;
  size?: "sm" | "md" | "lg";
}

const PriceDisplay = ({ price, originalPrice, size = "md" }: PriceDisplayProps) => {
  const { currency, convertPrice } = useCurrency();
  
  // Convert prices based on selected currency
  const convertedPrice = convertPrice(price);
  const convertedOriginalPrice = originalPrice ? convertPrice(originalPrice) : undefined;

  const whole = Math.floor(convertedPrice);
  const fraction = Math.round((convertedPrice - whole) * 100).toString().padStart(2, "0");
  const discount = convertedOriginalPrice ? Math.round(((convertedOriginalPrice - convertedPrice) / convertedOriginalPrice) * 100) : 0;

  const sizeClasses = {
    sm: { whole: "text-lg", symbol: "text-xs", fraction: "text-xs" },
    md: { whole: "text-[28px]", symbol: "text-sm", fraction: "text-sm" },
    lg: { whole: "text-[32px]", symbol: "text-base", fraction: "text-base" },
  };

  const s = sizeClasses[size];

  return (
    <div>
      {discount > 0 && convertedOriginalPrice && (
        <div className="flex items-center gap-2">
          <span className="text-destructive font-medium text-sm">-{discount}%</span>
          <span className="text-muted-foreground text-sm line-through">{currency.symbol}{convertedOriginalPrice.toFixed(2)}</span>
        </div>
      )}
      <div className="amazon-price flex items-start">
        <span className={`${s.symbol} leading-[1.4]`}>{currency.symbol}</span>
        <span className={`${s.whole} leading-none font-normal`}>{whole}</span>
        <span className={`${s.fraction} leading-[1.4]`}>{fraction}</span>
      </div>
    </div>
  );
};

export default PriceDisplay;

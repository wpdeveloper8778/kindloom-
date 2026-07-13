declare module 'lucide-react' {
  import { FC, SVGAttributes } from 'react';

  interface IconProps extends SVGAttributes<SVGSVGElement> {
    size?: number | string;
    absoluteStrokeWidth?: boolean;
  }

  export type Icon = FC<IconProps>;

  export const ArrowLeft: Icon;
  export const ArrowRight: Icon;
  export const Check: Icon;
  export const ChevronLeft: Icon;
  export const ChevronRight: Icon;
  export const Coffee: Icon;
  export const CreditCard: Icon;
  export const Heart: Icon;
  export const Home: Icon;
  export const Image: Icon;
  export const Leaf: Icon;
  export const Loader: Icon;
  export const Menu: Icon;
  export const Minus: Icon;
  export const Moon: Icon;
  export const Palette: Icon;
  export const Plus: Icon;
  export const Search: Icon;
  export const ShieldCheck: Icon;
  export const Shirt: Icon;
  export const ShoppingBag: Icon;
  export const SlidersHorizontal: Icon;
  export const Smartphone: Icon;
  export const Sparkles: Icon;
  export const Star: Icon;
  export const Sun: Icon;
  export const Trash2: Icon;
  export const Truck: Icon;
  export const Type: Icon;
  export const Upload: Icon;
  export const Wallet: Icon;
  export const X: Icon;
}

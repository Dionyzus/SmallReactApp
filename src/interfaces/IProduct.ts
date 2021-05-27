export interface IProduct {
  id?: string;
  productName: string;
  price: string;
  substancePercentage: string;
  color: string;
  type: {baseType: string,subType: string};
  producer: string;
}

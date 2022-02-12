export interface CategoryTypes {
  _id: string;
  name: string;
}

export interface GameItemTypes {
  _id: string;
  status: string;
  name: string;
  thumbnail: string;
  category: CategoryTypes;
}

export interface PaymentTypes {
  _id: string;
  type: string;
  status: string;
  banks: BankTypes[]
}

export interface BankTypes {
  _id: string;
  type: string;
  bankName: string;
  noRekening: string;
}

export interface NominalTypes {
  _id: string;
  coinQuantity: string
  coinName: string,
  price: number
}

export interface CategoryTypes {
  _id: string
  name: string
}

export interface SignInTypes {
  email: string
  password: string
}

export interface UserTypes {
  avatar: string,
  email: string,
  id: string,
  name: string,
  phoneNumber: string,
  username: string
}

export interface JWTPayloadTypes {
  player: UserTypes,
}

export interface CheckoutTypes {
  voucher: string
  nominal: string
  payment: string
  bank: string
  name: string
  accountUser: string
}
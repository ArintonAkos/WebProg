interface Address {
  city: string;
  street: string;
  number: number;
}

interface Restaurant {
  name: string;
  address: Address;
  phone: string;
  openingHours: string;
}

export default Restaurant;

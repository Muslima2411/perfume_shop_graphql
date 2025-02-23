const data = [
  {
    id: 1,
    brandName: "Tom Ford",
    productName: "Ombre",
    gender: "male",
    perfume: {
      sm: {
        size: "50ml",
        price: "50$",
        qty: 5,
      },
      md: {
        size: "100ml",
        price: "100$",
        qty: 7,
      },
      lg: {
        size: "150ml",
        price: "150$",
        qty: 3,
      },
    },
    eauDeParfume: {
      sm: {
        size: "50ml",
        price: "40$",
        qty: 5,
      },
      md: {
        size: "100ml",
        price: "90$",
        qty: 7,
      },
      lg: {
        size: "150ml",
        price: "140$",
        qty: 3,
      },
    },
    toitlette: {
      sm: {
        size: "50ml",
        price: "30$",
        qty: 5,
      },
      md: {
        size: "100ml",
        price: "80$",
        qty: 7,
      },
      lg: {
        size: "150ml",
        price: "130$",
        qty: 3,
      },
    },
  },
  {
    id: 2,
    brandName: "Dior",
    productName: "Savage",
    gender: "male",
    perfume: {
      sm: {
        size: "50ml",
        price: "55$",
        qty: 3,
      },
      md: {
        size: "100ml",
        price: "105$",
        qty: 4,
      },
      lg: {
        size: "150ml",
        price: "155$",
        qty: 13,
      },
    },
    eauDeParfume: {
      sm: {
        size: "50ml",
        price: "45$",
        qty: 3,
      },
      md: {
        size: "100ml",
        price: "95$",
        qty: 4,
      },
      lg: {
        size: "150ml",
        price: "145$",
        qty: 13,
      },
    },
    toitlette: {
      sm: {
        size: "50ml",
        price: "35$",
        qty: 9,
      },
      md: {
        size: "100ml",
        price: "85$",
        qty: 44,
      },
      lg: {
        size: "150ml",
        price: "135$",
        qty: 91,
      },
    },
  },
  {
    id: 3,
    brandName: "LV",
    productName: "Fabulous",
    gender: "female",
    perfume: {
      sm: {
        size: "50ml",
        price: "57$",
        qty: 21,
      },
      md: {
        size: "100ml",
        price: "107$",
        qty: 6,
      },
      lg: {
        size: "150ml",
        price: "157$",
        qty: 13,
      },
    },
    eauDeParfume: {
      sm: {
        size: "50ml",
        price: "47$",
        qty: 21,
      },
      md: {
        size: "100ml",
        price: "97$",
        qty: 6,
      },
      lg: {
        size: "150ml",
        price: "147$",
        qty: 13,
      },
    },
    toitlette: {
      sm: {
        size: "50ml",
        price: "37$",
        qty: 211,
      },
      md: {
        size: "100ml",
        price: "87$",
        qty: 6,
      },
      lg: {
        size: "150ml",
        price: "137$",
        qty: 15,
      },
    },
  },
];

export const query = {
  getAll: ({ gender }) => {
    return data.filter((perfume) => perfume.gender === gender);
  },
};
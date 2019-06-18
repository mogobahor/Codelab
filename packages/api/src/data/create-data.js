export const createData = [
  {
    model: 'Restaurant',
    docs: [
      {
        name: 'McDonalds',
        menus: {
          model: 'Menu',
          docs: [
            {
              title: 'Chicken Nuggets',
              price: '4.99',
            },
            {
              title: 'Coke Drink',
              price: '1.29',
            },
          ],
        },
        rating: '3',
      },
      {
        name: 'McDonalds 2',
        menus: {
          model: 'Menu',
          docs: [
            {
              title: 'Chicken Nuggets',
              price: '4.99',
            },
            {
              title: 'Coke Drink',
              price: '1.29',
            },
          ],
        },
        rating: '1',
      },
      {
        name: 'McDonalds 3',
        menus: {
          model: 'Menu',
          docs: [
            {
              title: 'Chicken Nuggets',
              price: '4.99',
            },
            {
              title: 'Coke Drink',
              price: '1.29',
            },
          ],
        },
        rating: '2',
      },
    ],
  },
];

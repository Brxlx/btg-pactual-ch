import { z } from 'zod';
// {
//   "codigoPedido": 1001,
//   "codigoCliente":1,
//   "itens": [
//       {
//           "produto": "lápis",
//           "quantidade": 100,
//           "preco": 1.10
//       },
//       {
//           "produto": "caderno",
//           "quantidade": 10,
//           "preco": 1.00
//       }
//   ]
// }
export const createOrderSchema = z.object({
  orderId: z.number().nonnegative(),
  customerId: z.number().nonnegative(),
  items: z.array(
    z.object({
      product: z.string(),
      quantity: z.number().nonnegative(),
      price: z
        .number()
        .positive() // Garante que o número seja positivo
        .transform((val) => {
          const decimalPart = val - Math.trunc(val);
          // Se tiver uma casa decimal, adiciona um zero
          return decimalPart.toFixed(1) === decimalPart.toString()
            ? val.toFixed(2)
            : val.toFixed(2);
        })
        .transform((val) => parseFloat(val)),
    }),
  ),
});

export type CreateOrderSchema = z.infer<typeof createOrderSchema>;

import { createZodDto } from '@anatine/zod-nestjs';
import { extendApi, extendZodWithOpenApi } from '@anatine/zod-openapi';

import { z } from 'zod';
import { type ObjectId } from 'bson';

// Exemplo de payload
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
extendZodWithOpenApi(z);
export const createOrderSchema = extendApi(
  z.object({
    orderId: z.number().nonnegative().openapi({ example: 1001 }),
    customerId: z.number().nonnegative().openapi({ example: 2034 }),
    items: z.array(
      z.object({
        product: z.string().openapi({ example: 'Lápis' }),
        quantity: z.number().nonnegative().openapi({ example: 2 }),
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
          .transform((val) => parseFloat(val))
          .openapi({ example: '3.99' }),
      }),
    ),
  }),
);

export const getOrdersByCustomerIdResponse = extendApi(
  z.object({
    orders: z.array(
      z.object({
        _id: z.custom<ObjectId>().openapi({ example: '66d2101a03e78f699fd76978' }),
        orderId: z.number().nonnegative().openapi({ example: 1001 }),
        customerId: z.number().nonnegative().openapi({ example: 1235 }),
        total: z.number().nonnegative().openapi({ example: '40.99' }),
        items: z.array(
          z.object({
            product: z.string().openapi({ example: 'Lápis' }),
            price: z.number().nonnegative().openapi({ example: '1.99' }),
            quantity: z.number().nonnegative().openapi({ example: 2 }),
          }),
        ),
      }),
    ),
  }),
);

export type CreateOrderSchema = z.infer<typeof createOrderSchema>;

export class CreateOrdersByCustomerIdDTO extends createZodDto(createOrderSchema) {}
export class GetOrdersByCustomerIdResponse extends createZodDto(getOrdersByCustomerIdResponse) {}

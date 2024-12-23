import { z } from 'zod';

export const envSchema = z.object({
  NODE_ENV: z.enum(['dev', 'test', 'prod']).default('dev'),
  APP_PORT: z.coerce.number().optional().default(3000),
  DATABASE_URL: z.string().url(),
  QUEUE_URL: z.string().url().startsWith('amqp://'),
});

export type Env = z.infer<typeof envSchema>;

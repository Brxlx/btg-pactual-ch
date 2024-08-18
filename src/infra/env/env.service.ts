import { CoreEnv } from '@/core/env/core-env';
import { Env } from './env.schema';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class EnvService implements CoreEnv<Env> {
  constructor(private readonly configService: ConfigService<Env, true>) {}

  get<K extends keyof Env>(key: K): Env[K] {
    return this.configService.get(key, { infer: true });
  }
}

import { compare, hash } from 'bcryptjs';
import { sign, verify } from 'jsonwebtoken';
import env from 'env-var';
import Cryptr from 'cryptr';

import { ITokenStructure } from '../authorization/ITokenStructure';

const JWT_SECRET = env.get('JWT_SECRET').required().asString();

const cryptr = new Cryptr(JWT_SECRET);

export async function hashPassword(password: string): Promise<string> {
  return hash(password, 7);
}

export async function verifyPassword(plainPassword: string, hashedPassword?: string | null): Promise<boolean> {
  if (!hashedPassword) { return false; }

  return compare(plainPassword, hashedPassword);
}

export function signToken(input: ITokenStructure) {
  return sign(input, JWT_SECRET);
}

export function verifyToken(token: string) {
  return verify(token, JWT_SECRET) as ITokenStructure;
}

export function encryptString(value: string) {
  return cryptr.encrypt(value);
}

export function decryptString(value: string) {
  return cryptr.decrypt(value);
}

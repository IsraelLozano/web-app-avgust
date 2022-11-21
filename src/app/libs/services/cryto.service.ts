import { Injectable } from '@angular/core';
import crypto from 'crypto-js';

@Injectable({
  providedIn: 'root',
})
export class CrytoService {
  private key = 'B418oe1BaAMHYH2KklfReoPnNC0d4iis';
  // private key = 'c@m03ns1284';

  encrypt(toEncrypt: any) {
    return crypto.AES.encrypt(toEncrypt, this.key).toString();
  }

  decrypt(toDecrypt: any) {
    return toDecrypt ? crypto.AES.decrypt(toDecrypt, this.key).toString(crypto.enc.Utf8) : '';
  }
}

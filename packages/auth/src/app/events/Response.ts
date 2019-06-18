import { Module } from '@codelab/system';

interface IResponse {
  title: string;
  message: string;
  module: Module;
}

export default class Response {
  private title: string;
  private message: string;
  private module: Module;

  constructor({ title, message, module }: IResponse) {
    this.title = title;
    this.message = message;
    this.module = module;
  }
}

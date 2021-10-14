import axios, { AxiosResponse, AxiosError } from 'axios';
import _ from 'lodash';

import { logger } from './logger.service';

class AjaxService {
  static instance: AjaxService;

  constructor() {
    if (AjaxService.instance) {
      return AjaxService.instance;
    }
    AjaxService.instance = this;
  }

  static getInstance = (): AjaxService => AjaxService.instance || new AjaxService();

  private static formatParams = (
    p: Record<string, string | string[]>,
  ): Record<string, string | string[]> => {
    const ret: Record<string, string> = {};
    _.forIn(p, (v: string | string[], k: string) => {
      if (v instanceof Array) {
        ret[k] = _.reduce(v, (str: string, e: string) => (str === '' ? `${e}` : `${str},${e}`), '');
      } else {
        ret[k] = v;
      }
    });
    return ret;
  };

  private handleResponseError = (error: AxiosError): Promise<AxiosError> => {
    logger.error(error?.response?.data);
    return Promise.reject(error?.response?.data);
  };

  get = async (url: string, params: Record<string, string | string[]> = {}): Promise<any> => {
    const formattedParams = AjaxService.formatParams(params);
    return axios
      .get(url, { params: formattedParams })
      .then((res: AxiosResponse) => Promise.resolve(res.data))
      .catch(this.handleResponseError);
  };

  post = async (url: string, params: Record<string, any> = {}): Promise<any> => {
    return axios
      .post(url, params)
      .then((res: AxiosResponse) => Promise.resolve(res.data))
      .catch(this.handleResponseError);
  };
}

const instance = new AjaxService();
Object.freeze(instance);

export default instance;

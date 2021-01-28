import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

import * as moment from 'moment';

// essa interface é criada para criar um "contrato" para definir quais serão os campos do filtro.
export interface LancamentoFiltro {
  descricao: string;
  dataVencimentoInicio: Date;
  dataVencimentoFim: Date;
}

@Injectable({
  providedIn: 'root'
})
export class LancamentosService {

  lancamentosURL = 'http://localhost:8080/lancamentos';

  constructor(private http: HttpClient) { }

  pesquisar(filtro: LancamentoFiltro): Promise<any> {
    const headers = new HttpHeaders()
    .append('Authorization', 'Basic YW5kZXJzb24uc2ZvbGl2ZWlyYUBnbWFpbC5jb206YWRtaW4=');

    let params = new HttpParams();

    // se existir a propriedade "descricao" no objeto "filtro" entra no if.
    if (filtro.descricao) {
      //Precisamos atribuir o resultado do método "set" novamente à variável "params"
      params = params.set('descricao', filtro.descricao);
    }

    // A biblioteca "moment" é usada para converter a data do “calendar” para string para ser usado o recurso de filtro.
    if (filtro.dataVencimentoInicio) {
      params = params.set('dataVencimentoDe', moment(filtro.dataVencimentoInicio).format('YYYY-MM-DD'));
    }

    if (filtro.dataVencimentoFim) {
      params = params.set('dataVencimentoAte', moment(filtro.dataVencimentoFim).format('YYYY-MM-DD'));
    }

    return this.http.get(`${this.lancamentosURL}?resumo`, { headers, params })
      .toPromise()
      .then(response => response['content']);
//      .then(response => {
//        console.log(response);
//      });
//      .catch(erro => {
//        return Promise.reject(`Erro ao consultar cidades`);
//      })
  }
}
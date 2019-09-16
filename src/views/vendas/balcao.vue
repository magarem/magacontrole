<style scoped>
  /* It is simple way to use scroll bar to table body*/

  .tableBodyScroll thead {
    background-color: #B38D4F;
    color: white;
  }

  .tableBodyScroll tbody {
    display: block;
    height: 440px;
    max-height: 440px;
    overflow-y: scroll;
  }

  .tableBodyScroll thead,

  tbody tr {
    display: table;
    align-content: center;
    /* width: 100%; */
    table-layout: fixed;
  }

  tbody tr div {
    text-align: center;
  }
  tr:nth-child(even) {
    background-color: #E6C793
  }
</style>
<template>
  <div class="app-container">
    <el-row :gutter="20">
      <el-col :span="11">
        <div class="filter-container" style="height: 500px; ">
          <el-form :inline="true" class="demo-form-inline">
            <span class="grid-content bg-red" justify="center" style="font-family: tahoma; font-size: 30px;" :style="{color: msgMain.color}">
              {{ msgMain.txt }}
            </span><br><br>
            <el-form-item label="Cliente">
              <input ref="cliente" placeholder="Código" v-model="cliente" class="el-input__inner" style="width: 100px; height: 33px;">
            </el-form-item>
            <el-form-item label="">
              <input ref="clienteBusca" placeholder="Busca pelo nome ou CPF" v-model="clienteBusca" class="el-input__inner" style="width: 250px; height: 33px;" @keyup.enter="getCliente(clienteBusca)">
            </el-form-item>
            <el-button v-waves :loading="downloadLoading" class="filter-item" type="primary" @click="getCliente(cliente)">
              Buscar
            </el-button>
            <br>
            <el-form-item label="Quantidade">
              <el-input-number v-model="qnt" :min="1" :max="100" style="width: 120px;" />
            </el-form-item><br>
            <el-form-item label="Código">
              <input ref="ean" v-model="listQuery.ean" class="el-input__inner" style="width: 100px; height: 33px;" autofocus @keyup.enter="addList(listQuery.ean)">
              </input>
            </el-form-item>
            <!-- <el-form-item> -->
              <el-button v-waves :loading="downloadLoading" class="filter-item" type="primary" icon="el-icon-download" @click="addList(listQuery.ean)">
                Incluir
              </el-button>
            <!-- </el-form-item> -->
            <el-form-item label="Diversos">
              <input ref="diversos.txt" v-model="diversos.txt" placeholder="Diversos" class="el-input__inner" style="width: 100px; height: 33px;">
              </input>
              <money ref="diversos.valor" v-model="diversos.valor" v-bind="money" class="el-input__inner" style="width: 100px; height: 33px;" @keyup.enter="addDiversos()"/>
            </el-form-item>
            <el-form-item>
              <el-button v-waves :loading="downloadLoading" class="filter-item" type="primary" icon="el-icon-download" @click="addDiversos()">
                Incluir
              </el-button>
            </el-form-item>

            <br>
            <!-- <span style='font-size: 20px;'>{{itemAdd_ean}}</span><br> -->
            <!-- <span style='font-size: 20px;'>{{itemAdd_qnt}}</span><br> -->
            <span v-show="itemAdd_descricao" style="font-size: 40px;">{{ itemAdd_descricao }}</span><br><br>
            <!-- <span style='font-size: 20px;'>{{itemAdd_unidade}}</span><br> -->
            <span v-show="itemAdd_descricao" style="font-size: 17px;">Preço unitário:</span><br>
            <span v-show="itemAdd_descricao" style="font-size: 24px;">{{ itemAdd_pco_venda | money }}</span><br>
            <!-- <span style='font-size: 20px;'>{{itemAdd_subTotal | money}}</span><br> -->
            <br>
            <el-button v-if=itemAdd_descricao v-waves :loading="downloadLoading" class="filter-item" type="primary" @click="productEdit()">
              Editar produto
            </el-button>
            <!-- <el-form-item label="Procurar">
          <input ref="descricao" v-model="listQuery.descricao" class="el-input__inner" style="width: 150px; height: 33px;" @keyup.enter.native="searchProductByDesc(listQuery.descricao);">
          </input>
        </el-form-item> -->
            <!-- <el-form-item>
          <el-button v-waves class="filter-item" type="primary" icon="el-icon-search" @click="searchProductByDesc(listQuery.descricao)">
            Ok
          </el-button>
        </el-form-item> -->
          </el-form>
        </div>
        <div justify="center" style="font-family: tahoma; ">
          <el-button v-show="totalGeral>0" style="height:60px; font-size:25px; " type="warning" icon="el-icon-close">Cancelar</el-button>
          <el-button v-show="totalGeral>0" style="height:60px; font-size:25px;" type="primary" icon="el-icon-check" @click="vendaClose()">
            Finalizar venda
          </el-button>
          <el-button  style="height:60px; font-size:25px;" type="primary" icon="el-icon-check" @click="vendasStackUpload()">
            upload Vendas
          </el-button>
        </div>
      </el-col>
      <el-col :span="13">
        <!-- compra itens table -->
        <el-row type="flex" class="row-bg" justify="center" style="background-color: #112940">
          <el-col :span="24">
            <div class="grid-content bg-red"  style="font-family: tahoma; font-size: 22px; padding: 16px; color: white; text-align: center">
              Cupom
            </div>
          </el-col>
        </el-row>
        <table border="0" cellpadding="5" cellspacing="3" class="tableBodyScroll" style="background-color: #FFDCA3;">
          <thead>
            <tr style="font-size:16px;">
              <th><div style="width: 30px;">#</div></th>
              <th><div style="width: 239px;">Produto</div></th>
              <th><div style="width: 40px;">Uni</div></th>
              <th><div style="width: 50px;">N</div></th>
              <th><div style="width: 55px;">$</div></th>
              <th><div style="width: 65px;">Total</div></th>
              <th><div style="width: 55px;" /></th>
            </tr>
          </thead>
          <tbody id="container">
            <tr v-for="item, index in list" id="tr" style="color: #403729;">

              <td id="td" scope="row"><div style="width: 30px;">{{ index + 1 }}</div></td>
              <td id="td" scope="row"><div style="width: 239px;">{{ item.ean }}<br>{{ item.descricao }}</div></td>

              <td id="td" scope="row"><div style="width: 40px;">{{ item.unidade }}</div></td>
              <td id="td" scope="row"><div style="width: 50px;">{{ item.qnt }}</div></td>
              <td id="td" scope="row"><div style="width: 55px;">{{ item.pco_venda | money2 }}</div></td>
              <td id="td" scope="row"><div style="width: 65px;">{{ item.subtotal | money2 }}</div></td>
              <td id="td" scope="row"><div style="width: 55px;">
                <el-button v-waves class="filter-item" size="small" type="danger" icon="el-icon-remove-outline" @click="handleDelete(item)" />
              </div></td>
            </tr>
          </tbody>
        </table>
        <!-- </div> -->
        <!-- /compra itens table -->
        <!-- TOTAL -->
        <el-row type="flex" class="row-bg" justify="center" style="background-color: #112940">
          <el-col :span="24">
            <div class="grid-content bg-red" justify="right" style="font-family: tahoma; font-size: 30px; padding: 16px; color: white; text-align: right">
              {{ this.totalItens }} Iten(s)  Total: {{ this.totalGeral | money }}
            </div>
          </el-col>
        </el-row>
      </el-col>
    </el-row>
    <!-- /TOTAL -->

    <!----                                                        ----->
    <!----          Modal aux windows                             ----->
    <!----                                                        ----->

    <!-- New product -->
    <el-dialog :visible.sync="dialogFormVisible" :title="textMap[dialogStatus]" top="5vh">
      <el-form ref="dataForm" :rules="rules" :model="temp" label-position="left" label-width="100px" style="width: 400px; margin-left:50px;">

        <el-form-item label="Código" prop="ean">
          <el-input v-model="temp.ean" />
        </el-form-item>

        <el-form-item label="Descrição" prop="descricao">
          <input class=el-input__inner ref="form_descricao" v-model="temp.descricao" />
          <!-- <el-button  v-waves   type="primary" @click="eansearch()">
            >>
          </el-button> -->
        </el-form-item>

        <el-form-item label="Preço custo" prop="preco_custo">
          <money v-model="temp.pco_custo" v-bind="money" class="el-input__inner" />
        </el-form-item>

        <el-form-item label="Preço" prop="preco_venda">
          <money ref="tempPco_venda" v-model="temp.pco_venda" v-bind="money" class="el-input__inner" />
        </el-form-item>

        <el-form-item label="Unidade" prop="unidade">
          <el-input v-model="temp.unidade" />
        </el-form-item>
        <el-form-item label="Estoque" prop="estoque">
          <el-input v-model="temp.estoque" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">
          Cancela
        </el-button>
        <el-button type="primary" @click="dialogStatus==='create'?createData():updateData()">
          Confirma
        </el-button>
      </div>
    </el-dialog>

    <!-- Change qnt of row -->
    <el-dialog :visible.sync="dialogFormQntVisible" :title="textMap[dialogStatus]" top="5vh">
      <el-form ref="dataForm" :rules="rules" :model="temp" label-position="left" label-width="140px" style="width: 400px; margin-left:50px;">
        <el-form-item label="Código" prop="ean">
          {{ temp2.ean }}
        </el-form-item>
        <el-form-item label="Descrição" prop="descricao">
          {{ temp2.descricao }}
        </el-form-item>
        <el-form-item label="Preço" prop="preco">
          {{ temp2.pco_venda | money }}
        </el-form-item>
        <el-form-item label="Unidade" prop="unidade">
          {{ temp2.unidade }}
        </el-form-item>
        <el-form-item label="Quantidade" prop="qnt">
          <el-input-number v-model="temp2.qnt" :min="1" :max="10" @change="temp2.subtotal = temp2.qnt * temp2.pco_venda" />
        </el-form-item>
        <el-form-item label="subtotal" prop="total">
          {{ temp2.subtotal | money }}
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormQntVisible = false">Cancela</el-button>
        <el-button type="primary" @click="updateData()">Confirma</el-button>
      </div>
    </el-dialog>

    <!-- Product edit -->
    <el-dialog :visible.sync="dialogFormProductUpdateVisible" :title="textMap[dialogStatus]" top="5vh">
      <el-form ref="dataFormProductEdit" :rules="rules" :model="temp2" label-position="left" label-width="140px" style="width: 400px; margin-left:50px;">
        <el-form-item label="Código" prop="ean">
          {{ temp2.ean }}
        </el-form-item>

        <el-form-item label="Descrição" prop="descricao">
          <el-input ref="form_descricao2" v-model="temp2.descricao" />
        </el-form-item>

        <el-form-item label="Preço custo" prop="preco_custo">
          <money v-model="temp2.pco_custo" v-bind="money" class="el-input__inner" />
        </el-form-item>

        <el-form-item label="Preço" prop="preco_venda">
          <money v-model="temp2.pco_venda" v-bind="money" class="el-input__inner" />
        </el-form-item>

        <el-form-item label="Unidade" prop="unidade">
          <el-input v-model="temp2.unidade" />
        </el-form-item>
        <el-form-item label="Estoque" prop="estoque">
          <el-input v-model="temp2.estoque" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormProductUpdateVisible = false">Cancela</el-button>
        <el-button type="primary" @click="updateProductEdit()">Confirma</el-button>
      </div>
    </el-dialog>

    <!-- Venda close -->
    <el-dialog :visible.sync="vendaCloseFlg" title="Fechamento de venda" width="60%" center top="5vh">
      <el-form ref="form" :model="form" label-width="170px">
        <el-row :gutter="20">
          <el-col :span="12">
            <el-row>
              <el-col :span="24"><div class="grid-content bg-purple-dark">Venda</div></el-col>
            </el-row>
            <el-form-item label="Total">
              <!--el-input v-model="totalGeral" v-money="money"></el-input-->
              {{ totalGeral|money }}
            </el-form-item>
            <el-form-item label="Desconto">
              <!--el-input v-model="desconto" v-money="money"></el-input-->
              <money v-model="desconto" v-bind="money" class="el-input__inner" />
            </el-form-item>
            <!--el-form-item label="Acréscimo"-->
              <!--el-input v-model="acrescimo" v-money="money"></el-input-->
              <!--money v-model="acrescimo" v-bind="money" class="el-input__inner" /-->
            <!--/el-form-item-->
            <el-form-item label="Total a pagar">
              {{ total_a_pagar | money }}
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-row>
              <el-col :span="24"><div class="grid-content bg-purple-dark">Pagamento</div></el-col>
            </el-row>
            <el-form-item label="Dinheiro">
              <!--el-input v-model="pago_dinheiro"></el-input-->
              <money v-model="pago_dinheiro" v-bind="money" class="el-input__inner" />
            </el-form-item>
            <el-form-item label="Cartão de débito">
              <!--el-input v-model="pago_debito"></el-input-->
              <money v-model="pago_debito" v-bind="money" class="el-input__inner" />
            </el-form-item>
            <el-form-item label="Cartão de crédito">
              <!--el-input v-model="pago_credito"></el-input-->
              <money v-model="pago_credito" v-bind="money" class="el-input__inner" />
            </el-form-item>
            <el-form-item label="Valor pago">
              <!--el-input v-model="valor_pago"></el-input-->
              <money v-model="valor_pago" v-bind="money" class="el-input__inner" />
            </el-form-item>

            <el-form-item label="Troco">
              <!--el-input v-model="pago_troco"></el-input-->
              <money v-if="pago_troco>0" v-model="pago_troco" v-bind="money" class="el-input__inner" />
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button v-if="pago_troco>=0" type="primary" @click="vendaCloseOk(); dialogPvVisible = false">Confirma</el-button>
      </span>
    </el-dialog>

    <!-- Venda close end -->
    <el-dialog :visible.sync="vendaCloseOkVisible" title="Venda registrada" width="30%">
      <span>Venda registrada com sucesso!</span>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="vendaCloseOkEnd">Ok</el-button>
      </span>
    </el-dialog>

    <!-- Products list -->
    <el-dialog :visible.sync="produtosListFlg" title="Busca de produto" width="70%">
      <el-table :data="produtosList" border fit highlight-current-row style="width: 100%">
        <el-table-column label="Descricao" prop="descricao" sortable="custom" align="center" width="350">
          <template slot-scope="scope">
            <span>{{ scope.row.descricao | capitalize }}</span>
          </template>
        </el-table-column>
        <el-table-column label="unidade" prop="unidade" sortable="custom" align="center" width="100">
          <template slot-scope="scope">
            <span>{{ scope.row.unidade }}</span>
          </template>
        </el-table-column>
        <el-table-column label="Preço" prop="pco_venda" sortable="custom" align="center" width="130">
          <template slot-scope="scope">
            <span>{{ scope.row.pco_venda | money }}</span>
          </template>
        </el-table-column>

        <el-table-column label="Ações" align="center" width="100" class-name="small-padding fixed-width">
          <template slot-scope="{row}">
            <el-button size="mini" type="success" @click="addList(row.ean)">
              Incluir
            </el-button>
          </template>
        </el-table-column>

      </el-table>

      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="produtosListFlg = false">Fechar</el-button>
      </span>
    </el-dialog>

    <!-- Clientes busca lista -->
    <el-dialog :visible.sync="clientesListFlg" title="Busca cliente" width="70%" align="center">
      <el-table :data="clientesList" border fit highlight-current-row style="width: 100%">
        <el-table-column label="Código" prop="id" sortable="custom" align="center" width="100">
          <template slot-scope="scope">
            <span>{{ scope.row.id }}</span>
          </template>
        </el-table-column>
        <el-table-column label="Nome" prop="nome" sortable="custom" align="center" width="385">
          <template slot-scope="scope">
            <span>{{ scope.row.nome | capitalize }}</span>
          </template>
        </el-table-column>
        <el-table-column label="Documento" prop="doc" sortable="custom" align="center" width="200">
          <template slot-scope="scope">
            <span>{{ scope.row.doc }}</span>
          </template>
        </el-table-column>
        <el-table-column label="Ações" align="center" width="170" class-name="small-padding fixed-width">
          <template slot-scope="{row}">
            <el-button size="default" type="success" @click="clienteSet(row.id)">
              Selecionar
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <span slot="footer" class="dialog-footer" align="center">
        <el-button type="primary" @click="clientesListFlg = false">Fechar</el-button>
      </span>
    </el-dialog>

    <!-- /Modal aux windows -->

  </div>
</template>

<script>
import { fetchList, create, update } from '@/api/produto'
import waves from '@/directive/waves' // waves directive
import { parseTime } from '@/utils'
import Pagination from '@/components/Pagination' // secondary package based on el-pagination
import axios from 'axios'
import { Money } from 'v-money'
import {server} from '@/config'

async function foo(ean){
    var data = await fetch(process.env.VUE_APP_BASE_API + '/eansearch?ean='+ean); // notice the await
    // code here only executes _after_ the request is done
    console.log('data:', data);
    return data // data is defined
}
export default {
  name: 'Balcao',
  components: { Pagination, Money },
  directives: { waves },
  filters: {
    money(value) {
      value = parseFloat(value).toFixed(2)
      if (!value) return ''
      value = value.toString()
      if (value.indexOf('.') == -1) {
        value += ',00'
      }
      return 'R$ ' + value.replace('.', ',')
    },
    money2(value) {
      value = parseFloat(value).toFixed(2)
      if (!value) return ''
      value = value.toString()
      if (value.indexOf('.') == -1) {
        value += ',00'
      }
      return value.replace('.', ',')
    },
    capitalize(value) {
      if (!value) return ''
      value = value.toString()
      return value.charAt(0).toUpperCase() + value.slice(1)
    },
    statusFilter(status) {
      const statusMap = {
        published: 'success',
        draft: 'info',
        deleted: 'danger'
      }
      return statusMap[status]
    },
    typeFilter(type) {
      return calendarTypeKeyValue[type]
    }
  },
  data() {
    return {
      // server: 'http://localhost:8080',
      server: server,
      msgMain: { txt: 'Caixa livre', color: 'green' },
      subtotal: 0,
      diversos: {
        txt: '',
        valor: 0
      },
      produtos:[],
      cliente: '',
      clienteBusca: '',
      clientesList: [],
      list2: [],
      dialogFormProductUpdateVisible: false,
      itemAdd_qnt: '',
      itemAdd_descricao: '',
      itemAdd_pco_venda: '',
      itemAdd_subTotal: '',
      itemN: 0,
      itemAdd_ean: '',
      vendaItemId: 0,
      totalItens: 0,
      money: {
        decimal: ',',
        thousands: '.',
        prefix: 'R$ ',
        precision: 2,
        masked: false /* doesn't work with directive */
      },
      form: {},
      lastEan: null,
      valor_pago: 0,
      pago_troco: 0,
      pago_dinheiro: 0,
      pago_debito: 0,
      pago_credito: 0,
      total_a_pagar: 0,
      desconto: 0,
      acrescimo: 0,
      pago_falta: 0,
      vendaID: Math.random().toString(36).substring(2, 9) + Math.random().toString(36).substring(2, 6),
      vendaItem: 0,
      produtosListFlg: false,
      vendaCloseFlg: false,
      clientesListFlg: false,
      dialogFormQntVisible: false,
      dialogFormVisible: false,
      produtosListVisible: false,
      vendaCloseOkVisible: false,
      tableKey: 0,
      list: [],
      vendasStack: [],
      produtosList: [],
      total: 0,
      totalGeral: 0,
      listLoading: true,
      qnt: 1,
      listQuery: {
        page: 1,
        limit: 20,
        importance: undefined,
        title: undefined,
        type: undefined,
        sort: '+id'
      },
      importanceOptions: [1, 2, 3],
      sortOptions: [{ label: 'ID Ascending', key: '+id' }, { label: 'ID Descending', key: '-id' }],
      statusOptions: ['published', 'draft', 'deleted'],
      showReviewer: false,
      temp: {
        id: 0,
        ean: ''
      },
      temp2: {
        id: 0
      },
      dialogStatus: '',
      textMap: {
        update: 'Editar',
        create: 'Incluir'
      },
      dialogPvVisible: false,
      pvData: [],
      rules: {
        type: [{ required: true, message: 'type is required', trigger: 'change' }],
        timestamp: [{ type: 'date', required: true, message: 'timestamp is required', trigger: 'change' }],
        title: [{ required: true, message: 'title is required', trigger: 'blur' }]
      },
      downloadLoading: false
    }
  },
  watch: {
    // sempre que a pergunta mudar, essa função será executada
    desconto: function() {
      this.total_a_pagar = this.totalGeral - this.desconto + parseFloat(this.acrescimo)
      this.valor_pago = (parseFloat(this.pago_dinheiro) + parseFloat(this.pago_debito) + parseFloat(this.pago_credito))
      this.pago_troco = this.valor_pago - this.total_a_pagar
      // this.answer = 'Esperando você parar de escrever...'
      // this.debouncedGetAnswer()
    },
    acrescimo: function() {
      this.total_a_pagar = this.totalGeral - this.desconto + parseFloat(this.acrescimo)
      this.valor_pago = (parseFloat(this.pago_dinheiro) + parseFloat(this.pago_debito) + parseFloat(this.pago_credito))
      this.pago_troco = this.valor_pago - this.total_a_pagar
      // this.answer = 'Esperando você parar de escrever...'
      // this.debouncedGetAnswer()
    },
    pago_dinheiro: function() {
      this.total_a_pagar = this.totalGeral - this.desconto + parseFloat(this.acrescimo)
      this.valor_pago = (parseFloat(this.pago_dinheiro) + parseFloat(this.pago_debito) + parseFloat(this.pago_credito))
      this.pago_troco = this.valor_pago - this.total_a_pagar
      this.pago_falta = this.total_a_pagar - this.pago_falta
      // this.answer = 'Esperando você parar de escrever...'
      // this.debouncedGetAnswer()
    },
    pago_debito: function() {
      this.total_a_pagar = this.totalGeral - this.desconto + parseFloat(this.acrescimo)
      this.valor_pago = (parseFloat(this.pago_dinheiro) + parseFloat(this.pago_debito) + parseFloat(this.pago_credito))
      this.pago_troco = this.valor_pago - this.total_a_pagar
      // this.answer = 'Esperando você parar de escrever...'
      // this.debouncedGetAnswer()
    },
    pago_credito: function() {
      this.total_a_pagar = this.totalGeral - this.desconto + parseFloat(this.acrescimo)
      this.valor_pago = (parseFloat(this.pago_dinheiro) + parseFloat(this.pago_debito) + parseFloat(this.pago_credito))
      this.pago_troco = this.valor_pago - this.total_a_pagar
      // this.answer = 'Esperando você parar de escrever...'
      // this.debouncedGetAnswer()
    }

  },
  created() {
    if (localStorage.getItem('produtos')) {
      try {
        this.produtos = JSON.parse(localStorage.getItem('produtos'));
      } catch(e) {
        localStorage.removeItem('produtos');
      }
    }else{
      fetchList().then(response => {
        // console.log('ferchList.response:', response);
        this.produtos = response.data.items
        console.log('this.produtos:', this.produtos);
        const produtos = JSON.stringify(this.produtos);
        localStorage.setItem('produtos', produtos);
      })
    }
  },
  methods: {
    eansearch(){
      var strr = []
      var self = this

      //console.log('>>>>>', foo(self.temp.ean));
      return axios.get(process.env.VUE_APP_BASE_API + '/eansearch?ean='+self.temp.ean);

      // var request = new XMLHttpRequest();
      // request.open('GET','http://localhost:8080/eansearch?ean='+self.temp.ean, false)
      // request.send(null);
      //
      // if (request.status === 200) {// That's HTTP for 'ok'
      //   console.log('request.responseText:', request.responseText);
      //   return  request.responseText
      // }
      // axios.get('http://localhost:8080/eansearch?ean='+self.temp.ean)
      //   .then(function (response) {
      //     console.log('ok:', response.data)
      //     setTimeout(() => {
      //       self.temp.descricao = response.data;
      //     }, 10000)
      //   })
      //   .catch(function (error) {
      //     alert(error)
      // });

      //self.temp.descricao = strr[]

    },
    vendasStackUpload(){
      var self = this
      console.log('this.vendasStack:', this.vendasStack);
      if (this.vendasStack.length > 0) {
        for (var t=0; t < this.vendasStack.length; t++){
          axios.post(process.env.VUE_APP_BASE_API + '/vendaClose', this.vendasStack[t])
            .then(function (response) {
              console.log('ok:', response);
            })
            .catch(function (error) {
              alert('erro')
          });
        }
      }
      this.$notify({
        title: 'Sucesso',
        message: 'Vendas enviado com sucesso',
        type: 'success',
        duration: 2000
      })
      //Sending Products list
      axios.post(process.env.VUE_APP_BASE_API + '/productsList', this.produtos)
        .then(function (response) {
          console.log('ok:', response);
        })
        .catch(function (error) {
          alert('erro')
      });
      this.$notify({
        title: 'Sucesso',
        message: 'Produtos enviado com sucesso',
        type: 'success',
        duration: 2000
      })
    },
    productEdit(){
      var objProduct = {
        id:this.lastId,
        ean:this.lastEan,
        descricao: this.lastDescricao,
        unidade: this.lastUnidade,
        pco_venda: this.lastPco_venda,
        estoque: this.lastEstoque
      }
      this.handleProductUpdate(objProduct)
    },
    indexMethod(index) {
      return index * 2
    },
    getSummaries(param) {
      const { columns, data } = param
      const sums = []
      columns.forEach((column, index) => {
        if (index === 0) {
          sums[index] = ''
          return
        }
        if (index === 1) {
          sums[index] = ''
          return
        }
        if (index === 2) {
          sums[index] = ''
          return
        }
        if (index === 3) {
          sums[index] = ''
          return
        }
        if (index === 4) {
          sums[index] = 'Total:'
          return
        }
        if (index === 6) {
          sums[index] = ''
          return
        }
        const values = data.map(item => Number(item[column.property]))
        if (!values.every(value => isNaN(value))) {
          sums[index] = 'R$ ' + values.reduce((prev, curr) => {
            const value = Number(curr)
            if (!isNaN(value)) {
              return prev + curr
            } else {
              return prev
            }
          }, 0)
        } else {
          sums[index] = 'N/A'
        }
      })

      return sums
    },
    produtoIncluir(ean) {
      this.addList(ean)
      this.produtosListFlg = false
    },
    clienteSet(id) {
      // this.listQuery.ean = ean
      console.log('cliente id:', id)
      this.cliente = id
      this.clientesListFlg = false
      this.msgMain = { txt: 'Venda em curso', color: '#886A08' }
      this.$refs.ean.focus()
    },
    vendaClose() {
      this.totalGeral = 0
      // Totaliza
      for (const v of this.list) {
        this.totalGeral += v.subtotal
      }

      this.total_a_pagar = this.totalGeral

      // clean up form
      this.desconto = 0
      this.acrescimo = 0
      this.pago_dinheiro = 0
      this.pago_credito = 0
      this.totalpago = 0
      this.pago_troco = 0 - this.total_a_pagar
      this.vendaCloseFlg = true
    },
    vendaCloseOk() {
      var self = this
      this.totalpago = this.pago_dinheiro + this.pago_debito + this.pago_credito
      const a = { vendaID: this.vendaID, cliente: this.cliente, subtotal: this.totalGeral, desconto: this.desconto, acrescimo: this.acrescimo, total: this.total, dinheiro: this.pago_dinheiro, debito: this.pago_debito, credito: this.pago_credito, totalpago: this.totalpago, troco: this.pago_troco, itens: this.list }
      const json = JSON.stringify(a)
      console.log(json)

      // Try save operation in server

      const post_data = { json_data: json }
      // axios.post(self.server+'/vendaClose', post_data)

      axios.post(process.env.VUE_APP_BASE_API + '/vendaClose', post_data)
        .then(function (response) {
          console.log('ok:', response);
        })
        .catch(function (error) {
          self.vendasStack.push(post_data)
          console.log('error:', error);
        });


      // Reset venda
      this.vendaID = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)
      this.total_a_pagar = 0
      this.totalGeral = 0

      // clean up form
      this.desconto = 0
      this.acrescimo = 0
      this.pago_dinheiro = 0
      this.pago_debito = 0
      this.pago_credito = 0
      this.pago_troco = 0 - this.total_a_pagar
      this.list = []

      this.listQuery.ean = ''
      this.listQuery.descricao = ''

      this.itemAdd_descricao = ''
      this.itemAdd_pco_venda = 0

      this.vendaCloseFlg = false
      this.vendaCloseOkVisible = true
      this.vendaItem = 0
    },
    vendaCloseOkEnd() {
      this.totalItens = 0
      this.msgMain = { txt: 'Caixa Livre', color: 'green' }
      this.listQuery.descricao = ''
      this.$refs.ean.focus()
      this.vendaCloseOkVisible = false
    },
    scrollToEnd() {
      var container = this.$el.querySelector('#container')
      container.scrollTop = container.scrollHeight
    },
    addDiversos() {

      this.msgMain = { txt: 'Venda em curso', color: '#886A08' }
      this.vendaItemId++
      var descricao = this.diversos.txt||'Diversos'
      console.log(descricao);
      this.subtotal = (parseFloat(this.qnt) * parseFloat(this.diversos.valor)) // Calc row subtotal
      this.list.push({ id: this.vendaItemId, vendaID: this.vendaID, ean: '00001', descricao: descricao, pco_venda: this.diversos.valor, unidade: 'uni', qnt: this.qnt, subtotal: this.subtotal })
      this.total = 1 // Rows total

      this.itemAdd_ean = '00001'
      this.itemAdd_descricao = descricao
      this.itemAdd_unidade = 'Uni'
      this.itemAdd_pco_venda = this.diversos.valor
      this.itemAdd_subTotal = this.subtotal

      // Itens sum
      this.totalItens = 0
      for (let t = 0; t < this.list.length; t++) {
        this.totalItens += this.list[t].qnt
      }

      // Total Calc
      this.totalGeral += (parseFloat(this.qnt) * parseFloat(this.diversos.valor))

      // Just to simulate the time of the request
      setTimeout(() => {
        this.scrollToEnd()
      }, 0.2 * 1000)

      setTimeout(() => {
        this.listLoading = false
      }, 1.5 * 1000)

      // Reset top doc values
      this.listQuery.ean = ''
      this.qnt = 1

      // Clean up diversos fields
      this.diversos.txt = ''
      this.diversos.valor = 0

      // EAN input focus to get ready to next product EAN enter
      this.$refs.ean.focus()
    },
    addList(ean) {
      console.log('ean:',ean);
      this.lastEan = ean
      this.msgMain = { txt: 'Venda em curso', color: '#886A08' }
      this.produtosListFlg = false
      this.listLoading = true

      // Search product EAN code in produtos
      var item = this.produtos.find(x => x.ean === ean)
      console.log('item:', item);
      // fetchList({ ean: ean }).then(response => {
        // Caso encontre o código de barra no banco executa bloco
      if (item) {
        this.vendaItemId++ // add one in venda ID
        // var item = response.data.items[0] // Aux var
        // var item = produto // Aux var
        var subtotal = (parseFloat(this.qnt) * parseFloat(item.pco_venda)) // Calc row subtotal
        // console.log('item:', item.ean);
        // Add in list array
        this.itemN++
        this.list.push({ id: this.vendaItemId, itemN: this.itemN, vendaID: this.vendaID, ean: item.ean, descricao: item.descricao, pco_venda: item.pco_venda, unidade: item.unidade, qnt: this.qnt, subtotal: subtotal })
        this.total = 1 // Rows total

        //Aux last variables to edit products
        this.lastId = item.id
        this.lastEan = item.ean
        this.lastDescricao = item.descricao
        this.lastUnidade = item.unidade
        this.lastPco_venda = item.pco_venda


        this.itemAdd_ean = item.ean
        this.itemAdd_qnt = item.qnt
        this.itemAdd_descricao = item.descricao
        this.itemAdd_unidade = item.unidade
        this.itemAdd_pco_venda = item.pco_venda
        this.itemAdd_subTotal = subtotal

        // Itens sum
        this.totalItens = 0
        for (let t = 0; t < this.list.length; t++) {
          this.totalItens += this.list[t].qnt
        }

        // Total Calc
        this.totalGeral += (parseFloat(this.qnt) * parseFloat(item.pco_venda))

        // Just to simulate the time of the request
        setTimeout(() => {
          this.scrollToEnd()
        }, 0.2 * 1000)

        setTimeout(() => {
          this.listLoading = false
        }, 1.5 * 1000)

        // Reset top doc values
        this.listQuery.ean = ''
        this.qnt = 1

        // EAN input focus to get ready to next product EAN enter
        this.$refs.ean.focus()
      } else {
        // Caso não encontre o código de barra no banco pula para Incluir
        this.handleProductCreate(ean)
      }
      // })
    },
    searchProductByDesc(desc) {
      // Get out empty spaces id desc
      const descricao = desc.trim()
      console.log('|' + descricao + '|')

      // If search word have more than 2 chars execute block
      if (descricao.length > 2) {
        this.produtosListFlg = true // Open products window
        this.listLoading = true // Open listLoading

        // Search desc in databank
        fetchList({ descricao: descricao }).then(response => {
          console.log('response.data.items:', response.data.items)
          this.produtosList = response.data.items
          this.total2 = response.data.total

          // Just to simulate the time of the request
          setTimeout(() => {
            this.listLoading = false
          }, 1.5 * 1000)
        })
      } else {
        // Show warning advise when desc words are less than 3 words
        this.$notify({
          title: 'Procurar',
          message: 'Digite mais de 2 dígitos',
          type: 'warning',
          duration: 2000
        })
      }

      // Reset search input fields
      this.listQuery.ean = ''
      this.listQuery.descricao = ''
    },
    getCliente(clienteBusca) {
      const self = this
      self.clientesList = []
      console.log('|' + this.clienteBusca + '|')
      if (this.clienteBusca.length > 2) {
        this.clientesListFlg = true
        this.listLoading = true
        axios.get(process.env.VUE_APP_BASE_API + '/clientes?nome=' + this.clienteBusca)
          .then(function(response) {
            // handle success
            console.log('response:', response.data.data.items)

            self.clientesList = response.data.data.items
            console.log('clientesList:', self.clientesList)
            this.total2 = response.data.total
            // Just to simulate the time of the request
            setTimeout(() => {
              this.listLoading = false
            }, 1.5 * 1000)
          })
          .catch(function(error) {
            // handle error
            console.log(error)
          })
          .finally(function() {
            // always executed
          })
      } else {
        this.$notify({
          title: 'Procurar',
          message: 'Digite mais de 2 dígitos',
          type: 'warning',
          duration: 2000
        })
      }
      this.listQuery.ean = ''
      this.listQuery.descricao = ''
    },
    handleFilter() {
      this.listQuery.page = 1
      this.getList()
    },
    handleModifyStatus(row, status) {
      this.$message({
        message: 'Success',
        type: 'success'
      })
      row.status = status
    },
    sortChange(data) {
      const { prop, order } = data
      if (prop === 'id') {
        this.sortByID(order)
      }
    },
    sortByID(order) {
      if (order === 'ascending') {
        this.listQuery.sort = '+id'
      } else {
        this.listQuery.sort = '-id'
      }
      this.handleFilter()
    },
    resetTemp() {
      this.temp = {
        id: this.temp.id,
        importance: 1,
        remark: '',
        timestamp: new Date(),
        title: '',
        status: 'published',
        type: ''
      }
    },
    handleProductCreate(ean) {
      this.resetTemp()

      // alert(ean)
      if (ean != null) this.temp.ean = ean



      this.eansearch(ean).then((result) => {
           console.log('result:', result.data);

           this.temp.descricao = result.data

           // if (this.eansearch()) {this.temp.descricao = this.eansearch()}

           // this.$refs.tempPco_venda.focus()

           // this.qnt = 10
           this.temp.id++
           // console.log('this.temp.id:', this.temp.id)
           // console.log('ean:', ean)
           this.temp.ean = ean
           this.temp.qnt = this.qnt
           this.temp.unidade = 'uni'
           this.temp.estoque = 10
           this.dialogStatus = 'create'
           this.dialogFormVisible = true
           this.$nextTick(() => {
             this.$refs['dataForm'].clearValidate()
             this.$refs.form_descricao.focus()
           })
           this.listQuery.ean = ''
           this.qnt = 1
       })


    },
    createData() {
      var self = this
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {

          //Add new product in product array
          this.vendaItemId++
          const aux = { id: this.vendaItemId, ean: this.temp.ean, descricao: this.temp.descricao, pco_venda: this.temp.pco_venda, unidade: this.temp.unidade, qnt: this.qnt, subtotal: (parseFloat(this.qnt) * parseFloat(this.temp.pco_venda)) }
          console.log(aux)
          this.produtos.push(aux)

          //Add new product in local storage
          localStorage.removeItem('produtos');
          localStorage.setItem('produtos', JSON.stringify(this.produtos));

          this.$refs.ean.focus()
          this.total = this.produtos.length

          this.totalGeral += (parseFloat(this.qnt) * parseFloat(this.temp.pco_venda))

          // itens sum
          this.totalItens = 0
          for (let t = 0; t < this.list.length; t++) {
            this.totalItens += this.list[t].qnt
          }

          console.log('this.totalItens:', this.totalItens)

          this.itemAdd_ean = this.temp.ean
          this.itemAdd_descricao = this.temp.descricao
          this.itemAdd_pco_venda = this.temp.pco_venda



          // Add in venda lista
          this.addList(this.temp.ean)

          // Zera campo de código
          this.listQuery.ean = ''

          this.dialogFormVisible = false



          //Add new product in databank

            create(this.temp).then(() => {
              this.$notify({
                title: 'Sucesso',
                message: 'Produto cadastrado com sucesso',
                type: 'success',
                duration: 2000
              })
            }, function(motivo) {
              self.$notify({
                title: 'erro',
                message: motivo,
                type: 'error',
                duration: 2000
              })
            })

        }
      })
    },
    handleProductUpdate(row) {
      console.log(row)
      this.temp2 = Object.assign({}, row) // copy obj
      this.temp2.timestamp = new Date(this.temp2.timestamp)
      this.dialogStatus = 'update'
      this.dialogFormProductUpdateVisible = true
      this.$nextTick(() => {
        this.$refs['dataFormProductEdit'].clearValidate()
      })
    },
    handleUpdate(row) {
      alert(row)
      console.log(row)
      this.temp2 = Object.assign({}, row) // copy obj
      this.temp2.timestamp = new Date(this.temp2.timestamp)
      this.dialogStatus = 'update'
      this.dialogFormQntVisible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },
    updateData() {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          const tempData = Object.assign({}, this.temp2)
          // tempData.timestamp = +new Date(tempData.timestamp) // change Thu Nov 30 2017 16:41:05 GMT+0800 (CST) to 1512031311464
          // updateArticle(tempData).then(() => {
          for (const v of this.list) {
            console.log('this.temp2.id:', this.temp2.id)
            if (v.id === this.temp2.id) {
              const index = this.list.indexOf(v)
              this.list.splice(index, 1, this.temp2)
              break
            }
          }
          this.dialogFormVisible = false
          this.$notify({
            title: 'Sucesso',
            message: 'Registro alterado',
            type: 'success',
            duration: 2000
          })
          // itens sum
          this.totalItens = 0
          for (let t = 0; t < this.list.length; t++) {
            this.totalItens += this.list[t].qnt
          }
          // Totaliza
          this.totalGeral = 0
          for (const v of this.list) {
            this.totalGeral += v.subtotal
          }
          this.dialogFormQntVisible = false
          // })
        }
      })
    },
    updateProductEdit() {
      this.$refs['dataFormProductEdit'].validate((valid) => {
        if (valid) {
          const tempData = Object.assign({}, this.temp2)
          // tempData.timestamp = +new Date(tempData.timestamp) // change Thu Nov 30 2017 16:41:05 GMT+0800 (CST) to 1512031311464
        update(tempData).then(() => {
          for (const v of this.list) {
            console.log('this.temp2.id:', this.temp2.id)
            if (v.id === this.temp2.id) {
              const index = this.list.indexOf(v)
              this.list.splice(index, 1, this.temp2)
              break
            }
          }
          this.dialogFormProductUpdateVisible = false
          this.$notify({
            title: 'Sucesso',
            message: 'Registro alterado',
            type: 'success',
            duration: 2000
          })
         })
        }
      })
    },
    handleDelete(row) {
      this.$notify({
        title: 'Sucesso',
        message: 'Registro excluido',
        type: 'success',
        duration: 2000
      })
      console.log(row)
      this.totalGeral -= row.subtotal
      const index = this.list.indexOf(row)

      this.list.splice(index, 1)
      // itens sum
      this.totalItens = 0
      for (let t = 0; t < this.list.length; t++) {
        this.totalItens += this.list[t].qnt
      }
      // this.vendaItem--
    },
    handleDownload() {
      this.downloadLoading = true
        import('@/vendor/Export2Excel').then(excel => {
          const tHeader = ['timestamp', 'title', 'type', 'importance', 'status']
          const filterVal = ['timestamp', 'title', 'type', 'importance', 'status']
          const data = this.formatJson(filterVal, this.list)
          excel.export_json_to_excel({
            header: tHeader,
            data,
            filename: 'table-list'
          })
          this.downloadLoading = false
        })
    },
    formatJson(filterVal, jsonData) {
      return jsonData.map(v => filterVal.map(j => {
        if (j === 'timestamp') {
          return parseTime(v[j])
        } else {
          return v[j]
        }
      }))
    }
  }
}
</script>

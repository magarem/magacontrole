<template>
  <div class="app-container">
    <div class="filter-container">
      <el-form :inline="true" class="demo-form-inline">
        <el-form-item label="Quantidade">
          <el-input-number v-model="qnt" :min="1" :max="100" style="width: 150px;" />
        </el-form-item>
        <el-form-item label="Código">
          <input ref="ean" v-model="listQuery.ean" class="el-input__inner" style="width: 150px; height: 33px;" autofocus @keyup.enter="addList(listQuery.ean)">
          </input>
        </el-form-item>
        <el-form-item>
          <el-button v-waves :loading="downloadLoading" class="filter-item" type="primary" icon="el-icon-download" @click="addList(listQuery.ean)">
            Incluir
          </el-button>
        </el-form-item>
        <el-form-item label="Procurar">
          <el-input v-model="listQuery.descricao" placeholder="" style="width: 150px;" @keyup.enter.native="getList();" />
        </el-form-item>
        <el-form-item>
          <el-button v-waves class="filter-item" type="primary" icon="el-icon-search" @click="getList(); ">
            Ok
          </el-button>
        </el-form-item>
      </el-form>
    </div>

    <el-table
      :key="tableKey"
      v-loading="false"
      height="250"
      :data="list"
      border
      fit
      highlight-current-row
      style="width: 100%;"
      @sort-change="sortChange"
    >
      <!-- <el-table-column label="ID" prop="id" sortable="custom" align="center" width="80">
        <template slot-scope="scope">
          <span>{{ scope.row.id }}</span>
        </template>
      </el-table-column> -->
      <el-table-column label="Código" prop="ean" sortable="custom" align="center" width="80">
        <template slot-scope="scope">
          <span>{{ scope.row.ean }}</span>
        </template>
      </el-table-column>
      <el-table-column label="Descricao" prop="descricao" sortable="custom" align="center" width="300">
        <template slot-scope="scope">
          <span>{{ scope.row.descricao | capitalize }}</span>
        </template>
      </el-table-column>
      <el-table-column label="Unidade" prop="unidade" sortable="custom" align="center" width="120">
        <template slot-scope="scope">
          <span>{{ scope.row.unidade }}</span>
        </template>
      </el-table-column>

      <el-table-column label="Preço custo" prop="pco_custo" sortable="custom" align="center" width="90">
        <template slot-scope="scope">
          <span>{{ scope.row.pco_custo | money }}</span>
        </template>
      </el-table-column>

      <el-table-column label="Qnt" prop="qnt" sortable="custom" align="center" width="70">
        <template slot-scope="scope">
          <span>{{ scope.row.qnt }}</span>
        </template>
      </el-table-column>

      <el-table-column label="subtotal" prop="subtotal" sortable="custom" align="center" width="100">
        <template slot-scope="scope">
          <span>{{ scope.row.subtotal | money }}</span>
        </template>
      </el-table-column>

      <el-table-column label="Ações" align="center" width="150" class-name="small-padding fixed-width">
        <template slot-scope="{row}">
          <el-button type="primary" size="mini" icon="el-icon-edit" @click="handleUpdate(row)" />
          <el-button size="mini" type="danger" icon="el-icon-delete" @click="handleDelete(row)" />
        </template>
      </el-table-column>
    </el-table>
    <br>

    <el-row :gutter="20">
      <el-col :span="10">
        <div class="grid-content bg-purple">&nbsp;</div>
      </el-col>
      <el-col :span="10">
        <div class="grid-content bg-purple">{{ this.totalItens }} Itens, Total: {{ this.totalGeral | money }}</div>
      </el-col>

      <el-col :span="4">
        <div class="grid-content bg-purple">
          <el-button v-show="totalGeral>0" v-waves type="success" round :loading="downloadLoading" class="filter-item" icon="el-icon-download" @click="compraClose()">
            Fechar compra
          </el-button>
        </div>
      </el-col>
    </el-row>

    <!----                                                        ----->
    <!----          Windows                                       ----->
    <!----                                                        ----->

    <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormQntVisible" top="5vh">
      <el-form ref="dataForm" :rules="rules" :model="temp" label-position="left" label-width="140px" style="width: 400px; margin-left:50px;">

        <!-- <el-form-item label="ID" prop="id">
          {{temp2.id}}
        </el-form-item> -->
        <el-form-item label="Código" prop="ean">
          {{ temp2.ean }}
        </el-form-item>
        <el-form-item label="Descrição" prop="descricao">
          {{ temp2.descricao }}
        </el-form-item>
        <el-form-item label="Preço custo" prop="preco_custo">
          {{ temp2.pco_custo | money }}
        </el-form-item>
        <el-form-item label="Unidade" prop="unidade">
          {{ temp2.unidade }}
        </el-form-item>
        <el-form-item label="Quantidade" prop="qnt">
          <el-input-number v-model="temp2.qnt" :min="1" :max="1000" @change="temp2.subtotal = temp2.qnt * temp2.pco_custo" />
        </el-form-item>
        <el-form-item label="subtotal" prop="total">
          {{ temp2.subtotal | money }}
        </el-form-item>

      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormQntVisible = false">
          Cancela
        </el-button>
        <el-button type="primary" @click="updateData()">
          Confirma
        </el-button>
      </div>
    </el-dialog>

    <el-dialog :visible.sync="produtosListFlg" title="Busca de produto" width="70%">
      <el-table :data="produtosList" border fit highlight-current-row style="width: 100%">

        <!--el-table-column label="ean" prop="ean" sortable="custom" align="center" width="80">
          <template slot-scope="scope">
            <span>{{ scope.row.ean }}</span>
          </template>
        </el-table-column-->

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
        <el-table-column label="Preço custo" prop="pco_custo" sortable="custom" align="center" width="130">
          <template slot-scope="scope">
            <span>{{ scope.row.pco_custo | money }}</span>
          </template>
        </el-table-column>

        <el-table-column label="Ações" align="center" width="100" class-name="small-padding fixed-width">
          <template slot-scope="{row}">
            <el-button size="mini" type="success" @click="tt(row.ean)">
              Incluir
            </el-button>
          </template>
        </el-table-column>
      </el-table>

      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="produtosListFlg = false">Fechar</el-button>
      </span>
    </el-dialog>

    <el-dialog :visible.sync="compraCloseFlg" title="Fechamento de compra" width="60%" center top="5vh">
      <el-form ref="form" :model="form" label-width="170px">
        <el-row :gutter="20">
          <el-col :span="12">
            <el-row>
              <el-col :span="24"><div class="grid-content bg-purple-dark">compra</div></el-col>
            </el-row>
            <el-form-item label="Total">
              <!--el-input v-model="totalGeral" v-money="money"></el-input-->
              {{ totalGeral|money }}
            </el-form-item>
            <el-form-item label="Desconto">
              <!--el-input v-model="desconto" v-money="money"></el-input-->
              <money v-model="desconto" v-bind="money" class="el-input__inner" />
            </el-form-item>
            <el-form-item label="Acréscimo">
              <!--el-input v-model="acrescimo" v-money="money"></el-input-->
              <money v-model="acrescimo" v-bind="money" class="el-input__inner" />
            </el-form-item>
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
        <el-button v-if="pago_troco>=0" type="primary" @click="compraCloseOk(); dialogPvVisible = false">Confirma</el-button>
      </span>
    </el-dialog>

    <el-dialog
      title="compra registrada"
      :visible.sync="compraCloseOkVisible"
      width="30%"
    >
      <span>compra registrada com sucesso!</span>
      <span slot="footer" class="dialog-footer">
        <!--el-button @click="dialogVisible = false">Cancel</el-button-->
        <el-button type="primary" @click="compraCloseOkEnd">Ok</el-button>
      </span>
    </el-dialog>

  </div>
</template>

<script>
import { fetchList, fetchPv, create, update } from '@/api/produto'
import waves from '@/directive/waves' // waves directive
import { parseTime } from '@/utils'
import Pagination from '@/components/Pagination' // secondary package based on el-pagination
import axios from 'axios'
import { Money } from 'v-money'

export default {
  name: 'Entradas',
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
      // compraItem: 0,
      compraItemId: 0,
      totalItens: 0,
      money: {
        decimal: ',',
        thousands: '.',
        prefix: 'R$ ',
        precision: 2,
        masked: false /* doesn't work with directive */
      },
      form: {},
      valor_pago: 0,
      pago_troco: 0,
      pago_dinheiro: 0,
      pago_debito: 0,
      pago_credito: 0,
      total_a_pagar: 0,
      desconto: 0,
      acrescimo: 0,
      pago_falta: 0,
      compraID: Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15),
      compraItem: 0,
      produtosListFlg: false,
      compraCloseFlg: false,
      dialogFormQntVisible: false,
      produtosListVisible: false,
      compraCloseOkVisible: false,
      tableKey: 0,
      list: [],
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
        ean: '',
        importance: 1,
        remark: '',
        timestamp: new Date(),
        title: '',
        type: '',
        status: 'published'
      },
      temp2: {
        id: 0,
        importance: 1,
        remark: '',
        timestamp: new Date(),
        title: '',
        type: '',
        status: 'published'
      },
      dialogFormVisible: false,
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
    // this.getList()
  },
  methods: {
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
    tt(ean) {
      this.addList(ean)
      this.produtosListFlg = false
    },
    compraClose() {
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
      this.compraCloseFlg = true
    },
    compraCloseOk() {
      this.totalpago = this.pago_dinheiro + this.pago_debito + this.pago_credito
      const a = { compraID: this.compraID, cliente: 0, subtotal: this.totalGeral, desconto: this.desconto, acrescimo: this.acrescimo, total: this.total, dinheiro: this.pago_dinheiro, debito: this.pago_debito, credito: this.pago_credito, totalpago: this.totalpago, troco: this.pago_troco, itens: this.list }
      const json = JSON.stringify(a)
      console.log(json)
      const post_data = { json_data: json }
      axios.post(process.env.VUE_APP_BASE_API + '/compraClose', post_data)

      // Reset compra
      this.compraID = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)
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

      this.compraCloseFlg = false
      this.compraCloseOkVisible = true
      this.compraItem = 0
    },
    compraCloseOkEnd() {
      this.listQuery.descricao = ''
      this.$refs.ean.focus()
      this.compraCloseOkVisible = false
    },
    addList(ean) {
      this.listLoading = true
      fetchList({ ean: ean }).then(response => {
        if (response.data.items.length > 0) {
          // this.compraItem++
          this.compraItemId++
          // Caso encontre o código de barra no banco
          const subtotal = (parseFloat(this.qnt) * parseFloat(response.data.items[0].pco_custo))
          this.list.unshift({ id: this.compraItemId, ean: this.listQuery.ean, compraID: this.compraID, ean: response.data.items[0].ean, descricao: response.data.items[0].descricao, pco_custo: response.data.items[0].pco_custo, unidade: response.data.items[0].unidade, qnt: this.qnt, subtotal: subtotal })
          this.total = response.data.total

          // itens sum
          this.totalItens = 0
          for (let t = 0; t < this.list.length; t++) {
            this.totalItens += this.list[t].qnt
          }
          this.totalGeral += (parseFloat(this.qnt) * parseFloat(response.data.items[0].pco_custo))
          // Just to simulate the time of the request
          setTimeout(() => {
            this.listLoading = false
          }, 1.5 * 1000)
          this.listQuery.ean = ''
          this.qnt = 1
          // this.listQuery.descricao = ""
          this.$refs.ean.focus()
        } else {
          // Caso não encontre o código de barra no banco pula para Incluir
          this.handleCreate(this.listQuery.ean)
        }
      })

      // this.list.push({descricao: "boneca2", ean: "454545", estoque: "100", id: 4257, pco_compra: "232", unidade: "un"})
      // console.log(this.list);
    },
    getList() {
      const descricao = this.listQuery.descricao.trim()
      console.log('|' + descricao + '|')
      if (descricao.length > 2) {
        this.produtosListFlg = true
        this.listLoading = true
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
    handleCreate(ean) {
      this.resetTemp()
      // alert(ean)
      if (ean != null) this.temp.ean = ean
      // this.qnt = 10
      this.temp.id++
      console.log('this.temp.id:', this.temp.id)
      console.log('ean:', ean)
      this.temp.ean = ean
      this.temp.qnt = this.qnt
      this.temp.unidade = 'uni'
      this.temp.estoque = 10
      this.dialogStatus = 'create'
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
      this.listQuery.ean = ''
      this.qnt = 1
    },
    createData() {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          createArticle(this.temp).then(() => {
            // this.list.unshift(this.temp)
            // Caso encontre o código de barra no banco
            this.compraItemId++
            const aux = { id: this.compraItemId, ean: this.temp.ean, descricao: this.temp.descricao, pco_compra: this.temp.pco_compra, unidade: this.temp.unidade, qnt: this.qnt, subtotal: (parseFloat(this.qnt) * parseFloat(this.temp.pco_compra)) }
            console.log(aux)
            this.list.unshift(aux)
            this.total = this.list.length

            this.totalGeral += (parseFloat(this.qnt) * parseFloat(this.temp.pco_compra))

            // itens sum
            this.totalItens = 0
            for (let t = 0; t < this.list.length; t++) {
              this.totalItens += this.list[t].qnt
            }

            console.log('this.totalItens:', this.totalItens)

            this.dialogFormVisible = false
            this.$notify({
              title: 'Sucesso',
              message: 'Produto cadastrado com sucesso',
              type: 'success',
              duration: 2000
            })
          })
        }
      })
    },
    handleUpdate(row) {
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
      // this.compraItem--
    },
    handleFetchPv(pv) {
      fetchPv(pv).then(response => {
        this.pvData = response.data.pvData
        this.dialogPvVisible = true
      })
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

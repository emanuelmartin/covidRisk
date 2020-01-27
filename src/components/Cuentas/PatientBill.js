import React, { Component } from 'react';
import {
  Text,
  View,
  Alert,
  FlatList,
  ScrollView,
  StyleSheet,
  ActivityIndicator,
  TouchableWithoutFeedback
} from 'react-native';
import { connect } from 'react-redux';
import Modal from 'react-native-modal';
import { SearchBar } from 'react-native-elements';
import { NavigationActions } from 'react-navigation';
import { Dropdown } from 'react-native-material-dropdown';
import { CardSection, Button, Spinner, Input } from '../common';
import {
  queryFunc,
  queryPointer,
  queryAttach,
  cleanFunc,
  partialPayment,
  printHTMLReducer,
  printClean
} from '../../actions';

class PatientBill extends Component {
  static navigationOptions = {
    title: 'Cuenta de Paciente',
  };

  constructor(props) {
    super(props);
    //setting default state
    let Paciente = { names: '' };
    let Insumos = false;
    let Estudios = false;
    let Otros = false;

    this.state = {
      isLoading: false,
      Paciente,
      Insumos,
      Estudios,
      Otros,
      modalPagar: false,
      modalAbonar: false,
      recibido: '0',
      total: 0,
      caja: ''
    };
  }

  componentDidMount() {
    this.props.queryFunc({ text: '' });
    this.props.cleanFunc();
    this.props.printClean();
    this.setState(
      {
        isLoading: false,
        Paciente: { names: '' },
        modalPagar: false,
        modalAbonar: false,
        recibido: '0',
        total: 0,
        caja: ''
      });
  }

  componentWillUnmount() {
    this.props.cleanFunc();
    this.props.printClean();
  }

  onPrintTicket() {
    this.props.printHTMLReducer(this.props.ticketInfo, 'abonoCuenta', false);
  }

  onOtherBillPress() {
    this.setState({
      Paciente: { names: '' },
      modalPagar: false,
      modalAbonar: false,
      recibido: '0',
      total: 0,
      caja: ''
    });
    this.props.cleanFunc();
    this.props.printClean();
  }

  onPayPress() {
    this.setState({ modalPagar: true });
  }

  onResumePrint({ Farmacia, totalFarmacia, Estudios, totalEstudios, Hospitalizacion, totalHospitalizacion, Cirugia, totalCirugia }) {
    console.log("Resume Print");
    const date = new Date();
    const dia = date.getDate() + '/' + (date.getMonth() + 1) + '/' + date.getFullYear();
    const hora = date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds();
    const info = {
      paciente: this.state.Paciente,
      fecha: { dia, hora },
      lista: { Farmacia, totalFarmacia, Estudios, totalEstudios, Hospitalizacion, totalHospitalizacion, Cirugia, totalCirugia }
    };
    this.props.printHTMLReducer(info, 'resumeBill', false);
  }

  onDetailPrint({ Farmacia, totalFarmacia, Estudios, totalEstudios, Hospitalizacion, totalHospitalizacion, Cirugia, totalCirugia }) {
    console.log("Detail Print");
    const date = new Date();
    const dia = date.getDate() + '/' + (date.getMonth() + 1) + '/' + date.getFullYear();
    const hora = date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds();
    const info = {
      paciente: this.state.Paciente,
      fecha: { dia, hora },
      lista: { Farmacia, totalFarmacia, Estudios, totalEstudios, Hospitalizacion, totalHospitalizacion, Cirugia, totalCirugia }
    };
    this.props.printHTMLReducer(info, 'detailBill', false);
  }

  onPrintPress({ Farmacia, totalFarmacia, Estudios, totalEstudios, Hospitalizacion, totalHospitalizacion, Cirugia, totalCirugia }) {
    Alert.alert(
      'Seleccione el tipo de impresión',
      '',
      [
        { text: 'Resumida', onPress: () => this.onResumePrint({ Farmacia, totalFarmacia, Estudios, totalEstudios, Hospitalizacion, totalHospitalizacion, Cirugia, totalCirugia }) },
        { text: 'Detallada', onPress: () => this.onDetailPrint({ Farmacia, totalFarmacia, Estudios, totalEstudios, Hospitalizacion, totalHospitalizacion, Cirugia, totalCirugia }) },
        { text: 'Cancelar', style: 'cancel' }
      ],
      { cancelable: false }
    );
  }

  onPayConfirm() {
    if (this.state.caja === '') {
      Alert.alert(
        'Error:',
        'Por favor seleccione una caja',
        [{ text: 'Ok', style: 'cancel' }],
        { cancelable: false }
      );
    } else if (isNaN(parseFloat(this.state.recibido)) || parseFloat(this.state.recibido) <= 0) {
      Alert.alert(
        'Error:',
        'La cantidad recibida debe ser mayor a $0',
        [{ text: 'Ok', style: 'cancel' }],
        { cancelable: false }
      );
    } else if (parseFloat(this.state.recibido) < this.state.total) {
      Alert.alert(
        'Error:',
        'La cantidad recibida debe ser al menos $' + this.state.total,
        [{ text: 'Ok', style: 'cancel' }],
        { cancelable: false }
      );
    } else {
      console.log('Función para pagar');
    }
  }

  onPartialPayPress() {
    this.setState({ modalAbonar: true });
  }

  onPartialPayConfirm() {
    if (this.state.caja === '') {
      Alert.alert(
        'Error:',
        'Por favor seleccione una caja',
        [{ text: 'Ok', style: 'cancel' }],
        { cancelable: false }
      );
    } else if (isNaN(parseFloat(this.state.recibido)) || parseFloat(this.state.recibido) <= 0) {
      Alert.alert(
        'Error:',
        'La cantidad recibida debe ser mayor a $0',
        [{ text: 'Ok', style: 'cancel' }],
        { cancelable: false }
      );
    } else if (parseFloat(this.state.recibido) > this.state.total) {
      Alert.alert(
        '¿Desea liquidar la cuenta? ',
        '',
        [
          { text: 'Si', onPress: () => this.onPayConfirm() },
          { text: 'No', style: 'cancel' },
        ],
        { cancelable: false }
      );
    } else {
      this.props.partialPayment(
        this.state.caja,
        parseFloat(this.state.recibido),
        this.state.Paciente
      );
    }
  }

  newLista() {
    if (this.props.Cuenta === 'Failed') {
      Alert.alert(
        'Paciente sin cargos',
        'El paciente seleccionado aún no tiene cargos',
        [{ text: 'Ok', style: 'cancel' }],
        { cancelable: false }
      );
    } else if (this.props.Cuenta !== '') {
      let dataList = null;
      if (Array.isArray(this.props.Cuenta)) {
        dataList = this.props.Cuenta;
      } else {
        dataList = [this.props.Cuenta];
      }

      let totalFarmacia = 0;
      let totalEstudios = 0;
      let totalCirugia = 0;
      let totalHospitalizacion = 0;

      let Farmacia = [];
      let Estudios = [];
      let Cirugia = [];
      let Hospitalizacion = [];

      dataList.forEach((bill) => {
        if (bill.cuenta.Type === 'devolucion') {
        } else {
          if (bill.cuenta.imagen !== undefined && bill.cuenta.imagen !== null) {
            if (bill.cuenta.imagen.length > 0) {
              bill.cuenta.imagen.forEach((desglose) => {
                if (Estudios.some(producto => producto.objectId === desglose.objectId)) {
                  const pos = Estudios.map(e => { return e.objectId; }).indexOf(desglose.objectId);
                  Estudios[pos].cant += parseFloat(desglose.cantidad);
                } else {
                  desglose.sellType = 'publico';
                  desglose.cant = parseFloat(desglose.cantidad);
                  Estudios.push(desglose);
                }
                totalEstudios += desglose.precio * parseFloat(desglose.cantidad) * (1 + (desglose.iva / 100));
              });
            } else if (bill.cuenta.imagen.length === 1) {
              if (Estudios.some(producto => producto.objectId === bill.cuenta.imagen[0].objectId)) {
                const pos = Estudios.map(e => { return e.objectId; }).indexOf(bill.cuenta.imagen[0].objectId);
                Estudios[pos].cant += parseFloat(bill.cuenta.imagen[0].cantidad);
              } else {
                bill.cuenta.imagen[0].sellType = 'publico';
                bill.cuenta.imagen[0].cant = parseFloat(bill.cuenta.imagen[0].cantidad);
                Estudios.push(bill.cuenta.imagen[0]);
              }
              totalEstudios += bill.cuenta.imagen[0].precio * parseFloat(bill.cuenta.imagen[0].cantidad) * (1 + (bill.cuenta.imagen[0].iva / 100));
            }
          }
          if (bill.cuenta.laboratorio !== undefined && bill.cuenta.laboratorio !== null) {
            if (bill.cuenta.laboratorio.length > 0) {
              bill.cuenta.laboratorio.forEach((desglose) => {
                if (Estudios.some(producto => producto.objectId === desglose.objectId)) {
                  const pos = Estudios.map(e => { return e.objectId; }).indexOf(desglose.objectId);
                  Estudios[pos].cant += parseFloat(desglose.cantidad);
                } else {
                  desglose.sellType = 'publico';
                  desglose.cant = parseFloat(desglose.cantidad);
                  Estudios.push(desglose);
                }
                totalEstudios += desglose.precio * parseFloat(desglose.cantidad) * (1 + (desglose.iva / 100));
              });
            } else if (bill.cuenta.laboratorio.length === 1) {
              if (Estudios.some(producto => producto.objectId === bill.cuenta.laboratorio[0].objectId)) {
                const pos = Estudios.map(e => { return e.objectId; }).indexOf(bill.cuenta.laboratorio[0].objectId);
                Estudios[pos].cant += parseFloat(bill.cuenta.laboratorio[0].cantidad);
              } else {
                bill.cuenta.laboratorio[0].sellType = 'publico';
                bill.cuenta.laboratorio[0].cant = parseFloat(bill.cuenta.laboratorio[0].cantidad);
                Estudios.push(bill.cuenta.laboratorio[0]);
              }
              totalEstudios += bill.cuenta.laboratorio[0].precio * parseFloat(bill.cuenta.laboratorio[0].cantidad) * (1 + (bill.cuenta.laboratorio[0].iva / 100));
            }
          }
          if (bill.cuenta.farmacia !== undefined && bill.cuenta.farmacia !== null) {
            if (bill.cuenta.farmacia.length >=1) {
              bill.cuenta.farmacia.forEach((desglose) => {
                if (Farmacia.some(producto => producto.objectId === desglose.objectId)) {
                  const pos = Farmacia.map(e => { return e.objectId; }).indexOf(desglose.objectId);
                  Farmacia[pos].cant += parseFloat(desglose.cantidad);
                } else {
                  desglose.sellType = 'publico';
                  desglose.cant = parseFloat(desglose.cantidad);
                  Farmacia.push(desglose);
                }
                totalFarmacia += desglose.precioPublico * parseFloat(desglose.cantidad) * (1 + (desglose.iva / 100));
              });
            } else if (bill.cuenta.farmacia.length === 1) {
              if (Farmacia.some(producto => producto.objectId === bill.cuenta.farmacia[0].objectId)) {
                const pos = Farmacia.map(e => { return e.objectId; }).indexOf(bill.cuenta.farmacia[0].objectId);
                Farmacia[pos].cant += parseFloat(bill.cuenta.farmacia[0].cantidad);
              } else {
                bill.cuenta.farmacia[0].sellType = 'publico';
                bill.cuenta.farmacia[0].cant = parseFloat(bill.cuenta.farmacia[0].cantidad);
                Farmacia.push(bill.cuenta.farmacia[0]);
              }
              totalFarmacia += bill.cuenta.farmacia[0].precioPublico * parseFloat(bill.cuenta.farmacia[0].cantidad) * (1 + (bill.cuenta.farmacia[0].iva / 100));
            }
          }
          /*
          if (bill.cuenta.List !== undefined && bill.cuenta.List !== null) {
            if (bill.cuenta.List.length >=1) {
              bill.cuenta.List.forEach((desglose) => {
                if (desglose.precioPublico !== undefined && desglose.precioPublico !== null) {
                  if (Farmacia.some(producto => producto.objectId === desglose.objectId)) {
                    const pos = Farmacia.map(e => { return e.objectId; }).indexOf(desglose.objectId);
                    Farmacia[pos].cant += parseFloat(desglose.cantidad);
                  } else {
                    desglose.sellType = 'publico';
                    desglose.cant = parseFloat(desglose.cantidad);
                    Farmacia.push(desglose);
                  }
                  totalFarmacia += desglose.precioPublico * parseFloat(desglose.cantidad) * (1 + (desglose.iva / 100));
                } else {
                  if (Estudios.some(producto => producto.objectId === desglose.objectId)) {
                    const pos = Estudios.map(e => { return e.objectId; }).indexOf(desglose.objectId);
                    Estudios[pos].cant += parseFloat(desglose.cantidad);
                  } else {
                    desglose.sellType = 'publico';
                    desglose.cant = parseFloat(desglose.cantidad);
                    Estudios.push(desglose);
                  }
                  totalEstudios += desglose.precio * parseFloat(desglose.cantidad) * (1 + (desglose.iva / 100));
                }
              });
            } else if (bill.cuenta.List.length === 1) {
              if (bill.cuenta.List[0].precioPublico !== undefined && bill.cuenta.List[0].precioPublico !== null) {
                if (Farmacia.some(producto => producto.objectId === bill.cuenta.List[0].objectId)) {
                  const pos = Farmacia.map(e => { return e.objectId; }).indexOf(bill.cuenta.List[0].objectId);
                  Farmacia[pos].cant += parseFloat(bill.cuenta.List[0].cantidad);
                } else {
                  bill.cuenta.List[0].sellType = 'publico';
                  bill.cuenta.List[0].cant = parseFloat(bill.cuenta.List[0].cantidad);
                  Farmacia.push(bill.cuenta.List[0]);
                }
                totalFarmacia += bill.cuenta.List[0].precioPublico * parseFloat(bill.cuenta.List[0].cantidad) * (1 + (bill.cuenta.List[0].iva / 100));
              } else {
                if (Estudios.some(producto => producto.objectId === bill.cuenta.List[0].objectId)) {
                  const pos = Estudios.map(e => { return e.objectId; }).indexOf(bill.cuenta.List[0].objectId);
                  Estudios[pos].cant += parseFloat(bill.cuenta.List[0].cantidad);
                } else {
                  bill.cuenta.List[0].sellType = 'publico';
                  bill.cuenta.List[0].cant = parseFloat(bill.cuenta.List[0].cantidad);
                  Estudios.push(bill.cuenta.List[0]);
                }
                totalEstudios += bill.cuenta.List[0].precioPublico * parseFloat(bill.cuenta.List[0].cantidad) * (1 + (bill.cuenta.List[0].iva / 100));
              }
            }
          }*/
        }
      });

      if (this.props.Hospitalizacion !== undefined &&
        this.props.Hospitalizacion !== null &&
        this.props.Hospitalizacion !== '' &&
        this.props.Hospitalizacion !== 'Failed') {
        let dataList = null;
        if (Array.isArray(this.props.Hospitalizacion)) {
          dataList = this.props.Hospitalizacion;
        } else {
          dataList = [this.props.Hospitalizacion];
        }

        dataList.forEach((hosp) => {
          const ingreso = new Date(hosp.fechaIngreso.iso);
          let egreso = null;
          if (hosp.fechaEgreso !== null && hosp.fechaEgreso !== undefined) {
            egreso = new Date(hosp.fechaEgreso.iso);
          } else {
            egreso = new Date();
          }
          const dias = Math.ceil((egreso - ingreso) / 864e5, 10);
          totalHospitalizacion += hosp.servicio.precio * dias;

          if (Hospitalizacion.some(producto => producto.objectId === hosp.servicio.objectId)) {
            const pos = Hospitalizacion.map(e => { return e.objectId; }).indexOf(hosp.servicio.objectId);
            Hospitalizacion[pos].cant += dias;
          } else {
              hosp.servicio.cant = dias;
              hosp.servicio.sellType = 'publico';
              Hospitalizacion.push(hosp.servicio);
          }
        });
      }

      if (this.props.Cirugia !== undefined &&
        this.props.Cirugia !== null &&
        this.props.Cirugia !== '' &&
        this.props.Cirugia !== 'Failed') {
        let dataList = null;
        if (Array.isArray(this.props.Cirugia)) {
          dataList = this.props.Cirugia;
        } else {
          dataList = [this.props.Cirugia];
        }

        dataList.forEach((cir) => {
          const ingreso = new Date(cir.inicio.iso);
          const egreso = new Date(cir.fin.iso);
          const horas = Math.ceil((egreso - ingreso) / 36e5, 10);
          cir.rentaEquipos.forEach((equipo) => {
            if (equipo.tipoCobro === 'unitario') {
              totalCirugia += equipo.costo;
            } else if (equipo.tipoCobro === 'porHora') {
              totalCirugia += equipo.costo * horas;
            }
            if (Cirugia.some(producto => producto.objectId === equipo.objectId)) {
              const pos = Cirugia.map(e => { return e.objectId; }).indexOf(equipo.objectId);
              if (equipo.tipoCobro !== 'unitario') {
                  Cirugia[pos].cant += horas;
              }
            } else {
                if (equipo.tipoCobro === 'unitario') {
                  equipo.cant = 1;
                } else {
                  equipo.cant = horas;
                }
                equipo.sellType = 'publico';
                Cirugia.push(equipo);
            }
          });
        });
      }

      if (this.state.total !== (totalFarmacia + totalEstudios + totalHospitalizacion + totalCirugia)) {
        this.setState({ total:
          (totalFarmacia + totalEstudios + totalHospitalizacion + totalCirugia)
        });
      }

      return (
        <View>
          {this.show('Farmacia', 'objectId', Farmacia, totalFarmacia, this.renderInsumos)}
          {this.show('Estudios', 'objectId', Estudios, totalEstudios, this.renderServicios)}
          {this.show('Hospitalización', 'objectId', Hospitalizacion, totalHospitalizacion, this.renderHosp)}
          {this.show('Cirugia', 'objectId', Cirugia, totalCirugia, this.renderCirugia)}
          <CardSection>
            <View style={{ flex: 1, alignItems: 'flex-end', justifyContent: 'center' }}>
              <Text style={styles.emphasisTextStyle}> Total</Text>
              <Text style={styles.emphasisTextStyle}>
                ${(totalFarmacia + totalEstudios + totalHospitalizacion + totalCirugia).toFixed(2)}
              </Text>
            </View>
          </CardSection>
          <CardSection>
            <Button onPress={this.onPrintPress.bind(this, { Farmacia, totalFarmacia, Estudios, totalEstudios, Hospitalizacion, totalHospitalizacion, Cirugia, totalCirugia })}>
              Imprimir Cuenta
            </Button>
          </CardSection>
          <CardSection>
            <Button onPress={this.onPartialPayPress.bind(this)}>
              Abonar
            </Button>
            <Button onPress={this.onPayPress.bind(this)}>
              Liquidar
            </Button>
          </CardSection>
          {this.renderModal()}
        </View>
      );
    }
  }

  show(name, key, array, total, renderFunction) {
    if (total > 0) {
      return (
        <View>
          <CardSection>
            <TouchableWithoutFeedback
              onPress={() => this.setState(state => ({
              [name]: !state[name]
              }))}
            >
            <View style={{ flex: 1, flexDirection: 'row' }}>
              <Text style={styles.emphasisTextStyle}>{name}</Text>
              <View style={{ flex: 1 }}>
                <Text
                  style={[styles.emphasisTextStyle, { textAlign: 'right' }]}
                >
                  ${total.toFixed(2)}
                </Text>
              </View>
            </View>
            </TouchableWithoutFeedback>
          </CardSection>
          {this.listaObjetos(this.state[name], array, key, renderFunction)}
        </View>
      );
    }
  }

  listaObjetos(boolean, array, key, renderFunction) {
    if (boolean) {
      return (
        <View>
          <CardSection>
            <View style={{ flex: 1 }}>
              <Text style={[styles.emphasisTextStyle, { textAlign: 'left', fontSize: 16 }]}>
                Descripción
              </Text>
            </View>
            <View style={{ flex: 1 }}>
              <Text
                style={[styles.emphasisTextStyle, { textAlign: 'center', fontSize: 16 }]}
              >
                Cantidad
              </Text>
            </View>
            <View style={{ flex: 1 }}>
              <Text
                style={[styles.emphasisTextStyle, { textAlign: 'right', fontSize: 16 }]}
              >
                Tipo de Cobro
              </Text>
            </View>
            <View style={{ flex: 1 }}>
              <Text
                style={[styles.emphasisTextStyle, { textAlign: 'right', fontSize: 16 }]}
              >
                Precio
              </Text>
            </View>
          </CardSection>
          <CardSection>
            <FlatList
              data={array}
              ItemSeparatorComponent={this.ListViewItemSeparator}
              //Item Separator View
              renderItem={({ item }) => (
                renderFunction(item)
              )}
              enableEmptySections
              style={{ marginTop: 10 }}
              keyExtractor={(item) => item[key]}
            />
          </CardSection>
        </View>
      );
    }
  }

  lista() {
    if (this.props.User !== 'Failed') {
      return (
        <FlatList
          data={this.props.User}
          renderItem={({ item }) => (
            this.renderIt(item)
          )}
          enableEmptySections
          style={{ marginTop: 10 }}
          keyExtractor={(item) => item.curp}
        />
      );
    }
  }

  buscarPaciente() {
    if (this.state.Paciente.names === '') {
      return (
        <View style={{ flex: 1 }}>
          <CardSection>
            <SearchBar
              round
              lightTheme
              searchIcon={{ size: 24 }}
              containerStyle={{ flex: 1, backgroundColor: 'white' }}
              imputStyle={{ backgroundColor: 'white', marginTop: 0, marginBottom: 0 }}
              onChangeText={text => this.props.queryPointer({
                type: 'matches',
                object: 'User',
                variable: 'lastName1',
                text,
                regex: 'i',
                pointer: { object: 'IngresosActivos', variable: 'paciente' } })}
              onClear={() => this.props.queryFunc({ text: '' })}
              placeholder="Ingresa el primer apellido..."
              value={this.props.text}
            />
            </CardSection>
          <CardSection>
            {this.lista()}
          </CardSection>
        </View>
      );
    }
    return (
      <View>
        <CardSection>
          <Button onPress={this.onOtherBillPress.bind(this)}>
            Buscar cuentas de otro paciente
          </Button>
        </CardSection>
        <CardSection>
            <Text style={styles.emphasisTextStyle}>Nombre: </Text>
          <View style={{ flex: 1 }}>
            <Text
              style={[styles.patientTextStyle, { textAlign: 'right' }]}
            >
              {this.state.Paciente.paciente.names} {this.state.Paciente.paciente.lastName1} {this.state.Paciente.paciente.lastName2}
            </Text>
          </View>
        </CardSection>
        <View
          style={{
            height: 0.5,
            width: '90%',
            backgroundColor: '#080808',
          }}
        />
        {this.newLista()}
      </View>
    );
  }

  updatePaciente(item) {
    const pacientePointer = {
      __type: 'Pointer',
      className: '_User',
      objectId: item.paciente.objectId
    };

    const ingresoPointer = {
      __type: 'Pointer',
      className: 'IngresosActivos',
      objectId: item.objectId
    };

    this.setState({ Paciente: item, buscarPaciente: false });

    this.props.queryAttach({
    object: 'Cuenta',
    text: '',
    constrain: [{ type: 'equalTo', variable: 'paciente', text: pacientePointer },
      { type: 'equalTo', variable: 'ingresoPaciente', text: ingresoPointer, bool: 'and' }]
    });

    this.props.queryAttach({
    object: 'Hospitalizacion',
    text: '',
    constrain: [{ type: 'equalTo', variable: 'ingreso', text: ingresoPointer, include: 'servicio' }]
    });

    this.props.queryAttach({
    object: 'Cirugia',
    text: '',
    constrain: [{ type: 'equalTo', variable: 'ingresoPaciente', text: ingresoPointer }]
    });
  }

  search = text => {
    console.log(text);
  };

  clear = () => {
    this.props.text.clear();
  };

  navigateToScreen = (route, item) => () => {
    const navigateAction = NavigationActions.navigate({
      routeName: route,
      item
    });
    this.props.navigation.navigate(route, { item });
  }

  ListViewItemSeparator = () => {
    //Item separator view
    return (
      <View
        style={{
          height: 0.3,
          width: '90%',
          backgroundColor: '#080808',
        }}
      />
    );
  };

  calcularCambio() {
    if (isNaN(parseFloat(this.state.recibido))) {
      return 0;
    } else if (parseFloat(this.state.recibido) < parseFloat(this.state.total)) {
      return 0;
    }
    return (parseFloat(this.state.recibido) - parseFloat(this.state.total)).toFixed(2);
  }

  renderModal() {
    return (
      <View>
        <Modal
          isVisible={this.state.modalAbonar}
          animationType='slide'
          transparent={false}
          style={styles.modalStyle}
        >
          <CardSection>
            <Text style={styles.titleStyle}>
              Pago Parcial
            </Text>
          </CardSection>
          <CardSection>
            <Dropdown
            containerStyle={{ flex: 1 }}
            data={[{ value: 'principal' },
                   { value: 'urgencias' },
                   { value: 'laboratorio' }]}
            value={this.state.caja}
            onChangeText={value => { this.setState({ caja: value }); }}
            placeholder={'Selecciona la caja que cobra'}
            />
          </CardSection>
          <CardSection>
            <Text>Total: ${this.state.total}</Text>
          </CardSection>
          <CardSection>
            <Input
							label="Recibo"
							placeholder="0"
							onChangeText={(text) => this.setState({ recibido: text })}
							value={this.state.recibido.toString()}
							keyboardType="numeric"
            />
          </CardSection>
          <CardSection>
            <Button onPress={() => { this.onPartialPayConfirm(); }}>
              Confirmar
            </Button>
            <Button
              onPress={() => { this.setState({ modalAbonar: false, caja: '', recibido: '0' }); }}
            >
              Cancelar
            </Button>
          </CardSection>
        </Modal>
        <Modal
          isVisible={this.state.modalPagar}
          animationType='slide'
          transparent={false}
          style={styles.modalStyle}
        >
          <CardSection>
            <Text style={styles.titleStyle}>
              Pago Total
            </Text>
          </CardSection>
          <CardSection>
            <Dropdown
            containerStyle={{ flex: 1 }}
            data={[{ value: 'principal' },
                   { value: 'urgencias' },
                   { value: 'laboratorio' }]}
            value={this.state.caja}
            onChangeText={value => { this.setState({ caja: value }); }}
            placeholder={'Selecciona la caja que cobra'}
            />
          </CardSection>
          <CardSection>
            <Text>Total: ${this.state.total}</Text>
          </CardSection>
          <CardSection>
            <Input
							label="Recibo"
							placeholder="0"
							onChangeText={(text) => this.setState({ recibido: text })}
							value={this.state.recibido.toString()}
							keyboardType="numeric"
            />
          </CardSection>
          <CardSection>
            <Text>Cambio: ${this.calcularCambio()}</Text>
          </CardSection>
          <CardSection>
            <Button onPress={() => { this.onPayConfirm(); }}>
              Confirmar
            </Button>
            <Button onPress={() => { this.setState({ modalPagar: false, caja: '', recibido: '0' }); }}>
              Cancelar
            </Button>
          </CardSection>
        </Modal>
      </View>
    );
  }

  renderInsumos(item) {
    return (
      <CardSection>
        <View style={{ flex: 1 }}>
          <Text style={[styles.textStyle, { textAlign: 'left', fontSize: 14 }]}>
            {item.nombre} - {item.presentacion} {item.contenido}
          </Text>
        </View>
        <View style={{ flex: 1 }}>
          <Text
            style={[styles.textStyle, { textAlign: 'center', fontSize: 14 }]}
          >
            {item.cant}
          </Text>
        </View>
        <View style={{ flex: 1 }}>
          <Dropdown
          containerStyle={{ flex: 1 }}
          data={[{ value: 'publico' },
                 { value: 'seguro' }]}
          value={item.sellType}
          onChangeText={value => { item.sellType = value; }}
          placeholder={'Selecciona el tipo de venta'}
          />
        </View>
        <View style={{ flex: 1 }}>
          <Text
            style={[styles.textStyle, { textAlign: 'right', fontSize: 14 }]}
          >
            {(item.precioPublico * item.cant * (1 + (item.iva / 100))).toFixed(2)}
          </Text>
        </View>
      </CardSection>
    );
  }

  renderServicios(item) {
    return (
      <CardSection>
        <View style={{ flex: 1 }}>
          <Text style={[styles.textStyle, { textAlign: 'left', fontSize: 14 }]}>
            {item.nombre}
          </Text>
        </View>
        <View style={{ flex: 1 }}>
          <Text
            style={[styles.textStyle, { textAlign: 'center', fontSize: 14 }]}
          >
            {item.cant}
          </Text>
        </View>
        <View style={{ flex: 1 }}>
          <Dropdown
          containerStyle={{ flex: 1 }}
          data={[{ value: 'publico' },
                 { value: 'seguro' }]}
          value={item.sellType}
          onChangeText={value => { item.sellType = value; }}
          placeholder={'Selecciona el tipo de venta'}
          />
        </View>
        <View style={{ flex: 1 }}>
          <Text
            style={[styles.textStyle, { textAlign: 'right', fontSize: 14 }]}
          >
            {(item.precio * (1 + (item.iva / 100))).toFixed(2)}
          </Text>
        </View>
      </CardSection>
    );
  }

  renderHosp(item) {
    return (
      <CardSection>
        <View style={{ flex: 1 }}>
          <Text style={[styles.textStyle, { textAlign: 'left', fontSize: 14 }]}>
            {item.tipo} - {item.tipoHabitacion}
          </Text>
        </View>
        <View style={{ flex: 1 }}>
          <Text
            style={[styles.textStyle, { textAlign: 'center', fontSize: 14 }]}
          >
            {item.cant}
          </Text>
        </View>
        <View style={{ flex: 1 }}>
          <Dropdown
          containerStyle={{ flex: 1 }}
          data={[{ value: 'publico' },
                 { value: 'seguro' }]}
          value={item.sellType}
          onChangeText={value => { item.sellType = value; }}
          placeholder={'Selecciona el tipo de venta'}
          />
        </View>
        <View style={{ flex: 1 }}>
          <Text
            style={[styles.textStyle, { textAlign: 'right', fontSize: 14 }]}
          >
            {(item.precio).toFixed(2)}
          </Text>
        </View>
      </CardSection>
    );
  }

  renderCirugia(item) {
    return (
      <CardSection>
        <View style={{ flex: 1 }}>
          <Text style={[styles.textStyle, { textAlign: 'left', fontSize: 14 }]}>
            {item.nombre}
          </Text>
        </View>
        <View style={{ flex: 1 }}>
          <Text
            style={[styles.textStyle, { textAlign: 'center', fontSize: 14 }]}
          >
            {item.cant}
          </Text>
        </View>
        <View style={{ flex: 1 }}>
          <Dropdown
          containerStyle={{ flex: 1 }}
          data={[{ value: 'publico' },
                 { value: 'seguro' }]}
          value={item.sellType}
          onChangeText={value => { item.sellType = value; }}
          placeholder={'Selecciona el tipo de venta'}
          />
        </View>
        <View style={{ flex: 1 }}>
          <Text
            style={[styles.textStyle, { textAlign: 'right', fontSize: 14 }]}
          >
            {(item.costo).toFixed(2)}
          </Text>
        </View>
      </CardSection>
    );
  }

  renderIt(item) {
    if (this.state.isLoading) {
      //Loading View while data is loading
      return (
        <View style={{ flex: 1, paddingTop: 20 }}>
          <ActivityIndicator />
        </View>
        );
      }
      return (
      <TouchableWithoutFeedback
      onPress={() => this.updatePaciente(item)}
      >
        <View>
          <Text style={styles.textStyle} >{item.paciente.names} {item.paciente.lastName1} {item.paciente.lastName2} </Text>
        </View>
      </TouchableWithoutFeedback>
    );
  }

  renderDecide() {
    if (this.props.loading) {
      return (
        <View>
          <CardSection />
          <Spinner size="large" />
        </View>
      );
    } else if (this.props.succesPay && this.props.print === false) {
      return (
        <View>
          <CardSection>
            <Button onPress={this.onPrintTicket.bind(this)}>
              Imprimir Ticket
            </Button>
          </CardSection>
          <CardSection>
            <Button onPress={this.onOtherBillPress.bind(this)}>
              Buscar cuentas de otro paciente
            </Button>
          </CardSection>
        </View>
      );
    }
    return (
      <View>
        {this.buscarPaciente()}
      </View>
    );
  }

  render() {
   console.log(this.state);

    return (
      <View style={{ flex: 1 }}>
        <ScrollView>
          {this.renderDecide()}
          <CardSection />
        </ScrollView>
      </View>
      );
    }
  }

const styles = StyleSheet.create({
  viewStyle: {
    flex: 1,
    backgroundColor: 'white',
  },
  textStyle: {
    padding: 10,
  },
  patientTextStyle: {
    fontSize: 18,
  },
  emphasisTextStyle: {
    fontSize: 18,
    color: '#000',
    fontWeight: 'bold'
  },
  modalStyle: {
    backgroundColor: 'white',
    padding: 22,
    justifyContent: 'center',
    borderRadius: 4,
    borderColor: 'rgba(0, 0, 0, 0.1)',
  },
  titleStyle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#63C0B9'
  }
});

const mapStateToProps = ({ bill, query, printR }) => {
 const { print } = printR;
 const { loading, error, succesPay, ticketInfo } = bill;
 const { text, User, Ocupacion, Cuenta, Hospitalizacion, Cirugia } = query;
 return {
   text,
   User,
   Ocupacion,
   Cuenta,
   Hospitalizacion,
   Cirugia,
   print,
   loading,
   error,
   succesPay,
   ticketInfo
 };
};

export default connect(mapStateToProps,
  { queryFunc,
    queryPointer,
    queryAttach,
    cleanFunc,
    partialPayment,
    printHTMLReducer,
    printClean
  })(PatientBill);

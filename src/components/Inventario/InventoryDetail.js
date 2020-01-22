import React, { Component } from 'react';
import {
  Text,
  View,
  StyleSheet,
  FlatList,
  ActivityIndicator,
  TouchableWithoutFeedback,
  ScrollView,
  Dimensions,
  Alert
} from 'react-native';
import SwipeView from 'react-native-swipeview';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import Parse from 'parse/react-native';
import { SearchBar, Icon, CheckBox } from 'react-native-elements';
import Modal from 'react-native-modal';
import { NavigationActions } from 'react-navigation';
import { connect } from 'react-redux';
import { CardSection, Button, Input } from '../common';
import { queryFunc, cleanFunc, cleanBarCode } from '../../actions';
import update from 'react-addons-update';
import { Dropdown } from 'react-native-material-dropdown';

class InventoryDetail extends Component {

  static navigationOptions = {
    title: 'Actualizar producto',
  };

  constructor(props) {
    super(props);
    const producto = props.navigation.getParam('item');
    console.log('Producto', producto)
    this.state = { producto, Productos: producto.productos };
  }

    componentDidMount() {
      const {producto} = this.state;
    if (producto.tipo === 'paquete') {
    } else {
      this.actualizarCosto();
  }
    }

    renderFields() {
      const tiposUMC = [{
          value: 'CAJA',
        }, {
          value: 'PIEZA'
        }, {
          value: 'PAQUETE'
        }, {
          value: 'GALON'
        }, {
          value: 'LITRO'
        }, {
          value: 'FRASCO'
        }, {
          value: 'PAR'
        }, {
          value: 'DOCENA'
        }];

        const proveedores = [{
            value: 'Promédica García',
          }, {
            value: 'DIMEJA'
          }, {
            value: 'MARZAM'
          }, {
            value: 'Casa Saba'
          }, {
            value: 'Nadro'
          }];
      if (this.state.producto.tipo !== '') {
        if (this.state.producto.tipo === 'paquete') {
          return (
            <View style={{ flex: 1 }}>
            <CardSection>
            <Input
            selectTextOnFocus
              label="Nombre"
              placeholder="Paquete de cirugía mayor"
              onChangeText={(text) => this.setState({
                producto: update(this.state.producto, { nombre: { $set: text } })
              })}
              value={this.state.producto.nombre}
            />
            </CardSection>
            <CardSection>
            <Input
            selectTextOnFocus
              label="Código de barras"
              placeholder="0602760006362"
              onChangeText={(text) => this.setState({
                producto: update(this.state.producto, { codigo: { $set: text } })
              })}
              value={this.state.producto.codigo}
            />
            <Icon
              name='camera'
              type='material-community'
              onPress={this.navigateToScreen('BarCodeScanner', { updateCode: false })}
            />
            </CardSection>
            <KeyboardAwareScrollView style={{ flex: 1, padding: 15, paddingEnd: 60 }}>
          <CardSection>
          {this.listaPedido()}
          </CardSection>
          <CardSection>
          {this.buscarProducto()}
          </CardSection>
          </KeyboardAwareScrollView>
          </View>
        );
      } else {
      return (
        <View style={{ flex: 1 }}>
        <KeyboardAwareScrollView style={{ flex: 1, padding: 15, paddingEnd: 60 }}>
        {this.renderSpecificFields()}

        <CardSection>
        <Input
          editable={false}
          label="Tipo"
          value={this.state.producto.tipo}
        />

        <Input
          label="Stock"
          value={this.state.producto.stock.toString()}
        />
      </CardSection>

      <CardSection>
      <Input
      selectTextOnFocus
        label="Código de barras"
        placeholder="0602760006362"
        onChangeText={(text) => this.setState({
          producto: update(this.state.producto, { codigo: { $set: text } })
        })}
        value={this.state.producto.codigo}
      />
      <Icon
        name='camera'
        type='material-community'
        onPress={this.navigateToScreen('BarCodeScanner', { updateCode: false })}
      />
      </CardSection>

        <CardSection>
        <Dropdown
        label="Proveedor"
        containerStyle={{ flex: 1 }}
        data={proveedores}
        value={this.state.producto.proveedor}
        onChangeText={value => this.setState({
          producto: update(this.state.producto, { proveedor: { $set: value } })
        })}
        />

          <Input
          selectTextOnFocus
            label="Código con proveedor"
            placeholder="JY87303"
            onChangeText={(text) => this.setState({
              producto: update(this.state.producto, { codigoProveedor: { $set: text } })
            })}
            value={this.state.producto.codigoProveedor}
          />
        </CardSection>

        <CardSection>

          {this.costoAdquisicion()}

          <Input
          selectTextOnFocus
            label="Precio máximo"
            placeholder="$ 205.50"
            onChangeText={(text) => this.setState({
              producto: update(this.state.producto, { precioUMC: { $set: text } })
            })}
            value={this.state.producto.precioUMC}
            onEndEditing={() => this.actualizarCosto()}
          />

        </CardSection>

        <CardSection>
          <Dropdown
          label="Presentación de compra"
          containerStyle={{ flex: 1 }}
          data={tiposUMC}
          value={this.state.producto.umc}
          onChangeText={value => this.setState({
            producto: update(this.state.producto, { umc: { $set: value } })
          })}
          />

          <Input
          selectTextOnFocus
            keyboardType="numeric"
            label="Stock mínimo"
            placeholder="5"
            onChangeText={(text) => this.setState({
              producto: update(this.state.producto, { stockMinimo: { $set: text } })
            })}
            value={this.state.producto.stockMinimo.toString()}
          />
        </CardSection>

        <CardSection>
        <Dropdown
        label="Presentación de venta"
        containerStyle={{ flex: 1 }}
        data={tiposUMC}
        value={this.state.producto.umv}
        onChangeText={value => this.setState({
          producto: update(this.state.producto, { umv: { $set: value } })
        })}
        />

          <Input
          selectTextOnFocus
            keyboardType="numeric"
            label="Contenido por empaque"
            placeholder="12"
            onChangeText={(text) => this.setState({
              producto: update(this.state.producto, { cantidadUMV: { $set: text } })
            })}
            value={this.state.producto.cantidadUMV}
            onEndEditing={() => this.actualizarCosto()}
          />
        </CardSection>

        <CardSection>
          {this.costoUnitario()}

          {this.ganancia()}

            <Input
            selectTextOnFocus
              keyboardType="numeric"
              label="IVA"
              placeholder="10"
              onChangeText={(text) => this.setState({
                producto: update(this.state.producto, { iva: { $set: text } })
              })}
              value={this.state.producto.iva}
              onEndEditing={() => this.actualizarCosto()}
            />

        </CardSection>

        <CardSection>
        <Input
        selectTextOnFocus
          keyboardType="numeric"
          label="Precio público"
          placeholder="22.10"
          onChangeText={(text) => this.setState({
            producto: update(this.state.producto, { precioPublico: { $set: text } })
          })}
          value={this.state.producto.precioPublico}
          editable={this.state.admin}
        />



          <Input
          selectTextOnFocus
            keyboardType="numeric"
            label="Precio neto"
            placeholder="25.30"
            onChangeText={(text) => this.setState({
              producto: update(this.state.producto, { precioNeto: { $set: text } })
            })}
            value={this.state.producto.precioNeto}
            editable={this.state.admin}
          />

        </CardSection>

        </KeyboardAwareScrollView>

        <CardSection>
        {this.renderButton()}
        </CardSection>
        </View>
      );
    }
  }
  }

  costoAdquisicion(){
    return(
      <Input
    selectTextOnFocus
      keyboardType="numeric"
      label="Costo de adquisición"
      placeholder="200.20"
      onChangeText={(text) => this.setState({
        producto: update(this.state.producto, { costoUMC: { $set: text } })
      })}
      value={this.state.producto.costoUMC}
      onEndEditing={() => this.actualizarCosto()}
    />
  )
  }

  costoUnitario(){
    return(
      <Input
      selectTextOnFocus
        keyboardType="numeric"
        label="Costo unitario"
        placeholder="15.06"
        onChangeText={(text) => this.setState({
          producto: update(this.state.producto, { costoUMV: { $set: text } })
        })}
        value={this.state.producto.costoUMV}
        onEndEditing={() => this.actualizarCosto()}
      />
  )
  }

  ganancia(){
    return(
      <Input
      selectTextOnFocus
        keyboardType="numeric"
        label="Porcentaje de utilidad"
        placeholder="20"
        onChangeText={(text) => this.setState({
          producto: update(this.state.producto, { porcentajeUtilidad: { $set: text } })
        })}
        value={this.state.producto.porcentajeUtilidad}
        onEndEditing={() => this.actualizarCosto()}
      />
  )
  }

  listaPedido() {
    let dataList = null;

    if (Array.isArray(this.state.Productos)) {
      dataList = this.state.Productos;
    } else {
      dataList = [this.state.Productos];
    }
    console.log('DataList', dataList)

    if (this.state.Productos) {
    if (this.state.Productos.length > 0) {
    return (
      <View style={{ flex: 1, justifyContent: 'space-around' }}>
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
          </CardSection>
          <View style={{ flex: 1, padding: 15, paddingEnd: 90 }}>
      <FlatList
        data={dataList}
        ItemSeparatorComponent={this.ListViewItemSeparator}
        keyExtractor={item => item.objectId}
        renderItem={({ item, index }) => this.renderProductos(item, index)}
        style={{ marginTop: 10 }}
      />
      </View>
      </View>
    );
  }
  }
  }
  onSwipedLeft(index) {
      Alert.alert(
        '¿Desea eliminar este producto? ',
        '',
        [
          { text: 'Si', onPress: () => this.onAlertAccept(index) },
          { text: 'No', style: 'cancel' },
        ],
        { cancelable: false }
      );
    }

    onAlertAccept(index) {
      let array = [];

      if (Array.isArray(this.state.Productos)) {
        array = this.state.Productos;
      } else {
        array = [this.state.Productos];
      }
    array.splice(index);
    this.setState({ Productos: array });
}

buscarProducto() {
    return (
      <View style={{ flex: 1, padding: 15 }}>
      <Button onPress={() => this.setState({ buscarProducto: true })}>
      Añadir producto
      </Button>
      <Modal
      visible={this.state.buscarProducto}
      animationType='slide'
      transparent={false}
      >
      <View style={{ flex: 1 }}>
        <CardSection>
          <SearchBar
          autoCapitalize={'characters'}
            round
            lightTheme
            containerStyle={{ flex: 1, backgroundColor: 'white' }}
            searchIcon={
              <Icon
                name='camera'
                type='material-community'
                onPress={this.navigateToScreen('BarCodeScanner', { updateCode: false }, 'buscarProducto')}
              />}
            onChangeText={text => this.props.queryFunc({
              type: 'startsWith',
              object: 'Inventario',
              variable: 'nombre',
              text })}
            onClear={() => this.props.cleanFunc()}
            placeholder="Nombre"
            value={this.props.text}
          />
          </CardSection>
          <ScrollView>
        <CardSection>
          {this.listaProducto()}
        </CardSection>
                </ScrollView>
      </View>
      <CardSection>
      <Button
      onPress={() => {
      this.props.cleanFunc(); this.props.navigation.navigate('AgregarProducto'); this.setState({ buscarProducto: false }) }}
      >
      Agregar producto
      </Button>
      <Button
      onPress={() => {
      this.props.cleanFunc(); this.setState({ buscarProducto: false });
}}
      >
      Cancelar
      </Button>
      </CardSection>
      </Modal>
      {this.renderButton()}
      </View>
    );
}

listaProducto() {
  let dataList = null;

  if (Array.isArray(this.props.Inventario)) {
    dataList = this.props.Inventario;
  } else {
    dataList = [this.props.Inventario];
  }

  if (this.props.loading) {
    return (
      <View style={{ flex: 1, paddingTop: 20 }}>
        <ActivityIndicator />
      </View>
      );
    } else if (this.props.Inventario === 'Failed') {
    return (
      <Text>
      Sin resultados
      </Text>
    );
  } else if (this.props.Inventario !== '') {
  return (
    <FlatList
      data={dataList}
      ItemSeparatorComponent={this.ListViewItemSeparator}
      keyExtractor={item => item.objectId}
      renderItem={({ item, index }) => (
        this.renderIt(item, index, 'Productos', 'Lista', 'buscarProducto')
      )}
      style={{ marginTop: 10 }}
    />
  );
}
}

listaPedido() {
  let dataList = null;

  if (Array.isArray(this.state.Productos)) {
    dataList = this.state.Productos;
  } else {
    dataList = [this.state.Productos];
  }
  console.log('DataList', dataList)

  if (this.state.Productos) {
  if (this.state.Productos.length > 0) {
  return (
    <View style={{ flex: 1, justifyContent: 'space-around' }}>
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
        </CardSection>
        <View style={{ flex: 1, padding: 15, paddingEnd: 90 }}>
    <FlatList
      data={dataList}
      ItemSeparatorComponent={this.ListViewItemSeparator}
      keyExtractor={item => item.objectId}
      renderItem={({ item, index }) => this.renderProductos(item, index)}
      style={{ marginTop: 10 }}
    />
    </View>
    </View>
  );
}
}
}

renderIt(item, index, objeto, tipo, modal) {
    return (
    <TouchableWithoutFeedback
    onPress={() => { this.props.cleanFunc(); this.addElement(item, modal); }}
    >
      <View>
      <CardSection>
        <Text> {item.nombre} </Text>
        </CardSection>
      </View>
    </TouchableWithoutFeedback>
  );
}

addElement(item, modal) {


  let dataList = null;

  if (Array.isArray(this.state.Productos)) {
    dataList = this.state.Productos;
    item.agregado = false;
    dataList.push(item);
  } else {
    dataList = [item];
  }
    this.setState({ Productos: dataList })
}

  renderButton() {
    if (this.state.loading) {
      return (
        <View style={{ flex: 1, paddingTop: 20 }}>
          <ActivityIndicator />
        </View>
      );
    } else {
      return (
    <Button onPress={() => this.actualizarProducto()}>
    Actualizar producto
    </Button>
  );
  }
  }

    renderSpecificFields() {
  		if (this.state.producto.tipo === 'medicamento') {
  			return (
  				<View>
  					<CardSection>
  						<Input
              selectTextOnFocus
  							label="Nombre Comercial"
  							placeholder="Advil"
  							onChangeText={(text) => this.setState({
                  producto: update(this.state.producto, { nombre: { $set: text } })
                })}
  							value={this.state.producto.nombre}
  						/>

  						<Input
              selectTextOnFocus
  							label="Fórmula"
  							placeholder="Ibuprofeno"
  							onChangeText={(text) => this.setState({
                  producto: update(this.state.producto, { formula: { $set: text } })
                })}
  							value={this.state.producto.formula}
  						/>

  						<Input
              selectTextOnFocus
  							label="Laboratorio"
  							placeholder="Wyeth"
  							onChangeText={(text) => this.setState({
                  producto: update(this.state.producto, { laboratorio: { $set: text } })
                })}
  							value={this.state.producto.laboratorio}
  						/>
  					</CardSection>

  					<CardSection>
  						<Input
              selectTextOnFocus
  							label="Presentación"
  							placeholder="Jarabe"
  							onChangeText={(text) => this.setState({
                  producto: update(this.state.producto, { presentacion: { $set: text } })
                })}
  							value={this.state.producto.presentacion}
  						/>

  						<Input
              selectTextOnFocus
  							label="Contenido"
  							placeholder="200 ml"
  							onChangeText={(text) => this.setState({
                  producto: update(this.state.producto, { contenido: { $set: text } })
                })}
  							value={this.state.producto.contenido}
  						/>

              <Input
              selectTextOnFocus
                label="Vía de administración"
                placeholder="Oral"
                onChangeText={(text) => this.setState({
                  producto: update(this.state.producto, { viaAdministracion: { $set: text } })
                })}
                value={this.state.producto.viaAdministracion}
              />
            </CardSection>
  				</View>
  			);
  		} else if (this.state.producto.tipo === 'insumo') {
  			return (
  				<View>
  					<CardSection>
  						<Input
              selectTextOnFocus
  							label="Descripción"
  							placeholder="Venda elástica 10x5mm"
  							onChangeText={(text) => this.setState({
                  producto: update(this.state.producto, { nombre: { $set: text } })
                })}
  							value={this.state.producto.nombre}
  						/>

  						<Input
              selectTextOnFocus
  							label="Marca"
  							placeholder="Le Roy"
  							onChangeText={(text) => this.setState({
                  producto: update(this.state.producto, { laboratorio: { $set: text } })
                })}
  							value={this.state.producto.laboratorio}
  						/>
  					</CardSection>
  				</View>
  			);
  		}
  	}


    actualizarCosto() {
      const { producto } = this.state;
      producto.codigoProveedor = producto.codigoProveedor;
      producto.codigo = producto.codigo;
      producto.stockMinimo = parseInt(producto.stockMinimo, 10);
      producto.nombre = producto.nombre;
      producto.laboratorio = producto.laboratorio;
      if (producto.tipo === 'insumo') producto.iva = 16
      if (producto.tipo === 'medicamento') producto.iva = 0
      producto.costoUMC = parseFloat(producto.costoUMC);
      producto.cantidadUMV = parseInt(producto.cantidadUMV, 10);
      producto.costoUMV = producto.costoUMC / producto.cantidadUMV;

      if(producto.precioUMC > 0) {
        producto.porcentajeUtilidad = (producto.precioUMC/producto.costoUMC - 1) * 100;
        producto.precioPublico = producto.precioUMC / producto.cantidadUMV;
        producto.precioNeto = producto.precioPublico + (producto.precioPublico * (producto.iva / 100));
        producto.precioSeguro = producto.precioPublico * 1.35;

    } else {

      if (producto.costoUMV < 51) this.state.producto.porcentajeUtilidad = 200;
      else if (producto.costoUMV < 101) this.state.producto.porcentajeUtilidad = 100;
      else if(producto.costoUMV < 201) this.state.producto.porcentajeUtilidad = 80;
      else if (producto.costoUMV < 301) this.state.producto.porcentajeUtilidad = 60;
      else if (producto.costoUMV < 501) this.state.producto.porcentajeUtilidad = 50;
      else if (producto.costoUMV < 1001) this.state.producto.porcentajeUtilidad = 35;
      else if (producto.costoUMV < 2501) this.state.producto.porcentajeUtilidad = 25;
      else if (producto.costoUMV < 5001) this.state.producto.porcentajeUtilidad = 20;
      else if (producto.costoUMV < 10001) this.state.producto.porcentajeUtilidad = 15;
      else if (producto.costoUMV < 25001) this.state.producto.porcentajeUtilidad = 10;
      else if (producto.costoUMV < 50001) this.state. producto.porcentajeUtilidad = 5;

      producto.porcentajeUtilidad = producto.porcentajeUtilidad;
      producto.precioPublico = producto.costoUMV + (producto.costoUMV * (producto.porcentajeUtilidad / 100));
      producto.precioNeto = producto.precioPublico + (producto.precioPublico * (producto.iva / 100));
      producto.precioSeguro = producto.precioPublico * 1.35;
    }

      producto.costoUMC = producto.costoUMC.toFixed(2);
      producto.costoUMV = producto.costoUMV.toFixed(2);
      producto.cantidadUMV = producto.cantidadUMV.toString();
      producto.iva = producto.iva.toString();
      producto.porcentajeUtilidad = producto.porcentajeUtilidad.toFixed(2);
      producto.cantidadUMV = producto.cantidadUMV.toString();
      producto.precioPublico = producto.precioPublico.toFixed(2);
      producto.precioNeto = producto.precioNeto.toFixed(2);
      producto.precioSeguro = producto.precioSeguro.toFixed(2);

      producto.costoUMV = producto.costoUMV;

      this.setState({ producto });
    }

    renderProductos(item, index) {
        const leftOpenValue = Dimensions.get('window').width;
        return (
        <SwipeView
          leftOpenValue={leftOpenValue}
          onSwipedLeft={() => this.onSwipedLeft(index)}
          swipeDuration={400}
          renderVisibleContent={() =>
            <View style={{ flex: 1 }}>
            <TouchableWithoutFeedback>
            <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-around', alignItems: 'baseline' }}>
            <Text
            style={{ flex: 1 }}>
            { item.nombre}
            </Text>
            <Input
            style={{ flex: 1, textAlign: 'center', textAlignVertical: 'center' }}
            keyboardType="numeric"
            placeholder="10"
            selectTextOnFocus
            value={this.state.Productos[index].cantidad}
            onChangeText={value =>
              this.setState({
                Productos: update(this.state.Productos, { [index]: { cantidad: { $set: value } } })
              })}
            />
            <Text>
             {this.state.Productos[index].umv}
            </Text>
                </View>
                </TouchableWithoutFeedback>
                </View>
            }
        />
      );
    }

    actualizarProducto() {
      this.setState({ loading: true });
      console.log('Ingresando')
      const { producto } = this.state;
      producto.iva = parseInt(producto.iva, 10)
      producto.porcentajeUtilidad = parseInt(producto.porcentajeUtilidad, 10);
      producto.costoUMC = parseFloat(producto.costoUMC)
      producto.cantidadUMV = parseInt(producto.cantidadUMV, 10);
      producto.costoUMV = parseFloat(producto.costoUMV)
      producto.precioPublico = parseFloat(producto.precioPublico)
      producto.precioNeto = parseFloat(producto.precioNeto)
      producto.precioSeguro = parseFloat(producto.precioSeguro)
      producto.stockMinimo = parseInt(producto.stockMinimo, 10);

      const Inventario = Parse.Object.extend('Inventario');
      const parseObject = new Inventario();
      if (producto.tipo === 'medicamento') {
        parseObject.set('formula', producto.formula);
        parseObject.set('presentacion', producto.presentacion);
        parseObject.set('contenido', producto.contenido);
        parseObject.set('viaAdministracion', producto.viaAdministracion);
      }
      parseObject.set('objectId', producto.objectId)
      parseObject.set('precioPublico', producto.precioPublico);
      parseObject.set('precioSeguro', producto.precioSeguro);
      parseObject.set('nombre', producto.nombre);
      parseObject.set('umc', producto.umc);
      parseObject.set('umv', producto.umv);
      parseObject.set('laboratorio', producto.laboratorio);
      parseObject.set('iva', producto.iva);
      parseObject.set('tipo', producto.tipo);
      parseObject.set('porcentajeUtilidad', producto.porcentajeUtilidad);
      parseObject.set('stockMinimo', producto.stockMinimo);
      parseObject.set('precioNeto', producto.precioNeto);
      parseObject.set('codigo', producto.codigo);
      parseObject.set('proveedor', producto.proveedor);
      parseObject.set('codigoProveedor', producto.codigoProveedor);
      parseObject.set('costoUMC', producto.costoUMC);
      parseObject.set('costoUMV', producto.costoUMV);
      parseObject.set('cantidadUMV', producto.cantidadUMV);
      parseObject.set('precioUMC', producto.precioUMC);

      parseObject.save().then(() => {
        Alert.alert(
          'Listo',
          'Producto actualizado correctamente',
          [{ text: 'Ok', style: 'cancel' }]
        );
        this.setState({ loading: false });
      }).catch((error) => {
        Alert.alert(
        'Error',
        'Error al actualizar el producto, ' + error.message,
        [{ text: 'Ok', style: 'cancel' }]
      )
        this.setState({ loading: false });
    });
  }

    navigateToScreen = (route, item, modal) => () => {
      const navigateAction = NavigationActions.navigate({
        routeName: route,
        item
      });
      this.props.navigation.navigate(route, { item });
      this.setState({ [modal]: false })
    }

    render() {
      console.log('Codigo', this.props.barCode)
      if (this.props.barCode !== '') {
        this.setState({
          producto: update(this.state.producto, { codigo: { $set: this.props.barCode } })
        })
      }
      const tiposProducto = [{
          value: 'insumo',
        }, {
          value: 'medicamento'
        }, {
          value: 'paquete quirurgico'
        }];
      return (
        <View style={{ flex: 1 }}>
          {this.renderFields()}
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
    }
  });

  const mapStateToProps = ({ query, barCodeReader, auth }) => {
    const { user } = auth;
    const userType = user.attributes.userType;
    console.log('UserType', userType)
  const { barCode, barType } = barCodeReader;
  const { text, Proveedor, Inventario } = query;
  return { text, Proveedor, Inventario, barCode, barType, user, userType };
  };

  export default connect(mapStateToProps, { queryFunc, cleanFunc, cleanBarCode })(InventoryDetail);

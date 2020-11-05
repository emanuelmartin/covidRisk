import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
	View,
	Text,
	Alert,
	FlatList,
	TextInput,
	Dimensions,
  TouchableWithoutFeedback
} from 'react-native';
import SwipeView from 'react-native-swipeview';
import { NavigationActions } from 'react-navigation';
import { SearchBar, Icon } from 'react-native-elements';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Dropdown } from 'react-native-material-dropdown';
import { CardSection, Input, Spinner, Button } from '../common';
import {
	itemChanged,
	addItem,
	cleanBarCode,
	acceptItemAded,
	queryFunc,
	queryAttach,
	cleanFunc
} from '../../actions';

class AddItemScreen2 extends Component {
	static navigationOptions = {
    title: 'Nuevo Producto',
  };

	constructor(props) {
    super(props);
    //setting default state
		this.state = {
			codigo: '',
			umc: '',
			umv: '',
			cantidadUMC: '',
			codigoProveedor: '',
			tipoCodigo: '',
			nombre: '',
			formula: '',
			laboratorio: '',
			presentacion: '',
			contenido: '',
			stock: '',
			precioPublico: '',
			precioPaciente: '',
			precioSeguro: '',
			iva: '',
			proveedor: '',
			costo: '',
			clave_SAT: '',
			cantidadUMV: '',
			descuentoProveedor: '',
			nuevoStock: '',
			stockMinimo: '',
			precioLista: '',
			costoUMC: '',
			costoUMV: '',
			porcentajeUtilidad: '',
			precioNeto: ''
		};
  }


	onButtonPress() {
    const {
			codigo,
			umc,
			umv,
			cantidadUMC,
			codigoProveedor,
			tipoCodigo,
			nombre,
			formula,
			laboratorio,
			presentacion,
			contenido,
			stock,
			precioPublico,
			precioPaciente,
			precioSeguro,
			iva,
			proveedor,
			costo,
			clave_SAT,
			cantidadUMV,
			descuentoProveedor,
			nuevoStock,
			stockMinimo,
			precioLista,
			costoUMC,
			costoUMV,
			porcentajeUtilidad,
			precioNeto,
			descuentoPublico,
			descuentoAseguradora
		} = this.state;

		const parseObject = new Inventario();
		parseObject.set('nombre', nombre);
		parseObject.set('cantidadUMV', parseInt(cantidadUMV, 10));
		parseObject.set('codigo', codigo);
		parseObject.set('umc', umc);
		parseObject.set('umv', umv);
		parseObject.set('iva', parseInt(iva, 10));
		parseObject.set('descuentoProveedor', parseInt(descuentoProveedor, 10));
		parseObject.set('laboratorio', laboratorio);
		parseObject.set('tipo', tipo);
		parseObject.set('proveedor', proveedor);
		parseObject.set('stockMinimo', parseInt(stockMinimo, 10));
		parseObject.set('precioLista', parseFloat(precioLista));
		parseObject.set('costoUMC', parseFloat(costoUMC));
		parseObject.set('costoUMV', parseFloat(costoUMV));
		parseObject.set('precioSeguro', parseFloat(precioSeguro));
		parseObject.set('porcentajeUtilidad', parseInt((porcentajeUtilidad), 10));
		parseObject.set('precioNeto', parseFloat(precioNeto));
		parseObject.set('precioPublico', parseFloat(precioPublico));
		parseObject.set('codigoProveedor', codigoProveedor);
		parseObject.set('descuentoPublico', descuentoPublico);
		parseObject.set('descuentoAseguradora', descuentoAseguradora);

		parseObject.save();
  }

	onCameraPress() {
		this.state.navigation.navigate('BarCodeScanner', { updateCode: true });
	}


	navigateToScreen = (route) => () => {
    const navigateAction = NavigationActions.navigate({
      routeName: route
    });
    this.state.navigation.dispatch(navigateAction);
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

	renderError() {
    if (this.state.error) {
      return (
        <View style={{ backgroundColor: 'white' }}>
          <Text style={styles.errorTextStyle}>
            {this.state.error}
          </Text>
        </View>
      );
    }
  }

	renderButton() {
    if (this.state.loading) {
      return <Spinner size="large" />;
    }

    return (
      <Button onPress={this.onButtonPress.bind(this)}>
        Agregar
      </Button>
    );
  }

	renderSpecificFields() {
		if (this.state.type === 'medicamento') {
			return (
				<View>
					<CardSection>
						<Input
							label="Nombre Comercial"
							placeholder="Advil"
							onChangeText={(text) => this.onItemChange('nombre', text)}
							value={this.state.nombre}
						/>
					</CardSection>

					<CardSection>
						<Input
							label="Fórmula"
							placeholder="Ibuprofeno"
							onChangeText={(text) => this.onItemChange('formula', text)}
							value={this.state.formula}
						/>
					</CardSection>

					<CardSection>
						<Input
							label="Laboratorio"
							placeholder="Wyeth"
							onChangeText={(text) => this.onItemChange('laboratorio', text)}
							value={this.state.laboratorio}
						/>
					</CardSection>

					<CardSection>
						<Input
							label="Presentación"
							placeholder="Jarabe"
							onChangeText={(text) => this.onItemChange('presentacion', text)}
							value={this.state.presentacion}
						/>
					</CardSection>

					<CardSection>
						<Input
							label="Contenido"
							placeholder="200 ml"
							onChangeText={(text) => this.onItemChange('contenido', text)}
							value={this.state.contenido}
						/>
					</CardSection>

					<CardSection>
						<Input
							label="Costo"
							placeholder="$ 320.20"
							onChangeText={(text) => this.onItemChange('costo', text)}
							value={this.state.costo}
						/>
					</CardSection>

					<CardSection>
						<Input
							label="Precio de lista"
							placeholder="$ 320.20"
							onChangeText={(text) => this.onItemChange('precioLista', text)}
							value={this.state.precioLista}
						/>
					</CardSection>

					<CardSection>
						<Input
							label="Descuento al pùblico"
							placeholder="30"
							onChangeText={(text) => this.onItemChange('descuentoPublico', text)}
							value={this.state.descuentoPublico}
						/>
				</CardSection>

				<CardSection>
					<Input
						label="Descuento aseguradora"
						placeholder="10"
						onChangeText={(text) => this.onItemChange('descuentoAseguradora', text)}
						value={this.state.descuentoAseguradora}
					/>
			</CardSection>
				</View>
			);
		} else if (this.state.type === 'insumo') {
			return (
				<View>
					<CardSection>
						<Input
							label="Descripción"
							placeholder="Venda elástica 10x5mm"
							onChangeText={(text) => this.onItemChange('nombre', text)}
							value={this.state.nombre}
						/>
					</CardSection>

					<CardSection>
						<Input
							label="Marca"
							placeholder="Le Roy"
							onChangeText={(text) => this.onItemChange('laboratorio', text)}
							value={this.state.laboratorio}
						/>
					</CardSection>

					<CardSection>
						<Input
							label="Precio de lista"
							placeholder="$ 320.20"
							onChangeText={(text) => this.onItemChange('precioLista', text)}
							value={this.state.precioLista}
							onEndEditing={() => this.actualizarCosto()}
						/>
					</CardSection>
					<CardSection>
						<Input
							label="Descuento"
							placeholder="23"
							onChangeText={(text) => this.onItemChange('descuento', text)}
							value={this.state.descuento}
							onEndEditing={() => this.actualizarCosto()}
						/>
					</CardSection>
					<CardSection>
						<Input
							label="Costo de Adquisición"
							placeholder="0"
							onChangeText={(text) => this.onItemChange('costo', text)}
							value={this.state.costoUMV}
							keyboardType="numeric"
						/>
					</CardSection>

					<CardSection>
						<Input
							label="Utilidad"
							placeholder="40"
							onChangeText={(text) => this.onItemChange('utilidad', text)}
							value={this.state.precioPublico}
							onEndEditing={() => this.actualizarCosto()}
						/>
					</CardSection>

					<CardSection>
						<Input
							label="Precio Venta Público"
							placeholder="$ 350.00"
							onChangeText={(text) => this.onItemChange('precioPublico', text)}
							keyboardType="numeric"
							value={this.state.precioPublico}
						/>
					</CardSection>

					<CardSection>
						<Input
							label="Precio Neto"
							placeholder="$ 500.00"
							onChangeText={(text) => this.onItemChange('precioNeto', text)}
							keyboardType="numeric"
							value={this.state.precioNeto}
						/>
					</CardSection>

					<CardSection>
						<Input
							label="Precio Venta Aseguradoras"
							placeholder="$ 500.00"
							onChangeText={(text) => this.onItemChange('precioSeguro', text)}
							keyboardType="numeric"
							value={this.state.precioSeguro}
						/>
						</CardSection>
				</View>
			);
		}
	}

	renderFields() {
		if (this.state.type === 'medicamento' || this.state.type === 'insumo') {
			return (
				<View>
					<CardSection>
						<View
							style={{
								flex: 1,
								flexDirection: 'row',
								justifyContent: 'center',
								alignItems: 'center',
							}}
						>
							<Input
								label="Código de barras"
								placeholder="0602760006362"
								onChangeText={(text) => this.onItemChange('codigo', text)}
								value={this.state.codigo}
							/>
							<Icon
								name='camera'
								type='material-community'
								onPress={this.onCameraPress.bind(this)}
							/>
						</View>

					</CardSection>

					{this.renderSpecificFields()}

					<CardSection>
						<Input
							label="Unidad de medida compra"
							placeholder="CAJA"
							onChangeText={(text) => this.onItemChange('umc', text)}
							value={this.state.umc}
						/>
				</CardSection>

				<CardSection>
					<Input
						label="Cantidad por empaque"
						placeholder="100"
						onChangeText={(text) => this.onItemChange('cantidadUMC', text)}
						value={this.state.cantidadUMV}
						onEndEditing={() => this.actualizarCosto()}
					/>
			</CardSection>

			<CardSection>
				<Input
					label="Unidad de medida venta"
					placeholder="PIEZA"
					onChangeText={(text) => this.onItemChange('umv', text)}
					value={this.state.umv}
				/>
		</CardSection>


					<CardSection>
						<Input
							label="Código de proveedor"
							placeholder="0602760006362"
							onChangeText={(text) => this.onItemChange('codigoProveedor', text)}
							value={this.state.codigoProveedor}
						/>
				</CardSection>

					<CardSection>
						<Input
							label="Proveedor"
							placeholder="PiSA"
							onChangeText={(text) => this.onItemChange('proveedor', text)}
							value={this.state.proveedor}
						/>
					</CardSection>


					<CardSection>
						<Input
							label="Clave SAT"
							placeholder="01010101"
							onChangeText={(text) => this.onItemChange('clave_SAT', text)}
							value={this.state.clave_SAT}
						/>
					</CardSection>

					<CardSection>
						<Text>IVA: </Text>
						<Dropdown
							containerStyle={{ flex: 1 }}
							data={[{ value: 'nulo' },
										{ value: '0' },
										{ value: '10' },
										{ value: '16' }
										]}
							value={this.state.iva}
							onChangeText={(text) => this.onItemChange('iva', text)}
							placeholder={'Selecciona la tasa correspondiente'}
						/>
					</CardSection>

					<CardSection>
						<Input
							label="Stock mínimo"
							placeholder="0"
							onChangeText={(text) => this.onItemChange('stockMinimo', text)}
							value={this.state.stockMinimo}
							keyboardType="numeric"
						/>
					</CardSection>
						{this.renderError()}
					<CardSection>
						{this.renderButton()}
					</CardSection>
				</View>
			);
		} else if (this.state.type === 'cafeteria') {
			return (
				<View>
					<CardSection>
						<View
							style={{
								flex: 1,
								flexDirection: 'row',
								justifyContent: 'center',
								alignItems: 'center',
							}}
						>
							<Input
								label="Código de barras"
								placeholder="0602760006362"
								onChangeText={(text) => this.onItemChange('codigo', text)}
								value={this.state.codigo}
							/>
							<Icon
								name='camera'
								type='material-community'
								onPress={this.onCameraPress.bind(this)}
							/>
						</View>

					</CardSection>

					<CardSection>
						<Input
							label="Nombre del producto"
							placeholder="Yogurt Activia (Fresa)"
							onChangeText={(text) => this.onItemChange('nombre', text)}
							value={this.state.nombre}
						/>
					</CardSection>

					<CardSection>
						<Input
							label="Proveedor"
							placeholder="Activia"
							onChangeText={(text) => this.onItemChange('proveedor', text)}
							value={this.state.proveedor}
						/>
					</CardSection>

					<CardSection>
						<Input
							label="Costo de Adquisición"
							placeholder="0"
							onChangeText={(text) => this.onItemChange('costoUVM', text)}
							value={this.state.costoUVM}
							keyboardType="numeric"
						/>
					</CardSection>

					<CardSection>
						<Input
							label="Costo por pieza"
							placeholder="0"
							onChangeText={(text) => this.onItemChange('costoUMV', text)}
							value={this.state.costoUMV}
							keyboardType="numeric"
						/>
					</CardSection>

					<CardSection>
						<Input
							label="Clave SAT"
							placeholder="01010101"
							onChangeText={(text) => this.onItemChange('clave_SAT', text)}
							value={this.state.clave_SAT}
						/>
					</CardSection>

					<CardSection>
						<Text>IVA: </Text>
						<Dropdown
							containerStyle={{ flex: 1 }}
							data={[{ value: 'nulo' },
										{ value: '0' },
										{ value: '11' },
										{ value: '16' }
										]}
							value={this.state.iva}
							onChangeText={(text) => this.onItemChange('iva', text)}
							placeholder={'Seleccione la tasa correspondiente'}
						/>
					</CardSection>

					<CardSection>
						<Input
							label="Precio de Venta"
							placeholder="$ 350.00"
							onChangeText={(text) => this.onItemChange('precioPublico', text)}
							keyboardType="numeric"
							value={this.state.precioPublico}
						/>
					</CardSection>
					<CardSection>
						<Input
							label="Stock"
							placeholder="0"
							onChangeText={(text) => this.onItemChange('stock', text)}
							value={this.state.stock}
							keyboardType="numeric"
						/>
					</CardSection>
						{this.renderError()}
					<CardSection>
						{this.renderButton()}
					</CardSection>
				</View>
			);
		} else if (this.state.type === 'paquete quirúrgico') {
			let dataList = null;
			let flat = null;
			if (this.state.productoSelect) {
				if (Array.isArray(this.state.Inventario)) {
					dataList = this.state.Inventario;
				} else {
					dataList = [this.state.Inventario];
				}
				flat =
				(<FlatList
					data={dataList}
					ItemSeparatorComponent={this.ListViewItemSeparator}
					//Item Separator View
					renderItem={({ item }) => (
						this.renderProducto(item)
					)}
					enableEmptySections
					style={{ marginTop: 10 }}
					keyExtractor={(item, index) => index.toString()}
				/>);
		} else {
			flat =
			(<View style={{ flex: 1 }}>
        <CardSection>
            <Text style={styles.emphasisTextStyle}>Descripción:</Text>
          <View style={{ flex: 1 }}>
            <Text
              style={[styles.emphasisTextStyle, { textAlign: 'right' }]}
            >
              Cantidad:
            </Text>
          </View>
        </CardSection>
        <CardSection>
					<FlatList
						data={this.state.Productos}
						ItemSeparatorComponent={this.ListViewItemSeparator}
						//Item Separator View
						renderItem={({ item, index }) => (
							this.renderProductos(item, index)
						)}
						enableEmptySections
						style={{ marginTop: 10 }}
						keyExtractor={(item) => item.code}
					/>
        </CardSection>
      </View>);
		}


			if (this.state.barCode !== '') {
				this.state.queryFunc({
					type: 'equalTo',
					object: 'Inventario',
					variable: 'codigo',
					text: this.state.barCode });
					this.setState({
						barCodeCharged: true,
						barCode: this.state.barCode,
						barType: this.state.barType
					});
					this.state.cleanBarCode();
				}
				if (this.state.barCodeCharged && this.state.Inventario === 'Failed' && this.state.pageRequest === 'AddItemScreen') {
					Alert.alert(
						'Error: Producto no encontrado',
						'Por favor, añadalo primero',
						[
							{ text: 'Si', onPress: () => this.onAcceptPress() },
							{ text: 'No', onPress: () => this.onCancelPress(), style: 'cancel' },
						],
						{ cancelable: false }
					);
					return (
						<View />
					);
				}
			return (
				<View>
					<CardSection>
						<Input
							label="Nombre del paquete"
							placeholder="Cirugía menor"
							onChangeText={(text) => this.onItemChange('nombre', text)}
							value={this.state.nombre}
						/>
					</CardSection>
					<SearchBar
						round
						lightTheme
						onChangeText={text => {
							this.state.queryAttach({
								object: 'Inventario',
								text,
								constrain:
								[{ type: 'containedIn', variable: 'tipo', text: ['medicamento', 'insumo'] },
									{ type: 'startsWith', variable: 'nombre', text, bool: 'and' }]
							});
							if (text !== '') { this.setState({ productoSelect: true }); }
						}}
						onClear={() => this.state.queryFunc({ text: '' })}
						placeholder="Ingresa el nombre del producto"
						value={this.state.text}
					/>
				{flat}
				<CardSection>
					{this.renderButton()}
				</CardSection>
				</View>
			);
		}
	}

	renderProductos(item, index) {
		const leftOpenValue = Dimensions.get('window').width;
			return (
					<SwipeView
						disableSwipeToRight
						leftOpenValue={leftOpenValue}
						onSwipedLeft={() => this.onSwipedLeft(index)}
						swipeDuration={400}
						renderVisibleContent={() =>
							<CardSection>
								<Text style={styles.patientTextStyle}>
									{item.nombre}
								</Text>
								<TextInput
									placeholder="1"
									value={item.cantidad}
									keyboardType="numeric"
									autoCorrect={false}
									style={styles.inputStyle}
									onChangeText={cantidad => this.updateQuantity(index, cantidad)}
								/>
						</CardSection>
					}
					/>

		);
	}

	renderProducto(item) {
      return (
      <TouchableWithoutFeedback
      onPress={() => this.addProducto(item)}
      >
        <View>
          <Text style={styles.textStyle} >
            {item.nombre}
          </Text>
        </View>
      </TouchableWithoutFeedback>
    );
  }

	addProducto(item) {
    this.updateProducto(item);
    this.setState(state => ({
    Productos: [...state.Productos, state.Producto],
		productoSelect: false
    }));
  }

	updateProducto(item) {
    item.cantidad = '1';
    this.setState({ Producto: item });
    this.state.queryFunc({ text: '' });
  }

	updateQuantity(index, cantidad) {
    const newMeds = this.state.Productos;
    newMeds[index].cantidad = cantidad;
    this.setState({ Productos: newMeds });
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
    const array = [...this.state.Productos];
    array.splice(index, 1);
    if (this.state.Productos.length === 1) {
      this.setState({ searchItem: true, Productos: array });
      this.state.cleanFunc();
    } else {
      this.setState({ Productos: array });
    }
  }

	renderDropDown(data) {
		if (data !== null) {
			return (
				<CardSection>
          <Dropdown
          containerStyle={{ flex: 1 }}
          data={data}
          value={this.state.type}
          onChangeText={value => this.setState({ type: value })}
          placeholder={'Selecciona el tipo de producto'}
          />
        </CardSection>
			);
		}
	}



	actualizarCosto() {

		let {
			codigo,
			umc,
			umv,
			cantidadUMC,
			codigoProveedor,
			tipoCodigo,
			nombre,
			formula,
			laboratorio,
			presentacion,
			contenido,
			stock,
			precioPublico,
			precioPaciente,
			precioSeguro,
			iva,
			proveedor,
			costo,
			clave_SAT,
			cantidadUMV,
			descuentoProveedor,
			nuevoStock,
			stockMinimo,
			precioLista,
			costoUMC,
			costoUMV,
			porcentajeUtilidad,
			precioNeto,
			descuento,
			ingresoUMC
		} = this.state;

		precioLista = parseFloat(precioLista);
		iva = 16;
		descuento = parseInt(descuentoProveedor, 10);
		porcentajeUtilidad = parseInt(porcentajeUtilidad, 10);
		costoUMC = precioLista - (precioLista * (descuento / 100));
		cantidadUMV = parseInt(cantidadUMV, 10);
		costoUMV = costoUMC / cantidadUMV;
		precioPublico = costoUMV + (costoUMV * (porcentajeUtilidad / 100));
		precioNeto = precioPublico + (precioPublico * (iva / 100));
		precioSeguro = precioPublico + (precioPublico * (30 / 100));
		stockMinimo = parseInt(stockMinimo, 10);
		ingresoUMC = parseInt(ingresoUMC, 10);

		precioLista = precioLista.toFixed(2);
		costoUMC = costoUMC.toFixed(2);
		costoUMV = costoUMV.toFixed(2);
		precioPublico = precioPublico.toFixed(2);
		precioNeto = precioNeto.toFixed(2);
		precioSeguro = precioSeguro.toFixed(2);

		costoUMV = costoUMV;
		costo = costoUMC;


		this.setState({ 		codigo,
				umc,
				umv,
				cantidadUMC,
				codigoProveedor,
				tipoCodigo,
				nombre,
				formula,
				laboratorio,
				presentacion,
				contenido,
				stock,
				precioPublico,
				precioPaciente,
				precioSeguro,
				iva,
				proveedor,
				costo,
				clave_SAT,
				cantidadUMV,
				descuentoProveedor,
				nuevoStock,
				stockMinimo,
				precioLista,
				costoUMC,
				costoUMV,
				porcentajeUtilidad,
				precioNeto })
	}

  render() {
		console.log(this.state);
		let data = null;
		if (this.state.userType === 'admin' ||
	this.state.userType === 'dev') {
			data = [{ value: 'medicamento' },
							{ value: 'insumo' },
							{ value: 'cafeteria' },
							{ value: 'paquete quirúrgico' }];
		} else if (this.state.userType === 'enfermeria' ||
		this.state.userType === 'farmacia') {
			data = [{ value: 'medicamento' },
							{ value: 'insumo' },
							{ value: 'paquete quirúrgico' }];
		}
		if (this.state.success) {
			Alert.alert(
        'Producto Agregado con éxito',
        '',
				[{ text: 'Ok', onPress: () => this.onOkPress() }],
        { cancelable: false }
      );
      return (
        <View />
      );
		}

    return (
			<KeyboardAwareScrollView>
				{this.renderDropDown(data)}
				{this.renderFields()}
			</KeyboardAwareScrollView>
    );
  }
}

const mapStateToProps = state => {
  return {
    codigo: state.item.codigo,
		umc: state.item.umc,
		umv: state.item.uvm,
		cantidadUMC: state.item.cantidadUMC,
		codigoProveedor: state.item.codigoProveedor,
		tipoCodigo: state.item.tipoCodigo,
    nombre: state.item.nombre,
		formula: state.item.formula,
		laboratorio: state.item.laboratorio,
    presentacion: state.item.presentacion,
		contenido: state.item.contenido,
		stock: state.item.stock || 0,
    precioPublico: state.item.precioPublico || 0,
		precioPaciente: state.item.precioPaciente || 0,
		precioSeguro: state.item.precioSeguro || 0,
		error: state.item.error,
		success: state.item.success,
    loading: state.item.loading,
		iva: state.item.iva,
		proveedor: state.item.proveedor,
		costo: state.item.costo,
		clave_SAT: state.item.clave_SAT,
		userType: state.auth.user.attributes.type,
		barCode: state.barCodeReader.barCode,
		barType: state.barCodeReader.barType,
		pageRequest: state.barCodeReader.pageRequest,
		Inventario: state.query.Inventario,
		text: state.query.text
  };
};


const styles = {
    errorTextStyle: {
      fontSize: 20,
      alignSelf: 'center',
      color: 'red'
    },
		cardSectionStyle: {
			padding: 1,
			backgroundColor: '#fff',
			justifyContent: 'flex-start',
			flexDirection: 'row',
			borderColor: '#ddd',
			position: 'relative'
		},
		emphasisTextStyle: {
			fontSize: 18,
			color: '#000',
			fontWeight: 'bold'
		},
		patientTextStyle: {
			fontSize: 18
		},
		inputStyle: {
			color: '#000',
			fontSize: 18,
			flex: 2,
			textAlign: 'right'
		}
};

export default connect(mapStateToProps, {
	itemChanged,
	addItem,
	acceptItemAded,
	cleanBarCode,
	queryFunc,
	queryAttach,
	cleanFunc
})(AddItemScreen2);

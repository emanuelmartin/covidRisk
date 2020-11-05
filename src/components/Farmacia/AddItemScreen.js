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

class AddItemScreen extends Component {
	static navigationOptions = {
    title: 'Nuevo Producto',
  };

	constructor(props) {
    super(props);
    //setting default state
		this.state = {
			type: '',
			barCodeCharged: false,
      barCode: '',
      barType: '',
			Producto: { name: '' },
			Productos: [],
			productoSelect: false
		};
  }

	componentDidMount() {
		this.props.queryFunc({ text: '' });
    this.props.cleanFunc();
    if (this.props.userType === 'cafeteria') {
			this.setState({ type: 'cafeteria' });
		}
  }

	componentWillUnmount() {
    this.props.cleanFunc();
  }

	onItemChange(variable, text) {
    this.props.itemChanged({ variable, text });
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
			clave_SAT
		} = this.props;

    this.props.addItem({
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
			tipo: this.state.type,
			incluye: this.state.Productos
		});
  }

	onCameraPress() {
		this.props.navigation.navigate('BarCodeScanner', { updateCode: true });
	}

	onOkPress() {
		this.props.acceptItemAded();
		this.setState({
			type: '',
			barCodeCharged: false,
      barCode: '',
      barType: '',
			Producto: { name: '' },
			Productos: [],
			productoSelect: false
		});
	}

	navigateToScreen = (route) => () => {
    const navigateAction = NavigationActions.navigate({
      routeName: route
    });
    this.props.navigation.dispatch(navigateAction);
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
    if (this.props.error) {
      return (
        <View style={{ backgroundColor: 'white' }}>
          <Text style={styles.errorTextStyle}>
            {this.props.error}
          </Text>
        </View>
      );
    }
  }

	renderButton() {
    if (this.props.loading) {
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
							value={this.props.nombre}
						/>
					</CardSection>

					<CardSection>
						<Input
							label="Fórmula"
							placeholder="Ibuprofeno"
							onChangeText={(text) => this.onItemChange('formula', text)}
							value={this.props.formula}
						/>
					</CardSection>

					<CardSection>
						<Input
							label="Laboratorio"
							placeholder="Wyeth"
							onChangeText={(text) => this.onItemChange('laboratorio', text)}
							value={this.props.laboratorio}
						/>
					</CardSection>

					<CardSection>
						<Input
							label="Presentación"
							placeholder="Jarabe"
							onChangeText={(text) => this.onItemChange('presentacion', text)}
							value={this.props.presentacion}
						/>
					</CardSection>

					<CardSection>
						<Input
							label="Contenido"
							placeholder="200 ml"
							onChangeText={(text) => this.onItemChange('contenido', text)}
							value={this.props.contenido}
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
							value={this.props.nombre}
						/>
					</CardSection>

					<CardSection>
						<Input
							label="Marca"
							placeholder="Le Roy"
							onChangeText={(text) => this.onItemChange('laboratorio', text)}
							value={this.props.laboratorio}
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
								value={this.props.codigo}
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
							placeholder="Pieza"
							onChangeText={(text) => this.onItemChange('umc', text)}
							value={this.props.umc}
						/>
				</CardSection>

				<CardSection>
					<Input
						label="Cantidad"
						placeholder="100"
						onChangeText={(text) => this.onItemChange('cantidadUMC', text)}
						value={this.props.cantidadUMC}
					/>
			</CardSection>

			<CardSection>
				<Input
					label="Unidad de medida venta"
					placeholder="0602760006362"
					onChangeText={(text) => this.onItemChange('umv', text)}
					value={this.props.umv}
				/>
		</CardSection>


					<CardSection>
						<Input
							label="Código de proveedor"
							placeholder="0602760006362"
							onChangeText={(text) => this.onItemChange('codigoProveedor', text)}
							value={this.props.codigoProveedor}
						/>
				</CardSection>

					<CardSection>
						<Input
							label="Proveedor"
							placeholder="PiSA"
							onChangeText={(text) => this.onItemChange('proveedor', text)}
							value={this.props.proveedor}
						/>
					</CardSection>

					<CardSection>
						<Input
							label="Costo de Adquisición"
							placeholder="0"
							onChangeText={(text) => this.onItemChange('costo', text)}
							value={this.props.costo}
							keyboardType="numeric"
						/>
					</CardSection>

					<CardSection>
						<Input
							label="Clave SAT"
							placeholder="01010101"
							onChangeText={(text) => this.onItemChange('clave_SAT', text)}
							value={this.props.clave_SAT}
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
							value={this.props.iva}
							onChangeText={(text) => this.onItemChange('iva', text)}
							placeholder={'Selecciona la tasa correspondiente'}
						/>
					</CardSection>

					<CardSection>
						<Input
							label="Stock"
							placeholder="0"
							onChangeText={(text) => this.onItemChange('stock', text)}
							value={this.props.stock}
							keyboardType="numeric"
						/>
					</CardSection>

					<CardSection>
						<Input
							label="Precio Venta Público"
							placeholder="$ 350.00"
							onChangeText={(text) => this.onItemChange('precioPublico', text)}
							keyboardType="numeric"
							value={this.props.precioPublico}
						/>
					</CardSection>

					<CardSection>
						<Input
							label="Precio Venta Pacientes"
							placeholder="$ 250.00"
							keyboardType="numeric"
							onChangeText={(text) => this.onItemChange('precioPaciente', text)}
							value={this.props.precioPaciente}
						/>
					</CardSection>

					<CardSection>
						<Input
							label="Precio Venta Aseguradoras"
							placeholder="$ 500.00"
							onChangeText={(text) => this.onItemChange('precioSeguro', text)}
							keyboardType="numeric"
							value={this.props.precioSeguro}
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
								value={this.props.codigo}
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
							value={this.props.nombre}
						/>
					</CardSection>

					<CardSection>
						<Input
							label="Proveedor"
							placeholder="Activia"
							onChangeText={(text) => this.onItemChange('proveedor', text)}
							value={this.props.proveedor}
						/>
					</CardSection>

					<CardSection>
						<Input
							label="Costo de Adquisición"
							placeholder="0"
							onChangeText={(text) => this.onItemChange('costo', text)}
							value={this.props.costo}
							keyboardType="numeric"
						/>
					</CardSection>

					<CardSection>
						<Input
							label="Clave SAT"
							placeholder="01010101"
							onChangeText={(text) => this.onItemChange('clave_SAT', text)}
							value={this.props.clave_SAT}
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
							value={this.props.iva}
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
							value={this.props.precioPublico}
						/>
					</CardSection>
					<CardSection>
						<Input
							label="Stock"
							placeholder="0"
							onChangeText={(text) => this.onItemChange('stock', text)}
							value={this.props.stock}
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
				if (Array.isArray(this.props.Inventario)) {
					dataList = this.props.Inventario;
				} else {
					dataList = [this.props.Inventario];
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


			if (this.props.barCode !== '') {
				this.props.queryFunc({
					type: 'equalTo',
					object: 'Inventario',
					variable: 'codigo',
					text: this.props.barCode });
					this.setState({
						barCodeCharged: true,
						barCode: this.props.barCode,
						barType: this.props.barType
					});
					this.props.cleanBarCode();
				}
				if (this.state.barCodeCharged && this.props.Inventario === 'Failed' && this.props.pageRequest === 'AddItemScreen') {
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
							value={this.props.nombre}
						/>
					</CardSection>
					<SearchBar
						round
						lightTheme
						onChangeText={text => {
							this.props.queryAttach({
								object: 'Inventario',
								text,
								constrain:
								[{ type: 'containedIn', variable: 'tipo', text: ['medicamento', 'insumo'] },
									{ type: 'startsWith', variable: 'nombre', text, bool: 'and' }]
							});
							if (text !== '') { this.setState({ productoSelect: true }); }
						}}
						onClear={() => this.props.queryFunc({ text: '' })}
						placeholder="Ingresa el nombre del producto"
						value={this.props.text}
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
    this.props.queryFunc({ text: '' });
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
      this.props.cleanFunc();
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

  render() {
		console.log(this.state);
		let data = null;
		if (this.props.userType === 'dev' ||
	this.props.userType === 'admin') {
			data = [{ value: 'medicamento' },
							{ value: 'insumo' },
							{ value: 'cafeteria' },
							{ value: 'paquete quirúrgico' }];
		} else if (this.props.userType === 'farmacia') {
			data = [{ value: 'medicamento' },
							{ value: 'insumo' },
							{ value: 'paquete quirúrgico' }];
		} else if (this.props.userType === 'cafeteria') {
			data = [{ value: 'cafeteria' }];
		}
		if (this.props.success) {
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
})(AddItemScreen);

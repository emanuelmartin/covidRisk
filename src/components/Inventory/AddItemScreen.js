import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, Text, Alert } from 'react-native';
import { Icon } from 'react-native-elements';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Dropdown } from 'react-native-material-dropdown';
import { CardSection, Input, Spinner, Button } from '../common';
import {
	itemChanged,
	addItem,
	cleanBarCode,
	acceptItemAded
} from '../../actions';

class AddItemScreen extends Component {
	static navigationOptions = {
    title: 'Nuevo Producto',
  };

	constructor(props) {
    super(props);
    //setting default state
		this.state = { type: '' };
  }

	componentDidMount() {
    if (this.props.userType === 'cafeteria') {
			this.setState({ type: 'cafeteria' });
		}
  }

	onItemChange(variable, text) {
    this.props.itemChanged({ variable, text });
	}

	onButtonPress() {
    const {
			codigo,
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
		});
  }

	onCameraPress() {
		this.props.navigation.navigate('BarCodeScanner', { updateCode: true });
	}

	onOkPress() {
		this.props.acceptItemAded();
	}

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
        Agregar Producto
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
		}
		else if (this.state.type === 'insumo') {
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
		let data = null;
		if (this.props.userType === 'admin') {
			data = [{ value: 'medicamento' },
							{ value: 'insumo' },
							{ value: 'cafeteria' }];
		} else if (this.props.userType === 'enfermeria' ||
		this.props.userType === 'farmacia') {
			data = [{ value: 'medicamento' },
							{ value: 'insumo' }];
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
		tipoCodigo: state.item.tipoCodigo,
    nombre: state.item.nombre,
		formula: state.item.formula,
		laboratorio: state.item.laboratorio,
    presentacion: state.item.presentacion,
		contenido: state.item.contenido,
		stock: state.item.stock,
    precioPublico: state.item.precioPublico,
		precioPaciente: state.item.precioPaciente,
		precioSeguro: state.item.precioSeguro,
		error: state.item.error,
		success: state.item.success,
    loading: state.item.loading,
		iva: state.item.iva,
		proveedor: state.item.proveedor,
		costo: state.item.costo,
		clave_SAT: state.item.clave_SAT,
		userType: state.auth.user.attributes.type
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
		}
};

export default connect(mapStateToProps, {
	itemChanged,
	addItem,
	acceptItemAded,
	cleanBarCode
})(AddItemScreen);

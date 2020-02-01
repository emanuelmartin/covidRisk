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
import { CardSection, Input, DropInput, Spinner, Button } from '../common';
import {
	itemChanged,
	addService,
	cleanBarCode,
	acceptItemAded,
	queryFunc,
	queryAttach,
	cleanFunc
} from '../../actions';

class NewService extends Component {
	static navigationOptions = {
    title: 'Nuevo Producto',
  };

	constructor(props) {
    super(props);
    //setting default state
  }

	componentDidMount() {
		this.props.queryFunc({ text: '' });
    this.props.cleanFunc();
		this.props.itemChanged({ variable: 'nombre', text: '' });
		this.props.itemChanged({ variable: 'tipo', text: '' });
		this.props.itemChanged({ variable: 'precioSeguro', text: '' });
		this.props.itemChanged({ variable: 'precioPublico', text: '' });
		this.props.itemChanged({ variable: 'iva', text: '' });
		this.props.itemChanged({ variable: 'tipoCobro', text: '' });
  }

	componentWillUnmount() {
    this.props.cleanFunc();
  }

	onItemChange(variable, text) {
    this.props.itemChanged({ variable, text });
	}

	onButtonPress() {
    let {
			nombre,
			precioSeguro,
			precioPublico,
			iva,
			tipo,
			tipoCobro
		} = this.props;

		let validation = true;

		if(nombre === '' && validation){
			validation = false;
			Alert.alert(
				'Error',
				'Ingrese un nombre',
				[{ text: 'Ok', onPress: () => console.log('Nombre inválido') }],
				{ cancelable: false }
			);
		}

    if (tipo === '' && validation) {
			validation = false;
			Alert.alert(
				'Error',
				'Seleccione ingrese tipo servicio',
				[{ text: 'Ok', onPress: () => console.log('Tipo Inválido') }],
				{ cancelable: false }
			);
		}

    if (precioPublico === '' && validation) {
			validation = false;
			Alert.alert(
				'Error',
				'Seleccione ingrese precio público',
				[{ text: 'Ok', onPress: () => console.log('Tipo Inválido') }],
				{ cancelable: false }
			);
		}

		if (precioSeguro === '' && validation) {
			validation = false;
			Alert.alert(
				'Error',
				'Seleccione ingrese precio seguro',
				[{ text: 'Ok', onPress: () => console.log('Tipo Inválido') }],
				{ cancelable: false }
			);
		}

    if (iva === '' && validation) {
			validation = false;
			Alert.alert(
				'Error',
				'Seleccione ingrese IVA',
				[{ text: 'Ok', onPress: () => console.log('Tipo Inválido') }],
				{ cancelable: false }
			);
		}

    if (tipoCobro === '' && validation) {
			validation = false;
			Alert.alert(
				'Error',
				'Seleccione ingrese tipo de cobro',
				[{ text: 'Ok', onPress: () => console.log('Tipo Inválido') }],
				{ cancelable: false }
			);
		}

		if(validation){
			this.props.addService({
        nombre,
  			precioSeguro,
  			precioPublico,
  			iva,
  			tipo,
  			tipoCobro
			});
		}
  }

	onOkPress() {
		this.props.acceptItemAded();
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

	renderFields() {
		return (
			<View>
        <CardSection>
          <Input
            label="Nombre"
            placeholder="Radiografía de Cuello"
            onChangeText={(text) => this.onItemChange('nombre', text)}
            value={this.props.nombre}
          />
        </CardSection>

        <CardSection>
          <DropInput
            label='Tipo Servicio'
            data={[{ value: 'imagen' },
                    { value: 'laboratorio' },
				                    { value: 'administrativo' }]}
            value={this.props.tipo}
            onChangeText={(text) =>  this.onItemChange('tipo', text)}
            placeholder={'Selecciona el tipo de servicio'}
          />
        </CardSection>

        <CardSection>
          <Input
            label="Precio Público"
            keyboardType="numeric"
            placeholder="$100.00"
            onChangeText={(text) => this.onItemChange('precioPublico', text)}
            value={this.props.precioPublico}
          />
        </CardSection>

        <CardSection>
          <Input
            label="Precio Seguro"
            keyboardType="numeric"
            placeholder="$100.00"
            onChangeText={(text) => this.onItemChange('precioSeguro', text)}
            value={this.props.precioSeguro}
          />
        </CardSection>

        <CardSection>
          <DropInput
            label='IVA'
            data={[{ value: '0' },
                    { value: '16' }]}
            value={this.props.iva}
            onChangeText={(text) =>  this.onItemChange('iva', text)}
            placeholder={'Selecciona el tipo de iva'}
          />
        </CardSection>

        <CardSection>
          <DropInput
            label='Tipo de Cobro'
            data={[{ value: 'unitario' },
                    { value: 'porHora' }]}
            value={this.props.tipoCobro}
            onChangeText={(text) =>  this.onItemChange('tipoCobro', text)}
            placeholder={'Selecciona el tipo de cobro'}
          />
        </CardSection>
				{this.renderError()}
				<CardSection>
					{this.renderButton()}
				</CardSection>
			</View>
		);
	}

  render() {
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
				{this.renderFields()}
			</KeyboardAwareScrollView>
    );
  }
}

const mapStateToProps = state => {
  return {
		nombre: state.item.nombre,
		precioSeguro: state.item.precioSeguro,
		precioPublico: state.item.precioPublico,
		iva: state.item.iva,
		tipo: state.item.tipo,
		tipoCobro: state.item.tipoCobro,
		error: state.item.error,
		success: state.item.success,
    loading: state.item.loading,
		userType: state.auth.user.attributes.type,
		Inventario: state.query.Servicios,
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
	addService,
	acceptItemAded,
	cleanBarCode,
	queryFunc,
	queryAttach,
	cleanFunc
})(NewService);

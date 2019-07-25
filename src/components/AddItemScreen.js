import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { CardSection, Input, Spinner, Button } from './common';
import {
	codeChanged,
	nameChanged,
	presentationChanged,
	contentChanged,
	publicPriceChanged,
	pacientPriceChanged,
	assurancePriceChanged,
	addItem
} from '../actions';

class AddItemScreen extends Component {
	static navigationOptions = {
    title: 'Nuevo Producto',
  };

	onCodeChange(text) {
		this.props.codeChanged(text);
	}

	onNameChange(text) {
		this.props.nameChanged(text);
	}

	onPresentationChange(text) {
		this.props.presentationChanged(text);
	}

	onContentChange(text) {
		this.props.contentChanged(text);
	}

	onPublicPriceChange(text) {
		this.props.publicPriceChanged(text);
	}

	onPacientPriceChange(text) {
		this.props.pacientPriceChanged(text);
	}

	onAssurancePriceChange(text) {
		this.props.assurancePriceChanged(text);
	}

	onButtonPress() {
    const {
			code,
			name,
			presentation,
			content,
			publicPrice,
			pacientPrice,
			assurancePrice
		} = this.props;

    this.props.addItem({
			code,
			name,
			presentation,
			content,
			publicPrice,
			pacientPrice,
			assurancePrice
		});
  }

	goHome() {
    this.props.navigation.navigate('PharmacyScreen');
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

  render() {
    return (
			<KeyboardAwareScrollView>
				<CardSection>
					<Input
            label="Código"
            placeholder="0xa422008"
            onChangeText={this.onCodeChange.bind(this)}
            value={this.props.code}
					/>
				</CardSection>

				<CardSection>
					<Input
            label="Nombre Comercial"
            placeholder="Diclofenaco"
            onChangeText={this.onNameChange.bind(this)}
            value={this.props.name}
					/>
				</CardSection>

				<CardSection>
					<Input
            label="Presentación"
            placeholder="Jarabe"
            onChangeText={this.onPresentationChange.bind(this)}
            value={this.props.presentation}
					/>
				</CardSection>

				<CardSection>
					<Input
            label="Contenido"
            placeholder="200 ml"
            onChangeText={this.onContentChange.bind(this)}
            value={this.props.content}
					/>
				</CardSection>

				<CardSection>
					<Input
            label="Precio Venta Público"
            placeholder="$ 350.00"
            onChangeText={this.onPublicPriceChange.bind(this)}
            value={this.props.publicPrice}
					/>
				</CardSection>

				<CardSection>
					<Input
            label="Precio Venta Pacientes"
            placeholder="$ 250.00"
            onChangeText={this.onPacientPriceChange.bind(this)}
            value={this.props.pacientPrice}
					/>
				</CardSection>

				<CardSection>
					<Input
            label="Precio Venta Aseguradoras"
            placeholder="$ 500.00"
            onChangeText={this.onAssurancePriceChange.bind(this)}
            value={this.props.assurancePrice}
					/>
				</CardSection>
					{this.renderError()}
				<CardSection>
          {this.renderButton()}
        </CardSection>
			</KeyboardAwareScrollView>
    );
  }
}

const mapStateToProps = state => {
  return {
    code: state.item.code,
    name: state.item.name,
    presentation: state.item.presentation,
		content: state.item.content,
    publicPrice: state.item.publicPrice,
		pacientPrice: state.item.pacientPrice,
		assurancePrice: state.item.assurancePrice,
		error: state.item.error,
    loading: state.item.loading
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
	codeChanged,
	nameChanged,
	presentationChanged,
	contentChanged,
	publicPriceChanged,
	pacientPriceChanged,
	assurancePriceChanged,
	addItem
})(AddItemScreen);

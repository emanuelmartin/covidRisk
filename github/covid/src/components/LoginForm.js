import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, Text, Image } from 'react-native';
import Parse from 'parse/react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Card, CardSection, Input, Button, Spinner, Header, DropInput } from './common';
import { emailChanged, passwordChanged, loginUser, session } from '../actions';
import RadioForm, {RadioButton, RadioButtonInput, RadioButtonLabel} from 'react-native-simple-radio-button';

class LoginForm extends Component {
  static navigationOptions = {
    headerShown: false  //this will hide the header
  };

  componentDidMount() {
    Parse.User.currentAsync().then((user) => {
        console.log(user);
        this.props.session(user);
        });
  }

  onEmailChange(text) {
    this.props.emailChanged(text);
  }

  onPasswordChange(text) {
    this.props.passwordChanged(text);
  }

  onLoginButtonPress() {
    this.props.navigation.navigate('Maps');

  }

  onSignupButtonPress() {
    this.props.navigation.navigate('SignUp');
  }

  renderButton() {
    if (this.props.loading) {
      return <Spinner size="large" />;
    }

    return (
      <Button onPress={this.onLoginButtonPress.bind(this)}>
        Continuar
      </Button>
    );
  }

  renderError() {
    if (this.props.error) {
      console.log(this.props.error);
      return (
        <View style={{ backgroundColor: 'white' }}>
          <Text style={styles.errorTextStyle}>
            {this.props.error}
          </Text>
        </View>
      );
    }
  }

  render() {
    const edad_data = [{ value: '0' }, { value: '1' }, { value: '2' }, { value: '3' }, { value: '4' }, { value: '5' }, { value: '6' }, { value: '7' }, { value: '8' }, { value: '9' },
    { value: '10' }, { value: '11' }, { value: '12' }, { value: '13' }, { value: '14' }, { value: '15' }, { value: '16' }, { value: '17' }, { value: '18' }, { value: '19' },
    { value: '20' }, { value: '21' }, { value: '22' }, { value: '23' }, { value: '24' }, { value: '25' }, { value: '26' }, { value: '27' }, { value: '28' }, { value: '29' },
    { value: '30' }, { value: '31' }, { value: '32' }, { value: '33' }, { value: '34' }, { value: '35' }, { value: '36' }, { value: '37' }, { value: '38' }, { value: '39' },
    { value: '40' }, { value: '41' }, { value: '42' }, { value: '43' }, { value: '44' }, { value: '45' }, { value: '46' }, { value: '47' }, { value: '48' }, { value: '49' },
    { value: '50' }, { value: '51' }, { value: '52' }, { value: '53' }, { value: '54' }, { value: '55' }, { value: '56' }, { value: '57' }, { value: '58' }, { value: '59' },
    { value: '60' }, { value: '61' }, { value: '62' }, { value: '63' }, { value: '64' }, { value: '65' }, { value: '66' }, { value: '67' }, { value: '68' }, { value: '69' },
    { value: '70' }, { value: '71' }, { value: '72' }, { value: '73' }, { value: '74' }, { value: '75' }, { value: '76' }, { value: '77' }, { value: '78' }, { value: '79' },
    { value: '80' }, { value: '81' }, { value: '82' }, { value: '83' }, { value: '84' }, { value: '85' }, { value: '86' }, { value: '87' }, { value: '88' }, { value: '89' },
    { value: '90' }, { value: '91' }, { value: '92' }, { value: '93' }, { value: '94' }, { value: '95' }, { value: '96' }, { value: '97' }, { value: '98' }, { value: '99+' } ];

    const radio_sexo = [
      {label: 'Masculino', value: 0 },
      {label: 'Femenino', value: 1 }
    ];

    const radio_bool = [
      {label: 'Sí', value: 0 },
      {label: 'No', value: 1 }
    ];

    if (this.props.loggedIn) {
      this.props.navigation.navigate('Stack');
    }
    return (
      <KeyboardAwareScrollView>
        <Header headerText="Cuestionario Inicial" />

        <CardSection>
          <DropInput
            label='Edad'
            data={edad_data}
            value={this.props.email}
            onChangeText={this.onEmailChange.bind(this)}
            placeholder='20'
          />
        </CardSection>

        <CardSection>
          <Text>Sexo:</Text>
        </CardSection>
        <CardSection>

          <RadioForm
            radio_props={radio_sexo}
            initial={0}
            formHorizontal={true}
            labelHorizontal={true}
            buttonColor={'#2196f3'}
            animation={true}
            onPress={(value) => {this.setState({sexo:value})}}
          />
        </CardSection>

        <CardSection>
          <Text>¿Tiene fiebre?</Text>
        </CardSection>
        <CardSection>
          <RadioForm
            radio_props={radio_bool}
            initial={0}
            formHorizontal={true}
            labelHorizontal={true}
            buttonColor={'#2196f3'}
            animation={true}
            onPress={(value) => {this.setState({sexo1:value})}}
          />
        </CardSection>

        <CardSection>
          <Text>¿Tiene tos?</Text>
        </CardSection>
        <CardSection>
          <RadioForm
            radio_props={radio_bool}
            initial={0}
            formHorizontal={true}
            labelHorizontal={true}
            buttonColor={'#2196f3'}
            animation={true}
            onPress={(value) => {this.setState({value:value})}}
          />
        </CardSection>

        <CardSection>
          <Text>¿Tiene dificultad para respirar?</Text>
        </CardSection>
        <CardSection>
          <RadioForm
            radio_props={radio_bool}
            initial={0}
            formHorizontal={true}
            labelHorizontal={true}
            buttonColor={'#2196f3'}
            animation={true}
            onPress={(value) => {this.setState({value:value})}}
          />
        </CardSection>

        <CardSection>
          <Text>¿Tiene congestión nasal?</Text>
        </CardSection>
        <CardSection>
          <RadioForm
            radio_props={radio_bool}
            initial={0}
            formHorizontal={true}
            labelHorizontal={true}
            buttonColor={'#2196f3'}
            animation={true}
            onPress={(value) => {this.setState({value:value})}}
          />
        </CardSection>

        <CardSection>
          <Text>¿Tiene dolor de garganta?</Text>
        </CardSection>
        <CardSection>
          <RadioForm
            radio_props={radio_bool}
            initial={0}
            formHorizontal={true}
            labelHorizontal={true}
            buttonColor={'#2196f3'}
            animation={true}
            onPress={(value) => {this.setState({value:value})}}
          />
        </CardSection>

        <CardSection>
          <Text>¿Tiene diarrea?</Text>
        </CardSection>
        <CardSection>
          <RadioForm
            radio_props={radio_bool}
            initial={0}
            formHorizontal={true}
            labelHorizontal={true}
            buttonColor={'#2196f3'}
            animation={true}
            onPress={(value) => {this.setState({value:value})}}
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

const styles = {
  errorTextStyle: {
    fontSize: 20,
    alignSelf: 'center',
    color: 'white'
  }
};

const mapStateToProps = ({ auth }) => {
 const { email, password, error, loading, loggedIn } = auth;
 return { email, password, error, loading, loggedIn };
};

export default connect(mapStateToProps, {
  emailChanged, passwordChanged, loginUser, session
})(LoginForm);

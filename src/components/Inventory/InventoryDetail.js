import React, { Component } from 'react';
import {
  Text,
  ScrollView,
  View
} from 'react-native';
import { Icon } from 'react-native-elements';
import { connect } from 'react-redux';
import { Card, CardSection, Input, Spinner } from '../common';
import { itemChanged, updateItem } from '../../actions';

class InventoryDetail extends Component {

  static navigationOptions = ({ navigation }) => {
    return {
    title: navigation.getParam('item').name
    };
  };

  constructor(props) {
    super(props);
    this.item = props.navigation.getParam('item');
    this.state = { key: '' };
  }

  componentWillMount() {
    this.props.itemChanged({ variable: 'stock', text: this.item.stock.toString() });
    this.props.itemChanged({ variable: 'precioPublico', text: this.item.precioPublico.toString() });
    this.props.itemChanged({
      variable: 'precioPaciente',
      text: this.item.precioPaciente.toString()
    });
    this.props.itemChanged({
      variable: 'precioSeguro',
      text: this.item.precioSeguro.toString()
    });
  }

  onItemChange(variable, text) {
    this.props.itemChanged({ variable, text });
	}

  onUpdate(variable) {
    const newValue = this.props[variable];
    const item = this.item;
    this.setState({ key: variable });
    this.props.updateItem({ item, variable, value: newValue });
    item[variable] = newValue;
  }

  renderButton(item, checkValue, variable) {
    const data = { key: item[0].toString(), value: item[1].toString() };

    if (this.props.loading && checkValue === this.state.key) {
      return <Spinner size="small" />;
    } else if (data.value !== this.props[checkValue]) {
      return (
        <Icon
          name='sync'
          type='antdesign'
          color='#63C0B9'
          onPress={() => this.onUpdate(variable)}
        />
      );
    }
    return null;
  }

  renderItem(item) {
    console.log(item);
    const data = { key: item[0].toString(), value: item[1].toString() };
    if (data.key === 'stock') {
      return (
        <View>
          <CardSection>
            <Input
              style={{ flex: 2 }}
              label={data.key}
              placeholder=""
              onChangeText={(text) => this.onItemChange('stock', text)}
              value={this.props.stock}
              keyboardType="numeric"
            />
          {this.renderButton(item, data.key, 'stock')}
          </CardSection>
        </View>
      );
    } else if (data.key === 'precioPublico') {
      return (
        <View>
          <CardSection>
            <Input
              style={{ flex: 2 }}
              label={data.key}
              placeholder=""
              onChangeText={(text) => this.onItemChange('precioPublico', text)}
              value={this.props.precioPublico}
              keyboardType="numeric"
            />
          {this.renderButton(item, data.key, 'precioPublico')}
          </CardSection>
        </View>
      );
    } else if (data.key === 'precioPaciente') {
      return (
        <View>
          <CardSection>
            <Input
              style={{ flex: 2 }}
              label={data.key}
              placeholder=""
              onChangeText={(text) => this.onItemChange('precioPaciente', text)}
              value={this.props.precioPaciente}
              keyboardType="numeric"
            />
          {this.renderButton(item, data.key, 'precioPaciente')}
          </CardSection>
        </View>
      );
    } else if (data.key === 'precioSeguro') {
      return (
        <View>
          <CardSection>
            <Input
              style={{ flex: 2 }}
              label={data.key}
              placeholder=""
              onChangeText={(text) => this.onItemChange('precioSeguro', text)}
              value={this.props.precioSeguro}
              keyboardType="numeric"
            />
          {this.renderButton(item, data.key, 'precioSeguro')}
          </CardSection>
        </View>
      );
    } else if (
      data.key !== 'stock' &&
      data.key !== 'createdAt' &&
      data.key !== 'updatedAt' &&
      data.key !== 'objectId') {
      return (
        <View>
          <Card>
            <CardSection>
            <Text
              style={{
                fontSize: 15,
                fontWeight: 'bold',
                marginTop: 15,
                padding: 5,
                color: '#000'
              }}
            >
              {data.key}
            </Text>
            </CardSection>
            <CardSection>
            <Text>{data.value}</Text>
            </CardSection>
          </Card>
        </View>
      );
    }
  }

  render() {
    const { navigation } = this.props;
    let data = navigation.getParam('item');
    const array = Object.entries(data);
    console.log(array);
    return (
      <ScrollView>
        {array.map(item => this.renderItem(item))}
        <CardSection />
      </ScrollView>
    );
  }
}

const mapStateToProps = state => {
  return {
    stock: state.item.stock,
    precioPublico: state.item.precioPublico,
    precioPaciente: state.item.precioPaciente,
    precioSeguro: state.item.precioSeguro,
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
};

export default connect(mapStateToProps, { itemChanged, updateItem })(InventoryDetail);

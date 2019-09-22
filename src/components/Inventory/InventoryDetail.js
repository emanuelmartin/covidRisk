import React, { Component } from 'react';
import {
  Text,
  ScrollView,
  View
} from 'react-native';
import { Icon } from 'react-native-elements';
import { connect } from 'react-redux';
import { Card, CardSection, Input, Spinner } from '../common';
import {
  stockChanged,
  publicPriceChanged,
	pacientPriceChanged,
	assurancePriceChanged,
  updateItem } from '../../actions';

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
    this.props.stockChanged(this.item.stock.toString());
    this.props.publicPriceChanged(this.item.publicPrice.toString());
    this.props.pacientPriceChanged(this.item.pacientPrice.toString());
    this.props.assurancePriceChanged(this.item.assurancePrice.toString());
  }

  onStockChange(text) {
		this.props.stockChanged(text);
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

  onUpdateStock() {
    const stock = this.props.stock;
    const item = this.item;
    this.setState({ key: 'stock' });
    this.props.updateItem({ item, variable: 'stock', value: stock });
    item.stock = stock;
  }

  onUpdatePublicPrice() {
    const publicPrice = this.props.publicPrice;
    const item = this.item;
    this.setState({ key: 'publicPrice' });
    this.props.updateItem({ item, variable: 'publicPrice', value: publicPrice });
    item.publicPrice = publicPrice;
  }

  onUpdatePacientPrice() {
    const pacientPrice = this.props.pacientPrice;
    const item = this.item;
    this.setState({ key: 'pacientPrice' });
    this.props.updateItem({ item, variable: 'pacientPrice', value: pacientPrice });
    item.pacientPrice = pacientPrice;
  }

  onUpdateAssurancePrice() {
    const assurancePrice = this.props.assurancePrice;
    const item = this.item;
    this.setState({ key: 'assurancePrice' });
    this.props.updateItem({ item, variable: 'assurancePrice', value: assurancePrice });
    item.assurancePrice = assurancePrice;
  }

  renderButton(item, checkValue, onPressFunction) {
    const data = { key: item[0].toString(), value: item[1].toString() };

    if (this.props.loading && checkValue === this.state.key) {
      return <Spinner size="small" />;
    } else if (data.value !== this.props[checkValue]) {
      return (
        <Icon
          name='sync'
          type='antdesign'
          color='#63C0B9'
          onPress={onPressFunction.bind(this)}
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
              onChangeText={this.onStockChange.bind(this)}
              value={this.props.stock}
            />
          {this.renderButton(item, data.key, this.onUpdateStock)}
          </CardSection>
        </View>
      );
    } else if (data.key === 'publicPrice') {
      return (
        <View>
          <CardSection>
            <Input
              style={{ flex: 2 }}
              label={data.key}
              placeholder=""
              onChangeText={this.onPublicPriceChange.bind(this)}
              value={this.props.publicPrice}
            />
          {this.renderButton(item, data.key, this.onUpdatePublicPrice)}
          </CardSection>
        </View>
      );
    } else if (data.key === 'pacientPrice') {
      return (
        <View>
          <CardSection>
            <Input
              style={{ flex: 2 }}
              label={data.key}
              placeholder=""
              onChangeText={this.onPacientPriceChange.bind(this)}
              value={this.props.pacientPrice}
            />
          {this.renderButton(item, data.key, this.onUpdatePacientPrice)}
          </CardSection>
        </View>
      );
    } else if (data.key === 'assurancePrice') {
      return (
        <View>
          <CardSection>
            <Input
              style={{ flex: 2 }}
              label={data.key}
              placeholder=""
              onChangeText={this.onAssurancePriceChange.bind(this)}
              value={this.props.assurancePrice}
            />
          {this.renderButton(item, data.key, this.onUpdateAssurancePrice)}
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
};

export default connect(mapStateToProps,
  { stockChanged,
    publicPriceChanged,
    pacientPriceChanged,
    assurancePriceChanged,
    updateItem })(InventoryDetail);

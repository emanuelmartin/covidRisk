import React, { Component } from 'react';
import {
  Text,
  ScrollView,
  View,
  TouchableHighlight,
  Image
} from 'react-native';
import { connect } from 'react-redux';
import { Card, CardSection, Input, Spinner } from '../common';
import { stockChanged, updateItem } from '../../actions';

class InventoryDetail extends Component {

  static navigationOptions = ({ navigation }) => {
    return {
    title: navigation.getParam('item').name
    };
  };

  constructor(props) {
    super(props);
    this.item = props.navigation.getParam('item');
  }

  componentWillMount() {
    this.props.stockChanged(this.item.stock.toString());
  }

  onStockChange(text) {
		this.props.stockChanged(text);
	}

  onUpdatePress() {
    const stock = this.props.stock;
    const item = this.item;
    this.props.updateItem({ item, stock });
  }

  renderButton(item) {
    const data = { key: item[0].toString(), value: item[1].toString() };

    if (this.props.loading) {
      return <Spinner size="small" />;
    } else if (data.value !== this.props.stock) {
      return (
        <TouchableHighlight onPress={this.onUpdatePress.bind(this)}>
          <Image
            source={require('.././img/icons/update.png')}
            style={{ width: 50, height: 50 }}
          />
        </TouchableHighlight>
      );
    }
    return null;
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

  renderItem(item) {
    console.log(item);
    const data = { key: item[0].toString(), value: item[1].toString() };
    if (
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
    } else if (data.key === 'stock') {
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
            {this.renderButton(item)}
          </CardSection>
          {this.renderError()}
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

export default connect(mapStateToProps, { stockChanged, updateItem })(InventoryDetail);

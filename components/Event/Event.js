import React from 'react';
import moment from 'moment';

import {
  ScrollView,
  Image,
  View,
  TouchableOpacity,
} from 'react-native';

import {
  RkCard,
  RkText,
  RkStyleSheet,
} from 'react-native-ui-kitten';

import {
  withNavigation
} from 'react-navigation'

export class Event extends React.Component {
  constructor(props) {
    super(props);
    this.event = this.props.navigation.getParam('event', 1);
  }

  static navigationOptions = {
    title: 'Detaljer'.toUpperCase(),
  };

  render = () => (
    <ScrollView style={styles.root}>
      <RkCard rkType='article'>
        <Image rkCardImg source={{uri: this.event.photo.url}} />
        <View rkCardHeader>
          <View>
            <RkText style={styles.title} rkType='header2'>{this.event.title}</RkText>
            <RkText rkType='secondary2 hintColor'>
              {this.event.location.name}, {this.event.location.adress}
            </RkText>
            <RkText rkType='secondary3 hintColor'>
              Tid: {this.event.timespanDisplayString}
            </RkText>
            <RkText rkType='secondary3 hintColor'>
            {this.event.category}
          </RkText>
          </View>
        </View>
        <View rkCardContent>
          <View>
            <RkText rkType='secondary3 bigLine'>{this.event.description}</RkText>
          </View>
        </View>
        <View rkCardFooter>
          
        </View>
      </RkCard>
    </ScrollView>
  )
}

const styles = RkStyleSheet.create(theme => ({
  root: {
    backgroundColor: 'black',
  },
  title: {
    marginBottom: 5,
  },
}));
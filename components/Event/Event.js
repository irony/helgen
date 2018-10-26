import React from 'react';
import moment from 'moment';
import MapView, {Marker} from 'react-native-maps';

import {
  ScrollView,
  Image,
  View,
  TouchableOpacity,
  Linking,
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
    headerTintColor: 'white',
    navBarBlur: true,
    drawUnderNavBar: true,
    navBarTranslucent: true,
    headerStyle: {
      backgroundColor: '#000',
      borderBottomColor: 'black',
      borderBottomWidth: 0,
    }
  }

  render = () => (
    <ScrollView style={styles.root}>
      <RkCard rkType='article'>
        <Image rkCardImg source={{uri: this.event.photo.url}} />
        {this.event.photo.byline ? <RkText style={styles.byline}>{this.event.photo.byline}</RkText> : null}

        <View rkCardHeader>
          <View>
            <RkText style={styles.title} rkType='header2'>{this.event.title}</RkText>
            <RkText rkType='secondary2 hintColor'>
              {this.event.location.name}, {this.event.location.adress}
            </RkText>
            <RkText rkType='secondary3 hintColor'>
             {this.event.startDayName} {this.event.timespanDisplayString} 
            </RkText>
            <RkText rkType='secondary3 hintColor'>
            {this.event.category} {(this.event.isFree ? '(Gratis)' : '')}
          </RkText>
          {!(this.event.webpage ? null : 
            <TouchableOpacity onPress={() => Linking.openURL(this.event.webpage)}>
              <RkText style={{color: 'blue'}}>
                {this.event.webpage}
              </RkText>
            </TouchableOpacity>)
          }
          </View>
          </View>
        <View rkCardContent>
          <View>
            <RkText rkType='secondary3 bigLine'>{this.event.description}</RkText>
          </View>
        </View>
        <View rkCardFooter style={styles.container}>
        {
          !this.event.location.latitude ? 
            <RkText>{`${this.event.location.name} ${this.event.location.adress} ${this.event.location.subway} ${this.event.location.region}`}</RkText> 
          : 
          (<MapView
            style={styles.map}
            showsBuildings={true}
            showsUserLocation={true}
            showsPointsOfInterest={true}
            zoomControlEnabled={true}
            initialRegion={{
              longitude: +this.event.location.longitude, 
              latitude: +this.event.location.latitude,
              latitudeDelta: 0.122,
              longitudeDelta: 0.121,
            }}
          >
            <Marker
                coordinate={{longitude: +this.event.location.longitude, latitude: +this.event.location.latitude}}
                title={this.event.title}
                onCalloutPress={() => Linking.openURL(`https://maps.apple.com/?daddr=${this.event.location.latitude},${this.event.location.longitude}`)}
                description={this.event.description}
              />
          </MapView>)
        }
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
  byline: {
    position: 'absolute',
    top: 180,
    right: 5,
    color: '#444',
    textShadowColor: 'rgba(1, 1, 1, 0.75)',
    textShadowOffset: {width: -1, height: 1},
    textShadowRadius: 5
  },
  container: {
    position: 'relative',
    height: 300,
    justifyContent: 'flex-end',
    marginTop: 10,
    alignItems: 'center',
    backgroundColor: '#333333'
  },
  map: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    flex: 1
  },
}));
import React, {Component} from 'react'
import moment from 'moment'
import {List} from '../List/List'
import {Event} from '../Event/Event'
import { withNavigation, createStackNavigator } from 'react-navigation';
import {
  RkText, RkCard
} from 'react-native-ui-kitten'

moment.locale('sv-se')

const url = `https://www.dn.se/ajax/calendar?fromDate=${moment().startOf('week').add(5, 'days').toISOString()}&toDate=${moment().endOf('week').add(1, 'day').toISOString()}&q=&regions=&size=10000`

class EventsContainer extends Component {
  constructor () {
    super()
    this.state = {
      events: []
    }
  }
  static navigationOptions = {
    title: 'Händer i helgen'.toUpperCase(),
    headerTintColor: 'white',
    screenBackgroundColor: '#000',
    headerStyle: {
      backgroundColor: '#000',
      borderBottomColor: 'black',
      borderBottomWidth: 0
    }

  }

  componentDidMount () {
    fetch(url)
      .then(res => res.json())
      // merge all days to one list
      .then(({days}) => days.reduce((items, day) => [...items, ...day.items], []))
      // only keep events with photos
      .then(events => events.filter(item => item.photo && item.photo.url))
      // only keep weekend events - this might be an option later on...
      .then(events => events.filter(item => moment(item.startTime).isAfter(moment().startOf('day'))))
      .then(events => {
        this.setState({events})
      })
      .catch(err => [{err}])
  }
  render () {
    return <List  events={this.state.events} navigation={this.props.navigation}/>
    //return <Text>{JSON.stringify(this.state.events, null, 2)}</Text>
  }
}

const MainStack = createStackNavigator(
  {
    Home: {
      screen: EventsContainer
    },
    Event: {
      screen: Event
    }
  },
  {
    /* Same configuration as before */
  }
)

export default MainStack

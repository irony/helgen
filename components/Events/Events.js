import React, {Component} from 'react'
import moment from 'moment'
import {List} from '../List/List'
import {Event} from '../Event/Event'
import { withNavigation, createStackNavigator } from 'react-navigation';
import {
  RkText, RkCard
} from 'react-native-ui-kitten'

const url = `https://www.dn.se/ajax/calendar?fromDate=${moment().startOf('week').toISOString()}&toDate=${moment().endOf('week').toISOString()}&q=&regions=&size=10000`

class EventsContainer extends Component {
  constructor () {
    super()
    this.state = {
      events: []
    }
  }
  static navigationOptions = {
    title: 'Händer i helgen'.toUpperCase(),
  }

  componentDidMount () {
    fetch(url)
      .then(res => res.json())
      .then(events => {
        this.setState({events: events.days[0].items.filter(item => item.photo)})
      })
      .catch(err => [{err}])
  }
  render () {
    return <List events={this.state.events} navigation={this.props.navigation}/>
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

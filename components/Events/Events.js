import React, {Component} from 'react'
import moment from 'moment'
import {List} from '../List/List'
import {Event} from '../Event/Event'
import { withNavigation, createStackNavigator } from 'react-navigation';
import DecisionTree from 'decision-tree'

moment.locale('sv-se')

const url = `https://www.dn.se/ajax/calendar?fromDate=${moment().startOf('week').add(5, 'days').toISOString()}&toDate=${moment().endOf('week').add(1, 'day').toISOString()}&q=&regions=&size=10000`

class EventsContainer extends Component {
  constructor () {
    super()
    this.state = {
      events: []
    }
    this.dt = null
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

  aiSort(events) {
    const sorted = events
      .map(event => Object.assign(event, {match: this.dt && this.dt.predict(this.normalize(event))}))
      .sort((a,b) => b.match - a.match)
    console.log('sorted', sorted)
    return sorted
  }

  normalize(event) {
    return {
      free: event.isFree,
      class: event.className,
      'category': event.category,
      'day': event.startDayName,
      'locationCategory': event.location.category,
      'region': event.location.region,
      'visited': event.visited || 0
    }
  }

  eventSelected(event) {
    event.visited=(event.visited || 0) + 1
    const normalized = this.state.events.map(this.normalize)
    this.dt = new DecisionTree(normalized, 'visited', ['free', 'class', 'category', 'day', 'locationCategory', 'region'])
    this.setState({events: this.aiSort(this.state.events)})
  }

  componentDidMount () {
    fetch(url)
      .then(res => res.json())
      // merge all days to one list
      .then(({days}) => days.reduce((items, day) => [...items, ...day.items], []))
      // only keep events with photos
      .then(events => events.filter(item => item.photo && item.photo.url))
      // only keep events starting today or later...
      .then(events => events.filter(item => moment(item.startTime).isAfter(moment().startOf('day'))))
      .then(this.aiSort)
      .then(events => {
        this.setState({events})
      })
      .catch(err => [{err}])
  }
  render () {
    return <List onItemPressed={(event) => this.eventSelected(event)} events={this.state.events} navigation={this.props.navigation}/>
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

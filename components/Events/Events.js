import React, {Component} from 'react'
import { Button } from 'react-native';
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
  static navigationOptions = ({ navigation }) => ({
    title: 'Händer i helgen'.toUpperCase(),
    headerTintColor: 'white',
    screenBackgroundColor: '#000',
    headerStyle: {
      backgroundColor: '#000',
      borderBottomColor: 'black',
      borderBottomWidth: 0
    },
    headerRight: (
      <Button
        onPress={() => navigation.setParams({sort: 'magic'})}
        title="Sortera"
        color="#aaa"
      />
    ),
  })

  aiSort() {
    const sorted = this.state.events.sort((a,b) => b.match - a.match)
    return sorted
  }

  normalize(event) {
    return {
      'free': event.isFree,
      'class': event.className,
      'category': event.category,
      'day': event.startDayName,
      'locationCategory': event.location.category,
      'region': event.location.region,
      'visited': event.visited || 0
    }
  }

  calculateMatch(events){
    const normalized = this.state.events.map(this.normalize)
    const dt = new DecisionTree(normalized, 'visited', ['free', 'class', 'category', 'day', 'locationCategory', 'region'])
    return events.map(event => Object.assign(event, {match: dt.predict(this.normalize(event))}))
  }

  eventSelected(event) {
    event.visited=(event.visited || 0) + 1
    this.setState({events: this.calculateMatch(this.state.events)})
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
      .then(this.calculateMatch)
      .then(events => {
        this.setState({events})
      })
      .catch(err => [{err}])
  }
  render () {
    // HACK: weird way of sending info from the toolbar but it's what the docs say: https://github.com/react-navigation/react-navigation/issues/154
    const sort = this.props.navigation.state.params && this.props.navigation.state.params.sort
    const events = (sort === 'magic') ? this.aiSort(this.state.events) : this.state.events
    return <List onItemPressed={(event) => this.eventSelected(event)} events={events} navigation={this.props.navigation}/>
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

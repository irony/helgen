import React from 'react'
import moment from 'moment'
import {
  FlatList,
  Image,
  View,
  TouchableOpacity,
} from 'react-native'

import {
  RkText,
  RkCard, RkStyleSheet, RkTheme
} from 'react-native-ui-kitten'

import SocialBar from '../SocialBar/SocialBar'

export class List extends React.Component {
  extractItemKey = (item) => `${item.id}`

  onItemPressed = (event) => {
    this.props.navigation.navigate('Event', { event })
  }

  renderItem = ({ item }) => (
    <TouchableOpacity
    delayPressIn={70}
    activeOpacity={0.8}
    onPress={() => this.onItemPressed(item)}>
    <RkCard rkType='backImg'>
      <Image rkCardImg source={{uri: item.photo.url}}  />
      <View rkCardImgOverlay rkCardContent style={styles.overlay}>
        <RkText rkType='header2 inverseColor'>{item.title}</RkText>
        <RkText rkType='secondary2 inverseColor'>{`${item.startDayName} ${item.timespanDisplayString}`}</RkText>
        <View rkCardFooter style={styles.footer}>
            <RkText rkType='secondary3 inverseColor'>{`${item.location.name}`}</RkText>
            <RkText rkType='secondary3 inverseColor'>{`${item.mainCategory}`}</RkText>
            
        </View>
      </View>
    </RkCard>
  </TouchableOpacity>
  )

  render = () => (
    <FlatList
      data={this.props.events}
      renderItem={this.renderItem}
      keyExtractor={this.extractItemKey}
      style={styles.root}
    />
  )
}

const styles = RkStyleSheet.create(theme => ({
  root: {
    backgroundColor: theme.colors.screen.base,
  },
  overlay: {
    justifyContent: 'flex-end',
  },
  footer: {
    width: 240,
  },
}))

RkTheme.setType('RkText', 'header2', {
  fontSize: 30,
  color: 'white',
  fontFamily: 'Helvetica Neue'
})

RkTheme.setType('RkText', 'secondary2', {
  fontSize: theme => 18,
  fontFamily: theme => 'Helvetica Neue',
  color: '#B2B2B2'
})

RkTheme.setType('RkText', 'secondary3', {
  fontSize: theme => 15,
  fontFamily: theme => 'Helvetica Neue',
  color: '#929292'
})

RkTheme.setType('RkCard', 'backImg', {
  container: {
    borderWidth: 0,
    borderRadius: 0,
    backgroundColor: 'black'
  },
  img: {
    height: 225,
    opacity: 0.3
  },
  imgOverlay: {
    height: 225,
    backgroundColor: 'transparent'
  },
  content: {
    paddingHorizontal: 14
  },
  footer: {
    paddingTop: 15,
    paddingBottom: 0,
    paddingVertical: 7.5,
    paddingHorizontal: 0
  }
})

RkTheme.setType('RkCard', 'imgBlock', {
  img: {
    height: 235
  },
  header: {
    padding: 0,
    paddingVertical: 13,
    paddingHorizontal: 16
  },
  imgOverlay: {
    height: -1
  },
  footer: {
    paddingTop: 18,
    paddingBottom: 15,
    paddingVertical: 0,
    paddingHorizontal: 0
  }
})

RkTheme.setType('RkCard', 'horizontal', {
  container: {
    flexDirection: 'row',
    height: 110
  },
  content: {
    flex: 1
  },
  img: {
    height: null,
    flex: -1,
    width: 120
  }
})

RkTheme.setType('RkCard', 'article', {
  container: {
    borderWidth: 0,
    backgroundColor: 'transparent'
  },
  header: {
    paddingVertical: 0,
    paddingTop: 20,
    paddingBottom: 16,
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderColor: theme => theme.colors.border.base
  },
  content: {
    padding: 16,
    borderBottomWidth: 1,
    borderColor: theme => theme.colors.border.base
  },
  footer: {
    paddingHorizontal: 14,
    paddingTop: 15,
    paddingBottom: 16,
    alignItems: 'center'
  }
})

import React, { Component } from 'react';
import {
  View,
} from 'react-native';
import Header from './Header';

type Props = {
  style?: any;
  backText?: string;
  title?: string;
  renderLeft?: () => React.Component;
  renderRight?: () => React.Component;
  onScrollCallback?: (e) => void;
  backStyle?: any;
  backTextStyle?: any;
  titleStyle?: any;
  toolbarColor?: string;
  headerMaxHeight?: number;
  disabled?: boolean;
  noBorder?: boolean;
  parallax?: boolean;
  imageSource?: any;
};

export default class AnimatedHeader extends React.PureComponent<Props> {
  
  _onScroll = (e) => {
    this.header.onScroll(e);
    if (!!this?.props?.onScrollCallback) 
      this?.props?.onScrollCallback?.(e)
  }

  render() {
    const arr = React.Children.toArray(this.props.children);
    if (arr.length === 0) {
      console.error('AnimatedHeader must have ScrollView or FlatList as a child');
    }
    if (arr.length > 1) {
      console.error('Invalid child, only 1 child accepted')
    }
    const { headerMaxHeight } = this.props;
    const { style, ref, scrollEventThrottle, onScroll, contentContainerStyle, ...rest } = arr[0].props;
    const child = React.cloneElement(arr[0], {
      style: { ...style, flex: 1, },
      ref: (r) => this.scrollView = r,
      scrollEventThrottle: 128,
      onScroll: this._onScroll,
      contentContainerStyle: { ...contentContainerStyle, paddingTop: headerMaxHeight || 200,  },
      ...rest
    });

    return (
      <View style={this.props.style}>
        {child}
        <Header 
          {...this.props}
          ref={(r) => {this.header = r;}} 
        />
      </View>
    );
  }
}


import React, { Component } from 'react';
import { Platform } from 'react-native';

export default class MapLinks {

    iosLink(addr) {
        return 'https://maps.apple.com/?daddr=' + encodeURIComponent(addr) + '&dirFlag=d&t=h';
    }

    androidLink(addr) {
        return 'google.navigation:q=' + encodeURIComponent(addr);
    }

    get(addr) {
        if (Platform.OS == 'ios') {
            return this.iosLink(addr);
        } else if (Platform.OS == 'android') {
            return this.androidLink(addr);
        } else {
            throw "Rotary phones not supported";
        }
    };
}


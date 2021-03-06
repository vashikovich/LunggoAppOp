'use strict';

import React from 'react';
import {
  Image, Platform, ScrollView, Text, TouchableOpacity, View, RefreshControl,
  TextInput, ActivityIndicator, TouchableNativeFeedback, StyleSheet,
} from 'react-native';
import { Icon } from 'react-native-elements';
import Button from 'react-native-button';
import { WebBrowser } from 'expo';
import { MonoText } from '../components/StyledText';
import { fetchTravoramaApi, AUTH_LEVEL } from '../api/Common';
import { getProfile } from '../logic/ProfileController';
import * as Formatter from '../components/Formatter';
import Modal from '../components/Modal';
import LoadingAnimation from '../components/LoadingAnimation';
import LogoutConfirmationModal from '../components/LogoutConfirmationModal';
import { checkUserLoggedIn } from '../api/Common';
import { NavigationActions } from 'react-navigation';
import Avatar from './../components/Avatar';
import MenuButton from './../components/MenuButton';
import { reversePhoneWithoutCountryCode_Indonesia } from './../components/Formatter';

export default class AccountScreen extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      profile: {}
    };
  };

  static navigationOptions = {
    title: 'Akun',
  };

  _goToEditProfile = () => this.props.navigation.navigate('ChangeProfile', { profile: this.state.profile })
  _goToBankAccountScreen = () => this.props.navigation.navigate('BankAccountScreen')
  _askLogout = () => this._openLogoutModal();
  _openLogoutModal = () => this.refs.logoutModal.openModal();

  componentDidMount() {
    getProfile().then(profile => {
      this.setState({ profile });
    })
  }

  render() {
    let { profile } = this.state;
    return (
      <ScrollView
        style={{ backgroundColor: '#f7f8fb' }}
      >
        <LogoutConfirmationModal ref='logoutModal' {...this.props} />
        <View style={styles.container}>
          <View style={{ flexDirection: 'row' }}>

            <View style={{ flex: 2 }}>
              <View>
                <Text style={styles.namaProfile}>{profile.name}</Text>
              </View>
              <View>
                <Text style={styles.descProfile}>{profile.email}</Text>
              </View>
              <View>
                <Text style={styles.descProfile}>{reversePhoneWithoutCountryCode_Indonesia(profile.phone)}</Text>
              </View>
            </View>

            {/* <TouchableOpacity onPress={this._goToEditProfile}>
              <View style={{ flex: 1, alignItems: 'flex-end', }}>
                <View>
                  <Text style={styles.editProfile}>Ubah</Text>
                </View>
              </View>
            </TouchableOpacity> */}
          </View>
        </View>

        <View style={styles.boxSeparator}></View>

        <View style={styles.boxDetail}>
          <MenuButton
            label='Ubah Profil'
            icon={
              <Icon
                name='new-message'
                type='entypo'
                size={24}
                color='#00d3c5'
              />
            }
            onPress={this._goToEditProfile}
          />
          <MenuButton
            label='Rekening Terdaftar'
            icon={
              <Icon
                name='ios-card'
                type='ionicon'
                size={26}
                color='#00d3c5'
              />
            }
            onPress={this._goToBankAccountScreen}
          />
          <MenuButton
            label='Keluar Akun'
            icon={
              <Icon
                name='ios-log-out'
                type='ionicon'
                size={26}
                color='#00d3c5'
              />
            }
            onPress={this._askLogout}
          />
        </View>

      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  modalMenu: {
    backgroundColor: '#fff',
    width: 180,
    padding: 10,
    position: 'absolute',
    right: 10,
    top: 80,
    zIndex: 100,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 1
        },
        shadowRadius: 4,
        shadowOpacity: 0.2
      },
      android: {
        elevation: 2
      },
    }),
  },
  separatorOption: {
    paddingVertical: 10
  },
  containerDashboard: {
    padding: 15,
    position: 'absolute',
    top: 30,
    width: '100%'
  },
  row: {
    flexDirection: 'row',
    paddingVertical: 15,

  },
  separatorListDashbord: {
    backgroundColor: '#eeeeee',
    height: 1,
    width: '100%',
  },
  containerBoxDashboard: {
    backgroundColor: '#ffffff',
    borderRadius: 5,
    alignItems: 'center',
    padding: 10,
    zIndex: 1,
    ...Platform.select({
      ios: {
        shadowColor: '#e8f0fe',
        shadowOffset: {
          width: 0,
          height: 1
        },
        shadowRadius: 2,
        shadowOpacity: 0.9
      },
      android: {
        elevation: 2
      },
    }),
  },
  boxDetail: {
    backgroundColor: '#fff',
    borderBottomColor: '#e1e1e1',
    borderBottomWidth: 1,
    flex: 1
  },
  avatarBig: {
    width: 90,
    height: 90,
    resizeMode: 'cover',
    borderRadius: 45,
  },
  namaProfile: {
    fontFamily: 'Hind-SemiBold',
    fontSize: 18,
    color: '#454545',
    ...Platform.select({
      ios: {
        lineHeight: 25,
        paddingTop: 0,
        marginBottom: -12,
        //backgroundColor:'red'
      },
      android: {},
    }),
  },
  descProfile: {
    fontFamily: 'Hind-Light',
    fontSize: 15,
    color: '#454545',
    ...Platform.select({
      ios: {
        lineHeight: 25,
        paddingTop: 0,
        marginBottom: -10,
        //backgroundColor:'red'
      },
      android: {},
    }),
  },
  editProfile: {
    fontFamily: 'Hind-SemiBold',
    fontSize: 15,
    color: '#00a89d',
    ...Platform.select({
      ios: {
        lineHeight: 25,
        paddingTop: 0,
        marginBottom: -10,
        //backgroundColor:'red'
      },
      android: {},
    }),
  },
  labelHeader: {
    flex: 1,
    fontFamily: 'Hind',
    fontSize: 16,
    color: '#000',
    marginTop: 2,
    ...Platform.select({
      ios: {
        lineHeight: 14,
        paddingTop: 10,
        marginBottom: -12,
      },
      android: {
        lineHeight: 24,

      },
    }),
  },
  imgRecentActivity: {
    height: 125,
    width: '100%',
    resizeMode: 'cover',
    overflow: 'hidden'
  },
  saldo: {
    fontSize: 16,
    color: '#f57b76',
    marginTop: 2,
    fontFamily: 'Hind-SemiBold',
    ...Platform.select({
      ios: {
        // lineHeight:19*0.8,
        // paddingTop: 20 - (19 * 0.4),
        marginBottom: -5,
      },
      android: {

      },
    }),
  },
  teks1: {
    fontSize: 14,
    color: '#989898',
    fontFamily: 'Hind',
    ...Platform.select({
      ios: {
        // lineHeight:19*0.8,
        // paddingTop: 20 - (19 * 0.4),
        marginBottom: -5,
      },
      android: {

      },
    }),
  },
  teks2: {
    fontSize: 20,
    color: '#454545',
    fontFamily: 'Hind-SemiBold',
    ...Platform.select({
      ios: {
        // lineHeight:19*0.8,
        // paddingTop: 20 - (19 * 0.4),
        marginBottom: -5,
      },
      android: {

      },
    }),
  },
  teks3: {
    fontSize: 14,
    color: '#454545',
    fontFamily: 'Hind',
    textAlign: 'right',
    ...Platform.select({
      ios: {
        // lineHeight:19*0.8,
        // paddingTop: 20 - (19 * 0.4),
        marginBottom: -10,
      },
      android: {

      },
    }),
  },
  teks3a: {
    fontSize: 15,
    color: '#454545',
    fontFamily: 'Hind',
    textAlign: 'left',
    ...Platform.select({
      ios: {
        // lineHeight:19*0.8,
        // paddingTop: 20 - (19 * 0.4),
        marginBottom: -10,
      },
      android: {

      },
    }),
  },
  teks4: {
    fontSize: 14,
    color: '#23d3c3',
    fontFamily: 'Hind-SemiBold',
    textAlign: 'center',
    ...Platform.select({
      ios: {
        // lineHeight:19*0.8,
        // paddingTop: 20 - (19 * 0.4),
        marginBottom: -10,
      },
      android: {

      },
    }),
  },
  teks5: {
    fontSize: 14,
    color: '#f57b76',
    fontFamily: 'Hind-SemiBold',
    textAlign: 'center',
    ...Platform.select({
      ios: {
        // lineHeight:19*0.8,
        // paddingTop: 20 - (19 * 0.4),
        marginBottom: -10,
      },
      android: {

      },
    }),
  },
  ctaButton1: {
    width: '100%',
    paddingVertical: 6,
    overflow: 'hidden',
    borderRadius: 3,
    backgroundColor: '#00d3c5',
  },
  ctaButton2: {
    width: '100%',
    paddingVertical: 6,
    overflow: 'hidden',
    borderRadius: 3,
    backgroundColor: '#f57b76',
  },
  ctaButton3: {
    width: '100%',
    paddingVertical: 6,
    overflow: 'hidden',
    borderRadius: 3,
    borderColor: '#ff5f5f',
    borderWidth: 1
  },
  categoryTitle: {
    fontFamily: 'Hind-SemiBold',
    fontSize: 19,
    color: '#454545',
  },
  activityReviewButton: {
    flex: 1,
    alignItems: 'center',
  },
  divider: {
    height: 1,
    width: '100%',
    backgroundColor: '#efefef',
  },
  credit: {
    fontSize: 15,
    marginTop: 3,
    marginLeft: 5,
    fontFamily: 'Hind',
    color: '#454545',
  },
  notification: {
    backgroundColor: '#00d3c5',
    alignItems: 'center',
    padding: 1,
    width: 15,
    height: 15,
    borderRadius: 20,
    position: 'absolute',

    ...Platform.select({
      ios: {
        right: 3,
        bottom: 14,
      },
      android: {
        right: 3,
        bottom: 11,
      },
    }),
  },
  textKecil: {
    fontSize: 12,
    fontFamily: 'Hind',
    color: '#676767',
    backgroundColor: 'transparent',
    ...Platform.select({
      ios: {
        // lineHeight:19*0.8,
        // paddingTop: 20 - (19 * 0.4),
        marginBottom: -8,
      },
      android: {
        marginBottom: -2,
      },
    }),
  },
  boldRating: {
    fontSize: 45,
    fontFamily: 'Hind-Bold',
    ...Platform.select({
      ios: {
        // lineHeight:19*0.8,
        // paddingTop: 20 - (19 * 0.4),
        marginBottom: -30,
      },
      android: {
        marginBottom: -14,
      },
    }),
  },
  point: {
    fontFamily: 'Hind-Bold',
    fontSize: 30,
    color: '#01d4cb',
    ...Platform.select({
      ios: {
        // lineHeight:19*0.8,
        // paddingTop: 20 - (19 * 0.4),
        marginBottom: -20,
      },
      android: {
        marginBottom: -2,
      },
    }),
  },
  activityTitle: {
    fontSize: 16,
    color: '#454545',
    fontFamily: 'Hind-SemiBold',
    textAlign: 'right',
    ...Platform.select({
      ios: {
        lineHeight: 10,
        paddingTop: 10,
        marginBottom: -12,
        //backgroundColor:'red'
      },
      android: {
        lineHeight: 20,
        //paddingTop: 23 - (23* 1),
      },
    }),
  },
  container: {
    padding: 20,
    backgroundColor: '#fff',
    flex: 1,
    borderBottomWidth: 1,
    borderBottomColor: '#e5e5e5',
    marginBottom: 20
  },
  boxSeparator: {
    height: 20
  },
});
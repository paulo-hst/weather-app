import React from 'react'
import { View, Platform, StyleSheet } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { colors } from '../utils/index'

export default function ReloadIcon({ load }){
    // verifica o sistema operacional para carregamento de icone
    const reloadIconName = Platform.OS === 'ios' ? 'ios-refresh-circle' : 'md-refresh-circle'
    return(
        <View style={styles.reloadIcon}>
            <Ionicons onPress={load} name={reloadIconName} size={50} color={colors.PRIMARY_COLOR} />
        </View>
    )
}

const styles = StyleSheet.create({
    reloadIcon: {
        position: 'absolute',
        top: 63,
        right: 20
    }
})
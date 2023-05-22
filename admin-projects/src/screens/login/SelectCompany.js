import React, { useEffect, useCallback, useState } from "react";
import { useNavigation } from '@react-navigation/native';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from "react-native";
import Spinner from 'react-native-loading-spinner-overlay';
import { getIpAddress } from "../../shared/General";
import { setItem } from "../../shared/LocalStorage";
import  {createStyleSaveArea} from '../../shared/Styles'
import { useSafeAreaInsets } from "react-native-safe-area-context";
import {getUsertToken} from "../../api/UserTokenApi"
import {getCompanies} from "../../api/CompanyApi"
import { TitileScreen } from "../../components/TitleScreen";

const SelectCompany =  () => {
    const insets = useSafeAreaInsets();
    const styles = createStyleSaveArea(insets);
    const [companies, setCompanies] = useState([]);
    const [showSpinner, setShowSpinner] = useState(true);
    const navegation = useNavigation()

    const verifySession = useCallback(async()=> {
        const ipAdress = await getIpAddress();
        var token = await getUsertToken(ipAdress);
        if(token != null){
            await setItem('userToken', JSON.stringify(token)) 
            if(token.Active){
                navegation.navigate('ProjectsList')
            }else{
                navegation.push('Login')
            }
        }else{
            const companiesR = await getCompanies()
            setCompanies(companiesR);
            setShowSpinner(false);
        }
    }, [])
    useEffect(() =>{
        verifySession();
    },[]);

    const goToLogin = async (company) => {
        await setItem('company', JSON.stringify(company));
        navegation.push('Login')
    }
    /*
        <Card key={company.Id}>
                                {
                                    <View style={stylesCard.view} > 
                                        <Text style={stylesCard.text}>{company.Name}</Text>
                                        <Image style={stylesCard.image}
                                            source={{uri:company.LogoUrl}}
                                        />
                                    </View>
                                }
                            </Card>
    */
    return(
        <View style={styles.saveArea}>
            <Spinner
                visible={showSpinner}
                textContent={'Verificando información'}
                textStyle={stylesSpinner.spinnerTextStyle}
            />
            <TitileScreen data={'Seleccionar compañía'}/>
            <ScrollView> 
                {
                    companies.map((company) => {
                        return(
                            <TouchableOpacity key={company.Id} onPress={() => goToLogin(company)} style={stylesCard.button}>
                                <View style={stylesCard.view} > 
                                    <Text style={stylesCard.text}>{company.Name}</Text>
                                    <Image style={stylesCard.image}
                                        source={{uri:company.LogoUrl}}
                                    />
                                </View>
                            </TouchableOpacity>
                        );
                    })
                }
            </ScrollView>
        </View>
    );
}
const stylesCard = StyleSheet.create({
    view:{
        alignItems: 'center',
        flexDirection: 'column'
    },
    image: {
        height: 50,
        width: 150,
    },
    text:{
        fontSize: 20,
        marginBottom:5,
    },
    button: {
        backgroundColor: 'white',
        marginTop: 10,
        marginHorizontal: 10,
        padding: 10,
    },
})
const stylesSpinner = StyleSheet.create({
    spinnerTextStyle: {
      color: '#FFF'
    },
  });
export default SelectCompany;